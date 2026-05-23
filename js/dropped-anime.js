function linkify(text) {
    if (!text) return "";
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return `<a href="${url}" target="_blank">${url}</a>`;
    });
}

const CACHE_KEY_POSTERS = 'site_posters_cache_v5';
const MAX_CONCURRENT_REQUESTS = 10;
const REQUEST_DELAY = 700;

const droppedListContainer = document.getElementById('droppedListContainer');
const modal = document.getElementById('detailsModal');
const themeToggle = document.getElementById('themeToggle');

let apiCache = JSON.parse(localStorage.getItem(CACHE_KEY_POSTERS) || '{}');
let requestQueue = [];
let activeRequests = 0;

const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const item = JSON.parse(card.dataset.item);
            loadCardContent(card, item, card.dataset.query);
            observer.unobserve(card);
        }
    });
}, { rootMargin: '400px' });

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initModal();
    
    if (typeof droppedData === 'undefined') {
        droppedListContainer.innerHTML = '<p style="padding:20px; color:var(--text-muted);">Файл данных не найден или пуст.</p>';
        return;
    }
    
    renderDroppedList();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if(themeToggle) themeToggle.checked = false; 
    } else {
        document.body.classList.remove('light-theme');
        if(themeToggle) themeToggle.checked = true;
    }

    if(themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

function initModal() {
    document.getElementById('closeModal').onclick = () => modal.close();
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
}

function renderDroppedList() {
    droppedListContainer.innerHTML = '';

    droppedData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.query = item.title;
        card.dataset.item = JSON.stringify(item);
        
        const loader = document.createElement('div');
        loader.className = 'card-loader';
        loader.textContent = item.ruTitle || item.title;
        
        card.appendChild(loader);
        droppedListContainer.appendChild(card);

        lazyLoadObserver.observe(card);
    });
}

async function loadCardContent(card, item, query) {
    let data = apiCache[query];
    
    if (item.img) {
        applyImageToCard(card, `img/${item.img}`, item, `img/${item.img}`);
        return;
    }

    if (!data || !data.imgSmall) {
        data = await addRequestToQueue(query);
    }

    if (data && data.imgSmall) {
        applyImageToCard(card, data.imgSmall, item, data.imgLarge, data);
    } else {
        card.onclick = () => openModal(item, null, data);
    }
}

function applyImageToCard(card, thumbSrc, item, hdSrc, apiDetails = null) {
    const img = document.createElement('img');
    const secureThumb = thumbSrc.replace('http://', 'https://');
    img.src = secureThumb;
    
    img.onload = () => {
        const loader = card.querySelector('.card-loader');
        if (loader) loader.remove();
        card.appendChild(img);
    };
    img.onerror = () => {
        console.error("Failed to load image:", secureThumb);
    };
    card.onclick = () => openModal(item, hdSrc.replace('http://', 'https://'), apiDetails);
}

function addRequestToQueue(query) {
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
        let result = { imgSmall: null, imgLarge: null, rating: null, source: null, originalTitle: null };

        const url = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}&page[limit]=1`;
        const res = await fetch(url);
        const json = await res.json();
        
        if (json.data && json.data[0]) {
            const a = json.data[0].attributes;
            const posters = a.posterImage;
            result = { 
                imgSmall: posters?.medium || posters?.small || null,
                imgLarge: posters?.original || posters?.large || null,
                rating: a.averageRating,
                source: 'Kitsu',
                originalTitle: a.titles.en_jp || a.canonicalTitle
            };
        }
        
        if (result.imgSmall) {
            apiCache[query] = result;
            localStorage.setItem(CACHE_KEY_POSTERS, JSON.stringify(apiCache));
        }
        resolve(result);
    } catch (e) {
        console.error("Queue error:", e);
        resolve({ imgSmall: null });
    } finally {
        activeRequests--;
        setTimeout(processQueue, REQUEST_DELAY);
    }
}

function openModal(item, imgSrc, apiDetails) {
    const modalImg = document.getElementById('modalImg');
    modalImg.src = imgSrc || "";
    modalImg.style.display = imgSrc ? 'block' : 'none';

    document.getElementById('modalTitle').textContent = item.ruTitle || item.title;
    document.getElementById('modalAltTitle').textContent = apiDetails?.originalTitle || (item.ruTitle ? item.title : "");
    
    const ratingEl = document.getElementById('modalRating');
    if (apiDetails?.rating) {
        const score10 = (apiDetails.rating / 10).toFixed(1);
        ratingEl.innerHTML = `<span class="rating-badge"><i class='bx bxs-star'></i> ${apiDetails.source} ${score10}/10</span>`;
        ratingEl.style.display = 'inline-flex';
    } else {
        ratingEl.innerHTML = '';
        ratingEl.style.display = 'none';
    }
    
    const reviewBox = document.querySelector('.modal-review-box h3');
    if (reviewBox) reviewBox.textContent = "Причина дропа:";

    const reviewText = item.review || "Причина не указана.";
    document.getElementById('modalReview').innerHTML = linkify(reviewText);
    
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) modalBody.scrollTop = 0;

    modal.showModal();
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
    
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 5000);
}

const searchInput = document.getElementById('animeSearch');
const clearBtn = document.getElementById('clearSearch');

if (searchInput && clearBtn && droppedListContainer) {
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input')); 
        searchInput.focus(); 
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        clearBtn.style.display = query.length > 0 ? 'flex' : 'none';

        let hasVisibleCards = false;
        const cards = droppedListContainer.querySelectorAll('.card');
        
        cards.forEach(card => {
            const item = JSON.parse(card.dataset.item);
            const titleEng = (item.title || "").toLowerCase();
            const titleRu = (item.ruTitle || "").toLowerCase();

            if (titleEng.includes(query) || titleRu.includes(query)) {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });

        let emptyMsg = droppedListContainer.querySelector('.search-empty');
        if (!hasVisibleCards) {
            if (!emptyMsg) {
                emptyMsg = document.createElement('div');
                emptyMsg.className = 'search-empty';
                emptyMsg.style.gridColumn = '1 / -1';
                emptyMsg.style.padding = '2rem';
                emptyMsg.style.textAlign = 'center';
                emptyMsg.style.color = 'var(--text-muted)';
                emptyMsg.textContent = 'Ничего не найдено 😔';
                droppedListContainer.appendChild(emptyMsg);
            } else {
                emptyMsg.style.display = 'block';
            }
        } else if (emptyMsg) {
            emptyMsg.style.display = 'none';
        }
    });
}

function maybeSpawnZoro() {
    if (Math.random() > 0.05) return; 

    if (document.querySelector('.zoro-lost')) return;

    console.log("⚔️ Zoro is lost again...");

    const zoro = document.createElement('img');
    zoro.src = (window.location.pathname.includes('/pages/') || window.location.pathname.includes('/extra/')) ? '../img/roronoa_zoro.png' : 'img/roronoa_zoro.png'; 
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