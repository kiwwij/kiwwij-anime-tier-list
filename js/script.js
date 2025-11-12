/* Глобальный обработчик 'DOMContentLoaded'. */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ПРОВЕРКА ДАННЫХ ---
    if (typeof tierListData === 'undefined' || typeof ratingScales === 'undefined') {
        console.error("Ошибка: Файлы anime-data.js или energydrink-data.js не загружены!");
        alert("Ошибка: Не удалось загрузить данные.");
        return;
    }

    // --- 2. ПОЛУЧЕНИЕ DOM ЭЛЕМЕНТОВ ---
    const yearSelect = document.getElementById('year-select');
    const scaleSelect = document.getElementById('scale-select');
    const container = document.getElementById('tier-list-container');
    const loadingIndicator = document.getElementById('loading-indicator');

    // Модальное окно
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlayClose = document.getElementById('modal-overlay-close');
    const modalPoster = document.getElementById('modal-poster');
    const modalTitle = document.getElementById('modal-title');
    const modalRussianTitle = document.getElementById('modal-russian-title');
    const modalRatingContainer = document.getElementById('modal-rating-container');
    const modalRating = document.getElementById('modal-rating');
    const modalReview = document.getElementById('modal-review');

    // --- 3. ГЛОБАЛЬНОЕ СОСТОЯНИЕ ---
    const animeCache = {};
    let currentYear = '';
    let currentScale = 'standard';
    let isLoading = false;
    const placeholderUrl = "https://placehold.co/200x280/ef4444/ffffff?text=Not+Found";

    // --- 4. ФУНКЦИИ ---

    /* Инициализация приложения */
    function init() {
        // 1. Сортировка ключей для селектора
        const allKeys = Object.keys(tierListData);
        const yearKeys = allKeys.filter(key => !isNaN(parseInt(key)));
        const categoryKeys = allKeys.filter(key => isNaN(parseInt(key)));
        yearKeys.sort((a, b) => b - a);
        categoryKeys.sort();
        const sortedKeys = [...categoryKeys, ...yearKeys];

        if (sortedKeys.length === 0) {
            console.error("Нет данных в tierListData!");
            return;
        }

        // 2. Заполнение селектора
        sortedKeys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            yearSelect.appendChild(option);
        });

        // 3. Установка значения по умолчанию
        const currentRealYear = new Date().getFullYear().toString();
        if (tierListData[currentRealYear]) {
            yearSelect.value = currentRealYear;
        } else if (yearKeys.length > 0) {
            yearSelect.value = yearKeys[0];
        } else {
            yearSelect.value = sortedKeys[0];
        }
        
        scaleSelect.value = 'standard';
        currentYear = yearSelect.value;
        currentScale = scaleSelect.value;

        // 4. Обработчики событий
        yearSelect.addEventListener('change', handleYearChange);
        scaleSelect.addEventListener('change', handleScaleChange);
        modalClose.addEventListener('click', closeModal);
        modalOverlayClose.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });

        // 5. Первая отрисовка
        renderTierList();
    }

    /* Обработчики смены */
    function handleYearChange(e) {
        currentYear = e.target.value;
        renderTierList();
    }

    function handleScaleChange(e) {
        currentScale = e.target.value;
        renderTierList();
    }

    /**
     * Главный "роутер" отрисовки. 
     * Решает, какую логику использовать: API или ЛОКАЛЬНУЮ.
     */
    function renderTierList() {
        if (isLoading) return;

        if (currentYear === 'Энергетики') {
            loadingIndicator.classList.add('hidden'); // Загрузчик не нужен
            renderTierListLocal();
        } else {
            renderTierListAPI(); // Эта функция async
        }
    }

    /**
     * ЛОГИКА ДЛЯ АНИМЕ (API + КЭШ)
     * Загружает данные аниме из API (Kitsu.io) по названию.
     */
    async function fetchAnimeData(title) {
        if (animeCache[title]) {
            return animeCache[title]; // Возвращаем из кэша
        }
        
        const encodedTitle = encodeURIComponent(title);
        const apiUrl = `https://kitsu.io/api/edge/anime?filter[text]=${encodedTitle}&page[limit]=1`;

        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // Защита от бана
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const json = await response.json();
            
            if (json.data && json.data.length > 0) {
                const anime = json.data[0].attributes;
                const result = {
                    title: anime.canonicalTitle,
                    ruTitle: anime.titles.ru_jp || anime.titles.ja_jp || null, 
                    poster: anime.posterImage?.medium || placeholderUrl,
                    averageRating: anime.averageRating ? (parseFloat(anime.averageRating) / 10).toFixed(1) : null
                };
                animeCache[title] = result;
                return result;
            } else {
                throw new Error("Anime not found in Kitsu database");
            }
        } catch (error) {
            console.error(`Ошибка загрузки аниме "${title}":`, error.message);
            const errorResult = {
                title: title, ruTitle: "(Не найдено)",
                poster: placeholderUrl, averageRating: null
            };
            animeCache[title] = errorResult;
            return errorResult;
        }
    }

    /* Функция отрисовки для АНИМЕ (использует API) */
    async function renderTierListAPI() {
        isLoading = true;
        container.innerHTML = '';
        loadingIndicator.classList.remove('hidden');

        const scales = ratingScales[currentScale];
        const dataForYear = tierListData[currentYear];

        const allAnimeForYear = Object.values(dataForYear).flat();
        const animeDataPromises = allAnimeForYear.map(anime => fetchAnimeData(anime.title));
        await Promise.all(animeDataPromises);

        loadingIndicator.classList.add('hidden');
        
        for (let i = 0; i < scales.length; i++) {
            const standardRank = ratingScales.standard[i].rank;
            const displayRank = scales[i].rank;
            const color = scales[i].color;
            
            const animeInThisTier = dataForYear[standardRank] || [];
            const tierRow = createTierRow(displayRank, color);
            const animeGrid = tierRow.querySelector('.tier-anime-grid');
            
            if (animeInThisTier.length === 0) {
                animeGrid.appendChild(createEmptyText());
            } else {
                for (const anime of animeInThisTier) {
                    const animeData = animeCache[anime.title]; 
                    if (!animeData) continue;

                    const img = document.createElement('img');
                    img.src = animeData.poster;
                    img.alt = animeData.title;
                    img.title = `${animeData.title}${animeData.ruTitle ? ` (${animeData.ruTitle})` : ''}`;
                    img.className = 'w-20 h-28 md:w-24 md:h-36 object-cover rounded-md shadow-md cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl outline-2 outline-transparent hover:outline-indigo-400';
                    
                    // Сохраняем все данные
                    img.dataset.type = 'api'; // <-- Указываем тип
                    img.dataset.review = anime.review;
                    img.dataset.title = animeData.title;
                    img.dataset.poster = animeData.poster;
                    img.dataset.ruTitle = anime.ruTitle || animeData.ruTitle || '';
                    img.dataset.rating = animeData.averageRating || '';
                    
                    img.addEventListener('click', () => showModal(img.dataset));
                    animeGrid.appendChild(img);
                }
            }
            container.appendChild(tierRow);
        }
        isLoading = false;
    }

    /* Функция отрисовки для ЭНЕРГЕТИКОВ (использует локальные img) */
    function renderTierListLocal() {
        container.innerHTML = ''; // Очищаем

        const scales = ratingScales[currentScale];
        const dataForYear = tierListData[currentYear]; // currentYear = 'Енергетики'

        for (let i = 0; i < scales.length; i++) {
            const standardRank = ratingScales.standard[i].rank;
            const displayRank = scales[i].rank;
            const color = scales[i].color;
            
            const itemsInThisTier = dataForYear[standardRank] || [];
            const tierRow = createTierRow(displayRank, color);
            const animeGrid = tierRow.querySelector('.tier-anime-grid');

            if (itemsInThisTier.length === 0) {
                animeGrid.appendChild(createEmptyText());
            } else {
                for (const item of itemsInThisTier) {
                    // item = { title: "...", review: "...", img: "..." }
                    const localImgPath = item.img ? `img/${item.img}` : placeholderUrl;

                    const img = document.createElement('img');
                    img.src = localImgPath;
                    img.alt = item.title;
                    img.title = item.title;
                    img.className = 'w-20 h-28 md:w-24 md:h-36 object-cover rounded-md shadow-md cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl outline-2 outline-transparent hover:outline-indigo-400';
                    
                    // Сохраняем данные
                    img.dataset.type = 'local'; // <-- Указываем тип
                    img.dataset.review = item.review;
                    img.dataset.title = item.title;
                    img.dataset.poster = localImgPath;
                    
                    img.addEventListener('click', () => showModal(img.dataset));
                    animeGrid.appendChild(img);
                }
            }
            container.appendChild(tierRow);
        }
    }

    // --- Вспомогательные функции ---

    /* Создает HTML-структуру ряда тира */
    function createTierRow(displayRank, color) {
        const tierRow = document.createElement('div');
        tierRow.className = 'flex flex-col md:flex-row items-stretch mb-2 shadow-lg rounded-lg overflow-hidden';
        tierRow.innerHTML = `
            <div class="tier-label flex items-center justify-center w-full md:w-48 lg:w-60 text-xl md:text-2xl font-bold text-gray-900 p-4 shrink-0 text-center ${color}">
                <span class="text-shadow">${displayRank}</span>
            </div>
            <div class="tier-anime-grid flex flex-wrap items-start gap-2 p-4 bg-gray-800 w-full min-h-[100px]"></div>
        `;
        return tierRow;
    }

    /* Создает текст "Пусто" */
    function createEmptyText() {
        const emptyText = document.createElement('span');
        emptyText.className = 'text-gray-500 italic p-4';
        emptyText.textContent = 'Пусто';
        return emptyText;
    }


    /* Показывает модальное окно (адаптивное) */
    function showModal(data) {
        modalPoster.src = data.poster;
        modalTitle.textContent = data.title;
        modalReview.textContent = data.review;

        // Проверяем тип данных
        if (data.type === 'api') {
            // ЛОГИКА АНИМЕ: Показываем рус. название и рейтинг
            if (data.ruTitle) {
                modalRussianTitle.textContent = data.ruTitle;
                modalRussianTitle.classList.remove('hidden');
            } else {
                modalRussianTitle.classList.add('hidden');
            }
            
            if (data.rating) {
                modalRating.textContent = `Рейтинг с Kitsu: ${data.rating} / 10`;
                modalRatingContainer.classList.remove('hidden');
            } else {
                modalRatingContainer.classList.add('hidden');
            }
        } else {
            // ЛОГИКА ЭНЕРГЕТИКОВ: Скрываем ненужные поля
            modalRussianTitle.classList.add('hidden');
            modalRatingContainer.classList.add('hidden');
        }
        
        modal.classList.remove('hidden');
    }

    /* Закрывает модальное окно */
    function closeModal() {
        modal.classList.add('hidden');
    }

    // --- 5. ЗАПУСК ПРИЛОЖЕНИЯ ---
    init();

});