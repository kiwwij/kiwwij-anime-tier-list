const gameRatingScales = {
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
        { rank: 'Лучшие', color: 'bg-red-500' },
        { rank: 'Дикий кайф', color: 'bg-orange-500' },
        { rank: 'Крепкий проект', color: 'bg-yellow-400' },
        { rank: 'Прошёл и забыл', color: 'bg-green-500' },
        { rank: 'В этом что-то есть', color: 'bg-blue-500' },
        { rank: 'Рофло игра', color: 'bg-purple-500' },
        { rank: 'Alt+F4 и Рефанд', color: 'bg-gray-600' }
    ]
};

if (typeof tierListData !== 'undefined') {
    
    tierListData['Игры'] = {
        type: 'game',
        data: {
            'S': [
                {
                    title: "Minecraft",
                    review: "Надо ли кому-то рассказывать почему эта игра у меня в S тире? Я не знаю сколько времени провёл в ней как сам, так и с другими людьми. Я играл со Жмыхом по телефону, снимал сериалы с друзьями, гриферил, строил города, школы, играл в прятки, стримил, Херобрин взламывал сервер, играл с читами (Flux b4), снимал разные видосы, выживал на серверах и много, много чего ещё.",
                },
                {
                    title: "The Elder Scrolls V: Skyrim",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/489830/",
                },
                {
                    title: "Dota 2",
                    review: "Это не игра, а кусок кала, в который я наиграл уже 4к+ часов. Увы не могу просто взять и перестать играть, слишком много времени на неё потратил.",
                },
                {
                    title: "Elden Ring",
                    review: "Не было такой игры, по которой я посмотрел очень много видосов перед тем как купить и самому поиграть + то кол-во времени, которое я потратил на неё, прошло с диким кайфом. Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1245620/",
                },
                {
                    title: "Tiny Bunny",
                    review: "Одна из первых и лучших визуальных новелл, что я играл. Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1421250/",
                },
                {
                    title: "CRISIS CORE –FINAL FANTASY VII– REUNION",
                    review: "Ревью - ",
                },
            ],
            'A': [
                {
                    title: "The Last of Us Part I",
                    review: "Лучшая сюжетная игра. Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1888930/",
                },
                {
                    title: "FINAL FANTASY VII REBIRTH",
                    review: "Сюжет ремейка 7-ой финалки крутой, но из-за того что она разделена на части, но не могу всю серию поставить в 1 ряд. 2-ая часть лучше 1-ой. Ревью - https://steamcommunity.com/id/serhiosergey/recommended/2909400/",
                },
                {
                    title: "Stellar Blade",
                    review: "Эта игра выше других соулсов только, потому что я там играл за красивую женщину, и был нормальный сюжет. Ревью - https://steamcommunity.com/id/serhiosergey/recommended/3489700/",
                },
                {
                    title: "Lies of P",
                    review: "Ниже Евы только из-за персонажа. Геймплей ближе к даркам, что мне более приятно. Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1627720/",
                },
                {
                    title: "Dark Souls III",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/374320/",
                },
                {
                    title: "FINAL FANTASY VII REMAKE INTERGRADE",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1462040/",
                },
                {
                    title: "Baldur's Gate III",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1086940/",
                },
                {
                    title: "Dark Souls: Remastered",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/570940/",
                },
                {
                    title: "Dark Souls II: Scholar of the First Sin",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/335300/",
                },
                {
                    title: "Cyberpunk 2077",
                    review: "Крутая атмосфера игра с хорошей музыкой и персонажами. Моя 1-ая концовка просто дроп с крыши. Есть возможность создавать разные билды.",
                },
                {
                    title: "CODE VEIN",
                    review: "Ревью - ",
                },
                {
                    title: "Hollow Knight: Silksong",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1030300/",
                },
                {
                    title: "Atomic Heart",
                    review: "Хорошая игра с не самыми интересным сюжетом, но с большим кол-вом фарма, что я люблю. Отличные саунды. Ревью - https://steamcommunity.com/profiles/76561199512523461/recommended/668580/",
                },
                {
                    title: "Sea of Thieves",
                    review: "В этой игре и подраться можно, и квесты попроходить, и просто поболтать, плавая по океану.",
                },
                {
                    title: "Elden Ring NIGHTREIGN",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/2622380/",
                },
                {
                    title: "Raft",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/648800/",
                },
                {
                    title: "It takes two",
                    review: "Игра для парочек, поэтому играл с дуругом.",
                },
                {
                    title: "Dispatch",
                    review: "Я не фанат супергеройки, но эта игра мне понравилась. Я не могу сказать, что она какая-то особенная, но она и не плохая. Самая обычная игра. У неё есть красивая картинка, запоминающиеся саундтреки и персонажи. Сюжет простой. В конце игры я убил Полога и остался с Блейзер. Так как эту игру купил мой друг на свой аккаунт, за что ему большое спасибо (кстати, с Днём Рождения :D), то я не буду проходить её на все ачивки и открывать все концовки. Посмотрю все возможные выборы на ютубе. Касаемо выбора романтических линий, то мне не хватило возможности сближаться с другими персонажами (конечно, я имею в виду женского пола), но думаю разрабы специально так сделали. Геймплейные элементы с подбором героев на мисси были интересными. Ещё могу сказать, что озвучка от 'NikiStudio' очень хорошая, но на момент написания обзора (08.06.2026) есть только 2 эпизода из 8. Нейро-озвучка плохая + в игре есть проблема с русскими субтитрами. Поэтому половины игры проходил на русском, половину на английском. Ставлю игре... 7/10.",
                },
                {
                    title: "Tomb Raider (2013)",
                    review: "Частичное ревью - https://steamcommunity.com/id/serhiosergey/recommended/750920/",
                },
                {
                    title: "Sekiro: shadows die twice",
                    review: "Одна из самых неинтересных мне игр Бабадзаки. Короткая, заточена на парирование, но  всё равно прикольная. Ревью - https://steamcommunity.com/profiles/76561199512523461/recommended/814380/",
                },
                {
                    title: "Valorant",
                    review: "Почти любая сессионка/соревновательная игра будет хуже  сюжетных. Поэтому она так низка в тире.",
                },
                {
                    title: "Marvel Rivals",
                    review: "Офигенные скины.",
                },
                {
                    title: "Honkai Star Rail",
                    review: "Стой, стой, стой. Дай всё объясню. На выходе мне игра понравилась даже больше чем геншин. Она не такая душная, нет открытого мира. Быстро зашёл, прошёл и вышел. И я прошёл HSR за пол года. Собрал 2 пачки, прокачал и закрыл карту. Вот и всё. Сейчас я бы в неё не смог играть с таким же рвением. Видос по ней - https://www.youtube.com/watch?v=nuKPX3VKD7g",
                },
                {
                    title: "Genshin Impact",
                    review: "Стой, стой, стой. Дай всё объясню. В 1-ые года я дико кайфовал от этой игры. Играл по 12 часов всё лето 2023 года. была бы возможность скипать все диалоги, то я бы вернулся и просто чистил карту. Видос по игре - https://www.youtube.com/watch?v=8dmlRNb8beY",
                },
                {
                    title: "Slime Rancher",
                    review: "Прикольная игра на расслабон. Проходил очень много раз.",
                },
            ],
            'B': [
                {
                    title: "Everlasting Summer",
                    review: "2-ая моя визуальная новелла после Зайчика. Моя 1-ая концовка - плохая концовка с пионером, любимая - плохая с Леной.",
                },
                {
                    title: "Dishonored",
                    review: "Мега атмосферная игра с интересным геймплеем.",
                },
                {
                    title: "Resident Evil Village",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1196590/",
                },
                {
                    title: "Resident Evil 4 Remake",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/2050650/",
                },
                {
                    title: "Sons of the Forest",
                    review: "Играл с другом 7+ часов подряд, было весело, но он уже не осилил прохождение, а одному играть скучно.",
                },
                {
                    title: "Ghost of Tsushima",
                    review: "Ревью - https://steamcommunity.com/profiles/76561199512523461/recommended/2215430/",
                },
                {
                    title: "Shadow of the Tomb Raider",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/750920/",
                },
                {
                    title: "Rise of the Tomb Raider",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/750920/",
                },
                {
                    title: "Divinity: Original Sin 2",
                    review: "Мене интереснее, чем БГ3. Самому играть в неё скучно, поэтому играл с другом. Поиграли 20+ часов, поссорились и на этом всё.",
                },
                {
                    title: "Resident Evil 6",
                    review: "Проходили с другом, было весело. Но это пока самая слабая, неинтересная часть RE, а ещё я с этой части понял насколько много в этой серии игр самоповторов.",
                },
                {
                    title: "Subnautica 2",
                    review: "Играли с другом, по началу было не понятно, но спустя пару часиков понравилось. Играли почти с самого релиза, так что контента было не так много, но всё равно достаточно.",
                    img: "games/Subnautica_2.jpg",
                },
                {
                    title: "Lords of the Fallen",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1501750/",
                },
                {
                    title: "Hollow Knight",
                    review: "",
                },
                {
                    title: "Slime Rancher 2",
                    review: "Прикольная игра на расслабон, но 1ая часть атмосферней + не такая вырвиглазная.",
                },
                {
                    title: "Terraria",
                    review: "Спустя 200+ часов понял, что эта игра мне не нравится. Однотипная фармёжка ради прокачки сета, оружия и артифактов. Боссы в ваниле скучные. Моды фиксят эту проблему, но не до конца.",
                },
                {
                    title: "SWORD ART ONLINE Alicization Lycoris",
                    review: "Смотрел я как-то давно одно ютубера по САО 'Tim Fairy', даже донатил ему 1 раз. Сама игра понравилась.",
                },
                {
                    title: "Warhammer 40,000: Space Marine 2",
                    review: "Хорошая игра, но не стоит своих денег, даже за 67% скидку оч дорого, т.к. там сюжета на +-10 часов. Игра красивая, оптимизированная. Играл с другом, было весело.",
                },
                {
                    title: "MiSide",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/2527500/",
                },
                {
                    title: "Shape of Dreams: Prologue",
                    review: "Зашёл, пару раз пробежался, удалил и так каждый раз через пару месяцев.",
                },
                {
                    title: "Aragami",
                    review: "Играл с другом, было весело. Игра атмосферная.",
                },
                {
                    title: "Escape the Backrooms",
                    review: "Смешная игра. Играть только с друзьями!",
                },
                {
                    title: "My Therapy",
                    review: "Прикольная игрушка, но есть только пролог. Жду продолжение.",
                },
                {
                    title: "PEAK",
                    review: "",
                    img: "games/PEAK.jpg",
                },
                {
                    title: "Golf With Your Friends",
                    review: "",
                },
                {
                    title: "God of War",
                    review: "Отличная графика, атмосфера, музыка, но после середины стало скучно играть, хз почему.",
                },
                {
                    title: "Bioshock Infinite",
                    review: "Хорошая игра, но я её так и не прошёл до конца, но когда-нибудь пройду!",
                },
                {
                    title: "Inmost",
                    review: "Атмосферная, но короткая игра.",
                },
                {
                    title: "Gunfire Reborn",
                    review: "",
                },
                {
                    title: "Ship of Fools",
                    review: "",
                    img: "games/Ship_of_Fools.avif",
                },
                {
                    title: "Voidtrain",
                    review: "",
                },
                {
                    title: "Uno",
                    review: "",
                },
                {
                    title: "Among Us",
                    review: "",
                },
                {
                    title: "Liar's Bar",
                    review: "",
                },
                {
                    title: "Pummel Party",
                    review: "",
                },
                {
                    title: "Grounded",
                    review: "",
                },
                {
                    title: "Kingdom two Crowns",
                    review: "",
                },
                {
                    title: "Heroes of Might and Magic 3: Complete",
                    review: "",
                },
                {
                    title: "Northgard",
                    review: "",
                },
            ],
            'C': [
                {
                    title: "Kena: Bridge of Spirits",
                    review: "Невероятная графика, но оптимизация хромает. Атмосфера игра и музыка норм.",
                },
                {
                    title: "Portal 2",
                    review: "Кайфовая игрушка, но не более. Финальная песня кайф.",
                },
                {
                    title: "The Quarry",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1577120/",
                },
                {
                    title: "The Dark Pictures Anthology: House of Ashes",
                    review: "не самая интересная часть картинок, но типо норм. много нелогичных моментов + я в начале не понял как делать выбор на джойстике. У меня в конце выжило 4 человека, 1го я убил случайно, потому что не понял что от меня хотят, а 2 других умерли просто так. Я никак не мог их спасти. В цонце началось солнечное затмение и на сколько что это нереалистичный сюжетный поворот. Игра на любителя.",
                },
                {
                    title: "Steelrisng",
                    review: "коротко по игре. она простая, ну уж слишком. после 6 часов прохождения я повысил 3 параметра на 6ый уровень и оружие на 5ый, после чего я просто пробегал всю карту и не отвлекался на врагов, боссы умирали с 1ой попытки. баланс в игре сломанный. враги и боссы легко умирают от расходников, наложения холода в начале игры с помощью огнестрельного оружия - имба. потом мы юзаем ледяные или любые другие гранаты. сюжет незамысловатый. графика плохая, как и оптимизация. в инете говорили, что все локации одинаковые, но я с этим согласен на половину. в игре достаточно разнообразия, но из-за одно цветокора, игра чувствуется везде одинаковой. но вот последния локация красивая. разнообразие оружия и одежды маленькое. также в инете говорили, что не понятно куда идти, но на самом деле всё оч просто, если юзать компас. игра прикольная, но слабая. за 57 грн норм, но не за фулл прайс. за DLC ничего говорить не буду, не играл. во-первых, не хочу, во-вторых, не понял как в него попасть) 6/10",
                },
                {
                    title: "little nightmares II",
                    review: "Управление всё портит. Так то игра атмосферная и интересная, лучше 1ой.",
                },
                {
                    title: "little nightmares",
                    review: "Управление всё портит. Так то игра атмосферная и интересная.",
                },
                {
                    title: "Aragami 2",
                    review: "Хуже чем 1-ая часть. Даже не знаю чем. Мб из-за того что нет развития. Почти нет отличий от 1-ой.",
                },
                {
                    title: "Dishonored 2",
                    review: "Всё теже механику, может чутка больше динамик. Но после 1-ой части скучная.",
                },
                {
                    title: "Soulcalibur VI",
                    review: "",
                },
                {
                    title: "Neceasse",
                    review: "",
                },
                {
                    title: "Sword Art Online: Fatal Bullet",
                    review: "Подумал, что будет прикольно, по типу алисизации, но нет.",
                },
                {
                    title: "Still Wakes the Deep",
                    review: "Типо хоррор игра, которая не пугает. А концовка в ней кал. Прошёл чисто из-за того, что друг попросил. 4 часа жизни в пустую.",
                },
                {
                    title: "Fran Bow",
                    review: "Смотреть видосы интереснее, чем играть самому.",
                },
                {
                    title: "Abyssus",
                    review: "",
                },
                {
                    title: "Roboquest",
                    review: "",
                },
                {
                    title: "Pic Me",
                    review: "",
                },
                {
                    title: "We Were Here Expeditions: The FriendShip",
                    review: "",
                },
                {
                    title: "We Were Here Forever",
                    review: "",
                },
                {
                    title: "Sally Face",
                    review: "Смотреть видосы интереснее, чем играть самому.",
                },
                {
                    title: "Trine 4: The Nightmare Prince",
                    review: "",
                },
                {
                    title: "Higurashi When They Cry Hou - Ch.1",
                    review: "",
                },
                {
                    title: "Higurashi When They Cry Hou - Ch.2",
                    review: "",
                },
                {
                    title: "Higurashi When They Cry Hou - Ch.3",
                    review: "https://kiwwij.github.io/kiwwij-anime-tier-list/terminal.html",
                },
                {
                    title: "Higurashi When They Cry Hou - Ch.4",
                    review: "https://kiwwij.github.io/kiwwij-anime-tier-list/naebalova.net",
                },
                {
                    title: "Higurashi When They Cry Hou - Ch.5",
                    review: "",
                },
                {
                    title: "Higurashi When They Cry Hou - Ch.6",
                    review: "",
                },
                {
                    title: "Higurashi When They Cry Hou - Ch.7",
                    review: "",
                },
                {
                    title: "Higurashi When They Cry Hou - Ch.8",
                    review: "",
                },
                {
                    title: "Higurashi When They Cry Hou - Rei",
                    review: "",
                },
                {
                    title: "Higurashi When They Cry Hou - Hou+",
                    review: "",
                    img: "games/Higurashi_When_They_Cry_Hou+.jpg",
                },
                {
                    title: "Slender: The Eight Pages",
                    review: "Не оригинальная игра. Прошёл 2 из 3-ёх локаций. Карты почти не отличаются. Игра слишком простая.",
                    img: "games/Slender_The_Eight_Pages.jpg",
                },
            ],
            'D': [
                {
                    title: "NieR:Automata",
                    review: "Когда-то дам 4-ый шанс этой игре. Небольшое ревью - https://telegra.ph/NieRAutomata-review-03-01",
                },
                {
                    title: "FINAL FANTASY® XIII",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/292120/",
                    img: "games/FINAL_FANTASY_XIII.jpg",
                },
                {
                    title: "Resident Evil Requiem",
                    review: "Небольшое ревью - https://telegra.ph/Resident-Evil-Requiem-review-04-01",
                    img: "games/Resident_Evil_Requiem.jpg",
                },
                {
                    title: "Knock-knock",
                    review: "За выслугу лет. Крутая страшная игра с прикольным сюжетом. Когда-то снимал видосы по ней.",
                },
                {
                    title: "The Dark Queen of Mortholme",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/3587610/",
                    img: "games/The_Dark_Queen_of_Mortholme.jpg",
                },
                {
                    title: "Red Hood's Woods",
                    review: "Небольшое раскрытие персонажа из БС 1. Причины все те же.",
                    img: "games/Red_Hood's_Woods.png",
                },
                {
                    title: "Black Souls I",
                    review: "Почти прошёл, но если бы в игре не было pdf моментов, было бы даже не стыдно говорить, что я играл в эту игру.",
                    img: "games/Black_Souls_I.jpg",
                },
                {
                    title: "Plague Inc: Evolved",
                    review: "Добавил чисто за выслугу лет. Поиграть чуть-чуть, но не больше.",
                },
                {
                    title: "Resident Evil 3",
                    review: "Я уже устал от резиков, так что дропнул эту часть, но она не самая плохая.",
                },
                {
                    title: "Reus",
                    review: "За выслугу лет.",
                },
                {
                    title: "READY OR NOT",
                    review: "Играли с другом, прошли 2-3 миссии и застряли. Ну и решили дропнуть, но в целом неплохая игра.",
                },
                {
                    title: "The Elder Scrolls IV: Oblivion Remastered",
                    review: "Небольшое ревью - https://telegra.ph/The-Elder-Scrolls-IV-Oblivion-Remastered-review-03-14",
                },
                {
                    title: "S.T.A.L.K.E.R. 2: Heart of Chornobyl",
                    review: "На минимальных 30 фпс. Пытался пройти. Оценки нет, поэтому и внизу топа.",
                },
            ],
            'E': [
                {
                    title: "Humans are not that against Lizardwomen 2",
                    review: "Пик игровой индустрии 2.",
                    img: "games/Humans_are_not_that_against_Lizardwomen2.jpg",
                },
                {
                    title: "Humans are not that against Lizardwomen",
                    review: "Пик игровой индустрии.",
                    img: "games/Humans_are_not_that_against_Lizardwomen.jpg",
                },
                {
                    title: "Magicka 2",
                    review: "Играли с другом, не зашло.",
                },
                {
                    title: "Your Mother",
                    review: "",
                },
                {
                    title: "Chasing Tails ~A Promise in the Snow~",
                    review: "",
                    img: "games/Chasing_Tails_A-Promise_in_the_Snow.webp",
                },
                {
                    title: "Bongo Cat",
                    review: "Думал себе на стримы вместо вебки выводить.",
                },
                {
                    title: "Stalker",
                    review: "Мне Илья подарил на др. Обязан был пройти. Но игра такая залупа.",
                },
                {
                    title: "HENTAI - World War II",
                    review: "",
                },
                {
                    title: "Hitler is My Crush: Love and Fascism",
                    review: "",
                    img: "games/Hitler_is_My_Crush_Love_and_Fascism.jpg",
                },
            ],
            'F': [
                {
                    title: "Final Fantasy XV Windows Edition",
                    review: "Небольшое ревью - https://telegra.ph/FINAL-FANTASY-XV-WINDOWS-EDITION-review-03-13",
                },
                {
                    title: "Counter-Strike 2",
                    review: "Потраченного времени жаль. Пятикратно переваренный кал. Ревью - https://steamcommunity.com/id/serhiosergey/recommended/730/",
                },
                {
                    title: "Black Myth: Wukong",
                    review: "Китайский солуслайк про мартышку. Ну... не, некайф.",
                },
                {
                    title: "Bioshock Remastered",
                    review: "Скучная игра.",
                },
                {
                    title: "Read Dead Redemption 2",
                    review: "Я пытался пройти эту игру, потратил 18 часов, но не смог. Унылый кал, как и ГТА.",
                    img: "games/Read_Dead_Redemption2.webp",
                },
                {
                    title: "The Witcher 3: Wild Hunt",
                    review: "Пытался пройти несколько раз, но не моё. Управление чувствуется не как в условно Скайриме. Буду ждать 4-ую часть. А там ещё гг Цири! ммм))))",
                },
                {
                    title: "Styx: Shards of Darkness",
                    review: "Скучная игра, думал будет лучше.",
                },
                {
                    title: "Far Cry 5",
                    review: "Играл с другом, но по какой-то причине дропнули.",
                },
                {
                    title: "Reanimal",
                    review: "Те же маленькие кошмары, только скучнее. Управление всё ещё неудобное. Я в моменте тильтанул и не захотел играть дальше. Радует что есть френд пасс.",
                },
                {
                    title: "The Elder Scrolls Online",
                    review: "Ещё одно MMORPG, которое мне не понравилось. В него просто скучно играть.",
                },
                {
                    title: "Hogwarts Legacy",
                    review: "Просто скучная.",
                },
                {
                    title: "Rainbow Six Siege",
                    review: "",
                },
                {
                    title: "Astroneers",
                    review: "Скучная игра. Если поиграть подольше, то мб понравилась бы, а так есть игру ко-оп игры.",
                },
                {
                    title: "No Rest for the Wicked",
                    review: "Пытались пройти с другом. Потратили 2 часа для того чтобы понят куда идти по сюжету, 10 мин чё-то посмотрели, а потом снова не поняли куда идти. -1к+ грн",
                },
                {
                    title: "Rust",
                    review: "",
                },
                {
                    title: "Grand Theft Auto V",
                    review: "Я не понимаю как можно играть в игры серии ГТА. Это унылое говно.",
                },
            ],
        }
    };
}