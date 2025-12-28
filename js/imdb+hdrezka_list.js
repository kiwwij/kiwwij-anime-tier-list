const container = document.getElementById('mediaContainer');
const searchInput = document.getElementById('searchInput');
let currentView = 'grid';

// === ЛОГИКА ЗАГРУЗКИ ПОСТЕРОВ ===
async function loadPoster(item, index) {
    const cacheKey = `poster_v2_${item.title}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
        updateImage(index, cached);
        return;
    }

    let imdbId = null;
    if (item.imdbLink && item.imdbLink.includes('tt')) {
        const match = item.imdbLink.match(/tt\d+/);
        if (match) imdbId = match[0];
    }

    if (imdbId) {
        const metahubUrl = `https://images.metahub.space/poster/medium/${imdbId}/img`;
        const img = new Image();
        img.onload = () => {
            localStorage.setItem(cacheKey, metahubUrl);
            updateImage(index, metahubUrl);
        };
        img.onerror = () => {
            fetchFromITunes(item.title, item.type, index, cacheKey);
        };
        img.src = metahubUrl;
    } else {
        fetchFromITunes(item.title, item.type, index, cacheKey);
    }
}

async function fetchFromITunes(title, type, index, cacheKey) {
    try {
        const entity = type === 'tv' ? 'tvShow' : 'movie';
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(title)}&media=${type === 'tv' ? 'tvShow' : 'movie'}&entity=${entity}&limit=1`);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const artworkUrl = data.results[0].artworkUrl100.replace('100x100bb', '600x900bb');
            localStorage.setItem(cacheKey, artworkUrl);
            updateImage(index, artworkUrl);
        } else {
            updateImage(index, 'https://placehold.co/600x900/1e293b/FFF?text=No+Img');
        }
    } catch (e) {
        updateImage(index, 'https://placehold.co/600x900/1e293b/FFF?text=Err');
    }
}

function updateImage(index, url) {
    const img = document.getElementById(`poster-${index}`);
    if (img) {
        img.src = url;
        img.classList.remove('loading');
    }
}

// === ОСНОВНАЯ ФУНКЦИЯ ОТРИСОВКИ ===
function render() {
    const sortMode = document.getElementById('sortSelect').value;
    const searchQuery = searchInput.value.toLowerCase().trim();
    
    // Получаем элементы пасхалок
    const dogEgg = document.getElementById('dogEgg');
    const catEgg = document.getElementById('catEgg');

    // Сбрасываем видимость перед проверкой
    if (dogEgg) dogEgg.style.display = 'none';
    if (catEgg) catEgg.style.display = 'none';
    container.style.display = currentView === 'grid' ? 'grid' : 'block';

    // ПРОВЕРКА НА ПАСХАЛКИ
    if (searchQuery === 'dog') {
        container.style.display = 'none';
        if (dogEgg) {
            dogEgg.style.display = 'block';
            const img = dogEgg.querySelector('img');
            // if (img) img.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZueXF4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/mlvseq9nOe4QXCLGDC/giphy.gif";
        }
        return; 
    } 
    
    if (searchQuery === 'cat') {
        container.style.display = 'none';
        if (catEgg) {
            catEgg.style.display = 'block';
            const img = catEgg.querySelector('img');
            // if (img) img.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZueXF4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/QvBoMEjiHTeDwbhK9H/giphy.gif";
        }
        return;
    }

    // 1. Создаем копию списка с индексами
    let list = mediaData.map((item, idx) => ({ ...item, originalIndex: idx }));

    // 2. ФИЛЬТРАЦИЯ
    if (searchQuery) {
        list = list.filter(item => 
            item.title.toLowerCase().includes(searchQuery) || 
            item.ruTitle.toLowerCase().includes(searchQuery) ||
            item.year.toString().includes(searchQuery)
        );
    }

    // 3. СОРТИРОВКА
    if (sortMode === 'rating-desc') {
        list.sort((a,b) => b.myRating - a.myRating);
    } else if (sortMode === 'alpha-asc') {
        list.sort((a,b) => a.ruTitle.localeCompare(b.ruTitle));
    }

    container.className = `media-container view-${currentView}`;
    container.innerHTML = '';

    if (list.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align:center; color:#9ca3af; padding: 40px;">Ничего не найдено :(</div>';
        return;
    }

    // 4. ГЕНЕРАЦИЯ КАРТОЧЕК
    list.forEach((item) => {
        let link = item.imdbLink || `https://www.imdb.com/find?q=${encodeURIComponent(item.title)}`;
        const target = '_blank';
        const imgId = `poster-${item.originalIndex}`;
        const placeholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyIDMiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjMiIGZpbGw9IiMxZTI5M2IiLz48L3N2Zz4=';

        let html = '';
        if (currentView === 'grid') {
            html = `
            <a href="${link}" target="${target}" class="media-item">
                <img id="${imgId}" src="${placeholder}" class="media-poster loading" loading="lazy">
                <div class="media-body">
                    <div class="ru-title">${item.ruTitle}</div>
                    <div class="en-title">${item.title}</div>
                    <div class="meta-info">
                        <span style="color:var(--text-muted); font-size:0.8rem">${item.year}</span>
                        <div class="rating-badge">
                            ${item.imdbRating > 0 ? `<span class="imdb-score">★ ${item.imdbRating}</span>` : ''}
                            <span class="my-score">${item.myRating}</span>
                        </div>
                    </div>
                </div>
            </a>`;
        } else {
            html = `
            <a href="${link}" target="${target}" class="media-item">
                <img id="${imgId}" src="${placeholder}" class="media-poster loading" loading="lazy">
                <div class="media-body" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <div class="ru-title">${item.ruTitle}</div>
                    <div style="display: flex; gap: 15px; align-items: center;">
                        <span class="my-score">Мой: ${item.myRating}</span>
                        <span class="imdb-score">IMDb: ${item.imdbRating}</span>
                        <span style="color:var(--text-muted)">${item.year}</span>
                    </div>
                </div>
            </a>`;
        }
        container.insertAdjacentHTML('beforeend', html);
        loadPoster(item, item.originalIndex);
    });
}

// === ИНИЦИАЛИЗАЦИЯ СОБЫТИЙ ===
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        render();
    };
});

document.getElementById('sortSelect').onchange = render;
searchInput.addEventListener('input', render);

// Первый запуск
render();