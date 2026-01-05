document.addEventListener('DOMContentLoaded', () => {
    if (typeof musicData === 'undefined' || typeof musicStats === 'undefined') {
        console.error("❌ Ошибка: Файл с данными не загружен.");
        return;
    }
    
    console.log(`✅ Данные загружены. Треков: ${musicData.length}`);
    
    const musicChart = initMusicStats();

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle && musicChart) {
        themeToggle.addEventListener('change', () => {
            const isLight = document.body.classList.contains('light-theme');
            const newTextColor = isLight ? '#000000' : '#f3f4f6';
            const newGridColor = isLight ? 'rgba(0, 0, 0, 0.1)' : '#374151';

            musicChart.options.scales.y.ticks.color = newTextColor;
            musicChart.options.scales.x.grid.color = newGridColor;
            musicChart.update();
        });
    }
});

function initMusicStats() {
    const totalSongsEl = document.getElementById('totalSongs');
    const uniqueArtistsEl = document.getElementById('uniqueArtists');
    const topArtistEl = document.getElementById('topArtist');
    const totalDurationEl = document.getElementById('totalDuration');
    const songListEl = document.getElementById('songList'); 
    const chartCanvas = document.getElementById('artistsChart');

    const isLight = document.body.classList.contains('light-theme');
    const textColor = isLight ? '#000000' : '#f3f4f6';
    const gridColor = isLight ? 'rgba(0, 0, 0, 0.1)' : '#374151';

    if (totalSongsEl) totalSongsEl.textContent = musicData.length;

    if (totalDurationEl) {
        const hours = Math.floor(musicStats.totalDurationSec / 3600);
        const minutes = Math.floor((musicStats.totalDurationSec % 3600) / 60);
        totalDurationEl.textContent = `${hours} ч. ${minutes} мин.`;
    }

    const artistCounts = {};
    const uniquePlaylists = new Set(musicData.map(s => s.playlist));
    const showBadges = uniquePlaylists.size > 1;
    
    if (songListEl) songListEl.innerHTML = '';

    musicData.forEach(song => {
        const rawArtists = song.artist.split(/,|&| x | feat\. | ft\. /i);
        rawArtists.forEach(a => {
            let artistName = a.trim();
            if (!artistName) return;
            artistCounts[artistName] = (artistCounts[artistName] || 0) + 1;
        });

        if (songListEl) {
            const li = document.createElement('li');
            
            let plBadge = '';
            if (showBadges && song.playlist) {
                let badgeColor = '#9ca3af'; 
                if (song.playlist === 'Main') badgeColor = '#ef4444';
                else if (song.playlist === 'Japan') badgeColor = '#f472b6';
                else if (song.playlist === 'Chill') badgeColor = '#3b82f6';
                else if (song.playlist === 'Dead inside') badgeColor = '#a78bfa';

                plBadge = `<span style="font-size:0.7em; opacity:0.6; margin-left:8px; color: ${badgeColor};">${song.playlist}</span>`;
            }
            
            li.innerHTML = `<span class="song-info"><strong>${song.artist}</strong> &nbsp;—&nbsp; ${song.title}</span> ${plBadge}`;
            songListEl.appendChild(li);
        }
    });

    if (uniqueArtistsEl) uniqueArtistsEl.textContent = Object.keys(artistCounts).length;

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
        const chartInstance = new Chart(ctx, {
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
        return chartInstance;
    }
    return null;
}