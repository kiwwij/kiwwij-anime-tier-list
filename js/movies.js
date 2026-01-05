const container = document.getElementById('mediaContainer');
const searchInput = document.getElementById('searchInput');
let currentView = 'grid';
let easterEggTimer = null; // Переменная для хранения таймера

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
    
    const dogEgg = document.getElementById('dogEgg');
    const catEgg = document.getElementById('catEgg');
    const eggsContainer = document.getElementById('easter-eggs');

    // Сброс видимости перед проверкой
    if (dogEgg) dogEgg.style.display = 'none';
    if (catEgg) catEgg.style.display = 'none';
    if (eggsContainer) eggsContainer.style.display = 'none';
    container.style.display = currentView === 'grid' ? 'grid' : 'block';

    // Очищаем старый таймер, если пользователь ввел что-то новое
    if (easterEggTimer) {
        clearTimeout(easterEggTimer);
        easterEggTimer = null;
    }

    // ПРОВЕРКА НА ПАСХАЛКИ
    if (searchQuery === 'dog' || searchQuery === 'cat') {
        container.style.display = 'none';
        if (eggsContainer) {
            eggsContainer.style.display = 'flex';
            if (searchQuery === 'dog' && dogEgg) dogEgg.style.display = 'block';
            if (searchQuery === 'cat' && catEgg) catEgg.style.display = 'block';

            // Установка таймера на 5 секунд для удаления текста
            easterEggTimer = setTimeout(() => {
                searchInput.value = ''; // Очищаем поиск
                render(); // Перерисовываем (это вернет фильмы)
            }, 5000);
        }
        return; 
    }

    let list = mediaData.map((item, idx) => ({ ...item, originalIndex: idx }));

    if (searchQuery) {
        list = list.filter(item => 
            item.title.toLowerCase().includes(searchQuery) || 
            item.ruTitle.toLowerCase().includes(searchQuery) ||
            item.year.toString().includes(searchQuery)
        );
    }

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

    list.forEach((item) => {
        let link = item.imdbLink || `https://www.imdb.com/find?q=${encodeURIComponent(item.title)}`;
        const imgId = `poster-${item.originalIndex}`;
        const placeholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyIDMiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjMiIGZpbGw9IiMxZTI5M2IiLz48L3N2Zz4=';

        let html = '';
        if (currentView === 'grid') {
            html = `
            <a href="${link}" target="_blank" class="media-item">
                <img id="${imgId}" src="${placeholder}" class="media-poster">
                <div class="media-body">
                    <div class="ru-title">${item.ruTitle}</div>
                    <div class="en-title">${item.title}</div>
                    <div class="meta-info">
                        <span class="year-text">${item.year}</span>
                        <div class="rating-group">
                            ${item.imdbRating > 0 ? `<span class="imdb-score">★ ${item.imdbRating}</span>` : ''}
                            <span class="my-score">${item.myRating}</span>
                        </div>
                    </div>
                </div>
            </a>`;
        } else {
            html = `
            <a href="${link}" target="_blank" class="media-item">
                <img id="${imgId}" src="${placeholder}" class="media-poster">
                <div class="media-body">
                    <div class="ru-title">${item.ruTitle}</div>
                    <div class="rating-group">
                        <span style="color:var(--text-muted); margin-right: 15px;">${item.year}</span>
                        ${item.imdbRating > 0 ? `<span class="imdb-score" style="margin-right:10px">★ ${item.imdbRating}</span>` : ''}
                        <span class="my-score">${item.myRating}</span>
                    </div>
                </div>
            </a>`;
        }
        container.insertAdjacentHTML('beforeend', html);
        loadPoster(item, item.originalIndex);
    });
}

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

render();

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
    
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 5000);
}