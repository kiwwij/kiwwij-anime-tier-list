const droppedData = [
    {
        "title": "Chaos Dragon: Sekiryuu Senyaku",
        "ruTitle": "Драконий хаос: Война красного дракона",
        "review": "Дропнул на 1-й серии из 12."
    },
    {
        "title": "Madougushi Kunon wa Mieteiru",
        "ruTitle": "Волшебник Кунон всё видит",
        "review": "Дропнул на 2-й серии из n."
    },
    {
        "title": "Guilty Crown",
        "ruTitle": "Корона греха",
        "review": "Дропнул на 14-й серии из 22. После 1-ой половины стало мега скучно."
    },
    {
        "title": "Servamp",
        "ruTitle": "Сервамп",
        "review": "Дропнул на 2-й серии из 12."
    },
    {
        "title": "Boku ga Aishita Subete no Kimi e",
        "ruTitle": "Для каждой тебя, что я раньше любил",
        "review": "Дропнул на 0-й серии из 1."
    },
    {
        "title": "Japan Sinks: 2020",
        "ruTitle": "Гибель Японии 2020",
        "review": "Дропнул на 3-й серии из 10."
    },
    {
        "title": "Black Butler: Emerald Witch Arc",
        "ruTitle": "Тёмный дворецкий: Зелёная ведьма",
        "review": "Дропнул на 4-й серии из 13."
    },
    {
        "title": "Darker than Black",
        "ruTitle": "Темнее чёрного",
        "review": "Дропнул на 1-й серии из 25."
    },
    {
        "title": "The Kingdoms of Ruin",
        "ruTitle": "Королевство руин",
        "review": "Дропнул на 1-й серии из 12."
    },
    {
        "title": "After the Rain",
        "ruTitle": "Любовь похожа на прошедший дождь",
        "review": "Дропнул на 1-й серии из 12."
    },
    {
        "title": "Isekai Cheat Magician",
        "ruTitle": "Маг-обманщик из другого мира",
        "review": "Дропнул на 6-й серии из 12."
    },
    {
        "title": "My One-Hit Kill Sister",
        "ruTitle": "Другой мир и сестра, которая убивает с одного удара",
        "review": "Дропнул на 3-й серии из 12."
    },
    {
        "title": "Migi & Dali",
        "ruTitle": "Миги и Дали",
        "review": "Дропнул на 7-й серии из 13."
    },
    {
        "title": "Shikimori's Not Just a Cutie",
        "ruTitle": "Моя девушка не только милая",
        "review": "Дропнул на 2-й серии из 12."
    },
    {
        "title": "Otaku Elf",
        "ruTitle": "Эльф Эдомаэ",
        "review": "Дропнул на 3-й серии из 12."
    },
    {
        "title": "Black Clover 2017",
        "ruTitle": "Чёрный Клевер",
        "review": "Дропнул на 0-й серии из 170."
    },
    {
        "title": "Black Clover: Sword of the Wizard King",
        "ruTitle": "Чёрный Клевер (Спэшл)",
        "review": "Дропнул на 0-й серии из 1."
    },
    {
        "title": "Disney: Twisted-Wonderland",
        "ruTitle": "Искажённая страна чудес: Эпизод Хартслабьюла",
        "review": "Дропнул на 2-й серии из 8."
    },
    {
        "title": "Boruto: Naruto Next Generations",
        "ruTitle": "Боруто: Новое поколение Наруто",
        "review": "Дропнул на 100 какой-то серии из 293."
    },
    {
        "title": "Ninja to Gokudou",
        "ruTitle": "Ниндзя и якудза",
        "review": "Дропнул на 1-й серии из 12."
    },
    {
        "title": "My Instant Death Ability Is So Overpowered",
        "ruTitle": "Мой Статус Убийцы Очевидно Превосходит Геройский",
        "review": "Дропнул на 3-й серии из 12."
    },
    {
        "title": "Gnosia",
        "ruTitle": "Гносия",
        "review": "Дропнул на 1-й серии из 12."
    },
    {
        "title": "Alternatively, a more literal translation could be:",
        "ruTitle": "Вечность Югурэ",
        "review": "Дропнул на 3-й серии из 13."
    },
    {
        "title": "Awkward Senpai",
        "ruTitle": "Неумелый сэмпай",
        "review": "Дропнул на 2-й серии из 12."
    },
    {
        "title": "Yano-kun no Futsuu no Hibi",
        "ruTitle": "Обычные дни Яно",
        "review": "Дропнул на 2-й серии из 12."
    },
    {
        "title": "Girls' Last Tour",
        "ruTitle": "Постапокалиптическое путешествие",
        "review": "Дропнул на 1-й серии из 12. Может когда-то там 2-ой шанс."
    },
    {
        "title": "May I Ask for One Final Thing?",
        "ruTitle": "Могу я попросить ещё кое-что?",
        "review": "Дропнул на 1-й серии из 13."
    },
    {
        "title": "Souzai Saishuka no Isekai Ryokouki",
        "ruTitle": "Путешествие коллекционера по другому миру",
        "review": "Дропнул на 2-й серии из 12."
    },
    {
        "title": "Mushoku no Eiyuu",
        "ruTitle": "Бесклассовый герой: Да мне всё равно не нужны эти ваши умения",
        "review": "Дропнул на 2-й серии из 12."
    },
    {
        "title": "The Fragrant Flower Blooms With Dignity",
        "ruTitle": "Благоухающий цветок расцветает с достоинством",
        "review": "Дропнул на 10-й серии из 13."
    },
    {
        "title": "Blood Blockade Battlefront",
        "ruTitle": "Фронт кровавой блокады",
        "review": "Дропнул на 1-й серии из 12."
    },
    {
        "title": "Kowloon Generic Romance",
        "ruTitle": "Обычный роман в Коулуне",
        "review": "Дропнул на 2-й серии из 13."
    },
    {
        "title": "Tougen Anki",
        "ruTitle": "Тёмный демон",
        "review": "Дропнул на 5-й серии из 24."
    },
    {
        "title": "Rascal Does Not Dream of Santa Claus",
        "ruTitle": "Этот глупый свин не понимает мечту Санта-Клауса",
        "review": "Дропнул на 7-й серии из 13. Это аниме всё скучнее и скучнее с каждым сезоном и фильмом."
    },
    {
        "title": "Rent-a-Girlfriend Season 4",
        "ruTitle": "Девушка на час 4",
        "review": "Дропнул на 4-й серии из 12. Я уже просто не вывожу смотреть эту хрень."
    },
    {
        "title": "Tsuyokute New Saga",
        "ruTitle": "Стать сильнее! Новая сага",
        "review": "Дропнул на 4-й серии из 12."
    },
    {
        "title": "Clevatess",
        "ruTitle": "Клеватесс: Король демонических зверей, младенец и герой-нежить",
        "review": "Дропнул на 2-й серии из 12."
    },
    {
        "title": "Ame to Kimi to",
        "ruTitle": "Дождь и ты",
        "review": "Дропнул на 1-й серии из 12."
    },
    {
        "title": "Secrets of the Silent Witch",
        "ruTitle": "Молчаливая ведьма: Тайна молчаливой колдуньи",
        "review": "Дропнул на 2-й серии из 13."
    },
    {
        "title": "Guimi Zhi Zhu: Xiaochou Pian",
        "ruTitle": "Повелитель тайн: Клоун",
        "review": "Дропнул на 1-й серии из 13."
    },
    {
        "title": "Mattaku Saikin no Tantei to Kitara",
        "ruTitle": "С нынешними детективами ничего не поделаешь",
        "review": "Дропнул на 2-й серии из 12."
    },
    {
        "title": "Lily's Moment",
        "ruTitle": "Мгновение Лили",
        "review": "Дропнул на 1-й серии из 14."
    },
    {
        "title": "Teogonia",
        "ruTitle": "Божественная книга",
        "review": "Дропнул на 1-й серии из 12."
    },
    {
        "title": "Kanpeki Sugite Kawai-ge ga Nai to Konyaku Haki Sareta Seijo wa Ringoku ni Ura Reru",
        "ruTitle": "Соседнему королевству продали святую, помолвку которой разорвали из-за того, что она стала слишком совершенной",
        "review": "Дропнул на 5-й серии из 12."
    },
    {
        "title": "Lazarus",
        "ruTitle": "Лазарь",
        "review": "Дропнул на 3-й серии из 13."
    },
    {
        "title": "The Beginning After The End",
        "ruTitle": "Начало после конца",
        "review": "Дропнул на 5-й серии из 12."
    },
    {
        "title": "I'm the Evil Lord of an Intergalactic Empire!",
        "ruTitle": "Я злой лорд межгалактической империи!",
        "review": "Дропнул на 3-й серии из 12."
    },
    {
        "title": "Danjo no Yuujou wa Seiritsu Suru? (Iya, Shinai!!)",
        "ruTitle": "Может ли существовать дружба между мужчиной и женщиной? (Нет, это не так!)",
        "review": "Дропнул на 3-й серии из 12."
    },
    {
        "title": "Witch Watch",
        "ruTitle": "Ведьмнадзор",
        "review": "Дропнул на 3-й серии из 25."
    },
    {
        "title": "Sentai Daishikkaku",
        "ruTitle": "Боевой отряд «Полный провал»",
        "review": "Дропнул на 8-й серии из 12."
    },
    {
        "title": "Shoushimin Series",
        "ruTitle": "Маленький гражданин",
        "review": "Дропнул на 2-й серии из 10. Анимешка прикольная. 100% дам 2-ой шанс."
    },
    {
        "title": "Shibou Yuugi de Meshi wo Kuu.",
        "ruTitle": "Смертельная игра ради еды на столе",
        "review": "Дропнул на 1-й серии из 11. Анимешка прикольная, задумка неновая, но начало невероятно скучное + рисовка какая-то, ну хз..."
    },
    {
        "title": "Kizoku Tensei: Megumareta Umare kara Saikyou no Chikara wo Eru",
        "ruTitle": "Реинкарнация аристократа: Благословенный с рождения величайшей силой",
        "review": "Дропнул на 1-й серии из 12."
    },
    {
        "title": "Hikuidori: Ushuu Boro Tobi-gumi",
        "ruTitle": "Огнеглотающая Птица: Отряд пожарных-оборванцев из Усю",
        "review": "Дропнул на 1-й серии из n. Ужасный 3D."
    },
    {
        "title": "Danshi Koukousei no Nichijou",
        "ruTitle": "Повседневная жизнь старшеклассников",
        "review": "Дропнул на 1-й серии из 12. Чё-то типо необъятного океана."
    },
    {
        "title": "Acchi Kocchi",
        "ruTitle": "Там и сям",
        "review": "Дропнул на 1-й серии из 12. Прикольная, милая анимеха, но тратить на неё время не хочу."
    },
    {
        "title": "Triage X",
        "ruTitle": "Искусственный отбор",
        "review": "Дропнул на 1-й серии из 10. Если бы я это аниме начал смотреть в 2016 году, до досмотрел бы, а так скука."
    },
    {
        "title": "Durarara!!",
        "ruTitle": "Дюрарара!!",
        "review": "Дропнул на 1-й серии из 26. Пока смотрел 1-ую серию стало мега скучно. Кста, там была прямая отсылка на волчицу и пряности."
    },
    {
        "title": "Youjo Senki",
        "ruTitle": "Военная хроника маленькой девочки",
        "review": "Дропнул на 4-й серии из 12. Давно хотел посмотрть. Увидел анонс 2-го сезона и решил глянуть первый. Но чёт не зашло."
    },
    {
        "title": "Komada Jouryuusho e Youkoso",
        "ruTitle": "Винокурня семьи Комада",
        "review": "Дропнул на 0-й серии из 1. Чилловое аниме про создание алкоголя, но для меня скучновато."
    },
    {
        "title": "Angel's Egg",
        "ruTitle": "Яйцо ангела",
        "review": "Дропнул на 0-й серии из 1. Ммм... непонятное нечто."
    },
    {
        "title": "Lodoss to Senki: Eiyuu kishi den",
        "ruTitle": "Летопись войн острова Лодосс",
        "review": "Дропнул на 1-й серии из 27. Слишком старое и простое."
    },
    {
        "title": "Darwin Jihen",
        "ruTitle": "Инцидент Дарвина",
        "review": "Дропнул на 1-й серии из 13. Скучное и слишком глупое."
    },
    {
        "title": "Dark Moon: Tsuki no Saidan",
        "ruTitle": "Тёмная луна: Кровавый алтарь",
        "review": "Дропнул на 2-й серии из 12."
    },
    {
        "title": "SCARLET NEXUS",
        "ruTitle": "Алый Нексус",
        "review": "Дропнул на 5-й серии из 26."
    },
    {
        "title": "Haikyu!!",
        "ruTitle": "Волейбол!!",
        "review": "Дропнул на 3-й серии из 25."
    },
    {
        "title": "Clevatess: Majuu no Ou to Akago to Shikabane no Yuusha",
        "ruTitle": "Клеватесс: Король демонических зверей, младенец и герой-нежить",
        "review": "Дропнул на 2-й серии из 12."
    },
    {
        "title": "Kuma Kuma Kuma Bear",
        "ruTitle": "Ми-ми-ми-мишка",
        "review": "Дропнул на 1-й серии из 12."
    },
    {
        "title": "Wonder Egg Priority",
        "ruTitle": "Приоритет чудо-яйца",
        "review": "Дропнул на 2-й серии из 12."
    },
    {
        "title": "Metallic Rouge",
        "ruTitle": "Металлическая Руж",
        "review": "Дропнул на 3-й серии из 13."
    }
]