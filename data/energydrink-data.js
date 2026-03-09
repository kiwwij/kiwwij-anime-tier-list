const energyRatingScales = {
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
        { rank: 'Могу пить вечно', color: 'bg-red-500' },
        { rank: 'Вкусно', color: 'bg-orange-500' },
        { rank: 'Пить можно', color: 'bg-yellow-400' },
        { rank: 'Можно попробовать', color: 'bg-green-500' },
        { rank: 'Не моё', color: 'bg-blue-500' },
        { rank: 'Кал', color: 'bg-purple-500' },
        { rank: 'Никогда больше', color: 'bg-gray-600' }
    ]
};


if (typeof tierListData !== 'undefined') {
    
    tierListData['Энергетики'] = {
        'S': [
            { 
                title: "Дисклеймер!", 
                review: "Чё могу сказать по поводу энергетиков? Как по мне, их покупка и употребление не стоит свеч, особенно таких овер хайп, как monster и burn. Все вкусы, которые я попробовал, были не то чтобы вау + эффекта бодрости я не ощущал, наоборот мне хотелось спать. В энергетиках очень много сахара, да есть 'zero sugar', но какая разница? Он как будто дает вам энергию взаймы — сначала вы очень бодры, но тело быстро тратит этот сахар, и у вас кончается топливо. Становится только хуже, чем было. А из-за того, что у меня этого топлива не так уж и много, то я сразу устаю, мб из-за этого. Я в жизни много чего пытался коллекционировать, например: монеты или щёлкалки в зажигалках, но получилось только с бананачками из-под энергетиков. Потратил я на это 'хобби' 1к+ грн, пока что. Мне нравится, но вам не советую.", 
                img: "energydrink/disclaimer.jpg"
            },
            { 
                title: "Monster MangoLoco", 
                review: "Самый интересный вкус, но на постояннке я бы не смог его пить.", 
                img: "energydrink/Monster MangoLoco.webp"
            },
            { 
                title: "Burn Apple Kiwi", 
                review: "Самый лучший вкус бёрна, который я пробовал.", 
                img: "energydrink/Burn Apple Kiwi.webp"
            },
            { 
                title: "Mojo м'ята-лайм", 
                review: "Хоть это и не энергетик, но зато это вкусная химозная херня.", 
                img: "energydrink/Mojo м'ята-лайм.png"
            },
            { 
                title: "«Моршинська» сильногазована", 
                review: "Напиток Богов.", 
                img: "energydrink/Моршинська.webp"
            },
        ],
        'A': [
            { 
                title: "Monster Energy", 
                review: "Самый классический вкус. Ничего интересного", 
                img: "energydrink/Monster Energy.webp"
            },
            { 
                title: "Monster Energy Zero sugar", 
                review: "Самый классический вкус, только без сахара. Ничего интересного.", 
                img: "energydrink/Monster Energy Zero sugar.webp"
            },
            { 
                title: "Monster Energy Bad Apple", 
                review: "Конфетка дюшес растворённая в воде, вкусно.", 
                img: "energydrink/Monster Energy Bad Apple.png"
            },
            { 
                title: "Monster Energy Monster Ultra", 
                review: "Думал самый вкусный, но на деле дефолт. Перехайплен.", 
                img: "energydrink/Monster Energy Monster Ultra.png"
            },
            { 
                title: "Monster Energy Salted Caramel", 
                review: "Скажем так, этот монстр куда вкуснее того, что с коффе 3Х. Монстр с карамелью тоже желательно пить тёплым или горячим. Если бы не его цена в 200грн по скидке, то я бы его каждый день пил бы. Ну реально вкусно.", 
                img: "energydrink/Monster Energy Salted Caramel.png"
            },
        ],
        'B': [
            { 
                title: "Monster Energy Rio Punch", 
                review: "Обычный вкус, ничего интересного.", 
                img: "energydrink/Monster Energy Rio Punch.webp"
            },
            { 
                title: "Burn манго", 
                review: "Как и говорил, почти все вкусны похожи друг на друга, поэтому хз чё добавить.", 
                img: "energydrink/Burn манго.webp"
            },
            { 
                title: "Burn Dark еnergy", 
                review: "Как и говорил, почти все вкусны похожи друг на друга, поэтому хз чё добавить.", 
                img: "energydrink/Burn Dark еnergy.webp"
            },
            { 
                title: "Burn Fruit Punch", 
                review: "Как и говорил, почти все вкусны похожи друг на друга, поэтому хз чё добавить.", 
                img: "energydrink/Burn Fruit Punch.webp"
            },
            { 
                title: "Burn Guava", 
                review: "Как и говорил, почти все вкусны похожи друг на друга, поэтому хз чё добавить.", 
                img: "energydrink/Burn Guava.webp"
            },
            { 
                title: "Non Stop Zoom", 
                review: "Прикольный арбузный вкус с мятным послевкусием.", 
                img: "energydrink/Non Stop Zoom.webp"
            },
            { 
                title: "Monster Energy Juiced Khaotic", 
                review: "Обычный цитрусо-тропический вкус, ничего. Пить можно, но не на постоянной основе, как по мне.", 
                img: "energydrink/Monster Energy Juiced Khaotic.png"
            },
            { 
                title: "Monster Energy Ultra Fiesta Mango", 
                review: "", 
                img: "energydrink/Monster Energy Ultra Fiesta Mango.png"
            },
            ],
        'C': [
            { 
                title: "Monster Energy Nitro", 
                review: "Почти такой же как дефолтный, но с горчинкой.", 
                img: "energydrink/Monster Energy Nitro.webp"
            },
            { 
                title: "Monster Energy Ultra Rosa", 
                review: "Нормальный, но слишком сладкий, даже если zero sugar.", 
                img: "energydrink/Monster Energy Ultra Rosa.webp"
            },
            { 
                title: "Burn Original", 
                review: "на удивление почти все энергетики данного бренда одинаковые, кроме оригинального. Он чутка хуже других.", 
                img: "energydrink/Burn Original.webp"
            },
            { 
                title: "Monster Energy Peachy Keen", 
                review: "Прикольеный, но сладковатый вкус. Чисто на 1 раз.", 
                img: "energydrink/Monster Energy Peachy Keen.webp"
            },
            { 
                title: "Non Stop Stalker Green", 
                review: "Вот уже реально вкус лайма.", 
                img: "energydrink/Non Stop Stalker Green.webp"
            },
            { 
                title: "Monster Energy Mega Lo-Carb", 
                review: "Этот энергети мне подарил одногрупник на День Рождения, и скажем так, бессплатно всегда вкусно. Но если по факту, запах очень странный, а вкус самый дефолтный. Какой у глюкозу вкус? Вску сахара? Есть ароматизатор женьшеня.", 
                img: "energydrink/Monster Energy Mega Lo-Carb.webp"
            },
            { 
                title: "Non Stop 20 Years", 
                review: "Вишнёвый вкус, а если быть точнее, то смесь ягод: вишня, малина, ежевика, черника. Как обычно горькое послевкусие. А между глотком и послевкусием вкус какой-то конфеты, не могу понять какой. Нет маленькой баночки.", 
                img: "energydrink/Non Stop 20 Years.webp"
            },
            {
                title: "Non Stop Spark",
                review: "Сладкий вкус ананаса, даже без горького послевкусия, как обычно. Нет маленькой баночки.",
                img: "energydrink/Non Stop Spark.webp"
            },
            { 
                title: "Monster Energy 300 Java French Vanilla Triple Shot",
                review: "Прикольный монстр со вкусом... какао, хоть и написано что кофе. Советую пить горячем. Не понимаю, почему цена такая дорогая? 200 грн! Ужас просто!",
                img: "energydrink/Monster Energy 300 Java French Vanilla Triple Shot.png"
            },
        ],
        'D': [
            { 
                title: "Burn Orange fire", 
                review: "Горьковатый.", 
                img: "energydrink/Burn Orange fire.webp"
            },
            { 
                title: "Monster Energy Pacific Punch", 
                review: "Чисто из-за привкуса вишни, не моё.", 
                img: "energydrink/Monster Energy Pacific Punch.png"
            },
            { 
                title: "Non Stop Jungle Evolution Fresh", 
                review: "Зёлная баночка, но вкус лимонный (там нет лайма), для меня это странно. Горьковатый.", 
                img: "energydrink/Non Stop Jungle Evolution Fresh.webp"
            },
            { 
                title: "Non Stop", 
                review: "Ровно такой же как и Джангл. Горьковатый.", 
                img: "energydrink/Non Stop.webp"
            },
            { 
                title: "Non Stop Boost", 
                review: "Вкус ананас, гуава. А по факту как обычный и джангл, только менее горький. Меня это даже уже бесит.", 
                img: "energydrink/Non Stop Boost.webp"
            },
            ],
        'E': [
            { 
                title: "Monster Energy The Doctor", 
                review: "Горький, не моё.", 
                img: "energydrink/Monster Energy The Doctor.webp"
            },
            { 
                title: "Monster Energy Juice Aussie Lemonade", 
                review: "Такой же как и Доктор, но менее горький, не моё.", 
                img: "energydrink/Monster Energy Juice Aussie Lemonade.webp"
            },
            ],
        'F': []
    };

// } else {
//     console.error("Ошибка: energydrink-data.js не смог найти tierListData.");
}