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
        { rank: 'Прошёл на платину', color: 'bg-orange-500' },
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
                    title: "The Elder Scrolls V: Skyrim",
                    review: "Играл в Скайрим всё детство, прошёл всего лишь несколько раз. Наиграл +-7к часов, да на пиратке, но всё же. Огромный мир, бесконечные возможности, разные билды, секреты мира + моды делают эту игру вечной классикой. Прошёл на платину.",
                    // img: "games/my_game.jpg" Если не найдет в API, возьмет это
                },
                { 
                    title: "Dota 2",
                    review: "Это не игра, а кусок кала, в который я наиграл уже 3к+ часов. Увы не могу просто взять и перестать играть.",
                },
                { 
                    title: "Baldur's Gate III",
                    review: "Игра затянула с первых минут. Великолепный сюжет с развилками, персонажи, атмосфера и геймплей, билды + моды дают повод несколько раз перепройти. Прошёл на платину.",
                },
                { 
                    title: "Elden Ring",
                    review: "1ая солус лайк игра от Бабадзаки. После того как я прошёл все ДСы, я понял, что по факту соулс лайки игры не такие уж и сложные. Прошёл на платину + все DLC.",
                },
                { 
                    title: "Minecraft",
                    review: "Кайфовая игра на расслабон с друзьями. Свыше 7к часов. Прошёл на платину.",
                },
                { 
                    title: "Terraria",
                    review: "Кайфовая игра на расслабон с друзьями. Прошёл на платину.",
                },
                { 
                    title: "Tiny Bunny",
                    review: "Невероятная визуальная новелла. Прошёл на платину.",
                },
                { 
                    title: "Sea of Thieves",
                    review: "Играл с другом, даже не с одним, было весело.",
                },
            ],
            'A': [
                { 
                    title: "The Last of Us Part I",
                    review: "Невероятная графика, атмосфера, сюжет и персонажи.",
                },
                { 
                    title: "Atomic Heart",
                    review: "Отличная графика, атмосфера, музыка, неплохой сюжет и некоторые персонажи.",
                },
                { 
                    title: "Cyberpunk 2077",
                    review: "Невертоятная графика, атмосфера, музыка и персонажи. Моя 1ая концовка просто дроп с крыши. Разные билды + моды дают повод несколько раз перепройти. Прошёл на платину.",
                },
                { 
                    title: "Dark Souls: Remastered",
                    review: "Самая простая, но самая атмосферная часть серии. Прошёл на платину + все DLC.",
                },
                { 
                    title: "Dark Souls II: Scholar of the First Sin",
                    review: "Самая сложная часть серии. Прошёл на платину + все DLC.",
                },
                { 
                    title: "Dark Souls III",
                    review: "По атмосфере топ, но не дотягивает до 1ой части. Прошёл на платину + все DLC.",
                },
                { 
                    title: "FINAL FANTASY VII REMAKE INTERGRADE",
                    review: "Отличная графика, оптимизация, музыка могла бы быть лучше. Милые персонажи. Прошёл на платину.",
                },
                { 
                    title: "Hollow Knight: Silksong",
                    review: "Кайфовая метроидвания с атмосферой. Прошёл на платину.",
                },
                { 
                    title: "It takes two",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                { 
                    title: "Lies of P",
                    review: "Дарк соул про Пиноккио. Прошёл на платину. 1ое DLC было очень интересным, жду 2ое.",
                },
                { 
                    title: "Raft",
                    review: "Кайфовая игра на выживание с друзьями. Прошёл на платину.",
                },
                { 
                    title: "Tomb Raider (2013)",
                    review: "Кайфовая игра про Лару Крофт. Прошёл на платину.",
                },
                { 
                    title: "Slime Rancher",
                    review: "Прикольная игра на расслабон. Проходил очень много раз.Прошёл на платину.",
                },
            ],
            'B': [
                { 
                    title: "Aragami",
                    review: "Играл с другом, было весело и атмосферно. Прошёл на платину.",
                },
                { 
                    title: "Dishonored",
                    review: "Мега атмосферная игра с интересным геймплеем. Прошёл на платину.",
                },
                { 
                    title: "Elden Ring NIGHTREIGN",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                { 
                    title: "Escape the Backrooms",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                { 
                    title: "Everlasting Summer",
                    review: "2ая моя визуальная новелла после Зайчика. Моя концовка - плохая концовка с пионером. Прошёл на платину.",
                },
                { 
                    title: "God of War",
                    review: "Отличная графика, атмосфера, музыка, но после середины было скучновато. Прошёл на платину.",
                },
                { 
                    title: "Grounded",
                    review: "Играл с другом даже не с 1, было весело. Прошёл на платину.",
                },
                { 
                    title: "Gunfire Reborn",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                { 
                    title: "Hollow Knight",
                    review: "Кайфовая метроидвания с атмосферой. Прошёл на платину.",
                },
                { 
                    title: "Inmost",
                    review: "Атмосферная игра, но короткая. Прошёл на платину.",
                },
                { 
                    title: "Kingdom two Crowns",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                { 
                    title: "MiSide",
                    review: "Прикольная игрушка. Прошёл на платину. Жду продолжение.",
                },
                { 
                    title: "My Therapy",
                    review: "Прикольная игрушка, но есть только пролог. Жду продолжение.",
                },
                { 
                    title: "Neceasse",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                { 
                    title: "Resident Evil 4 Remake",
                    review: "Отличная графика, атмосфера, музыка и персонажи. Но бывали вилеты, хард сложность - просто больше хп и кол-во мобов. Прошёл на платину.",
                },
                { 
                    title: "Resident Evil Village",
                    review: "Чутка лучше, чем 4ая часть. Прошёл на платину.",
                },
                { 
                    title: "Rise of the Tomb Raider",
                    review: "Кайфовая игра про Лару Крофт в горах, но чутка кучнее 1ой части. Прошёл на платину.",
                },
                { 
                    title: "Sekiro: shadows die twice",
                    review: "Кайфовая игра, но что-то не моё, не могу поставить на уровень ДСов. Прошёл бы на платину, если была бы на моём аккаунте.",
                },
                { 
                    title: "Ship of Fools",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                    img: "games/Ship_of_Fools.avif"
                },
                { 
                    title: "Slime Rancher 2",
                    review: "Прикольная игра на расслабон, но 1ая часть атмосферней. Прошёл на платину.",
                },
                { 
                    title: "Sons of the Forest",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                { 
                    title: "SWORD ART ONLINE Alicization Lycoris",
                    review: "Смотрел я как-то давно одно ютубера по САО 'Tim Fairy', играл понравилась, поиграл. Прошёл на платину.",
                },
                { 
                    title: "Trine 4: The Nightmare Prince",
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
                    title: "Marvel Rivals",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                { 
                    title: "Golf With Your Friends",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                { 
                    title: "Liar's Bar",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                { 
                    title: "PEAK",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                { 
                    title: "Pic Me",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                { 
                    title: "Pummel Party",
                    review: "Играл с другом, было весело. Прошёл на платину.",
                },
                { 
                    title: "Roboquest",
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
                    title: "Bioshock Infinite",
                    review: "",
                },
                { 
                    title: "Divinity: Original Sin 2",
                    review: "Играл с другом, было весело.",
                },
                { 
                    title: "Far Cry 5",
                    review: "Играл с другом, было весело.",
                },
                { 
                    title: "Northgard",
                    review: "Играл с другом, было весело. Прикольная стратегия.",
                },
                { 
                    title: "Heroes of Might and Magic 3: Complete",
                    review: "Играл со знакомым, неплохо. Прикольная стратегия.",
                },
                { 
                    title: "Soulcalibur VI",
                    review: "Играл с другом, было весело.",
                },
                { 
                    title: "Rainbow Six Siege",
                    review: "Играл с другом, было весело.",
                },
                { 
                    title: "Voidtrain",
                    review: "Играл с другом, было весело.",
                },
                { 
                    title: "Valorant",
                    review: "Играл с другом, даже не с одним, было весело.",
                },
            ],
            'C': [
                { 
                    title: "Aragami 2",
                    review: "Хуже чем 1ая часть. Прошёл на платину.",
                },
                { 
                    title: "Dishonored 2",
                    review: "Все теже механику, но больше динамик, чтоли. Но скучная. Прошёл на платину.",
                },
                { 
                    title: "Fran Bow",
                    review: "Атмосферная игра, но скучная. Прошёл на платину.",
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
                    review: "",
                },
                { 
                    title: "Higurashi When They Cry Hou - Ch.4",
                    review: "",
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
                    title: "Kena: Bridge of Spirits",
                    review: "Невероятная графика, но оптимизация хромает. Атмосфера и музыка норм. Прошёл на платину.",
                },
                { 
                    title: "little nightmares",
                    review: "Управление всё портит. Так то игра атмосферная. Прошёл на платину.",
                },
                { 
                    title: "little nightmares II",
                    review: "Управление всё портит. Так то игра атмосферная, лучше 1ой. Прошёл на платину.",
                },
                { 
                    title: "Portal 2",
                    review: "Кайфовая игрушка, но не более. Финальная песня кайф. Прошёл на платину.",
                },
                { 
                    title: "The Quarry",
                    review: "Кайфовая игрушка, была бы, если бы выборы роляли, а не иллюзия выбора. Прошёл на платину.",
                },
                { 
                    title: "Sally Face",
                    review: "Скучная игра, думал будет лучше. Прошёл на платину.",
                },
                { 
                    title: "Styx: Shards of Darkness",
                    review: "Скучная игра, думал будет лучше. Прошёл на платину.",
                },
                { 
                    title: "Sword Art Online: Fatal Bullet",
                    review: "Подумал, что будет прикольно, по типу алисизации, но нет. Прошёл на платину.",
                },
            ],
            'D': [
                { 
                    title: "The Dark Queen of Mortholme",
                    review: "Прикольная игра, но слишком короткая. Платина. Концепт 10/10, Реализация 4/10, Диалоги 4/10.",
                },
                { 
                    title: "Knock-knock",
                    review: "Добавил чисто за выслугу лет. Крутая страшная игра с прикольным сюжетом. Прошёл на платину.",
                },
                { 
                    title: "Plague Inc: Evolved",
                    review: "Добавил чисто за выслугу лет. Поиграть чуть-чуть, но не больше.",
                },
                { 
                    title: "Hogwarts Legacy",
                    review: "Пытался пройти несколько раз, но не моё.",
                },
                { 
                    title: "Astroneers",
                    review: "Играл с другом, даже не с одним, было весело.",
                },
                { 
                    title: "Bioshock Remastered",
                    review: "Пытался пройти, но не моё.",
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
                    title: "S.T.A.L.K.E.R. 2: Heart of Chornobyl",
                    review: "На минимальных 30 фпс. Пытался пройти.",
                },
                { 
                    title: "Reus",
                    review: "За выслугул лет. Поиграть чуть-чуть, но не больше.",
                },
                { 
                    title: "Black Souls I",
                    review: "Почти прошёл, но если бы в игре не было pdf моментов, было бы даже не стыдно говорить, что я прошёл эту игру.",
                    img: "games/Black_Souls_I.jpg"
                },
                { 
                    title: "Red Hood's Woods",
                    review: "Небольшое раскрытие персонажа из БС 1. Причины все те же.",
                    img: "games/Red_Hood's_Woods.png"
                },
            ],
            'E': [
                { 
                    title: "Your Mother",
                    // ruTitle: "Ваша Мать",
                    review: "Купил в рофл. Прошёл на платину в рофл.",
                },
                { 
                    title: "Hitler is My Crush: Love and Fascism",
                    review: "Купил в рофл. Прошёл на платину в рофл.",
                    // img: "games/Hitler_is_my_crush.jpg"
                },
                { 
                    title: "Humans are not that against Lizardwomen",
                    review: "Пик игровой индустрии. Платина.",
                    img: "games/Humans_are_not_that_against_Lizardwomen.jpg"
                },
                { 
                    title: "Humans are not that against Lizardwomen 2",
                    review: "Пик игровой индустрии 2. Платина.",
                    img: "games/Humans_are_not_that_against_Lizardwomen2.jpg"
                },
                { 
                    title: "HENTAI - World War II",
                    review: "Платина.",
                },
                { 
                    title: "Bongo Cat",
                    review: "Думал себе на стримы вместо вебки выводить. Платина.",
                },
                { 
                    title: "Chasing Tails ~A Promise in the Snow~",
                    review: "Платина.",
                },
                { 
                    title: "Stalker",
                    review: "Мне Илья подарил, это не моё. Платина.",
                },
                { 
                    title: "Final Fantasy XV Windows Edition",
                    review: "Пытался поиграть, но не понравилось.",
                },
                { 
                    title: "Magicka 2",
                    review: "Играли с другом, не зашло.",
                },
            ],
            'F': [
                { 
                    title: "Counter-Strike 2",
                    review: "1к часов в пустую.",
                },
                { 
                    title: "The Witcher 3: Wild Hunt",
                    review: "Пытался пройти несколько раз, но не моё.",
                },
                { 
                    title: "Read Dead Redemption 2",
                    review: "Пытался пройти несколько раз (18 часов игры), но не моё.",
                    img: "games/Read_Dead_Redemption2.webp"
                },
                { 
                    title: "Grand Theft Auto V",
                    review: "Кал",
                },
                { 
                    title: "Rust",
                    review: "",
                },
            ]
        }
    };
}