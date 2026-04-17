const CACHE_KEY = 'anime_stats_cache_v4';
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
    "Demons": "Демоны", "Historical": "Историческое", "Samurai": "Самураи", "Space": "Космос", "Police": "Полиция", "Dementia": "Безумие", "Kids": "Дети", "Gore": "Гуро", "Parody": "Пародия", "Hentai": "Хентай", "Family": "Семья"
};

const elements = {
    totalCount: document.getElementById('totalCount'),
    processedCount: document.getElementById('processedCount'),
    progressBar: document.getElementById('progressBar'),
    loadingPercent: document.getElementById('loadingPercent'),
    ctx: document.getElementById('genresChart')?.getContext('2d'),
    yearsGrid: document.getElementById('yearsGrid'),
    modal: document.getElementById('yearModal'),
    modalTitle: document.getElementById('modalYearTitle'),
    modalList: document.getElementById('yearAnimeList'),
    closeBtn: document.getElementById('closeYearModal'),
    themeToggle: document.getElementById('themeToggle'),
    toggleGenresBtn: document.getElementById('toggleGenresBtn'),
    genresTitle: document.getElementById('genresTitle')
};

let showAllGenres = false;
let uniqueTitles = new Set(); 
let genreCounts = {};
let animeByYear = {}; 
let myChart = null;
let apiCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupModalEvents();
    
    if (elements.toggleGenresBtn) {
        elements.toggleGenresBtn.addEventListener('click', () => {
            showAllGenres = !showAllGenres;
            
            elements.toggleGenresBtn.textContent = showAllGenres ? "Показать Топ-15" : "Показать всё";
            elements.genresTitle.textContent = showAllGenres ? "Все жанры" : "Топ-15 Жанров";
        
            updateChart();
        });
    }
    
    setTimeout(() => {
        if (typeof tierListData !== 'undefined') startAnalysis();
    }, 100);
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light-theme', savedTheme === 'light');
    elements.themeToggle.checked = (savedTheme !== 'light');

    elements.themeToggle.addEventListener('change', () => {
        const isDark = elements.themeToggle.checked;
        document.body.classList.toggle('light-theme', !isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        if (myChart) {
            myChart.options.plugins.legend.labels.color = isDark ? '#f3f4f6' : '#000000';
            myChart.update();
        }
    });
}

function setupModalEvents() {
    const close = () => {
        elements.modal.close();
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    };

    elements.closeBtn?.addEventListener('click', close);
    elements.modal.addEventListener('click', (e) => e.target === elements.modal && close());
    elements.modal.addEventListener('cancel', close);
}

function openYearModal(year) {
    elements.modalTitle.textContent = `${year} год`;
    elements.modalList.innerHTML = '';
    
    (animeByYear[year] || []).forEach(anime => {
        const imgSrc = anime.image || 'https://via.placeholder.com/150x220/1f2937/9ca3af?text=Loading...';
        const card = document.createElement('div');
        card.className = 'year-anime-card';
        card.innerHTML = `<img src="${imgSrc}" class="year-anime-poster" loading="lazy">
                          <span class="year-anime-title">${anime.title}</span>`;
        elements.modalList.appendChild(card);
    });

    elements.modal.showModal();
    document.body.style.overflow = 'hidden';
}

async function startAnalysis() {
    genreCounts = {}; 
    collectUniqueTitles();
    mapAnimeToUserYears();
    elements.totalCount.textContent = totalEntriesCount;
    elements.processedCount.textContent = uniqueTitles.size;

    
    initChart();
    
    const titles = Array.from(uniqueTitles);
    let processed = 0;

    titles.forEach(title => {
        if (apiCache[title]) {
            processStatsData(apiCache[title], title);
            processed++;
        }
    });

    updateUI(processed, titles.length);

    const toFetch = titles.filter(t => !apiCache[t]);
    for (let i = 0; i < toFetch.length; i += BATCH_SIZE) {
        const batch = toFetch.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(fetchStatsForTitle));
        
        processed += batch.length;
        updateUI(processed, titles.length);
        saveCache();
        await new Promise(r => setTimeout(r, BATCH_DELAY));
    }
}

