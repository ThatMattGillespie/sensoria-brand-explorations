/* 5D · Folder tabs. Each section is a sheet with a tab, laid over the one before it like files in a drawer.
   Tabs step across the page, carry the section name and a sticker, and repeat as a sticky index on the right.
   Inside a sheet, groups sit in soft tinted boxes; the states become sticker pills. No rules. */
(function () {
  const R = window.REFRACT, C = R.C;
  const SHEETS = [['hero', 'Survey', 'goggles'], ['states', 'What we mean', 'brain'], ['coord', 'The problem', 'walker'], ['collab', 'Colleagues', 'talker'], ['guide', 'Brand guide', 'headphones']];
  const sheet = (i, bg, inner, sec) => {
    const [id, name, k] = SHEETS[i];
    return `<section class="tb-sheet tb-${bg}" id="tb-${id}" style="--i:${i}" data-sec="${sec}">
      <span class="tb-tab"><img src="media/${R.OBJ[k]}" alt="">${name}</span>${inner}</section>`;
  };

  window.LAYOUTS.push({
    id: 'tabs',
    name: 'Folder tabs',
    idea: 'Each section is a tabbed sheet laid over the one before, like files in a drawer. Tabs step across the page and repeat as a sticky index on the right. Groups sit in soft tinted boxes, and the states become sticker pills. Overlap and colour change separate sections; there are no rules.',
    css: `
      body { background: #DCD3C4; }
      .tb-wrap { max-width: 1320px; margin: 0 auto; padding: 24px 24px 80px; }
      .tb-head { display: flex; align-items: center; gap: 24px; padding: 8px 24px 64px; }
      .tb-head nav { margin-left: auto; display: flex; gap: 6px; }
      .tb-head nav a { text-decoration: none; padding: 8px 14px; border-radius: 10px; font: 500 14px var(--font-text); }
      .tb-head nav a:hover { background: rgba(5,39,43,.08); }
      .tb-sheet { position: relative; border-radius: 0 22px 22px 22px; padding: 64px 56px 96px; margin-top: -28px; box-shadow: 0 -14px 28px -18px rgba(5,39,43,.35); scroll-margin-top: 80px; }
      .tb-sheet:first-of-type { margin-top: 0; }
      .tb-paper { background: ${C.SURFACE}; } .tb-white { background: ${C.WHITE}; } .tb-sand { background: #EAE2D4; }
      .tb-teal { background: radial-gradient(ellipse 60% 70% at 25% 30%, #1F5D64, #0A3238 60%, #05272B); color: ${C.WHITE}; }
      .tb-tab { position: absolute; bottom: 100%; left: calc(var(--i) * 210px); display: inline-flex; align-items: center; gap: 10px; height: 48px; padding: 0 22px 0 16px; border-radius: 16px 16px 0 0; background: inherit; font: 500 15px var(--font-text); }
      .tb-sheet:first-of-type .tb-tab { left: 0; }
      .tb-tab img { height: 40px; width: auto; max-width: 52px; object-fit: contain; margin-top: -14px; filter: var(--edge-sm) drop-shadow(0 3px 4px rgba(5,39,43,.3)); transition: transform .3s cubic-bezier(.3,1.5,.5,1); }
      .tb-tab:hover img { transform: scale(1.4) rotate(-8deg); }
      .tb-index { position: fixed; right: 0; top: 50%; translate: 0 -50%; z-index: 50; display: grid; gap: 6px; }
      .tb-index a { display: flex; align-items: center; gap: 8px; padding: 9px 14px 9px 12px; border-radius: 12px 0 0 12px; background: ${C.WHITE}; text-decoration: none; font: 500 13px var(--font-text); box-shadow: -4px 4px 12px -6px rgba(5,39,43,.35); translate: calc(100% - 44px) 0; transition: translate .25s; }
      .tb-index a:hover, .tb-index a:focus-visible { translate: 0 0; }
      .tb-index img { width: 22px; height: 22px; object-fit: contain; }
      .tb-hero { display: grid; grid-template-columns: 7fr 5fr; gap: 48px; align-items: center; }
      .tb-hero .display { margin: 0 0 24px; }
      .tb-box { background: rgba(5,39,43,.05); border-radius: 18px; padding: 28px; }
      .tb-teal .tb-box { background: rgba(254,254,254,.07); }
      .tb-states { display: grid; grid-template-columns: 5fr 7fr; gap: 48px; align-items: start; }
      .tb-states .h2 { margin: 0 0 16px; }
      .tb-pills { display: flex; flex-wrap: wrap; gap: 14px 12px; }
      .tb-pill { position: relative; display: inline-flex; align-items: center; gap: 10px; padding: 12px 22px 12px 64px; border-radius: 99px; background: ${C.WHITE}; box-shadow: 0 6px 14px -10px rgba(5,39,43,.4); }
      .tb-pill img { position: absolute; left: 6px; top: 50%; translate: 0 -50%; height: 54px; width: 52px; object-fit: contain; filter: var(--edge-sm) drop-shadow(0 4px 5px rgba(5,39,43,.3)); transition: transform .3s cubic-bezier(.3,1.5,.5,1); }
      .tb-pill:hover img { transform: scale(1.45) rotate(-8deg); }
      .tb-pill b { font: 400 21px/1.1 var(--font-display); letter-spacing: -.015em; }
      .tb-pill span { font-size: 13px; color: var(--ink-2); }
      .tb-coord { display: grid; grid-template-columns: 7fr 5fr; gap: 48px; }
      .tb-coord .h2 em { font-style: normal; color: rgba(254,254,254,.6); }
      .tb-coord .body p { margin-bottom: 1em; color: rgba(254,254,254,.86); font-size: 16px; }
      .tb-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 40px; }
      .tb-stats div { display: grid; gap: 10px; }
      .tb-stats b { font: 400 56px/1 var(--font-display); letter-spacing: -.035em; }
      .tb-stats span { font-size: 14px; color: rgba(254,254,254,.7); }
      .tb-collab { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
      .tb-collab .tb-box { font: 400 22px/1.15 var(--font-display); min-height: 140px; display: flex; align-items: flex-end; }
      .tb-guide h2 { font: 400 72px/1 var(--font-display); letter-spacing: -.04em; margin-bottom: 36px; }
      .tb-guide-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
      .tb-princ { display: grid; gap: 18px; }
      .tb-princ > div { display: grid; grid-template-columns: 34px 1fr; }
      .tb-princ b { font: 400 22px var(--font-display); color: rgba(5,39,43,.3); }
      .tb-princ h3 { font: 400 22px/1.1 var(--font-display); }
      .tb-princ p { font-size: 14px; color: var(--ink-2); }
      .tb-swatches { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
      .tb-swatches div { aspect-ratio: 1; border-radius: 50%; display: grid; place-content: center; text-align: center; box-shadow: inset 0 0 0 1px rgba(5,39,43,.1); }
      .tb-swatches b { font: 400 17px var(--font-display); } .tb-swatches code { font: 10px var(--font-label); opacity: .75; }
      .tb-typebox { grid-column: 1 / -1; display: grid; gap: 18px; }
      .tb-typebox p { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .tb-typebox small { display: block; font: 12px var(--font-text); color: var(--ink-2); }
      .tb-foot { display: flex; justify-content: space-between; padding: 40px 24px 0; }
      @media (max-width: 960px) { .tb-wrap { padding: 12px 8px 40px; } .tb-head nav, .tb-index { display: none; } .tb-sheet { padding: 48px 20px 64px; }
        .tb-tab { left: 0 !important; } .tb-hero, .tb-states, .tb-coord, .tb-guide-grid { grid-template-columns: 1fr; } .tb-collab, .tb-stats { grid-template-columns: 1fr 1fr; } }
    `,
    render: (K) => `
      <nav class="tb-index" aria-label="Sections">${SHEETS.map(([id, name, k]) => `<a href="#tb-${id}"><img src="media/${R.OBJ[k]}" alt="">${name}</a>`).join('')}</nav>
      <div class="tb-wrap">
        <header class="tb-head" data-sec="Header"><a class="brand" href="#" data-sub="Logo">${K.MARK}<span class="wordmark">Sensoria Research</span></a>
          <nav data-sub="Navigation">${K.nav.map((n) => `<a href="#">${n}</a>`).join('')}</nav><a class="btn btn-primary" href="#">Take the survey</a></header>
        ${sheet(0, 'paper', `<div class="tb-hero r5-hero hero"><div data-sub="Copy">${K.bt('h1', 'display', K.hero.title)}<p class="lead">${K.hero.lead}</p>${K.btns()}</div>
            <div class="r5-collage" data-sub="Collage">${K.collage()}</div></div>`, 'Hero')}
        ${sheet(1, 'white', `<div class="tb-states"><div data-sub="Headline">${K.bt('h2', 'h2', `Not just ${R.inl('headphones')} psychedelics.`)}<p class="lead">The whole range of experiences beyond ordinary waking cognition.</p></div>
            <div class="tb-pills" data-sub="Pills">${K.states.map(([n, note, k]) => `<span class="tb-pill"><img src="${K.img(k)}" alt=""><b>${n}</b><span>${note}</span></span>`).join('')}</div></div>`, 'States')}
        ${sheet(2, 'teal', `<div class="tb-coord"><h2 class="h2" data-sub="Headline">${K.coord.a} <em>${K.coord.b}</em></h2><div class="body tb-box" data-sub="Body">${K.coord.body.map((p) => `<p>${p}</p>`).join('')}</div></div>
            <div class="tb-stats" data-sub="Stats">${K.coord.stats.map(([b, s]) => `<div class="tb-box"><b>${b}</b><span>${s}</span></div>`).join('')}</div>`, 'Coordination')}
        ${sheet(3, 'sand', `<div class="tb-collab" data-sub="Colleagues">${K.collab.map((c) => `<div class="tb-box">${c}</div>`).join('')}</div>`, 'Collaborators')}
        ${sheet(4, 'paper', `<div class="tb-guide"><h2>Brand guide</h2><div class="tb-guide-grid">
            <div class="tb-box tb-princ" data-sub="Principles">${K.principles.map(([t, d], i) => `<div><b>${i + 1}</b><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div>
            <div class="tb-box" data-sub="Colour"><div class="tb-swatches">${K.palette.map(([n, v]) => `<div style="background:${v};color:${['Deep teal', 'Ink 2'].includes(n) ? C.WHITE : C.TEAL}"><b>${n}</b><code>${v}</code></div>`).join('')}</div></div>
            <div class="tb-box tb-typebox" data-sub="Type">${K.type.map(([n, f, s, size, tr]) => `<div><small>${n} · ${f} · ${size.startsWith('clamp') ? '56–100 px' : size}</small><p style="font-family:${f.includes('Mono') ? 'var(--font-label)' : f.includes('Display') ? 'var(--font-display)' : 'var(--font-text)'};font-size:${size};letter-spacing:${tr};line-height:1.05;${f.includes('Mono') ? 'text-transform:uppercase;' : ''}">${s}</p></div>`).join('')}</div>
          </div></div>`, 'Guide')}
        <footer class="tb-foot" data-sec="Footer"><span class="wordmark">Sensoria Research</span><span>sensoriaresearch.org</span></footer>
      </div>`,
  });
})();
