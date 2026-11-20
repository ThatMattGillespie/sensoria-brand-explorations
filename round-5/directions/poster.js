/* 5C · Poster. Editorial and typographic: scale contrast and whitespace do all the separating. Headlines run
   the full width, the states become a tower of large type, the argument is a full-bleed teal band with the three
   stats set huge, and the palette is a stack of colour bands sized by how much each colour is used. */
(function () {
  const R = window.REFRACT, C = R.C;
  const MIX = [58, 15, 23, 1.5, 1, 1.5];

  window.LAYOUTS.push({
    id: 'poster',
    name: 'Poster',
    idea: 'Typographic and editorial. Scale and empty space separate everything: full-width headlines, the seven states as a tower of large type with stickers set in the line, the argument as a teal band with the stats set huge, and colour bands sized by how much each colour is used.',
    css: `
      body { background: ${C.SURFACE}; }
      .po { max-width: 1400px; margin: 0 auto; padding: 0 48px; }
      .po-head { display: flex; align-items: center; gap: 32px; padding: 28px 0; }
      .po-head nav { margin-left: auto; display: flex; gap: 28px; font: 500 15px var(--font-text); }
      .po-head nav a { text-decoration: none; }
      .po-head nav a:hover { text-decoration: underline; text-underline-offset: 4px; }
      .po.po-hero { display: block; position: relative; padding: 72px 48px 40px; }
      .po-hero .display { font-size: clamp(72px, 10.4vw, 176px); line-height: .88; letter-spacing: -.045em; max-width: 9.5ch; position: relative; z-index: 2; }
      .po-hero .r5-collage { position: absolute; right: 48px; top: 40px; width: 40%; z-index: 1; }
      .po-hero-foot { display: grid; grid-template-columns: 5fr 7fr; gap: 64px; margin-top: 56px; align-items: start; }
      .po-hero-foot .lead { font-size: 26px; max-width: 24ch; }
      .po-kick { font: 400 18px/1.3 var(--font-text); color: var(--ink-2); }
      .po-sec { padding: 200px 0 0; }
      .po-big { font: 400 clamp(56px, 8vw, 128px)/.92 var(--font-display); letter-spacing: -.04em; max-width: 12ch; }
      .po-tower { list-style: none; margin-top: 80px; display: grid; gap: 6px; }
      .po-tower li { display: grid; grid-template-columns: 1fr 260px; align-items: baseline; gap: 32px; }
      .po-tower b { font: 400 clamp(36px, 5vw, 76px)/1.02 var(--font-display); letter-spacing: -.035em; display: flex; align-items: center; gap: .2em; }
      .po-tower b img { height: .9em; width: auto; max-width: 1.6em; object-fit: contain; filter: var(--edge-sm) drop-shadow(0 4px 6px rgba(5,39,43,.25)); transition: transform .3s cubic-bezier(.3,1.5,.5,1); }
      .po-tower li:hover b img { transform: scale(1.5) rotate(-8deg); }
      .po-tower b sup { font: 13px var(--font-label); color: var(--ink-2); align-self: flex-start; margin-top: .9em; }
      .po-tower span { font-size: 17px; color: var(--ink-2); }
      .po-band { margin-top: 200px; background: radial-gradient(ellipse 60% 70% at 25% 30%, #1F5D64, #0A3238 60%, #05272B); color: ${C.WHITE}; padding: 140px 0; }
      .po-band .po-big em { font-style: normal; color: rgba(254,254,254,.5); }
      .po-band .body p { color: rgba(254,254,254,.85); }
      .po-band .body { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; max-width: 980px; margin: 64px 0 0 auto; color: rgba(254,254,254,.85); font-size: 17px; }
      .po-stats { margin-top: 140px; display: grid; gap: 0; }
      .po-stats div { display: grid; grid-template-columns: 1fr 280px; align-items: end; gap: 32px; }
      .po-stats b { font: 400 clamp(96px, 17vw, 280px)/.82 var(--font-display); letter-spacing: -.055em; }
      .po-stats span { font-size: 18px; color: rgba(254,254,254,.7); padding-bottom: 1.6em; }
      .po-collab { font: 400 clamp(32px, 3.6vw, 52px)/1.15 var(--font-display); letter-spacing: -.025em; max-width: 26ch; }
      .po-collab span { color: var(--ink-2); }
      .po-guide-title { font: 400 clamp(96px, 15vw, 240px)/.82 var(--font-display); letter-spacing: -.055em; }
      .po-princ { list-style: none; margin-top: 96px; display: grid; gap: 56px; }
      .po-princ li { display: grid; grid-template-columns: 160px 1fr; gap: 24px; align-items: baseline; }
      .po-princ li > b { font: 400 120px/.8 var(--font-display); color: rgba(5,39,43,.12); }
      .po-princ h3 { font: 400 48px/1 var(--font-display); letter-spacing: -.03em; margin-bottom: 10px; }
      .po-princ p { font-size: 19px; color: var(--ink-2); max-width: 46ch; }
      .po-bands { margin: 96px 48px 0; height: 720px; display: flex; flex-direction: column; border-radius: 20px; overflow: hidden; box-shadow: 0 30px 60px -40px rgba(5,39,43,.5); }
      .po-bands div { display: flex; justify-content: space-between; align-items: flex-end; padding: 0 48px 14px; min-height: 52px; }
      .po-bands b { font: 400 30px/1 var(--font-display); }
      .po-bands code { font: 12px var(--font-label); opacity: .75; }
      .po-towertype { margin-top: 96px; display: grid; gap: 36px; }
      .po-towertype p { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .po-towertype small { display: block; font: 13px var(--font-text); color: var(--ink-2); margin-bottom: 6px; }
      .po-foot { padding: 200px 0 48px; display: flex; justify-content: space-between; align-items: baseline; }
      .po-foot .wordmark { font-size: 18px; }
      @media (max-width: 960px) { .po { padding: 0 16px; } .po.po-hero { padding: 40px 16px; } .po-bands { margin: 64px 16px 0; } .po-head nav { display: none; } .po-hero .r5-collage { position: relative; width: 100%; right: 0; top: 0; margin-top: 32px; }
        .po-hero-foot, .po-band .body, .po-tower li, .po-stats div, .po-princ li { grid-template-columns: 1fr; gap: 12px; } .po-sec { padding-top: 120px; } .po-bands div { padding: 0 16px 10px; } }
    `,
    render: (K) => `
      <header class="po po-head" data-sec="Header"><a class="brand" href="#" data-sub="Logo">${K.MARK}<span class="wordmark">Sensoria Research</span></a>
        <nav data-sub="Navigation">${K.nav.map((n) => `<a href="#">${n}</a>`).join('')}</nav><a class="btn btn-primary" href="#">Take the survey</a></header>

      <section class="po po-hero r5-hero hero" data-sec="Hero">
        ${K.bt('h1', 'display', K.hero.title, 'data-sub="Headline"')}
        <div class="r5-collage" data-sub="Collage">${K.collage()}</div>
        <div class="po-hero-foot" data-sub="Lead"><p class="po-kick">A survey study, open now.</p><div><p class="lead">${K.hero.lead}</p>${K.btns()}</div></div>
      </section>

      <section class="po po-sec" data-sec="States">
        <h2 class="po-big" data-sub="Headline">Not just psychedelics.</h2>
        <ol class="po-tower" data-sub="Tower">${K.states.map(([n, note, k], i) => `<li><b><img src="${K.img(k)}" alt="">${n}<sup>0${i + 1}</sup></b><span>${note}</span></li>`).join('')}</ol>
      </section>

      <section class="po-band" data-sec="Coordination"><div class="po">
        <h2 class="po-big" data-sub="Headline">${K.coord.a} <em>${K.coord.b}</em></h2>
        <div class="body" data-sub="Body">${K.coord.body.map((p) => `<p>${p}</p>`).join('')}</div>
        <div class="po-stats" data-sub="Stats">${K.coord.stats.map(([b, s]) => `<div><b>${b}</b><span>${s}</span></div>`).join('')}</div>
      </div></section>

      <section class="po po-sec" data-sec="Collaborators"><p class="po-collab" data-sub="Sentence"><span>In collaboration with colleagues from</span> ${K.collab.slice(0, -1).join(', ')} <span>and the</span> ${K.collab[K.collab.length - 1]}.</p></section>

      <section class="po po-sec" data-sec="Guide: principles"><h2 class="po-guide-title">Brand<br>guide</h2>
        <ol class="po-princ" data-sub="Principles">${K.principles.map(([t, d], i) => `<li><b>${i + 1}</b><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol></section>
      <section class="po-sec" data-sec="Guide: colour"><div class="po"><h2 class="po-big">Colour, by how much.</h2></div>
        <div class="po-bands" data-sub="Bands">${K.palette.map(([n, v, role], i) => `<div style="flex:${MIX[i]};background:${v};color:${['Deep teal', 'Ink 2'].includes(n) ? C.WHITE : C.TEAL}"><b>${n}</b><code>${v} · ${role} · ${MIX[i]}%</code></div>`).join('')}</div></section>
      <section class="po po-sec" data-sec="Guide: type"><h2 class="po-big">Three faces, five sizes.</h2>
        <div class="po-towertype" data-sub="Scale">${K.type.map(([n, f, s, size, tr]) => `<div><small>${n}, ${f}, ${size.startsWith('clamp') ? '56 to 100 px' : size}</small><p style="font-family:${f.includes('Mono') ? 'var(--font-label)' : f.includes('Display') ? 'var(--font-display)' : 'var(--font-text)'};font-size:${size};letter-spacing:${tr};line-height:1.02;${f.includes('Mono') ? 'text-transform:uppercase;' : ''}">${s}</p></div>`).join('')}</div></section>
      <footer class="po po-foot" data-sec="Footer"><span class="wordmark">Sensoria Research</span><span>sensoriaresearch.org</span></footer>`,
  });
})();
