// --- НАСТРОЙКИ ---
const CACHE_KEY = 'anime_stats_cache_v4'; // Меняем версию, чтобы обновить логику
const BATCH_SIZE = 50; 
const BATCH_DELAY = 450; 

// Переводы жанров
const genreTranslations = {
    "Action": "Экшен", 
    "Adventure": "Приключения", 
    "Comedy": "Комедия", 
    "Drama": "Драма",
    "Fantasy": "Фэнтези", 
    "Sci-Fi": "Научная фантастика", 
    "Slice of Life": "Повседневность",
    "Romance": "Романтика", 
    "Supernatural": "Сверхъестественное", 
    "Mystery": "Детектив",
    "Horror": "Ужасы", 
    "Psychological": "Психология", 
    "Thriller": "Триллер", 
    "Mecha": "Меха",
    "Music": "Музыка", 
    "Sports": "Спорт", 
    "School": "Школа", 
    "Isekai": "Исекай",
    "Shounen": "Сёнен", 
    "Seinen": "Сэйнэн", 
    "Shoujo": "Сёдзё", 
    "Josei": "Дзёсэй",
    "Harem": "Гарем", 
    "Ecchi": "Этти", 
    "Martial Arts": 
    "Боевые искусства", 
    "Game": "Игры",
    "Vampire": "Вампиры", 
    "Magic": "Магия", 
    "Friendship": "Дружба", 
    "Military": "Военное",
    "Political": "Политика", 
    "Super Power": "Супер сила", 
    "Demons": "Демоны", 
    "Historical": "Историческое"
};

// Элементы DOM
const totalCountEl = document.getElementById('totalCount');
const processedCountEl = document.getElementById('processedCount');
const progressBar = document.getElementById('progressBar');
const loadingPercent = document.getElementById('loadingPercent');
const ctx = document.getElementById('genresChart').getContext('2d');
const yearsGridEl = document.getElementById('yearsGrid');

// Модальное окно
const yearModal = document.getElementById('yearModal');
const closeYearModalBtn = document.getElementById('closeYearModal');
const modalYearTitle = document.getElementById('modalYearTitle');
const yearAnimeList = document.getElementById('yearAnimeList');

// Состояние
let uniqueTitles = new Set(); 
let genreCounts = {};
// Структура: { "2010": [ {title: "Naruto", image: "url"}, ... ], "2023": [] }
let animeByYear = {}; 
let myChart = null;
let apiCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');

document.addEventListener('DOMContentLoaded', () => {
    // Настройка модального окна
    if(closeYearModalBtn) {
        closeYearModalBtn.addEventListener('click', () => {
            yearModal.close();
            document.body.style.overflow = '';
        });
    }
    yearModal.addEventListener('click', (event) => {
        if (event.target === yearModal) {
            yearModal.close();
            document.body.style.overflow = '';
        }
    });

    setTimeout(() => {
        if (typeof tierListData === 'undefined') {
            console.error("Данные не загружены.");
            return;
        }
        startAnalysis();
    }, 100);
});

async function startAnalysis() {
    // 1. Сначала распределяем аниме по годам НА ОСНОВЕ ТВОЕГО СПИСКА
    mapAnimeToUserYears();
    
    // Считаем уникальные тайтлы для статистики загрузки
    collectUniqueTitles(); 
    totalCountEl.textContent = uniqueTitles.size;
    
    initChart();
    
    const allTitles = Array.from(uniqueTitles);
    const titlesToFetch = [];
    let processedCounter = 0;

    // 2. Обработка кэша (чтобы достать картинки и жанры)
    allTitles.forEach(title => {
        if (apiCache[title]) {
            processStatsData(apiCache[title], title);
            processedCounter++;
        } else {
            titlesToFetch.push(title);
        }
    });

    processedCountEl.textContent = processedCounter;
    updateProgress(processedCounter, allTitles.length);
    updateChart();
    renderYearsStats(); // Рисуем года сразу (они уже заполнены названиями из mapAnimeToUserYears)

    if (titlesToFetch.length === 0) {
        finishLoading();
        return;
    }

    // 3. Загрузка недостающих данных (картинки + жанры)
    for (let i = 0; i < titlesToFetch.length; i += BATCH_SIZE) {
        const batch = titlesToFetch.slice(i, i + BATCH_SIZE);
        
        await Promise.all(batch.map(title => fetchStatsForTitle(title)));
        
        processedCounter += batch.length;
        const currentDisplay = Math.min(processedCounter, allTitles.length);
        
        processedCountEl.textContent = currentDisplay;
        updateProgress(currentDisplay, allTitles.length);
        
        saveCache();
        updateChart();
        renderYearsStats(); // Обновляем картинки в реальном времени
        await wait(BATCH_DELAY);
    }
    
    finishLoading();
}

// ГЛАВНАЯ НОВАЯ ФУНКЦИЯ: Берет года из твоей структуры данных
function mapAnimeToUserYears() {
    // Очищаем
    animeByYear = {};

    Object.keys(tierListData).forEach(key => {
        // Проверяем, похож ли ключ на год (4 цифры)
        // Если у тебя папка называется '2010', она пройдет. Если 'Энергетики' - нет.
        if (key.match(/^\d{4}$/)) {
            const year = parseInt(key);
            if (!animeByYear[year]) {
                animeByYear[year] = [];
            }

            const category = tierListData[key];
            // Пробегаем по рангам S, A, B, C...
            Object.values(category).forEach(rankList => {
                if (Array.isArray(rankList)) {
                    rankList.forEach(item => {
                        if (item.title) {
                            // Добавляем аниме в этот год.
                            // Картинки пока нет, она подтянется позже из API/Кэша
                            animeByYear[year].push({
                                title: item.title.trim(),
                                image: null 
                            });
                        }
                    });
                }
            });
        }
    });
}

