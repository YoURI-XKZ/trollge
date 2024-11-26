const dino = document.getElementById('dino');
const gameArea = document.getElementById('gameArea');
const ground = document.getElementById('ground');
const gameOverScreen = document.getElementById('gameOverScreen'); // Tela de Game Over
const gameOverSound = document.getElementById('gameOverSound'); // Som de Game Over
const themeSong = document.getElementById('theme'); // Música de fundo
const restartButton = document.getElementById('restartButton'); // Botão de reinício

let isJumping = false;
let gravity = 0.9;
let dinoBottom = 0;
let isGameOver = false;
let obstacleInterval;
let obstacles = [];

// Começar o jogo e tocar a música
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping && !isGameOver) {
        if (themeSong.paused) {
            themeSong.play(); // Toca a música quando o jogo começa
        }
        jump();
    }
});

// Função para pular
function jump() {
    isJumping = true;
    let jumpHeight = 0;

    const jumpInterval = setInterval(() => {
        if (jumpHeight < 100) {
            dinoBottom += 5;
            jumpHeight += 5;
        } else {
            clearInterval(jumpInterval);
            fall();
        }
        dino.style.bottom = `${dinoBottom}px`;
    }, 20);
}

// Função para cair
function fall() {
    const fallInterval = setInterval(() => {
        if (dinoBottom > 0) {
            dinoBottom -= 5;
        } else {
            clearInterval(fallInterval);
            isJumping = false;
        }
        dino.style.bottom = `${dinoBottom}px`;
    }, 20);
}

// Função para criar obstáculos
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    gameArea.appendChild(obstacle);

    let obstacleLeft = 800;
    const obstacleInterval = setInterval(() => {
        if (obstacleLeft <= 0) {
            clearInterval(obstacleInterval);
            gameArea.removeChild(obstacle);
        } else {
            obstacleLeft -= 5;
            obstacle.style.left = `${obstacleLeft}px`;
        }

        if (!isGameOver && isCollision(obstacle)) {
            gameOver();
        }
    }, 20);
}

// Função para verificar colisão
function isCollision(obstacle) {
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return (
        dinoRect.left < obstacleRect.left + obstacleRect.width &&
        dinoRect.left + dinoRect.width > obstacleRect.left &&
        dinoRect.top < obstacleRect.top + obstacleRect.height &&
        dinoRect.top + dinoRect.height > obstacleRect.top
    );
}

// Função de Game Over
function gameOver() {
    isGameOver = true;
    gameOverScreen.style.display = 'flex'; // Exibe a tela de Game Over
    themeSong.pause(); // Pausa a música de fundo
    themeSong.currentTime = 0; // Reseta a música para o início

    // Tocar o som de Game Over
    gameOverSound.play();

    clearInterval(obstacleInterval); // Desabilita a criação de mais obstáculos
}

// Gerar obstáculos a cada 2 segundos
setInterval(() => {
    if (!isGameOver) {
        createObstacle();
    }
}, 2000);

// Reiniciar o jogo quando o botão for clicado
restartButton.addEventListener('click', () => {
    location.reload(); // Recarrega a página para reiniciar o jogo
});

// Tecla 'R' para reiniciar o jogo
document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyR') { // Verifica se a tecla pressionada é 'R'
        location.reload(); // Recarrega a página
    }
});




// Evitar o redirecionamento se o jogo estiver em Game Over
setTimeout(function () {
if (!isGameOver) {
    window.open("lore/final.html","_self"); 
} else {
    console.log(".");
}
}, 15000);