const CACHE_KEY = 'dropped_anime_stats_cache_v1';
const BATCH_SIZE = 50; 
const BATCH_DELAY = 450; 

const genreTranslations = {
    "Action": "Экшен", "Adventure": "Приключения", "Comedy": "Комедия", "Drama": "Драма",
    "Fantasy": "Фэнтези", "Sci-Fi": "Научная фантастика", "Slice of Life": "Повседневность",
    "Romance": "Романтика", "Supernatural": "Сверхъестественное", "Mystery": "Детектив",
    "Horror": "Ужасы", "Psychological": "Психология", "Thriller": "Триллер", 
    "Mecha": "Меха", "Music": "Музыка", "Sports": "Спорт", "School": "Школа", 
    "Isekai": "Исекай", "Shounen": "Сёнен", "Seinen": "Сэйнэн", "Shoujo": "Сёдзё", 
    "Josei": "Дзёсэй", "Harem": "Гарем", "Ecchi": "Этти", "Martial Arts": "Боевые искусства", 
    "Game": "Игры", "Vampire": "Вампиры", "Magic": "Магия", "Friendship": "Дружба", 
    "Military": "Военное", "Political": "Политика", "Super Power": "Супер сила", 
    "Demons": "Демоны", "Historical": "Историческое", "Dementia": "Безумие"
};

const elements = {
    totalCount: document.getElementById('totalCount'),
    processedCount: document.getElementById('processedCount'),
    progressBar: document.getElementById('progressBar'),
    loadingPercent: document.getElementById('loadingPercent'),
    genresCtx: document.getElementById('genresChart')?.getContext('2d'),
    themeToggle: document.getElementById('themeToggle')
};

let genreCounts = {};
let episodeDrops = { "0 (Скип)": 0, "1-я серия": 0, "2-я серия": 0, "3-я серия": 0, "4-я серия": 0, "5+ серий": 0 };
let totalEpsWasted = 0;

let genresChart = null;
let episodesChart = null;
let apiCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');

document.addEventListener('DOMContentLoaded', () => {
    transformDOMForDrops();
    initTheme();
    
    setTimeout(() => {
        if (typeof droppedData !== 'undefined') startAnalysis();
    }, 100);
});

function transformDOMForDrops() {
    const timelinePanel = document.querySelector('.timeline-panel');
    if (timelinePanel) {
        timelinePanel.classList.remove('timeline-panel');
        timelinePanel.innerHTML = `
            <h2 class="panel-title">Брошенные тайтлы</h2>
            <p class="panel-subtitle">На какой серии происходит дроп</p>
            <div class="chart-wrapper" style="height: 350px;">
                <canvas id="episodesChart"></canvas>
            </div>
            <div id="wastedStats" style="text-align: center; margin-top: 15px; font-size: 0.95rem; color: var(--text-muted); background: var(--list-item-bg); padding: 10px; border-radius: 8px;">
                Загрузка статистики потерь...
            </div>
        `;
    }

    const yearModal = document.getElementById('yearModal');
    if (yearModal) yearModal.style.display = 'none';
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light-theme', savedTheme === 'light');
    if(elements.themeToggle) elements.themeToggle.checked = (savedTheme !== 'light');

    if(elements.themeToggle) {
        elements.themeToggle.addEventListener('change', () => {
            const isDark = elements.themeToggle.checked;
            document.body.classList.toggle('light-theme', !isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            const textColor = isDark ? '#f3f4f6' : '#000000';
            const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

            if (genresChart) {
                genresChart.options.plugins.legend.labels.color = textColor;
                genresChart.update();
            }
            if (episodesChart) {
                episodesChart.options.plugins.legend.labels.color = textColor;
                episodesChart.options.scales.x.ticks.color = textColor;
                episodesChart.options.scales.y.ticks.color = textColor;
                episodesChart.options.scales.x.grid.color = gridColor;
                episodesChart.options.scales.y.grid.color = gridColor;
                episodesChart.update();
            }
        });
    }
}

async function startAnalysis() {
    genreCounts = {}; 
    analyzeDropReasons();
    
    elements.totalCount.textContent = droppedData.length;
    elements.processedCount.textContent = "0";

    initCharts();
    updateEpisodesChart();

    let processed = 0;

    droppedData.forEach(anime => {
        if (apiCache[anime.title]) {
            processStatsData(apiCache[anime.title]);
            processed++;
        }
    });

    updateUI(processed, droppedData.length);

    const toFetch = droppedData.filter(a => !apiCache[a.title]);
    for (let i = 0; i < toFetch.length; i += BATCH_SIZE) {
        const batch = toFetch.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(a => fetchStatsForTitle(a.title)));
        
        processed += batch.length;
        updateUI(processed, droppedData.length);
        saveCache();
        await new Promise(r => setTimeout(r, BATCH_DELAY));
    }
}

