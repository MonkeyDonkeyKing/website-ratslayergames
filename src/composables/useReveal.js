import { onMounted, onBeforeUnmount } from 'vue'

/**
 * Restrained scroll reveal. Elements opt in with [data-reveal] and an optional
 * [data-reveal-delay] in ms. Hidden state is applied by JS only, so content
 * stays visible if scripting or IntersectionObserver is unavailable.
 */
export function useReveal(rootRef) {
  let io = null

  onMounted(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) return

    const root = rootRef?.value ?? document
    const els = Array.from(root.querySelectorAll('[data-reveal]'))

    els.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(16px)'
      el.style.transition =
        'opacity 900ms var(--rs-ease), transform 900ms var(--rs-ease)'
      el.style.transitionDelay = (el.dataset.revealDelay || 0) + 'ms'
    })

    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return
          en.target.style.opacity = '1'
          en.target.style.transform = 'none'
          io.unobserve(en.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    els.forEach((el) => io.observe(el))
  })

  onBeforeUnmount(() => io && io.disconnect())
}
