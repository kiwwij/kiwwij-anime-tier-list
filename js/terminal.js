const terminalData = [
    {
        command: "cat stack_overflow.log",
        content: "Программирование дается сложно. Борьба с <b>JavaScript</b> и <b>React</b> продолжается ежедневно. Каждая решенная ошибка — это маленькая победа."
    },
    {
        command: "check --environment",
        content: "Для работы необходим полный фокус: <b>Breakcore</b> на максимум и ритмичный звук механических переключателей. Шум клавиатуры — единственный надежный метроном реальности."
    },
    {
        command: "system_diagnostic.sh",
        content: `
            <div class="system-info">
                <ul>
                    <li>CPU: Intel Core i7-11800H</li>
                    <li>GPU: NVIDIA GeForce RTX 3050 Ti</li>
                    <li>RAM: 16 GB</li>
                    <li>STATUS: <span class="trigger" onclick="showSecret()">[ДАННЫЕ ЗАШИФРОВАНЫ]</span></li>
                </ul>
            </div>`
    },
    {
        command: "exit",
        content: 'Завершение процесса... <a href="../index.html">Вернуться в GUI</a><span class="cursor"></span>'
    }
];

const container = document.getElementById('terminal-content');

async function renderTerminal() {
    document.getElementById('currentDate').innerText = new Date().toLocaleString();

    for (const item of terminalData) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `<p class="command">${item.command}</p><p>${item.content}</p>`;
        
        container.appendChild(entry);
        
        setTimeout(() => entry.classList.add('visible'), 50);
        
        window.scrollTo(0, document.body.scrollHeight);
    }
}

function showSecret() {
    const secret = document.getElementById('secret-log');
    secret.style.display = 'block';
    window.scrollTo(0, document.body.scrollHeight);
}

window.onload = renderTerminal;

function maybeSpawnZoro() {
    if (Math.random() > 0.05) return; 

    if (document.querySelector('.zoro-lost')) return;

    console.log("⚔️ Zoro is lost again...");

    const zoro = document.createElement('img');
    zoro.src = 'img/roronoa_zoro.png'; 
    zoro.className = 'zoro-lost';
    document.body.appendChild(zoro);

    setTimeout(() => {
        zoro.classList.add('zoro-walk');
    }, 50);

    setTimeout(() => {
        zoro.remove();
    }, 12000);
}

if (typeof tabButtons !== 'undefined') {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', maybeSpawnZoro);
    });
}

setTimeout(maybeSpawnZoro, 1000);