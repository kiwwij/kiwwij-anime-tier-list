// 1. Создаем уникальную переменную для шкал ИГР
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
        { rank: 'Могу играть бесконечно', color: 'bg-red-500' },
        { rank: 'Дикий кайф', color: 'bg-orange-500' },
        { rank: 'Крепкий проект', color: 'bg-yellow-400' },
        { rank: 'Прошёл и забыл', color: 'bg-green-500' },
        { rank: 'В этом что-то есть', color: 'bg-blue-500' },
        { rank: 'Рофло игра', color: 'bg-purple-500' },
        { rank: 'Alt+F4 и Рефанд', color: 'bg-gray-600' }
    ]
};

// 2. Добавляем данные, если основной объект существует
if (typeof tierListData !== 'undefined') {
    
    tierListData['Игры'] = {
        type: 'game', // Важный флаг для API RAWG
        data: {
            'S': [
                {
                    title: "Minecraft",
                    review: "Кайфовая игра на расслабон с друзьями. Свыше 7к часов. Прошёл на платину.",
                },
                {
                    title: "The Elder Scrolls V: Skyrim",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/489830/",
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
                    title: "Elden Ring",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1245620/",
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
                    review: "Невертоятная графика, атмосфера, музыка и персонажи. Моя 1ая концовка просто дроп с крыши. Разные билды + моды дают повод несколько раз перепройти. Прошёл на платину.",
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
                    title: "Sekiro: shadows die twice",
                    review: "Ревью - https://steamcommunity.com/profiles/76561199512523461/recommended/814380/",
                },
                {
                    title: "Elden Ring NIGHTREIGN",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/2622380/",
                },
                {
                    title: "Valorant",
                    review: "Играл с другом, даже не с одним, было весело.",
                },
                {
                    title: "Marvel Rivals",
                    review: "Играл с другом, было весело. Прошёл на платину.",
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
                    review: "Прикольная игра на расслабон. Проходил очень много раз.Прошёл на платину.",
                },
                {
                    title: "Terraria",
                    review: "Кайфовая игра на расслабон с друзьями. Прошёл на платину.",
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
                    title: "Dishonored",
                    review: "Мега атмосферная игра с интересным геймплеем. Прошёл на платину.",
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
                    review: "Играл с другом, было весело. Прошёл на платину.",
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
                    review: "Смотрел я как-то давно одно ютубера по САО 'Tim Fairy', играл понравилась, поиграл. Прошёл на платину.",
                },
                {
                    title: "Aragami",
                    review: "Играл с другом, было весело и атмосферно. Прошёл на платину.",
                },
                {
                    title: "God of War",
                    review: "Отличная графика, атмосфера, музыка, но после середины было скучновато. Прошёл на платину.",
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
                    review: "Атмосферная игра, но короткая. Прошёл на платину.",
                },
                {
                    title: "Slime Rancher 2",
                    review: "Прикольная игра на расслабон, но 1ая часть атмосферней. Прошёл на платину.",
                },
                {
                    title: "Everlasting Summer",
                    review: "2ая моя визуальная новелла после Зайчика. Моя концовка - плохая концовка с пионером. Прошёл на платину.",
                },
                {
                    title: "Hollow Knight",
                    review: "Кайфовая метроидвания с атмосферой. Прошёл на платину.",
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
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "Kingdom two Crowns",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "Ship of Fools",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                    img: "games/Ship_of_Fools.avif",
                },
                {
                    title: "Abyssus",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Neceasse",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "Grounded",
                    review: "Играл с другом даже не с 1, было весело. Прошёл на платину.",
                },
                {
                    title: "Escape the Backrooms",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "PEAK",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "Golf With Your Friends",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "Pummel Party",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "Liar's Bar",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "Uno",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "Among Us",
                    review: "Играл с другом, даже не с одним, было весело.",
                },
                {
                    title: "Heroes of Might and Magic 3: Complete",
                    review: "Играл со знакомым, неплохо. Прикольная стратегия.",
                },
                {
                    title: "Voidtrain",
                    review: "Играл с другом, было весело.",
                },
                {
                    title: "Roboquest",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "Pic Me",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "We Were Here Expeditions: The FriendShip",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "We Were Here Forever",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "Trine 4: The Nightmare Prince",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                {
                    title: "Bioshock Infinite",
                    review: "",
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
                    review: "Невероятная графика, но оптимизация хромает. Атмосфера и музыка норм. Прошёл на платину.",
                },
                {
                    title: "Portal 2",
                    review: "Кайфовая игрушка, но не более. Финальная песня кайф. Прошёл на платину.",
                },
                {
                    title: "The Quarry",
                    review: "Ревбю - https://steamcommunity.com/id/serhiosergey/recommended/1577120/",
                },
                {
                    title: "little nightmares II",
                    review: "Управление всё портит. Так то игра атмосферная, лучше 1ой. Прошёл на платину.",
                },
                {
                    title: "little nightmares",
                    review: "Управление всё портит. Так то игра атмосферная. Прошёл на платину.",
                },
                {
                    title: "Aragami 2",
                    review: "Хуже чем 1ая часть. Прошёл на платину.",
                },
                {
                    title: "Dishonored 2",
                    review: "Все теже механику, но больше динамик, чтоли. Но скучная. Прошёл на платину.",
                },
                {
                    title: "Sword Art Online: Fatal Bullet",
                    review: "Подумал, что будет прикольно, по типу алисизации, но нет. Прошёл на платину.",
                },
                {
                    title: "Still Wakes the Deep",
                    review: "Типо хоррор игра, которая не пугает. А концовка в ней кал. Прошёл чисто из-за того, что друг попросил. 4 часа жизни в пустую.",
                },
                {
                    title: "Fran Bow",
                    review: "Атмосферная игра, но скучная. Прошёл на платину.",
                },
                {
                    title: "Sally Face",
                    review: "Скучная игра, думал будет лучше. Прошёл на платину.",
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
                    review: "Скучная игра, думал будет лучше. Прошёл на платину.",
                },
            ],
            'D': [
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
                    review: "Почти прошёл, но если бы в игре не было pdf моментов, было бы даже не стыдно говорить, что я прошёл эту игру.",
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
                    title: "Black Myth: Wukong",
                    review: "Пытался пройти, но не моё.",
                },
                {
                    title: "The Elder Scrolls Online",
                    review: "Пытался и не 1 раз пройти, но не моё.",
                },
                {
                    title: "Astroneers",
                    review: "Играл с другом, даже не с одним, было весело.",
                },
                {
                    title: "Reus",
                    review: "За выслугул лет. Поиграть чуть-чуть, но не больше.",
                },
                {
                    title: "Bioshock Remastered",
                    review: "Пытался пройти, но не моё.",
                },
            ],
            'E': [
                {
                    title: "Final Fantasy XV Windows Edition",
                    review: "Пытался поиграть, но не понравилось.",
                },
                {
                    title: "Humans are not that against Lizardwomen",
                    review: "Пик игровой индустрии. Платина.",
                    img: "games/Humans_are_not_that_against_Lizardwomen.jpg",
                },
                {
                    title: "Humans are not that against Lizardwomen 2",
                    review: "Пик игровой индустрии 2. Платина.",
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
                    review: "Платина.",
                },
                {
                    title: "HENTAI - World War II",
                    review: "Платина.",
                },
                {
                    title: "Hitler is My Crush: Love and Fascism",
                    review: "Купил в рофл. Прошёл на платину в рофл.",
                },
                {
                    title: "Stalker",
                    review: "Мне Илья подарил, это не моё. Платина.",
                },
                {
                    title: "Bongo Cat",
                    review: "Думал себе на стримы вместо вебки выводить. Платина.",
                },
            ],
            'F': [
                {
                    title: "Lords of the Fallen",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/1501750/",
                },
                {
                    title: "Counter-Strike 2",
                    review: "Ревью - https://steamcommunity.com/id/serhiosergey/recommended/730/",
                },
                {
                    title: "Read Dead Redemption 2",
                    review: "Пытался пройти несколько раз (18 часов игры), но не моё.",
                    img: "games/Read_Dead_Redemption2.webp",
                },
                {
                    title: "The Witcher 3: Wild Hunt",
                    review: "Пытался пройти несколько раз, но не моё.",
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