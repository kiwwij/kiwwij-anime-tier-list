const TMDB_API_KEY = '9b13f4b2b3fe40f325c8adce349bfd3c';

const CACHE_KEY = 'tmdb_movies_stats_cache_v2';
const BATCH_SIZE = 5; 
const BATCH_DELAY = 300; 

const languageMap = { "en": "Английский", "ja": "Японский", "ko": "Корейский", "ru": "Русский", "fr": "Французский", "de": "Немецкий", "es": "Испанский" };
const statusMap = { "Released": "Вышел в прокат", "Ended": "Завершён", "Returning Series": "Продолжается", "Canceled": "Отменён", "Post Production": "Пост-продакшн" };

let apiCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');

let statsAggregator = { totalRuntime: 0, totalRevenue: 0, genres: {}, years: {} };
let genresChart = null;
let yearsChart = null;

const elements = {
    totalCount: document.getElementById('totalCount'),
    totalHours: document.getElementById('totalHours'),
    totalRevenue: document.getElementById('totalRevenue'),
    progressBar: document.getElementById('progressBar'),
    loadingPercent: document.getElementById('loadingPercent'),
    progressStatus: document.getElementById('progressStatus'),
    themeToggle: document.getElementById('themeToggle'),
    explorerGrid: document.getElementById('explorerGrid'),
    explorerSearch: document.getElementById('explorerSearch'),
    mediaModal: document.getElementById('mediaModal'),
    modalLayout: document.getElementById('modalLayout'),
    closeMediaModal: document.getElementById('closeMediaModal')
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    elements.totalCount.textContent = mediaData.length;
    
    initCharts();
    renderExplorerGrid();

    if (TMDB_API_KEY === 'ТВОЙ_КЛЮЧ_TMDB_API' || TMDB_API_KEY === '') {
        elements.progressStatus.innerHTML = "<strong style='color: #ef4444;'>ОШИБКА:</strong> API ключ не работает или не указан!";
        return;
    }

    if (typeof mediaData !== 'undefined') {
        startTMDBAnalysis();
    }

    if (elements.explorerSearch) {
        elements.explorerSearch.addEventListener('input', filterExplorerGrid);
    }

    if (elements.closeMediaModal) {
        elements.closeMediaModal.addEventListener('click', () => elements.mediaModal.close());
    }
    elements.mediaModal.addEventListener('click', (e) => {
        if (e.target === elements.mediaModal) elements.mediaModal.close();
    });
});

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

            if (genresChart) { genresChart.options.plugins.legend.labels.color = textColor; genresChart.update(); }
            if (yearsChart) {
                yearsChart.options.scales.x.ticks.color = textColor;
                yearsChart.options.scales.y.ticks.color = textColor;
                yearsChart.options.scales.x.grid.color = gridColor;
                yearsChart.options.scales.y.grid.color = gridColor;
                yearsChart.update();
            }
        });
    }
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function renderExplorerGrid() {
    if (!elements.explorerGrid) return;
    elements.explorerGrid.innerHTML = '';

    mediaData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'explorer-card';
        card.setAttribute('data-title', item.ruTitle.toLowerCase() + ' ' + item.title.toLowerCase());
        
        const typeIcon = item.type === 'tv' ? "<i class='bx bx-tv'></i> Сериал" : "<i class='bx bx-film'></i> Фильм";

        card.innerHTML = `
            <div class="explorer-card-title">${item.ruTitle}</div>
            <div class="explorer-card-meta">
                <span>${item.year} г.</span>
                <span class="explorer-card-type">${typeIcon}</span>
            </div>
        `;

        card.addEventListener('click', () => openDetailedModal(item));
        elements.explorerGrid.appendChild(card);
    });
}

function filterExplorerGrid(e) {
    const query = e.target.value.toLowerCase().trim();
    const cards = elements.explorerGrid.querySelectorAll('.explorer-card');
    
    cards.forEach(card => {
        const text = card.getAttribute('data-title');
        card.style.display = text.includes(query) ? 'flex' : 'none';
    });
}