function analyzeDropReasons() {
    totalEpsWasted = 0;
    droppedData.forEach(item => {
        const match = item.review.match(/на (\d+)-?[йя]/);
        if (match) {
            const ep = parseInt(match[1], 10);
            totalEpsWasted += ep;
            
            if (ep === 0) episodeDrops["0 (Скип)"]++;
            else if (ep === 1) episodeDrops["1-я серия"]++;
            else if (ep === 2) episodeDrops["2-я серия"]++;
            else if (ep === 3) episodeDrops["3-я серия"]++;
            else if (ep === 4) episodeDrops["4-я серия"]++;
            else episodeDrops["5+ серий"]++;
        }
    });

    const wastedHours = Math.round((totalEpsWasted * 24) / 60);
    const wastedEl = document.getElementById('wastedStats');
    if (wastedEl) {
        wastedEl.innerHTML = `Посмотрено перед дропом: <b>${totalEpsWasted} серий</b> <br> <span style="font-size: 0.8rem;">(Это примерно ${wastedHours} часов потраченного времени впустую 💀)</span>`;
    }
}

async function fetchStatsForTitle(title) {
    try {
        const res = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(title)}&include=genres&page[limit]=1`);
        if (!res.ok) return;
        
        const json = await res.json();
        const stats = {
            genres: json.included?.filter(i => i.type === 'genres').map(i => i.attributes.name) || []
        };

        apiCache[title] = stats;
        processStatsData(stats);
    } catch (e) { console.warn(e); }
}

function processStatsData(data) {
    data.genres?.forEach(g => {
        const ru = genreTranslations[g] || g;
        genreCounts[ru] = (genreCounts[ru] || 0) + 1;
    });
}

function updateUI(current, total) {
    elements.processedCount.textContent = current;
    const percent = Math.round((current / total) * 100);
    if(elements.progressBar) elements.progressBar.style.width = `${percent}%`;
    if(elements.loadingPercent) elements.loadingPercent.textContent = percent === 100 ? "Готово!" : `${percent}%`;

    updateGenresChart();
}

function initCharts() {
    const isLight = document.body.classList.contains('light-theme');
    const textColor = isLight ? '#000000' : '#f3f4f6';
    const gridColor = isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';

    if (elements.genresCtx) {
        genresChart = new Chart(elements.genresCtx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{ data: [], backgroundColor: ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#6366f1'], borderWidth: 2, borderColor: isLight ? '#ffffff' : '#1e293b' }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'right', labels: { color: textColor, font: { size: 12 } } } }
            }
        });
    }

    const epCtx = document.getElementById('episodesChart')?.getContext('2d');
    if (epCtx) {
        episodesChart = new Chart(epCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(episodeDrops),
                datasets: [{
                    label: 'Количество тайтлов',
                    data: Object.values(episodeDrops),
                    backgroundColor: 'rgba(99, 102, 241, 0.8)',
                    borderColor: '#6366f1',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: gridColor }, ticks: { color: textColor, stepSize: 1 } },
                    x: { grid: { display: false }, ticks: { color: textColor } }
                }
            }
        });
    }
}

function updateGenresChart() {
    if (!genresChart) return;
    const sorted = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]).slice(0, 15);
    genresChart.data.labels = sorted.map(i => i[0]);
    genresChart.data.datasets[0].data = sorted.map(i => i[1]);
    genresChart.update();
}

function updateEpisodesChart() {
    if (!episodesChart) return;
    episodesChart.data.datasets[0].data = Object.values(episodeDrops);
    episodesChart.update();
}

function saveCache() { localStorage.setItem(CACHE_KEY, JSON.stringify(apiCache)); }

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
    
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 5000);
}

function maybeSpawnZoro() {
    if (Math.random() > 0.05) return; 
    if (document.querySelector('.zoro-lost')) return;

    console.log("⚔️ Zoro is lost again...");

    const zoro = document.createElement('img');
    zoro.src = 'img/roronoa_zoro.png'; 
    zoro.className = 'zoro-lost';
    document.body.appendChild(zoro);

    setTimeout(() => zoro.classList.add('zoro-walk'), 50);
    setTimeout(() => zoro.remove(), 12000);
}

setTimeout(maybeSpawnZoro, 1000);