document.addEventListener('DOMContentLoaded', () => {
    if (typeof steamData === 'undefined') {
        console.error("❌ Ошибка: Файл data/steam-profile-data.js не найден.");
        const nickEl = document.getElementById('steamNick');
        if (nickEl) nickEl.textContent = "Ошибка данных";
        return;
    }

    renderProfile();
    renderGames();
});

function renderProfile() {
    const p = steamData.profile;
    if (!p) return;

    const avatarEl = document.getElementById('steamAvatar');
    const nickEl = document.getElementById('steamNick');
    const linkEl = document.getElementById('steamLink');
    const statusEl = document.getElementById('steamStatus');

    if (avatarEl) avatarEl.src = p.avatar;
    if (nickEl) nickEl.textContent = p.nickname;
    if (linkEl) linkEl.href = p.profileUrl;

    if (statusEl) {
        statusEl.textContent = p.status;
        statusEl.className = 'status-badge';

        if (p.statusColor) {
            statusEl.style.setProperty('--status-color', p.statusColor);
        }
    }
}

function renderGames() {
    const recentContainer = document.getElementById('recentGames');
    const recentSection = document.getElementById('recentSection');
    
    if (steamData.recent_games && steamData.recent_games.length > 0) {
        if (recentSection) recentSection.style.display = 'block';
        steamData.recent_games.forEach(game => {
            if (recentContainer) recentContainer.appendChild(createGameCard(game, 'recent'));
        });
    } else {
        if (recentSection) recentSection.style.display = 'none';
    }

    const topContainer = document.getElementById('topGames');
    if (steamData.top_games && topContainer) {
        steamData.top_games.forEach(game => {
            topContainer.appendChild(createGameCard(game, 'top'));
        });
    }
}

function createGameCard(game, type) {
    const a = document.createElement('a');
    a.className = 'game-card';
    a.href = game.url;
    a.target = '_blank';

    const imgUrl = game.image || 'https://via.placeholder.com/460x215?text=No+Image';
    
    let metaText = '';
    if (type === 'recent') {
        metaText = `${game.playtime_2weeks} ч.`;
    } else if (type === 'top') {
        metaText = `${game.hours} ч.`; 
    }

    a.innerHTML = `
        <img src="${imgUrl}" alt="${game.name}" class="game-cover" loading="lazy">
        <div class="game-info">
            <div class="game-title" title="${game.name}">${game.name}</div>
            <div class="game-hours">${metaText}</div>
        </div>
    `;

    return a;
}

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
    zoro.src = 'img/roronoa_zoro.png'; 
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