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

const discordGallery2025 = [
    { year: 2025, src: 'img/about me/discrod 2025/1.png' },
    { year: 2025, src: 'img/about me/discrod 2025/2.png' },
    { year: 2025, src: 'img/about me/discrod 2025/3.png' },
    { year: 2025, src: 'img/about me/discrod 2025/4.png' },
    { year: 2025, src: 'img/about me/discrod 2025/5.png' },
    { year: 2025, src: 'img/about me/discrod 2025/6.png' },
    { year: 2025, src: 'img/about me/discrod 2025/7.png' },
    { year: 2025, src: 'img/about me/discrod 2025/8.png' },
    { year: 2025, src: 'img/about me/discrod 2025/9.png' }
];

const discordGallery2026 = [
    { year: 2025, src: 'img/about me/discrod 2026/1.png' },
    { year: 2025, src: 'img/about me/discrod 2026/2.png' },
    { year: 2025, src: 'img/about me/discrod 2026/3.png' },
    { year: 2025, src: 'img/about me/discrod 2026/4.png' },
    { year: 2025, src: 'img/about me/discrod 2026/5.png' },
    { year: 2025, src: 'img/about me/discrod 2026/6.png' },
    { year: 2025, src: 'img/about me/discrod 2026/7.png' },
    { year: 2025, src: 'img/about me/discrod 2026/8.png' },
    { year: 2025, src: 'img/about me/discrod 2026/9.png' }
];

// Автосортировка для Twitch и Steam (Discord сортировать не надо, там порядок важен)
steamGallery.sort((a, b) => a.year - b.year);
twitchGallery.sort((a, b) => a.year - b.year);

// --- МОДАЛКА ---
let currentIndex = 0;
let currentGalleryType = 'steam'; // 'steam', 'twitch', 'discord'

function getCurrentGalleryArray() {
    if (currentGalleryType === 'steam') return steamGallery;
    if (currentGalleryType === 'twitch') return twitchGallery;
    if (currentGalleryType === 'discord2025') return discordGallery2025;
    if (currentGalleryType === 'discord2026') return discordGallery2026;
    return [];
}

function openLightbox(index, type) {
    currentGalleryType = type;
    currentIndex = index;
    updateLightbox();
    document.getElementById('lightbox').style.display = 'flex';
}

function updateLightbox() {
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const gallery = getCurrentGalleryArray();

    if (gallery.length > 0 && gallery[currentIndex]) {
        img.src = gallery[currentIndex].src;
        
        // Красивая подпись
        let label = '';
        if (currentGalleryType === 'steam') label = 'Steam';
        else if (currentGalleryType === 'twitch') label = 'Twitch';
        else if (currentGalleryType === 'discord') label = 'Discord';

        // Если это Discord, добавляем счетчик (1/9)
        if (currentGalleryType === 'discord') {
             caption.textContent = `${label} ${gallery[currentIndex].year} (${currentIndex + 1} из ${gallery.length})`;
        } else {
             caption.textContent = `${label} ${gallery[currentIndex].year}`;
        }
    }
}

function changeImage(n) {
    const gallery = getCurrentGalleryArray();
    currentIndex += n;

    // Циклическая прокрутка
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