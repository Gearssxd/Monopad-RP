// Áudios
const bgMusic = new Audio('audios/background.mp3');
bgMusic.loop = true;
const clickSound = new Audio('audios/click.mp3');

document.addEventListener('click', () => {
    bgMusic.play().catch(() => {});
}, { once: true });

// Dados do seu Jogo
const data = {
    personagens: [
        { nome: "Seu Personagem 1", talento: "Ultimate ???", foto: "fotos/p1.png", desc: "Sua ficha técnica aqui..." },
        { nome: "Seu Personagem 2", talento: "Ultimate ???", foto: "fotos/p2.png", desc: "Outra ficha aqui..." }
    ],
    bullets: [
        { nome: "Pista do Carrossel", desc: "Um pedaço de pano rosa encontrado na engrenagem." }
    ],
    eventos: [
        { nome: "O Início", desc: "Todos acordaram na entrada do parque às 08:00." }
    ]
};

function updateClock() {
    document.getElementById('clock').textContent = new Date().toLocaleTimeString('pt-BR');
}
setInterval(updateClock, 1000);

function showTab(tab) {
    const display = document.getElementById('display-area');
    const staticOverlay = document.getElementById('static-overlay');

    // Efeitos Iniciais
    clickSound.currentTime = 0;
    clickSound.play();
    staticOverlay.classList.add('noise-active');
    display.classList.add('content-hidden', 'glitch-effect');

    setTimeout(() => {
        // Renderizar Conteúdo
        display.innerHTML = `<h1 style="color:var(--neon-blue)">${tab.toUpperCase()}</h1>`;
        
        data[tab].forEach(item => {
            const div = document.createElement('div');
            div.className = `card ${tab === 'personagens' ? 'char-card' : ''}`;
            
            if (tab === 'personagens') {
                div.innerHTML = `
                    <img src="${item.foto}" class="char-img">
                    <div class="char-info">
                        <h3>${item.nome}</h3>
                        <p><strong>Talento:</strong> ${item.talento}</p>
                        <p>${item.desc}</p>
                    </div>`;
            } else {
                div.innerHTML = `<h3>${item.nome}</h3><p>${item.desc}</p>`;
            }
            display.appendChild(div);
        });

        // Voltar ao normal
        staticOverlay.classList.remove('noise-active');
        display.classList.remove('content-hidden', 'glitch-effect');
    }, 500);
}