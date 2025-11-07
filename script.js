/* Глобальный обработчик 'DOMContentLoaded'.
 * Весь скрипт выполняется только после полной загрузки HTML-документа. */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ПРОВЕРКА ДАННЫХ (из anime-data.js) ---
    // Убедимся, что данные из anime-data.js загрузились
    if (typeof tierListData === 'undefined' || typeof ratingScales === 'undefined') {
        console.error("Ошибка: Файл anime-data.js не загружен или пуст!");
        alert("Ошибка: Не удалось загрузить данные аниме. Проверьте anime-data.js");
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
    
    // Кэш для данных аниме (чтобы не запрашивать API повторно)
    // Ключ - это поисковый запрос (название), значение - данные из API
    const animeCache = {};
    
    // Текущее состояние
    let currentYear = '';
    let currentScale = 'standard'; // По умолчанию S-F
    let isLoading = false;
    // URL для плейсхолдера, если постер не найден
    const placeholderUrl = "https://placehold.co/200x280/ef4444/ffffff?text=Not+Found";

    // --- 4. ФУНКЦИИ ---

    /* Инициализация приложения */
    function init() {
        // Заполняем селектор годов
        const years = Object.keys(tierListData).sort((a, b) => b - a); // Сортируем (сначала новые)
        if (years.length === 0) {
            console.error("Нет данных в tierListData!");
            return;
        }

        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });

        // Устанавливаем год по умолчанию
        const currentRealYear = new Date().getFullYear().toString();
        if (tierListData[currentRealYear]) {
            // Если текущий реальный год есть в данных, выбираем его
            yearSelect.value = currentRealYear;
        } else {
            // Иначе выбираем самый "новый" год из списка (первый)
            yearSelect.value = years[0];
        }
        
        // Устанавливаем шкалу по умолчанию (уже задана в HTML, но дублируем)
        scaleSelect.value = 'standard';
        
        // Сохраняем начальное состояние
        currentYear = yearSelect.value;
        currentScale = scaleSelect.value;

        // Добавляем обработчики событий
        yearSelect.addEventListener('change', handleYearChange);
        scaleSelect.addEventListener('change', handleScaleChange);
        modalClose.addEventListener('click', closeModal);
        modalOverlayClose.addEventListener('click', closeModal);
        
        // Закрытие модального окна по 'Escape'
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });

        // Первая отрисовка
        renderTierList();
    }

    /* Обработчик смены года */
    function handleYearChange(e) {
        currentYear = e.target.value;
        renderTierList();
    }

    /* Обработчик смены шкалы */
    function handleScaleChange(e) {
        currentScale = e.target.value;
        renderTierList();
    }

    /**
     * Загружает данные аниме из API (Kitsu.io) по названию
     * Использует кэш, чтобы не запрашивать повторно. */
    async function fetchAnimeData(title) {
        if (animeCache[title]) {
            return animeCache[title]; // Возвращаем из кэша
        }
        
        const encodedTitle = encodeURIComponent(title);
        const apiUrl = `https://kitsu.io/api/edge/anime?filter[text]=${encodedTitle}&page[limit]=1`;

        try {
            // Задержка 500мс, чтобы не получить бан от API
            await new Promise(resolve => setTimeout(resolve, 500)); 
            
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const json = await response.json();
            
            if (json.data && json.data.length > 0) {
                // API Kitsu нашел аниме
                const anime = json.data[0].attributes;
                const result = {
                    title: anime.canonicalTitle,
                    // Ищем русское название, если нет - берем японское (romaji)
                    ruTitle: anime.titles.ru_jp || anime.titles.ja_jp || null, 
                    poster: anime.posterImage?.medium || placeholderUrl,
                    // Рейтинг у Kitsu 100-бальный, приводим к 10-бальному
                    averageRating: anime.averageRating ? (parseFloat(anime.averageRating) / 10).toFixed(1) : null
                };
                animeCache[title] = result; // Сохраняем в кэш
                return result;
            } else {
                // API не нашел аниме
                throw new Error("Anime not found in Kitsu database");
            }
            
        } catch (error) {
            console.error(`Ошибка загрузки аниме "${title}":`, error.message);
            // Сохраняем "битый" объект в кэш, чтобы не пробовать снова
            const errorResult = {
                title: title,
                ruTitle: "(Не найдено)",
                poster: placeholderUrl,
                averageRating: null
            };
            animeCache[title] = errorResult;
            return errorResult;
        }
    }

    /* Главная функция отрисовки */
    async function renderTierList() {
        if (isLoading) return; // Защита от двойного запуска
        isLoading = true;
        container.innerHTML = ''; // Очищаем старый список
        loadingIndicator.classList.remove('hidden'); // Показываем загрузчик

        const scales = ratingScales[currentScale];
        const dataForYear = tierListData[currentYear];

        // 1. Собираем все аниме для этого года в один массив
        const allAnimeForYear = Object.values(dataForYear).flat(); // [[...], [...]] -> [...]
        
        // 2. Асинхронно загружаем данные для всех аниме
        // (Promise.all выполнит все запросы параллельно)
        const animeDataPromises = allAnimeForYear.map(anime => fetchAnimeData(anime.title));
        await Promise.all(animeDataPromises); // Ждем, пока ВСЕ запросы не завершатся

        // 3. Отключаем загрузчик и рендерим
        loadingIndicator.classList.add('hidden');
        
        for (let i = 0; i < scales.length; i++) {
            const standardRank = ratingScales.standard[i].rank; // Ключ данных (S, A, ...)
            const displayRank = scales[i].rank;                // Отображаемый ранг
            const color = scales[i].color;                     // Цвет
            
            const animeInThisTier = dataForYear[standardRank] || [];
            
            const tierRow = document.createElement('div');
            tierRow.className = 'flex flex-col md:flex-row items-stretch mb-2 shadow-lg rounded-lg overflow-hidden';
            
            // Добавляем text-center для центрирования "Это база..."
            tierRow.innerHTML = `
                <!-- Ярлык тира -->
                <div class="tier-label flex items-center justify-center w-full md:w-48 lg:w-60 text-xl md:text-2xl font-bold text-gray-900 p-4 shrink-0 text-center ${color}">
                    <span class="text-shadow">${displayRank}</span>
                </div>
                <!-- Контейнер с аниме -->
                <div class="tier-anime-grid flex flex-wrap items-start gap-2 p-4 bg-gray-800 w-full min-h-[100px]">
                </div>
            `;
            
            const animeGrid = tierRow.querySelector('.tier-anime-grid');
            
            if (animeInThisTier.length === 0) {
                // Если тир пустой
                const emptyText = document.createElement('span');
                emptyText.className = 'text-gray-500 italic p-4';
                emptyText.textContent = 'Пусто';
                animeGrid.appendChild(emptyText);
            } else {
                // Добавляем постеры
                for (const anime of animeInThisTier) {
                    // Берем уже загруженные данные из кэша
                    const animeData = animeCache[anime.title]; 
                    if (!animeData) continue;

                    const img = document.createElement('img');
                    img.src = animeData.poster;
                    img.alt = animeData.title;
                    img.title = `${animeData.title}${animeData.ruTitle ? ` (${animeData.ruTitle})` : ''}`; // Всплывающая подсказка
                    img.className = 'w-20 h-28 md:w-24 md:h-36 object-cover rounded-md shadow-md cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl outline-2 outline-transparent hover:outline-indigo-400';
                    
                    // Сохраняем все данные в dataset для модального окна
                    img.dataset.review = anime.review;
                    img.dataset.title = animeData.title;
                    img.dataset.poster = animeData.poster;
                    // --- ЛОГИКА РУССКОГО НАЗВАНИЯ ---
                    // Сначала ищем 'anime.ruTitle' (из anime-data.js), 
                    // если его нет - берем 'animeData.ruTitle' (из API)
                    img.dataset.ruTitle = anime.ruTitle || animeData.ruTitle || '';
                    // --- КОНЕЦ ЛОГИКИ ---
                    img.dataset.rating = animeData.averageRating || '';
                    
                    img.addEventListener('click', () => showModal(img.dataset));
                    animeGrid.appendChild(img);
                }
            }
            container.appendChild(tierRow);
        }
        isLoading = false; // Снимаем блокировку
    }

    /* Показывает модальное окно с данными */
    function showModal(data) {
        modalPoster.src = data.poster;
        modalTitle.textContent = data.title;
        modalReview.textContent = data.review;

        // Показываем/скрываем русское название
        if (data.ruTitle) {
            modalRussianTitle.textContent = data.ruTitle;
            modalRussianTitle.classList.remove('hidden');
        } else {
            modalRussianTitle.classList.add('hidden');
        }
        
        // Показываем/скрываем рейтинг
        if (data.rating) {
            modalRating.textContent = `Рейтинг с Kitsu: ${data.rating} / 10`;
            modalRatingContainer.classList.remove('hidden');
        } else {
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