<script setup>
import { ref } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import { useReveal } from '../composables/useReveal'
import { useRat } from '../composables/useRat'
const keyArt = '/assets/dnd-main-capsule.png'

const STEAM_URL_HERO =
  'https://store.steampowered.com/app/5085640/?utm_source=website&utm_medium=owned&utm_campaign=coming_soon&utm_content=hero'
const STEAM_URL_REPEAT =
  'https://store.steampowered.com/app/5085640/?utm_source=website&utm_medium=owned&utm_campaign=coming_soon&utm_content=repeat_cta'
const STEAM_URL_FOOTER =
  'https://store.steampowered.com/app/5085640/?utm_source=website&utm_medium=owned&utm_campaign=coming_soon&utm_content=footer'

const screenshots = [
  { src: '/assets/screenshots/01-road-hold-the-ground.png', alt: 'The party holds the ground against attackers on a torchlit road.' },
  { src: '/assets/screenshots/02-forest-cultist-ambush.png', alt: 'A cultist ambush in the forest, projectiles crossing the clearing.' },
  { src: '/assets/screenshots/03-cavern-ritual-fight.png', alt: 'Melee and ranged fighting around a ritual in a cavern.' },
  { src: '/assets/screenshots/04-cavern-break-the-ritual.png', alt: 'Breaking the ritual in an objective room deep in the caverns.' },
  { src: '/assets/screenshots/05-skeleton-king-last-monarch.png', alt: 'Skeleton King boss fight, opening phase: The Last Monarch.' },
  { src: '/assets/screenshots/06-skeleton-king-dead-court.png', alt: 'Skeleton King second phase: The Dead Court.' },
  { src: '/assets/screenshots/07-skeleton-king-broken-crown.png', alt: 'Close-range climax against the Skeleton King: Broken Crown.' },
]

const page = ref(null)
const rat = ref(null)

useReveal(page)
const { leftACoin } = useRat(rat)
</script>

