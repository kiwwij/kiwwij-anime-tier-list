document.addEventListener('DOMContentLoaded', () => {
    if (typeof steamData === 'undefined') return;

    initGlobalSummary();
    initSteamGenresChart();
});

function initGlobalSummary() {
    const p = steamData.profile || {};
    
    const levelEl = document.getElementById('steamLevel');
    const ageEl = document.getElementById('steamAge');
    const topGenreEl = document.getElementById('steamTopGenre');
    const totalHoursEl = document.getElementById('steamTotalHours');

    if (levelEl) levelEl.textContent = p.level || "???";
    if (ageEl) ageEl.textContent = p.age || "???";

    let totalHours = 0;
    const genreCounts = {};

    if (steamData.top_games) {
        steamData.top_games.forEach(game => {
            const hours = parseFloat(game.hours || 0);
            totalHours += hours;
            
            if (game.tags && Array.isArray(game.tags)) {
                game.tags.forEach(tag => {
                    genreCounts[tag] = (genreCounts[tag] || 0) + hours;
                });
            }
        });
    }
    
    if (p.hiddenHours) {
        totalHours += parseFloat(p.hiddenHours);
    }
    
    if (steamData.profile && steamData.profile.hiddenDotaHours) {
        genreCounts["MOBA"] = (genreCounts["MOBA"] || 0) + steamData.profile.hiddenDotaHours;
        genreCounts["Киберспорт"] = (genreCounts["Киберспорт"] || 0) + steamData.profile.hiddenDotaHours;
    }

    if (totalHoursEl) totalHoursEl.textContent = Math.round(totalHours).toLocaleString('ru-RU');

    if (topGenreEl) {
        let topGenre = "Нет данных";
        let maxHours = 0;
        
        for (const [genre, hours] of Object.entries(genreCounts)) {
            if (hours > maxHours) {
                maxHours = hours;
                topGenre = genre;
            }
        }
        
        topGenreEl.textContent = topGenre;
        
        if (topGenre.length > 12) {
            topGenreEl.style.fontSize = '1.2rem';
        }
    }
}

function initSteamGenresChart() {
    const genresHeader = document.querySelector('.genres-header');
    const genresContent = document.querySelector('.genres-content');
    const genresIcon = document.querySelector('.genres-toggle-icon');

    if (genresHeader && genresContent) {
        genresHeader.addEventListener('click', () => {
            genresContent.classList.toggle('collapsed');
            if (genresIcon) genresIcon.classList.toggle('rotated');
        });
    }

    const ctx = document.getElementById('steamGenresChart');
    if (!ctx) return;

    const genreCounts = {};
    let hasGenres = false;
    if (steamData.top_games) {
        steamData.top_games.forEach(game => {
            if (game.tags && Array.isArray(game.tags)) {
                hasGenres = true;
                const hours = parseFloat(game.hours || 0);
                game.tags.forEach(tag => {
                    genreCounts[tag] = (genreCounts[tag] || 0) + hours;
                });
            }
        });
    }

    if (steamData.profile && steamData.profile.hiddenDotaHours) {
        hasGenres = true;
        genreCounts["MOBA"] = (genreCounts["MOBA"] || 0) + steamData.profile.hiddenDotaHours;
        genreCounts["Киберспорт"] = (genreCounts["Киберспорт"] || 0) + steamData.profile.hiddenDotaHours;
    }

    if (!hasGenres) {
        ctx.parentElement.innerHTML = '<p class="text-muted" style="text-align: center; padding: 2rem; font-size: 0.9rem;">Добавь массив "tags" к играм в steam-profile-data.js, чтобы увидеть график!</p>';
        return;
    }

    const sortedGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const isLight = document.body.classList.contains('light-theme');
    const textColor = isLight ? '#000000' : '#f3f4f6';

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sortedGenres.map(g => g[0]),
            datasets: [{
                data: sortedGenres.map(g => Math.round(g[1])),
                backgroundColor: ['#66c0f4', '#a5b4fc', '#f472b6', '#34d399', '#fbbf24', '#f87171', '#818cf8', '#2dd4bf', '#a78bfa', '#e879f9'],
                borderWidth: 2,
                borderColor: isLight ? '#ffffff' : '#1e293b',
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: textColor, font: { family: "'Inter', sans-serif", size: 12, weight: 600 } }
                },
                tooltip: {
                    backgroundColor: isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)',
                    titleColor: isLight ? '#000' : '#fff',
                    bodyColor: isLight ? '#000' : '#fff',
                    borderColor: '#66c0f4',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return ` ${context.label}: ${context.raw} часов`;
                        }
                    }
                }
            }
        }
    });

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            setTimeout(() => {
                const updatedIsLight = document.body.classList.contains('light-theme');
                const chartInstance = Chart.getChart(ctx);
                if (chartInstance) {
                    chartInstance.options.plugins.legend.labels.color = updatedIsLight ? '#000000' : '#f3f4f6';
                    chartInstance.data.datasets[0].borderColor = updatedIsLight ? '#ffffff' : '#1e293b';
                    chartInstance.options.plugins.tooltip.backgroundColor = updatedIsLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)';
                    chartInstance.options.plugins.tooltip.titleColor = updatedIsLight ? '#000' : '#fff';
                    chartInstance.options.plugins.tooltip.bodyColor = updatedIsLight ? '#000' : '#fff';
                    chartInstance.update();
                }
            }, 50);
        });
    }
}