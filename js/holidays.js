document.addEventListener('DOMContentLoaded', () => {
    checkHolidays();
});

function checkHolidays() {
    const today = new Date();
    const month = today.getMonth() + 1; // Месяцы от 0 до 11
    const day = today.getDate();

    // --- НАСТРОЙКИ ДАТ ---
    // День рождения: 2 декабря
    const myBirthday = { month: 12, day: 2 }; 
    const birthYear = 2006; // Год рождения
    
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
    createParticles('confetti', true); 
    addHat('🥳', true); 
    showToast("🎉 С Днём Рождения меня!", `Сегодня мне исполнилось ${age} лет!`);
}

function activateNewYearMode(month, day) {
    console.log("🎄 С Новым Годом!");
    createParticles('snow', false); // Снег
    addHat('🎅', false); // Шапка
    
    // ЛОГИКА СООБЩЕНИЙ
    if (month === 1 && day === 1) {
        showToast("🎄 С Новым Годом!", "Пусть этот год принесет новые победы и аниме!");
    } else {
        if (month === 12) {
             showToast("🎄 С наступающим Новым Годом!", "Праздничное настроение активировано.");
        } else {
             showToast("🎄 С Новым Годом!", "Желаю всем отличного нового гоад!");
        }
    }
}

// --- ФУНКЦИЯ СОЗДАНИЯ ЧАСТИЦ ---
function createParticles(type, autoRemove = true) {
    // Удаляем старый контейнер
    const oldContainer = document.getElementById('holiday-container');
    if (oldContainer) oldContainer.remove();

    const container = document.createElement('div');
    container.id = 'holiday-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    container.style.overflow = 'hidden';
    container.style.transition = 'opacity 2s ease-out';
    
    document.body.appendChild(container);

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
        hat.style.transition = 'opacity 2s ease-out';
        
        if (emoji === '🎅') {
            hat.style.left = '-25px'; 
            hat.style.top = '-35px';
        }
        
        headerTitle.appendChild(hat);

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
    const oldToast = document.querySelector('.holiday-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'holiday-toast';
    
    toast.style.padding = '1rem 2rem';
    toast.style.width = 'auto';          
    toast.style.minWidth = '400px';      
    toast.style.maxWidth = '90vw';       
    toast.style.display = 'flex';        
    toast.style.alignItems = 'center';
    toast.style.justifyContent = 'space-between';
    toast.style.gap = '20px';
    toast.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    
    toast.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 5px;">
            <div style="font-weight:bold; font-size:1.2em;">${title}</div>
            <div style="font-size:1.1em; opacity:0.9;">${message}</div>
        </div>
        <div class="holiday-toast-close" onclick="this.parentElement.style.opacity='0'; setTimeout(()=>this.parentElement.remove(), 1000)" style="font-size: 1.5em; cursor: pointer;">✕</div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast && document.body.contains(toast)) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)'; 
            setTimeout(() => {
                if (document.body.contains(toast)) toast.remove();
            }, 1000);
        }
    }, 10000);
}