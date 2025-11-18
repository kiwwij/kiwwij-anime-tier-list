// --- НАСТРОЙКИ ---
const CACHE_KEY_POSTERS = 'anime_posters_cache_v3'; // v3 - сбрасываем кэш, чтобы загрузить новые HQ картинки
const MAX_CONCURRENT_REQUESTS = 10;
const REQUEST_DELAY = 90;

// --- Элементы интерфейса ---
const categorySelect = document.getElementById('categorySelect');
const scaleSelect = document.getElementById('scaleSelect');
const tierListContainer = document.getElementById('tierListContainer');
const modal = document.getElementById('detailsModal');

// --- Состояние ---
let apiCache = JSON.parse(localStorage.getItem(CACHE_KEY_POSTERS) || '{}');
let requestQueue = [];
let activeRequests = 0;

// --- Инициализация ---
document.addEventListener('DOMContentLoaded', () => {
    if (typeof tierListData === 'undefined') {
        console.error("ОШИБКА: tierListData не найдена.");
        tierListContainer.innerHTML = '<p style="color:red; padding:20px;">Ошибка загрузки данных.</p>';
        return;
    }
    initControls();
});

function initControls() {
    // 1. Сортировка категорий
    const keys = Object.keys(tierListData).sort((a, b) => {
        const isNumA = !isNaN(a);
        const isNumB = !isNaN(b);
        if (isNumA && isNumB) return b - a; 
        if (!isNumA && !isNumB) return a.localeCompare(b); 
        return isNumA ? -1 : 1; 
    });

    keys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        categorySelect.appendChild(option);
    });

    // 2. Авто-выбор 2025
    const currentYear = new Date().getFullYear().toString();
    if (keys.includes(currentYear)) {
        categorySelect.value = currentYear;
    } else if (keys.length > 0) {
        categorySelect.value = keys[0];
    }

    // 3. Шкалы
    const scaleOptions = [
        { val: 'standard', text: 'Стандарт (S-F)' },
        { val: 'personal', text: 'Личная' }
    ];
    scaleOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.val;
        option.textContent = opt.text;
        scaleSelect.appendChild(option);
    });

    // Слушатели
    categorySelect.addEventListener('change', renderTierList);
    scaleSelect.addEventListener('change', renderTierList);

    // Модалка
    document.getElementById('closeModal').addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });

    renderTierList();
}

// --- Рендеринг ---
function renderTierList() {
    tierListContainer.innerHTML = ''; 
    
    const selectedCategory = categorySelect.value;
    const selectedScaleType = scaleSelect.value;
    const categoryData = tierListData[selectedCategory];
    
    if (!categoryData) return;

    // Выбор шкалы
    let currentScalesArray = [];
    if (selectedCategory === 'Энергетики' && typeof energyRatingScales !== 'undefined') {
        currentScalesArray = energyRatingScales[selectedScaleType];
    } else if (selectedCategory.includes('Re:Zero') && typeof rezeroRatingScales !== 'undefined') {
        currentScalesArray = rezeroRatingScales[selectedScaleType];
    } else if (typeof ratingScales !== 'undefined') {
        currentScalesArray = ratingScales[selectedScaleType];
    }

    if (!currentScalesArray || currentScalesArray.length === 0) return;

    currentScalesArray.forEach((scaleItem, index) => {
        let dataKey = getDataKeyByIndex(scaleItem.rank, index);
        const items = categoryData[dataKey] || [];

        const row = document.createElement('div');
        row.className = 'tier-row';

        const label = document.createElement('div');
        label.className = `tier-label ${scaleItem.color || ''}`; 
        label.innerHTML = scaleItem.rank; 
        
        const content = document.createElement('div');
        content.className = 'tier-content';

        items.forEach(item => {
            const card = createCard(item);
            content.appendChild(card);
        });

        row.appendChild(label);
        row.appendChild(content);
        tierListContainer.appendChild(row);
    });
}

function getDataKeyByIndex(rankLabel, index) {
    const standardKeys = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];
    if (standardKeys.includes(rankLabel)) return rankLabel;
    if (index >= 0 && index < standardKeys.length) return standardKeys[index];
    return 'Unknown';
}

