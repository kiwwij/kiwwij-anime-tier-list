document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.anime-group .compact-grid');

    grids.forEach(grid => {
        const items = Array.from(grid.querySelectorAll('.anime-item'));

        items.sort((a, b) => {
            const titleElementA = a.querySelector('.anime-title');
            const titleElementB = b.querySelector('.anime-title');
            const titleA = titleElementA ? titleElementA.textContent.trim() : '';
            const titleB = titleElementB ? titleElementB.textContent.trim() : '';
            return titleA.localeCompare(titleB, 'ru');
        });
        items.forEach(item => grid.appendChild(item));
    });
});