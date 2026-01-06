document.addEventListener('DOMContentLoaded', () => {
    if (typeof musicData === 'undefined' || typeof musicStats === 'undefined') {
        console.error("❌ Ошибка: Файл с данными не загружен.");
        return;
    }
    
    console.log(`✅ Данные загружены. Треков: ${musicData.length}`);
    
    // Инициализируем статистику и получаем объект графика для управления темами
    const musicChart = initMusicStats();

    // Логика переключения темы для графика
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle && musicChart) {
        themeToggle.addEventListener('change', () => {
            const isLight = !themeToggle.checked; // В вашем HTML checked = dark
            const newTextColor = isLight ? '#000000' : '#f3f4f6';
            const newGridColor = isLight ? 'rgba(0, 0, 0, 0.1)' : '#374151';

            musicChart.options.scales.y.ticks.color = newTextColor;
            musicChart.options.scales.x.grid.color = newGridColor;
            musicChart.update();
        });
    }

    // Слушатель для пасхалки
    initKonami();
});

// Глобальные переменные для управления подгрузкой
let currentIndex = 0;
const itemsPerPage = 30; 
let isLoading = false;

function initMusicStats() {
    const totalSongsEl = document.getElementById('totalSongs');
    const uniqueArtistsEl = document.getElementById('uniqueArtists');
    const topArtistEl = document.getElementById('topArtist');
    const totalDurationEl = document.getElementById('totalDuration');
    const songListEl = document.getElementById('songList'); 
    const chartCanvas = document.getElementById('artistsChart');
    const scrollContainer = document.querySelector('.scrollable-list');

    const isLight = document.body.classList.contains('light-theme');
    const textColor = isLight ? '#000000' : '#f3f4f6';
    const gridColor = isLight ? 'rgba(0, 0, 0, 0.1)' : '#374151';

    // 1. Общая статистика
    if (totalSongsEl) totalSongsEl.textContent = musicData.length;

    if (totalDurationEl) {
        const hours = Math.floor(musicStats.totalDurationSec / 3600);
        const minutes = Math.floor((musicStats.totalDurationSec % 3600) / 60);
        totalDurationEl.textContent = `${hours} ч. ${minutes} мин.`;
    }

    // 2. Подсчет артистов (нужен для топа и графика)
    const artistCounts = {};
    musicData.forEach(song => {
        const rawArtists = song.artist.split(/,|&| x | feat\. | ft\. /i);
        rawArtists.forEach(a => {
            let artistName = a.trim();
            if (!artistName) return;
            artistCounts[artistName] = (artistCounts[artistName] || 0) + 1;
        });
    });

    if (uniqueArtistsEl) uniqueArtistsEl.textContent = Object.keys(artistCounts).length;

    // 3. Бесконечная прокрутка списка
    if (songListEl && scrollContainer) {
        songListEl.innerHTML = ''; 
        currentIndex = 0;
        
        // Загружаем первую порцию
        loadMoreSongs();

        // Обработчик скролла
        scrollContainer.addEventListener('scroll', () => {
            // Если прокрутили до конца (минус 100 пикселей запаса)
            if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 100) {
                loadMoreSongs();
            }
        });
    }

    // 4. Отрисовка топа и графика
    const sortedArtists = Object.entries(artistCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15);

    if (topArtistEl && sortedArtists.length > 0) {
        topArtistEl.innerHTML = `
            <span>${sortedArtists[0][0]}</span>
            <span style="font-size: 0.9rem; font-weight: 600; margin-top: 4px; display:block; opacity: 0.6;">
                (${sortedArtists[0][1]} треков)
            </span>
        `;
    }

    if (chartCanvas && sortedArtists.length > 0) {
        const ctx = chartCanvas.getContext('2d');
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedArtists.map(i => i[0]),
                datasets: [{
                    label: 'Треков',
                    data: sortedArtists.map(i => i[1]),
                    backgroundColor: '#6366f1',
                    borderRadius: 6,
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
                        backgroundColor: isLight ? '#fff' : '#1e293b',
                        titleColor: isLight ? '#000' : '#fff',
                        bodyColor: isLight ? '#000' : '#fff',
                        borderColor: '#6366f1',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: { 
                        grid: { color: gridColor }, 
                        ticks: { color: isLight ? '#4b5563' : '#9ca3af' } 
                    },
                    y: { 
                        grid: { display: false }, 
                        ticks: { 
                            color: textColor,
                            font: { size: 12, weight: '600' }, 
                            autoSkip: false 
                        } 
                    }
                }
            }
        });
    }
    return null;
}

function loadMoreSongs() {
    if (isLoading || currentIndex >= musicData.length) return;
    isLoading = true;

    const songListEl = document.getElementById('songList');
    const fragment = document.createDocumentFragment();
    const nextBatch = musicData.slice(currentIndex, currentIndex + itemsPerPage);

    nextBatch.forEach(song => {
        const li = document.createElement('li');
        
        let plBadge = '';
        if (song.playlist) {
            let badgeColor = '#9ca3af'; 
            if (song.playlist === 'Main') badgeColor = '#ef4444';
            else if (song.playlist === 'Japan') badgeColor = '#f472b6';
            else if (song.playlist === 'Chill') badgeColor = '#3b82f6';
            else if (song.playlist === 'Dead inside') badgeColor = '#a78bfa';

            plBadge = `<span class="playlist-badge" style="font-size:0.7em; opacity:0.6; margin-left:8px; color: ${badgeColor};">${song.playlist}</span>`;
        }
        
        li.innerHTML = `<span class="song-info"><strong>${song.artist}</strong> &nbsp;—&nbsp; ${song.title}</span> ${plBadge}`;
        fragment.appendChild(li);
    });

    songListEl.appendChild(fragment);
    currentIndex += itemsPerPage;
    isLoading = false;
}

// Пасхалка (Код Конами)
function initKonami() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let currentInput = [];

    document.addEventListener('keydown', (e) => {
        currentInput.push(e.key);
        currentInput = currentInput.slice(-konamiCode.length);

        if (currentInput.join('') === konamiCode.join('')) {
            activateGlitchMode();
        }
    });
}

function activateGlitchMode() {
    document.body.style.filter = 'invert(1) hue-rotate(180deg)';
    document.body.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 5000);
}