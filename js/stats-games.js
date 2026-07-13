const RAWG_API_KEY = 'eff5af7536f94b1b862edf995f4ee1f9';
const CACHE_KEY_GAMES = 'games_stats_cache_v3';
let apiCache = JSON.parse(localStorage.getItem(CACHE_KEY_GAMES) || '{}');

const MAX_CONCURRENT = 30;
const REQUEST_DELAY = 150;

let allGames = [];
let requestQueue = [];
let loadedCount = 0;

const genreMap = {
    'Action': 'Экшен', 'RPG': 'РПГ', 'Shooter': 'Шутер', 'Adventure': 'Приключение',
    'Indie': 'Инди', 'Strategy': 'Стратегия', 'Platformer': 'Платформер', 'Puzzle': 'Головоломка',
    'Racing': 'Гонки', 'Sports': 'Спорт', 'Simulation': 'Симулятор', 'Casual': 'Казуальная',
    'Fighting': 'Файтинг', 'Family': 'Семейная', 'Massively Multiplayer': 'ММО', 'Arcade': 'Аркада'
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof tierListData === 'undefined' || !tierListData['Игры']) {
        console.error("Данные игр не найдены!");
        return;
    }
    initGamesStats();
    setupToggleButtons();
});

function initGamesStats() {
    const gamesData = tierListData['Игры'].data;
    const tiers = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];
    
    tiers.forEach(tier => {
        if (gamesData[tier]) {
            gamesData[tier].forEach(game => {
                allGames.push({ ...game, tier: tier });
            });
        }
    });

    document.getElementById('totalGamesCount').innerText = allGames.length;

    allGames.forEach(game => {
        if (!apiCache[game.title]) {
            requestQueue.push(game.title);
        } else {
            loadedCount++;
        }
    });

    updateProgress();

    if (requestQueue.length > 0) {
        processQueue();
    } else {
        finishLoading();
    }
}

function updateProgress() {
    const total = allGames.length;
    const percent = total === 0 ? 100 : Math.round((loadedCount / total) * 100);
    
    const progressBar = document.getElementById('progressBar');
    const percentText = document.getElementById('loadingPercent');
    
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (percentText) percentText.innerText = `${percent}%`;
    document.getElementById('processedCount').innerText = loadedCount;
}

async function processQueue() {
    while (requestQueue.length > 0) {
        const batch = requestQueue.splice(0, MAX_CONCURRENT);
        
        await Promise.all(batch.map(async (title) => {
            try {
                const searchUrl = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(title)}&page_size=1`;
                const response = await fetch(searchUrl);
                const json = await response.json();

                if (json.results && json.results.length > 0) {
                    const g = json.results[0];
                    
                    const detailRes = await fetch(`https://api.rawg.io/api/games/${g.id}?key=${RAWG_API_KEY}`);
                    const details = await detailRes.json();

                    apiCache[title] = {
                        id: g.id,
                        name: g.name,
                        released: g.released ? g.released.substring(0, 4) : 'Неизвестно',
                        rating: g.rating ? (g.rating * 2).toFixed(1) : 0, 
                        genres: g.genres.map(genre => genreMap[genre.name] || genre.name),
                        developers: details.developers ? details.developers.map(d => d.name) : [],
                        img: g.background_image
                    };
                } else {
                    apiCache[title] = { notFound: true };
                }
                localStorage.setItem(CACHE_KEY_GAMES, JSON.stringify(apiCache));
            } catch (e) {
                console.error(`Ошибка загрузки ${title}:`, e);
            }
            loadedCount++;
            updateProgress();
        }));
        
        await new Promise(r => setTimeout(r, REQUEST_DELAY));
    }
    finishLoading();
}

function finishLoading() {
    document.getElementById('progressContainer').innerHTML = '<p style="color: #22c55e; font-weight: 600;"><i class="bx bx-check-circle"></i> Анализ завершён!</p>';
    calculateStats();
    renderExplorer();
}

