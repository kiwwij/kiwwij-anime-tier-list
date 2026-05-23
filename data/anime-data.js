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
        { rank: 'Отличные', color: 'bg-orange-500' },
        { rank: 'Очень хорошо', color: 'bg-yellow-400' },
        { rank: 'Неплохо', color: 'bg-green-500' },
        { rank: 'Никак', color: 'bg-blue-500' },
        { rank: 'Плохо', color: 'bg-purple-500' },
        { rank: 'Ужасно', color: 'bg-gray-600' }
    ]
};

const tierListData = {
    '2010': {
        'S': [],
        'A': [
            {
                title: "Naruto 2002",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
            {
                title: "Pocket Monsters",
                ruTitle: "Покемоны",
                review: "Почти ничего не моню про это аниме, но оно мне нравилось."
            },
            {
                title: "Death Note",
                ruTitle: "Тетрадь смерти",
                review: "База"
            },
            {
                title: "Castle in the Sky",
                ruTitle: "Небесный замок Лапута",
                review: "Все фильмы Миядзаки это база. Пересматривал их кучу раз."
            },
            {
                title: "My Neighbor Totoro",
                ruTitle: "Мой сосед Тоторо",
                review: "Все фильмы Миядзаки это база. Пересматривал их кучу раз."
            },
            {
                title: "Kiki's Delivery Service",
                ruTitle: "Ведьмина служба доставки",
                review: "Все фильмы Миядзаки это база. Пересматривал их кучу раз."
            },
            {
                title: "SPIRITED AWAY",
                ruTitle: "Унесённые призраками",
                review: "Все фильмы Миядзаки это база. Пересматривал их кучу раз."
            },
            {
                title: "Howl's Moving Castle",
                ruTitle: "Ходячий замок",
                review: "Все фильмы Миядзаки это база. Пересматривал их кучу раз."
            },
            {
                title: "The Wind Rises",
                ruTitle: "Ветер крепчает",
                review: "Все фильмы Миядзаки это база. Пересматривал их кучу раз."
            },
            {
                title: "Shaman King",
                ruTitle: "Шаман Кинг",
                review: ""
            },
        ],
        'B': [],
        'C': [
            {
                title: "Kiss x Sis (TV)",
                ruTitle: "Поцелуй сестёр",
                review: ""
            },
            {
                title: "Pucca",
                ruTitle: "Пукка",
                review: "Батя в детстве включал, было смешно. Только почему-то они разговаривали на японском..."
            },
            {
                title: "Inazuma Eleven",
                ruTitle: "Инадзума 11",
                review: "Смотрел по телеку, было прикольно."
            },
        ],
        'D': [],
        'E': [],
        'F': []
    },
    '2011': {
        'S': [],
        'A': [
            {
                title: "Naruto 2002",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
            {
                title: "Pocket Monsters",
                ruTitle: "Покемоны",
                review: "Почти ничего не моню про это аниме, но оно мне нравилось."
            },
        ],
        'B': [],
        'C': [
            {
                title: "Toradora!: Bentou no Gokui",
                ruTitle: "Торадора! Секрет приготовления бэнто",
                review: ""
            },
            {
                title: "Deadman Wonderland",
                ruTitle: "Страна чудес смертников",
                review: ""
            },
            {
                title: "Manyuu Hikenchou",
                ruTitle: "Клинок Маню",
                review: ""
            },
        ],
        'D': [],
        'E': [],
        'F': []
    },
    '2012': {
        'S': [],
        'A': [
            {
                title: "Sword Art Online",
                ruTitle: "Мастера меча онлайн",
                review: "Запомните все! Это НЕ исека!"
            },
            {
                title: "Naruto 2002",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
            {
                title: "Fullmetal Alchemist",
                ruTitle: "Стальной алхимик",
                review: "Это будет равноценный обмен! Я дам тебе половину своей жизни, а ты мне — половинку своей. — Ну уж эти алхимики и их словечки. Равноценный обмен?"
            },
        ],
        'B': [
            {
                title: "Kuroko no Basket",
                ruTitle: "Баскетбол Куроко",
                review: ""
            },
        ],
        'C': [],
        'D': [],
        'E': [],
        'F': []
    },
    '2013': {
        'S': [],
        'A': [
            {
                title: "Naruto 2002",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
            {
                title: "Attack on Titan",
                ruTitle: "Атака Титанов",
                review: "Мой батя порекомендовал это аниме, смотрели вместе."
            },
        ],
        'B': [
            {
                title: "Kuroko no Basket 2nd Season",
                ruTitle: "Баскетбол Куроко 2",
                review: ""
            },
        ],
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
                title: "Steins Gate",
                ruTitle: "Врата Штейна: Зона загрузки дежавю",
                review: ""
            },
            {
                title: "Black Butler",
                ruTitle: "Тёмный дворецкий",
                review: "Неплохо"
            },
            {
                title: "Kotonoha no Niwa",
                ruTitle: "Сад изящных слов",
                review: ""
            },
            {
                title: "Golden Time",
                ruTitle: "Золотая пора",
                review: ""
            },
            {
                title: "Date A Live",
                ruTitle: "Рандеву с Жизнью",
                review: ""
            },
        ],
        'D': [
            {
                title: "Senran Kagura",
                ruTitle: "Секретное назначение девушек-ниндзя",
                review: ""
            },
        ],
        'E': [],
        'F': []
    },
    '2014': {
        'S': [],
        'A': [
            {
                title: "Naruto 2002",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
            {
                title: "Tokyo Ghoul",
                ruTitle: "Токийский гуль",
                review: "На этом аниме строится моя личность"
            },
            {
                title: "Akame ga Kill!",
                ruTitle: "Убийца Акамэ!",
                review: "Крутое аниме, концовка зашибись!"
            },
            {
                title: "Sword Art Online",
                ruTitle: "Мастера меча онлайн",
                review: "Одна из лучший романтик, это раз. Два, это не исэкай!"
            },
            {
                title: "Sword Art Online II",
                ruTitle: "Мастера Меча Онлайн 2",
                review: ""
            },
        ],
        'B': [
            {
                title: "Sword Art Online II",
                ruTitle: "Мастера Меча Онлайн 2",
                review: "Чутка слабее, чем 1-ый сезон. Но в целом неплохо."
            },
            {
                title: "No Game No Life",
                ruTitle: "Нет игры - нет жизни",
                review: ""
            },
        ],
        'C': [
            {
                title: "Noragami",
                ruTitle: "Бездомный бог",
                review: "Неплохо"
            },
            {
                title: "Date A Live II",
                ruTitle: "Рандеву с Жизнью 2",
                review: ""
            },
            {
                title: "Kiseijuu: Sei no Kakuritsu",
                ruTitle: "Паразит: Учение о жизни",
                review: ""
            },
            {
                title: "Nanatsu no Taizai",
                ruTitle: "Семь смертных грехов",
                review: ""
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
            },
            {
                title: "Charlotte",
                ruTitle: "Шарлотта",
                review: "Очень грустное аниме. Частичку в совю личность я забрал."
            },
        ],
        'A': [
            {
                title: "Naruto 2002",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
            {
                title: "Tokyo Ghoul √A",
                ruTitle: "Токийский гуль √A (2)",
                review: "На этом аниме строится моя личность"
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
                title: "Shinmai Maou no Testament",
                ruTitle: "По велению адской сестры",
                review: "Без комментариев."
            },
            {
                title: "One Punch Man",
                ruTitle: "Ванпанчмен",
                review: "Один Удар Мужчина"
            },
            {
                title: "One Punch Man: Road to Hero",
                ruTitle: "Ванпанчмен: Путь к становлению героем",
                review: "Один Удар Мужчина"
            },
            {
                title: "One Punch Man Specials",
                ruTitle: "Ванпанчмен: Спецвыпуски",
                review: "Один Удар Мужчина"
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
            {
                title: "Kuroko no Basket 3nd Season",
                ruTitle: "Баскетбол Куроко 3",
                review: ""
            },
            {
                title: "Ansatsu Kyoushitsu",
                ruTitle: "Класс убийц",
                review: ""
            },
            {
                title: "Amagi Brilliant Park",
                ruTitle: "Великолепный парк Амаги",
                review: ""
            },
            {
                title: "Maken-Ki!",
                ruTitle: "Не проиграю!",
                review: ""
            },
            {
                title: "Maken-Ki! Two",
                ruTitle: "Не проиграю! 2",
                review: ""
            },
            {
                title: "Grisaia no Meikyuu: Caprice no Mayu 0",
                ruTitle: "Лабиринт Грисайи",
                review: ""
            },
            {
                title: "Shinmai Maou no Testament Burst",
                ruTitle: "По велению адской сестры: Взрыв",
                review: "Без комментариев."
            },
            {
                title: "Higurashi no Naku Koro Ni",
                ruTitle: "Когда плачут цикады [TB-1]",
                review: ""
            },
            {
                title: "Higurashi no Naku Koro ni Kai",
                ruTitle: "Когда плачут цикады [ТВ-2]",
                review: ""
            },
            {
                title: "Gakusen Toshi Asterisk",
                ruTitle: "Боевая академия города Астериск",
                review: ""
            },
            {
                title: "OreGairu 2",
                ruTitle: "Как и ожидалось, моя школьная романтическая жизнь не удалась. Дважды",
                review: "Вот вы заметили насколько длинное название на русском? Почему так? Нельзя было упростить?"
            },
            {
                title: "Boogiepop wa Warawanai",
                ruTitle: "Бугипоп никогда не смеётся",
                review: "Прикольная, мрачная анимешка."
            },
            {
                title: "Aishen Qiaokeli-ing...",
                ruTitle: "Шоколад Купидона",
                review: ""
            },
            {
                title: "Bounen no Xamdou",
                ruTitle: "КсамД: Позабывший невзгоды",
                review: ""
            },
        ],
        'D': [
            {
                title: "Higurashi no Naku Koro ni Rei",
                ruTitle: "Когда плачут цикады OVA-1",
                review: ""
            },
            {
                title: "Himouto! Umaru-chan",
                ruTitle: "Двуличная сестренка Умару",
                review: ""
            },
            {
                title: "Kagaku na Yatsura",
                ruTitle: "Всё ради науки",
                review: "Без комментариев."
            },
            {
                title: "Cyclops Girl Cypu",
                ruTitle: "Девушка-циклоп Сайпу",
                review: ""
            },
        ],
        'E': [],
        'F': []
    },
    '2016': {
        'S': [
            {
                title: "Re: Zero kara Hajimeru Isekai Seikatsu",
                ruTitle: "Re: Жизнь в другом мире с нуля",
                review: "С этого всё началось. Я был шакированн идеей возвращения в точку сохранения после смерти. Очень понравилось аниме."
            },
            {
                title: "Koe no Katachi",
                ruTitle: "Форма голоса",
                review: "Крутое и немного грустное аниме. Думаю, многие смотрели."
            },
        ],
        'A': [
            {
                title: "One Piece",
                ruTitle: "Ван Пис",
                review: "Посмотрел + - 100 серий, но потом почему-то дропнул."
            },
            {
                title: "Naruto 2002",
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
                review: ""
            },
        ],
        'B': [
            {
                title: "Boku dake ga Inai Machi",
                ruTitle: "Город, в котором меня нет",
                review: "Возможно лучший детектив."
            },
            {
                title: "Ansatsu Kyoushitsu 2nd Season",
                ruTitle: "Класс убийц 2",
                review: "Финал был хорошим"
            },
            {
                title: "Mirai Nikki",
                ruTitle: "Дневник будущего",
                review: ""
            },
            {
                title: "High School DxD",
                ruTitle: "Демоны старшей школы",
                review: "Без комментариев."
            },
            {
                title: "High School DxD New",
                ruTitle: "Демоны старшей школы ТВ-2",
                review: "Без комментариев."
            },
            {
                title: "High School DxD BorN",
                ruTitle: "Демоны старшей школы 3",
                review: "Без комментариев."
            },
            {
                title: "Kill la Kill",
                ruTitle: "Kill la Kill",
                review: ""
            },
        ],
        'C': [
            {
                title: "Monster Musume no Iru Nichijou OVA",
                ruTitle: "Повседневная жизнь с девушкой-монстром OVA",
                review: "Без комментариев."
            },
            {
                title: "Kono Subarashii Sekai ni Shukufuku wo!",
                ruTitle: "Этот замечательный мир!",
                review: "Посмотрел после видоса Коносуба за 15мин"
            },
            {
                title: "Boku no Hero Academia",
                ruTitle: "Моя геройская академия",
                review: "Кринжовенько"
            },
            {
                title: "Saijaku Muhai no Bahamut",
                ruTitle: "Хроники непобежденного Бахамута",
                review: ""
            },
            {
                title: "Musaigen no Phantom World",
                ruTitle: "Мириады Цветов Фантомного Мира",
                review: ""
            },
            {
                title: "Dagashi Kashi",
                ruTitle: "Магазинчик сладостей",
                review: ""
            },
            {
                title: "Elfen Lied",
                ruTitle: "Эльфийская песнь",
                review: "Батя познакомил, мне было 10 лет. Как вы уже понили, мне батя привил вкус ещё с раннего возраста."
            },
            {
                title: "Zero no Tsukaima",
                ruTitle: "Подручный Луизы-Нулизы",
                review: ""
            },
            {
                title: "Kiznaiver",
                ruTitle: "Кизнайвер",
                review: "Крутое, грустенькое аниме."
            },
            {
                title: "Shimoneta to Iu Gainen ga Sonzai Shinai Taikutsu na Sekai",
                ruTitle: "Скучный мир, в котором не существует самой концепции похабных шуток",
                review: ""
            },
        ],
        'D': [
            {
                title: "Boku wa Tomodachi ga Sukunai",
                ruTitle: "У меня мало друзей [ТВ-1]",
                review: "Кринжовенько"
            },
            {
                title: "Netoge no Yome wa Onnanoko ja Nai to Omotta?",
                ruTitle: "А ты думал, что твоя жена в онлайн-игре на самом деле не девушка?",
                review: "Кринжовенько"
            },
            {
                title: "Oshiete! Galko-chan",
                ruTitle: "Ответь мне, Галко-чан!",
                review: "Кринжовенько"
            },
            {
                title: "Mob Psycho 100",
                ruTitle: "Моб Психо 100",
                review: "Не зашло"
            },
            {
                title: "OreGairu 2 OVA",
                ruTitle: "Как и ожидалось, моя школьная романтическая жизнь не удалась. Дважды OVA",
                review: ""
            },
            {
                title: "Yosuga no Sora: In Solitude, Where We Are Least Alone.",
                ruTitle: "Одиночество на двоих",
                review: "Без комментариев."
            },
            {
                title: "Oniichan dakedo Ai sae Areba Kankeinai yo ne! ",
                ruTitle: "Пока есть любовь, не имеет значения, что он мой брат",
                review: "Без комментариев."
            },
            {
                title: "Lost Property of the Sky",
                ruTitle: "Утраченное небесами",
                review: "Без комментариев."
            },
            {
                title: "Hybrid x Heart Magias Academy Ataraxia",
                ruTitle: "Магическая академия Атараксия: Гибрид x Сердце",
                review: ""
            },
        ],
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
        ],
        'A': [
            {
                title: "Naruto 2002",
                ruTitle: "Наруто",
                review: "Сколько же раз я пересматривал его?"
            },
            {
                title: "Naruto: Shippuuden",
                ruTitle: "Наруто: Ураганные хроники",
                review: "Все же знают, что фамили Наруто - Шипуден?"
            },
            {
                title: "Attack on Titan Season 2",
                ruTitle: "Атака Титанов 2",
                review: "За стеной... море. По ту сторону моря... свобода... Я всегда в это верил."
            },
        ],
        'B': [
            {
                title: "Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?",
                ruTitle: "Если ты будешь не занят, спасёшь меня от апокалипсиса?",
                review: "О да, это было хорошо, это было грустно."
            },
            {
                title: "No Game No Life: Zero",
                ruTitle: "Нет игры - нет жизни Фильм",
                review: ""
            },
            {
                title: "OreGairu",
                ruTitle: "Как и ожидалось, моя школьная романтическая жизнь не удалась",
                review: ""
            },
        ],
        'C': [
            {
                title: "Kono Subarashii Sekai ni Shukufuku wo! 2",
                ruTitle: "Этот замечательный мир! 2",
                review: ""
            },
            {
                title: "Boku no Hero Academia 2",
                ruTitle: "Моя геройская академия 2",
                review: "Кринжовенько"
            },
            {
                title: "Busou Shoujo Machiavellianism",
                ruTitle: "Тирания вооружённых девушек",
                review: "Посмотрел чисто из-за этого: https://www.youtube.com/watch?v=Zs5W8kJvTQE"
            },
            {
                title: "Masamune-kun no Revenge",
                ruTitle: "Месть Масамунэ!",
                review: ""
            },
            {
                title: "Kobayashi-san Chi no Maid Dragon",
                ruTitle: "Кобаяши и её горничная-дракон",
                review: ""
            },
            {
                title: "Hajimete no Gal",
                ruTitle: "Моя первая гяру",
                review: "Без комментариев."
            },
            {
                title: "Made in Abyss",
                ruTitle: "Созданный в Бездне",
                review: "Скучно"
            },
            {
                title: "Fate/Apocrypha",
                ruTitle: "Судьба/Апокриф",
                review: "Это был мой 1-ый Фейт. Неплохо."
            },
        ],
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
            {
                title: "Neon Genesis Evangelion",
                ruTitle: "Евангелион",
                review: "На этом аниме строится моя личность"
            },
            {
                title: "Made in Abyss",
                ruTitle: "Созданный в Бездне",
                review: "Скучно"
            },
            {
                title: "Blend S",
                ruTitle: "Садистская Смесь",
                review: "Скучно + кринж"
            },
            {
                title: "Ao no Exorcist: Kyoto Fujouou-hen",
                ruTitle: "Синий экзорцист: Нечестивый король Киото",
                review: "Скучно"
            },
            {
                title: "Aishen Qiaokeli-ing... 2nd Season",
                ruTitle: "Шоколад Купидона 2",
                review: ""
            },
            {
                title: "Eromanga-sensei",
                ruTitle: "Эроманга-сенсей",
                review: "Скучно."
            },
        ],
        'E': [
            {
                title: "Kuroko no Basket: Last Game",
                ruTitle: "Баскетбол Куроко: Последняя игра",
                review: "Гамно"
            },
        ],
        'F': [
            {
                title: "Black Clover",
                ruTitle: "Чёрный клевер",
                review: "Я 2 раза пытался посмотеть, но это слишком кал."
            },
            {
                title: "Boruto: Naruto Next Generations",
                ruTitle: "Боруто",
                review: "Представим, что этого не существует."
            },
        ]
    },
    '2018': {
        'S': [
            {
                title: "Sword Art Online: Alicization",
                ruTitle: "Мастера Меча Онлайн: Алисизация",
                review: "Лучшее из САО, ну может после 1-го сезона, на мой взгляд. Очень понравилось аниме."
            },
        ],
        'A': [
            {
                title: "Tensei shitara Slime Datta Ken",
                ruTitle: "О моём перерождении в слизь",
                review: "Ну база, что ещё добавить?"
            },
            {
                title: "Fullmetal Alchemist",
                ruTitle: "Стальной алхимик",
                review: "Это будет равноценный обмен! Я дам тебе половину своей жизни, а ты мне — половинку своей. — Ну уж эти алхимики и их словечки. Равноценный обмен?"
            },
            {
                title: "Attack on Titan Season 3",
                ruTitle: "Атака Титанов 3.1",
                review: "Море. А за морем-свобода. Всё время я верил в это... но всё же ошибся. За морем ждут враги. Все именно так, как в воспоминаниях отца. Они там, за горизонтом.  Если мы их всех убьём, то...  Сможем стать свободными ?"
            },
        ],
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
            {
                title: "Kishuku Gakkou no Juliet",
                ruTitle: "Джульетта Из Школы-Интерната",
                review: "Хз почему, но мне понравилось."
            },
            {
                title: "High School DxD Hero",
                ruTitle: "Демоны старшей школы 4: Герой",
                review: "Без комментариев."
            },
        ],
        'C': [
            {
                title: "Tokyo Ghoul:re",
                ruTitle: "Токийский Гуль",
                review: "Хуже, чем 1-ый 2 сезона, но неплохо"
            },
            {
                title: "Nanatsu no Taizai: Imashime no Fukkatsu",
                ruTitle: "Семь смертных грехов: Возрождение заповедей",
                review: "Посмотрел 4 сезона и дропнул"
            },
            {
                title: "Sayonara no Asa ni Yakusoku no Hana wo Kazarou",
                ruTitle: "Укрась прощальное утро цветами обещания",
                review: "Прикольное, но максимально нелогичное аниме. Смотрел с другом."
            },
            {
                title: "Boku no Hero Academia 3",
                ruTitle: "Моя геройская академия 3",
                review: "Уже лучше"
            },
            {
                title: "Boku no Hero Academia the Movie: Futari no Hero",
                ruTitle: "Моя геройская академия: два героя",
                review: "Неплохо"
            },
            {
                title: "Hyouka",
                ruTitle: "Хёка",
                review: "Неплохо"
            },
            {
                title: "JoJo no Kimyou na Bouken [TV-1]",
                ruTitle: "Невероятные приключения ДжоДжо",
                review: "Первые 9 серий и всё, больше ничего в этом аниме крутого нет."
            },
            {
                title: "Chuunibyou demo Koi ga Shitai!",
                ruTitle: "Чудачества любви не помеха! [ТВ-1]",
                review: ""
            },
            {
                title: "Chuunibyou demo Koi ga Shitai! Ren",
                ruTitle: "Чудачества любви не помеха! 2",
                review: ""
            },
            {
                title: "Isekai Maou to Shoukan Shoujo no Dorei Majutsu",
                ruTitle: "Повелитель тьмы: Другая история мира — Магия подчинения",
                review: ""
            },
            {
                title: "Chuunibyou demo Koi ga Shitai! Movie: Take On Me",
                ruTitle: "Чудачества любви не помеха!: Положись на меня",
                review: ""
            },
            {
                title: "Happy Sugar Life",
                ruTitle: "Сладкая жизнь",
                review: ""
            },
        ],
        'D': [
            {
                title: "Hyakuren no Haou to Seiyaku no Valkyria",
                ruTitle: "Повелитель Рагнарёка и покровитель эйнхерий",
                review: ""
            },
            {
                title: "Nanatsu no Bitoku",
                ruTitle: "Семь небесных добродетелей",
                review: "Без комментариев."
            },
        ],
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
            {
                title: "Tate no Yuusha no Nariagari",
                ruTitle: "Восхождение героя щита",
                review: "Первый сезон покорил меня!"
            },
        ],
        'A': [
            {
                title: "Code Geass: Fukkatsu no Lelouch",
                ruTitle: "Код Гиасс: Воскрешение Лелуша",
                review: "Как альтернативная концовка/продолжение оригинального сериала - очень хорошо."
            },
            {
                title: "Attack on Titan Season 3 Part 2",
                ruTitle: "Атака Титанов 3.2",
                review: "Именно из-за этого аниме у появилась одна несбыточная мечта."
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
            {
                title: "Boku no Hero Academia 4",
                ruTitle: "Моя геройская академия 4",
                review: ""
            },
            {
                title: "Enen no Shouboutai",
                ruTitle: "Пламенная бригада пожарных",
                review: "Немного кринжа"
            },
            {
                title: "Dr. Stone",
                ruTitle: "Доктор Стоун",
                review: "K=FC^2"
            },
            {
                title: "One Punch Man 2nd Season",
                ruTitle: "Ванпанчмен 2",
                review: "Один Удар Мужчина"
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
            {
                title: "Date A Live III",
                ruTitle: "Рандеву с Жизнью 3",
                review: ""
            },
            {
                title: "Nande Koko ni Sensei ga!?",
                ruTitle: "Зачем вы здесь, учитель?!",
                review: ""
            },
            {
                title: "Ore wo Suki nano wa Omae dake ka yo",
                ruTitle: "ORESUKI. Да как меня можешь любить только ты?",
                review: ""
            },
            {
                title: "Zankyou no Terror",
                ruTitle: "Эхо террора",
                review: ""
            },
            {
                title: "Sewayaki Kitsune no Senko-san",
                ruTitle: "Непоседливая лисица Сэнко",
                review: ""
            },
            {
                title: "Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen",
                ruTitle: "Кагуя хочет, чтобы ей признались: Война любви и разума гениев",
                review: "Ходил, подевел под опенинг 'love is war'"
            },
            {
                title: "Hensuki: Are you willing to Fall in Love with a Pervert, as long as she's a Cutie?",
                ruTitle: "Готов ли ты влюбиться в извращенку до тех пор, пока она милая?",
                review: "Без комментариев."
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
            {
                title: "Bokutachi wa Benkyou ga Dekinai",
                ruTitle: "Мы не можем учиться!",
                review: ""
            },
            {
                title: "Bokutachi wa Benkyou ga Dekinai 2",
                ruTitle: "Мы не можем учиться! 2",
                review: ""
            },
            {
                title: "Midara na Ao-chan wa Benkyou ga Dekinai",
                ruTitle: "Похотливая Ао не может учиться",
                review: ""
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
            {
                title: "Josee to Tora to Sakana-tachi",
                ruTitle: "Её заветное желание",
                review: "Ктобы знал, что иметь девушку инвалида... ну, не в том плане... короче... вы поняли."
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
            {
                title: "Attack on Titan: The Final Season",
                ruTitle: "Атака Титанов Финал",
                review: "После этого сезона аниме началось скатываться."
            },
            {
                title: "Enen no Shouboutai: Ni no Shou",
                ruTitle: "Пламенная бригада пожарных 2",
                review: "Немного кринжа"
            },
        ],
        'C': [
            {
                title: "Kami no Tou: Tower of God",
                ruTitle: "Башня Бога",
                review: "Несклько раз начинал смотреть, но потом выкупил прикол и понравилось. Пошёл читать манхву."
            },
            {
                title: "Princess Connect! Re:Dive",
                ruTitle: "Связь принцесс: Повторное погружение",
                review: ""
            },
            {
                title: "Uzaki-chan wa Asobitai!",
                ruTitle: "Узаки хочет тусоваться!",
                review: ""
            },
            {
                title: "Kanojo, Okarishimasu",
                ruTitle: "Девушка на час",
                review: "КРИНЖ"
            },
            {
                title: "Kyokou Suiri",
                ruTitle: "Ложные выводы",
                review: "Прикольный детективчик"
            },
            {
                title: "Higurashi no Naku Koro ni (2020)",
                ruTitle: "Когда плачут цикады (2020)",
                review: ""
            },
            {
                title: "OreGairu 3",
                ruTitle: "Как и ожидалось, моя школьная романтическая жизнь не удалась. Трижды",
                review: ""
            },
            {
                title: "Jibaku Shounen Hanako-kun",
                ruTitle: "Туалетный мальчик Ханако",
                review: ""
            },
            {
                title: "Kaguya-sama wa Kokurasetai? Tensai-tachi no Renai Zunousen 2nd Season",
                ruTitle: "Кагуя хочет, чтобы ей признались: война любви и разума гениев 2",
                review: "'DADDY! DADDY! DO!' или 'Академия Сютин - нет для разумий причин... Президент Кагуя-сан, Исигами-кун, секретарща Чика'"
            },
            {
                title: "Ishuzoku Reviewers",
                ruTitle: "Межвидовые рецензенты",
                review: "Без комментариев."
            },
            {
                title: "Munou na Nana",
                ruTitle: "Бездарная Нана",
                review: ""
            },
            {
                title: "Maou Gakuin no Futekigousha",
                ruTitle: "Непризнанный школой владыка демонов!",
                review: ""
            },
        ],
        'D': [
            {
                title: "Itai no wa Iya nano de Bougyoryoku ni Kyokufuri Shitai to Omoimasu",
                ruTitle: "Не люблю боль, поэтому собираюсь вкачать всё в защиту",
                review: "С этого аниме у меня была 1ая аватарка, которую я не менял 2-3 года. А ещё я играл в Скайрим, прокачивая только ХП."
            },
        ],
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
            {
                title: "Mushoku Tensei: Isekai Ittara Honki Dasu",
                ruTitle: "Реинкарнация безработного: История о приключениях в другом мире.",
                review: "Один из лучших исекаев евер!"
            },
            {
                title: "Mushoku Tensei: Isekai Ittara Honki Dasu Part 2",
                ruTitle: "Реинкарнация безработного: История о приключениях в другом мире.",
                review: "Один из лучших исекаев евер!"
            },
            {
                title: "Arcane: League of Legends",
                ruTitle: "Аркейн: Лига Легенд",
                review: "Считается ли это аниме? Ну пускай тут будет."
            },
        ],
        'A': [
            {
                title: "Tensei shitara Slime Datta Ken 2",
                ruTitle: "О моём перерождении в слизь 2.1",
                review: "Ну база, что ещё добавить?"
            },
            {
                title: "Tensei shitara Slime Datta Ken 2nd Season Part 2",
                ruTitle: "О моём перерождении в слизь 2.2",
                review: "Ну база, что ещё добавить?"
            },
        ],
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
            {
                title: "Boku no Hero Academia 5",
                ruTitle: "Моя геройская академия 5",
                review: ""
            },
            {
                title: "Takt Op. Destiny",
                ruTitle: "Такт Опус. Судьба",
                review: ""
            },
            {
                title: "Horimiya",
                ruTitle: "Хоримия",
                review: ""
            },
            {
                title: "Tsuki to Laika to Nosferatu",
                ruTitle: "Луна, Лайка и Носферату",
                review: ""
            },
            {
                title: "DOTA: Dragon's Blood",
                ruTitle: "Dota: Кровь Дракона",
                review: "Сосать ЛОЛ!"
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
            {
                title: "Saihate no Paladin",
                ruTitle: "Далёкий паладин",
                review: "Неплохо"
            },
            {
                title: "Shinigami Bocchan to Kuro Maid",
                ruTitle: "Смертоносный герцог и его чёрная горничная",
                review: "Неплохо"
            },
            {
                title: "Seirei Gensouki",
                ruTitle: "Мифический Дух: Хроники",
                review: ""
            },
            {
                title: "Isekai Maou to Shoukan Shoujo no Dorei Majutsu Omega Ω",
                ruTitle: "Повелитель тьмы: Другая история мира — Магия подчинения ОМЕГА",
                review: ""
            },
            {
                title: "Kemono Jihen",
                ruTitle: "Инцидент Кэмоно",
                review: ""
            },
            {
                title: "Mieruko-chan",
                ruTitle: "Девочка, которая видит это",
                review: ""
            },
            {
                title: "Kobayashi-san Chi no Maid Dragon S",
                ruTitle: "Кобаяши и её горничная-дракон S",
                review: ""
            },
            {
                title: "Higurashi no Naku Koro ni — Sotsu",
                ruTitle: "Когда плачут цикады: Выпускной",
                review: ""
            },
            {
                title: "Tantei wa Mou, Shindeiru",
                ruTitle: "Детектив уже мёртв",
                review: "Глуповато"
            },
            {
                title: "Bokutachi no Remake",
                ruTitle: "Ремейк нашей жизни",
                review: ""
            },
            {
                title: "Komi-san wa, Comyushou desu",
                ruTitle: "У Коми проблемы с общением",
                review: ""
            },
            {
                title: "Tokyo Revengers",
                ruTitle: "Токийские мстители",
                review: ""
            },
            {
                title: "Edens Zero",
                ruTitle: "Нулевой Эдем",
                review: "Хвост Феи в космосе."
            },
            {
                title: "Kyuukyoku Shinka Shita Full Dive RPG ga Genjitsu Yori mo Kusoge Dattara",
                ruTitle: "Игра, более реальная, чем сама реальность",
                review: ""
            },
            {
                title: "Meikyuu Black Company",
                ruTitle: "Тяжкий труд в подземелье",
                review: ""
            },
            {
                title: "Senpai ga Uzai Kouhai no Hanashi",
                ruTitle: "Мой сэмпай раздражает!",
                review: ""
            },
        ],
        'D': [
            {
                title: "Jaku-Chara Tomozaki-kun Specials",
                ruTitle: "Низкоуровневый Томозаки OVA",
                review: "Я даже не помню о чём это."
            },
            {
                title: "Shadows House",
                ruTitle: "Дом теней",
                review: ""
            },
            {
                title: "Hige wo Soru. Soshite Joshikousei wo Hirou",
                ruTitle: "Я побрился. Затем привёл домой старшеклассницу",
                review: ""
            },
            {
                title: "Peach Boy Riverside",
                ruTitle: "Персиковый мальчик, пришедший с другого побережья (Оригинальный таймлайн)",
                review: ""
            },
            {
                title: "Shin no Nakama",
                ruTitle: "Меня выгнали из отряда героя, поэтому я решил спокойно жить в глуши",
                review: ""
            },
            {
                title: "Kaguya-sama wa Kokurasetai? Tensai-tachi no Renai Zunousen 2nd Season OVA",
                ruTitle: "Кагуя хочет, чтобы ей признались: война любви и разума гениев 2 OVA",
                review: ""
            },
            {
                title: "Platinum End",
                ruTitle: "Платиновый предел",
                review: "Скучно."
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
            {
                title: "Natsu e no Tunnel, Sayonara no Deguchi",
                ruTitle: "Тоннель в лето, выход прощаний",
                review: "Пошёл читать ранобэ. По вайбам чуть-чуть похоже на '3 дня счастья'. Из-за этого я не понимаю почему нет оф укр перевода!"
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
            {
                title: "Attack on Titan: The Final Season Part 2",
                ruTitle: "Атака Титанов Финал 2",
                review: "Не могу поставить в другой рейтинг, т.к. следил за этим аниме почти 10 лет, но эта часть не достойна быть выше."
            },
            {
                title: "DOTA: Dragon's Blood Book II",
                ruTitle: "Dota: Кровь Дракона 2",
                review: "ЛОЛ дал в рот Валв, опять("
            },
        ],
        'C': [
            {
                title: "SPY x FAMILY",
                ruTitle: "Семья шпиона",
                review: "Гамно, но чу-ть-чуть интересно."
            },
            {
                title: "SPY x FAMILY part 2",
                ruTitle: "Семья шпиона. Часть 2",
                review: "Гамно, но чу-ть-чуть интересно."
            },
            {
                title: "Uzaki-chan wa Asobitai! 2",
                ruTitle: "Узаки хочет тусоваться! 2",
                review: ""
            },
            {
                title: "Tomodachi Game",
                ruTitle: "Игра друзей",
                review: "Жёсткий псих кукловод на ГГ"
            },
            {
                title: "Kobayashi-san Chi no Maid Dragon S: Nippon no Omotenashi - Attend wa Dragon desu",
                ruTitle: "Кобаяши и её горничная-дракон S: Японское гостеприимство — Присутствие дракона",
                review: ""
            },
            {
                title: "Komi-san wa, Comyushou desu. 2nd Season",
                ruTitle: "У Коми проблемы с общением 2",
                review: ""
            },
        ],
        'D': [
            {
                title: "Sword Art Online: Progressive Movie - Kuraki Yuuyami no Scherzo",
                ruTitle: "Мастера Меча Онлайн: Прогрессив — Скерцо глубокой ночи",
                review: "Прикольно, но есть и получше сезоны про САО."
            },
            {
                title: "Kinsou no Vermeil: Gakeppuchi Majutsushi wa Saikyou no Yakusai to Mahou Sekai wo Tsukisusumu",
                ruTitle: "Вермей в Золотом: Сильнейший маг проходит через магический мир с сильнейшей катастрофой",
                review: ""
            },
            {
                title: "Gaikotsu Kishi-sama, Tadaima Isekai e Odekakechuu",
                ruTitle: "Рыцарь-скелет вступает в параллельный мир",
                review: ""
            },
            {
                title: "Penguin Highway",
                ruTitle: "Тайная жизнь пингвинов",
                review: ""
            },
        ],
        'E': [
            {
                title: "Bleach",
                ruTitle: "Блич",
                review: "Все серии с дубляжом + - норм, но какое же это овер хайповое и нелогичное аниме. Но досмотрел до конца."
            },
            {
                title: "Kanojo, Okarishimasu Season 2",
                ruTitle: "Девушка на час 2",
                review: "КРИНЖ"
            },
            {
                title: "Tate no Yuusha no Nariagari Season 2",
                ruTitle: "Восхождение героя щита 2",
                review: "Первый сезон был на много лучше."
            },
            {
                title: "Kaguya-sama wa Kokurasetai: Ultra Romantic",
                ruTitle: "Кагуя хочет, чтобы ей признались: война любви и разума гениев 3",
                review: "Ну не, тут уже всё."
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
            {
                title: "Mushoku Tensei: Isekai Ittara Honki Dasu Season 2",
                ruTitle: "Реинкарнация безработного: История о приключениях в другом мире. 2",
                review: "Один из лучших исекаев евер!"
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
            {
                title: "Attack on Titan: The Final Season - Final Chapters Part 1",
                ruTitle: "Атака Титанов Финальная глава 1",
                review: "Какой это уже финал по счёту?"
            },
            {
                title: "Attack on Titan: The Final Season - Final Chapters Part 2",
                ruTitle: "Атака Титанов Финальная глава 2",
                review: "Какой это уже финал по счёту?"
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
            {
                title: "[Oshi no Ko]",
                ruTitle: "Звёздное дитя",
                review: "1-ый сезон крутой. Прочитал мангу, и финал удивил, не думал, что закончится именно так. Точнее, не думал что автор осмелиться так закончить."
            },
            {
                title: "Shangri-La Frontier",
                ruTitle: "Рубеж Шангри-Ла: Любитель игрошлака бросает вызов топ-игре",
                review: "+ - как САО, только не грустное и динамичнее"
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
            {
                title: "Shinigami Bocchan to Kuro Maid Season 2",
                ruTitle: "Смертоносный герцог и его чёрная горничная 2",
                review: "Неплохо"
            },
            {
                title: "Horimiya -piece-",
                ruTitle: "Хоримия: Кусочек",
                review: ""
            },
            {
                title: "Kono Subarashii Sekai ni Bakuen wo!",
                ruTitle: "Одаривая этот замечательный мир взрывами!",
                review: ""
            },
            {
                title: "Kyokou Suiri Season 2",
                ruTitle: "Ложные выводы 2",
                review: ""
            },
            {
                title: "Yamada-kun to Lv999 no Koi wo Suru",
                ruTitle: "Моя любовь девятьсот девяносто девятого уровня к Ямаде",
                review: ""
            },
            {
                title: "Tonikaku Kawaii 2nd Season",
                ruTitle: "Унеси меня на луну 2 сезон",
                review: ""
            },
            {
                title: "Ijiranaide, Nagatoro-san 2nd Attack",
                ruTitle: "Не издевайся, Нагаторо: Вторая атака",
                review: ""
            },
            {
                title: "DOTA: Dragon's Blood Book III",
                ruTitle: "Dota: Кровь Дракона 3",
                review: "Все интересные персонажи умерли."
            },
            {
                title: "Maou Gakuin no Futekigousha II",
                ruTitle: "Непризнанный школой владыка демонов 2!",
                review: ""
            },
        ],
        'D': [
            {
                title: "Boku no Kokoro no Yabai Yatsu: Twi-Yaba",
                ruTitle: "Опасность в моём сердце: Дополнительное время",
                review: "Даже не помню о чём это."
            },
            {
                title: "Masamune-kun no Revenge R",
                ruTitle: "Месть Масамунэ! R",
                review: ""
            },
            {
                title: "Tonikaku Kawaii: Joshikou-hen",
                ruTitle: "Унеси меня на Луну: Дни старшей школы",
                review: ""
            },
            {
                title: "OreGairu 3 OVA",
                ruTitle: "Как и ожидалось, моя школьная романтическая жизнь не удалась. Трижды OVA",
                review: ""
            },
            {
                title: "Seishun Buta Yarou wa Odekake Sister no Yume wo Minai",
                ruTitle: "Этот глупый свин не понимает мечту сестры на прогулке",
                review: ""
            },
            {
                title: "Otonari ni Ginga",
                ruTitle: "Галактика по соседству",
                review: "Скучно."
            },
            {
                title: "Ao no Orchestra",
                ruTitle: "Синий оркестр",
                review: "Не помню про что."
            },
            {
                title: "Itai no wa Iya nano de Bougyoryoku ni Kyokufuri Shitai to Omoimasu 2",
                ruTitle: "Не люблю боль, поэтому собираюсь вкачать всё в защиту 2",
                review: ""
            },
        ],
        'E': [
            {
                title: "Kanojo, Okarishimasu 3rd Season",
                ruTitle: "Девушка на час 3",
                review: "КРИНЖ"
            },
            {
                title: "Tokyo Revengers: Seiya Kessen-hen",
                ruTitle: "Токийские мстители: Рождественская битва",
                review: ""
            },
            {
                title: "Tokyo Revengers: Tenjiku-hen",
                ruTitle: "Токийские мстители: Поднебесье",
                review: "Прочитал всю мангу. Финал прикольный, необычный."
            },
            {
                title: "Edens Zero 2",
                ruTitle: "Нулевой Эдем 2",
                review: "Стало скучнее."
            },
        ],
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
            {
                title: "Shangri-La Frontier Season 2",
                ruTitle: "Рубеж Шангри-Ла: Любитель игрошлака бросает вызов топ-игре 2",
                review: "Держит планку"
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
            {
                title: "Рубеж Шангри-Ла: Любитель игрошлака бросает вызов топ-игре — Рекап",
                ruTitle: "Shangri-La Frontier: Kusoge Hunter, Kamige ni Idoman to su Recap",
                review: ""
            },
            {
                title: "Jigokuraku",
                ruTitle: "Адский рай",
                review: "Очень крутая анимешка."
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
            {
                title: "Seirei Gensouki 2",
                ruTitle: "Мифический Дух: Хроники 2",
                review: ""
            },
            {
                title: "[Oshi no Ko] Season 2",
                ruTitle: "Звёздное дитя 2",
                review: "После прочтение манги, аниме стало скучным. Но вроде оно всё ещё смотрибельное."
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
            {
                title: "Jaku-Chara Tomozaki-kun 2nd Stage",
                ruTitle: "Низкоуровневый Томозаки 2",
                review: ""
            },
            {
                title: "Shinmai Ossan Boukensha",
                ruTitle: "Невероятный новичок средних лет, прошедший тренировки на грани смерти",
                review: ""
            },
        ],
        'E': [
            {
                title: "Blue Lock",
                ruTitle: "Синяя тюрьма: Блю Лок",
                review: "1-ый сезон плохой, но то что будет дальше..."
            },
        ],
        'F': []
    },
    '2025': {
        'S': [
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
            {
                title: "Boku no Hero Academia: Final Season",
                ruTitle: "Моя геройская академия: Финал",
                review: "Рисовка удивила. Наконец-то финал. Круто!"
            },
            {
                title: "Tokyo Godfathers",
                ruTitle: "Однажды в Токио",
                review: "Очень смешное новогоднее аниме. Смотрели с лучшим другом и угорали на протяжении всего фильма. Всем советую!"
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
                title: "Gachiakuta",
                ruTitle: "Гачиакута",
                review: "Немного затянуто, но в целом интересно. Подумываю прочитать мангу."
            },
            {
                title: "Enen no Shouboutai: Ni no Shou Part 2",
                ruTitle: "Пламенная бригада пожарных 3.2",
                review: ""
            },
            {
                title: "Sanda",
                ruTitle: "Санда",
                review: "Хорошая, необычная анимешка с затигивающим сюжетом и красивой рисовкой."
            },
            {
                title: "Ragna Crimson",
                ruTitle: "Рагна Багровый",
                review: "Вроде аниме про имба гг, вроде зражается против невероятно сильных противников, но смотреть почему-то интересно. 17-ая серия удивила, но ненадолго. После просмотра было чувство дежавю. Как будто я смотрел это аниме раньше... странно."
            },
        ],
        'C': [
            {
                title: "Fumetsu no Anata e Season 3",
                ruTitle: "Для тебя, Бессмертный 3",
                review: "Продолжение хорошей истории. Очень понравилось. Рисовка на высоте. Всем смотреть! Но это было до 17ой серии, которую я ждал много времени. В ней начались какие-то непонятные сюжетные ДЫРЫ, я бы сказал ДЫРИЩИ, максиамльно глупые. Оооооооочень тяжело смотреть этот сезон, слишком всё натянуто. Автор не вывозит то, что он сам придумал. Весь 3ий сезон шит белыми нитками. Но финал сезона чень сильно трогает."
            },
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
                title: "Kyoukai no Kanata",
                ruTitle: "За гранью",
                review: "Милое, немного грустное аниме. Очень давно хоел посмотреть, думал что совсем другое будет. Но то что это аниме на 30-40% состоит из провседневности мне не понравилось. Финал максимально фансервисный. Автор всё никак не мог определиться, будут ли ГГ вместе или нет."
            },
            {
                title: "Kyoukai no Kanata Movie 1: I'll Be Here - Kako-hen",
                ruTitle: "За гранью: Я буду рядом - Прошлое",
                review: "Краткий пересказ событий 1го сезона аниме. В целом можно посмотреть эту версию."
            },
            {
                title: "Kyoukai no Kanata Movie 2: I'll Be Here - Mirai-hen",
                ruTitle: "За гранью: Я буду рядом - Будущее",
                review: "Прикольное продолжение аниме. Но есть непонятные, точнее глупые моменты. Во-первых, как можно не узнать оружие своей родное сестры. Во-вторых, бесит, что ГГ не хочет рассказывть своей подруге (2ой ГГ) про её прошлое (она потеряла память). И в тот же момент его, типо, друзья давят на него, хотя сами могут всё расскзать. В-третьих, пониватиция главного злодея не до конца раскрыта. Мб, в первоисточнике всё понятно, но не в аниме. В-четвёртых, меня бесит такой приём, что после уничтожения всемирного зла - йому 'по ту сторону' (это перевод анилибрии, шиза прожект перевела по другому, кста, озвучка от них прикольнее), приходит новое, ещё более сильное зло. В-пятых, мать гг всё знала, но НИЧЕГО не сказала и по сюжету почти ничего не делала. В-шестых, автор опять не смог окончательно попрощаться с главными героями. Но, не смотря на всё это, аниме прикольное. Кстати у этого аниме есть популярные мемы. Вот этот именно с этого фильма - https://www.youtube.com/shorts/lSUDTuGys6g"
            },
            {
                title: "Enen no Shouboutai: San no Shou",
                ruTitle: "Пламенная бригада пожарных 3.1",
                review: "Ну тут уже хз. Мне не особо нравится кто стал столпом + я словил много спойлеров с манги. Да и 2ая половина сезона полностью придуманная школьником. Для фанатров скажу, что я понимаю, что их мир рушится, правила меняются и т.д., но это не отменяет тот факт, что 8-9 серии очень тупые. Короче небольшое разачарование."
            }
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
        'E': [
            {
                title: "One Punch Man 3nd Season",
                ruTitle: "Ванпанчмен 3",
                review: "Плохо. Очень плохо. Покадровая рисовка, точнее срисовка..."
            },
        ],
        'F': []
    },
    '2026': {
        'S': [
            {
                title: "Chainsaw Man: Reze-hen",
                ruTitle: "Человек-бензопила: История Резе",
                review: "Как бы я не хейтил это аниме, но фильм шикарный. Сюжет... сюжет норм, рисовка просто БОМБА) Но главный герой просто пососный. Невероятно бесячий персонаж, который никак не будет развиваться в дальнейшем. Но фильм.... да... он крут."
            },
            {
                title: "The Girl Who Cut Time",
                ruTitle: "Девочка, покорившая время",
                review: "Аниме 2006 года. Долго думал куда поставить этот тайтл. Он мне очень понравился, идея прикольная, персонажи не бесят, даже симпатизируют. Дубляж очень крутой. Настолько идеально подобраных голосов я давно не слышал, а какой отыгрыш. Примерно в середине я чутка выпал из истории в том плане, что не понял куда она идёт. Что нам хотят донести авторы, но спустя минут 20-30 всё понял. Ещё я бы побольше хотел узнать про устройство времени, про его механику, про то как оно работает в этом аниме. Ну это уже слишком сложные вещи для такого произведения. Короче, всем советую!"
            },
            {
                title: "Re:Zero kara Hajimeru Isekai Seikatsu 4th Season",
                ruTitle: "Re:Zero. Жизнь с нуля в альтернативном мире 4",
                review: "До выхода сезона уже были скандалы, что некоторые моменты повырезали, и это правда. Сезон по самой лучшей арке - 6-ой (я пока что не учитываю 9ую и 10ую арки, т.к. не читал, но спойлеры я словил плотные, так что могу сказать, то контент там будет сочный... когда-то) урезали донельзя. Студия попыталась впихнуть невпихуемое. 90 глав из вебки (я хз сколько в ранобэ) в 19 серий. Давайте быстро пробегусь по тому что урезали: цветочное поле, новое полномочие Субару, тоннель с миазмами, бой с Кентавром (урезали 90%). Прозвище Рейда Ван Астрея перевели как Махальщик, хотя он Палочник, т.к. сражался палочками для еды. Показали Сесилуса и Халибела, думаю, что 5-ый сезон не заставит ждать. Также показали Вэйга Адгарда, типа который появлялся в ифке Сасагеру."
            },
            {
                title: "Avatar: Aang, The Last Airbender",
                ruTitle: "Легенда об Аанге: Последний маг воздуха",
                review: "Этот фильм просто невероятен. Рисовка бомбическа, насколько же он красивый. Но для сюжета 1-го часа явно мало. Собития развиваются слишком быстро. Забытого аватара показали прям очень мало. В этом аниме почти нет минусов, кроме того, что новые маги воздуха за 5 сек изучили магию. Жалко что фильм слили в сеть, а может и нет, не знаю. Возмоно, настало то время когда я должен пересмотреть Кору."
            },
            {
                title: "Violet Evergarden",
                ruTitle: "Вайолет Эвергарден",
                review: "Невероятное аниме. Оно красивое, спокойное и трогательное. Смотрится оно так просто и непринуждённо. Не могу сказать, что было очень интересно, но история, прошлое и развитие персонажа Вайолет, было точно интересным. Для меня, как для чувствительного человека, было тяжело смотреть это аниме и не плакать. Но я не плакал, а просто наслаждался. Я не могу сказать, что это аниме для всех, но я советую вам попробовать посмотреть его."
            },
        ],
        'A': [
            {
                title: "Vinland Saga",
                ruTitle: "Сага о Винланде",
                review: "Решил с Пятёркой пересмотреть 1ый сезон. Всё также кайф."
            },
            {
                title: "Sousou no Frieren 2nd Season",
                ruTitle: "Провожающая в последний путь Фрирен 2",
                review: "Прикольный сезон, но не такой атмосферный как 1ый. Чего-то мне не хватило, но я хз чего."
            },
            {
                title: "Natsu e no Tunnel, Sayonara no Deguchi",
                ruTitle: "Тоннель в лето, выход прощаний",
                review: "Посмотрел чисто ради того, чтобы сделать сравнение с ранобэ и мангой - https://t.me/kiwwijs/147 Ну и после этого у меня фильм чутка утратил позиции."
            },
            {
                title: "Princess Mononoke",
                ruTitle: "Принцесса Мононоке",
                review: "Я невероятно долго откладывал этот фильм от Хаяо Миядзаки. Самый главный плюс - озвучка. С первых же секунд та самая кайфовая озвучка, рисовка 97-го года, те самые демоны, которые перекочивали в более новые проекты автора. Просто шикарно. Жалко, что нам не показали как главные герои жили после того, как вернули голову Лесному Духу, какой вышел новый город, но оно и не удивительно."
            },
            {
                title: "Golden Kamuy 5th Season",
                ruTitle: "Золотое божество 5",
                review: "Кровавые сцены стали ещё кровавие. Сюжет стал стремительно идти к розвязке. И, по моему, первый раз нам раскрыли что значило название аниме. Следующий сезон станет последним."
            },
        ],
        'B': [
            {
                title: "One Piece",
                ruTitle: "Ван Пис",
                review: "Не многие поймут почему Ван Пис в этом тире. Он тут оказался из-за того, что стал максимально детским, и я бы даже сказал пративны, лично для меня. Смотрю через силу, но это не качается сражений. А также студия не может просто по сюжету идти, так что я жду ремейк и с диким кайфом буду пересматривать."
            },
            {
                title: "Hai to Gensou no Grimgar",
                ruTitle: "Гримгал пепла и иллюзий",
                review: "Очень долго дмал, чтобы поставить это аниме выше, но решил что оно должно быть в этом тире. Это аниме показывает, как бы выглядел настоящий исекай. Герои в нём 2 серии пытаются убить гоблина. Первые 4 серии сюжет почти не двигается, но потом становится всё интереснее. Финал очень понравился. Жалко, что у анимие всего лишь 1 сезон. Думаю, что когда-нибудь прочитаю ранобэ. Надо бы создать топ аниме, которые мне очень сильно понравились. Хоть бы не забыть."
            },
            {
                title: "Yuusha-kei ni Shosu: Choubatsu Yuusha 9004-tai Keimu Kiroku",
                ruTitle: "Приговорённый быть героем: Тюремные записи 9004-го штрафного отряда героев",
                review: "На удивление очень интересное аниме, которое под конец 1го сезона удивляет. Очень надеюсь, что когда-то выйдет продолжение. От этого аниме небольшие вайбы Биско-ржавоеда."
            },
            {
                title: "Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen",
                ruTitle: "Магическая битва 3",
                review: "Этот сезон стал чутка скучнее, чем предыдущие, мб из-за того, что я почти весь сюжет знал. Но я не знал о... павер-апе... перевоплощении Маки Зенин. Мне нравился Тоджи как персонаж, который был мегасильным и давал лещей магам, но мне не нравится его картинка мира... я хз как это описать. А вот Маки такая же как и Тоджи, но она типо добрая и не хейтит магов, вроде. Мб, любимый персонаж после Сугуры Гето. Ну и в целом сезон хороший, динамичный. Но зная сюжет на перёд, то..."
            },
            {
                title: "Jigokuraku 2",
                ruTitle: "Адский рай 2",
                review: "Хороший сезон. Почти все финальные битвы были слишком простые для героев + какой-то имбалансный челик приплыл на остров. Видно что сезон закончен на полуслове, арка даже и близко не закончена. Радует, что появилось много прикольных персонажей, за которыми интересно наблюдать. Аниме всё ещё интересно смотреть, буду ждать 3ий сезон или же всё таки соберусь с силами и пойду читать мангу."
            },
            {
                title: "You-jitsu 4th Season",
                ruTitle: "Добро пожаловать в класс превосходства 4",
                review: "Пока что очень интересный сезон. Рисовка хорошоя, но её почему-то хейтят (дальше понятно почему). Мб, если сравнить прошлые сезоны, но мне почему-то нравится. Сюжет держит в напряжении всё время. Возможно лучший сезон. И у меня уже давно невероятное желание прочитать новеллу. Рисовка 1ых 3ёх серий было хорошей, но с каждой серией всё хуже и хуже."
            },
            {
                title: "The Legend of Vox Machina",
                ruTitle: "Легенда о Вокс Макине",
                review: "Прикольная анимеха про D&D"
            },
            {
                title: "The Legend of Vox Machina Season 2",
                ruTitle: "Легенда о Вокс Макине 2",
                review: ""
            },
            {
                title: "The Legend of Vox Machina Season 3",
                ruTitle: "Легенда о Вокс Макине 3",
                review: ""
            },
            {
                title: "Daemons of the Shadow Realm",
                ruTitle: "Цугаи загробного мира",
                review: "Интересное аниме от автора алхимика, что прослеживается в персонажах. Интересный сюжет, хорошая рисовка."
            },
            {
                title: "Golden Kamuy 2nd Season",
                ruTitle: "Золотое божество 2",
                review: "стало больше голых мужиков. ну а так последние 4 серии очень интресные."
            },
            {
                title: "Devil May Cry 2025",
                ruTitle: "Дьявол может плакать (2025)",
                review: "Неплохо, интересно. Но как же бесит, что этой Волковой из t.A.T.u. делают поблажки. Почему она сражается с мега сильным демоном на равных, а Данте еле-еле побеждает его? Потом Юлю показывают как супер меткого стрелка, а в конце сезона по трубкам попасть не может. Ага, верю. Ну а про базуку с бесконечными патронами, которые беруться из ниоткуда, промолчу."
            },
            {
                title: "Violet Evergarden Gaiden: Eien to Jidou Shuki Ningyou",
                ruTitle: "Вайолет Эвергарден: Вечность и призрак пера",
                review: "Хороший и красивый фильм. Но он не дотягивает до уровня сериала. Сюжет не такой трогательный. Он не про Вайолет, а про 2ух сёстёр. Но если вам понравился сериал, то этот фильм стоит посмотреть. Не знаю заслуживает ли этот фильм 14ое место на яммианиме, но пускай будет. Думаю, его стоит смотреть после фильма 2020 года."
            },
            {
                title: "Black Lagoon",
                ruTitle: "Пираты «Чёрной лагуны»",
                review: "Прикольное аниме про бандитов. Старое, хотя мне столько же лет сколько и этому аниме, но всё ещё отличное. Старая озвучка, ммм... прелесть. У автора явно фетиш на сильных женщин."
            },
        ],
        'C': [
            {
                title: "Enen no Shouboutai: San no Shou Part 2",
                ruTitle: "Пламенная бригада пожарных 3.2",
                review: "Мне сезон показалось затянутым. После 8ой серии начался непонятный или я бы сказал максимально глупый сюжет, придуманный школьником. В целом не плохо, но потенциал слит, как по мне. Единственное что прикольно - наконец-то раскрыли для людей, которые не читалимангу и не смотрели Соул итер, как мир пожарных стал миром пожирателя. Это всё из-за того, что Синра - гг создал его по памяти. От туда и лучна с улыбкой."
            },
            {
                title: "[Oshi no Ko] 3rd Season",
                ruTitle: "Звёздное дитя 3",
                review: "После прочтение манги, мне аниме стало скучно смотреть. Но я считаю, что это аниме стоит внимания, особенно за финал."
            },
            {
                title: "Yuusha no Kuzu",
                ruTitle: "Герой-мерзавец",
                review: "Ну что можно сказать про это аниме? Самое обычное произведение с долей юмора и попыткой в сюжет. Но сюжет со школьницами... ммм... скучный и максимально бональный. Анимеха чисто убить время."
            },
            {
                title: "Mikadono Sanshimai wa Angai, Choroi.",
                ruTitle: "Три сестры Микадоно оказались неожиданно простыми",
                review: "Много видосов про это аниме попадалось в тик токе. Вот решил посмотреть. Типичная кринжовая романтика, но почему-то смог досмотреть до конца. Есть в ней что-то... прикольное."
            },
            {
                title: "Aria in the Starless Night",
                ruTitle: "Мастера Меча Онлайн: Прогрессив - Ария в беззвёздной ночи",
                review: "Прикольный фильм, который я откладывал почти 4 года, хотя мне очень нравится САО. Сам по себе фильм не дотягивает до 1го сезона, но зато дополняет его. Он рассказывает про некоторых новых персонажей, чутка больше раскрывает гильдии, короче открывает больше лора для 1го сезона. Надо бы как-то собраться с силами и прочитать первоисточник. Кстати, я этой идеей горю уже... почти 10 лет? Ну что-то около того) Сцена после убийства босса 5го этажа милая)"
            },
            {
                title: "Tensura 4",
                ruTitle: "О моём перерождении в слизь 4",
                review: "Аниме слишком затянутое, это ещё началось с 3го сезона. Так что я пошёл прочитал мангу и как оказалось, она не далеко ушла. Так что рано или поздно пойду ранобэ читать."
            },
            {
                title: "Tongari Boushi no Atelier",
                ruTitle: "Ателье колдовских колпаков",
                review: "Мангу колпаков ставят в один ряд с Фрирен. Не понимаю почему. Это аниме милое, невероятно красивое, но не более. Может сюжет какой-то... многослойный? Просто пока я вижу, как 4 девочки бегают и играются с магией, и  побеждают дракона облаками, а тип, который похож на Сатору, что-то разгадывает. Пока ничего не заставляет меня прочитать мангу?"
            },
            {
                title: "Virgin Punk: Clockwork Girl",
                ruTitle: "Невинный панк",
                review: "Прикольная анимешка. Но ничего особенного. Девушку убили пдф и вернул её мозг в тело 14и летней девочки. Плюсы - прорисованные соски, минусы - у малолетки."
            },
            {
                title: "Tsue to Tsurugi no Wistoria 2nd Season",
                ruTitle: "Вистория: Меч и жезл 2",
                review: "Я прочитал мангу, так что аниме для меня стало не таким интересным, но оно всё ещё бодро смотрится."
            },
            {
                title: "Koori no Jouheki",
                ruTitle: "Ледяная стена",
                review: "Очень интересная романтика. В этом сезоне прям хорошие аниме в этом жанре. Аж 3 штуки."
            },
            {
                title: "Gals Can't Be Kind to Otaku!?",
                ruTitle: "Где те девушки, что были бы добры к отаку?",
                review: "Дефолт романтика, ничего особенно. Смотреть не прям кринжово."
            },
            {
                title: "Class de 2-banme ni Kawaii Onnanoko to Tomodachi ni Natta",
                ruTitle: "Я подружился со второй самой симпатичной девушкой в классе",
                review: "Дефолт романтика, ничего особенно. Вайбы 'Низкоуровневого персонажа Томодзаки'. Смотреть не прям кринжово."
            },
            {
                title: "Saikyou no Shien-shoku [Wajutsushi] Dearu Ore wa Sekai Saikyou Clan wo Shitagaeru",
                ruTitle: "Самый известный диктор создаёт самый великий в мире клан",
                review: "Неплохое аниме, смотрится бодро, но в целом дефолтный тайтл."
            },
            {
                title: "Golden Kamuy",
                ruTitle: "Золотое божество",
                review: "Неплохое аниме, сюжет интересный, но из-за постоянного разбавления охотой и приёмом пищи стоновится скучновато. У аниме есть ОВЫ, но их смотреть не особо хочу."
            },
            {
                title: "Golden Kamuy Season 3",
                ruTitle: "Золотое божество 3",
                review: "Держит планку."
            },
            {
                title: "Kill Ao",
                ruTitle: "Убивая юность",
                review: "Обычное аниме. Ничего особенного."
            },
            {
                title: "Sword Art Online Progressive: Scherzo of a Dark Dusk",
                ruTitle: "Мастера Меча Онлайн: Прогрессив - Скерцо глубокой ночи",
                review: "Такое чувство как будто я уже смотрел этот фильм и писал на него небольшое ревью, но это был 'Мастера Меча Онлайн: Прогрессив - Ария в беззвёздной ночи', что-то я запутался. Ну короче норм, они одинаково хороши."
            },
            {
                title: "Boku no Hero Academia: More",
                ruTitle: "Моя геройская академия: Больше",
                review: "Приятно видеть дополнительный эпизод истории, видеть счастливое будущее героев их рейтинги. Теперь это уже настоящий финал. 10 лет выходило это аниме, просто вау. Насколько же много таких историй я ещё проживу. Я очень рад)"
            },
            {
                title: "Violet Evergarden Episode 14",
                ruTitle: "Вайолет Эвергарден: День, когда ты поймёшь, что я люблю тебя, обязательно наступит",
                review: "Спешл, который должен был быть в основном сериале, полноценная 14 серия.Расскрывает понимание того, как Вайолет набила себе руку в письмах. Не могу засунуть в S-тир, т.к. это не полноценный сезон, но и ниже тоже не могу, так что пусть будет здесь."
            },
            {
                title: "5-toubun no Hanayome∽ 2",
                ruTitle: "Пять невест: Спецвыпуски 2",
                review: "Спешл про то что у близняшек выросла грудь, отпуск. Ну норм. Музыка у этого аниме кайфовая."
            },
        ],
        'D': [
            {
                title: "Puparia",
                ruTitle: "Ложнококон",
                review: "Просто прикольная анимка (анимация), смысл которой я не понял. Она была зафоршена в тик токе в своё время."
            },
            {
                title: "Vigilante: Boku no Hero Academia Illegals 2nd Season",
                ruTitle: "Моя геройская академия: Вне закона 2",
                review: "1ый сезон был получше, в этом же рисовка стала хуже по ощущениям, да и история Сотриголовы мне максиально не интересна."
            },
            {
                title: "Golden Kamuy 4th Season",
                ruTitle: "Золотое божество 4",
                review: "Слишком много серий, которые раскрывают других персонажей, но они мега скучные. Голых мужиков стало меньше, но теперь они мастурбируют. Только под конец что-то нормальное пошло."
            },
            {
                title: "Fortune Favors Lady Nikuko",
                ruTitle: "Никуко из Рыбацкой гавани",
                review: "Долгая, но милая полнометражка про девочку, которая живёт с мамой в рыбацкой деревне. Рисовка красивая, сюжет не особо, но в целом прикольно. Это аниме про жизнь, про то как важно ценить моменты и людей рядом с тобой."
            },
        ],
        'E': [
            {
                title: "Suzume no Tojimari",
                ruTitle: "Судзумэ, закрывающая двери",
                review: "Я типо досморел, но много скипал, самый неинтересный фильм, от Миадзаки. Скучный."
            },
        ],
        'F': [
            // {
            //     title: "Violet Evergarden Movie",
            //     ruTitle: "Вайолет Эвергарден — Фильм",
            //     review: ""
            // },
            // {
            //     title: "Black Lagoon 2nd Season",
            //     ruTitle: "Пираты «Чёрной лагуны»: Второй залп",
            //     review: ""
            // },
            // {
            //     title: "Black Lagoon 3",
            //     ruTitle: "Пираты «Чёрной лагуны»: Кровавая тропа Роберты",
            //     review: ""
            // },
            // {
            //     title: "Mushoku Tensei: Jobless Reincarnation Season 3",
            //     ruTitle: "Реинкарнация безработного: История о приключениях в другом мире 3.1",
            //     review: ""
            // },
            // {
            //     title: "The Legend of Vox Machina Season 4",
            //     ruTitle: "Легенда о Вокс Макине 4",
            //     review: ""
            // },
        ]
    },
    '2027': {
        'S': [],
        'A': [],
        'B': [],
        'C': [],
        'D': [],
        'E': [],
        'F': [
            // {
            //     title: "The One Piece Remake",
            //     ruTitle: "Ван Пис Ремейк",
            //     review: ""
            // },
        ]
    },

    // '2028': {
    //     'S': [],
    //     'A': [],
    //     'B': [],
    //     'C': [],
    //     'D': [],
    //     'E': [],
    //     'F': []
    // },
};