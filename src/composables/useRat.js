import { onMounted, onBeforeUnmount, ref } from 'vue'

/**
 * The studio rat.
 *
 * States: hidden -> approach -> steal -> flee, plus flinch (cursor moved) and
 * an occasional edge peek. Driven by a single requestAnimationFrame loop that
 * writes transforms directly to the element, so it never triggers a re-render.
 *
 * Disabled entirely for prefers-reduced-motion, coarse pointers and small
 * viewports. Purely decorative: aria-hidden, pointer-events: none.
 */
export function useRat(ratRef, { idleDelay = 6000 } = {}) {
  const leftACoin = ref(false)

  let raf = null
  let cleanup = null

  onMounted(() => {
    // Repeat visitors find a coin the rat left behind in the footer.
    try {
      const key = 'ratslayer.visits'
      const visits = parseInt(localStorage.getItem(key) || '0', 10) + 1
      localStorage.setItem(key, String(visits))
      leftACoin.value = visits > 1
    } catch {
      /* storage blocked — no coin, no problem */
    }

    const el = ratRef.value
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (reduced || !fine || window.innerWidth < 700) return

    new Image().src = '/assets/rat2.png'
    el.style.display = 'block'

    const R = {
      x: -200, y: -200, tx: -200, ty: -200,
      dir: 1, side: -1, state: 'hidden', t0: 0, coin: false,
      nextPeek: performance.now() + 25000 + Math.random() * 30000,
    }
    let cx = null
    let cy = null
    let lastMove = performance.now()

    const setCoin = (on) => {
      if (R.coin === on) return
      R.coin = on
      el.src = on ? '/assets/rat2.png' : '/assets/rat1.png'
    }

    const hide = () => {
      R.state = 'hidden'
      el.style.opacity = '0'
      setCoin(false)
      R.nextPeek = performance.now() + 30000 + Math.random() * 40000
    }

    const spawn = () => {
      R.side = cx > window.innerWidth / 2 ? 1 : -1
      R.x = R.side === 1 ? window.innerWidth + 70 : -70
      R.y = Math.min(window.innerHeight - 30, cy + 26)
      R.state = 'approach'
      el.style.opacity = '1'
    }

    const peek = () => {
      R.side = Math.random() > 0.5 ? 1 : -1
      R.y = window.innerHeight * (0.35 + Math.random() * 0.45)
      R.x = R.side === 1 ? window.innerWidth + 60 : -60
      R.tx = R.side === 1 ? window.innerWidth - 34 : -10
      R.state = 'peek'
      R.t0 = 0
      el.style.opacity = '1'
    }

    const onMove = (e) => {
      cx = e.clientX
      cy = e.clientY
      lastMove = performance.now()
      if (R.state === 'approach' || R.state === 'steal' || R.state === 'peek') {
        R.state = 'flinch'
        R.t0 = performance.now()
      }
    }
    // Cursor left the document: treat as "not idle" so the rat waits politely.
    const onLeave = () => { lastMove = performance.now() + 1e7 }
    const onEnter = () => { lastMove = performance.now() }
    const onBlur = () => { if (R.state !== 'hidden') hide() }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('blur', onBlur)

    const frame = (now) => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const idle = now - lastMove

      if (R.state === 'hidden') {
        if (cx !== null && idle > idleDelay) spawn()
        else if (now > R.nextPeek && idle < 2000) peek()
      } else if (R.state === 'approach') {
        R.tx = cx - 22
        R.ty = cy - 6
        const dx = R.tx - R.x
        const dy = R.ty - R.y
        const d = Math.hypot(dx, dy)
        if (d < 4) {
          R.state = 'steal'
          R.t0 = now
        } else {
          const sp = Math.min(0.11, 6.5 / Math.max(d, 1)) * 1.6
          R.x += dx * sp
          R.y += dy * sp
          R.dir = dx >= 0 ? 1 : -1
        }
      } else if (R.state === 'steal') {
        const t = now - R.t0
        if (t > 260) setCoin(true)
        if (t > 1100) {
          R.state = 'flee'
          R.dir = R.side
        }
      } else if (R.state === 'flinch') {
        if (now - R.t0 > 170) {
          R.state = 'flee'
          R.dir = R.side || 1
        }
      } else if (R.state === 'flee') {
        const goal = R.side === 1 ? vw + 90 : -90
        R.x += (goal - R.x) * 0.1 + R.side * 3.5
        R.y += (Math.min(vh - 20, R.y + 30) - R.y) * 0.04
        if (R.x > vw + 70 || R.x < -70) hide()
      } else if (R.state === 'peek') {
        if (!R.t0) {
          const dx = R.tx - R.x
          R.x += dx * 0.12
          R.dir = dx >= 0 ? 1 : -1
          if (Math.abs(dx) < 3) R.t0 = now
        } else if (now - R.t0 > 900) {
          R.state = 'flee'
        }
      }

      if (R.state !== 'hidden') {
        const moving =
          R.state === 'approach' ||
          R.state === 'flee' ||
          (R.state === 'peek' && !R.t0)
        const bob = moving ? Math.sin(now / 70) * 1.6 : 0
        const scale = R.state === 'flinch' ? 1.09 : 1
        el.style.transform =
          'translate3d(' + R.x.toFixed(1) + 'px,' + (R.y + bob).toFixed(1) +
          'px,0) scale(' + scale + ') scaleX(' + (R.dir === 1 ? 1 : -1) + ')'
      }

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    cleanup = () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('blur', onBlur)
    }
  })

  onBeforeUnmount(() => cleanup && cleanup())

  return { leftACoin }
}
