<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const STEAM_URL =
  'https://store.steampowered.com/app/5085640/?utm_source=website&utm_medium=owned&utm_campaign=release&utm_content=nav'

const scrolled = ref(false)
const menuOpen = ref(false)

const onScroll = () => (scrolled.value = window.scrollY > 24)
const onResize = () => { if (window.innerWidth >= 720) menuOpen.value = false }
const onKey = (e) => { if (e.key === 'Escape') menuOpen.value = false }

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <header class="head" :class="{ 'is-scrolled': scrolled }">
    <nav class="bar rs-wrap" aria-label="Primary">
      <a class="mark" href="#top">
        <span class="dot" aria-hidden="true"></span>
        Ratslayer Games
      </a>

      <div class="right">
        <div class="links">
          <a href="#games">Games</a>
          <a href="#studio">About</a>
          <a class="soon" :href="STEAM_URL" target="_blank" rel="noopener">Buy on Steam</a>
        </div>

        <button
          class="burger"
          type="button"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="menuOpen"
          aria-controls="rs-menu"
          @click="menuOpen = !menuOpen"
        >
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </nav>
  </header>

  <div v-if="menuOpen" id="rs-menu" class="sheet">
    <a href="#games" @click="menuOpen = false">Games</a>
    <a href="#studio" @click="menuOpen = false">About</a>
    <a class="rs-eyebrow" :href="STEAM_URL" target="_blank" rel="noopener" @click="menuOpen = false">Buy on Steam</a>
  </div>
</template>

<style scoped>
.head {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  border-bottom: 1px solid transparent;
  transition: background 400ms ease, border-color 400ms ease;
}
.head.is-scrolled {
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom-color: var(--rs-line);
}
.bar {
  height: var(--rs-nav-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.mark {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
.dot { width: 7px; height: 7px; border-radius: 99px; background: var(--rs-accent); }
.right { display: flex; align-items: center; }
.links { display: flex; align-items: center; gap: clamp(20px, 3vw, 36px); }
.links a { font-size: 13px; color: var(--rs-text-60); transition: color 250ms ease; }
.links a:hover { color: var(--rs-text); }
.soon { font-family: var(--rs-mono); font-size: 12px; color: var(--rs-text-25); transition: color 250ms ease; }
.soon:hover { color: var(--rs-accent); }

.burger {
  display: none;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}
.burger span {
  display: block;
  height: 1px;
  width: 22px;
  background: var(--rs-text);
  transition: transform 300ms var(--rs-ease), width 300ms ease;
}
.burger span:last-child { width: 14px; }
.burger span.open:first-child { transform: translateY(3px) rotate(45deg); }
.burger span.open:last-child { width: 22px; transform: translateY(-3px) rotate(-45deg); }

.sheet {
  position: fixed;
  inset: 0;
  z-index: 99;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 0 var(--rs-gutter);
}
.sheet a {
  font-size: clamp(34px, 10vw, 52px);
  letter-spacing: -0.02em;
  padding: 10px 0;
}
.sheet p { margin-top: 28px; }

@media (max-width: 719px) {
  .links { display: none; }
  .burger { display: flex; }
}
@media (prefers-reduced-motion: reduce) {
  .head, .burger span { transition: none; }
}
</style>