function calculateStats() {
    let yearCounts = {};
    let genreCounts = {};
    let devCounts = {};
    let totalRating = 0;
    let ratingCount = 0;

    allGames.forEach(game => {
        const data = apiCache[game.title];
        if (!data || data.notFound) return;

        const year = data.released;
        if (year !== 'Неизвестно') yearCounts[year] = (yearCounts[year] || 0) + 1;

        if (data.genres) {
            data.genres.forEach(g => genreCounts[g] = (genreCounts[g] || 0) + 1);
        }

        if (data.developers) {
            data.developers.forEach(d => devCounts[d] = (devCounts[d] || 0) + 1);
        }

        const r = parseFloat(data.rating);
        if (r > 0) {
            totalRating += r;
            ratingCount++;
        }
    });

    if (ratingCount > 0) {
        document.getElementById('avgRating').innerText = (totalRating / ratingCount).toFixed(2);
    }

    drawYearsChart(yearCounts);
    drawGenresChart(genreCounts);
    drawDevsChart(devCounts);
}

let yearsChartInstance = null;
let genresChartInstance = null;
let devsChartInstance = null;

function drawYearsChart(yearData) {
    const ctx = document.getElementById('gameYearsChart');
    if (!ctx) return;
    const years = Object.keys(yearData).sort();
    const counts = years.map(y => yearData[y]);

    yearsChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{ label: 'Выпущено игр', data: counts, borderColor: '#6366f1', backgroundColor: 'rgba(99, 102, 241, 0.2)', borderWidth: 3, fill: true, tension: 0.4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { color: '#94a3b8' } }, x: { ticks: { color: '#94a3b8' }, grid: { display: false } } } }
    });
}

function drawGenresChart(genreData) {
    const ctx = document.getElementById('gameGenresChart');
    if (!ctx) return;
    const sorted = Object.entries(genreData).sort((a, b) => b[1] - a[1]).slice(0, 10);
    genresChartInstance = new Chart(ctx, {
        type: 'bar',
        data: { labels: sorted.map(i => i[0]), datasets: [{ data: sorted.map(i => i[1]), backgroundColor: '#6366f1', borderRadius: 6 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { color: '#94a3b8' } }, x: { ticks: { color: '#94a3b8' }, grid: { display: false } } } }
    });
}

function drawDevsChart(devData) {
    const ctx = document.getElementById('gameDevsChart');
    if (!ctx) return;
    const sorted = Object.entries(devData).sort((a, b) => b[1] - a[1]).slice(0, 10);
    devsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: { labels: sorted.map(i => i[0]), datasets: [{ data: sorted.map(i => i[1]), backgroundColor: '#10b981', borderRadius: 6 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { color: '#94a3b8' } }, x: { ticks: { color: '#94a3b8' }, grid: { display: false } } } }
    });
}

function setupToggleButtons() {
    const btnGenres = document.getElementById('showGenresBtn');
    const btnDevs = document.getElementById('showDevsBtn');
    const chartGenres = document.getElementById('gameGenresChart');
    const chartDevs = document.getElementById('gameDevsChart');

    if (btnGenres && btnDevs) {
        btnGenres.addEventListener('click', () => {
            btnGenres.classList.add('active'); btnDevs.classList.remove('active');
            chartGenres.style.display = 'block'; chartDevs.style.display = 'none';
        });
        btnDevs.addEventListener('click', () => {
            btnDevs.classList.add('active'); btnGenres.classList.remove('active');
            chartDevs.style.display = 'block'; chartGenres.style.display = 'none';
        });
    }
}

function renderExplorer() {
    const grid = document.getElementById('gameExplorerGrid');
    if (!grid) return;
    grid.innerHTML = '';

    allGames.forEach(game => {
        const data = apiCache[game.title];
        const card = document.createElement('div');
        card.className = 'explorer-card';
        const year = data && data.released ? data.released : '----';
        const rating = data && data.rating > 0 ? data.rating : 'N/A';

        card.innerHTML = `
            <div class="explorer-card-title">${game.title}</div>
            <div class="explorer-card-meta">
                <span><i class='bx bx-calendar'></i> ${year}</span>
                <span style="color: #facc15;"><i class='bx bxs-star'></i> ${rating}</span>
            </div>
        `;
        card.onclick = () => openGameModal(game, data);
        grid.appendChild(card);
    });

    document.getElementById('gameExplorerSearch').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        Array.from(grid.children).forEach(card => {
            const title = card.querySelector('.explorer-card-title').innerText.toLowerCase();
            card.style.display = title.includes(query) ? 'flex' : 'none';
        });
    });
}

function linkify(text) {
    if (!text) return "";
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return `<a href="${url}" target="_blank" style="color: var(--accent); text-decoration: none; border-bottom: 1px solid var(--accent);">${url}</a>`;
    });
}

