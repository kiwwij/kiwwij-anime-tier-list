/* madness.js */

const canvas = document.getElementById('madCanvas');
const ctx = canvas.getContext('2d');
const blackout = document.getElementById('blackout');
const title = document.getElementById('glitchTitle');
const fakeBtn = document.getElementById('fakeReturn');

const words = [
    "ERROR", "死", "ХАОС", "HELP", "СМЕРТЬ", "ЖОҚ", "助けて", "ӨЛІМ", "VOID", "虚無", "404", 
    "17 HOURS", "NO LIGHT", "NaN", "CORRUPTED", "ZALGO", "0x5F3759DF", "НЕТ ПУТИ", "ШУМ", 
    "S_I_L_E_N_T", "█▓▒░", "☣️", "49 66 20 79", "63 61 6e 20", "stack_overflow", 
    "memory_leak", "U_N_K_N_O_W_N", "H_A_C_K", "CRITICAL", "▜▛", "▟▙", "SYSTEM_FAIL", 
    "NULL_PTR", "KILL_PROCESS", "FRAGMENTED", "LOG_ERR", "000000", "FFFFFF", "REBOOT", 
    "TRY_AGAIN", "STAY_HERE", "DONT_LEAVE", "DE_SYNC", "C_H_A_I_N_S", "U_N_D_E_A_D", "W_A_K_E_U_P"
];

let particles = [];
let clickCount = 0;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() { this.init(); }
    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.text = words[Math.floor(Math.random() * words.length)];
        this.size = Math.random() * 50 + 15;
        this.speedX = (Math.random() - 0.5) * 20;
        this.speedY = (Math.random() - 0.5) * 20;
        this.opacity = Math.random();
    }
    draw() {
        ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
        ctx.font = `bold ${this.size}px Inter`;
        ctx.fillText(this.text, this.x, this.y);
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < -200 || this.x > canvas.width + 200) this.init();
        if (this.y < -200 || this.y > canvas.height + 200) this.init();
    }
}

for(let i=0; i<85; i++) particles.push(new Particle());

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    if(Math.random() > 0.93) title.innerText = words[Math.floor(Math.random() * words.length)];
    requestAnimationFrame(animate);
}
animate();

// Логика кнопки "Вернуться" (сопротивление)
fakeBtn.onclick = function(e) {
    clickCount++;
    document.body.style.filter = "invert(1) contrast(3)";
    setTimeout(() => document.body.style.filter = "none", 100);

    if (clickCount < 5) {
        fakeBtn.innerText = ["ОСТАВАЙСЯ", "ОШИБКА", "КУДА ТЫ?", "НЕТ ПУТИ"][clickCount-1] || "ПРОСНУТЬСЯ";
        fakeBtn.style.transform = `translate(${(Math.random()-0.5)*200}px, ${(Math.random()-0.5)*200}px) scale(${1 - clickCount*0.1})`;
        fakeBtn.style.opacity = 1 - (clickCount * 0.15);
    } else {
        location.href = 'index.html';
    }
};

document.body.onclick = function(e) {
    if (e.target !== fakeBtn) {
        let div = document.createElement('div');
        div.className = 'mad-card';
        div.style.left = Math.random() * 85 + '%';
        div.style.top = Math.random() * 85 + '%';
        div.innerHTML = `<h3>ADDR_0x${Math.random().toString(16).toUpperCase().slice(2, 10)}</h3><p>${words[Math.floor(Math.random() * words.length)]} ${words[Math.floor(Math.random() * words.length)]}</p>`;
        document.body.appendChild(div);
        const cards = document.querySelectorAll('.mad-card');
        if (cards.length > 12) cards[0].remove();
    }
};

setTimeout(() => { blackout.style.display = 'flex'; }, 30000);