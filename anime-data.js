const ratingScales = {
    standard: [
        { rank: 'S', color: 'bg-red-500' },
        { rank: 'A', color: 'bg-orange-500' },
        { rank: 'B', color: 'bg-yellow-400' },
        { rank: 'C', color: 'bg-green-500' },
        { rank: 'D', color: 'bg-blue-500' },
        { rank: 'E', color: 'bg-purple-500' },
        { rank: 'F', color: 'bg-gray-600' }
    ],
    personal: [
        { rank: 'Магнум опус', color: 'bg-red-500' },
        { rank: 'Это база, это знать надо<br>(вне рейтинга)', color: 'bg-orange-500' },
        { rank: 'Очень хорошо', color: 'bg-yellow-400' },
        { rank: 'Неплохо', color: 'bg-green-500' },
        { rank: 'Никак', color: 'bg-blue-500' },
        { rank: 'Плохо', color: 'bg-purple-500' },
        { rank: 'Ужасно', color: 'bg-gray-600' }
    ]
};

/** "База данных" аниме.
 
 * КАК ДОБАВЛЯТЬ:
 * 1. Вписать ТОЧНОЕ (по возможности) название аниме.
 * 2. Добавить отзыв.

 * Скрипт сам попытается найти постер через API по названию. */

const tierListData = {
    '2024': {
        'S': [
            {
                title: "Re:Zero kara Hajimeru Isekai Seikatsu 3 Season",
                ruTitle: "Re:Zero. Жизнь в другом мире с нуля 3",
                review: "Это хорошо! Но мы чуть-чуть потерпим и потом как 6-ую арку посмотрим, и ВАУ будет! (обзор/пересказ арок есть в тг-канале)."
            },
            {
                title: "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka V: Houjou no Megami-hen",
                ruTitle: "Может, я встречу тебя в подземелье? V",
                review: "По факту это аниме не прям вау, но мне очень нравится. Буду читать ранобэ."
            },
        ],
        'A': [
            {
                title: "One Piece",
                ruTitle: "Ван Пис",
                review: "Судьба. Судьба. Мечты. Эти непреодолимые идеи хранятся глубоко в сердце человека. Пока есть люди, которые ищут свободы в этой жизни, эти вещи не исчезнут с лица земли."
            },
            {
                title: "Tengen Toppa Gurren Lagann",
                ruTitle: "Гуррен-Лаганн",
                review: "Можешь не верить в себя. Верь в меня. Верь в мою веру в тебя!"
            },
        ],
        'B': [
            {
                title: "Majo to Yajuu",
                ruTitle: "Ведьма и чудовище",
                review: "Очень интерсное аниме с нормальной рисовкой и сюжетом. Заинтересовало."
            },
            {
                title: "Tsuki ga Michibiku Isekai Douchuu 2nd Season",
                ruTitle: "Лунное путешествие в другой мир 2",
                review: "Самое дефолтное исекай аниме с имба ГГ. Но мне почему-то нравится."
            },
            {
                title: "Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 3rd Season",
                ruTitle: "Добро пожаловать в класс превосходства 3",
                review: "Рисовка чутка подвела, сюжет держится на уровне первых двух сезонов."
            },
            {
                title: "Kimetsu no Yaiba: Hashira Geiko-hen",
                ruTitle: "Клинок, Рассекающий Демонов: Тренировка Хашира",
                review: "Стабилоьно хорошее аниме. Рисовка на высоте."
            },
            {
                title: "Boku no Hero Academia 7th Season",
                ruTitle: "Моя геройская академия 7",
                review: "7 сезон?! Я уже устал его смотреть."
            },
            {
                title: "Tsue to Tsurugi no Wistoria",
                ruTitle: "Меч и жезл Вистории",
                review: "Прикольно, карсивое аниме. Пошёл читать мангу. Впринципе неплохо."
            },
        ],
        'C': [
            {
                title: "Ore dake Level Up na Ken",
                ruTitle: "Поднятие уровня в одиночку",
                review: "Начало скучноватое, но потом пошло интереснее. В целом неплохо."
            },
            {
                title: "Lv2 kara Cheat datta Motoyuusha Kouho no Mattari Isekai Life",
                ruTitle: "Непринуждённая жизнь в другом мире экс-кандидата в герои, оказавшегося читером со 2 уровня",
                review: "Дефолтный гаремник с имба ГГ."
            },
            {
                title: "Kaii to Otome to Kamikakushi",
                ruTitle: "Перерождение: Монстр",
                review: "Прикольное, забавное аниме. До его анонса увидел ранобеху."
            },
            {
                title: "Re:Monster",
                ruTitle: "Мистика, девы и загадочные исчезновения",
                review: "Прикольное, забавное аниме."
            },
            {
                title: "Wind Breaker",
                ruTitle: "Ветролом",
                review: "Лучше чем Токийские мстители."
            },
            {
                title: "Kenka Dokugaku",
                ruTitle: "Борьба в прямом эфире",
                review: "По началу неплохо, потом скучновато."
            },
            {
                title: "Kuroshitsuji: Kishuku Gakkou-hen",
                ruTitle: "Тёмный дворецкий: Школа-интернат",
                review: "Это странно. Некоторые сезоны вообще не интересные, а некоторые прям хороши. Этот сезон как раз из таких."
            },
            {
                title: "Kaijuu 8-gou",
                ruTitle: "Кайдзю номер восемь",
                review: "По началу было прикольно, но потом мужиик стал слишком имбой и аниме потеряло интерес."
            },
            {
                title: "Bartender: Kami no Glass",
                ruTitle: "Бармен: Бокал бога",
                review: "Прикольно видеть как люди интерптируют жизнь через разные сферы. В данном случае - взаимодействие с людьми в баре. Но а баба жёстко бесит."
            },
            {
                title: "Nige Jouzu no Wakagimi",
                ruTitle: "Юный лорд — мастер побега",
                review: "Неплохая анимешка. Рисовка красивая, сюжет + - нормальный."
            },
            {
                title: "Kimitachi wa Dou Ikiru ka",
                ruTitle: "Мальчик и птица",
                review: "Если знать бекграунд Хаяо Миядзаки, то аниме преобритает очень глубокий смысл + можно сравнить с предыдущими его работами. Я смотрел с другом, поэтому неплохо."
            },
            {
                title: "Kami no Tou 2nd Season",
                ruTitle: "Башня Бога 2",
                review: "Хорошее аниме. Рисовка на норм, сюжет тоже. Я пошёл читать манхву... аниме никогда полностью не выйдет."
            },
            {
                title: "Suki demo Kirai na Amanojaku",
                ruTitle: "Моя подруга — демон",
                review: "Смотрел с другом, было прикольно. Но в целом дефолтная полнометражка."
            },
        ],
        'D': [
            {
                title: "Nozomanu Fushi no Boukensha",
                ruTitle: "Нежеланно бессмертный авантюрист",
                review: "Дефолт. Ничего особенного."
            },
            {
                title: "Akuyaku Reijou Level 99: Watashi wa Ura-Boss desu ga Maou dewa Arimasen",
                ruTitle: "Злодейка девяносто девятого уровня: «Я босс, но не король демонов»",
                review: "Немного забавное, но в целом дефолное аниме с имба ГГ."
            },
            {
                title: "Maou no Ore ga Dorei Elf wo Yome ni Shitanda ga, Dou Medereba Ii?",
                ruTitle: "Я, владыка демонов, взял эльфийку-рабыню в жёны. И как же мне её любить?",
                review: "Кринж! Еле досмотрел до конца."
            },
            {
                title: "Tensei Kizoku, Kantei Skill de Nariagaru",
                ruTitle: "Перерождение в аристократа со способностью анализа",
                review: "Никак"
            },
            {
                title: "The New Gate",
                ruTitle: "Новые врата",
                review: "Никак"
            },
            {
                title: "Boku no Hero Academia: Memories",
                ruTitle: "Моя геройская академия: Воспоминания",
                review: "Я даже уже забыл про что эти воспоминания."
            },
            {
                title: "Maou gun Saikyou no Majutsushi wa Ningen datta",
                ruTitle: "Самый сильный волшебник армии повелителя демонов оказался человеком",
                review: "Дефолтное аниме с имба ГГ."
            },
            {
                title: "Hazurewaku no Joutai Ijou Skill",
                ruTitle: "Я стал самым сильным с провальным навыком «ненормальное состояние», я разрушу всё",
                review: "Дефолтное аниме с имба ГГ. Но чуть-чуть чем-то заинтересовало."
            },
            {
                title: "I Parry Everything",
                ruTitle: "Я парировал всё время, чтобы стать сильнейшим авантюристом",
                review: "Дефолтное аниме с имба ГГ."
            },
            {
                title: "Atri: My Dear Moments",
                ruTitle: "Атри: Мои дорогие моменты",
                review: "Скучное, но красивое аниме."
            },
            {
                title: "Make Heroine ga Oosugiru!",
                ruTitle: "Слишком много проигравших героинь!",
                review: "Кринж! Я даже под конец дропнул."
            },
            {
                title: "Sokushi Cheat ga Saikyou sugite, Isekai no Yatsura ga Marude Aite ni Naranai n desu ga.",
                ruTitle: "Другой мир не может противостоять силе мгновенной смерти",
                review: "Никак"
            },
        ],
        'E': [],
        'F': []
    },
    '2025': {
        'S': [
            {
                title: "Fumetsu no Anata e Season 3",
                ruTitle: "Для тебя, Бессмертный 3",
                review: "Продолжение хорошей истории. Очень понравилось. Рисовка на высоте. Всем смотреть!"
            },
            {
                title: "Tenki no ko",
                ruTitle: "Дитя погоды",
                review: "Наконец-то пересмотрел. Великолепное аниме."
            },
            {
                title: "Kimi no Na wa.",
                ruTitle: "Твоё имя.",
                review: "Пересмотрел и снова проникся. Великолепное аниме."
            },
        ],
        'A': [
            {
                title: "One Piece",
                ruTitle: "Ван Пис",
                review: "Судьба. Судьба. Мечты. Эти непреодолимые идеи хранятся глубоко в сердце человека. Пока есть люди, которые ищут свободы в этой жизни, эти вещи не исчезнут с лица земли."
            },
            {
                title: "Hunter x Hunter",
                ruTitle: "Хантер х Хантер",
                review: "В следующей жизни я хочу быть собой и снова встретиться с тобой!"
            },
            {
                title: "Berserk",
                ruTitle: "Берсерк",
                review: "Что вершит судьбу человечества в этом мире? Некое незримое существо или закон, подобно Длани Господней парящей над миром? По крайне мере истинно то, что человек не властен даже над своей волей."
            },
            {
                title: "Fullmetal Alchemist",
                ruTitle: "Стальной алхимик",
                review: "Это будет равноценный обмен! Я дам тебе половину своей жизни, а ты мне — половинку своей. — Ну уж эти алхимики и их словечки. Равноценный обмен?"
            },
            {
                title: "Code Geass: Lelouch of the Rebellion",
                ruTitle: "Код Гиас",
                review: "Стрелять может лишь тот, кто сам готов быть застрелен."
            },
        ],
        'B': [
            {
                title: "Boku no Hero Academia: Final Season",
                ruTitle: "Моя геройская академия: Финал",
                review: "Рисовка удивила. Наконец-то финал. Круто!"
            },
            {
                title: "One Punch Man 3nd Season",
                ruTitle: "Ванпанчмен 3",
                review: "Не смотрять на покадравую рисовку, смотреть интересно."
            },
            {
                title: "Gachiakuta",
                ruTitle: "Гачиакута",
                review: "Немного затянуто, но в целом интересно. Подумываю прочитать мангу."
            },
            {
                title: "Fire Force Season 3",
                ruTitle: "Пламенная бригада пожарных 3",
                review: "Держит уровень первых двух сезонов."
            },
        ],
        'C': [
            {
                title: "Solo Leveling Season 2",
                ruTitle: "Поднятие уровня в одиночку 2: Восстаньте из тени",
                review: "Арка с муравьями точна была взята с HxH, но в целом неплохо."
            },
            {
                title: "Kijin Gentoushou",
                ruTitle: "Хроники людей и демонов",
                review: "По началу было интересно, но сюжет быстро стал скучным, рисовка посредственной. И я понял, что когда аниме из средневековья преходит в современность, то это не моё, хотя в бессмертном это смотреться гармонично."
            },
            {
                title: "Wind Breaker Season 2",
                ruTitle: "Ветролом 3",
                review: "Держит планку первого сезона, но не более того."
            },
            {
                title: "Vigilante: Boku no Hero Academia ILLEGALS",
                ruTitle: "Моя геройская академия: Вне закона",
                review: "Был приятно удивлён сюжетом. Не ожидал, что спин-офф может быть таким интересным."
            },
            {
                title: "Takopii no Genzai",
                ruTitle: "Первородный грех Такопи",
                review: "По началу было интересно, но потом... странно как-то пошло. Не понравилось. Но рисовка отличная."
            },
            {
                title: "Sono Bisque Doll wa Koi wo Suru Season 2",
                ruTitle: "Эта фарфоровая кукла влюбилась 2",
                review: "Держит уровень первого сезона, но не более того."
            },
            {
                title: "Yofukashi no Uta Season 2",
                ruTitle: "Песнь ночных сов 2",
                review: "Держит уровень первого сезона, но не более того."
            },
            {
                title: "Kaoru Hana wa Rin to Saku",
                ruTitle: "Благоухающий цветок расцветает с достоинством",
                review: "Красивое аниме, но очень скучное. Дропнул на 10-ой серии."
            },
        ],
        'D': [
            {
                title: "The Brilliant Healer's New Life in the Shadows",
                ruTitle: "Гениальный целитель, который исцелял в одно мгновение, но был изгнан как бесполезный, теперь наслаждается жизнью в качестве тёмного целителя",
                review: "Дефолтный гаремник и имба ГГ."
            },
            {
                title: "Katainaka no Ossan, Kensei ni Naru",
                ruTitle: "Старик из деревни становится Святым мечом",
                review: "Дефолтный гаремник."
            },
            {
                title: "Isekai Mokushiroku Mynoghra: Hametsu no Bunmei de Hajimeru Sekai Seifuku",
                ruTitle: "Апокалипсис Миногры: Покорение другого мира начинается с разрушенной цивилизации",
                review: "Даже не знаю что написать. Просто очередной исекай."
            },
        ],
        'E': [],
        'F': []
    },
    '2026': {
        'S': [],
        'A': [],
        'B': [],
        'C': [],
        'D': [],
        'E': [],
        'F': []
    },
    '2027': {
        'S': [],
        'A': [],
        'B': [],
        'C': [],
        'D': [],
        'E': [],
        'F': []
    },
    // Добавь '20xx' и так далее...
};