const droppedData = [
    {
        "title": "Chaos Dragon: Sekiryuu Senyaku",
        "ruTitle": "Драконий хаос: Война красного дракона",
        "review": "Дропнул на 1-й серии из 12."
    },
    {
        "title": "Madougushi Kunon wa Mieteiru",
        "ruTitle": "Волшебник Кунон всё видит",
        "review": "Дропнул на 2-й серии из 13."
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
        "review": "Дропнул на 1-й серии из 170. 2 раза пытался посмореть, но слишком кал."
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
        "review": "Дропнул на 1-й серии из 12. Ужасный 3D."
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
        "review": "Дропнул на 1-й серии из 1. Чилловое аниме про создание алкоголя, но для меня скучновато."
    },
    {
        "title": "Angel's Egg",
        "ruTitle": "Яйцо ангела",
        "review": "Дропнул на 1-й серии из 1. Ммм... непонятное нечто."
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
    },
    {
        "title": "NieR:Automata Ver1.1a",
        "ruTitle": "Ниер: Автомата — Версия 1.1а",
        "review": "Дропнул на 6-й серии из 12. Аниме почти полностью повторяет сюжет игры, возможно из-за этого мне стало скучно смотреть. Но для ознакомления со вселенной игры аниме подойдёт."
    },
    {
        "title": "Suzume no Tojimari",
        "ruTitle": "Судзумэ, закрывающая двери",
        "review": "Дропнул на 1-й серии из 1. Я типо досморел, но много скипал, самый неинтересный фильм, от Миадзаки."
    },
    {
        "title": "Mayonaka Heart Tune",
        "ruTitle": "Полуночный мотив сердца",
        "review": "Дропнул на 1-й серии из 12. Кал."
    },
    {
        "title": "Mayonaka Punch",
        "ruTitle": "Полуночный удар",
        "review": "Дропнул на 2-й серии из 12."
    },
    {
        "title": "Omoide no Mani",
        "ruTitle": "Воспоминания о Марни",
        "review": "Дропнул на 1-й серии из 1. Посмотрел 30 минут, ничего не понял, стало скучно."
    },
    {
        "title": "테러맨",
        "ruTitle": "Террорист",
        "review": "Дропнул на 1-й серии из 8. Какая-то полная корейская фигня. Так ещё и норм озвучки нету."
    },
    {
        "title": "Shiguang Daili Ren",
        "ruTitle": "Агент времени",
        "review": "Дропнул на 3-й серии из 11."
    },
    {
        "title": "Jormungand",
        "ruTitle": "Ёрмунганд",
        "review": "Дропнул на 2-й серии из 12. Пока не знаю, в это аниме явно что-то есть, но боевики не моё. Милые персонажи, но отсутствие логики немного портит картину, скучновато."
    },
    {
        "title": "4 Cut Hero",
        "ruTitle": "Четыре рыцаря",
        "review": "Дропнул на 1-й серии из 10. По нарезкам из тт, думал что что-то прикольное, на деле хян какая-то."
    },
    {
        "title": "Kyousogiga (TV)",
        "ruTitle": "Шутки чокнутой столицы",
        "review": "Дропнул на 1-й серии из 12. Просто скучно."
    },
    {
        "title": "Quartet of Cherry Blossoms in the Night",
        "ruTitle": "Вишневый Квартет",
        "review": "Дропнул на 1-й серии из 12. Просто скучно."
    },
    {
        "title": "Record of Grancrest War",
        "ruTitle": "Легенда о Гранкресте",
        "review": "Дропнул на 1-й серии из 24. Просто скучно."
    },
    {
        "title": "Mamonogurai no Boukensha: Ore dake Mamono wo Kuratte Tsuyoku Naru",
        "ruTitle": "Авантюрист, пожирающий демонов: Я единственный, кто становится сильнее, пожирая монстров",
        "review": "Дропнул на 1-й серии из n. Анимации нет."
    },
    {
        "title": "Mata Korosarete Shimatta no desu ne, Tantei-sama",
        "ruTitle": "Вас снова убили, мистер детектив",
        "review": "Дропнул на 1-й серии из n. Анимации нет."
    },
    {
        "title": "Ponkotsu Fuuki Iin to Skirt-take ga Futekisetsu na JK no Hanashi",
        "ruTitle": "Бесполезный дежурный и школьница со слишком короткой юбкой",
        "review": "Дропнул на 1-й серии из n."
    },
    {
        "title": "Yowayowa Sensei",
        "ruTitle": "Учитель Ёваёва",
        "review": "Дропнул на 1-й серии из 12. Аниме где учники и учительница попадают в смущающие ситуации. Типо кто-то на кого-то сел, либо грудь спалили, ну короче вы поняли."
    },
    {
        "title": "Kanan-sama Is Easy as Hell!",
        "ruTitle": "Канан до чёртиков проста",
        "review": "Дропнул на 2-й серии из 12. Этти-гаремник."
    },
    {
        "title": "Marriage Toxin",
        "ruTitle": "Брачный токсин",
        "review": "Дропнул на 1-й серии из 12."
    },
    {
        "title": "Liar Game",
        "ruTitle": "Игра лжецов",
        "review": "Дропнул на 2-й серии из 12. Ещё одно аниме про попытку обануть одного человека другим человеком. Максимально дефолтное и бональное. Хотя мне почему-тока кажется, что в нём есть что-то большое, но уверен, что оно того не стоит. Услвовная 'Игра друзей' будет куда интереснее."
    },
    {
        "title": "Heion Sedai no Idaten-tachi",
        "ruTitle": "Божества Идатэн в мирном поколении",
        "review": "Дропнул на 5-й серии из 11. Аниме прикольное, но какое-то простое и скучное. Смотрится лего, но в тоже время и тяжело."
    },
    {
        "title": "Kaoru Hana wa Rin to Saku",
        "ruTitle": "Очаровательный цветок расцветает с достоинством",
        "review": "Дропнул на 10-й серии из 13. Аниме прикольное, красивое, но скучное."
    },
    {
        "title": "Lycoris Recoil",
        "ruTitle": "Ликорис Рекоил",
        "review": "Дропнул на 2-й серии из 13. Аниме прикольное, но настолько нелогичное. Я когда посмотрел 2 серии, жопа всполыхнула."
    },
]