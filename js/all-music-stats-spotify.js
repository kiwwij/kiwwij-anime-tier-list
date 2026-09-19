const API_KEY = '7d08311d1067ce36bf90bd11cb44bf3a';
const USERNAME = 'kiwwij'; 
let chartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    fetchUserInfo();
    fetchTopArtists();
    fetchTopTracks();
    fetchRecentTracks();
    setInterval(fetchRecentTracks, 30000);
});

async function fetchUserInfo() {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${USERNAME}&api_key=${API_KEY}&format=json`);
        const data = await response.json();
        
        if (data.user) {
            document.getElementById('totalScrobbles').textContent = formatNumber(data.user.playcount);
        }
    } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
    }
}

async function fetchTopArtists() {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${USERNAME}&api_key=${API_KEY}&period=1month&limit=10&format=json`);
        const data = await response.json();
        
        if (data.topartists && data.topartists.artist.length > 0) {
            const artists = data.topartists.artist;
            document.getElementById('topArtist').textContent = artists[0].name;
            
            const labels = artists.map(a => a.name);
            const counts = artists.map(a => a.playcount);
            renderChart(labels, counts);
        }
    } catch (error) {
        console.error("Ошибка загрузки топа артистов:", error);
    }
}

async function fetchTopTracks() {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${USERNAME}&api_key=${API_KEY}&period=1month&limit=1&format=json`);
        const data = await response.json();
        
        if (data.toptracks && data.toptracks.track.length > 0) {
            const track = data.toptracks.track[0];
            document.getElementById('topTrack').textContent = `${track.artist.name} — ${track.name}`;
        }
    } catch (error) {
        console.error("Ошибка загрузки топа треков:", error);
    }
}

async function fetchRecentTracks() {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&limit=15&format=json`);
        const data = await response.json();
        
        if (data.recenttracks && data.recenttracks.track.length > 0) {
            const tracks = data.recenttracks.track;
            const nowPlaying = tracks[0];
            const isPlayingNow = nowPlaying['@attr'] && nowPlaying['@attr'].nowplaying === 'true';
            
            const npStatus = document.getElementById('npStatus');
            const npIcon = document.getElementById('npIcon');
            const npTrack = document.getElementById('npTrack');
            const npArtist = document.getElementById('npArtist');
            const npCover = document.getElementById('npCover');
            
            if (isPlayingNow) {
                npStatus.textContent = "Сейчас играет";
                npStatus.style.color = "var(--spotify-green)";
                npIcon.className = "bx bx-radar bx-flashing";
            } else {
                npStatus.textContent = "Последний трек";
                npStatus.style.color = "var(--text-muted)";
                npIcon.className = "bx bx-time-five";
            }
            
            npTrack.textContent = nowPlaying.name;
            npArtist.textContent = nowPlaying.artist['#text'];
            
            if (nowPlaying.image[2]['#text']) {
                npCover.src = nowPlaying.image[2]['#text'];
                npCover.style.display = "block";
            }
            
            const listEl = document.getElementById('recentTracksList');
            listEl.innerHTML = '';
            
            const listTracks = isPlayingNow ? tracks.slice(1) : tracks;
            
            listTracks.forEach(track => {
                const li = document.createElement('li');
                let timeStr = 'Недавно';
                if (track.date && track.date.uts) {
                    const date = new Date(track.date.uts * 1000);
                    timeStr = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
                }
                
                li.innerHTML = `
                    <span class="song-info"><strong>${track.artist['#text']}</strong> <br> <span style="opacity: 0.8; font-size: 0.85rem">${track.name}</span></span>
                    <span class="track-time">${timeStr}</span>
                `;
                listEl.appendChild(li);
            });
        }
    } catch (error) {
        console.error("Ошибка загрузки недавних треков:", error);
    }
}

function renderChart(labels, dataCounts) {
    const ctx = document.getElementById('artistsChart').getContext('2d');
    const isLight = document.body.classList.contains('light-theme');
    
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Прослушиваний',
                data: dataCounts,
                backgroundColor: '#1ed760',
                borderRadius: 6,
                hoverBackgroundColor: '#1db954'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { 
                legend: { display: false } 
            },
            scales: {
                x: { 
                    grid: { color: isLight ? 'rgba(0,0,0,0.1)' : '#374151' },
                    ticks: { color: isLight ? '#4b5563' : '#9ca3af' }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: isLight ? '#000' : '#fff', font: { weight: '600' } }
                }
            }
        }
    });
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}