document.addEventListener('DOMContentLoaded', () => {
    const birthDate = new Date(2006, 11, 2);
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

const steamGallery = [
    { year: 2025, src: 'img/about me/steam25.1.png' },
    { year: 2024, src: 'img/about me/steam24.1.png' },
    { year: 2023, src: 'img/about me/steam23.1.png' },
    { year: 2022, src: 'img/about me/steam22.1.png' }
];

const twitchGallery = [
    { year: 2025, src: 'img/about me/twitch25.png' },
    { year: 2024, src: 'img/about me/twitch24.png' },
    { year: 2023, src: 'img/about me/twitch23.png' }
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

steamGallery.sort((a, b) => a.year - b.year);
twitchGallery.sort((a, b) => a.year - b.year);

let currentIndex = 0;
let currentGalleryType = 'steam';

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
        
        let label = '';
        if (currentGalleryType === 'steam') label = 'Steam';
        else if (currentGalleryType === 'twitch') label = 'Twitch';
        else if (currentGalleryType === 'discord') label = 'Discord';

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

    if (currentIndex >= gallery.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = gallery.length - 1;

    updateLightbox();
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

document.addEventListener('keydown', function(event) {
    if (document.getElementById('lightbox').style.display === 'flex') {
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") changeImage(1);
        if (event.key === "ArrowLeft") changeImage(-1);
    }
});

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let currentInput = [];

document.addEventListener('keydown', (e) => {
    currentInput.push(e.key);
    currentInput = currentInput.slice(-konamiCode.length);

    if (currentInput.join('') === konamiCode.join('')) {
        activateGlitchMode();
    }
});

function activateGlitchMode() {
    document.body.style.filter = 'invert(1) hue-rotate(180deg)';
    document.body.style.transition = 'all 0.5s ease';
    alert('СЕКРЕТНЫЙ РЕЖИМ: Активирован визуальный глитч!');
    
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 5000);
}

const avatar = document.getElementById('aboutAvatar');
let clickCount = 0;

if (avatar) {
    avatar.style.cursor = 'pointer';
    avatar.addEventListener('click', () => {
        clickCount++;
        
        avatar.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => avatar.style.transform = 'scale(1)', 100);

        if (clickCount === 10) {
            avatar.src = 'https://kiwwij.github.io/kiwwij-anime-tier-list/img/about%20me/secret_avatar.png'; 
            avatar.style.border = '3px solid red';
            avatar.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
            console.log('Пасхалка: Йошимура активирован!');
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof socialData === "undefined") {
        console.warn("socialData не найден");
        return;
    }

    const ytBox = document.getElementById("yt-video-container");

    if (ytBox && socialData.youtube && socialData.youtube.lastVideoId) {
        const videoId = socialData.youtube.lastVideoId;
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // превью

        ytBox.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="yt-preview-link">
                <img src="${thumbnailUrl}" alt="YouTube видео" class="yt-preview-img">
                <div class="yt-play-icon">▶</div>
            </a>
        `;
    } else if (ytBox) {
        ytBox.innerHTML = `<p style="color:#94a3b8">Видео не найдено</p>`;
    }

    const tgBox = document.getElementById("tg-post-container");

    if (tgBox && socialData.telegram && socialData.telegram.lastPostId) {
        tgBox.innerHTML = "";

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.setAttribute(
            "data-telegram-post",
            `${socialData.telegram.channelName}/${socialData.telegram.lastPostId}`
        );
        script.setAttribute("data-width", "100%");
        script.setAttribute("data-dark", "1");

        tgBox.appendChild(script);
    } else if (tgBox) {
        tgBox.innerHTML = `<p style="color:#94a3b8">Пост не найден</p>`;
    }
});

function switchDiscordYear(year, btn) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const containers = ['discord-2025', 'discord-2026'];
    containers.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = 'none';
            el.classList.remove('active');
        }
    });

    const activeGrid = document.getElementById(`discord-${year}`);
    if (activeGrid) {
        activeGrid.style.display = ''; 
        activeGrid.classList.add('active');
    }
}