async function translateTextToRu(text) {
    if (!text || text === "Нет официального описания.") return text;
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        const json = await res.json();

        return json[0].map(item => item[0]).join('');
    } catch (e) {
        console.warn("Ошибка автоперевода:", e);
        return text;
    }
}

async function openGameModal(localItem, cachedData) {
    const modal = document.getElementById('gameMediaModal');
    const layout = document.getElementById('gameModalLayout');
    
    layout.innerHTML = `<div style="padding: 2rem; text-align: center; width: 100%;">
        <i class='bx bx-loader-alt bx-spin' style='font-size: 3rem; color: #6366f1;'></i>
        <p>Загрузка данных...</p>
    </div>`;
    modal.showModal();

    let fullDetails = null;
    let steamAppId = null;

    if (cachedData && cachedData.id) {
        try {
            const res = await fetch(`https://api.rawg.io/api/games/${cachedData.id}?key=${RAWG_API_KEY}`);
            fullDetails = await res.json();
            
            const steamStore = fullDetails.stores?.find(s => s.store.id === 1 || s.url?.includes('steampowered.com'));
            if (steamStore && steamStore.url) {
                const match = steamStore.url.match(/\/app\/(\d+)/);
                if (match) steamAppId = match[1];
            }
        } catch(e) {}
    }

    let metacriticScore = fullDetails?.metacritic || 'N/A';
    let rawgDescription = fullDetails?.description_raw || "Нет официального описания.";
    let finalDescription = rawgDescription;
    let descriptionSource = "RAWG";
    let gotSteamDesc = false;

    const dev = cachedData?.developers?.length > 0 ? cachedData.developers[0] : 'Неизвестно';
    const img = cachedData?.img ? cachedData.img : (localItem.img ? `../img/${localItem.img}` : '');

    if (steamAppId) {
        try {
            const steamRes = await fetch(`https://corsproxy.io/?https://store.steampowered.com/api/appdetails?appids=${steamAppId}&l=russian`);
            const steamJson = await steamRes.json();
            const sData = steamJson[steamAppId]?.data;
            if (sData) {
                if (sData.about_the_game && sData.about_the_game.length > 50) {
                    finalDescription = sData.about_the_game;
                    descriptionSource = "Steam (Официальный русский)";
                    gotSteamDesc = true;
                }
                if (sData.metacritic && metacriticScore === 'N/A') metacriticScore = sData.metacritic.score;
            }
        } catch (e) {
            console.warn("Не удалось стянуть Steam данные:", e);
        }
    }

    if (!gotSteamDesc) {
        finalDescription = await translateTextToRu(rawgDescription);
    }

    const myReview = localItem.review ? linkify(localItem.review) : 'Отзыв не оставлен.';

    layout.innerHTML = `
        <div class="modal-poster-wrapper">
            ${img ? `<img src="${img}" alt="Обложка">` : `<div style="height:300px; background:#1e293b; border-radius:14px; display:flex; align-items:center; justify-content:center;">Нет фото</div>`}
        </div>
        <div class="modal-info-wrapper">
            <div>
                <h2 class="modal-main-title">${localItem.title}</h2>
                <div class="modal-sub-title">Тир: <strong>${localItem.tier}</strong> | Разработчик: ${dev}</div>
            </div>
            
            <div class="modal-meta-grid">
                <div class="meta-item-box">
                    <label>Metacritic</label>
                    <span style="color: ${metacriticScore >= 75 ? '#22c55e' : (metacriticScore >= 50 ? '#facc15' : '#ef4444')};">${metacriticScore}</span>
                </div>
                <div class="meta-item-box">
                    <label>Дата выхода</label>
                    <span>${fullDetails ? fullDetails.released : (cachedData ? cachedData.released : '---')}</span>
                </div>
            </div>

            <div class="modal-overview">
                <strong>Мой отзыв: </strong> ${myReview}
                <hr style="border-color: rgba(150,150,150,0.2); margin: 15px 0;">
                <details>
                    <summary style="cursor: pointer; font-weight: 600; color: var(--accent);">Официальное описание с ${descriptionSource}</summary>
                    <div style="margin-top: 10px; font-size: 0.85rem; line-height: 1.5; opacity: 0.9;">${finalDescription}</div>
                </details>
            </div>
        </div>
    `;

    document.getElementById('closeGameModal').onclick = () => modal.close();
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
}