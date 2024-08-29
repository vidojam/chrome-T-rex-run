document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const alertElement = document.getElementById('alert');
    let gravity = 0.9;
    let isJumping = false;
    let isGameOver = false;
    let position = 0;

    function control(e) {
        if (e.code === 'Space' && !isJumping && !isGameOver) {
            console.log('jump');
            jump();
        }
        if (e.code === 'Enter' && isGameOver) {
            console.log('restart');
           
            resetGame();
            
        }
    }

    function jump() {
        isJumping = true;
        let count = 0;

        const jumpUpTimerId = setInterval(() => {
            if (count === 15) {
                clearInterval(jumpUpTimerId);
                const jumpDownTimerId = setInterval(() => {
                    if (position <= 0) {
                        clearInterval(jumpDownTimerId);
                        isJumping = false;
                        position = 0;
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

        dino.classList.add('dino');
        grid.appendChild(dino);
        dino.style.left = position + 'px';
        
        jump();

        const obstacleTimerId = setInterval(() => {
            if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                clearInterval(obstacleTimerId);
                isGameOver = true;
                if (alertElement) {
                    alertElement.innerHTML = 'Game Over. Press Enter to Restart';
                    
                } else {
                    console.log('Game Over. Press Enter to Restart'); // Fallback
                }
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

    function resetGame() {
        // Reset game state
        isJumping = true;
        isGameOver = false;
        position = 0;
        dino.style.bottom = position + 'px';
        dino.style.backgroundImage = 'url("dino-run1.png")'; // Ensure the background image is set
        
        
        alertElement.innerHTML = ''; // Clear the game over message

        // Clear existing obstacles
        // while (grid.firstChild) {
        //     grid.removeChild(grid.lastChild);
        // }

        // Restart obstacle generation
        generateObstacles();
    }

    document.addEventListener('keydown', control);
    generateObstacles();

});

