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
                    review: "Я не знаю сколько времени провёл в этой игре как сам, так и с другими людьмы. Я играл по телефону со Жмыхом по телефону, снимал сериалы с друзьями, гриферил, строил города, школы, играл в прятки, стримил, Херобрин взламывал сервер, играл с читами (Flux b4), снимал разные видосы и много, много чего ещё.",
                },
                {
                    title: "The Elder Scrolls V: Skyrim",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/489830/",
                },
                {
                    title: "Elden Ring",
                    review: "Не было такой игры, по которой я посмотрел невероятно много видосов перед тем как купить и самому поиграть + то кол-во времени, которое я потратил на неё, прошло с диким кайфом. Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1245620/",
                },
                {
                    title: "Dota 2",
                    review: "Это не игра, а кусок кала, в который я наиграл уже 3к+ часов. Увы не могу просто взять и перестать играть.",
                },
                {
                    title: "Tiny Bunny",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1421250/",
                },
            ],
            'A': [
                {
                    title: "FINAL FANTASY VII REBIRTH",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/2909400/",
                },
                {
                    title: "FINAL FANTASY VII REMAKE INTERGRADE",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1462040/",
                },
                {
                    title: "The Last of Us Part I",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1888930/",
                },
                {
                    title: "Stellar Blade",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/3489700/",
                },
                {
                    title: "Lies of P",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1627720/",
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
                    title: "Dark Souls III",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/374320/",
                },
                {
                    title: "Dark Souls II: Scholar of the First Sin",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/335300/",
                },
                {
                    title: "Cyberpunk 2077",
                    review: "Невертоятная графика, атмосфера, музыка и персонажи. Моя 1ая концовка просто дроп с крыши. Разные билды + моды дают повод несколько раз перепройти.",
                },
                {
                    title: "Atomic Heart",
                    review: "Ревью - https://steamcommunity.com/profiles/76561199512523461/recommended/668580/",
                },
                {
                    title: "Hollow Knight: Silksong",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1030300/",
                },
                {
                    title: "It takes two",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "Sea of Thieves",
                    review: "Играл с другом, даже не с одним, было весело.",
                },
                {
                    title: "Elden Ring NIGHTREIGN",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/2622380/",
                },
                {
                    title: "Sekiro: shadows die twice",
                    review: "Ревью - https://steamcommunity.com/profiles/76561199512523461/recommended/814380/",
                },
                {
                    title: "Valorant",
                    review: "Играл с другом, даже не с одним, было весело.",
                },
                {
                    title: "Marvel Rivals",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Raft",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/648800/",
                },
                {
                    title: "Tomb Raider (2013)",
                    review: "Частичное ревью - https://steamcommunity.com/id/serhiosergey/recommended/750920/",
                },
                {
                    title: "Slime Rancher",
                    review: "Прикольная игра на расслабон. Проходил очень много раз.",
                },
                {
                    title: "Terraria",
                    review: "Кайфовая игра на расслабон с друзьями.",
                },
                {
                    title: "Honkai Star Rail",
                    review: "Стой, стой, стой. Дай всё объясню. На выходе мне игра понравилась даже больше чем геншин. Он не такой душный, нет открытого мира. Быстро зашёл, прошёл и вышел. И я прошёл HSR за пол года. Собрал 2 пачки, прокачал и закрыл карту. Вот и всё. Сейчас я бы в неё не смог играть.",
                },
                {
                    title: "Genshin Impact",
                    review: "Стой, стой, стой. Дай всё объясню. В 1ые года я дико кайфовал от этого кала, играл по 12 часов каждый день. Сейчас я бы в неё не смог играть, но вот раньше...",
                },
            ],
            'B': [
                {
                    title: "CRISIS CORE –FINAL FANTASY VII– REUNION",
                    review: "Ревью - ",
                },
                {
                    title: "Dishonored",
                    review: "Мега атмосферная игра с интересным геймплеем.",
                },
                {
                    title: "Ghost of Tsushima",
                    review: "Ревью - https://steamcommunity.com/profiles/76561199512523461/recommended/2215430/",
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
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Resident Evil 6",
                    review: "Проходили с другом, было весело. Но это пока самая слабая, неинтересная часть RE, а ещё я с этой части понял насколько много в этой серии игр самоповтора.",
                },
                {
                    title: "Shadow of the Tomb Raider",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/750920/",
                },
                {
                    title: "Rise of the Tomb Raider",
                    review: "Частичное ревью - https://steamcommunity.com/id/serhiosergey/recommended/750920/",
                },
                {
                    title: "Divinity: Original Sin 2",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "SWORD ART ONLINE Alicization Lycoris",
                    review: "Смотрел я как-то давно одно ютубера по САО 'Tim Fairy', даже донатил ему 1 раз. Сама игра понравилась, надобы её когда-нибудь перепройти.",
                },
                {
                    title: "Warhammer 40,000: Space Marine 2",
                    review: "Хорошая игра, но не стоит своих денег, даже за 67% скидку оч дорого, т.к. сюжета на +-10 часов. Играл с другом, было весело. Игра красивая, оптимизированная.",
                },
                {
                    title: "Aragami",
                    review: "Играл с другом, было весело и атмосферно.",
                },
                {
                    title: "God of War",
                    review: "Отличная графика, атмосфера, музыка, но после середины стало скучно играть, хз почему. В некст части скорее всего играть не буду.",
                },
                {
                    title: "Lords of the Fallen",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1501750/",
                },
                {
                    title: "MiSide",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/2527500/",
                },
                {
                    title: "My Therapy",
                    review: "Прикольная игрушка, но есть только пролог. Жду продолжение.",
                },
                {
                    title: "Inmost",
                    review: "Атмосферная игра, но короткая.",
                },
                {
                    title: "Slime Rancher 2",
                    review: "Прикольная игра на расслабон, но 1ая часть атмосферней + не такая вырвиглазная.",
                },
                {
                    title: "Everlasting Summer",
                    review: "2ая моя визуальная новелла после Зайчика. Моя концовка - плохая концовка с пионером.",
                },
                {
                    title: "Hollow Knight",
                    review: "Кайфовая метроидвания с атмосферой.",
                },
                {
                    title: "Shape of Dreams: Prologue",
                    review: "Играл с другом, что-то по типу RoR2. (название игры в стиме без 'Prologue')",
                },
                {
                    title: "Soulcalibur VI",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Gunfire Reborn",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Kingdom two Crowns",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Ship of Fools",
                    review: "Играл с другом, было весело.",
                    img: "games/Ship_of_Fools.avif",
                },
                {
                    title: "Abyssus",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Neceasse",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Grounded",
                    review: "Играл с другом даже не с 1, было весело, но в целом игра искучная. 2ую часть игра не буду.",
                },
                {
                    title: "Escape the Backrooms",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "PEAK",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Golf With Your Friends",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Pummel Party",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Liar's Bar",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Uno",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Among Us",
                    review: "Играл с другом, даже не с одним, было весело.",
                },
                {
                    title: "Heroes of Might and Magic 3: Complete",
                    review: "Играл со знакомым, неплохо.",
                },
                {
                    title: "Voidtrain",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Roboquest",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Pic Me",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "We Were Here Expeditions: The FriendShip",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "We Were Here Forever",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Trine 4: The Nightmare Prince",
                    review: "Играл с другом, было весело."
                },
                {
                    title: "Bioshock Infinite",
                    review: "Хорошая игра, но я её так и не прошёл до конца, но когда-нибудь пройду!",
                },
                {
                    title: "Northgard",
                    review: "Играл с другом, было весело. Прикольная стратегия.",
                },
                {
                    title: "Rainbow Six Siege",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Far Cry 5",
                    review: "Играл с другом, было весело.",
                },
            ],
            'C': [
                {
                    title: "Kena: Bridge of Spirits",
                    review: "Невероятная графика, но оптимизация хромает. Атмосфера и музыка норм.",
                },
                {
                    title: "Portal 2",
                    review: "Кайфовая игрушка, но не более. Финальная песня кайф. Кстати, надобы в 1ую часть поиграть.",
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
                    review: "коротко по игре. она простая, ну уж слишком. после 6 часов прохождения я повысил 3 параметра на 6ый уровень и оружие на 5ый, после чего я просто пробегал всю карту и не отвлекался на врагов, боссы умирали с 1ой попытки. баланс в игре сломанный. враги и боссы легко умирают от расходников, наложения холода в начале игры с помощью огнестрельного оружия - имба. потом мы юзаем ледянные или любые другие гранаты. сюжет незамысловатый. графика плохая, как и оптимизация. в инете говорили, что все локации одинаковые, но я с этим согласен на половину. в игре достаточно разнообразия, но из-за одно цветокора, игра чувствуется везде одинаковой. но вот последния локация красивая. разнообразие оружия и одежды маленькое. также в инете говорили, что не понятно куда идти, но на самом деле всё оч просто, если юзать компас. игра прикольная, но слабая. за 57 грн норм, но не за фулл прайс. за DLC ничего говорить не буду, не играл. во-первых, не хочу, во-вторых, не понял как в него попасть) 6/10",
                },
                {
                    title: "little nightmares II",
                    review: "Управление всё портит. Так то игра атмосферная, лучше 1ой.",
                },
                {
                    title: "little nightmares",
                    review: "Управление всё портит. Так то игра атмосферная.",
                },
                {
                    title: "Aragami 2",
                    review: "Хуже чем 1ая часть.",
                },
                {
                    title: "Dishonored 2",
                    review: "Все теже механику, но больше динамик, чтоли. Но скучная.",
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
                    review: "Атмосферная игра, но скучная.",
                },
                {
                    title: "Sally Face",
                    review: "Скучная игра, думал будет лучше.",
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
                    title: "Styx: Shards of Darkness",
                    review: "Скучная игра, думал будет лучше.",
                },
            ],
            'D': [
                {
                    title: "FINAL FANTASY® XIII",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/292120/",
                    img: "games/FINAL_FANTASY_XIII.jpg",
                },
                {
                    title: "Resident Evil Requiem",
                    review: "Небольшое ревью - https://telegra.ph/Resident-Evil-Requiem-review-04-01",
                },
                {
                    title: "The Elder Scrolls IV: Oblivion Remastered",
                    review: "Небольшое ревью - https://telegra.ph/The-Elder-Scrolls-IV-Oblivion-Remastered-review-03-14",
                },
                {
                    title: "NieR:Automata",
                    review: "Небольшое ревью - https://telegra.ph/NieRAutomata-review-03-01",
                },
                {
                    title: "The Dark Queen of Mortholme",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/3587610/",
                },
                {
                    title: "Knock-knock",
                    review: "Добавил чисто за выслугу лет. Крутая страшная игра с прикольным сюжетом. Прошёл на платину.",
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
                    title: "S.T.A.L.K.E.R. 2: Heart of Chornobyl",
                    review: "На минимальных 30 фпс. Пытался пройти.",
                },
                {
                    title: "Hogwarts Legacy",
                    review: "Пытался пройти несколько раз, но не моё.",
                },
                {
                    title: "Resident Evil 3",
                    review: "Я уже устал от резиков, так что дропнул эту часть, но она не самая плохая.",
                },
                {
                    title: "Black Myth: Wukong",
                    review: "Пытался пройти, но не моё.",
                },
                {
                    title: "The Elder Scrolls Online",
                    review: "Пытался пройти несколько раз, но не моё.",
                },
                {
                    title: "Astroneers",
                    review: "Играл с другом, даже не с одним, было весело, но скучно.",
                },
                {
                    title: "Reus",
                    review: "За выслугул лет.",
                },
                {
                    title: "Bioshock Remastered",
                    review: "Пытался пройти, но не моё.",
                },
            ],
            'E': [
                {
                    title: "Humans are not that against Lizardwomen",
                    review: "Пик игровой индустрии.",
                    img: "games/Humans_are_not_that_against_Lizardwomen.jpg",
                },
                {
                    title: "Humans are not that against Lizardwomen 2",
                    review: "Пик игровой индустрии 2.",
                    img: "games/Humans_are_not_that_against_Lizardwomen2.jpg",
                },
                {
                    title: "Magicka 2",
                    review: "Играли с другом, не зашло.",
                },
                {
                    title: "Your Mother",
                    review: "Купил в рофл. Прошёл на платину в рофл.",
                },
                {
                    title: "Chasing Tails ~A Promise in the Snow~",
                    review: "",
                },
                {
                    title: "HENTAI - World War II",
                    review: "",
                },
                {
                    title: "Hitler is My Crush: Love and Fascism",
                    review: "",
                },
                {
                    title: "Stalker",
                    review: "Мне Илья подарил, это не моё. А почему играл? Ну это же подарок, так что и поиграл.",
                },
                {
                    title: "Bongo Cat",
                    review: "Думал себе на стримы вместо вебки выводить.",
                },
            ],
            'F': [
                {
                    title: "Final Fantasy XV Windows Edition",
                    review: "Небольшое ревью - https://telegra.ph/FINAL-FANTASY-XV-WINDOWS-EDITION-review-03-13",
                },
                {
                    title: "Counter-Strike 2",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/730/",
                },
                {
                    title: "The Witcher 3: Wild Hunt",
                    review: "Пытался пройти несколько раз, но не моё.",
                },
                {
                    title: "Read Dead Redemption 2",
                    review: "Пытался пройти несколько раз (18 часов игры), но не моё.",
                    img: "games/Read_Dead_Redemption2.webp",
                },
                {
                    title: "No Rest for the Wicked",
                    review: "Пытались пройти с другом. Потратили 2 часа для тог чтобы понят куда идти по сюжету, 10 мин чё-то посомтрели, а потом снова не поняли куда идти. -1к+ грн",
                },
                {
                    title: "Rust",
                    review: "",
                },
                {
                    title: "Grand Theft Auto V",
                    review: "Кал",
                },
            ],
        }
    };
}