try {
    document.addEventListener('DOMContentLoaded', () => {
        checkHolidays();
        initMadnessTimer();
    });
} catch (e) {
    console.error("Holiday script error:", e);
}

function checkHolidays() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // Новый год: с 24 декабря по 7 января
    const isNewYear = (month === 12 && day >= 24) || (month === 1 && day <= 7);
    const isBirthday = (month === 12 && day === 2);

    if (isBirthday) {
        activateBirthdayMode(today.getFullYear() - 2006);
    } else if (isNewYear) {
        activateNewYearMode(month, day);
    }
}

function activateBirthdayMode(age) {
    // true означает автоудаление через 10 секунд
    createParticles('confetti', true);
    addHat('🥳', true);
    showToast("🎉 С Днём Рождения!", `Мне сегодня ${age}!`);
}

function activateNewYearMode(month, day) {
    // true означает автоудаление через 10 секунд
    createParticles('snow', true); 
    addHat('🎅', true);
    showToast("🎄 Праздники", "Новогодний режим активен. Снег закончится через 10 сек.");
}

function createParticles(type, autoRemove = true) {
    const container = document.createElement('div');
    container.id = 'holiday-container';
    Object.assign(container.style, {
        position: 'fixed',
        top: '0', left: '0', width: '100%', height: '100vh',
        pointerEvents: 'none', zIndex: '9999', overflow: 'hidden',
        opacity: '1', transition: 'opacity 2s ease-out'
    });
    document.body.appendChild(container);

    const count = type === 'snow' ? 40 : 50;
    const symbols = ['❄', '❅', '❆'];

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'holiday-particle';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = (Math.random() * 5 + 3) + 's';
        p.style.animationDelay = Math.random() * 5 + 's';
        
        if (type === 'snow') {
            p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            p.style.color = 'white';
            p.style.fontSize = (Math.random() * 1 + 1) + 'em';
        } else {
            p.style.background = ['#ef4444', '#fbbf24', '#3b82f6'][Math.floor(Math.random() * 3)];
            p.style.width = '10px'; p.style.height = '10px'; p.style.borderRadius = '2px';
        }
        container.appendChild(p);
    }

    // Автоудаление через 10 секунд
    if (autoRemove) {
        setTimeout(() => {
            container.style.opacity = '0';
            setTimeout(() => container.remove(), 2000);
        }, 10000);
    }
}

function addHat(emoji, autoRemove = true) {
    const h1 = document.querySelector('header h1');
    if (h1 && !h1.querySelector('.holiday-hat')) {
        h1.style.position = 'relative';
        const hat = document.createElement('span');
        hat.className = 'holiday-hat';
        hat.textContent = emoji;
        hat.style.cssText = 'position:absolute; left:-35px; top:-10px; transition: opacity 2s;';
        h1.appendChild(hat);

        if (autoRemove) {
            setTimeout(() => {
                hat.style.opacity = '0';
                setTimeout(() => hat.remove(), 2000);
            }, 10000);
        }
    }
}

function showToast(title, msg) {
    const oldToast = document.querySelector('.holiday-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    // Добавляем стили и кнопку закрытия
    toast.className = 'holiday-toast';
    toast.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; 
        background: #1f2937; color: white; padding: 15px 20px; 
        border-radius: 12px; z-index: 10001; border: 1px solid #6366f1; 
        box-shadow: 0 10px 25px rgba(0,0,0,0.5); display: flex; 
        align-items: center; gap: 15px; animation: slideIn 0.5s ease-out;
    `;
    
    toast.innerHTML = `
        <div>
            <b style="display:block; margin-bottom:4px;">${title}</b>
            <span style="font-size:0.9rem; opacity:0.8;">${msg}</span>
        </div>
        <div onclick="this.parentElement.remove()" style="cursor:pointer; font-weight:bold; padding:5px; line-height:1;">✕</div>
    `;
    
    document.body.appendChild(toast);
    
    // Автоскрытие уведомления тоже через 10 сек
    setTimeout(() => {
        if (toast) {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }
    }, 10000);
}

function initMadnessTimer() {
    if (window.location.pathname.includes('madness.html')) return;
    setTimeout(() => {
        if (Math.random() < 0.1) {
            document.body.style.filter = 'invert(1) contrast(2)';
            setTimeout(() => { window.location.href = 'madness.html'; }, 2000);
        }
    }, 300000); // 5 минут
}