async function openDetailedModal(item) {
    elements.modalLayout.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);"><i class='bx bx-loader-alt bx-spin' style='font-size: 3rem; color: var(--accent); margin-bottom: 1rem;'></i><br>Извлекаем полную информацию из TMDB...</div>`;
    elements.mediaModal.showModal();

    const imdbId = extractImdbId(item.imdbLink);
    let fullData = imdbId ? apiCache[imdbId] : null;

    if (!fullData || !fullData.extended) {
        fullData = await fetchExtendedTMDBData(item);
    }

    if (!fullData) {
        elements.extendedLayout = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Не удалось загрузить данные из TMDB для этого тайтла.</p>`;
        return;
    }

    const ext = fullData.extended;
    const formatMoney = (sum) => sum > 0 ? new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(sum) : 'Нет данных';
    
    const companies = ext.production_companies && ext.production_companies.length > 0 ? ext.production_companies.map(c => c.name).join(', ') : 'Не указаны';
    const countries = ext.production_countries && ext.production_countries.length > 0 ? ext.production_countries.map(c => c.name).join(', ') : 'Не указаны';
    const networks = ext.networks && ext.networks.length > 0 ? ext.networks.map(n => n.name).join(', ') : null;
    const belongsToCollection = ext.belongs_to_collection ? ext.belongs_to_collection.name : null;

    elements.modalLayout.innerHTML = `
        <div class="modal-poster-wrapper">
            <img src="${fullData.poster_path || 'https://placehold.co/600x900/1e293b/FFF?text=No+Poster'}" alt="Poster">
        </div>
        <div class="modal-info-wrapper">
            <div>
                <div class="modal-main-title">${item.ruTitle}</div>
                <div class="modal-sub-title">${ext.title || ext.name || item.title} (${item.year})</div>
            </div>
            
            ${ext.overview ? `<div class="modal-overview">${ext.overview}</div>` : `<div class="modal-overview" style="font-style: italic; color: var(--text-muted);">Описание на русском языке в базе TMDB отсутствует.</div>`}
            
            <div class="modal-meta-grid">
                <div class="meta-item-box">
                    <label>Рейтинги</label>
                    <div class="rating-comparison">
                        <span style="color: #facc15;" title="Ваш личный рейтинг">😎 ${item.myRating}</span>
                        <span title="Рейтинг TMDB">⭐ ${ext.vote_average ? ext.vote_average.toFixed(1) : item.imdbRating} <small style="font-weight:normal; font-size: 0.75rem; color: var(--text-muted);">(${ext.vote_count || 0})</small></span>
                    </div>
                </div>
                <div class="meta-item-box">
                    <label>Статус произведения</label>
                    <span>${statusMap[ext.status] || ext.status || 'Вышел'}</span>
                </div>
                <div class="meta-item-box">
                    <label>Язык оригинала</label>
                    <span>${languageMap[ext.original_language] || ext.original_language?.toUpperCase() || 'Английский'}</span>
                </div>
                <div class="meta-item-box">
                    <label>Продолжительность</label>
                    <span>${item.type === 'tv' ? `${ext.number_of_episodes || 0} сер. / ${ext.number_of_seasons || 0} сез.` : `${ext.runtime || 0} минут`}</span>
                </div>
                
                ${item.type === 'movie' ? `
                    <div class="meta-item-box">
                        <label>Бюджет картины</label>
                        <span style="color: #ef4444;">${formatMoney(ext.budget)}</span>
                    </div>
                    <div class="meta-item-box">
                        <label>Мировые сборы</label>
                        <span style="color: #22c55e;">${formatMoney(ext.revenue)}</span>
                    </div>
                ` : ''}

                ${item.type === 'tv' && networks ? `
                    <div class="meta-item-box" style="grid-column: span 2;">
                        <label>Телесеть / Платформа</label>
                        <span>${networks}</span>
                    </div>
                ` : ''}

                ${belongsToCollection ? `
                    <div class="meta-item-box" style="grid-column: span 2;">
                        <label>Киновселенная / Серия</label>
                        <span><i class='bx bxs-layer'></i> ${belongsToCollection}</span>
                    </div>
                ` : ''}

                <div class="meta-item-box" style="grid-column: span 2;">
                    <label>Киностудии</label>
                    <span style="font-size: 0.85rem; font-weight: normal; color: var(--text-muted);">${companies}</span>
                </div>
                <div class="meta-item-box" style="grid-column: span 2;">
                    <label>Страны производства</label>
                    <span style="font-size: 0.85rem; font-weight: normal; color: var(--text-muted);">${countries}</span>
                </div>
            </div>
        </div>
    `;
}

async function fetchExtendedTMDBData(item) {
    const imdbId = extractImdbId(item.imdbLink);
    if (!imdbId) return null;

    try {
        const findUrl = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id&language=ru-RU`;
        const findRes = await fetch(findUrl);
        const findData = await findRes.json();

        let tmdbId = null;
        let mediaType = item.type === 'tv' ? 'tv' : 'movie';

        if (findData.movie_results && findData.movie_results.length > 0) tmdbId = findData.movie_results[0].id;
        else if (findData.tv_results && findData.tv_results.length > 0) tmdbId = findData.tv_results[0].id;

        if (!tmdbId) return null;

        const detailsUrl = `https://api.themoviedb.org/3/${mediaType}/${tmdbId}?api_key=${TMDB_API_KEY}&language=ru-RU`;
        const detailsRes = await fetch(detailsUrl);
        const detailsData = await detailsRes.json();

        const poster_path = detailsData.poster_path ? `https://image.tmdb.org/t/p/w500${detailsData.poster_path}` : null;

        apiCache[imdbId] = {
            runtime: item.type === 'tv' ? (detailsData.episode_run_time?.[0] || 45) * (detailsData.number_of_episodes || 1) : (detailsData.runtime || 0),
            revenue: detailsData.revenue || 0,
            genres: detailsData.genres ? detailsData.genres.map(g => g.name) : [],
            release_year: item.year,
            poster_path: poster_path,
            extended: detailsData 
        };
        return apiCache[imdbId];
    } catch (e) {
        console.error(e);
        return null;
    }
}

