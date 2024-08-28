document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const alertElement = document.getElementById('alert');
    let gravity = 0.9;
    let isJumping = false;
    let isGameOver = false;
    let position = 0; // Declare the position variable outside of the jump function

    function control(e) {
        if (e.code === 'Space' && !isJumping && !isGameOver) {
            console.log('jump');
            jump();
        }
    }

    function jump() {
        isJumping = true;
        let count = 0;
        let jumpUpTimerId = setInterval(() => {
            if (count === 15) {
                clearInterval(jumpUpTimerId);
                let jumpDownTimerId = setInterval(() => {
                    if (position <= 0) {
                        clearInterval(jumpDownTimerId);
                        isJumping = false;
                        position = 0; // Ensure dino ends up at the ground
                        dino.style.bottom = position + 'px';
                    } else {
                        position -= 5;
                        position *= gravity;
                        dino.style.bottom = position + 'px';
                        console.log('going down');
                    }
                }, 20);
            } else {
                position += 30;
                count++;
                position *= gravity;
                dino.style.bottom = position + 'px';
                console.log('going up');
            }
        }, 20);
    }

    function generateObstacles() {
        if (isGameOver) return; // Stop generating obstacles if game is over

        let obstaclePosition = 1000;
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        grid.appendChild(obstacle);
        obstacle.style.left = obstaclePosition + 'px';

        let obstacleTimerId = setInterval(() => {
            if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                clearInterval(obstacleTimerId);
                alertElement.innerHTML = 'Game Over';
                isGameOver = true;
                // Remove all children
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild);
                }
            } else {
                obstaclePosition -= 10;
                obstacle.style.left = obstaclePosition + 'px';
            }
        }, 20);

        // Schedule next obstacle
        setTimeout(generateObstacles, 4000);
    }

    generateObstacles();
    document.addEventListener('keydown', control);
});