<template>
  <div ref="page">
    <a class="rs-skip" href="#main">Skip to content</a>
    <SiteHeader />

    <main id="main">
      <!-- Hero -->
      <section id="top" class="hero">
        <div class="rs-wrap">
          <p class="rs-eyebrow" data-reveal>DUNGEONS &amp; DEATH</p>
          <h1 data-reveal data-reveal-delay="90">Fight alone or with friends. Your road ends at the Black Knight.</h1>
          <p class="lede" data-reveal data-reveal-delay="180">
            A top-down dark-fantasy action roguelite for solo play and online
            co-op with up to four heroes. Build a roster that can die for
            good, uncover hidden paths, and work toward The Final Oath. An
            optional fifth player can take the Director's seat and make the
            dungeon fight back.
          </p>
          <div class="cta-row" data-reveal data-reveal-delay="260">
            <a class="btn" :href="STEAM_URL_HERO" target="_blank" rel="noopener">WISHLIST ON STEAM</a>
            <a class="btn btn-secondary" href="#gameplay">WATCH GAMEPLAY</a>
          </div>
        </div>
        <div class="cue" aria-hidden="true"></div>
      </section>

      <!-- Games -->
      <section id="games">
        <div class="rs-wrap">
          <div class="rule" data-reveal>
            <h2 class="rs-eyebrow">Games</h2>
          </div>
        </div>

        <!-- Dungeons & Death -->
        <article class="project">
          <div class="rs-wrap">
            <div class="status" data-reveal>
              <span class="dot live" aria-hidden="true"></span>
              <span class="rs-eyebrow live-t">In development</span>
            </div>
            <h3 data-reveal data-reveal-delay="60">Dungeons &amp; Death</h3>
          </div>

          <figure class="art" data-reveal data-reveal-delay="140">
            <div class="art-frame">
              <img
                :src="keyArt"
                width="1232"
                height="706"
                decoding="async"
                alt="Dungeons &amp; Death key art: Warrior, Wizard, Rogue and Monk facing the armoured Black Knight in a torchlit dungeon."
              />
              <div class="art-fade" aria-hidden="true"></div>
            </div>
            <figcaption class="rs-wrap rs-eyebrow">Key art</figcaption>
          </figure>

          <div class="rs-wrap">
            <dl class="facts" data-reveal>
              <div><dt class="rs-eyebrow">Players</dt><dd>1–4, plus Director</dd></div>
              <div><dt class="rs-eyebrow">Genre</dt><dd>Co-op action roguelite</dd></div>
              <div><dt class="rs-eyebrow">Platform</dt><dd>PC</dd></div>
              <div><dt class="rs-eyebrow">Release</dt><dd>To be announced</dd></div>
            </dl>

            <div class="pillars" data-reveal>
              <div>
                <h4 class="rs-eyebrow">FIGHT YOUR WAY</h4>
                <p>Block, parry, charge, grapple and build class skills across quick, standard or long expeditions.</p>
              </div>
              <div>
                <h4 class="rs-eyebrow">KEEP THE SURVIVORS</h4>
                <p>Build a persistent roster in the tavern. Fallen heroes are remembered. A retired hero is gone for good.</p>
              </div>
              <div>
                <h4 class="rs-eyebrow">FIND THE ROAD</h4>
                <p>Routes, events and hidden paths can change the expedition. Some doors only appear when you find them.</p>
              </div>
              <div>
                <h4 class="rs-eyebrow">LET THE DUNGEON FIGHT BACK</h4>
                <p>An optional fifth player can spend limited resources against the party, possess enemies and enter the field as the Black Knight.</p>
              </div>
            </div>

            <div id="gameplay" class="media" data-reveal>
              <div class="media-head">
                <h4 class="rs-eyebrow">Gameplay</h4>
                <span class="rs-eyebrow faint">Private beta</span>
              </div>
              <video
                class="trailer"
                controls
                preload="none"
                poster="/assets/trailer-poster.webp"
                src="/assets/dnd-trailer.mp4"
                width="1920"
                height="1080"
              >
                Your browser does not support embedded video.
              </video>
              <ul class="shots">
                <li v-for="shot in screenshots" :key="shot.src">
                  <img :src="shot.src" :alt="shot.alt" width="1920" height="1080" loading="lazy" decoding="async" />
                </li>
              </ul>
            </div>

            <a class="pill" :href="STEAM_URL_REPEAT" target="_blank" rel="noopener" data-reveal>
              <span class="dot live" aria-hidden="true"></span>
              WISHLIST ON STEAM
            </a>
          </div>
        </article>
      </section>

      <!-- About -->
      <section id="studio">
        <div class="rs-wrap">
          <div class="rule" data-reveal>
            <h2 class="rs-eyebrow">About</h2>
          </div>
          <div class="studio-grid">
            <p class="statement" data-reveal>ONE GAME. ONE DEVELOPER.</p>
            <div class="studio-copy" data-reveal data-reveal-delay="90">
              <p>Dungeons &amp; Death is currently made by one independent developer under the RatSlayerGames name. I post the current build, the systems I am changing and the parts that still need work.</p>
              <p>RatSlayerGames is a publishing name, not a claim that a larger studio is behind the game.</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div class="rs-wrap foot">
          <div class="rs-eyebrow foot-mark">
            Ratslayer Games
            <span v-if="leftACoin" class="coin" title="Something left this behind." aria-hidden="true"></span>
          </div>
          <p class="foot-line rs-eyebrow">Dungeons &amp; Death is coming soon on Steam.</p>
          <div class="foot-meta rs-eyebrow">
            <a :href="STEAM_URL_FOOTER" target="_blank" rel="noopener">Steam</a>
            <span>© {{ new Date().getFullYear() }}</span>
          </div>
        </div>
      </footer>
    </main>

    <!-- Studio rat. Decorative; driven entirely by useRat(). -->
    <img ref="rat" class="rat" src="/assets/rat1.png" alt="" aria-hidden="true" />
  </div>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 120px 0 80px;
}
.hero h1 {
  font-size: clamp(44px, 9vw, 104px);
  line-height: 0.98;
  letter-spacing: -0.035em;
  font-weight: 500;
  margin-top: clamp(28px, 5vw, 44px);
  text-wrap: balance;
}
.lede {
  margin-top: clamp(24px, 4vw, 36px);
  font-size: clamp(16px, 2.1vw, 21px);
  color: var(--rs-text-60);
  max-width: 30em;
  text-wrap: pretty;
}
.cta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: clamp(14px, 2.4vw, 22px);
  margin-top: clamp(40px, 7vw, 72px);
}
.btn {
  display: inline-flex;
  align-items: center;
  padding: 14px 24px;
  border-radius: 999px;
  background: var(--rs-text);
  color: #000;
  font-size: 14px;
  letter-spacing: 0.04em;
  transition: transform 300ms var(--rs-ease), background 300ms ease, color 300ms ease, border-color 300ms ease;
}
.btn:hover { transform: translateY(-2px); background: #fff; color: #000; }
.btn-secondary {
  background: transparent;
  color: var(--rs-text);
  border: 1px solid rgba(255, 255, 255, 0.22);
}
.btn-secondary:hover { background: rgba(255, 255, 255, 0.06); color: var(--rs-text); border-color: rgba(255, 255, 255, 0.4); }
.cue {
  position: absolute;
  bottom: 32px;
  left: 50%;
  width: 1px;
  height: 56px;
  background: linear-gradient(to bottom, rgba(242, 241, 238, 0.28), transparent);
}

#games { padding-top: clamp(64px, 10vw, 140px); scroll-margin-top: var(--rs-nav-h); }
#studio { padding-top: clamp(96px, 14vw, 200px); scroll-margin-top: var(--rs-nav-h); }

.rule {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}
.rule h2 { font-weight: 400; }

.project { padding-top: clamp(48px, 8vw, 96px); }
.project h3 {
  font-size: clamp(34px, 6.4vw, 72px);
  line-height: 1;
  letter-spacing: -0.035em;
  font-weight: 500;
}
.status { display: flex; align-items: center; gap: 10px; margin-bottom: clamp(18px, 3vw, 26px); }
.dot { width: 6px; height: 6px; border-radius: 99px; background: rgba(242, 241, 238, 0.2); }
.dot.live { background: var(--rs-accent); }
.live-t { color: var(--rs-accent); }
.faint { color: var(--rs-text-25); }

.art { margin-top: clamp(40px, 6vw, 72px); }
.art-frame {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  overflow: hidden;
  background: var(--rs-surface);
}
.art-frame img {
  display: block;
  width: 100%;
  height: auto;
  transition: transform 900ms var(--rs-ease);
}
.art-frame:hover img { transform: scale(1.02); }
.art-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 55%, rgba(0, 0, 0, 0.55));
  pointer-events: none;
}
.art figcaption { margin-top: 14px; }

.facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1px;
  margin-top: clamp(48px, 7vw, 88px);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.07);
}
.facts > div { background: var(--rs-bg); padding: 22px 20px; }
.facts dd { margin-top: 10px; font-size: 15px; color: rgba(242, 241, 238, 0.9); }

.pillars {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(28px, 4vw, 48px);
  margin-top: clamp(48px, 7vw, 88px);
}
.pillars h4 { font-weight: 400; margin-bottom: 14px; }
.pillars p { font-size: 15px; line-height: 1.65; color: var(--rs-text-60); text-wrap: pretty; }

.media { margin-top: clamp(56px, 8vw, 104px); }
.media-head { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
.trailer {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  border: 1px solid var(--rs-line);
  background: #000;
}
.shots {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}
.shots img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--rs-line);
  background: var(--rs-surface);
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: clamp(40px, 6vw, 64px);
  padding: 13px 22px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  font-size: 13px;
  color: rgba(242, 241, 238, 0.7);
  transition: border-color 250ms ease, color 250ms ease;
}
.pill:hover { border-color: rgba(255, 255, 255, 0.32); color: var(--rs-text); }

.studio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(32px, 6vw, 80px);
  padding-top: clamp(40px, 6vw, 72px);
}
.statement { font-size: clamp(22px, 3.4vw, 38px); line-height: 1.25; letter-spacing: -0.02em; text-wrap: pretty; }
.studio-copy { display: flex; flex-direction: column; gap: 20px; max-width: 34em; padding-top: 6px; }
.studio-copy p { color: rgba(242, 241, 238, 0.58); line-height: 1.7; text-wrap: pretty; }

footer { margin-top: clamp(96px, 14vw, 200px); border-top: 1px solid var(--rs-line); }
.foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px 20px; padding-top: 36px; padding-bottom: 44px; }
.foot-mark { display: flex; align-items: center; gap: 12px; color: rgba(242, 241, 238, 0.42); }
.foot-line { color: var(--rs-text-25); order: 3; flex-basis: 100%; }
.foot-meta { display: flex; align-items: center; gap: 24px; color: var(--rs-text-25); }
.foot-meta a { transition: color 250ms ease; }
.foot-meta a:hover { color: var(--rs-text); }

@media (min-width: 720px) {
  .foot-line { order: 0; flex-basis: auto; }
}
.coin {
  width: 9px;
  height: 9px;
  border-radius: 99px;
  background: radial-gradient(circle at 35% 30%, #e8c46a, #a37c1c);
  box-shadow: 0 0 10px rgba(201, 162, 39, 0.35);
}

.rat {
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  width: 44px;
  height: auto;
  z-index: 60;
  opacity: 0;
  pointer-events: none;
  will-change: transform, opacity;
  transition: opacity 220ms ease;
  filter: brightness(0.78) saturate(0.7) contrast(1.05);
}

@media (prefers-reduced-motion: reduce) {
  .btn, .art-frame img, .rat { transition: none; }
  .art-frame:hover img { transform: none; }
}
</style>