function processStatsData(data, title) {
    if (!data) return;

    // 1. Считаем жанры (общая статистика)
    if (data.genres && Array.isArray(data.genres)) {
        data.genres.forEach(originalGenre => {
            const ruGenre = genreTranslations[originalGenre] || originalGenre;
            genreCounts[ruGenre] = (genreCounts[ruGenre] || 0) + 1;
        });
    }

    // 2. Обновляем картинки в уже существующей структуре годов
    // Мы НЕ добавляем года сюда, мы только ищем тайтл в animeByYear и даем ему картинку
    Object.keys(animeByYear).forEach(year => {
        const list = animeByYear[year];
        const animeRef = list.find(a => a.title === title);
        if (animeRef && data.image) {
            animeRef.image = data.image;
        }
    });
}

async function fetchStatsForTitle(title) {
    try {
        const url = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(title)}&include=genres&page[limit]=1`;
        const response = await fetch(url);
        
        if (!response.ok) {
            apiCache[title] = { genres: [], image: null }; 
            return;
        }
        
        const data = await response.json();
        
        let foundGenres = [];
        let foundImage = null;

        if (data.data && data.data.length > 0) {
            const attrs = data.data[0].attributes;
            
            // Картинка
            if (attrs && attrs.posterImage) {
                foundImage = attrs.posterImage.small || attrs.posterImage.original;
            }

            // Жанры
            if (data.included) {
                data.included.forEach(item => {
                    if (item.type === 'genres') {
                        foundGenres.push(item.attributes.name);
                    }
                });
            }
        }

        const statsObject = {
            genres: foundGenres,
            image: foundImage
            // year: foundYear -- Убрали сохранение года из API
        };

        apiCache[title] = statsObject;
        processStatsData(statsObject, title);

    } catch (error) {
        console.warn(`Сбой сети для ${title}:`, error);
    }
}

function renderYearsStats() {
    if (!yearsGridEl) return;
    yearsGridEl.innerHTML = '';
    
    // Получаем список лет из твоих данных и сортируем по убыванию
    const years = Object.keys(animeByYear).map(Number).sort((a, b) => b - a);

    years.forEach(y => {
        const animeList = animeByYear[y] || [];
        const count = animeList.length;
        
        const card = document.createElement('div');
        card.className = 'year-card';
        // Если вдруг список пуст (технически), делаем прозрачным
        if (count === 0) card.classList.add('empty');
        
        card.onclick = () => openYearModal(y);

        card.innerHTML = `
            <span class="year-label">${y}</span>
            <span class="year-count">${count}</span>
        `;
        
        yearsGridEl.appendChild(card);
    });
}

function openYearModal(year) {
    modalYearTitle.textContent = `${year} год`;
    yearAnimeList.innerHTML = '';
    
    const list = animeByYear[year];
    
    if (list && list.length > 0) {
        list.forEach(anime => {
            // Если картинка еще не загрузилась (или ее нет), ставим заглушку
            const imgSrc = anime.image ? anime.image : 'https://via.placeholder.com/150x220/1f2937/9ca3af?text=Loading...';

            const card = document.createElement('div');
            card.className = 'year-anime-card';
            card.innerHTML = `
                <img src="${imgSrc}" alt="${anime.title}" class="year-anime-poster" loading="lazy">
                <span class="year-anime-title">${anime.title}</span>
            `;
            yearAnimeList.appendChild(card);
        });
    } else {
        yearAnimeList.innerHTML = '<p class="text-muted">Ничего не найдено.</p>';
    }

    yearModal.showModal();
    document.body.style.overflow = 'hidden';
}

function collectUniqueTitles() {
    uniqueTitles.clear();
    Object.keys(tierListData).forEach(key => {
        if (key === 'Энергетики') return;
        const category = tierListData[key];
        Object.values(category).forEach(rankList => {
            if (Array.isArray(rankList)) {
                rankList.forEach(item => {
                    if (item.title) {
                        uniqueTitles.add(item.title.trim());
                    }
                });
            }
        });
    });
}

function updateChart() {
    if (!myChart) return;
    const sortedGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15);
    
    myChart.data.labels = sortedGenres.map(item => item[0]);
    myChart.data.datasets[0].data = sortedGenres.map(item => item[1]);
    myChart.update();
}

function initChart() {
    if (!ctx) return;
    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                label: 'Количество',
                data: [],
                backgroundColor: [
                    '#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', 
                    '#a855f7', '#ec4899', '#6366f1', '#14b8a6', '#84cc16',
                    '#0ea5e9', '#d946ef', '#f43f5e', '#8b5cf6', '#64748b'
                ],
                borderWidth: 2, 
                borderColor: '#1f2937', 
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: 20 },
            plugins: {
                legend: {
                    position: 'right',
                    labels: { 
                        color: '#f3f4f6', 
                        font: { size: 14, family: "'Inter', sans-serif" },
                        boxWidth: 15
                    }
                }
            }
        }
    });
}

function updateProgress(current, total) {
    if (!progressBar) return;
    const percent = Math.round((current / total) * 100);
    progressBar.style.width = `${percent}%`;
    loadingPercent.textContent = `${percent}%`;
}

function finishLoading() {
    const pContainer = document.getElementById('progressContainer');
    if (pContainer) {
        pContainer.style.opacity = '0.5';
        loadingPercent.textContent = "Готово!";
    }
    saveCache();
}

function saveCache() {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(apiCache));
    } catch (e) {
        console.warn('Кэш переполнен');
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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