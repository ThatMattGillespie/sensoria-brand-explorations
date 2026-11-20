/* 5B · Pinboard. The page is a desk and every section is a physical thing on it: a printed sheet, paper slips,
   an index card, paint chips, a proof sheet. Objects separate themselves by edge, shadow and a slight angle.
   Section names sit on strips of paper tape. No rules anywhere. */
(function () {
  const R = window.REFRACT, C = R.C;
  const tape = (t, r = -2) => `<span class="pb-tape" style="--r:${r}deg">${t}</span>`;
  const rot = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.9, -1.9];

  window.LAYOUTS.push({
    id: 'pinboard',
    name: 'Pinboard',
    idea: 'The page is a desk and every section is a thing on it: a printed sheet for the hero, paper slips for the states, an index card for the argument, paint chips for the palette, a proof sheet for type. Section names sit on paper tape. Edges and shadows separate; there are no rules.',
    css: `
      body { background: ${C.SURFACE}; }
      body::before { content: ""; position: fixed; inset: 0; background: var(--grain); opacity: .5; mix-blend-mode: multiply; pointer-events: none; z-index: 0; }
      .pb { position: relative; z-index: 1; max-width: 1240px; margin: 0 auto; padding: 0 48px 120px; }
      .pb-head { display: flex; align-items: center; gap: 28px; padding: 28px 0 8px; }
      .pb-head nav { margin-left: auto; display: flex; gap: 10px; }
      .pb-head nav a { text-decoration: none; background: ${C.WHITE}; padding: 6px 12px; font: 12px var(--font-label); letter-spacing: .08em; text-transform: uppercase; box-shadow: 0 3px 8px -4px rgba(5,39,43,.35); }
      .pb-head nav a:nth-child(odd) { rotate: -2deg; } .pb-head nav a:nth-child(even) { rotate: 1.5deg; }
      .pb-sheet { background: ${C.WHITE}; padding: 48px 52px 52px; box-shadow: 0 2px 3px rgba(5,39,43,.08), 0 30px 50px -28px rgba(5,39,43,.45); position: relative; rotate: var(--r, 0deg); }
      .pb-tape { display: inline-block; padding: 8px 18px; background: rgba(229,214,186,.82); font: 400 20px/1 var(--font-display); letter-spacing: -.01em; rotate: var(--r); box-shadow: 0 1px 2px rgba(5,39,43,.12); margin-bottom: 18px; }
      .pb-hero { display: grid; grid-template-columns: 7fr 5fr; align-items: center; margin-top: 56px; }
      .pb-hero .pb-sheet { --r: -1deg; z-index: 2; margin-right: -80px; }
      .pb-hero .pb-sheet .pb-tape { position: absolute; top: -18px; left: 40px; }
      .pb-hero .display { margin: 8px 0 24px; }
      .pb-hero .r5-collage { z-index: 3; }
      .pb-sec { margin-top: 140px; }
      .pb-sec > .h2 { margin: 0 0 40px; max-width: 16ch; }
      .pb-slips { display: flex; flex-wrap: wrap; gap: 28px 24px; }
      .pb-slip { position: relative; width: calc((100% - 72px) / 4); background: ${C.WHITE}; padding: 70px 20px 22px; rotate: var(--r); box-shadow: 0 2px 3px rgba(5,39,43,.08), 0 18px 30px -20px rgba(5,39,43,.45); transition: rotate .3s; }
      .pb-slip img { position: absolute; left: 14px; top: -34px; height: 96px; width: auto; max-width: 120px; object-fit: contain; filter: var(--edge) drop-shadow(0 8px 10px rgba(5,39,43,.3)); transition: transform .3s cubic-bezier(.3,1.5,.5,1); }
      .pb-slip:hover { rotate: 0deg; } .pb-slip:hover img { transform: scale(1.25) rotate(-6deg) translateY(-6px); }
      .pb-slip .n { position: absolute; right: 16px; top: 14px; width: 10px; height: 10px; border-radius: 50%; background: var(--c); }
      .pb-slip b { display: block; font: 400 24px/1.08 var(--font-display); letter-spacing: -.02em; }
      .pb-slip span { font-size: 14px; color: var(--ink-2); }
      .pb-card { margin-top: 160px; background: radial-gradient(ellipse 60% 80% at 30% 30%, #1F5D64, #0A3238 60%, #05272B); color: ${C.WHITE}; padding: 64px 64px 120px; rotate: .6deg; box-shadow: 0 40px 60px -30px rgba(5,39,43,.6); position: relative; }
      .pb-card .pb-tape { position: absolute; top: -18px; left: 50%; translate: -50% 0; }
      .pb-card .h2 { max-width: 18ch; } .pb-card .h2 em { font-style: normal; color: rgba(254,254,254,.6); }
      .pb-card .body { columns: 2; column-gap: 40px; margin-top: 28px; color: rgba(254,254,254,.86); font-size: 16px; max-width: 900px; }
      .pb-card .body p { margin-bottom: 1em; color: rgba(254,254,254,.86); }
      .pb-stats { display: flex; gap: 28px; margin: -70px 48px 0; position: relative; z-index: 2; }
      .pb-stats div { flex: 1; background: ${C.WHITE}; padding: 22px 24px; box-shadow: 0 18px 30px -18px rgba(5,39,43,.5); }
      .pb-stats div:nth-child(1) { rotate: -2deg; } .pb-stats div:nth-child(2) { rotate: 1.4deg; translate: 0 14px; } .pb-stats div:nth-child(3) { rotate: -1deg; }
      .pb-stats b { display: block; font: 400 52px/1 var(--font-display); letter-spacing: -.035em; }
      .pb-stats span { font-size: 14px; color: var(--ink-2); }
      .pb-cards { display: flex; gap: 20px; flex-wrap: wrap; }
      .pb-cards span { background: ${C.WHITE}; padding: 22px 26px; width: 260px; font: 400 20px/1.15 var(--font-display); box-shadow: 0 14px 24px -16px rgba(5,39,43,.45); }
      .pb-cards span:nth-child(odd) { rotate: -1.4deg; } .pb-cards span:nth-child(even) { rotate: 1.1deg; translate: 0 10px; }
      .pb-guide { margin-top: 180px; }
      .pb-guide-title { font: 400 clamp(64px, 9vw, 128px)/.9 var(--font-display); letter-spacing: -.04em; }
      .pb-note { --r: -.8deg; max-width: 760px; margin-top: 40px; }
      .pb-note ol { list-style: none; counter-reset: p; display: grid; gap: 22px; }
      .pb-note li { counter-increment: p; display: grid; grid-template-columns: 48px 1fr; }
      .pb-note li::before { content: counter(p); font: 400 34px/1 var(--font-display); color: rgba(5,39,43,.25); }
      .pb-note li b { font: 400 24px/1.1 var(--font-display); display: block; margin-bottom: 4px; }
      .pb-note li span { color: var(--ink-2); font-size: 15px; }
      .pb-chips { display: flex; padding-left: 30px; margin-top: 30px; }
      .pb-chip { width: 190px; margin-left: -30px; background: ${C.WHITE}; padding: 10px 10px 16px; rotate: var(--r); box-shadow: 0 18px 28px -18px rgba(5,39,43,.55); transition: translate .25s, rotate .25s; }
      .pb-chip:hover { translate: 0 -18px; rotate: 0deg; z-index: 2; }
      .pb-chip i { display: block; height: 170px; background: var(--c); box-shadow: inset 0 0 0 1px rgba(5,39,43,.08); }
      .pb-chip b { display: block; font: 400 20px var(--font-display); margin-top: 10px; }
      .pb-chip code { font: 11px var(--font-label); color: var(--ink-2); }
      .pb-proof { --r: .6deg; margin-top: 60px; }
      .pb-proof::before, .pb-proof::after { content: ""; position: absolute; width: 18px; height: 18px; border: 0 solid rgba(5,39,43,.4); }
      .pb-proof::before { left: 14px; top: 14px; border-left-width: 1px; border-top-width: 1px; }
      .pb-proof::after { right: 14px; bottom: 14px; border-right-width: 1px; border-bottom-width: 1px; }
      .pb-proof p { margin-bottom: 26px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .pb-proof small { display: block; font: 11px var(--font-label); color: var(--ink-2); margin-bottom: 4px; }
      .pb-foot { margin-top: 120px; display: flex; justify-content: space-between; }
      @media (max-width: 960px) { .pb { padding: 0 16px 80px; } .pb-hero { grid-template-columns: 1fr; } .pb-hero .pb-sheet { margin: 0 0 24px; } .pb-slip { width: calc(50% - 12px); } .pb-card .body { columns: 1; } .pb-stats { flex-direction: column; margin: -40px 12px 0; } .pb-head nav { display: none; } .pb-chips { flex-wrap: wrap; } }
    `,
    render: (K) => `
      <div class="pb">
        <header class="pb-head" data-sec="Header"><a class="brand" href="#" data-sub="Logo">${K.MARK}<span class="wordmark">Sensoria Research</span></a>
          <nav data-sub="Navigation">${K.nav.map((n) => `<a href="#">${n}</a>`).join('')}</nav><a class="btn btn-primary" href="#">Take the survey</a></header>

        <section class="pb-hero r5-hero hero" data-sec="Hero">
          <div class="pb-sheet" data-sub="Printed sheet">${tape(K.hero.eyebrow, -3)}${K.bt('h1', 'display', K.hero.title)}<p class="lead">${K.hero.lead}</p>${K.btns()}</div>
          <div class="r5-collage" data-sub="Collage">${K.collage()}</div>
        </section>

        <section class="pb-sec" data-sec="States">
          ${tape('What we mean', 2)}${K.bt('h2', 'h2', `Not just ${R.inl('headphones')} psychedelics.`, 'data-sub="Headline"')}
          <div class="pb-slips" data-sub="Slips">${K.states.map(([n, note, k], i) => `
            <div class="pb-slip" style="--r:${rot[i]}deg;--c:${R.SPECTRUM[i]}"><img src="${K.img(k)}" alt=""><i class="n"></i><b>${n}</b><span>${note}</span></div>`).join('')}</div>
        </section>

        <section data-sec="Coordination">
          <div class="pb-card" data-sub="Index card">${tape('A problem of coordination', -1.5)}<h2 class="h2">${K.coord.a} <em>${K.coord.b}</em></h2>
            <div class="body">${K.coord.body.map((p) => `<p>${p}</p>`).join('')}</div></div>
          <div class="pb-stats" data-sub="Stats">${K.coord.stats.map(([b, s]) => `<div><b>${b}</b><span>${s}</span></div>`).join('')}</div>
        </section>

        <section class="pb-sec" data-sec="Collaborators">${tape('With colleagues from', 1.5)}<div class="pb-cards" data-sub="Cards">${K.collab.map((c) => `<span>${c}</span>`).join('')}</div></section>

        <section class="pb-guide" data-sec="Guide: principles"><h2 class="pb-guide-title">Brand guide</h2>
          <div class="pb-sheet pb-note" data-sub="Principles">${tape('Five rules', -2)}<ol>${K.principles.map(([t, d]) => `<li><div><b>${t}</b><span>${d}</span></div></li>`).join('')}</ol></div></section>
        <section class="pb-sec" data-sec="Guide: colour">${tape('Colour', 2)}<div class="pb-chips" data-sub="Paint chips">${K.palette.map(([n, v], i) => `<div class="pb-chip" style="--c:${v};--r:${[-4, 3, -2, 4, -3, 2][i]}deg"><i></i><b>${n}</b><code>${v}</code></div>`).join('')}</div></section>
        <section class="pb-sec" data-sec="Guide: type">${tape('Type', -1)}<div class="pb-sheet pb-proof" data-sub="Proof sheet">${K.type.map(([n, f, s, size, tr]) => `<small>${n} · ${f} · ${size.startsWith('clamp') ? '56–100 px' : size}</small><p style="font-family:${f.includes('Mono') ? 'var(--font-label)' : f.includes('Display') ? 'var(--font-display)' : 'var(--font-text)'};font-size:${size};letter-spacing:${tr};line-height:1.05;${f.includes('Mono') ? 'text-transform:uppercase;' : ''}">${s}</p>`).join('')}</div></section>
        <footer class="pb-foot" data-sec="Footer"><span class="wordmark">Sensoria Research</span><span class="label">sensoriaresearch.org</span></footer>
      </div>`,
  });
})();
