document.addEventListener('DOMContentLoaded', () => {
    if (typeof steamData === 'undefined') {
        console.error("❌ Ошибка: Файл data/steam-profile-data.js не найден.");
        document.getElementById('steamNick').textContent = "Ошибка данных";
        return;
    }

    renderProfile();
    renderGames();
    renderStats();
});

function renderProfile() {
    const p = steamData.profile;
    if (!p) return;

    const avatarEl = document.getElementById('steamAvatar');
    const nickEl = document.getElementById('steamNick');
    const linkEl = document.getElementById('steamLink');
    const statusEl = document.getElementById('steamStatus');

    avatarEl.src = p.avatar;
    nickEl.textContent = p.nickname;
    linkEl.href = p.profileUrl;

    // --- ЛОГИКА СТАТУСОВ ---
    // Если есть информация об игре, пишем просто "In-Game" без названия
    if (p.game_extrainfo) {
        statusEl.textContent = "In-Game"; 
        statusEl.className = 'status-badge status-online'; // Зеленый цвет
    } 
    // Иначе показываем обычный статус (Online, Offline...)
    else {
        statusEl.textContent = p.status; 
        
        if (p.status === 'Online') {
            statusEl.className = 'status-badge status-online';
        } else {
            statusEl.className = 'status-badge'; 
        }
    }
}

function renderGames() {
    const recentContainer = document.getElementById('recentGames');
    const recentSection = document.getElementById('recentSection');
    
    if (steamData.recent_games && steamData.recent_games.length > 0) {
        recentSection.style.display = 'block'; 
        steamData.recent_games.forEach(game => {
            recentContainer.appendChild(createGameCard(game, 'recent'));
        });
    }

    const topContainer = document.getElementById('topGames');
    if (steamData.top_games) {
        steamData.top_games.forEach(game => {
            topContainer.appendChild(createGameCard(game, 'top'));
        });
    }
}

function renderStats() {
    if (steamData.stats) {
        const totalGamesEl = document.getElementById('totalGamesCount');
        if(totalGamesEl) totalGamesEl.textContent = steamData.stats.total_games;
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
        metaText = `${game.playtime_2weeks} ч. за 2 недели`;
    } else if (type === 'top') {
        metaText = `${game.hours} ч. всего`;
    }

    a.innerHTML = `
        <img src="${imgUrl}" alt="${game.name}" class="game-cover" loading="lazy">
        <div class="game-info">
            <div class="game-title">${game.name}</div>
            <div class="game-hours">${metaText}</div>
        </div>
    `;

    return a;
}