<script setup>
import { onMounted, ref, reactive } from 'vue';

let ratPosition = reactive({ x: -50, y: -50 });
let isMouseIdle = ref(false);
let ratHasCoin = ref(false);
let ratReachedCursor = ref(false);

let mouseTimer = null;
let ratElement = null;
let moveToCornerTimer = null;
let mouseX = null;
let mouseY = null;

onMounted(() => {
  ratElement = document.querySelector('.rat');

  document.addEventListener('mousemove', (e) => {
    clearTimeout(mouseTimer);

    mouseX = e.pageX;
    mouseY = e.pageY;

    isMouseIdle.value = false;
    ratHasCoin.value = false;
    ratPosition.x = -50;

    mouseTimer = setTimeout(() => {
      isMouseIdle.value = true;
      ratReachedCursor.value = false;
      ratPosition.x = mouseX;
      ratPosition.y = mouseY;
    }, 1000);
  });

  // Handle rat movement when idle
  setInterval(() => {
    if (isMouseIdle.value && !ratReachedCursor.value) {

      if (Math.abs(ratPosition.x - mouseX) > 5 || Math.abs(ratPosition.y - mouseY) > 5) {
        if (ratPosition.x < mouseX) {
          ratPosition.x += 10;
        } else if (ratPosition.x > mouseX) {
          ratPosition.x -= 10;
        }

        if (ratPosition.y < mouseY) {
          ratPosition.y += 10;
        } else if (ratPosition.y > mouseY) {
          ratPosition.y -= 10;
        }

      } else {
        ratHasCoin.value = true;
        ratReachedCursor.value = true;

        // Start the "run" animation to the corner
        moveToCornerTimer = setTimeout(() => {
          const corner = Math.random() > 0.5 ? 'top-left' : 'bottom-right';
          if (corner === 'top-left') {
            ratPosition.x = 0;
            ratPosition.y = 0;
          } else {
            ratPosition.x = window.innerWidth - 50;
            ratPosition.y = window.innerHeight - 50;
          }

          setTimeout(() => {
            ratPosition.x = -50;
            ratPosition.y = -50;
            ratHasCoin.value = false;
            ratReachedCursor.value = false;
          }, 1000);


        }, 1500);
      }
    }
  }, 20); // Check every 20ms for rat movement

  //#region light
  // Handle light
  const light = document.querySelector('.light');
  document.addEventListener('mousemove', (e) => {
    const x = e.pageX;
    const y = e.pageY;
    light.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent, rgba(0, 0, 0, 0.9) 100%)`;
  });
  //#endregion

  //#region rain
  // Rain animation (kept as is)
  const canvas = document.getElementById('rainCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let raindrops = [];
  let windSpeed = 1;

  function createRaindrop() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 6 + 3,
    };
  }

  for (let i = 0; i < 50; i++) {
    raindrops.push(createRaindrop());
  }

  function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1.5;

    raindrops.forEach((drop) => {
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x + windSpeed * 2, drop.y + drop.length);
      ctx.stroke();
    });
  }

  function updateRain() {
    raindrops.forEach((drop) => {
      drop.y += drop.speed;
      drop.x += windSpeed;

      if (drop.y > canvas.height || drop.x < 0 || drop.x > canvas.width) {
        drop.y = 0;
        drop.x = Math.random() * canvas.width;
      }
    });
  }

  function animate() {
    drawRain();
    updateRain();
    requestAnimationFrame(animate);
  }

  animate();
  //#endregion
});

</script>

<template>
  <section>
    <div class="overlay"></div>
    <div class="light"></div>
    <div class="placeholder">
      <h1 class="title">RatSlayerGames</h1>
      <p>Coming soon...</p>
    </div>
    <img v-if="isMouseIdle" class="rat" :src="ratHasCoin ? '/assets/rat2.png' : '/assets/rat1.png'"
      :style="{ left: `${ratPosition.x}px`, top: `${ratPosition.y}px` }" />
    <canvas id="rainCanvas"></canvas>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

section {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('@/assets/background.webp') no-repeat center center/cover;
  background-size: cover;
  overflow: hidden;
}

.overlay {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.light {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.placeholder {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 3;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.6);
  z-index: 3;
}

p {
  font-size: 1.5em;
  margin-top: 20px;
}

#rainCanvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
  pointer-events: none;
}

.rat {
  position: absolute;
  width: 50px;
  height: 25px;
  z-index: 1000;
  transition: left 0.1s, top 0.1s;
  pointer-events: none;
  z-index: 20;
}
</style>
