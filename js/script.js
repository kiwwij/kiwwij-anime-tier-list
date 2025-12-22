// --- НАСТРОЙКИ ---
const RAWG_API_KEY = 'eff5af7536f94b1b862edf995f4ee1f9';
const CACHE_KEY_POSTERS = 'site_posters_cache_v5'; // Общий кэш (v5)
const MAX_CONCURRENT_REQUESTS = 15;
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

    // 2. Авто-выбор года
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

    categorySelect.addEventListener('change', renderTierList);
    scaleSelect.addEventListener('change', renderTierList);

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

    // Определяем тип контента: 'game' или 'anime' (по умолчанию anime)
    const contentType = categoryData.type || 'anime';

    // Выбор шкалы
    let currentScalesArray = [];
    if (contentType === 'game' && typeof gameRatingScales !== 'undefined') {
        currentScalesArray = gameRatingScales[selectedScaleType];
    } else
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
        const items = categoryData.data ? categoryData.data[dataKey] : (categoryData[dataKey] || []); 
        // Поддержка старой структуры (где сразу S, A...) и новой (где data: { S: ... })

        const row = document.createElement('div');
        row.className = 'tier-row';

        const label = document.createElement('div');
        label.className = `tier-label ${scaleItem.color || ''}`; 
        label.innerHTML = scaleItem.rank; 
        
        const content = document.createElement('div');
        content.className = 'tier-content';

        if (items) {
            items.forEach(item => {
                const card = createCard(item, contentType);
                content.appendChild(card);
            });
        }

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
function createCard(item, contentType) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const loader = document.createElement('div');
    loader.className = 'card-loader';
    loader.textContent = item.ruTitle || item.title; 
    card.appendChild(loader);

    const img = document.createElement('img');
    img.style.display = 'none';
    img.alt = item.title;

    // 1. ЛОКАЛЬНАЯ КАРТИНКА
    if (item.img) {
        img.src = "img/" + item.img; 
        img.onload = () => { loader.style.display = 'none'; img.style.display = 'block'; };
        setupCardClick(card, item, img.src, img.src);
    } 
    // 2. API (КЭШ)
    else if (apiCache[item.title]) {
        const cached = apiCache[item.title];
        if (cached.posterSmall) {
            img.src = cached.posterSmall;
            img.onload = () => { loader.style.display = 'none'; img.style.display = 'block'; };
        }
        setupCardClick(card, item, cached.posterSmall, cached.posterLarge, cached);
    }
    // 3. API ЗАПРОС (НЕТ В КЭШЕ)
    else {
        // Добавляем в очередь в зависимости от типа
        addRequestToQueue(item.title, contentType).then(apiData => {
            if (apiData && apiData.posterSmall) {
                img.src = apiData.posterSmall;
                img.onload = () => { loader.style.display = 'none'; img.style.display = 'block'; };
            }
            const large = apiData ? apiData.posterLarge : null;
            const small = apiData ? apiData.posterSmall : null;
            setupCardClick(card, item, small, large, apiData);
        });
    }

    card.appendChild(img);
    return card;
}

// --- Очередь запросов ---
function addRequestToQueue(query, type) {
    if (apiCache[query]) return Promise.resolve(apiCache[query]);

    return new Promise((resolve) => {
        requestQueue.push({ query, type, resolve });
        processQueue();
    });
}

async function processQueue() {
    if (requestQueue.length === 0 || activeRequests >= MAX_CONCURRENT_REQUESTS) return;

    activeRequests++;
    const { query, type, resolve } = requestQueue.shift();

    try {
        let result = null;

        // === ВЫБОР API ===
        if (type === 'game') {
            // --- RAWG API (ИГРЫ) ---
            const url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(query)}&page_size=1`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`RAWG Error: ${response.status}`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const game = data.results[0];
                // RAWG рейтинг (0-5) переводим в 100-балльную систему
                const rating100 = game.rating ? (game.rating * 20).toFixed(1) : 'N/A'; 
                
                result = {
                    posterSmall: game.background_image,
                    posterLarge: game.background_image,
                    originalTitle: game.name,
                    rating: rating100, 
                    source: 'RAWG'
                };
            }
        } else {
            // --- KITSU API (АНИМЕ) ---
            const url = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}&page[limit]=1`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Kitsu Error: ${response.status}`);
            const data = await response.json();

            if (data.data && data.data.length > 0) {
                const anime = data.data[0].attributes;
                const posters = anime.posterImage || {};
                result = {
                    posterSmall: posters.small || posters.medium || posters.original || null,
                    posterLarge: posters.original || posters.large || posters.medium || null,
                    originalTitle: anime.titles.en_jp || anime.titles.ja_jp || anime.canonicalTitle,
                    rating: anime.averageRating,
                    source: 'Kitsu'
                };
            }
        }
        
        // Если ничего не нашли, сохраняем пустой объект, чтобы не искать снова
        if (!result) {
            result = { posterSmall: null, posterLarge: null, originalTitle: null, rating: null };
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
function setupCardClick(card, itemData, posterSmall, posterLarge, apiDetails = null) {
    card.addEventListener('click', () => {
        const modalImg = document.getElementById('modalImg');
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
        ratingEl.className = ''; 
        ratingEl.innerHTML = '';

        if (apiDetails && apiDetails.rating && apiDetails.rating !== 'N/A') {
            const score = parseFloat(apiDetails.rating);
            const score10 = (score / 10).toFixed(1);
            const sourceName = apiDetails.source || 'Kitsu'; // Kitsu или RAWG
            
            ratingEl.className = 'rating-badge';
            ratingEl.innerHTML = `<span class="rating-star">★ Рейтинг ${sourceName}</span> ${score10} / 10`;
            ratingEl.style.display = 'inline-flex';
        } else {
            ratingEl.style.display = 'none';
        }

        // Отзыв
        let rawReview = itemData.review || "";
        let cleanReview = rawReview.trim();
        const reviewEl = document.getElementById('modalReview');
        
        if (cleanReview) {
            reviewEl.innerHTML = `<strong>МОЙ ОТЗЫВ:</strong>${cleanReview}`;
        } else {
            reviewEl.innerHTML = "<em>Отзыва пока нет.</em>";
        }
        
        modal.showModal();
    });
}

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let currentInput = [];

document.addEventListener('keydown', (e) => {
    currentInput.push(e.key);
    currentInput = currentInput.slice(-konamiCode.length);

    if (currentInput.join('') === konamiCode.join('')) {
        activateGlitchMode();
    }
});

function activateGlitchMode() {
    document.body.style.filter = 'invert(1) hue-rotate(180deg)';
    document.body.style.transition = 'all 0.5s ease';
    alert('СЕКРЕТНЫЙ РЕЖИМ: Активирован визуальный глитч!');
    
    // Через 5 секунд возвращаем всё как было
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 5000);
}

console.log("%ckiwwij-os v2.12.06", "color: #6366f1; font-weight: bold; font-size: 18px;");
console.log("%cДоступ разрешен. Статус: В поиске идеального аниме...", "color: #9ca3af;");
console.log("%cПопробуй ввести команду: %chelpMe()", "color: #9ca3af;", "color: #fbbf24; font-weight: bold;");

function helpMe() {
    console.log("Тайный код для главной страницы: ↑ ↑ ↓ ↓ ← → ← → B A");
    return "Удачи, путник.";
}