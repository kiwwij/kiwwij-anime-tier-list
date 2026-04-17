function linkify(text) {
    if (!text) return "";
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return `<a href="${url}" target="_blank">${url}</a>`;
    });
}

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("notesContainer");
    const navToggle = document.getElementById("notesNavToggle");
    const nav = document.getElementById("notesNav");
    const navLinks = document.getElementById("notesNavLinks");

    if (!container || !navToggle || !nav || !navLinks) return;

    notes.forEach((note, index) => {
        const card = document.createElement("div");
        card.className = "note-card";
        card.id = `note-${index + 1}`;

        card.innerHTML = `
            <h2 class="note-title">Запись #${note.id}</h2>
            <div class="note-date">Дата: <span>${note.date}</span></div>
            <div class="note-text">${linkify(note.text)}</div>
        `;

        container.appendChild(card);

        const link = document.createElement("a");
        link.href = `#note-${index + 1}`;
        link.textContent = `Запись #${note.id}`;

        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });

        navLinks.appendChild(link);
    });

    navToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

});

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let currentInput = [];

document.addEventListener('keydown', (e) => {
    currentInput.push(e.key);
    currentInput = currentInput.slice(-konamiCode.length);

    if (currentInput.join('') === konamiCode.join('')) {
        activateGlitchMode();
    }
});

function activateGlitchMode() {
    document.body.style.filter = 'invert(1) hue-rotate(180deg)';
    document.body.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 5000);
}

function maybeSpawnZoro() {
    if (Math.random() > 0.05) return; 

    if (document.querySelector('.zoro-lost')) return;

    console.log("⚔️ Zoro is lost again...");

    const zoro = document.createElement('img');
    zoro.src = (window.location.pathname.includes('/pages/') || window.location.pathname.includes('/extra/')) ? '../img/roronoa_zoro.png' : 'img/roronoa_zoro.png'; 
    zoro.className = 'zoro-lost';
    document.body.appendChild(zoro);

    setTimeout(() => {
        zoro.classList.add('zoro-walk');
    }, 50);

    setTimeout(() => {
        zoro.remove();
    }, 12000);
}

if (typeof tabButtons !== 'undefined') {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', maybeSpawnZoro);
    });
}

setTimeout(maybeSpawnZoro, 1000);