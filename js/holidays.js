document.addEventListener('DOMContentLoaded', () => {
    checkHolidays();
});

function checkHolidays() {
    const today = new Date();
    const month = today.getMonth() + 1; 
    const day = today.getDate();

    // --- НАСТРОЙКИ ДАТ ---
    // День рождения: 02.12
    const myBirthday = { month: 12, day: 2 }; 
    const birthYear = 2006; 
    
    // Новый год: с 24 декабря по 7 января
    const isNewYear = (month === 12 && day >= 24) || (month === 1 && day <= 7);
    const isBirthday = (month === myBirthday.month && day === myBirthday.day);

    if (isBirthday) {
        const age = today.getFullYear() - birthYear;
        activateBirthdayMode(age);
    } else if (isNewYear) {
        activateNewYearMode(month, day);
    }
}

function activateBirthdayMode(age) {
    console.log(`🎉 С Днём Рождения! Исполнилось ${age} лет.`);
    
    // Эффекты (работают на всех страницах)
    createParticles('confetti', true); 
    addHat('🥳', true); 
    
    // Уведомление (только на главной)
    showToast("🎉 С Днём Рождения меня!", `Сегодня мне исполнилось ${age} лет!`);
}

function activateNewYearMode(month, day) {
    console.log("🎄 С Новым Годом!");
    
    // Эффекты (работают на всех страницах)
    createParticles('snow', false); 
    addHat('🎅', false); 
    
    // Уведомление (только на главной)
    if (month === 1 && day === 1) {
        showToast("🎄 С Новым Годом!", "Пусть этот год принесет новые победы!");
    } else {
        if (month === 12) {
             showToast("🎄 С наступающим Новым Годом!", "Праздничное настроение активировано.");
        } else {
             showToast("🎄 С Новым Годом!", "Желаю всего наилучшего в новом году!");
        }
    }
}

// --- ФУНКЦИЯ СОЗДАНИЯ ЧАСТИЦ ---
function createParticles(type, autoRemove = true) {
    const oldContainer = document.getElementById('holiday-container');
    if (oldContainer) oldContainer.remove();

    const container = document.createElement('div');
    container.id = 'holiday-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100vh'; // На всю высоту экрана
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    container.style.overflow = 'hidden';
    container.style.opacity = '0'; // Для анимации появления
    container.style.transition = 'opacity 2s ease-out';
    
    document.body.appendChild(container);

    // Анимация появления
    requestAnimationFrame(() => {
        container.style.opacity = '1';
    });

    if (autoRemove) {
        setTimeout(() => {
            container.style.opacity = '0';
            setTimeout(() => {
                if (container) container.remove();
            }, 2000);
        }, 10000);
    }

    const colors = ['#ef4444', '#f472b6', '#3b82f6', '#10b981', '#fbbf24', '#8b5cf6'];
    const symbols = ['❄', '❅', '❆', '•']; 

    const particleCount = type === 'snow' ? 30 : 40;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.classList.add('holiday-particle');
        
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = (Math.random() * 5 + 3) + 's'; 
        p.style.animationDelay = Math.random() * 5 + 's'; 
        
        if (type === 'confetti') {
            p.classList.add('confetti');
            p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            p.style.transform = `rotate(${Math.random() * 360}deg)`;
        } else {
            p.classList.add('snowflake');
            p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            p.style.opacity = Math.random() * 0.7 + 0.3;
            p.style.fontSize = (Math.random() * 1 + 0.5) + 'em';
        }

        container.appendChild(p);
    }
}

// --- ДОБАВЛЕНИЕ ШЛЯПКИ ---
function addHat(emoji, autoRemove = true) {
    const headerTitle = document.querySelector('header h1');
    
    if (headerTitle) {
        if (headerTitle.querySelector('.holiday-hat')) return;

        if (getComputedStyle(headerTitle).position === 'static') {
            headerTitle.style.position = 'relative';
        }
        
        const hat = document.createElement('div');
        hat.classList.add('holiday-hat');
        hat.textContent = emoji;
        hat.style.opacity = '0'; // Для анимации
        hat.style.transition = 'opacity 2s ease-out';
        
        if (emoji === '🎅') {
            hat.style.left = '-25px'; 
            hat.style.top = '-35px';
        }
        
        headerTitle.appendChild(hat);

        // Анимация появления
        requestAnimationFrame(() => {
            hat.style.opacity = '1';
        });

        if (autoRemove) {
            setTimeout(() => {
                hat.style.opacity = '0';
                setTimeout(() => hat.remove(), 2000);
            }, 10000);
        }
    }
}

// --- ВСЛЫВАЮЩЕЕ СООБЩЕНИЕ ---
function showToast(title, message) {
    // ПРОВЕРКА: Показываем ТОЛЬКО на главной странице
    // Ищем элемент, который есть только на главной (tierListContainer)
    if (!document.getElementById('tierListContainer')) return;

    const oldToast = document.querySelector('.holiday-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'holiday-toast';
    
    // Стили окна (Адаптивные)
    toast.style.padding = '1.5rem';
    toast.style.width = 'auto';          
    toast.style.minWidth = '300px';      // Поменьше для мобилок
    toast.style.maxWidth = '90vw';       // Чтобы не вылезало за экран
    toast.style.display = 'flex';        
    toast.style.alignItems = 'flex-start'; // Выравнивание по верху
    toast.style.justifyContent = 'space-between';
    toast.style.gap = '15px';
    
    // Анимация
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    
    toast.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="font-weight:bold; font-size:1.2em; line-height: 1.2;">${title}</div>
            <div style="font-size:1.05em; opacity:0.9; line-height: 1.4;">${message}</div>
        </div>
        <div class="holiday-toast-close" onclick="this.parentElement.style.opacity='0'; setTimeout(()=>this.parentElement.remove(), 500)" style="font-size: 1.5em; cursor: pointer; line-height: 1;">✕</div>
    `;
    document.body.appendChild(toast);
    
    // Анимация появления
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });
    
    // Автоскрытие через 10 секунд
    setTimeout(() => {
        if (toast && document.body.contains(toast)) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)'; // Уезжает вниз
            setTimeout(() => {
                if (document.body.contains(toast)) toast.remove();
            }, 500);
        }
    }, 10000);
}
