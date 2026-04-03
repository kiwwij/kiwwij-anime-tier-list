// Глобальные переменные для управления подгрузкой и фильтрацией
let currentIndex = 0;
const itemsPerPage = 30; 
let isLoading = false;
let filteredData = [];
let musicChartInstance = null; // Глобально храним график, чтобы убивать его при фильтрации

document.addEventListener('DOMContentLoaded', () => {
    if (typeof musicData === 'undefined' || typeof musicStats === 'undefined') {
        console.error("❌ Ошибка: Файл с данными не загружен.");
        return;
    }
    
    console.log(`✅ Данные загружены. Треков: ${musicData.length}`);
    
    filteredData = [...musicData]; // Изначально показываем все треки
    
    initMusicStats();
    initFilters(); // Инициализируем клики по плейлистам

    // Логика переключения темы для графика
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (musicChartInstance) {
                const isLight = !themeToggle.checked;
                const newTextColor = isLight ? '#000000' : '#f3f4f6';
                const newGridColor = isLight ? 'rgba(0, 0, 0, 0.1)' : '#374151';

                musicChartInstance.options.scales.y.ticks.color = newTextColor;
                musicChartInstance.options.scales.x.grid.color = newGridColor;
                musicChartInstance.update();
            }
        });
    }

    initKonami();
});

function initFilters() {
    const cards = document.querySelectorAll('.playlist-card[data-playlist]');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Убираем активный класс у всех
            cards.forEach(c => c.classList.remove('active-filter'));
            card.classList.add('active-filter'); // Делаем кликнутый активным

            const playlist = card.getAttribute('data-playlist');
            
            // Фильтруем данные
            if (playlist === 'All') {
                filteredData = [...musicData];
            } else {
                filteredData = musicData.filter(song => song.playlist === playlist);
            }

            // Перерисовываем всю статистику, список и график
            initMusicStats();
        });
    });
}

function handleScroll(e) {
    const container = e.target;
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
        loadMoreSongs();
    }
}

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

    // 1. Общая статистика (по отфильтрованному массиву)
    if (totalSongsEl) totalSongsEl.textContent = filteredData.length;

    // Считаем время на лету (из строк типа "2:14" или "1:00:00")
    if (totalDurationEl) {
        let totalSeconds = 0;
        filteredData.forEach(song => {
            if(song.duration) {
                const parts = song.duration.split(':').map(Number);
                if(parts.length === 2) {
                    totalSeconds += parts[0] * 60 + parts[1];
                } else if (parts.length === 3) {
                    totalSeconds += parts[0] * 3600 + parts[1] * 60 + parts[2];
                }
            }
        });
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        totalDurationEl.textContent = `${hours} ч. ${minutes} мин.`;
    }

    // 2. Подсчет уникальных артистов
    const artistCounts = {};
    filteredData.forEach(song => {
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
        
        loadMoreSongs(); // Загружаем первые треки
        
        // Удаляем старый обработчик, чтобы не срабатывал дважды, и вешаем новый
        scrollContainer.removeEventListener('scroll', handleScroll);
        scrollContainer.addEventListener('scroll', handleScroll);
    }

    // 4. Отрисовка топа и графика
    const sortedArtists = Object.entries(artistCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15);

    if (topArtistEl) {
        if (sortedArtists.length > 0) {
            topArtistEl.innerHTML = `
                <span>${sortedArtists[0][0]}</span>
                <span style="font-size: 0.9rem; font-weight: 600; margin-top: 4px; display:block; opacity: 0.6;">
                    (${sortedArtists[0][1]} треков)
                </span>
            `;
        } else {
            topArtistEl.innerHTML = '-'; // Если плейлист пуст
        }
    }

    if (chartCanvas) {
        // Обязательно "убиваем" старый график, иначе он будет накладываться поверх нового
        if (musicChartInstance) {
            musicChartInstance.destroy();
        }
        
        const ctx = chartCanvas.getContext('2d');
        musicChartInstance = new Chart(ctx, {
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
}

function loadMoreSongs() {
    if (isLoading || currentIndex >= filteredData.length) return;
    isLoading = true;

    const songListEl = document.getElementById('songList');
    const fragment = document.createDocumentFragment();
    const nextBatch = filteredData.slice(currentIndex, currentIndex + itemsPerPage);

    nextBatch.forEach(song => {
        const li = document.createElement('li');
        
        let plBadge = '';
        if (song.playlist) {
            let badgeColor = '#9ca3af'; 
            if (song.playlist === 'Main') badgeColor = '#ef4444';
            else if (song.playlist === 'Off Screen') badgeColor = '#f472b6';
            else if (song.playlist === 'Game OSTs') badgeColor = '#3b82f6';
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