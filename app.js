document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const gameOverAlert = document.getElementById('alert')
    let gravity = 0.9;
    let isJumping = false;
    let isGameOver = false;
  
    function control(e) {
      if (e.code === 'Space') {
        if (!isJumping) {
          console.log('jump');
          jump();
        }
      }
    }
  
    function jump() {
      isJumping = true;
      let count = 0;
      let position = 0;
      let timerId = setInterval(() => {
        if (count === 15) {
          clearInterval(timerId);
          let downTimerId = setInterval(() => {
            if (position === 0) {
              clearInterval(downTimerId);
              isJumping = false;
            }
            position -= 5;
            position = position * gravity;
            dino.style.bottom = position + 'px';
            console.log('going down');
          }, 20);
        }
        position += 30;
        count++;
        position = position * gravity;
        dino.style.bottom = position + 'px';
        console.log('going up');
      }, 20);
    }
  
    function generateObstacles() {
        let RandomTime = Math.random() * 4000;
      let obstaclePosition = 1000;
      const obstacle = document.createElement('div');
      obstacle.classList.add('obstacle');
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + 'px';
  
      let timerId = setInterval(() => {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
            clearInterval(timerId); 
            alert.innerHTML = 'Game Over';
            isGameOver = true;
            // remove all children
            while (grid.firstChild) {
              grid.removeChild(grid.lastChild);
            }
        }

        obstaclePosition -= 10;
        obstacle.style.left = obstaclePosition + 'px';
      }, 20);
      if (!isGameOver) {
        setInterval(generateObstacles, 4000);
      }  
    }
  
    generateObstacles();
  
  
    document.addEventListener('keydown', control);
  });
  