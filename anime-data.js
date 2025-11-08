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
    '2008': {
        'S': [],
        'A': [],
        'B': [],
        'C': [
            {
                title: "Тёмный дворецкий",
                ruTitle: "Kuroshitsuji",
                review: "Неплохо"
            },
        ],
        'D': [],
        'E': [],
        'F': []
    },
    '2009': {
        'S': [],
        'A': [],
        'B': [],
        'C': [],
        'D': [],
        'E': [],
        'F': []
    },
    '2010': {
        'S': [],
        'A': [
            {
                title: "Naruto",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
            {
                title: "Покемоны",
                ruTitle: "Pocket Monsters",
                review: "Почти ничего не моню про это аниме, но оно мне нравилось."
            },
        ],
        'B': [],
        'C': [],
        'D': [],
        'E': [],
        'F': []
    },
    '2011': {
        'S': [],
        'A': [
            {
                title: "Naruto",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
            {
                title: "Покемоны",
                ruTitle: "Pocket Monsters",
                review: "Почти ничего не моню про это аниме, но оно мне нравилось."
            },
        ],
        'B': [],
        'C': [],
        'D': [],
        'E': [],
        'F': []
    },
    '2012': {
        'S': [],
        'A': [
            {
                title: "Мастера меча онлайн",
                ruTitle: "Sword Art Online",
                review: "Запомните все! Это НЕ исека!"
            },
            {
                title: "Naruto",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
        ],
        'B': [],
        'C': [],
        'D': [],
        'E': [],
        'F': []
    },
    '2013': {
        'S': [],
        'A': [
            {
                title: "Naruto",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
        ],
        'B': [],
        'C': [
            {
                title: "Sword Art Online: Extra Edition",
                ruTitle: "Мастера меча онлайн: Дополнительное издание",
                review: "Неплохо"
            },
            {
                title: "Watashi ga Motenai no wa Dou Kangaetemo Omaera ga Warui!",
                ruTitle: "Не моя вина, что я не популярна!",
                review: "Неплохо"
            },
            {
                title: "Gekijouban Steins;Gate: Fuka Ryouiki no Déjà vu",
                ruTitle: "Врата Штейна: Зона загрузки дежавю",
                review: ""
            },
        ],
        'D': [],
        'E': [],
        'F': []
    },
    '2014': {
        'S': [],
        'A': [
            {
                title: "Naruto",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
        ],
        'B': [
            {
                title: "Sword Art Online II",
                ruTitle: "Мастера Меча Онлайн 2",
                review: "Чутка слабее, чем 1-ый сезон. Но в целом неплохо."
            }
        ],
        'C': [
            {
                title: "Noragami",
                ruTitle: "Бездомный бог",
                review: "Неплохо"
            },
        ],
        'D': [],
        'E': [],
        'F': []
    },
    '2015': {
        'S': [
            {
                title: "Re: Zero kara Hajimeru Isekai Seikatsu",
                ruTitle: "Re: Жизнь в другом мире с нуля",
                review: "С этого всё началось. Я был шакированн идеей возвращения в точку сохранения после смерти. Очень понравилось аниме."
            }
        ],
        'A': [
            {
                title: "Naruto",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
        ],
        'B': [
            {
                title: "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka",
                ruTitle: "Может, я встречу тебя в подземелье?",
                review: "Для того времени было очень круто."
            },
            {
                title: "Owari no Seraph",
                ruTitle: "Последний Серафим",
                review: "Это было очень круто."
            },
            {
                title: "Owari no Seraph: Nagoya Kessen-hen",
                ruTitle: "Последний Серафим 2",
                review: "Спустя много лет пошёл читать мангу."
            },
            {
                title: "Tokyo Ghoul √A",
                ruTitle: "Токийский Гуль √A (ТВ-2)",
                review: "Пока ещё хорошо."
            },
        ],
        'C': [
            {
                title: "Monster Musume no Iru Nichijou",
                ruTitle: "Повседневная Жизнь с Девушкой-Монстром",
                review: "Без комментариев."
            },
            {
                title: "Noragami Aragoto",
                ruTitle: "Бездомный бог: Арагото",
                review: "Держит уровень первого сезона. Жалко что не продолжили."
            },
        ],
        'D': [],
        'E': [],
        'F': []
    },
    '2016': {
        'S': [
            {
                title: "Re: Zero kara Hajimeru Isekai Seikatsu",
                ruTitle: "Re: Жизнь в другом мире с нуля",
                review: "С этого всё началось. Я был шакированн идеей возвращения в точку сохранения после смерти. Очень понравилось аниме."
            }
        ],
        'A': [
            {
                title: "One Piece",
                ruTitle: "Ван Пис",
                review: "Посмотрел + - 100 серий, но потом почему-то дропнул."
            },
            {
                title: "Naruto",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
            {
                title: "Kimi no Na wa.",
                ruTitle: "Твоё имя.",
                review: "Пересмотрел и снова проникся. Великолепное аниме."
            },
        ],
        'B': [
            {
                title: "Boku dake ga Inai Machi",
                ruTitle: "Город, в котором меня нет",
                review: "Возможно лучший детектив."
            }
        ],
        'C': [
            {
                title: "Monster Musume no Iru Nichijou OVA",
                ruTitle: "Повседневная жизнь с девушкой-монстром OVA",
                review: "Без комментариев."
            }
        ],
        'D': [],
        'E': [],
        'F': []
    },
    '2017': {
        'S': [
            {
                title: "Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e",
                ruTitle: "Добро пожаловать в класс превосходства",
                review: "На этом базируется моя личность."
            },
            {
                title: "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka OVA",
                ruTitle: "Может, я встречу тебя в подземелье? OVA",
                review: "Никак"
            },
        ],
        'A': [
            {
                title: "Naruto",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
        ],
        'B': [
            {
                title: "Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?",
                ruTitle: "Если ты будешь не занят, спасёшь меня от апокалипсиса?",
                review: "О да, это было хорошо, это было грустно."
            },
        ],
        'C': [],
        'D': [
            {
                title: "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka OVA",
                ruTitle: "Может, я встречу тебя в подземелье? OVA",
                review: "Никак"
            },
            {
                title: "Dungeon ni Deai o Motomeru no wa Machigatte Iru Darouka Gaiden: Sword Oratoria",
                ruTitle: "Может, я встречу тебя в подземелье? — Меч Оратории",
                review: "Я даже не помню о чём это."
            },
        ],
        'E': [],
        'F': []
    },
    '2018': {
        'S': [
            {
                title: "Sword Art Online: Alicization",
                ruTitle: "Мастера Меча Онлайн: Алисизация",
                review: "Лучшее из САО, ну может после 1-го сезона, на мой взгляд. Очень понравилось аниме."
            },
        ],
        'A': [],
        'B': [
            {
                title: "Re:Zero kara Hajimeru Isekai Seikatsu - Memory Snow",
                ruTitle: "Re: Жизнь в другом мире с нуля - Снежные воспоминания",
                review: "Очень хороший фильм."
            },
            {
                title: "Darling in the FranXX",
                ruTitle: "Любимый во Франкcе",
                review: "Для моего маленького мозга это был пик! Я даже пошёл AMV делать. С этого аниме началась моя деятельность на юутубе."
            },
            {
                title: "Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai",
                ruTitle: "Этот глупый свин не понимает мечту девочки-зайки",
                review: "Первое аниме, из-за которого я не спал целую ночь, чтобы досмотреть его. Очень понравилось аниме."
            },
            {
                title: "Overlord II",
                ruTitle: "Повелитель 2",
                review: "На уровне первого сезона. Очень понравилось аниме."
            },
            {
                title: "Overlord III",
                ruTitle: "Повелитель 3",
                review: "На уровне второго сезона. Очень понравилось аниме."
            },
        ],
        'C': [],
        'D': [],
        'E': [],
        'F': []
    },
    '2019': {
        'S': [
            {
                title: "Vinland Saga",
                ruTitle: "Сага о Винланде",
                review: "Вау! Великолепное аниме! Очень понравилось. Рисовка, сюжет, персонажи - всё на высоте. Всем советую! Пошёл читать мангу."
            },
        ],
        'A': [
            {
                title: "Code Geass: Fukkatsu no Lelouch",
                ruTitle: "Код Гиасс: Воскрешение Лелуша",
                review: "Как альтернативная концовка/продолжение оригинального сериала - очень хорошо."
            },
        ],
        'B': [
            {
                title: "Gotoubun no Hanayome",
                ruTitle: "Пять невест",
                review: "На мой маленький, пубертатный мозг это аниме произвело большое впечатление. Очень милое и романтичное аниме."
            },
            {
                title: "Kimetsu no Yaiba",
                ruTitle: "Клинок, рассекающий демонов",
                review: "Сюжет и рисовка на высоте. Очень понравилось аниме."
            },
            {
                title: "Yakusoku no Neverland",
                ruTitle: "Обещанный Неверленд",
                review: "Плотный перекус детьми. С элементами детектива и ужасов. Очень понравилось аниме."
            },
        ],
        'C': [
            {
                title: "Arifureta Shokugyou de Sekai Saikyou",
                ruTitle: "Арифурэта: Сильнейший ремесленник в мире",
                review: "Дефолтный гаремник с имба ГГ. Но в целом неплохо."
            },
            {
                title: "Dungeon ni Deai wo Motomeru no wa Machigatteiru no Darou ka II",
                ruTitle: "Может, я встречу тебя в подземелье? II",
                review: "Из-за кринжовго начала не могу поставить выше. Но в целом неплохо."
            },
            {
                title: "Seishun Buta Yaro wa Yumemiru Shoujo no Yume wo Minai",
                ruTitle: "Этот глупый свин не понимает мечту девочки-зайки. Фильм",
                review: "Неплохо"
            },
            {
                title: "Shinchou Yuusha: Kono Yuusha ga Ore Tuee Kuse ni Shinchou Sugiru",
                ruTitle: "Этот герой чересчур осторожен, хоть и бессмертен",
                review: "Финал удивил."
            },
        ],
        'D': [
            {
                title: "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka Movie: Orion no Ya",
                ruTitle: "Может, я встречу тебя в подземелье? Стрела Ориона",
                review: "Я даже не помню о чём это."
            },
            {
                title: "Seishun buta yarou CD drama",
                ruTitle: "Этот глупый свин не понимает мечту девочки-зайки. СД Драма",
                review: "Я даже не помню о чём это."
            },
        ],
        'E': [],
        'F': []
    },
    '2020': {
        'S': [
            {
                title: "Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season",
                ruTitle: "Re:Zero. Жизнь в другом мире с нуля 2",
                review: "Хорошое продолжение первого сезона! На пике моего рейтинга чисто из-за сюжета."
            },
            {
                title: "Sword Art Online: Alicization - War of Underworld Part 2",
                ruTitle: "Мастера Меча Онлайн: Алисизация - Война в Андэрворлде - Часть 2",
                review: "Самая любима романтика, хоть у этого аниме это и не основной сюжетный фокус. Очень понравилось."
            },
            {
                title: "Dungeon ni Deai wo Motomeru no wa Machigatteiru no Darou ka III",
                ruTitle: "Может, я встречу тебя в подземелье? III",
                review: "Этот сезон в разы лучше 2-го. Очень милое аниме."
            },
        ],
        'A': [],
        'B': [
            {
                title: "Jujutsu Kaisen",
                ruTitle: "Магическая битва",
                review: "Вау! Я был в восторге от рисовки и сюжета. Но я бы не сказал, что это аниме достойно такого хайпа."
            },
            {
                title: "Kimetsu no Yaiba Movie: Mugen Ressha-hen",
                ruTitle: "Клинок, Рассекающий Демонов: Бесконечный Поезд",
                review: "Всё так же круто."
            },
        ],
        'C': [
            {
                title: "Kami no Tou: Tower of God",
                ruTitle: "Башня Бога",
                review: "Несклько раз начинал смотреть, но потом выкупил прикол и понравилось. Пошёл читать манхву."
            },
        ],
        'D': [],
        'E': [],
        'F': []
    },
    '2021': {
        'S': [
            {
                title: "Fumetsu no Anata e",
                ruTitle: "Для тебя, Бессмертный",
                review: "Начло просто великолепное! Аниме с глубоким смыслом и отличной рисовкой. Всем советую!"
            },
        ],
        'A': [],
        'B': [
            {
                title: "Jujutsu Kaisen 0 Movie",
                ruTitle: "Магическая битва 0 Фильм",
                review: "Очень крутой фильм. Подходит для развития сюжета перед 2-ым и 3-ем сезонами."
            },
            {
                title: "Tsuki ga Michibiku Isekai Douchuu",
                ruTitle: "Лунное путешествие в другой мир",
                review: "Приятно удивило. Хоть и самый дефолтный исекай с имба ГГ, но мне почему-то нравится."
            },
            {
                title: "86 EIGHTY-SIX",
                ruTitle: "86 Восемьдесят-шесть",
                review: "О да! Это было великолепно! Очень понравилось аниме. Рисовка, сюжет, персонажи - всё на высоте. И с долей грустинки."
            },
            {
                title: "86 EIGHTY-SIX 2nd Cour",
                ruTitle: "86 Восемьдесят-шесть 2",
                review: "На уровне 1-го сезона."
            },
            {
                title: "Vanitas no Carte",
                ruTitle: "Мемуары Ванитаса",
                review: "Приятно удивило. Очень крутое аниме с интересным сюжетом и персонажами."
            },
            {
                title: "Kimetsu no Yaiba: Yuukaku-hen",
                ruTitle: "Клинок, Рассекающий Демонов: Квартал Красных Фонарей",
                review: "Всё так же круто."
            },
            {
                title: "Kimetsu no Yaiba: Mugen Ressha-hen (TV)",
                ruTitle: "Клинок, Рассекающий Демонов: Бесконечный Поезд (ТВ)",
                review: "Всё так же круто."
            },
            {
                title: "Kumo desu ga, Nani ka?",
                ruTitle: "Да, я паук, и что?",
                review: "Рисовка нормальная, но вот 3Д графика... сюжет интересный. Попытался прочитать ранобэ, но чёт не понравилось."
            },
        ],
        'C': [
            {
                title: "Jaku-Chara Tomozaki-kun",
                ruTitle: "Низкоуровневый Томозаки",
                review: "Неплохо"
            },
            {
                title: "Shaman King (2021)",
                ruTitle: "Шаман Кинг (2021)",
                review: "Не самый плохой ремейк. Но оригинал всё равно в сердечке."
            },
            {
                title: "Saihate no Paladin",
                ruTitle: "Паладин издалека",
                review: "Неплохое аниме. Но не более того."
            },
            {
                title: "Go-toubun no Hanayome 2",
                ruTitle: "Пять невест 2",
                review: "Рисовка стала лучше, но 1-ый сезон был ммм... чутка лучше чтоли? Более романтичный."
            },
            {
                title: "Sword Art Online: Progressive Movie - Hoshi Naki Yoru no Aria",
                ruTitle: "Мастера Меча Онлайн: Прогрессив — Ария в беззвёздной ночи",
                review: "Прикольно, но есть и получше сезоны про САО."
            },
            {
                title: "Tensura Nikki: Tensei Shitara Slime Datta Ken",
                ruTitle: "О моём перерождении в слизь. Дневник слизи-попаданца",
                review: "На удивление неплохо."
            },
            {
                title: "Tatoeba Last Dungeon Mae no Mura no Shounen ga Joban no Machi de Kurasu Youna Monogatari",
                ruTitle: "История о пареньке из деревни, расположенной перед сложнейшим подземельем",
                review: "Самый слабый из самых сильных ГГ. Но в целом неплохо."
            },
            {
                title: "Kaizoku Oujo",
                ruTitle: "Фена: Принцесса пиратов",
                review: "Очень милое аниме. Напомнило Пиратов Карибского моря, не удивитильно. После просмотра захотелось поиграть в Sea of Thieves."
            },
            {
                title: "Sentouin, Hakenshimasu!",
                ruTitle: "Комбатанты будут высланы!",
                review: "Неплохое, забавное аниме."
            },
        ],
        'D': [
            {
                title: "Jaku-Chara Tomozaki-kun Specials",
                ruTitle: "Низкоуровневый Томозаки OVA",
                review: "Я даже не помню о чём это."
            },
        ],
        'E': [],
        'F': [
            {
                title: "Yakusoku no Neverland 2nd Season",
                ruTitle: "Обещанный Неверленд 2",
                review: "Начало чуть-чуть хорошое, но потом всё скатилось в полную жесть. Еле досмотрел до конца."
            },
        ]
    },
    '2022': {
        'S': [
            {
                title: "Fumetsu no Anata e Season 2",
                ruTitle: "Для тебя, Бессмертный 2",
                review: "Держит уровень первого сезона. Интересная развилка с хранителями."
            },
            {
                title: "Dungeon ni Deai wo Motomeru no wa Machigatteiru no Darou ka IV",
                ruTitle: "Может, я встречу тебя в подземелье? IV",
                review: "Очень милый и крутой сезон. Буду читать ранобэ."
            },
            {
                title: "Cyberpunk: Edgerunners",
                ruTitle: "Киберпанк: Бегущие по краю",
                review: "So, get away. Another way to feel what you didn't want yourself to know. And let yourself go."
            },
        ],
        'A': [
            {
                title: "One Piece",
                ruTitle: "Ван Пис",
                review: "Судьба. Судьба. Мечты. Эти непреодолимые идеи хранятся глубоко в сердце человека. Пока есть люди, которые ищут свободы в этой жизни, эти вещи не исчезнут с лица земли."
            },
            
        ],
        'B': [
            {
                title: "Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 2",
                ruTitle: "Добро пожаловать в класс превосходства 2",
                review: "Держит уровень первого сезона."
            },
            {
                title: "Vanitas no Carte 2nd Cour",
                ruTitle: "Мемуары Ванитаса 2",
                review: "Держит уровень первого сезона."
            },
            {
                title: "Sabikui Bisco",
                ruTitle: "Биско-ржавоед",
                review: "Хорошое аниме с интересной идеей. Как я понял оно закончилось."
            },
            {
                title: "Overlord IV",
                ruTitle: "Повелитель IV",
                review: "Держит уровень первых трёх сезонов."
            },
        ],
        'C': [
            {
                title: "Vanitas no Carte 2nd Cour",
                ruTitle: "Мемуары Ванитаса 2",
                review: "Держит уровень первого сезона."
            },
        ],
        'D': [
            {
                title: "Sword Art Online: Progressive Movie - Kuraki Yuuyami no Scherzo",
                ruTitle: "Мастера Меча Онлайн: Прогрессив — Скерцо глубокой ночи",
                review: "Прикольно, но есть и получше сезоны про САО."
            },
        ],
        'E': [
            {
                title: "Bleach",
                ruTitle: "Блич",
                review: "Все серии с дубляжом + - норм, но какое же это овер хайповое и нелогичное аниме. Но досмотрел до конца."
            },
        ],
        'F': []
    },
    '2023': {
        'S': [
            {
                title: "Vinland Saga 2",
                ruTitle: "Сага о Винланде 2",
                review: "Держит уровень первого сезона. Продолжаю читать мангу."
            },
            {
                title: "Dungeon ni Deai wo Motomeru no wa Machigatteiru no Darou ka IV. Part 2",
                ruTitle: "Может, я встречу тебя в подземелье? IV. Часть 2",
                review: "Очень милый и крутой сезон. Буду читать ранобэ."
            },
        ],
        'A': [
            {
                title: "One Piece",
                ruTitle: "Ван Пис",
                review: "Судьба. Судьба. Мечты. Эти непреодолимые идеи хранятся глубоко в сердце человека. Пока есть люди, которые ищут свободы в этой жизни, эти вещи не исчезнут с лица земли."
            },
            {
                title: "Berserk",
                ruTitle: "Берсерк",
                review: "Что вершит судьбу человечества в этом мире? Некое незримое существо или закон, подобно Длани Господней парящей над миром? По крайне мере истинно то, что человек не властен даже над своей волей."
            },
        ],
        'B': [
            {
                title: "JUJUTSU KAISEN Season 2",
                ruTitle: "Магическая битва 2",
                review: "Держит уровень первого сезона."
            },
            {
                title: "Sousou no Frieren",
                ruTitle: "Провожающая в последний путь Фрирен",
                review: "Максимально чилловое, но в то же время грустное аниме."
            },
            {
                title: "Kimi wa Houkago Insomnia",
                ruTitle: "Бессонница после школы",
                review: "Дефолтная повседневка, но почему-то зацепила. В моменте даже хотел начать разгядывать звёзды."
            },
            {
                title: "Kimetsu no Yaiba: Katanakaji no Sato-hen",
                ruTitle: "Клинок, Рассекающий Демонов: Деревня Кузнецов",
                review: "Держит планку."
            },
        ],
        'C': [
            {
                title: "GOBLIN SLAYER II",
                ruTitle: "Убийца Гоблинов 2",
                review: "Держит уровень первого сезона."
            },
            {
                title: "Undead Girl Murder Farce",
                ruTitle: "Фарс из убийства девушки-нежити",
                review: "Не особо нравятся детективы, но это аниме неплохое."
            },
            {
                title: "Mononogatari",
                ruTitle: "История о мононокэ",
                review: "Прикольное, но под конец немного скучно."
            },
            {
                title: "Mononogatari 2nd Season",
                ruTitle: "История о мононокэ 2",
                review: "Прикольное, но под конец немного скучно."
            },
            {
                title: "Kaminaki Sekai no Kamisama Katsudou",
                ruTitle: "Деятельность Бога в мире без богов",
                review: "Прикольное, забавное, местами странное аниме."
            },
            {
                title: "Tengoku Daimakyou",
                ruTitle: "Великая небесная стена",
                review: "Прикольное, неординарное аниме. пытался прочитаь мангу, но не осилил."
            },
            {
                title: "Seishun Buta Yarou wa Randoseru Girl no Yume wo Minai",
                ruTitle: "Этот глупый свин не понимает мечту девочки с рюкзаком",
                review: "С каждым сезон, фильмом всё скучнее и скучнее. Динамики больше не становится."
            },
        ],
        'D': [
            {
                title: "Boku no Kokoro no Yabai Yatsu: Twi-Yaba",
                ruTitle: "Опасность в моём сердце: Дополнительное время",
                review: "Даже не помню о чём это."
            },
        ],
        'E': [],
        'F': []
    },
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