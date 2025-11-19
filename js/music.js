document.addEventListener('DOMContentLoaded', () => {
    if (typeof musicData === 'undefined') {
        console.error("Music data not found");
        return;
    }
    initMusicStats();
});

function initMusicStats() {
    const totalSongsEl = document.getElementById('totalSongs');
    const uniqueArtistsEl = document.getElementById('uniqueArtists');
    const topArtistEl = document.getElementById('topArtist');
    const songListEl = document.getElementById('songList');
    const ctx = document.getElementById('artistsChart').getContext('2d');

    // 1. Базовая статистика
    totalSongsEl.textContent = musicData.length;

    // 2. Считаем артистов (Улучшенная логика: разделяем фиты)
    const artistCounts = {};
    
    musicData.forEach(song => {
        // Разбиваем строку
        const rawArtists = song.artist.split(/,|&| x | feat\. | ft\. /i);

        rawArtists.forEach(a => {
            let artistName = a.trim(); // Убираем лишние пробелы
            if (!artistName) return;

            if (artistCounts[artistName]) {
                artistCounts[artistName]++;
            } else {
                artistCounts[artistName] = 1;
            }
        });

        // Добавляем в список внизу страницы
        const li = document.createElement('li');
        li.style.padding = "0.5rem";
        li.style.borderBottom = "1px solid #374151";
        li.style.color = "#9ca3af";
        li.innerHTML = `<strong style="color: #f3f4f6">${song.artist}</strong> - ${song.title}`;
        songListEl.appendChild(li);
    });

    const uniqueArtists = Object.keys(artistCounts);
    uniqueArtistsEl.textContent = uniqueArtists.length;

    // 3. Сортируем Топ Артистов
    const sortedArtists = Object.entries(artistCounts)
        .sort((a, b) => b[1] - a[1]) // Сортировка по убыванию
        .slice(0, 10); // Берем топ 10

    // --- ВЫВОД ТОП-1 ---
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

    // 4. Рисуем график
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
            indexAxis: 'y', // Горизонтальный график
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