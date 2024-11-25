const dino = document.getElementById('dino');
const gameArea = document.getElementById('gameArea');
const ground = document.getElementById('ground');
const gameOverScreen = document.getElementById('gameOverScreen'); // Tela de Game Over
const gameOverSound = document.getElementById('gameOverSound'); // Som de Game Over
const themeSong = document.getElementById ('theme')
let isJumping = false;
let gravity = 0.9;
let dinoBottom = 0;
let isGameOver = false;
let obstacleInterval;
let obstacles = [];


document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping && !isGameOver) {
        jump();
    }
});

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

// Verificando colisões
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

//*musica
function tocarMusica() {
    setTimeout(() => {
        themeSong.play();

    },1000);
}

function gameOver() {
    isGameOver = true;
    gameOverScreen.style.display = 'flex'; // Exibe a tela de Game Over

    function stopMusica(){
        themeSong.pause()
    }

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


document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyR') {  // Verifica se a tecla pressionada é 'R'
        location.reload();  // Recarrega a página
    }
});

