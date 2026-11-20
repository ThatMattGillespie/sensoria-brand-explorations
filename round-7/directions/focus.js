/* 7A · Focus. The optics become the imagery. Photos arrive soft, with a faint colour fringe, and come into focus:
   the hero photo has a lens that follows the cursor, the state tiles sharpen on hover, and the wide photo
   sharpens as it scrolls into view. Everything else stays still and square. */
(function () {
  const R = window.REFRACT, C = R.C;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.LAYOUTS.push({
    id: 'focus',
    name: 'Focus',
    idea: 'The optics become the imagery. Photos arrive soft with a faint colour fringe and come into focus: a lens follows the cursor over the hero photo, state tiles sharpen on hover, and the wide photo sharpens as it scrolls into view.',
    css: `
      .fo-hero { display: grid; grid-template-columns: 6fr 6fr; gap: 64px; align-items: center; padding-top: 64px; }
      .fo-hero .display { font-size: clamp(48px, 5.4vw, 80px); line-height: .97; }
      .fo-hero .lead { font-size: 22px; max-width: 30ch; margin-top: 28px; }
      .lens { position: relative; aspect-ratio: 1; overflow: hidden; cursor: crosshair; --x: 50%; --y: 46%; --r: 150px; }
      .lens img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .lens .soft { filter: blur(14px) saturate(.75) brightness(1.05); transform: scale(1.06); }
      .lens .sharp { clip-path: circle(var(--r) at var(--x) var(--y)); transition: clip-path .08s linear; }
      .lens .ring { position: absolute; left: var(--x); top: var(--y); width: calc(var(--r) * 2); height: calc(var(--r) * 2); translate: -50% -50%; border-radius: 50%; pointer-events: none;
        box-shadow: inset 0 0 0 1px rgba(254,254,254,.6), -2px 0 0 0 rgba(64,224,208,.55), 2px 0 0 0 rgba(255,210,141,.65); }
      .fig-cap { font: 13px/1.4 var(--font-text); color: var(--ink-2); margin-top: 10px; }
      .fig-cap b { font: 12px var(--font-label); color: var(--ink); margin-right: 10px; }
      .fo-tiles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 56px; }
      .fo-tile { display: grid; gap: 12px; align-content: start; text-decoration: none; color: inherit; min-width: 0; }
      .fo-tile .ph { aspect-ratio: 4 / 5; overflow: hidden; background: #dcd5c8; }
      .fo-tile img { width: 100%; height: 100%; object-fit: cover; display: block; filter: blur(9px) saturate(.6) drop-shadow(-3px 0 0 rgba(64,224,208,.6)) drop-shadow(3px 0 0 rgba(255,210,141,.6)); transform: scale(1.08);
        transition: filter .5s ease, transform .6s ease; }
      .fo-tile:hover img, .fo-tile:focus-within img { filter: none; transform: scale(1); }
      .fo-tile b { font: 400 21px/1.1 var(--font-display); letter-spacing: -.02em; }
      .fo-tile span { font-size: 14px; color: var(--ink-2); }
      .fo-tile .n { font: 12px var(--font-label); color: var(--ink-2); }
      .fo-tile.note { align-content: end; } .fo-tile.note b { font-size: 30px; line-height: 1.05; } .fo-tile.note span { font-size: 16px; }
      .fo-wide { max-width: 1440px; margin: 160px auto 0; }
      .fo-wide .ph { aspect-ratio: 21 / 9; overflow: hidden; }
      .fo-wide img { width: 100%; height: 100%; object-fit: cover; display: block; filter: blur(var(--b, 16px)) brightness(1.3) url(#r2-duo); transform: scale(1.04); transition: filter .2s linear; }
      .fo-wide .fig-cap { max-width: 1200px; margin: 10px auto 0; padding: 0 40px; }
      @media (max-width: 900px) { .fo-hero { grid-template-columns: 1fr; gap: 32px; padding-top: 32px; } .fo-tiles { grid-template-columns: 1fr 1fr; gap: 16px; }
        .lens .soft { filter: none; } .lens .sharp, .lens .ring { display: none; } .fo-tile img { filter: none; transform: none; } .fo-wide { margin-top: 96px; } .fo-wide .ph { aspect-ratio: 4 / 3; } .fo-wide .fig-cap { padding: 0 16px; } }
      @media (prefers-reduced-motion: reduce) { .lens .soft, .fo-tile img, .fo-wide img { filter: none !important; transform: none !important; } .lens .sharp, .lens .ring { display: none; } }
    `,
    render: (K) => `
      ${K.head()}
      <section class="i7 fo-hero" data-sec="Hero">
        <div data-sub="Copy">${K.meta()}${K.bt('h1', 'display', K.hero.title)}<p class="lead">${K.hero.lead}</p>${K.btns()}</div>
        <figure data-sub="Lens photo"><div class="lens"><img class="soft" src="${K.media('immersive.jpg')}" alt=""><img class="sharp" src="${K.media('immersive.jpg')}" alt="An immersive light installation"><i class="ring"></i></div>
          <figcaption class="fig-cap"><b>Plate 1</b>An immersive light installation. Move across it to bring it into focus.</figcaption></figure>
      </section>
      <section class="i7 i7-sec" data-sec="States">
        <div class="i7-split" data-sub="Headline"><h2 class="h2">${K.statesHead}</h2><p class="lead" style="color:var(--ink-2)">${K.statesLead}</p></div>
        <div class="fo-tiles" data-sub="Tiles">${K.states.map(([n, note], i) => `<a class="fo-tile" href="#"><div class="ph"><img src="${K.media(K.stateImg[i])}" alt=""></div><span class="n">0${i + 1}</span><b>${n}</b><span>${note}</span></a>`).join('')}
          <div class="fo-tile note"><b>Seven routes, one study.</b><span>Hover any route to bring it into focus.</span></div></div>
      </section>
      <figure class="fo-wide" data-sec="Wide photo"><div class="ph"><img src="${K.media('dinner.jpg')}" alt="A Sensoria community dinner"></div><figcaption class="fig-cap"><b>Plate 2</b>A Sensoria community dinner.</figcaption></figure>
      ${K.coordSec()}
      ${K.guideSec()}
      ${K.close()}`,
    init: () => {
      if (reduce) return;
      const lens = document.querySelector('.lens');
      lens.addEventListener('pointermove', (e) => {
        const r = lens.getBoundingClientRect();
        lens.style.setProperty('--x', `${e.clientX - r.left}px`); lens.style.setProperty('--y', `${e.clientY - r.top}px`);
      });
      const wide = document.querySelector('.fo-wide img');
      const onScroll = () => {
        const r = wide.getBoundingClientRect(), vh = innerHeight;
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
        wide.style.setProperty('--b', `${(16 * (1 - p)).toFixed(1)}px`);
      };
      addEventListener('scroll', onScroll, { passive: true }); onScroll();
    },
  });
})();
