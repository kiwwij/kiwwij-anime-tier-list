function linkify(text) {
    if (!text) return "";
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return `<a href="${url}" target="_blank">${url}</a>`;
    });
}

const RAWG_API_KEY = 'eff5af7536f94b1b862edf995f4ee1f9';
const CACHE_KEY_POSTERS = 'site_posters_cache_v6';
const MAX_CONCURRENT_REQUESTS = 10;
const REQUEST_DELAY = 700;

const animeSelect = document.getElementById('animeSelect');
const ranobeSelect = document.getElementById('ranobeSelect');
const iconButtonsContainer = document.getElementById('iconButtonsContainer');
const tierListContainer = document.getElementById('tierListContainer');
const modal = document.getElementById('detailsModal');
const themeToggle = document.getElementById('themeToggle');
const tabButtons = document.querySelectorAll('.tab-btn');

let currentScale = 'standard';
let currentCategory = '';
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
    const currentYear = new Date().getFullYear().toString();
    currentCategory = tierListData[currentYear] ? currentYear : keys[0];

    const specialCategories = {
        'Игры': { icon: 'bx-joystick', text: 'Игры' },
        'Энергетики': { icon: 'bx-bolt', text: 'Энергетики' }
    };

    animeSelect.innerHTML = '<option value="" disabled>Аниме по годам</option>';
    ranobeSelect.innerHTML = '<option value="" disabled>Ранобэ</option>';
    iconButtonsContainer.innerHTML = '';

    keys.forEach(key => {
        const data = tierListData[key];
        const type = data.type || 'anime';

        if (specialCategories[key]) {
            const btn = document.createElement('button');
            btn.className = 'icon-btn';
            btn.innerHTML = `<i class='bx ${specialCategories[key].icon}'></i><span>${specialCategories[key].text}</span>`;
            btn.dataset.category = key;
            
            if (key === currentCategory) btn.classList.add('active');
            
            btn.onclick = () => switchCategory(key);
            iconButtonsContainer.appendChild(btn);
        } else if (type === 'ranobe' || key.includes('Re:Zero')) {
            const opt = document.createElement('option');
            opt.value = key; 
            opt.textContent = key;
            ranobeSelect.appendChild(opt);
        } else {
            const opt = document.createElement('option');
            opt.value = key; 
            opt.textContent = key;
            animeSelect.appendChild(opt);
        }
    });

    if (tierListData[currentCategory]?.type === 'ranobe' || currentCategory.includes('Re:Zero')) {
        ranobeSelect.value = currentCategory;
    } else if (!specialCategories[currentCategory]) {
        animeSelect.value = currentCategory;
    }

    animeSelect.addEventListener('change', (e) => switchCategory(e.target.value));
    ranobeSelect.addEventListener('change', (e) => switchCategory(e.target.value));
    
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

