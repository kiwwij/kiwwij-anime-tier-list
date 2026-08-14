const STEAM_CACHE_KEY = 'site_posters_cache_v8';
apiCache = JSON.parse(localStorage.getItem(STEAM_CACHE_KEY) || '{}');

// === СПИСОК ИСКЛЮЧЕНИЙ ===
const LOCAL_ONLY_GAMES = [
    "Ship of Fools",
    "Red Hood's Woods",
    "Black Souls I",
    "Read Dead Redemption 2",
    "Subnautica 2",
    "PEAK",
    "The Dark Queen of Mortholme",
    "Resident Evil Requiem",
    "Chasing Tails ~A Promise in the Snow~",
    "Hitler is My Crush: Love and Fascism",
    "Slender: The Eight Pages",
    "Hades II",
    "League of Legends",
    "Evil School",
    "The Song of Saya",
    "Re:ZERO -Starting Life in Another World- The Prophecy of the Throne",
    // "",
    // "",
    // "",
];

loadCardContent = async function(card, item, query, type) {
    if (type === 'game' && LOCAL_ONLY_GAMES.includes(item.title) && item.img) {
        applyImageToCard(card, `img/${item.img}`, item, `img/${item.img}`, null);
        return; 
    }

    if (type !== 'game' && item.img) {
        applyImageToCard(card, `img/${item.img}`, item, `img/${item.img}`, null);
        return;
    }

    let data = apiCache[query];
    if (!data || !data.imgSmall) {
        data = await addRequestToQueue(query, type);
    }

    if (item && item.img) {
        applyImageToCard(card, `img/${item.img}`, item, `img/${item.img}`, data);
    } else if (data && data.imgSmall) {
        applyImageToCard(card, data.imgSmall, item, data.imgLarge, data);
    } else {
        card.onclick = () => openModal(item, null, data);
    }
};

processQueue = async function() {
    if (requestQueue.length === 0 || activeRequests >= MAX_CONCURRENT_REQUESTS) return;

    activeRequests++;
    const { query, type, resolve } = requestQueue.shift();

    try {
        let result = { imgSmall: null, imgLarge: null, rating: null, source: null, originalTitle: null, fallbackImg: null };

        if (type === 'game') {
            const url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(query)}&page_size=1`;
            const res = await fetch(url);
            const json = await res.json();

            if (json.results && json.results.length > 0) {
                const game = json.results[0];
                
                result.rating = game.rating ? (game.rating * 20) : null;
                result.source = 'RAWG';
                result.originalTitle = game.name;
                
                result.imgLarge = game.background_image;
                result.imgSmall = game.background_image; 
                result.fallbackImg = game.background_image; 

                try {
                    const storesUrl = `https://api.rawg.io/api/games/${game.id}/stores?key=${RAWG_API_KEY}`;
                    const storesRes = await fetch(storesUrl);
                    const storesJson = await storesRes.json();
                    
                    const steamStore = storesJson.results.find(s => s.store_id === 1 || (s.url && s.url.includes('steampowered.com')));
                    
                    if (steamStore && steamStore.url) {
                        const match = steamStore.url.match(/\/app\/(\d+)/);
                        if (match && match[1]) {
                            const appId = match[1];
                            result.imgSmall = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/library_600x900.jpg`;
                        }
                    }
                } catch (e) {
                    console.warn('Не удалось получить обложку из Steam, используем RAWG:', e);
                }
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
                    originalTitle: a.titles.en_jp || a.canonicalTitle,
                    fallbackImg: null
                };
            }
        }
        
        if (result.imgSmall) {
            apiCache[query] = result;
            localStorage.setItem(STEAM_CACHE_KEY, JSON.stringify(apiCache));
        }
        resolve(result);
    } catch (e) {
        console.error("Ошибка в очереди постеров Steam:", e);
        resolve({ imgSmall: null });
    } finally {
        activeRequests--;
        setTimeout(processQueue, REQUEST_DELAY);
    }
};

applyImageToCard = function(card, thumbSrc, item, hdSrc, apiDetails = null) {
    const img = document.createElement('img');
    img.setAttribute('src', thumbSrc.replace('http://', 'https://'));
    
    img.onload = () => {
        const loader = card.querySelector('.card-loader');
        if (loader) loader.remove();
        card.appendChild(img);
    };

    img.onerror = () => {
        const currentSrc = img.getAttribute('src');

        if (apiDetails && apiDetails.fallbackImg && currentSrc !== apiDetails.fallbackImg) {
            img.setAttribute('src', apiDetails.fallbackImg);
        } else if (item && item.img && currentSrc !== `img/${item.img}`) {
            img.setAttribute('src', `img/${item.img}`);
        } else {
            img.remove();
        }
    };

    card.onclick = () => openModal(item, hdSrc ? hdSrc.replace('http://', 'https://') : '', apiDetails);
};

loadSearchImage = async function(container, item, query, type) {
    if (type === 'game' && LOCAL_ONLY_GAMES.includes(item.title) && item.img) {
        applyImg(container, `img/${item.img}`, null, item);
        return;
    }

    if (type !== 'game' && item.img) {
        applyImg(container, `img/${item.img}`, null, item);
        return;
    }

    let data = apiCache[query];
    if (!data || !data.imgSmall) {
        data = await addRequestToQueue(query, type);
    }

    if (item && item.img) {
        applyImg(container, `img/${item.img}`, null, item);
    } else if (data && data.imgSmall) {
        applyImg(container, data.imgSmall, data.fallbackImg, item);
    } else {
        const loader = container.querySelector('.card-loader');
        if (loader) loader.textContent = "Нет фото";
    }
};

applyImg = function(container, src, fallbackSrc = null, item = null) {
    const img = document.createElement('img');
    img.setAttribute('src', src.replace('http://', 'https://'));
    
    img.onload = () => {
        const loader = container.querySelector('.card-loader');
        if (loader) loader.remove();
        container.appendChild(img);
    };

    img.onerror = () => {
        const currentSrc = img.getAttribute('src');

        if (fallbackSrc && currentSrc !== fallbackSrc) {
            img.setAttribute('src', fallbackSrc.replace('http://', 'https://'));
        } else if (item && item.img && currentSrc !== `img/${item.img}`) {
            img.setAttribute('src', `img/${item.img}`);
        } else {
            img.remove();
            const loader = container.querySelector('.card-loader');
            if (loader) loader.textContent = "Нет фото";
        }
    };
};