async function startTMDBAnalysis() {
    let processed = 0;

    mediaData.forEach(item => {
        const imdbId = extractImdbId(item.imdbLink);
        if (imdbId && apiCache[imdbId]) {
            processStatsData(apiCache[imdbId]);
            processed++;
        }
    });

    updateUI(processed, mediaData.length);

    const toFetch = mediaData.filter(a => extractImdbId(a.imdbLink) && (!apiCache[extractImdbId(a.imdbLink)] || !apiCache[extractImdbId(a.imdbLink)].extended));
    
    for (let i = 0; i < toFetch.length; i += BATCH_SIZE) {
        const batch = toFetch.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(async (a) => {
            const imdbId = extractImdbId(a.imdbLink);
            if(imdbId) {
                const res = await fetchExtendedTMDBData(a);
                if (res) apiCache[imdbId] = res;
            }
        }));
        
        processed += batch.length;
        updateUI(processed, mediaData.length);
        localStorage.setItem(CACHE_KEY, JSON.stringify(apiCache)); 
        
        await new Promise(r => setTimeout(r, BATCH_DELAY));
    }
}

function extractImdbId(url) {
    if (!url) return null;
    const match = url.match(/tt\d+/);
    return match ? match[0] : null;
}

function processStatsData(data) {
    statsAggregator.totalRuntime += data.runtime || 0;
    statsAggregator.totalRevenue += data.revenue || 0;

    if (data.genres) {
        data.genres.forEach(g => {
            const genreTitle = g.charAt(0).toUpperCase() + g.slice(1);
            statsAggregator.genres[genreTitle] = (statsAggregator.genres[genreTitle] || 0) + 1;
        });
    }
    if (data.release_year) {
        statsAggregator.years[data.release_year] = (statsAggregator.years[data.release_year] || 0) + 1;
    }
}

function updateUI(current, total) {
    const percent = Math.round((current / total) * 100);
    if(elements.progressBar) elements.progressBar.style.width = `${percent}%`;
    if(elements.loadingPercent) elements.loadingPercent.textContent = percent === 100 ? "Готово!" : `${percent}%`;
    
    if(percent === 100 && elements.progressStatus) elements.progressStatus.textContent = "Все данные успешно синхронизированы.";

    if(elements.totalHours) elements.totalHours.textContent = Math.round(statsAggregator.totalRuntime / 60);
    
    if (elements.totalRevenue && statsAggregator.totalRevenue > 0) {
        if (statsAggregator.totalRevenue >= 1000000000) {
            elements.totalRevenue.textContent = `$${(statsAggregator.totalRevenue / 1000000000).toFixed(2)}B`;
        } else {
            elements.totalRevenue.textContent = `$${(statsAggregator.totalRevenue / 1000000).toFixed(1)}M`;
        }
    }
    updateCharts();
}

function getThemeColors() {
    const isLight = document.body.classList.contains('light-theme');
    return {
        text: isLight ? '#000000' : '#f3f4f6',
        grid: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
    };
}

function generatePalette(count) {
    const colors = [];
    for (let i = 0; i < count; i++) { colors.push(`hsl(${(i * 137.5) % 360}, 75%, 55%)`); }
    return colors;
}

function initCharts() {
    const colors = getThemeColors();
    if (!document.getElementById('genresChart')) return;

    const gCtx = document.getElementById('genresChart').getContext('2d');
    genresChart = new Chart(gCtx, {
        type: 'doughnut',
        data: { labels: [], datasets: [{ data: [], backgroundColor: [], borderWidth: 2, borderColor: 'transparent' }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'right', labels: { color: colors.text } } }
        }
    });

    const yCtx = document.getElementById('yearsChart').getContext('2d');
    yearsChart = new Chart(yCtx, {
        type: 'bar',
        data: { labels: [], datasets: [{ label: 'Тайтлов', data: [], backgroundColor: 'rgba(99, 102, 241, 0.8)', borderColor: '#6366f1', borderWidth: 1, borderRadius: 4 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: colors.grid }, ticks: { color: colors.text, stepSize: 1 } },
                x: { grid: { display: false }, ticks: { color: colors.text } }
            }
        }
    });
}

function updateCharts() {
    if(!genresChart || !yearsChart) return;
    let sortedGenres = Object.entries(statsAggregator.genres).sort((a, b) => b[1] - a[1]).slice(0, 12);
    genresChart.data.labels = sortedGenres.map(i => i[0]);
    genresChart.data.datasets[0].data = sortedGenres.map(i => i[1]);
    genresChart.data.datasets[0].backgroundColor = generatePalette(sortedGenres.length);
    genresChart.update();

    const sortedYears = Object.entries(statsAggregator.years).sort((a, b) => a[0] - b[0]);
    yearsChart.data.labels = sortedYears.map(i => i[0]);
    yearsChart.data.datasets[0].data = sortedYears.map(i => i[1]);
    yearsChart.update();
}