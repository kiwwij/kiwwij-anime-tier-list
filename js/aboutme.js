document.addEventListener('DOMContentLoaded', () => {
    const birthDate = new Date(2006, 11, 2); // 2 декабря 2006
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Вывод возраста
    const ageMain = document.getElementById('infoAge');
    const ageCard = document.getElementById('infoAgeCard');

    if (ageMain) ageMain.textContent = `${age} лет`;
    if (ageCard) ageCard.textContent = `${age} лет`;

    // Steam данные
    if (typeof steamData !== 'undefined') {
        if (steamData.profile && steamData.profile.avatar) {
            document.getElementById('aboutAvatar').src = steamData.profile.avatar;
        }
        const statusEl = document.getElementById('miniSteamStatus');
        if (steamData.profile) {
            statusEl.textContent = steamData.profile.status;
            if (steamData.profile.statusColor) {
                statusEl.style.color = steamData.profile.statusColor;
                statusEl.style.backgroundColor = steamData.profile.statusColor + '25';
            }
        }
        if (steamData.stats) {
            document.getElementById('miniTotalGames').textContent = steamData.stats.total_games;
        }
    }
});


// --- ГАЛЕРЕЯ STEAM ---
const steamGallery = [
    { year: 2022, src: 'img/about me/steam22.1.png' },
    { year: 2023, src: 'img/about me/steam23.1.png' },
    { year: 2024, src: 'img/about me/steam24.1.png' },
    { year: 2025, src: 'img/about me/steam25.1.png' }
];

// Автосортировка старые → новые
steamGallery.sort((a, b) => a.year - b.year);


let currentIndex = 0;

// Находим индекс года в массиве
function openSteamYear(year) {
    currentIndex = steamGallery.findIndex(item => item.year === year);

    if (currentIndex === -1) return;

    updateSteamLightbox();
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function changeImage(n) {
    currentIndex += n;

    if (currentIndex >= steamGallery.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = steamGallery.length - 1;

    updateSteamLightbox();
}

function updateSteamLightbox() {
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    img.src = steamGallery[currentIndex].src;
    caption.textContent = `Steam ${steamGallery[currentIndex].year}`;
}


// Управление с клавиатуры
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") changeImage(1);
    if (event.key === "ArrowLeft") changeImage(-1);
});