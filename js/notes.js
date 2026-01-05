document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("notesContainer");
    const navToggle = document.getElementById("notesNavToggle");
    const nav = document.getElementById("notesNav");
    const navLinks = document.getElementById("notesNavLinks");

    if (!container || !navToggle || !nav || !navLinks) return;

    /* === Генерация заметок === */
    notes.forEach((note, index) => {
        const card = document.createElement("div");
        card.className = "note-card";
        card.id = `note-${index + 1}`;

        card.innerHTML = `
            <h2 class="note-title">Запись #${note.id}</h2>
            <div class="note-date">Дата: <span>${note.date}</span></div>
            <div class="note-text">${note.text}</div>
        `;

        container.appendChild(card);

        /* === Ссылка в архиве === */
        const link = document.createElement("a");
        link.href = `#note-${index + 1}`;
        link.textContent = `Запись #${note.id}`;

        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });

        navLinks.appendChild(link);
    });

    /* === Открытие / закрытие архива === */
    navToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

});
