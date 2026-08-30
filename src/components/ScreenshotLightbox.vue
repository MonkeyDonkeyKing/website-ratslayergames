<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

/**
 * Dependency-free image lightbox. Controlled via v-model:index — pass the
 * screenshot array in `items` ({ src, alt }) and bind the open index; set it
 * to null to close. Closes on backdrop click, the close button, or Escape.
 * Arrow keys / on-screen arrows move between items (wraps around). Focus
 * moves to the dialog on open and returns to the trigger on close.
 */
const props = defineProps({
  items: { type: Array, required: true },
  index: { type: Number, default: null },
})
const emit = defineEmits(['update:index'])

const open = computed(
  () => props.index !== null && props.index >= 0 && props.index < props.items.length,
)
const current = computed(() => (open.value ? props.items[props.index] : null))

const dialogRef = ref(null)
const closeBtnRef = ref(null)
let lastFocused = null

function close() {
  emit('update:index', null)
}
function go(delta) {
  if (!open.value) return
  const len = props.items.length
  emit('update:index', (props.index + delta + len) % len)
}
function onBackdropClick(e) {
  if (e.target === e.currentTarget) close()
}
function onKeydown(e) {
  if (e.key === 'Escape') return close()
  if (e.key === 'ArrowRight') return go(1)
  if (e.key === 'ArrowLeft') return go(-1)
  if (e.key === 'Tab') {
    const focusable = Array.from(dialogRef.value?.querySelectorAll('button') ?? [])
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

watch(
  () => props.index,
  async (val, oldVal) => {
    // `immediate` makes oldVal undefined on the first call, so treat both
    // "undefined" and "null" as the closed state (covers mounting with an
    // already-open index, not just toggling it after mount).
    const wasOpen = oldVal !== undefined && oldVal !== null
    const isOpen = val !== null

    if (isOpen && !wasOpen) {
      lastFocused = document.activeElement
      window.addEventListener('keydown', onKeydown)
      document.documentElement.style.overflow = 'hidden'
      await nextTick()
      closeBtnRef.value?.focus()
    } else if (!isOpen && wasOpen) {
      window.removeEventListener('keydown', onKeydown)
      document.documentElement.style.overflow = ''
      lastFocused?.focus?.()
      lastFocused = null
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      ref="dialogRef"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="current?.alt || 'Screenshot viewer'"
      @click="onBackdropClick"
    >
      <button ref="closeBtnRef" class="lb-close" type="button" aria-label="Close" @click="close">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            d="M5 5L19 19M19 5L5 19"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <button
        v-if="items.length > 1"
        class="lb-nav lb-prev"
        type="button"
        aria-label="Previous screenshot"
        @click="go(-1)"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M15 4L7 12L15 20"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <figure class="lb-figure" @click.stop>
        <img :src="current.src" :alt="current.alt" />
        <figcaption v-if="current.alt" class="rs-eyebrow">{{ current.alt }}</figcaption>
      </figure>

      <button
        v-if="items.length > 1"
        class="lb-nav lb-next"
        type="button"
        aria-label="Next screenshot"
        @click="go(1)"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M9 4L17 12L9 20"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <p v-if="items.length > 1" class="lb-count rs-eyebrow">{{ index + 1 }} / {{ items.length }}</p>
    </div>
  </Teleport>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 5vw, 56px);
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: saturate(140%) blur(6px);
  -webkit-backdrop-filter: saturate(140%) blur(6px);
  animation: lb-fade 220ms var(--rs-ease);
}
@keyframes lb-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.lb-figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  max-width: min(1400px, 100%);
  max-height: 100%;
}
.lb-figure img {
  display: block;
  max-width: 100%;
  max-height: 78vh;
  width: auto;
  height: auto;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: var(--rs-surface);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
}
.lb-figure figcaption {
  text-align: center;
  max-width: 60em;
}

.lb-close,
.lb-nav {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(0, 0, 0, 0.5);
  color: var(--rs-text);
  cursor: pointer;
  transition: border-color 200ms ease, color 200ms ease, background 200ms ease;
}
.lb-close:hover,
.lb-nav:hover {
  border-color: rgba(255, 255, 255, 0.4);
  color: var(--rs-accent);
  background: rgba(0, 0, 0, 0.7);
}
.lb-close {
  top: clamp(14px, 3vw, 28px);
  right: clamp(14px, 3vw, 28px);
}
.lb-nav {
  top: 50%;
  transform: translateY(-50%);
}
.lb-prev { left: clamp(8px, 2.4vw, 24px); }
.lb-next { right: clamp(8px, 2.4vw, 24px); }

.lb-count {
  position: fixed;
  bottom: clamp(14px, 3vw, 24px);
  left: 50%;
  transform: translateX(-50%);
  color: var(--rs-text-40);
}

@media (max-width: 560px) {
  .lb-close, .lb-nav { width: 40px; height: 40px; }
}
@media (prefers-reduced-motion: reduce) {
  .lightbox { animation: none; }
}
</style>
