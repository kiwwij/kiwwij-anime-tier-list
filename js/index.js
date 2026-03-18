const RAWG_API_KEY = 'eff5af7536f94b1b862edf995f4ee1f9';
const CACHE_KEY_POSTERS = 'site_posters_cache_v5';
const MAX_CONCURRENT_REQUESTS = 10;
const REQUEST_DELAY = 700;

const categorySelect = document.getElementById('categorySelect');
const tierListContainer = document.getElementById('tierListContainer');
const modal = document.getElementById('detailsModal');
const themeToggle = document.getElementById('themeToggle');
const tabButtons = document.querySelectorAll('.tab-btn');

let currentScale = 'standard';
let apiCache = JSON.parse(localStorage.getItem(CACHE_KEY_POSTERS) || '{}');
let requestQueue = [];
let activeRequests = 0;

const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const item = JSON.parse(card.dataset.item);
            loadCardContent(card, item, card.dataset.query, card.dataset.type);
            observer.unobserve(card);
        }
    });
}, { rootMargin: '400px' });

document.addEventListener('DOMContentLoaded', () => {
    if (typeof tierListData === 'undefined') return;
    init();
});

function init() {
    const keys = Object.keys(tierListData).sort((a, b) => b - a);
    keys.forEach(key => {
        const opt = document.createElement('option');
        opt.value = key; opt.textContent = key;
        categorySelect.appendChild(opt);
    });

    const currentYear = new Date().getFullYear().toString();
    categorySelect.value = tierListData[currentYear] ? currentYear : keys[0];

    categorySelect.addEventListener('change', renderTierList);
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentScale = btn.dataset.scale;
            renderTierList();
        });
    });

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

    document.getElementById('closeModal').onclick = () => modal.close();
    renderTierList();
}

function renderTierList() {
    tierListContainer.querySelectorAll('.card').forEach(card => lazyLoadObserver.unobserve(card));

    tierListContainer.innerHTML = '';
    const category = categorySelect.value;
    const categoryData = tierListData[category];
    if (!categoryData) return;

    const type = categoryData.type || 'anime';
    
    const droppedLink = document.getElementById('droppedLinkContainer');
    if (droppedLink) {
        if (type === 'anime' && !category.includes('Re:Zero')) {
            droppedLink.style.display = 'block';
        } else {
            droppedLink.style.display = 'none';
        }
    }
    
    let scaleSource;
    if (type === 'game') scaleSource = gameRatingScales;
    else if (category === 'Энергетики') scaleSource = energyRatingScales;
    else if (category.includes('Re:Zero')) scaleSource = rezeroRatingScales;
    else scaleSource = ratingScales;

    const scales = scaleSource[currentScale];
    const dataKeys = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];

    if (type === 'game') {
        const disclaimer = document.createElement('div');
        disclaimer.className = 'modal-review-box';
        disclaimer.style.margin = '0 auto 25px';
        disclaimer.style.maxWidth = '800px';
        disclaimer.style.textAlign = 'center';
        disclaimer.style.borderLeftColor = '#facc15';
        disclaimer.innerHTML = '<strong>Небольшая ремарка:</strong> Довольно тяжело объективно оценивать и сравнивать в одном списке ко-оп, мультиплеерные и сюжетные синглплеерные игры. Так что не удивляйтесь немного странной расстановке − это сугубо мое личное восприятие!';
        tierListContainer.appendChild(disclaimer);
    }

    scales.forEach((scale, idx) => {
        const row = document.createElement('div');
        row.className = 'tier-row';
        const label = document.createElement('div');
        label.className = 'tier-label';
        label.innerHTML = scale.rank;
        label.setAttribute('data-rank', dataKeys[idx]);
        const content = document.createElement('div');
        content.className = 'tier-content';

        const items = categoryData.data ? categoryData.data[dataKeys[idx]] : (categoryData[dataKeys[idx]] || []);
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.query = item.title;
            card.dataset.type = type;
            card.dataset.item = JSON.stringify(item);

            // attachReZeroSound(card, item.title);
            attachReZeroSound(card, item.title, category);

            const loader = document.createElement('div');
            loader.className = 'card-loader';
            loader.textContent = item.ruTitle || item.title;
            card.appendChild(loader);
            content.appendChild(card);

            lazyLoadObserver.observe(card);
        });
        row.appendChild(label);
        row.appendChild(content);
        tierListContainer.appendChild(row);
    });
}

