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
                title: "Re:Zero Том 15", 
                review: "Начало 4 арки, просто разрыв.", 
                img: "rezero/1.webp"
            }
        ],
        'A': [
            { 
                title: "Re:Zero Том 21", 
                review: "Начало 5 арки. Пристли.", 
                img: "rezero/2.webp"
            }
        ],
        'B': [],
        'C': [],
        'D': [],
        'E': [],
        'F': []
    };

// } else {
//     console.error("Ошибка: rezero-data.js не смог найти tierListData.");
}