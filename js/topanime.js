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

let apiCache = JSON.parse(localStorage.getItem(CACHE_KEY_POSTERS) || '{}');
let requestQueue = [];
let activeRequests = 0;

const categoryToRank = {
    "оставили глубокий отпечаток в моём сердце": "S",
    "на этом строилась моя личность": "A",
    "обязательны к просмотру": "B",
    "приятное чувство ностальгии": "C",
    // "Годнота": "D",
    // "На разок": "F"
};

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

function renderTopFavorites() {
    const container = document.getElementById('topTierContainer');
    if (!container || typeof topFavoritesData === 'undefined') return;

    container.innerHTML = '';

    Object.keys(topFavoritesData).forEach((category) => {
        const row = document.createElement('div');
        row.className = 'tier-row';

        const label = document.createElement('div');
        label.className = 'tier-label';
        label.textContent = category;
        label.setAttribute('data-rank', categoryToRank[category] || 'D');

        const content = document.createElement('div');
        content.className = 'tier-content';

        topFavoritesData[category].forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.query = item.title;
            card.dataset.item = JSON.stringify(item);

            const loader = document.createElement('div');
            loader.className = 'card-loader';
            loader.textContent = item.ruTitle || item.title;
            card.appendChild(loader);

            content.appendChild(card);
            lazyLoadObserver.observe(card);
        });

        row.appendChild(label);
        row.appendChild(content);
        container.appendChild(row);
    });
}

async function loadCardContent(card, item, query) {
    let data = apiCache[query];

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
    img.src = thumbSrc.replace('http://', 'https://');
    
    img.onload = () => {
        const loader = card.querySelector('.card-loader');
        if (loader) loader.remove();
        img.classList.add('loaded');
        card.appendChild(img);
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
        const url = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}&page[limit]=1`;
        const res = await fetch(url);
        const json = await res.json();
        
        let result = { imgSmall: null, imgLarge: null, rating: null, source: 'Kitsu' };

        if (json.data && json.data[0]) {
            const a = json.data[0].attributes;
            result = { 
                imgSmall: a.posterImage?.medium || a.posterImage?.small || null,
                imgLarge: a.posterImage?.original || null,
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
        resolve({ imgSmall: null });
    } finally {
        activeRequests--;
        setTimeout(processQueue, REQUEST_DELAY);
    }
}

function openModal(item, imgSrc, apiDetails) {
    const modal = document.getElementById('detailsModal');
    if (!modal) return;

    document.getElementById('modalImg').src = imgSrc || "";
    document.getElementById('modalTitle').textContent = item.ruTitle || item.title;
    document.getElementById('modalReview').textContent = item.review || "Отзыва пока нет.";
    
    const ratingEl = document.getElementById('modalRating');
    if (apiDetails?.rating) {
        const score10 = (apiDetails.rating / 10).toFixed(1);
        ratingEl.innerHTML = `<span class="rating-badge"><i class='bx bxs-star'></i> ${score10}/10</span>`;
    } else {
        ratingEl.innerHTML = '';
    }

    modal.showModal();
}

document.addEventListener('DOMContentLoaded', () => {
    renderTopFavorites();
    
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
        closeBtn.onclick = () => document.getElementById('detailsModal').close();
    }
});