async function loadCardContent(card, item, query, type) {
    let data = apiCache[query];
    
    if (item.img) {
        applyImageToCard(card, `img/${item.img}`, item, `img/${item.img}`);
        return;
    }

    if (!data || !data.imgSmall) {
        data = await addRequestToQueue(query, type);
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

function addRequestToQueue(query, type) {
    return new Promise((resolve) => {
        requestQueue.push({ query, type, resolve });
        processQueue();
    });
}

async function processQueue() {
    if (requestQueue.length === 0 || activeRequests >= MAX_CONCURRENT_REQUESTS) return;

    activeRequests++;
    const { query, type, resolve } = requestQueue.shift();

    try {
        let result = { imgSmall: null, imgLarge: null, rating: null, source: null, originalTitle: null };

        if (type === 'game') {
            const url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(query)}&page_size=1`;
            const res = await fetch(url);
            const json = await res.json();
            if (json.results && json.results[0]) {
                const g = json.results[0];
                result = { 
                    imgSmall: g.background_image, 
                    imgLarge: g.background_image, 
                    rating: g.rating ? (g.rating * 20).toFixed(1) : null,
                    source: 'RAWG',
                    originalTitle: g.name
                };
            }
        } else {
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

    const reviewEl = document.getElementById('modalReview');
    reviewEl.textContent = item.review || "Отзыва пока нет. Тир может измениться.";
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) modalBody.scrollTop = 0;

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
    document.getElementById('modalReview').textContent = item.review || "Отзыва пока нет. Тир может измениться.";
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

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
    }
});

const REZERO_COMMON_SOUNDS = [
    'return_by_death.mp3',
    'returne_to_death_1.mp3',
    'returne_to_death_2.mp3',
    'returne_to_death_3.mp3',
    'returne_to_death_4.mp3'
];

const REZERO_RARE_SOUND = 'returne_to_death_meme.mp3';

const WITCH_COOLDOWN_TIME = 10000; 
const MEME_CHANCE = 0.05;          
const AUDIO_BASE_PATH = 'audio/';  

let witchAudio = new Audio();
let isWitchCooldown = false;
let isAudioUnlocked = false;

function unlockAudioContext() {
    if (isAudioUnlocked) return;

    witchAudio.src = AUDIO_BASE_PATH + REZERO_COMMON_SOUNDS[0];
    witchAudio.volume = 0;

    witchAudio.play().then(() => {
        witchAudio.pause();
        witchAudio.currentTime = 0;
        isAudioUnlocked = true;
        
        document.removeEventListener('click', unlockAudioContext);
        document.removeEventListener('keydown', unlockAudioContext);
        document.removeEventListener('touchstart', unlockAudioContext);
        console.log("🔊 Audio Context Unlocked");
    }).catch(error => {
        console.log("🔇 Autoplay prevented. Waiting for user interaction.");
    });
}

document.addEventListener('click', unlockAudioContext);
document.addEventListener('keydown', unlockAudioContext);
document.addEventListener('touchstart', unlockAudioContext);

function attachReZeroSound(cardElement, title, category) {
    if (!title || !title.toLowerCase().includes('re:zero')) return;

    cardElement.classList.add('witch-target');

    cardElement.addEventListener('mouseenter', () => {
        if (isWitchCooldown) {
            if (!isAudioUnlocked) unlockAudioContext();
            return;
        }

        const playChance = category && category.includes('Re:Zero') ? 0.15 : 0.35;
        if (Math.random() > playChance) return; 

        let selectedSound;
        const randomChance = Math.random();

        if (randomChance < MEME_CHANCE) {
            selectedSound = REZERO_RARE_SOUND;
            console.log("🎲 Re:Zero Easter Egg: RARE DROP!"); 
        } else {
            const randomIndex = Math.floor(Math.random() * REZERO_COMMON_SOUNDS.length);
            selectedSound = REZERO_COMMON_SOUNDS[randomIndex];
        }

        witchAudio.src = AUDIO_BASE_PATH + selectedSound;
        witchAudio.volume = 0.2; 
        
        const playPromise = witchAudio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                cardElement.classList.add('witch-active');
                isWitchCooldown = true;
                setTimeout(() => {
                    isWitchCooldown = false;
                }, WITCH_COOLDOWN_TIME);
            }).catch(error => {
                console.log("Playback failed (User hasn't interacted yet)");
            });
        }
    });

    cardElement.addEventListener('mouseleave', () => {
        cardElement.classList.remove('witch-active');
    });
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