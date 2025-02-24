<script setup>
import { onMounted } from 'vue';
import backgroundImage from '@/assets/background.webp';

// Rain effect setup
onMounted(() => {
  const canvas = document.getElementById('rainCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let raindrops = [];
  let windSpeed = 1; // Negative for leftward, positive for rightward

  // Create a rain particle
  function createRaindrop() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 6 + 3,
    };
  }

  // Initialize raindrops
  for (let i = 0; i < 50; i++) {
    raindrops.push(createRaindrop());
  }

  // Draw the rain
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

  // Update raindrops
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
});
</script>

<template>
  <div class="placeholder">
    <!-- Background with blur -->
    <div class="background-image"></div>

    <!-- Rain Canvas -->
    <canvas id="rainCanvas"></canvas>

    <!-- Title without blur -->
    <h1 class="title">RatSlayerGames <br /> Coming Soon...</h1>
  </div>
</template>

<style scoped>
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url('@/assets/background.webp') no-repeat center center/cover;
  filter: blur(10px) brightness(20%);
  z-index: -2;
}

.placeholder {
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  color: white;
  font-size: 3rem;
  font-weight: bold;
  z-index: 1;
}

#rainCanvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}
</style>
