document.addEventListener('DOMContentLoaded', () => {
    const birthDate = new Date(2006, 11, 2); // 2 декабря 2006
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    const ageMain = document.getElementById('infoAge');
    const ageCard = document.getElementById('infoAgeCard');
    if (ageMain) ageMain.textContent = `${age} лет`;
    if (ageCard) ageCard.textContent = `${age} лет`;

    // --- STEAM ДАННЫЕ ---
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

// --- ГАЛЕРЕИ ---
const steamGallery = [
    { year: 2022, src: 'img/about me/steam22.1.png' },
    { year: 2023, src: 'img/about me/steam23.1.png' },
    { year: 2024, src: 'img/about me/steam24.1.png' },
    { year: 2025, src: 'img/about me/steam25.1.png' }
];

const twitchGallery = [
    { year: 2023, src: 'img/about me/twitch23.png' },
    { year: 2024, src: 'img/about me/twitch24.png' },
    { year: 2025, src: 'img/about me/twitch25.png' }
];

// Автосортировка старые → новые
steamGallery.sort((a, b) => a.year - b.year);
twitchGallery.sort((a, b) => a.year - b.year);

// --- МОДАЛКА ---
let currentIndex = 0;
let currentGallery = 'steam'; // 'steam' или 'twitch'

function openLightbox(index, type) {
    currentGallery = type;
    currentIndex = index;
    updateLightbox();
    document.getElementById('lightbox').style.display = 'flex';
}

function updateLightbox() {
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    let gallery = currentGallery === 'steam' ? steamGallery : twitchGallery;

    img.src = gallery[currentIndex].src;
    caption.textContent = `${currentGallery === 'steam' ? 'Steam' : 'Twitch'} ${gallery[currentIndex].year}`;
}

function changeImage(n) {
    let gallery = currentGallery === 'steam' ? steamGallery : twitchGallery;
    currentIndex += n;

    if (currentIndex >= gallery.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = gallery.length - 1;

    updateLightbox();
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// --- КЛАВИАТУРА ---
document.addEventListener('keydown', function(event) {
    if (document.getElementById('lightbox').style.display === 'flex') {
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") changeImage(1);
        if (event.key === "ArrowLeft") changeImage(-1);
    }
});