function switchCategory(key) {
    currentCategory = key;

    document.querySelectorAll('.icon-btn').forEach(btn => {
        if (btn.dataset.category === key) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const isAnime = Array.from(animeSelect.options).some(opt => opt.value === key);
    if (isAnime) {
        animeSelect.value = key;
    } else {
        animeSelect.value = ""; 
    }

    const isRanobe = Array.from(ranobeSelect.options).some(opt => opt.value === key);
    if (isRanobe) {
        ranobeSelect.value = key;
    } else {
        ranobeSelect.value = ""; 
    }

    renderTierList();
}

function renderTierList() {
    tierListContainer.querySelectorAll('.card').forEach(card => lazyLoadObserver.unobserve(card));

    tierListContainer.innerHTML = '';
    const category = currentCategory;
    const categoryData = tierListData[category];
    if (!categoryData) return;

    const type = categoryData.type || 'anime';
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('animeSearch');
    const clearBtn = document.getElementById('clearSearch');
    const searchIcon = document.querySelector('.search-icon');
    const searchResultsContainer = document.getElementById('searchResultsContainer');

    if (searchContainer) {
        if (category === 'Энергетики' || category.includes('Re:Zero')) {
            searchInput.disabled = true;
            searchInput.placeholder = "Поиск недоступен";
            searchInput.value = '';
            if (clearBtn) clearBtn.style.display = 'none';
            if (searchIcon) searchIcon.style.opacity = '0.5';
            if (searchResultsContainer) searchResultsContainer.style.display = 'none';
            tierListContainer.style.display = 'block';
        } else {
            searchInput.disabled = false;
            searchInput.placeholder = "Найти по названию или тиру";
            if (searchIcon) searchIcon.style.opacity = '1';
        }
    }

    const droppedLink = document.getElementById('droppedLinkContainer');
    if (droppedLink) {
        if (type === 'anime' && !category.includes('Re:Zero') && type !== 'ranobe') {
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

    if (type === 'game' && !localStorage.getItem('gameDisclaimerClosed')) {
        const disclaimer = document.createElement('div');
        disclaimer.className = 'modal-review-box';
        disclaimer.style.margin = '0 auto 25px';
        disclaimer.style.maxWidth = '800px';
        disclaimer.style.textAlign = 'center';
        disclaimer.style.borderLeftColor = '#facc15';
        disclaimer.style.position = 'relative';
        disclaimer.style.paddingRight = '30px';

        disclaimer.innerHTML = `
            <button id="closeGameDisclaimer" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 1.5rem; line-height: 1; cursor: pointer; color: var(--text-muted); transition: 0.2s;" onmouseover="this.style.color='var(--text-main)'" onmouseout="this.style.color='var(--text-muted)'">&times;</button>
            <strong>Небольшая ремарка:</strong> Довольно тяжело объективно оценивать и сравнивать в одном списке ко-оп, мультиплеерные и сюжетные синглплеерные игры. Так что не удивляйтесь немного странной расстановке − это сугубо моё личное восприятие! Также постеры могут быть неправильными из-за плохого, но бесплатного API RAWG, который я использую для получения обложек и рейтингов.
        `;
        
        tierListContainer.appendChild(disclaimer);

        document.getElementById('closeGameDisclaimer').addEventListener('click', () => {
            disclaimer.style.display = 'none';
            localStorage.setItem('gameDisclaimerClosed', 'true');
        });
    }

    if (type === 'anime' && !category.includes('Re:Zero') && !localStorage.getItem('animeSortDisclaimerClosed')) {
        const animeDisclaimer = document.createElement('div');
        animeDisclaimer.className = 'modal-review-box';
        animeDisclaimer.style.margin = '0 auto 25px';
        animeDisclaimer.style.maxWidth = '800px';
        animeDisclaimer.style.textAlign = 'center';
        animeDisclaimer.style.borderLeftColor = 'var(--accent)';
        animeDisclaimer.style.position = 'relative';
        animeDisclaimer.style.paddingRight = '30px';

        animeDisclaimer.innerHTML = `
            <button id="closeAnimeDisclaimer" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 1.5rem; line-height: 1; cursor: pointer; color: var(--text-muted); transition: 0.2s;" onmouseover="this.style.color='var(--text-main)'" onmouseout="this.style.color='var(--text-muted)'">&times;</button>
            <strong>Обратите внимание:</strong> Тайтлы внутри категорий распределены исключительно по порядку их добавления, а не по уровню крутости. Более детальное сопоставление и разборы между ними я провожу уже в самих тир-листах!
        `;
        
        tierListContainer.appendChild(animeDisclaimer);

        document.getElementById('closeAnimeDisclaimer').addEventListener('click', () => {
            animeDisclaimer.style.display = 'none';
            localStorage.setItem('animeSortDisclaimerClosed', 'true');
        });
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
    const reviewText = item.review || "Отзыва пока нет. Тир может измениться.";
    document.getElementById('modalReview').innerHTML = linkify(reviewText);
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

const searchInput = document.getElementById('animeSearch');
const clearBtn = document.getElementById('clearSearch');
const searchResultsContainer = document.getElementById('searchResultsContainer');

if (searchInput && searchResultsContainer && clearBtn) {
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const mainContainer = document.getElementById('tierListContainer');
        const droppedLink = document.getElementById('droppedLinkContainer');
        clearBtn.style.display = query.length > 0 ? 'flex' : 'none';

        const activeCategory = currentCategory;
        const currentType = tierListData[activeCategory]?.type || 'anime';

        const validTiers = ['s', 'a', 'b', 'c', 'd', 'e', 'f'];
        const isTierSearch = validTiers.includes(query);

        if (currentType === 'game') {
            searchResultsContainer.style.display = 'none';
            mainContainer.style.display = 'block';
            
            const cards = mainContainer.querySelectorAll('.card');
            
            cards.forEach(card => {
                const itemData = JSON.parse(card.dataset.item || "{}");
                const titleEng = (itemData.title || "").toLowerCase();
                const titleRu = (itemData.ruTitle || "").toLowerCase();
                const tierRank = card.closest('.tier-row')?.querySelector('.tier-label')?.dataset.rank?.toLowerCase() || "";
                
                let isMatch = false;
                if (query.length === 0) {
                    isMatch = true;
                } else if (isTierSearch) {
                    isMatch = (tierRank === query);
                } else {
                    isMatch = titleEng.includes(query) || titleRu.includes(query);
                }

                if (isMatch) {
                    card.classList.remove('dimmed-card');
                } else {
                    card.classList.add('dimmed-card');
                }
            });
            return;
        }

        if (query.length < 2 && !isTierSearch) {
            searchResultsContainer.style.display = 'none';
            mainContainer.style.display = 'block';
            if (droppedLink) droppedLink.style.display = 'block';
            return;
        }

        mainContainer.style.display = 'none';
        if (droppedLink) droppedLink.style.display = 'none';
        searchResultsContainer.style.display = 'grid';
        searchResultsContainer.innerHTML = '';

        const results = [];
        const dataKeys = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];

        for (const [categoryName, categoryData] of Object.entries(tierListData)) {
            const type = categoryData.type || 'anime';

            if (
                type === 'game' || 
                categoryName === 'Энергетики' || 
                categoryName.includes('Re:Zero')
            ) {
                continue;
            }

            dataKeys.forEach(tier => {
                const items = categoryData.data ? categoryData.data[tier] : (categoryData[tier] || []);
                items.forEach(item => {
                    const titleEng = (item.title || "").toLowerCase();
                    const titleRu = (item.ruTitle || "").toLowerCase();
                    
                    let isMatch = false;
                    if (isTierSearch) {
                        isMatch = (tier.toLowerCase() === query);
                    } else {
                        isMatch = titleEng.includes(query) || titleRu.includes(query);
                    }
                    
                    if (isMatch) {
                        results.push({ item, year: categoryName, tier });
                    }
                });
            });
        }

        if (results.length === 0) {
            searchResultsContainer.innerHTML = '<div class="search-empty">Ничего не найдено 😔</div>';
            return;
        }

        const tierColors = {
            'S': '#ef4444', 'A': '#f97316', 'B': '#facc15', 
            'C': '#22c55e', 'D': '#3b82f6', 'E': '#a855f7', 'F': '#4b5563'
        };

        results.forEach(res => {
            const card = document.createElement('div');
            card.className = 'search-card';

            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'img-wrapper';

            const loader = document.createElement('div');
            loader.className = 'card-loader';
            loader.textContent = res.item.ruTitle || res.item.title;
            imgWrapper.appendChild(loader);

            const info = document.createElement('div');
            info.className = 'search-card-info';

            const title = document.createElement('div');
            title.className = 'search-card-title';
            title.textContent = res.item.ruTitle || res.item.title;

            const meta = document.createElement('div');
            meta.className = 'search-card-meta';

            const tierBadge = document.createElement('span');
            tierBadge.className = 'search-tier-badge';
            tierBadge.textContent = res.tier;
            tierBadge.style.backgroundColor = tierColors[res.tier] || '#ccc';

            const yearBadge = document.createElement('span');
            yearBadge.className = 'search-year-badge';
            yearBadge.textContent = res.year;

            meta.appendChild(tierBadge);
            meta.appendChild(yearBadge);
            info.appendChild(title);
            info.appendChild(meta);
            
            card.appendChild(imgWrapper);
            card.appendChild(info);
            searchResultsContainer.appendChild(card);

            loadSearchImage(imgWrapper, res.item, res.item.title, 'anime');

            card.onclick = () => {
                const cachedData = apiCache[res.item.title];
                openModal(res.item, cachedData ? cachedData.imgLarge.replace('http://', 'https://') : null, cachedData);
            };
        });
    });
}

async function loadSearchImage(container, item, query, type) {
    let data = apiCache[query];
    
    if (item.img) {
        applyImg(container, `img/${item.img}`);
        return;
    }

    if (!data || !data.imgSmall) {
        data = await addRequestToQueue(query, type);
    }

    if (data && data.imgSmall) {
        applyImg(container, data.imgSmall);
    } else {
        const loader = container.querySelector('.card-loader');
        if (loader) loader.textContent = "Нет фото";
    }
}

function applyImg(container, src) {
    const img = document.createElement('img');
    img.src = src.replace('http://', 'https://');
    img.onload = () => {
        const loader = container.querySelector('.card-loader');
        if (loader) loader.remove();
        container.appendChild(img);
    };
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