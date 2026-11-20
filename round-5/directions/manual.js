/* 5A · Field manual. Everything lives in rounded panels on a slightly darker desk, like a well-made instrument
   manual. Separation comes from panel colour and the 12 px gutter between panels, never from rules. Section
   markers are round keycaps instead of uppercase eyebrows. */
(function () {
  const R = window.REFRACT, C = R.C;
  const key = (t) => `<span class="m-key">${t}</span>`;

  window.LAYOUTS.push({
    id: 'manual',
    name: 'Field manual',
    idea: 'Rounded panels on a darker desk, like an instrument manual. Panel colour and a 12 px gutter do the separating; round keycaps replace the uppercase eyebrows; the states become product tiles.',
    css: `
      html[data-layout="manual"] { --desk: #E4DCCE; background: var(--desk); }
      body { background: var(--desk); }
      .m { max-width: 1340px; margin: 0 auto; padding: 12px; display: grid; gap: 12px; }
      .m-p { background: ${C.SURFACE}; border-radius: 18px; padding: 36px; position: relative; }
      .m-p.w { background: ${C.WHITE}; }
      .m-key { display: inline-grid; place-items: center; min-width: 30px; height: 30px; padding: 0 10px; border-radius: 99px; background: ${C.TEAL}; color: ${C.WHITE}; font: 12px var(--font-label); letter-spacing: .04em; }
      .m-tag { display: inline-flex; align-items: center; gap: 10px; font: 500 15px var(--font-text); color: var(--ink); }
      .m-head { display: flex; align-items: center; gap: 24px; padding: 18px 18px 18px 28px; }
      .m-head nav { margin-left: auto; display: flex; gap: 6px; }
      .m-head nav a { text-decoration: none; padding: 9px 16px; border-radius: 99px; background: rgba(5,39,43,.06); font: 500 14px var(--font-text); }
      .m-head nav a:hover { background: rgba(5,39,43,.12); }
      .m-hero { display: grid; grid-template-columns: 7fr 5fr; gap: 12px; }
      .m-hero .m-p:first-child { display: flex; flex-direction: column; justify-content: space-between; min-height: 640px; }
      .m-hero .display { margin: 28px 0 24px; }
      .m-stage { background: radial-gradient(ellipse 70% 60% at 50% 45%, #1F5D64, #0A3238 60%, #05272B); padding: 28px; overflow: hidden; }
      .m-stage .r5-collage { height: 100%; aspect-ratio: auto; min-height: 560px; }
      .m-states-head { display: grid; grid-template-columns: 7fr 5fr; gap: 24px; align-items: end; margin-bottom: 28px; }
      .m-states-head .h2 { margin: 18px 0 0; }
      .m-tiles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
      .m-tile { background: ${C.WHITE}; border-radius: 14px; padding: 18px; display: grid; grid-template-rows: auto 150px auto auto; gap: 6px; }
      .m-tile .n { justify-self: start; font: 11px var(--font-label); color: var(--ink-2); padding: 3px 9px; border-radius: 99px; background: rgba(5,39,43,.06); display: inline-flex; gap: 6px; align-items: center; }
      .m-tile .n i { width: 7px; height: 7px; border-radius: 50%; background: var(--c); }
      .m-tile img { width: 100%; height: 150px; object-fit: contain; filter: var(--edge) drop-shadow(0 10px 12px rgba(5,39,43,.28)); transition: transform .3s cubic-bezier(.3,1.5,.5,1); }
      .m-tile:hover img { transform: scale(1.12) rotate(-5deg); }
      .m-tile b { font: 400 22px/1.1 var(--font-display); letter-spacing: -.02em; }
      .m-tile span { font-size: 14px; color: var(--ink-2); }
      .m-tile.note { background: transparent; box-shadow: inset 0 0 0 1.5px rgba(5,39,43,.14); align-content: end; grid-template-rows: auto; }
      .m-tile.note b { font-size: 34px; }
      .m-coord { display: grid; grid-template-columns: 8fr 4fr; gap: 12px; }
      .m-coord .h2 em { font-style: normal; color: var(--ink-2); }
      .m-coord .body { columns: 2; column-gap: 36px; margin-top: 24px; font-size: 16px; }
      .m-coord .body p { margin-bottom: 1em; }
      .m-stats { display: grid; gap: 12px; }
      .m-stat { background: ${C.WHITE}; border-radius: 18px; padding: 24px 28px; display: flex; justify-content: space-between; align-items: end; }
      .m-stat b { font: 400 52px/1 var(--font-display); letter-spacing: -.035em; }
      .m-stat span { font-size: 14px; color: var(--ink-2); max-width: 12ch; text-align: right; }
      .m-collab { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      .m-collab span { padding: 10px 18px; border-radius: 99px; background: ${C.WHITE}; font-size: 15px; }
      .m-guide-title { display: flex; align-items: center; gap: 14px; }
      .m-guide-title h2 { font: 400 56px/1 var(--font-display); letter-spacing: -.035em; }
      .m-princ { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 24px; }
      .m-princ div { background: ${C.WHITE}; border-radius: 14px; padding: 20px; }
      .m-princ b { display: block; font: 400 64px/1 var(--font-display); color: rgba(5,39,43,.14); margin-bottom: 12px; }
      .m-princ h3 { font: 400 22px/1.1 var(--font-display); letter-spacing: -.02em; margin-bottom: 8px; }
      .m-princ p { font-size: 14px; color: var(--ink-2); }
      .m-chips { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; margin-top: 12px; }
      .m-chip { height: 220px; border-radius: 14px; padding: 18px; display: flex; flex-direction: column; justify-content: flex-end; gap: 2px; box-shadow: inset 0 0 0 1px rgba(5,39,43,.08); }
      .m-chip b { font: 400 22px var(--font-display); }
      .m-chip code, .m-chip span { font: 11px var(--font-label); opacity: .75; }
      .m-type { display: grid; gap: 22px; margin-top: 12px; }
      .m-type div { display: grid; grid-template-columns: 200px 1fr; gap: 24px; align-items: baseline; background: ${C.WHITE}; border-radius: 14px; padding: 18px 24px; }
      .m-type small { font: 11px var(--font-label); color: var(--ink-2); line-height: 1.5; }
      .m-type small b { display: block; font: 500 14px var(--font-text); color: var(--ink); }
      .m-type p { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .m-foot { display: flex; justify-content: space-between; align-items: center; padding: 20px 28px; }
      @media (max-width: 960px) { .m-hero, .m-states-head, .m-coord { grid-template-columns: 1fr; } .m-tiles { grid-template-columns: 1fr 1fr; } .m-princ, .m-chips { grid-template-columns: 1fr 1fr; } .m-coord .body { columns: 1; } .m-head nav { display: none; } .m-type div { grid-template-columns: 1fr; } }
    `,
    render: (K) => `
      <div class="m">
        <header class="m-p m-head" data-sec="Header"><a class="brand" href="#" data-sub="Logo">${K.MARK}<span class="wordmark">Sensoria Research</span></a>
          <nav data-sub="Navigation">${K.nav.map((n) => `<a href="#">${n}</a>`).join('')}</nav><a class="btn btn-primary" href="#">Take the survey</a></header>

        <section class="m-hero r5-hero hero" data-sec="Hero">
          <div class="m-p" data-sub="Copy">
            <span class="m-tag">${key('01')}${K.hero.eyebrow}</span>
            ${K.bt('h1', 'display', K.hero.title)}
            <div><p class="lead">${K.hero.lead}</p>${K.btns()}</div>
          </div>
          <div class="m-p m-stage" data-sub="Collage"><div class="r5-collage">${K.collage()}</div></div>
        </section>

        <section class="m-p" data-sec="States">
          <div class="m-states-head" data-sub="Headline"><div><span class="m-tag">${key('02')}What we mean</span>${K.bt('h2', 'h2', `Not just ${R.inl('headphones')} psychedelics.`)}</div>
            <p class="lead">The whole range of experiences beyond ordinary waking cognition.</p></div>
          <div class="m-tiles" data-sub="State tiles">${K.states.map(([n, note, k], i) => `
            <div class="m-tile" style="--c:${R.SPECTRUM[i]}"><span class="n"><i></i>0${i + 1}</span><img src="${K.img(k)}" alt=""><b>${n}</b><span>${note}</span></div>`).join('')}
            <div class="m-tile note"><b>Seven routes, one map.</b><span>Most research looks at one. Sensoria compares them.</span></div></div>
        </section>

        <section class="m-coord" data-sec="Coordination">
          <div class="m-p" data-sub="Headline and body"><span class="m-tag">${key('03')}A problem of coordination</span>
            <h2 class="h2">${K.coord.a} <em>${K.coord.b}</em></h2><div class="body">${K.coord.body.map((p) => `<p>${p}</p>`).join('')}</div></div>
          <div class="m-stats" data-sub="Stats">${K.coord.stats.map(([b, s]) => `<div class="m-stat"><b>${b}</b><span>${s}</span></div>`).join('')}</div>
        </section>

        <section class="m-p m-collab" data-sec="Collaborators"><span class="m-tag" style="margin-right:12px">${key('04')}With colleagues from</span>${K.collab.map((c) => `<span>${c}</span>`).join('')}</section>

        <section class="m-p w" data-sec="Guide: principles">
          <div class="m-guide-title">${key('G')}<h2>Brand guide</h2></div>
          <div class="m-princ" data-sub="Principles">${K.principles.map(([t, d], i) => `<div><b>${i + 1}</b><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
        </section>
        <section class="m-p" data-sec="Guide: colour"><span class="m-tag">${key('G1')}Colour</span>
          <div class="m-chips" data-sub="Palette">${K.palette.map(([n, v, role]) => `<div class="m-chip" style="background:${v};color:${['Deep teal', 'Ink 2'].includes(n) ? C.WHITE : C.TEAL}"><b>${n}</b><code>${v}</code><span>${role}</span></div>`).join('')}</div>
        </section>
        <section class="m-p" data-sec="Guide: type"><span class="m-tag">${key('G2')}Type</span>
          <div class="m-type" data-sub="Scale">${K.type.map(([n, f, s, size, tr]) => `<div><small><b>${n}</b>${f} · ${size.startsWith('clamp') ? '56–100 px' : size}</small><p style="font-family:${f.includes('Mono') ? 'var(--font-label)' : f.includes('Display') ? 'var(--font-display)' : 'var(--font-text)'};font-size:${size};letter-spacing:${tr};line-height:1.05;${f.includes('Mono') ? 'text-transform:uppercase;' : ''}">${s}</p></div>`).join('')}</div>
        </section>
        <footer class="m-p m-foot" data-sec="Footer"><span class="wordmark">Sensoria Research</span><span class="m-tag">sensoriaresearch.org</span></footer>
      </div>`,
  });
})();