// --- Создание карточки ---
function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const loader = document.createElement('div');
    loader.className = 'card-loader';
    loader.textContent = item.ruTitle || item.title; 
    card.appendChild(loader);

    const img = document.createElement('img');
    img.style.display = 'none';
    img.alt = item.title;

    // 1. Локальная
    if (item.img) {
        img.src = "img/" + item.img; 
        img.onload = () => { loader.style.display = 'none'; img.style.display = 'block'; };
        // Если локальная, передаем один и тот же путь и как превью, и как фулл
        setupCardClick(card, item, img.src, img.src);
    } 
    // 2. API
    else {
        // Проверка кэша
        if (apiCache[item.title]) {
            const cached = apiCache[item.title];
            if (cached.posterSmall) {
                img.src = cached.posterSmall;
                img.onload = () => { loader.style.display = 'none'; img.style.display = 'block'; };
            }
            // Передаем cached (в нем есть и posterSmall, и posterLarge)
            setupCardClick(card, item, cached.posterSmall, cached.posterLarge, cached);
        } else {
            // Добавление в очередь
            fetchKitsuData(item.title).then(apiData => {
                if (apiData && apiData.posterSmall) {
                    img.src = apiData.posterSmall;
                    img.onload = () => { loader.style.display = 'none'; img.style.display = 'block'; };
                }
                // Передаем полученные ссылки
                const large = apiData ? apiData.posterLarge : null;
                const small = apiData ? apiData.posterSmall : null;
                setupCardClick(card, item, small, large, apiData);
            });
        }
    }

    card.appendChild(img);
    return card;
}

// --- API Logic (С сохранением двух версий картинок) ---
function fetchKitsuData(query) {
    if (apiCache[query]) return Promise.resolve(apiCache[query]);

    return new Promise((resolve) => {
        requestQueue.push({ query, resolve });
        processQueue();
    });
}

async function processQueue() {
    if (requestQueue.length === 0 || activeRequests >= MAX_CONCURRENT_REQUESTS) return;

    activeRequests++;
    const { query, resolve } = requestQueue.shift();

    try {
        const url = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}&page[limit]=1`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(response.status);

        const data = await response.json();
        let result = { posterSmall: null, posterLarge: null, originalTitle: null, rating: null };

        if (data.data && data.data.length > 0) {
            const anime = data.data[0].attributes;
            const posters = anime.posterImage || {};
            
            result = {
                // Маленькая для сетки (быстрая)
                posterSmall: posters.small || posters.medium || posters.original || null,
                // Большая для модалки (качественная)
                posterLarge: posters.original || posters.large || posters.medium || null,
                
                originalTitle: anime.titles.en_jp || anime.titles.ja_jp || anime.canonicalTitle,
                rating: anime.averageRating,
            };
        }
        
        apiCache[query] = result;
        saveCache();
        resolve(result);

    } catch (error) {
        console.warn("API Error:", query, error);
        const empty = { posterSmall: null, posterLarge: null, originalTitle: null, rating: null };
        apiCache[query] = empty; 
        resolve(empty);
    } finally {
        activeRequests--;
        setTimeout(processQueue, REQUEST_DELAY);
        processQueue();
    }
}

function saveCache() {
    try { localStorage.setItem(CACHE_KEY_POSTERS, JSON.stringify(apiCache)); } catch(e){}
}

// --- Модальное окно ---
// Теперь принимает posterSmall (для фолбека) и posterLarge (для качества)
function setupCardClick(card, itemData, posterSmall, posterLarge, apiDetails = null) {
    card.addEventListener('click', () => {
        const modalImg = document.getElementById('modalImg');
        
        // Логика картинки: пробуем большую, если нет - маленькую
        const finalImg = posterLarge || posterSmall;
        
        if (finalImg) {
            modalImg.src = finalImg;
            modalImg.parentElement.style.display = 'block';
        } else {
            modalImg.parentElement.style.display = 'none';
        }

        document.getElementById('modalTitle').textContent = itemData.ruTitle || itemData.title;
        
        let altTitle = itemData.title;
        if (apiDetails && apiDetails.originalTitle) altTitle = apiDetails.originalTitle;
        document.getElementById('modalAltTitle').textContent = altTitle;
        
        // Рейтинг
        const ratingEl = document.getElementById('modalRating');
        ratingEl.innerHTML = '';
        ratingEl.className = ''; 

        if (apiDetails && apiDetails.rating) {
            const score = parseFloat(apiDetails.rating);
            const score10 = (score / 10).toFixed(1);
            
            ratingEl.className = 'rating-badge';
            ratingEl.innerHTML = `<span class="rating-star">★ Рейтинг с Kitsu</span> ${score10} / 10`;
            ratingEl.style.display = 'inline-flex';
        } else {
            ratingEl.style.display = 'none';
        }

        // Отзыв (Исправлена проблема дублирования и пробелов)
        // 1. Берем отзыв или пустую строку
        let rawReview = itemData.review || "";
        // 2. Убираем пробелы по краям
        let cleanReview = rawReview.trim();
        
        const reviewEl = document.getElementById('modalReview');
        
        if (cleanReview) {
            // Вставляем заголовок и текст (без лишнего пробела перед текстом)
            reviewEl.innerHTML = `<strong>МОЙ ОТЗЫВ:</strong>${cleanReview}`;
        } else {
            reviewEl.innerHTML = "<em>Отзыва пока нет.</em>";
        }
        
        modal.showModal();
        
        modal.onclick = (e) => {
            if (e.target === modal) modal.close();
        }
    });
}