function mapAnimeToUserYears() {
    Object.keys(tierListData).forEach(key => {
        if (key.match(/^\d{4}$/)) {
            animeByYear[key] = [];
            Object.values(tierListData[key]).forEach(list => {
                if (Array.isArray(list)) {
                    list.forEach(item => item.title && animeByYear[key].push({ title: item.title.trim(), image: null }));
                }
            });
        }
    });
}

async function fetchStatsForTitle(title) {
    try {
        const res = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(title)}&include=genres&page[limit]=1`);
        if (!res.ok) return;
        
        const json = await res.json();
        const data = json.data?.[0];
        
        const stats = {
            image: data?.attributes?.posterImage?.small || null,
            genres: json.included?.filter(i => i.type === 'genres').map(i => i.attributes.name) || []
        };

        apiCache[title] = stats;
        processStatsData(stats, title);
    } catch (e) { console.warn(e); }
}

function processStatsData(data, title) {
    data.genres?.forEach(g => {
        const ru = genreTranslations[g] || g;
        genreCounts[ru] = (genreCounts[ru] || 0) + 1;
    });

    Object.values(animeByYear).forEach(list => {
        const anime = list.find(a => a.title === title);
        if (anime) anime.image = data.image;
    });
}

let yearsRendered = false;

function updateUI(current, total) {
    const percent = Math.round((current / total) * 100);
    elements.progressBar.style.width = `${percent}%`;
    elements.loadingPercent.textContent = percent === 100 ? "Готово!" : `${percent}%`;

    updateChart();

    if (percent === 100 && !yearsRendered) {
        renderYearsStats();
        yearsRendered = true;
    }
}

function renderYearsStats() {
    elements.yearsGrid.innerHTML = '';
    Object.keys(animeByYear).map(Number).sort((a, b) => b - a).forEach(y => {
        const count = animeByYear[y].length;
        const card = document.createElement('div');
        card.className = `year-card ${count === 0 ? 'empty' : ''}`;
        card.innerHTML = `<span class="year-label">${y}</span><span class="year-count">${count}</span>`;
        if (count > 0) card.onclick = () => openYearModal(y);
        elements.yearsGrid.appendChild(card);
    });
}

function initChart() {
    const isLight = document.body.classList.contains('light-theme');
    myChart = new Chart(elements.ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{ data: [], backgroundColor: ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#6366f1'], borderWidth: 2, borderColor: '#1f2937' }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'right', labels: { color: isLight ? '#000000' : '#f3f4f6', font: { size: 12 } } } }
        }
    });
}

function generateColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const hue = (i * 137.5) % 360; 
        colors.push(`hsl(${hue}, 70%, 55%)`);
    }
    return colors;
}

function updateChart() {
    if (!myChart) return;
    
    let sorted = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]); 
    
    if (!showAllGenres) {
        sorted = sorted.slice(0, 15);
    }
    
    myChart.data.labels = sorted.map(i => i[0]);
    myChart.data.datasets[0].data = sorted.map(i => i[1]);
    myChart.data.datasets[0].backgroundColor = generateColors(sorted.length);
    
    myChart.update();
}

function collectUniqueTitles() {
    uniqueTitles.clear();
    totalEntriesCount = 0;

    const seen = new Set();

    Object.keys(tierListData).forEach(key => {
        if (key === 'Энергетики') return;

        Object.values(tierListData[key]).forEach(list => {
            if (!Array.isArray(list)) return;

            list.forEach(item => {
                if (!item.title) return;

                totalEntriesCount++;

                const clean = item.title.trim();
                const lower = clean.toLowerCase();

                if (!seen.has(lower)) {
                    seen.add(lower);
                    uniqueTitles.add(clean);
                }
            });
        });
    });
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

    setTimeout(() => {
        zoro.classList.add('zoro-walk');
    }, 50);

    setTimeout(() => {
        zoro.remove();
    }, 12000);
}

if (typeof tabButtons !== 'undefined') {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', maybeSpawnZoro);
    });
}

setTimeout(maybeSpawnZoro, 1000);