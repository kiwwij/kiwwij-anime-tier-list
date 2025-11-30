document.addEventListener('DOMContentLoaded', () => {
    // 1. Проверяем, загрузились ли данные (musicData и musicStats должны быть объявлены в подключенном .js файле)
    if (typeof musicData === 'undefined' || typeof musicStats === 'undefined') {
        console.error("❌ Ошибка: Файл с данными (music-data.js или all-music-data.js) не загружен или поврежден.");
        return;
    }
    
    console.log(`✅ Данные загружены. Источник содержит ${musicData.length} треков.`);
    initMusicStats();
});

function initMusicStats() {
    // Получаем элементы (могут отсутствовать на некоторых страницах)
    const totalSongsEl = document.getElementById('totalSongs');
    const uniqueArtistsEl = document.getElementById('uniqueArtists');
    const topArtistEl = document.getElementById('topArtist');
    const playlistViewsEl = document.getElementById('playlistViews');
    const totalDurationEl = document.getElementById('totalDuration');
    
    // Элементы, которые есть не везде (например, список песен есть только на главной)
    const songListEl = document.getElementById('songList'); 
    const chartCanvas = document.getElementById('artistsChart');

    // --- 1. ЗАПОЛНЕНИЕ БАЗОВОЙ СТАТИСТИКИ ---
    
    // Всего треков
    if (totalSongsEl) {
        totalSongsEl.textContent = musicData.length;
    }

    // Просмотры
    if (playlistViewsEl) {
        const views = musicStats.totalViews;
        // Возвращаем логику "тысяч":
        if (views < 1000) {
            playlistViewsEl.textContent = views + ' тыс.';
        } else {
            playlistViewsEl.textContent = views.toLocaleString('ru-RU');
        }
    }

    // Длительность
    if (totalDurationEl) {
        const hours = Math.floor(musicStats.totalDurationSec / 3600);
        const minutes = Math.floor((musicStats.totalDurationSec % 3600) / 60);
        totalDurationEl.textContent = `${hours} ч. ${minutes} мин.`;
    }

    // --- 2. АНАЛИЗ АРТИСТОВ ---
    const artistCounts = {};
    
    musicData.forEach(song => {
        // Разбиваем фиты (feat., &, x) для более точного подсчета
        const rawArtists = song.artist.split(/,|&| x | feat\. | ft\. /i);
        
        rawArtists.forEach(a => {
            let artistName = a.trim();
            if (!artistName) return;
            artistCounts[artistName] = (artistCounts[artistName] || 0) + 1;
        });

        // --- ЗАПОЛНЕНИЕ СПИСКА ПЕСЕН (ТОЛЬКО ЕСЛИ ЕСТЬ БЛОК songList) ---
        // Это сработает только на странице music.html, на all_music.html этот блок пропустится
        if (songListEl) {
            const li = document.createElement('li');
            li.style.padding = "0.5rem";
            li.style.borderBottom = "1px solid #374151";
            li.style.color = "#9ca3af";
            
            // --- ЛОГИКА ЦВЕТОВ ДЛЯ ПЛЕЙЛИСТОВ ---
            let badgeColor = '#9ca3af'; // Стандартный серый
            
            // Назначаем цвета в зависимости от названия плейлиста
            if (song.playlist === 'Main') badgeColor = '#ef4444';       // Красный
            else if (song.playlist === 'Japan') badgeColor = '#f472b6'; // Розовый (Сакура)
            else if (song.playlist === 'Chill') badgeColor = '#3b82f6'; // Синий (Океан)
            else if (song.playlist === 'Dead inside') badgeColor = '#a78bfa'; // Фиолетовый
            
            // Формируем значок плейлиста с нужным цветом
            const plBadge = song.playlist ? `<span style="font-size:0.75em; font-weight:bold; opacity:0.9; margin-left:10px; color: ${badgeColor};">[${song.playlist}]</span>` : '';
            
            li.innerHTML = `<strong style="color: #f3f4f6">${song.artist}</strong> - ${song.title} ${plBadge}`;
            songListEl.appendChild(li);
        }
    });

    // Уникальные артисты
    if (uniqueArtistsEl) {
        uniqueArtistsEl.textContent = Object.keys(artistCounts).length;
    }

    // --- 3. ТОП АРТИСТ ---
    const sortedArtists = Object.entries(artistCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20); // Берем топ-20 для графика

    if (topArtistEl && sortedArtists.length > 0) {
        const name = sortedArtists[0][0];
        const count = sortedArtists[0][1];
        topArtistEl.innerHTML = `
            <span>${name}</span>
            <span style="font-size: 1.3rem; margin-top: 5px; display:block; color: #9ca3af;">
                (${count} треков)
            </span>
        `;
    }

    // --- 4. ГРАФИК (ТОЛЬКО ЕСЛИ ЕСТЬ CANVAS) ---
    if (chartCanvas && sortedArtists.length > 0) {
        const ctx = chartCanvas.getContext('2d');
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
                indexAxis: 'y', // Горизонтальный бар (имена слева)
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1f2937',
                        titleColor: '#fff',
                        bodyColor: '#cbd5e1',
                        borderColor: '#374151',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        grid: { color: '#374151' },
                        ticks: { color: '#9ca3af' }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { 
                            color: '#f3f4f6', 
                            font: { size: 12 },
                            autoSkip: false // Показываем всех артистов, не пропуская имена
                        }
                    }
                }
            }
        });
    }
}