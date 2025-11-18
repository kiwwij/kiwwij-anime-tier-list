// --- НАСТРОЙКИ ---
const CACHE_KEY = 'anime_genres_cache_v1'; // Ключ для сохранения данных в браузере
const BATCH_SIZE = 50; // Сколько запросов отправлять одновременно (3 - безопасно для Kitsu)
const BATCH_DELAY = 400; // Пауза между пакетами (мс)

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
    "Martial Arts": "Боевые искусства",
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

// Состояние
let uniqueTitles = new Set();
let genreCounts = {};
let myChart = null;
// Загружаем кэш из памяти браузера сразу при старте
let apiCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (typeof tierListData === 'undefined') {
            console.error("Данные не загружены.");
            return;
        }
        startAnalysis();
    }, 100);
});

async function startAnalysis() {
    // 1. Сбор уникальных названий
    collectUniqueTitles();
    totalCountEl.textContent = uniqueTitles.size;
    
    // Инициализируем пустой график
    initChart();

    const allTitles = Array.from(uniqueTitles);
    const titlesToFetch = [];
    let processedCounter = 0;

    // 2. Сначала обрабатываем данные из КЭША (это мгновенно)
    allTitles.forEach(title => {
        if (apiCache[title]) {
            // Если есть в кэше - сразу считаем жанры
            processGenresData(apiCache[title]);
            processedCounter++;
        } else {
            // Если нет - добавляем в очередь на загрузку
            titlesToFetch.push(title);
        }
    });

    // Обновляем график данными из кэша
    processedCountEl.textContent = processedCounter;
    updateProgress(processedCounter, allTitles.length);
    updateChart();

    console.log(`Кэш: найдено ${processedCounter}, нужно загрузить ${titlesToFetch.length}`);

    if (titlesToFetch.length === 0) {
        finishLoading();
        return;
    }

    // 3. Загружаем недостающие данные ПАКЕТАМИ (параллельно)
    for (let i = 0; i < titlesToFetch.length; i += BATCH_SIZE) {
        // Берем кусочек массива (например, 3 тайтла)
        const batch = titlesToFetch.slice(i, i + BATCH_SIZE);
        
        // Запускаем их загрузку одновременно
        await Promise.all(batch.map(title => fetchGenresForTitle(title)));
        
        // Обновляем счетчики
        processedCounter += batch.length;
        const currentDisplay = Math.min(processedCounter, allTitles.length);
        
        processedCountEl.textContent = currentDisplay;
        updateProgress(currentDisplay, allTitles.length);
        
        // Сохраняем прогресс в память и обновляем график
        saveCache();
        updateChart();

        // Пауза между пакетами, чтобы не забанили IP
        await wait(BATCH_DELAY);
    }
    
    finishLoading();
}

// Функция обработки полученных жанров (добавление в статистику)
function processGenresData(genres) {
    genres.forEach(originalGenre => {
        const ruGenre = genreTranslations[originalGenre] || originalGenre;
        genreCounts[ruGenre] = (genreCounts[ruGenre] || 0) + 1;
    });
}

// Функция загрузки одного тайтла
async function fetchGenresForTitle(title) {
    try {
        const url = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(title)}&include=genres&page[limit]=1`;
        const response = await fetch(url);
        
        if (!response.ok) {
            console.warn(`Ошибка API (${response.status}) для: ${title}`);
            // Записываем пустой массив в кэш, чтобы не долбить этот тайтл снова при перезагрузке
            apiCache[title] = []; 
            return;
        }
        
        const data = await response.json();
        const foundGenres = [];

        if (data.included) {
            data.included.forEach(item => {
                if (item.type === 'genres') {
                    foundGenres.push(item.attributes.name);
                }
            });
        }

        // Сохраняем в кэш и обрабатываем
        apiCache[title] = foundGenres;
        processGenresData(foundGenres);

    } catch (error) {
        console.warn(`Сбой сети для ${title}:`, error);
    }
}

function collectUniqueTitles() {
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
    const sortedGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15);

    const labels = sortedGenres.map(item => item[0]);
    const data = sortedGenres.map(item => item[1]);

    myChart.data.labels = labels;
    myChart.data.datasets[0].data = data;
    myChart.update();
}

function initChart() {
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
                hoverOffset: 15, // Насколько увеличивается сегмент
                hoverBorderColor: '#ffffff', 
                hoverBorderWidth: 3 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: 20 // <--- ДОБАВЛЕН ОТСТУП, ЧТОБЫ НЕ ОБРЕЗАЛОСЬ
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: { 
                        color: '#f3f4f6', 
                        font: { size: 16, family: "'Inter', sans-serif", weight: '500' },
                        padding: 20,
                        boxWidth: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            let value = context.raw;
                            let total = context.chart._metasets[context.datasetIndex].total;
                            let percentage = Math.round((value / total) * 100) + '%';
                            return label + value + ' (' + percentage + ')';
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

function updateProgress(current, total) {
    const percent = Math.round((current / total) * 100);
    progressBar.style.width = `${percent}%`;
    loadingPercent.textContent = `${percent}%`;
}

function finishLoading() {
    document.getElementById('progressContainer').style.opacity = '0.5';
    loadingPercent.textContent = "Готово!";
    saveCache(); // Финальное сохранение
}

function saveCache() {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(apiCache));
    } catch (e) {
        console.warn('Кэш переполнен (Quota exceeded)');
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}