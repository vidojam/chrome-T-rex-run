document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    let gravity = 0.9;
    let isJumping = false;
  
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
  
    function control(e) {
      if (e.code === 'Space') {
        if (!isJumping) {
          console.log('jump');
          jump();
        }
      }
    }
  
    document.addEventListener('keydown', control);
  });
  