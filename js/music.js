document.addEventListener('DOMContentLoaded', () => {
    // Проверяем наличие обеих переменных
    if (typeof musicData === 'undefined' || typeof musicStats === 'undefined') {
        console.error("Music data or stats not found");
        return;
    }
    initMusicStats();
});

function initMusicStats() {
    const totalSongsEl = document.getElementById('totalSongs');
    const uniqueArtistsEl = document.getElementById('uniqueArtists');
    const topArtistEl = document.getElementById('topArtist');
    const songListEl = document.getElementById('songList');
    const playlistViewsEl = document.getElementById('playlistViews');
    const totalDurationEl = document.getElementById('totalDuration');

    const ctx = document.getElementById('artistsChart').getContext('2d');

    // 1. Базовая статистика (Треки)
    totalSongsEl.textContent = musicData.length;

    // --- Просмотры и Длительность ---
    // 1.1 Просмотры (Форматируем число с пробелами: 1 234 567)
    playlistViewsEl.textContent = musicStats.totalViews.toLocaleString('ru-RU');

    // 1.2 Длительность (Переводим секунды в часы и минуты)
    const hours = Math.floor(musicStats.totalDurationSec / 3600);
    const minutes = Math.floor((musicStats.totalDurationSec % 3600) / 60);
    totalDurationEl.textContent = `${hours} ч. ${minutes} мин.`;

    // 2. Считаем артистов (существующий код)
    const artistCounts = {};
    
    musicData.forEach(song => {
        const rawArtists = song.artist.split(/,|&| x | feat\. | ft\. /i);
        rawArtists.forEach(a => {
            let artistName = a.trim();
            if (!artistName) return;
            if (artistCounts[artistName]) {
                artistCounts[artistName]++;
            } else {
                artistCounts[artistName] = 1;
            }
        });

        const li = document.createElement('li');
        li.style.padding = "0.5rem";
        li.style.borderBottom = "1px solid #374151";
        li.style.color = "#9ca3af";
        li.innerHTML = `<strong style="color: #f3f4f6">${song.artist}</strong> - ${song.title}`;
        songListEl.appendChild(li);
    });

    const uniqueArtists = Object.keys(artistCounts);
    uniqueArtistsEl.textContent = uniqueArtists.length;

    // 3. Топ Артистов (существующий код)
    const sortedArtists = Object.entries(artistCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    if (sortedArtists.length > 0) {
        const name = sortedArtists[0][0];
        const count = sortedArtists[0][1];
        topArtistEl.innerHTML = `
            <span>${name}</span>
            <span style="font-size: 1.3rem; margin-top: 5px;">
                (${count} треков)
            </span>
        `;
    }

    // 4. График (существующий код)
    const labels = sortedArtists.map(item => item[0]);
    const data = sortedArtists.map(item => item[1]);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Треков',
                data: data,
                backgroundColor: '#6366f1',
                borderRadius: 4,
                hoverBackgroundColor: '#818cf8'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1f2937',
                    titleColor: '#fff',
                    bodyColor: '#fff'
                }
            },
            scales: {
                x: {
                    grid: { color: '#374151' },
                    ticks: { color: '#9ca3af' }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#f3f4f6', font: { size: 14 } }
                }
            }
        }
    });
}