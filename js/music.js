document.addEventListener('DOMContentLoaded', () => {
    // 1. Проверяем, загрузились ли данные
    if (typeof musicData === 'undefined' || typeof musicStats === 'undefined') {
        console.error("❌ Ошибка: Файл с данными не загружен.");
        return;
    }
    
    console.log(`✅ Данные загружены. Треков: ${musicData.length}`);
    initMusicStats();
});

function initMusicStats() {
    const totalSongsEl = document.getElementById('totalSongs');
    const uniqueArtistsEl = document.getElementById('uniqueArtists');
    const topArtistEl = document.getElementById('topArtist');
    const playlistViewsEl = document.getElementById('playlistViews');
    const totalDurationEl = document.getElementById('totalDuration');
    
    const songListEl = document.getElementById('songList'); 
    const chartCanvas = document.getElementById('artistsChart');

    // --- 1. БАЗОВАЯ СТАТИСТИКА ---
    
    if (totalSongsEl) totalSongsEl.textContent = musicData.length;

    // === ПРОСМОТРЫ (С ПОМЕТКОЙ) ===
    if (playlistViewsEl) {
        const views = musicStats.totalViews;
        let viewText = '';

        if (views < 1000) {
            viewText = views + ' тыс.';
        } else {
            viewText = views.toLocaleString('ru-RU');
        }

        // Добавляем пометку о неточных данных
        // Делаем текст очень тонким, мелким и полупрозрачным
        playlistViewsEl.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; line-height: 1.1;">
                <span>${viewText}</span>
                <span style="color: rgba(156, 163, 175, 0.4); font-size: 11px; font-weight: 400; margin-top: 4px; letter-spacing: 0.02em;">
                    (возможно неточное отображение просмотров)
                </span>
            </div>
        `;
    }

    // Длительность
    if (totalDurationEl) {
        const hours = Math.floor(musicStats.totalDurationSec / 3600);
        const minutes = Math.floor((musicStats.totalDurationSec % 3600) / 60);
        totalDurationEl.textContent = `${hours} ч. ${minutes} мин.`;
    }

    // --- 2. АНАЛИЗ АРТИСТОВ ---
    const artistCounts = {};

    // ПРОВЕРКА: Есть ли в списке разные плейлисты?
    // Если все треки из одного плейлиста (например "Main"), size будет 1 -> false
    // Если есть "Main", "Japan" и т.д., size > 1 -> true
    const uniquePlaylists = new Set(musicData.map(s => s.playlist));
    const showBadges = uniquePlaylists.size > 1;
    
    musicData.forEach(song => {
        const rawArtists = song.artist.split(/,|&| x | feat\. | ft\. /i);
        rawArtists.forEach(a => {
            let artistName = a.trim();
            if (!artistName) return;
            artistCounts[artistName] = (artistCounts[artistName] || 0) + 1;
        });

        // Список песен
        if (songListEl) {
            const li = document.createElement('li');
            li.style.padding = "0.5rem";
            li.style.borderBottom = "1px solid #374151";
            li.style.color = "#9ca3af";
            
            // Формируем бейджик ТОЛЬКО если у нас сборная солянка (showBadges === true)
            let plBadge = '';

            if (showBadges && song.playlist) {
                let badgeColor = '#9ca3af'; 
                if (song.playlist === 'Main') badgeColor = '#ef4444';
                else if (song.playlist === 'Japan') badgeColor = '#f472b6';
                else if (song.playlist === 'Chill') badgeColor = '#3b82f6';
                else if (song.playlist === 'Dead inside') badgeColor = '#a78bfa';

                // СТИЛЬ: Более незаметный (без скобок, тонкий шрифт, прозрачность)
                plBadge = `<span style="font-size:0.7em; font-weight:normal; opacity:0.6; margin-left:8px; color: ${badgeColor}; letter-spacing: 0.03em;">${song.playlist}</span>`;
            }
            
            li.innerHTML = `<strong style="color: #f3f4f6">${song.artist}</strong> - ${song.title} ${plBadge}`;
            songListEl.appendChild(li);
        }
    });

    if (uniqueArtistsEl) uniqueArtistsEl.textContent = Object.keys(artistCounts).length;

    // --- 3. ТОП АРТИСТ ---
    const sortedArtists = Object.entries(artistCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20);

    if (topArtistEl && sortedArtists.length > 0) {
        topArtistEl.innerHTML = `
            <span>${sortedArtists[0][0]}</span>
            <span style="font-size: 1.3rem; margin-top: 5px; display:block; color: #9ca3af;">
                (${sortedArtists[0][1]} треков)
            </span>
        `;
    }

    // --- 4. ГРАФИК ---
    if (chartCanvas && sortedArtists.length > 0) {
        const ctx = chartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedArtists.map(i => i[0]),
                datasets: [{
                    label: 'Треков',
                    data: sortedArtists.map(i => i[1]),
                    backgroundColor: '#6366f1',
                    borderRadius: 4,
                    hoverBackgroundColor: '#818cf8'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { color: '#374151' }, ticks: { color: '#9ca3af' } },
                    y: { grid: { display: false }, ticks: { color: '#f3f4f6', font: { size: 12 }, autoSkip: false } }
                }
            }
        });
    }
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
    alert('СЕКРЕТНЫЙ РЕЖИМ: Активирован визуальный глитч!');
    
    // Через 5 секунд возвращаем всё как было
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 5000);
}