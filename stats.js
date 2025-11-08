document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ПРОВЕРКА ДАННЫХ ---
    if (typeof tierListData === 'undefined') {
        console.error("Ошибка: Файл anime-data.js не загружен или пуст!");
        alert("Ошибка: Не удалось загрузить данные аниме. Проверьте anime-data.js");
        return;
    }

    // --- 2. ПОЛУЧЕНИЕ DOM ЭЛЕМЕНТОВ ---
    const statsByYearContainer = document.getElementById('stats-by-year');
    const totalUniqueSpan = document.getElementById('stats-total-unique');
    const genreLoadingIndicator = document.getElementById('genre-loading-indicator');
    const genreChartContainer = document.getElementById('genre-chart-container');
    const genreChartCanvas = document.getElementById('genreChart');

    // Кэш для жанров (чтобы не запрашивать API повторно)
    // Ключ - НАЗВАНИЕ аниме, значение - массив жанров [genre1, genre2, ...]
    const genreCache = {};
    // URL для плейсхолдера, если постер не найден
    const placeholderUrl = "https://placehold.co/200x280/ef4444/ffffff?text=Not+Found";


    // --- 3. СЛОВАРЬ ПЕРЕВОДА ЖАНРОВ ---
    const genreTranslations = {
        "Action": "Экшен",
        "Adventure": "Приключения",
        "Comedy": "Комедия",
        "Drama": "Драма",
        "Fantasy": "Фэнтези",
        "Sci-Fi": "Научная фантастика",
        "Slice of Life": "Повседневность",
        "Romance": "Романтика",
        "Supernatural": "Сверхъестественное",
        "Mystery": "Детектив",
        "Horror": "Ужасы",
        "Psychological": "Психология",
        "Thriller": "Триллер",
        "Mecha": "Меха",
        "Music": "Музыка",
        "Sports": "Спорт",
        "School": "Школа",
        "Isekai": "Исекай",
        "Shounen": "Сёнен",
        "Seinen": "Сэйнэн",
        "Shoujo": "Сёдзё",
        "Josei": "Дзёсэй",
        "Harem": "Гарем",
        "Ecchi": "Этти",
        "Martial Arts": "Боевые искусства",
        "Game": "Игры",
        "Vampire": "Вампиры",
        "Magic": "Магия",
        "Friendship": "Дружба",
        "Military": "Военное",
        "Political": "Политика",
        "Super Power": "Супер сила",
        "Demons": "Демоны",
        "Historical": "Историческое"
    };

    /**
     * Хелпер для перевода жанра
     * @param {string} englishName - Жанр на английском
     * @returns {string} - Жанр на русском (или английском, если нет перевода)
     */
    function translateGenre(englishName) {
        return genreTranslations[englishName] || englishName;
    }


    // --- 4. ГЛАВНАЯ ФУНКЦИЯ ---

    /* Запускает все расчеты */
    async function calculateStats() {
        // 1. Считаем просмотры (быстро, из anime-data.js)
        calculateViews();

        // 2. Считаем жанры (долго, с запросами к API)
        await calculateGenres();
    }

    // --- 5. ФУНКЦИИ РАСЧЕТА ---

    /* Считает просмотры по годам и уникальные */
    function calculateViews() {
        let totalUniqueTitles = new Set(); // Set автоматически хранит только уникальные значения

        // 1. Считаем по годам
        const years = Object.keys(tierListData).sort((a, b) => b - a);
        
        years.forEach(year => {
            const dataForYear = tierListData[year];
            // .flat() превращает [[...], [...]] в [...]
            const allAnimeForYear = Object.values(dataForYear).flat();
            const count = allAnimeForYear.length;

            // Добавляем в HTML (с новым дизайном)
            const yearP = document.createElement('p');
            yearP.className = "text-lg text-gray-300 flex justify-between";
            yearP.innerHTML = `
                <strong>${year}:</strong> 
                <span class="font-medium text-gray-100">${count} аниме</span>
            `;
            statsByYearContainer.appendChild(yearP);

            // 2. Добавляем в Set для подсчета уникальных
            allAnimeForYear.forEach(anime => {
                totalUniqueTitles.add(anime.title.toLowerCase()); // Приводим к нижнему регистру для точности
            });
        });

        // 3. Показываем итог
        totalUniqueSpan.textContent = totalUniqueTitles.size;
    }

    /* Загружает жанры из API, считает и рисует диаграмму */
    async function calculateGenres() {
        // 1. Собираем ВСЕ уникальные аниме со ВСЕХ годов
        let allUniqueTitles = new Set();
        Object.keys(tierListData).forEach(year => {
            const dataForYear = tierListData[year];
            const allAnimeForYear = Object.values(dataForYear).flat();
            allAnimeForYear.forEach(anime => {
                allUniqueTitles.add(anime.title); // Используем оригинальное название (ключ для API)
            });
        });

        // 2. Асинхронно загружаем жанры для каждого
        const genrePromises = Array.from(allUniqueTitles).map(title => fetchGenresForAnime(title));
        // Ждем, пока ВСЕ запросы завершатся
        await Promise.all(genrePromises); 

        // 3. Считаем жанры (С ПЕРЕВОДОМ)
        const genreCounts = {};
        Object.values(genreCache).forEach(genreArray => {
            if (genreArray) { // genreArray может быть null, если API не нашел
                genreArray.forEach(englishGenreName => {
                    // --- ВОТ ИЗМЕНЕНИЕ ---
                    const russianGenreName = translateGenre(englishGenreName);
                    // --- КОНЕЦ ИЗМЕНЕНИЯ ---
                    genreCounts[russianGenreName] = (genreCounts[russianGenreName] || 0) + 1;
                });
            }
        });

        // 4. Сортируем и берем Топ-15
        const sortedGenres = Object.entries(genreCounts)
            .sort(([, countA], [, countB]) => countB - countA) // Сортируем по убыванию (countB - countA)
            .slice(0, 15); // <-- Берем первые 15

        // 5. Готовим данные для диаграммы
        const labels = sortedGenres.map(([genreName]) => genreName);
        const data = sortedGenres.map(([, count]) => count);

        // 6. Прячем загрузчик, показываем диаграмму
        genreLoadingIndicator.classList.add('hidden');
        genreChartContainer.classList.remove('hidden');

        // 7. Рисуем диаграмму
        renderGenreDoughnutChart(labels, data);
    }


    /* Загружает данные ОДНОГО аниме из API Kitsu, чтобы получить ЖАНРЫ. Использует кэш. */
    async function fetchGenresForAnime(title) {
        if (genreCache[title]) {
            return genreCache[title]; // Возвращаем из кэша
        }

        // Kitsu API. Нам нужны 'genres'
        const encodedTitle = encodeURIComponent(title);
        // ?include=genres говорит API включить связанные данные по жанрам
        const apiUrl = `https://kitsu.io/api/edge/anime?filter[text]=${encodedTitle}&page[limit]=1&include=genres`;

        try {
            // Задержка, чтобы не получить бан от API
            await new Promise(resolve => setTimeout(resolve, 500));

            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const json = await response.json();

            if (json.data && json.data.length > 0) {
                // Kitsu нашел аниме.
                // Жанры лежат в 'included' блоке.
                if (json.included && json.included.length > 0) {
                    const genres = json.included
                        .filter(item => item.type === 'genres') // Берем только жанры
                        .map(genre => genre.attributes.name); // Берем их имена

                    genreCache[title] = genres; // Сохраняем в кэш [Action, Adventure, ...]
                    return genres;
                }
            }
            // Аниме найдено, но жанров нет, или API не нашел аниме
            throw new Error("Genres not found or anime not found");

        } catch (error) {
            console.error(`Ошибка загрузки жанров для "${title}":`, error.message);
            genreCache[title] = null; // Сохраняем null, чтобы не пробовать снова
            return null;
        }
    }


    /* Рисует круговую диаграмму (Doughnut) с помощью Chart.js */
    function renderGenreDoughnutChart(labels, data) {
        if (!genreChartCanvas) return;
        const ctx = genreChartCanvas.getContext('2d');

        // Глобальные настройки для Chart.js
        Chart.defaults.color = '#cbd5e1'; // Светло-серый текст (Tailwind gray-300)
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.font.size = 14;

        // Палитра в стиле сайта
        const chartColors = [
            '#818CF8', // indigo-400
            '#E0E7FF', // indigo-100
            '#6366F1', // indigo-500
            '#4F46E5', // indigo-600
            '#A5B4FC', // indigo-300
            '#C7D2FE', // indigo-200
            '#F87171', // red-400
            '#FB923C', // orange-400
            '#FACC15', // yellow-400
            '#4ADE80', // green-400
            '#38BDF8', // blue-400
            '#A78BFA', // purple-400
            '#FB7185', // pink-400
            '#9CA3AF', // gray-400
            '#3730A3'  // indigo-800
        ];

        new Chart(ctx, {
            type: 'doughnut', // <-- Тип "Бублик"
            data: {
                labels: labels, // ["Экшен", "Комедия", ...]
                datasets: [{
                    label: 'Кол-во аниме',
                    data: data,
                    backgroundColor: chartColors,
                    borderColor: '#374151',
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Позволяет диаграмме заполнить контейнер
                plugins: {
                    legend: {
                        position: 'right', // Легенда (названия) справа
                        labels: {
                            padding: 15,
                            boxWidth: 12
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1f2937',
                        titleColor: '#e5e7eb',
                        bodyColor: '#e5e7eb',
                        padding: 10,
                        cornerRadius: 4,
                        displayColors: true // Показываем цветной квадратик
                    }
                }
            }
        });
    }

    // --- 6. ЗАПУСК ---
    calculateStats();

});