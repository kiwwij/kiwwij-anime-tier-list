document.addEventListener('DOMContentLoaded', () => {
    const birthDate = new Date(2006, 11, 2); // 2 декабря 2006
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Вывод в оба элемента, если они есть
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

// --- ГАЛЕРЕЯ ---
const galleryData = {
    'twitch': [
        { src: 'img/about me/twitch23.png', caption: 'Twitch Recap 2023' },
        { src: 'img/about me/twitch24.png', caption: 'Twitch Recap 2024' },
        { src: 'img/about me/twitch25.png', caption: 'Twitch Recap 2025' }
    ],
    'steam': [
        // 2022
        { src: 'img/about me/steam22.1.png', caption: 'Steam 2022 (1)' },
        { src: 'img/about me/steam22.2.png', caption: 'Steam 2022 (2)' },
        { src: 'img/about me/steam22.3.png', caption: 'Steam 2022 (3)' },
        // 2023
        { src: 'img/about me/steam23.1.png', caption: 'Steam 2023 (1)' },
        { src: 'img/about me/steam23.2.png', caption: 'Steam 2023 (2)' },
        { src: 'img/about me/steam23.3.png', caption: 'Steam 2023 (3)' },
        // 2024
        { src: 'img/about me/steam24.1.png', caption: 'Steam 2024 (1)' },
        { src: 'img/about me/steam24.2.png', caption: 'Steam 2024 (2)' },
        { src: 'img/about me/steam24.3.png', caption: 'Steam 2024 (3)' },
        // 2025
        { src: 'img/about me/steam25.1.png', caption: 'Steam 2025 (1)' },
        { src: 'img/about me/steam25.2.png', caption: 'Steam 2025 (2)' },
        { src: 'img/about me/steam25.3.png', caption: 'Steam 2025 (3)' },
    ]
};

let currentGroup = [];
let currentIndex = 0;

function openLightbox(index, groupName) {
    currentGroup = galleryData[groupName];
    currentIndex = index;
    updateLightbox();
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function changeImage(n) {
    currentIndex += n;
    if (currentIndex >= currentGroup.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentGroup.length - 1;
    updateLightbox();
}

function updateLightbox() {
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    img.src = currentGroup[currentIndex].src;
    caption.textContent = currentGroup[currentIndex].caption;
}
        
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") changeImage(1);
    if (event.key === "ArrowLeft") changeImage(-1);
});