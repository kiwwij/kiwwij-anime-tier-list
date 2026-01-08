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

    const isNewYear = (month === 12 && day >= 27) || (month === 1 && day <= 3);
    const isBirthday = (month === 12 && day === 2);

    if (isBirthday) {
        activateBirthdayMode(today.getFullYear() - 2006);
    } else if (isNewYear) {
        activateNewYearMode(month, day);
    }
}

function activateBirthdayMode(age) {
    createParticles('confetti', true);
    addHat('🥳', true);
    showToast("🎉 С Днём Рождения!", `Мне сегодня ${age}!`);
}

function activateNewYearMode(month, day) {
    createParticles('snow', true); 
    addHat('🎅', true);
    showToast("🎄 Праздники", "Новогодний режим активен. Снег закончится через 10 сек.");
}

function createParticles(type, autoRemove = true) {
    const header = document.querySelector('header');
    if (!header) return;

    const container = document.createElement('div');
    container.id = 'holiday-container';
    
    Object.assign(container.style, {
        position: 'absolute',
        top: '0', left: '0', width: '100%', height: '100%',
        pointerEvents: 'none', 
        zIndex: '-1',
        overflow: 'hidden',
        opacity: '1', transition: 'opacity 2s ease-out'
    });
    
    header.style.position = 'relative';
    header.appendChild(container);

    const count = type === 'snow' ? 25 : 35;
    const symbols = ['❄', '❅', '❆'];

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'holiday-particle';
        
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 5 + 5) + 's';
        p.style.animationDelay = Math.random() * 5 + 's';
        
        if (type === 'snow') {
            p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            p.style.color = 'white';
            p.style.fontSize = (Math.random() * 0.7 + 0.4) + 'em';
            p.style.filter = 'blur(0.5px)';
        } else {
            p.style.background = ['#ef4444', '#fbbf24', '#3b82f6'][Math.floor(Math.random() * 3)];
            p.style.width = '6px'; p.style.height = '6px'; p.style.borderRadius = '1px';
        }
        container.appendChild(p);
    }

    if (autoRemove) {
        setTimeout(() => {
            container.style.opacity = '0';
            setTimeout(() => container.remove(), 2000);
        }, 20000);
    }
}

function addHat(emoji, autoRemove = true) {
    const hatContainer = document.createElement('div');
    hatContainer.className = 'holiday-floating-emoji';
    hatContainer.textContent = emoji;
    
    Object.assign(hatContainer.style, {
        position: 'fixed',
        top: '20px',
        left: '20px',
        fontSize: '3.5rem',
        zIndex: '10005',
        pointerEvents: 'none',
        transition: 'opacity 1.5s ease'
    });

    document.body.appendChild(hatContainer);

    if (autoRemove) {
        setTimeout(() => {
            hatContainer.style.opacity = '0';
            setTimeout(() => hatContainer.remove(), 1500);
        }, 15000);
    }
}

function showToast(title, msg) {
    const oldToast = document.querySelector('.holiday-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
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
    
    setTimeout(() => {
        if (toast) {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }
    }, 10000);
}

function initMadnessTimer() {
    if (window.location.pathname.includes('../html/madness.html')) return;
    setTimeout(() => {
        if (Math.random() < 0.1) {
            document.body.style.filter = 'invert(1) contrast(2)';
            setTimeout(() => { window.location.href = '../html/madness.html'; }, 2000);
        }
    }, 300000);
}

document.getElementById('rotateBtn').addEventListener('click', function() {
    document.body.classList.toggle('flipped');
});