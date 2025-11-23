const rezeroRatingScales = {
    standard: [
        { rank: 'S', color: 'bg-red-500' },
        { rank: 'A', color: 'bg-orange-500' },
        { rank: 'B', color: 'bg-yellow-400' },
        { rank: 'C', color: 'bg-green-500' },
        { rank: 'D', color: 'bg-blue-500' },
        { rank: 'E', color: 'bg-purple-500' },
//         { rank: 'F', color: 'bg-gray-600' }
    ],

    personal: [
        { rank: 'Магнум опус', color: 'bg-red-500' },
        { rank: 'Великолепно', color: 'bg-orange-500' },
        { rank: 'Отлично', color: 'bg-yellow-400' },
        { rank: 'Хорошо', color: 'bg-green-500' },
        { rank: 'Неплохо', color: 'bg-blue-500' },
        { rank: 'Скучно', color: 'bg-purple-500' },
    ]
};

if (typeof tierListData !== 'undefined') {
    
    tierListData['Re:Zero Ранобэ'] = {

        'S': [
            { 
                title: "Re:Zero Ранобэ Том 1", 
                review: "Именно с этой арки началось данное произведение. 1-ая серия аниме.", 
                img: "rezero/1.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 10", 
                review: "Появление Ведьмы. Испытание с флешбеками ГГ.", 
                img: "rezero/10.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 11", 
                review: "Появление всех Ведьм. Резня в особняке.", 
                img: "rezero/11.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 15", 
                review: "Спасение Беатрис. Победа над Великим Кроликом. Милая сцена с Эмилией.", 
                img: "rezero/15.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 21", 
                review: "Начало лучшей арки. Появление Шаулы.", 
                img: "rezero/21.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 25", 
                review: "Эпичный финал арки. Грустный финал Шаулы.", 
                img: "rezero/25.webp"
            },
            ],
        'A': [
            { 
                title: "Re:Zero Ранобэ Том 8", 
                review: "Операция против Культа Ведьмы.", 
                img: "rezero/8.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 9", 
                review: "Финал операция против Культа Ведьмы. Появление новых архиепископов.", 
                img: "rezero/9.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 12", 
                review: "Розвилка на IFку с Ехидной.", 
                img: "rezero/12.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 13", 
                review: "Трагическая история Розвааля, Беатрис и Рюдзу.", 
                img: "rezero/13.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 14", 
                review: "Финальная битва в особняке.", 
                img: "rezero/14.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 17", 
                review: "Хаос, разрушения, бои, смерти.", 
                img: "rezero/17.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 19", 
                review: "Бои.", 
                img: "rezero/19.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 20", 
                review: "Финальные битвы.", 
                img: "rezero/20.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 22", 
                review: "Ещё больше инфы про Шаулу. Испытания на этажах.", 
                img: "rezero/22.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 23", 
                review: "Старнные смерти и амнезия ГГ.", 
                img: "rezero/23.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 24", 
                review: "Друзья Субару пытаются вернуть ему память. Розвилка на IFку с Чревоугодием.", 
                img: "rezero/24.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 32", 
                review: "Битва за город. Пять Бастионов.", 
                img: "rezero/32.webp"
            },
            ],
        'B': [
            { 
                title: "Re:Zero Ранобэ Том 2", 
                review: "Знакомство почти со всеми основными героями и главной идеей.", 
                img: "rezero/2.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 5", 
                review: "Сближение с Рем, её смерти.", 
                img: "rezero/5.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 7", 
                review: "Победа над Белым Китом.", 
                img: "rezero/7.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 16", 
                review: "Пристелла. Кондидаты. Захват города четырьмя Архиепископами.", 
                img: "rezero/16.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 18", 
                review: "герои проигрывают. Подготовка к реваншу.", 
                img: "rezero/18.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 26", 
                review: "Рем очнулась. Амазонки. Империя Волакия.", 
                img: "rezero/26.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 27", 
                review: "Новые герои. Битва в городе-крепости Гуарал. ГГ фембой.", 
                img: "rezero/27.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 29", 
                review: "Битва против Генерала. Много смертей.", 
                img: "rezero/29.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 31", 
                review: "Гладиаторский Остров.", 
                img: "rezero/31.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 33", 
                review: "Предыстория Присциллы. Чиша Голд. Решающие битвы.", 
                img: "rezero/33.webp"
            },
            ],
        'C': [
            { 
                title: "Re:Zero Ранобэ Том 3", 
                review: "Первые трудности, их решения. ", 
                img: "rezero/3.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 6", 
                review: "очередное унижение ГГ. Появление Белого Кита.", 
                img: "rezero/6.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 28", 
                review: "Девять Божественных Генералов. Маленький ГГ.", 
                img: "rezero/28.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 30", 
                review: "Битва за город.", 
                img: "rezero/30.webp"
            },
            { 
                title: "Re:Zero Ранобэ Том 34", 
                review: "Отступление. Воссоединение сестёр.", 
                img: "rezero/34.webp"
            },
            ],
        'D': [
            { 
                title: "Re:Zero Ранобэ Том 4", 
                review: "Кринжовое знакомство с Юлиусом. Первое появление Петельгейзе.", 
                img: "rezero/4.webp"
            },
            ],
        'E': [],
        'F': []
    };

// } else {
//     console.error("Ошибка: rezero-data.js не смог найти tierListData.");
}