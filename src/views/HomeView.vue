<script setup>
import { ref } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import { useReveal } from '../composables/useReveal'
import { useRat } from '../composables/useRat'
const keyArt = '/assets/dnd-main-capsule.png'

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
          <p class="rs-eyebrow" data-reveal>Independent studio</p>
          <h1 data-reveal data-reveal-delay="90">Death keeps the score.</h1>
          <p class="lede" data-reveal data-reveal-delay="180">
            Ratslayer Games is a small independent studio. Two projects in
            progress — one of them announced.
          </p>
          <div data-reveal data-reveal-delay="260">
            <a class="btn" href="#games">See the games</a>
          </div>
        </div>
        <div class="cue" aria-hidden="true"></div>
      </section>

      <!-- Games -->
      <section id="games">
        <div class="rs-wrap">
          <div class="rule" data-reveal>
            <h2 class="rs-eyebrow">Games</h2>
            <span class="rs-eyebrow">Two</span>
          </div>
        </div>

        <!-- Project I — Dungeons & Death -->
        <article class="project">
          <div class="rs-wrap">
            <div class="status" data-reveal>
              <span class="dot live" aria-hidden="true"></span>
              <span class="rs-eyebrow live-t">In development</span>
              <span class="rs-eyebrow faint">Project I</span>
            </div>
            <h3 data-reveal data-reveal-delay="60">Dungeons &amp; Death</h3>
            <p class="body-lg" data-reveal data-reveal-delay="120">
              Brave shifting dark-fantasy dungeons alone or with up to four
              heroes — or let a fifth player become the hostile Director,
              shaping encounters, bargains and a Black Knight rival. An action
              roguelite where death leaves a permanent mark.
            </p>
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
                <h4 class="rs-eyebrow">Four heroes</h4>
                <p>Warrior, Wizard, Rogue or Monk — defend, cast, ambush or fight hand-to-hand, each with its own skill tree. Solo, or online with up to four.</p>
              </div>
              <div>
                <h4 class="rs-eyebrow">The Director</h4>
                <p>A fifth player plays against you — spending a limited budget on reinforcements, traps, events and dangerous bargains.</p>
              </div>
              <div>
                <h4 class="rs-eyebrow">Become the Black Knight</h4>
                <p>At the right moment the Director enters the dungeon in person — a playable rival with a full combat kit.</p>
              </div>
              <div>
                <h4 class="rs-eyebrow">Death marks you</h4>
                <p>Fallen heroes are remembered in the Hall of the Fallen. The next adventurer carries on without them.</p>
              </div>
            </div>

            <div class="media" data-reveal>
              <div class="media-head">
                <h4 class="rs-eyebrow">Media</h4>
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

            <!-- REPLACE: becomes <a class="pill" href="STEAM_URL"> once the page is live. -->
            <p class="pill" data-reveal>
              <span class="dot live" aria-hidden="true"></span>
              Steam page coming soon
            </p>
          </div>
        </article>

        <!-- Project II — unannounced -->
        <article class="project second">
          <div class="rs-wrap">
            <div class="status" data-reveal>
              <span class="dot" aria-hidden="true"></span>
              <span class="rs-eyebrow">Unannounced</span>
              <span class="rs-eyebrow faint">Project II</span>
            </div>
            <div class="redacted" data-reveal data-reveal-delay="80">
              <div class="scan" aria-hidden="true"></div>
              <div class="bar" aria-hidden="true"></div>
            </div>
            <p class="rs-eyebrow wide" data-reveal data-reveal-delay="140">Redacted</p>
            <p class="body-sm" data-reveal data-reveal-delay="180">Not yet. It will be worth the wait.</p>
          </div>
        </article>
      </section>

      <!-- Studio -->
      <section id="studio">
        <div class="rs-wrap">
          <div class="rule" data-reveal>
            <h2 class="rs-eyebrow">Studio</h2>
          </div>
          <div class="studio-grid">
            <p class="statement" data-reveal>Nothing ships until it feels right in the hands.</p>
            <div class="studio-copy" data-reveal data-reveal-delay="90">
              <p>We are a small independent studio. We work slowly, on purpose — chasing combat with real weight, decisions that matter and deaths that leave a mark.</p>
              <p>Dungeons &amp; Death is what we are building now. The second project stays quiet until it can speak for itself.</p>
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
          <div class="foot-meta rs-eyebrow">
            <span>Steam soon</span>
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
.btn {
  display: inline-flex;
  align-items: center;
  margin-top: clamp(40px, 7vw, 72px);
  padding: 14px 24px;
  border-radius: 999px;
  background: var(--rs-text);
  color: #000;
  font-size: 14px;
  transition: transform 300ms var(--rs-ease), background 300ms ease;
}
.btn:hover { transform: translateY(-2px); background: #fff; color: #000; }
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
.project.second { padding-top: clamp(72px, 12vw, 168px); }
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

.body-lg {
  margin-top: clamp(20px, 3vw, 28px);
  font-size: clamp(16px, 1.9vw, 20px);
  color: var(--rs-text-60);
  max-width: 44em;
  text-wrap: pretty;
}
.body-sm { margin-top: 14px; font-size: 15px; color: rgba(242, 241, 238, 0.5); max-width: 34em; }

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
}

.redacted {
  position: relative;
  aspect-ratio: 21 / 8;
  min-height: 200px;
  overflow: hidden;
  border: 1px solid var(--rs-line);
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(120% 140% at 50% 20%, #101010, #060606 55%, #000);
}
.redacted .scan {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0 2px, transparent 2px 6px);
  opacity: 0.7;
}
.redacted .bar {
  position: relative;
  width: min(58%, 420px);
  height: clamp(34px, 5.5vw, 58px);
  background: #000;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.04);
}
.wide { margin-top: 18px; letter-spacing: 0.28em; }

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
.foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px; padding-top: 36px; padding-bottom: 44px; }
.foot-mark { display: flex; align-items: center; gap: 12px; color: rgba(242, 241, 238, 0.42); }
.foot-meta { display: flex; align-items: center; gap: 24px; color: var(--rs-text-25); }
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
