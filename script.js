const gameContainer = document.getElementById('gameContainer');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');

let playerPos = { x: 180, y: 100 };
let velocityY = 0;
let gravity = 0.3;
let isJumping = false;
let score = 0;
document.addEventListener('keydown', (e) => {
    const step = 20;
    if (e.key === 'ArrowLeft') {
        playerPos.x -= step;
        if (playerPos.x < 0) playerPos.x = 0;
    } else if (e.key === 'ArrowRight') {
        playerPos.x += step;
        if (playerPos.x > gameContainer.offsetWidth - player.offsetWidth)
            playerPos.x = gameContainer.offsetWidth - player.offsetWidth;
    }
    player.style.left = playerPos.x + 'px';
});
let platforms = [];
function createPlatforms() {
    for (let i = 0; i < 6; i++) {
        const plat = document.createElement('div');
        plat.classList.add('platform');
        plat.style.left = Math.random() * (gameContainer.offsetWidth - 80) + 'px';
        plat.style.top = i * 100 + 'px';
        gameContainer.appendChild(plat);
        platforms.push(plat);
    }
}
function gameLoop() {
    velocityY += gravity;
    playerPos.y += velocityY;
    player.style.top = playerPos.y + 'px';
    platforms.forEach((plat) => {
        const platTop = parseInt(plat.style.top);
        const platLeft = parseInt(plat.style.left);
        const platRight = platLeft + 80;

        if (
            playerPos.y + 40 >= platTop &&
            playerPos.y + 40 <= platTop + 10 &&
            playerPos.x + 40 > platLeft &&
            playerPos.x < platRight &&
            velocityY > 0
        ) {
            velocityY = -10; 
            score++;
            scoreDisplay.textContent = score;
        }
    });
    if (playerPos.y < 200) {
        platforms.forEach((plat) => {
            plat.style.top = parseInt(plat.style.top) + 5 + 'px';
            if (parseInt(plat.style.top) > 600) {
                plat.style.top = 0;
                plat.style.left = Math.random() * (gameContainer.offsetWidth - 80) + 'px';
            }
        });
        playerPos.y += 5;
    }
    if (playerPos.y > gameContainer.offsetHeight) {
        alert('Game Over! Score: ' + score);
        location.reload();
    }

    requestAnimationFrame(gameLoop);
}
function createSnowflake() {
    const snow = document.createElement('div');
    snow.classList.add('snowflake');
    snow.style.left = Math.random() * 400 + 'px';
    gameContainer.appendChild(snow);

    let top = 0;
    const fallInterval = setInterval(() => {
        top += 2;
        snow.style.top = top + 'px';
        if (top > 600) {
            gameContainer.removeChild(snow);
            clearInterval(fallInterval);
        }
    }, 20);
}

setInterval(createSnowflake, 300);
createPlatforms();
gameLoop();
