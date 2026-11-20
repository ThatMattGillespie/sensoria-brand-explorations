/* 7D · Atlas. The map of the seven states is the hero and the navigation. Each field in the figure has a
   picture; pointing at a state (or letting the page cycle) brings its plate up beside the figure. The rest of
   the page stays calm and square. */
(function () {
  const R = window.REFRACT, C = R.C;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fig = (K) => `<svg class="at-fig" viewBox="0 0 520 470" role="group" aria-label="Seven kinds of non-ordinary state">
    ${K.states.map(([n], i) => `<g class="at-row" data-i="${i}" tabindex="0" role="button" aria-label="${n.replace('&', 'and')}">
      <ellipse cx="150" cy="${60 + i * 58}" rx="138" ry="46" fill="${R.SPECTRUM[i]}"/>
      <path d="M150 ${60 + i * 58}H300" stroke="${C.TEAL}" stroke-width="1" opacity=".5"/><circle cx="150" cy="${60 + i * 58}" r="3" fill="${C.TEAL}"/>
      <text x="312" y="${65 + i * 58}"><tspan class="n">0${i + 1}</tspan><tspan dx="10">${n.replace('&', '&amp;')}</tspan></text></g>`).join('')}</svg>`;
  window.LAYOUTS.push({
    id: 'atlas',
    name: 'Atlas',
    idea: 'The map of the seven states is the hero and the navigation. Each field in the figure has a picture: point at a state, or let the page cycle, and its plate comes up beside the figure. The rest of the page stays calm and square.',
    css: `
      .at-top { padding-top: 72px; display: grid; grid-template-columns: 7fr 5fr; gap: 64px; align-items: end; }
      .at-top .display { font-size: clamp(46px, 5.2vw, 78px); line-height: .97; }
      .at-top .lead { font-size: 21px; max-width: 32ch; }
      .at-map { display: grid; grid-template-columns: 6fr 5fr; gap: 56px; margin-top: 72px; align-items: start; }
      .at-figbox { background: ${C.WHITE}; padding: 32px 28px 22px; }
      .at-figbox h3 { font: 500 17px var(--font-text); } .at-figbox p.sub { color: var(--ink-2); font-size: 15px; margin-bottom: 14px; }
      .at-fig { display: block; width: 100%; height: auto; overflow: visible; }
      .at-row { cursor: pointer; outline: none; }
      .at-row ellipse { mix-blend-mode: multiply; opacity: .32; transition: opacity .3s; }
      .at-row text { font: 15px var(--font-text); fill: ${C.TEAL}; opacity: .55; transition: opacity .3s; } .at-row text .n { font: 11px var(--font-label); }
      .at-row.on ellipse { opacity: .95; } .at-row.on text { opacity: 1; font-weight: 600; }
      .at-row:focus-visible text { text-decoration: underline; }
      .at-fig .at-row.on ellipse { filter: drop-shadow(-2px 0 0 rgba(64,224,208,.6)) drop-shadow(2px 0 0 rgba(255,210,141,.8)); }
      .at-cap { font: 13px/1.4 var(--font-text); color: var(--ink-2); margin-top: 12px; } .at-cap b { font: 12px var(--font-label); color: var(--ink); margin-right: 10px; }
      .at-plate { position: sticky; top: 24px; }
      .at-plate .ph { aspect-ratio: 4 / 5; overflow: hidden; position: relative; background: #dcd5c8; }
      .at-plate img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .5s ease; }
      .at-plate img.on { opacity: 1; }
      .at-plate .stk6 { position: absolute; right: 16px; bottom: 16px; width: 96px; height: 96px; opacity: 0; transition: opacity .3s; }
      .at-plate .stk6.on { opacity: 1; }
      .at-plate h3 { font: 400 28px/1.1 var(--font-display); letter-spacing: -.02em; margin-top: 16px; } .at-plate p { color: var(--ink-2); }
      .at-plate .at-cap b { display: inline; }
      .at-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
      .at-strip .plate-im { aspect-ratio: 4 / 3; }
      @media (max-width: 900px) { .at-top, .at-map { grid-template-columns: 1fr; gap: 28px; padding-top: 32px; } .at-map { margin-top: 40px; } .at-plate { position: static; } .at-strip { grid-template-columns: 1fr; } .at-figbox { padding: 20px 12px 16px; } }
    `,
    render: (K) => `
      ${K.head()}
      <section class="i7" data-sec="Hero">
        <div class="at-top" data-sub="Headline"><div>${K.meta()}${K.bt('h1', 'display', K.hero.title)}</div><div><p class="lead">${K.hero.lead}</p>${K.btns()}</div></div>
        <div class="at-map">
          <figure class="at-figbox" data-sub="Map"><h3>Seven routes to a non-ordinary state</h3><p class="sub">Point at a route to see it.</p>${fig(K)}
            <figcaption class="at-cap"><b>Fig. 1</b>Schematic. The fields overlap because the states do; order carries no ranking.</figcaption></figure>
          <figure class="at-plate" data-sub="Plate"><div class="ph">${K.stateImg.map((f, i) => `<img src="${K.media(f)}" data-i="${i}" alt="">`).join('')}</div>
            <p class="at-cap"><b class="at-no">Plate 01</b><span class="at-note"></span></p><h3 class="at-name"></h3></figure>
        </div>
      </section>
      ${K.coordSec()}
      <section class="i7 i7-sec" data-sec="Gatherings">
        <div class="i7-split" data-sub="Headline"><h2 class="h2">Where the questions get asked.</h2><p class="lead" style="color:var(--ink-2)">Dinners, salons and installations, alongside the survey.</p></div>
        <div class="at-strip" data-sub="Photos">${K.plate('dinner.jpg', 'Plate 8', 'Community dinner.', 'duo')}${K.plate('salon.jpg', 'Plate 9', 'A salon conversation.', 'duo')}${K.plate('lc-group.jpg', 'Plate 10', 'Colleagues, as Sensoria draws them.', 'nat')}</div>
      </section>
      ${K.guideSec()}
      ${K.close()}`,
    init: (K) => {
      const rows = [...document.querySelectorAll('.at-row')], plate = document.querySelector('.at-plate');
      let cur = 0, timer = null;
      const show = (i) => {
        cur = i;
        rows.forEach((r) => r.classList.toggle('on', +r.dataset.i === i));
        plate.querySelectorAll('[data-i]').forEach((el) => el.classList.toggle('on', +el.dataset.i === i));
        plate.querySelector('.at-no').textContent = `Plate 0${i + 1}`;
        plate.querySelector('.at-note').textContent = K.states[i][1];
        plate.querySelector('.at-name').textContent = K.states[i][0];
      };
      const start = () => { if (!reduce) timer = setInterval(() => show((cur + 1) % rows.length), 3200); };
      const stop = () => clearInterval(timer);
      rows.forEach((r) => {
        const go = () => { stop(); show(+r.dataset.i); };
        r.addEventListener('pointerenter', go); r.addEventListener('focus', go);
        r.addEventListener('click', go); r.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
      });
      document.querySelector('.at-fig').addEventListener('pointerleave', start);
      show(0); start();
    },
  });
})();
