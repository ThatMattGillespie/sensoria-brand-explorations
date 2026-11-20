/* Round 7: round 6's calm institute layout, with imagery back in. Four options, each with one visual signature.
   Shared rules for every option: everything sits square on a grid, nothing overlaps or tilts at rest, stickers
   tilt only on hover, the wordmark is set in Funnel Display, and one schematic figure (drawn here in code)
   stands in for the collage. Reuses round 5's base.js, kit.js, core.css and media. */
(function () {
  const R = window.REFRACT, C = R.C;
  const M = '../round-5/media/';
  window.LAYOUTS = [];

  const K = window.K = {
    nav: ['Research', 'Studies', 'Gatherings', 'About'],
    hero: {
      kicker: 'Survey study',
      status: 'Open now',
      title: 'Non-ordinary states in professional practice',
      lead: 'Do states beyond ordinary waking consciousness have a role in serious intellectual, creative and material work? We’re asking you.',
    },
    brief: [['Format', 'Survey study'], ['Status', 'Open now'], ['For', 'Scientists, scholars and artists'], ['Scope', 'Seven kinds of state']],
    states: [
      ['Dreaming & hypnagogia', 'the edge of sleep', 'armchair'],
      ['Meditation & contemplation', 'from mindfulness to the jhānas', 'writer'],
      ['Mystical & religious experience', 'prayer, ritual, revelation', 'brain'],
      ['Aesthetic experience', 'awe, chills, absorption in art', 'blindfold'],
      ['Breathwork, trance & flow', 'body-led states', 'standing'],
      ['Technodelics', 'strobe light, binaural beats, VR', 'goggles'],
      ['Psychedelics', 'one route among many', 'eeg'],
    ],
    statesHead: 'Not just psychedelics.',
    statesLead: 'The whole range of experiences beyond ordinary waking cognition.',
    coord: {
      a: 'Many already practice.', b: 'Few do so in an open or coordinated way.',
      body: [
        'Scientists, scholars and artists engage these states privately. Stigma keeps that out of the scientific record. So the field has no shared protocols for eliciting insight, no shared way to tell real insight from false, and no estimate of how often an idea born in a non-ordinary state survives sober testing.',
        'We think what holds back responsible use is less the evidence of risk than this coordination failure.',
      ],
      stats: [['Private', 'Practice, unrecorded'], ['No', 'Shared protocols'], ['Unknown', 'Base rate of true insight']],
    },
    collab: ['Institute for Advanced Consciousness Studies', 'Qualia Research Institute', 'MINDS', 'Multi-Intelligence Institute'],
    principles: [
      ['Paper first', 'Warm paper carries the page. Deep teal is the ink, and one teal surface per page.'],
      ['Two-colour type', 'Deep teal on paper, white on teal. No colour on text.'],
      ['Square at rest', 'Everything sits on the grid. Nothing overlaps or tilts until you touch it.'],
      ['Figures inform', 'A figure or photo earns its place with a number and a caption.'],
      ['Light, not effects', 'Blur and fringe stay barely there, and hold still on request.'],
    ],
    palette: [
      ['Paper', C.SURFACE, 'Main surface', 58], ['White', C.WHITE, 'Panels, figures', 15], ['Deep teal', C.TEAL, 'Ink, one surface', 23],
      ['Ink 2', '#4C6466', 'Secondary text', 2], ['Amber', C.AMBER, 'One accent, on teal', 1], ['Turquoise', C.TURQ, 'Fringe only', 1],
    ],
    type: [
      ['Display', 'Funnel Display 400', 'Non-ordinary states', '64px', '-.035em'],
      ['Headline', 'Funnel Display 400', 'Not just psychedelics.', '40px', '-.03em'],
      ['Lead', 'Funnel Sans 400', 'We’re asking you.', '22px', '0'],
      ['Body', 'Funnel Sans 400', 'Scientists, scholars and artists engage these states privately.', '17px', '0'],
      ['Label', 'Fragment Mono 400', 'Fig. 1 · Seven routes', '12px', '.02em'],
    ],
  };

  // one picture per state (photos and ligne claire scenes from Sensoria's own material)
  K.stateImg = ['lc-armchair.jpg', 'sunrise.jpg', 'rainbow-mountain.jpg', 'immersive.jpg', 'blindfold-dinner.jpg', 'installation.jpg', 'lasers.jpg'];
  K.MARK = `<svg class="mark" viewBox="0 0 72 72" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 72V1h28"/><path d="M0 71h72"/><path d="M1 1h17c13 0 13 27 0 27H9"/><path d="M9 28C-1 32 1 45 11 47s11 15 1 23"/><path d="M15 28l56 43"/></g><circle cx="56" cy="14" r="8.5" fill="currentColor"/></svg>`;
  K.img = (k) => M + R.OBJ[k];
  K.media = (f) => M + f;
  K.bt = (tag, cls, html, extra = '') => `<${tag} class="${cls} bt" data-bt ${extra}>${html}</${tag}>`;
  K.btns = (q = 'Why we’re asking') => `<div class="actions"><a class="btn btn-primary" href="#">Take the survey study</a><a class="btn btn-quiet" href="#">${q}</a></div>`;
  // a sticker set square in its own cell; it only tilts on hover (via .stk-host:hover)
  K.stk = (k, cls = '') => `<img class="stk6 ${cls}" src="${K.img(k)}" alt="">`;
  // a photo as a numbered plate with a caption underneath
  K.plate = (file, n, cap, tone = 'duo', extra = '') => `<figure class="plate ${tone}" ${extra}><div class="plate-im"><img src="${M + file}" alt=""></div><figcaption><b>${n}</b>${cap}</figcaption></figure>`;
  // Fig. 1: the seven kinds of state as seven overlapping fields. Schematic, drawn in code, labelled in type.
  K.figure = (dark = false) => {
    const cols = dark ? R.SPECTRUM_LIGHT : R.SPECTRUM, ink = dark ? C.WHITE : C.TEAL;
    return `<svg class="fig7${dark ? ' dark' : ''}" viewBox="0 0 560 400" role="img" aria-label="Seven kinds of non-ordinary state, drawn as seven overlapping fields">
      <g class="fig7-fields">${K.states.map((s, i) => `<ellipse cx="150" cy="${56 + i * 48}" rx="128" ry="40" fill="${cols[i]}"/>`).join('')}</g>
      ${K.states.map(([n], i) => `<g><path d="M150 ${56 + i * 48}H318" stroke="${ink}" stroke-width="1" opacity=".55"/><circle cx="150" cy="${56 + i * 48}" r="2.5" fill="${ink}"/>
        <text x="328" y="${60 + i * 48}" fill="${ink}"><tspan class="n">0${i + 1}</tspan><tspan dx="10">${n.replace('&', '&amp;')}</tspan></text></g>`).join('')}
    </svg>`;
  };
  // guide excerpt, same markup for every option; each option styles the frame around it
  K.guide = () => ({
    principles: `<ol class="g-princ">${K.principles.map(([t, d], i) => `<li><b>${i + 1}</b><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>`,
    colour: `<div class="g-col"><div class="g-mix">${K.palette.map(([n, v, , pc]) => `<i style="flex:${pc};background:${v}" title="${n}"></i>`).join('')}</div>
      <div class="g-sw">${K.palette.map(([n, v, role, pc]) => `<div><i style="background:${v}"></i><b>${n}</b><code>${v}</code><span>${role} · ${pc}%</span></div>`).join('')}</div></div>`,
    type: `<div class="g-type">${K.type.map(([n, f, s, size, tr]) => `<div><small><b>${n}</b>${f} · ${size}</small><p style="font-family:${f.includes('Mono') ? 'var(--font-label)' : f.includes('Display') ? 'var(--font-display)' : 'var(--font-text)'};font-size:${size};letter-spacing:${tr};line-height:1.08">${s}</p></div>`).join('')}</div>`,
  });

  // the calm frame every round-7 option shares (round 6's Institute): header, closing block, guide
  K.head = (cta = 'btn-quiet') => `<header class="i7 i7-head" data-sec="Header"><a class="brand" href="#" data-sub="Wordmark">${K.MARK}<span class="wordmark">Sensoria Research</span></a>
    <nav data-sub="Navigation">${K.nav.map((n) => `<a href="#">${n}</a>`).join('')}</nav><a class="btn ${cta}" href="#">Take the survey</a></header>`;
  K.meta = () => `<p class="i7-meta"><b>${K.hero.kicker}</b> · ${K.hero.status}</p>`;
  K.coordSec = (extra = '') => `<section class="i7-teal" data-sec="Coordination"><div class="i7 i7-split">
      <h2 class="h2" data-sub="Headline">${K.coord.a} <em>${K.coord.b}</em></h2>
      <div><div class="body" data-sub="Body">${K.coord.body.map((p) => `<p>${p}</p>`).join('')}</div>
        <div class="i7-stats" data-sub="Stats">${K.coord.stats.map(([b, s]) => `<div><b>${b}</b><span>${s}</span></div>`).join('')}</div></div></div>${extra}</section>`;
  K.guideSec = () => { const G = K.guide(); return `<section class="i7 i7-guide" data-sec="Guide"><h2>Brand guide, excerpt</h2>
      <div data-sub="Principles">${G.principles}</div><h3 class="sub">Colour</h3><div data-sub="Colour">${G.colour}</div><h3 class="sub">Type</h3><div data-sub="Type">${G.type}</div></section>`; };
  K.close = () => `<section class="i7-close" data-sec="Closing block"><div class="i7"><div class="i7-close-grid">
      <div data-sub="Call to action"><h2>Tell us how you work.</h2><a class="btn btn-primary" href="#">Take the survey study</a></div>
      <ul data-sub="Collaborators"><small>In collaboration with</small>${K.collab.map((c) => `<li>${c}</li>`).join('')}</ul></div>
      <div class="i7-foot"><span>Sensoria Research</span><span>sensoriaresearch.org</span></div></div></section>`;

  const SHARED = `
    html, body { overflow-x: clip; } body { background: ${C.SURFACE}; }
    .i7 { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
    .i7-head { display: flex; align-items: center; gap: 32px; padding-top: 32px; padding-bottom: 32px; }
    .i7-head nav { margin-left: auto; display: flex; gap: 32px; font: 400 16px var(--font-text); }
    .i7-head nav a { text-decoration: none; } .i7-head nav a:hover { text-decoration: underline; text-underline-offset: 4px; }
    .i7-head .btn { height: 40px; padding: 0 16px; font-size: 14px; }
    .i7-meta { font-size: 16px; color: var(--ink-2); margin-bottom: 24px; } .i7-meta b { color: var(--ink); font-weight: 500; }
    .i7-split { display: grid; grid-template-columns: 5fr 7fr; gap: 72px; align-items: start; }
    .i7-sec { padding-top: 160px; }
    .h2 { font-size: clamp(36px, 3.8vw, 54px); line-height: 1.02; }
    .i7-teal { margin-top: 160px; background: ${C.TEAL}; color: ${C.WHITE}; padding: 112px 0; }
    .i7-teal .h2 em { font-style: normal; opacity: .6; }
    .i7-teal .body p { color: rgba(254,254,254,.88); font-size: 18px; line-height: 1.55; margin-bottom: 1.1em; }
    .i7-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 48px; }
    .i7-stats b { display: block; font: 400 44px/1 var(--font-display); letter-spacing: -.035em; }
    .i7-stats span { font-size: 15px; color: rgba(254,254,254,.7); display: block; margin-top: 8px; }
    .i7-guide { padding-top: 160px; }
    .i7-guide > h2 { font: 400 clamp(36px, 3.8vw, 54px)/1 var(--font-display); letter-spacing: -.03em; margin-bottom: 64px; }
    .i7-guide h3.sub { font: 400 24px var(--font-display); letter-spacing: -.02em; margin: 88px 0 28px; }
    .i7-close { margin-top: 160px; background: ${C.WHITE}; padding: 104px 0 44px; }
    .i7-close-grid { display: grid; grid-template-columns: 7fr 5fr; gap: 72px; align-items: end; }
    .i7-close h2 { font: 400 clamp(40px, 4.6vw, 68px)/1 var(--font-display); letter-spacing: -.035em; max-width: 14ch; margin-bottom: 32px; }
    .i7-close ul { list-style: none; display: grid; gap: 10px; font-size: 17px; }
    .i7-close ul small { display: block; font-size: 14px; color: var(--ink-2); margin-bottom: 8px; }
    .i7-foot { display: flex; justify-content: space-between; margin-top: 104px; font-size: 14px; color: var(--ink-2); }
    @media (max-width: 900px) { .i7 { padding: 0 16px; } .i7-head nav { display: none; } .i7-head .btn { margin-left: auto; }
      .i7-split, .i7-close-grid { grid-template-columns: 1fr; gap: 28px; } .i7-stats { grid-template-columns: 1fr; } .i7-sec, .i7-guide { padding-top: 96px; }
      .i7-teal, .i7-close { margin-top: 96px; padding: 64px 0; } }

    .wordmark { font: 500 19px/1 var(--font-display); letter-spacing: -.01em; text-transform: none; }
    .mark { width: 34px; height: 34px; }
    .brand { gap: 12px; }
    .btn { border-radius: 4px; height: 46px; }
    .display, .h2 { margin: 0; }
    .lead { margin: 0; }
    .actions { margin-top: 28px; }
    .stk6 { display: block; object-fit: contain; filter: var(--edge-sm) drop-shadow(0 3px 5px rgba(5,39,43,.22)); transition: transform .3s cubic-bezier(.3,1.5,.5,1); }
    .stk-host:hover .stk6, .stk6:hover { transform: scale(1.25) rotate(-7deg); }
    .plate { display: grid; gap: 10px; margin: 0; }
    .plate-im { overflow: hidden; background: #dfe5e2; }
    .plate-im img { display: block; width: 100%; height: 100%; object-fit: cover; }
    .plate.duo img { filter: brightness(1.3) url(#r2-duo); }
    .plate.nat img { filter: saturate(.9); }
    .plate figcaption { font: 13px/1.4 var(--font-text); color: var(--ink-2); }
    .plate figcaption b { font: 12px var(--font-label); color: var(--ink); margin-right: 10px; }
    .fig7 { display: block; width: 100%; height: auto; }
    .fig7-fields ellipse { mix-blend-mode: multiply; opacity: .82; transition: opacity .2s; }
    .fig7.dark .fig7-fields ellipse { mix-blend-mode: screen; opacity: .6; }
    .fig7-fields { filter: drop-shadow(-1.5px 0 0 rgba(64,224,208,.55)) drop-shadow(1.5px 0 0 rgba(255,210,141,.7)); }
    .fig7 text { font: 15px var(--font-text); }
    .fig7 text .n { font: 11px var(--font-label); opacity: .7; }
    .cap6 { font: 13px/1.4 var(--font-text); color: var(--ink-2); }
    .cap6 b { font: 12px var(--font-label); color: var(--ink); margin-right: 10px; }
    .g-princ { list-style: none; display: grid; grid-template-columns: repeat(5, 1fr); gap: 32px; }
    .g-princ li { display: grid; gap: 10px; align-content: start; }
    .g-princ li > b { font: 12px var(--font-label); color: var(--ink-2); }
    .g-princ h3 { font: 400 22px/1.1 var(--font-display); letter-spacing: -.02em; margin-bottom: 6px; }
    .g-princ p { font-size: 15px; color: var(--ink-2); }
    .g-mix { display: flex; height: 56px; gap: 2px; }
    .g-mix i { min-width: 6px; box-shadow: inset 0 0 0 1px rgba(5,39,43,.08); }
    .g-sw { display: grid; grid-template-columns: repeat(6, 1fr); gap: 24px; margin-top: 24px; }
    .g-sw div { display: grid; gap: 2px; font-size: 14px; min-width: 0; align-content: start; }
    .g-sw i { width: 100%; aspect-ratio: 3 / 2; margin-bottom: 8px; box-shadow: inset 0 0 0 1px rgba(5,39,43,.08); }
    .g-sw b { font-weight: 500; } .g-sw code { font: 12px var(--font-label); } .g-sw span { color: var(--ink-2); font-size: 13px; }
    .g-type { display: grid; gap: 22px; }
    .g-type > div { display: grid; grid-template-columns: 220px 1fr; gap: 24px; align-items: baseline; }
    .g-type small { font: 12px/1.5 var(--font-label); color: var(--ink-2); }
    .g-type small b { display: block; font: 500 15px var(--font-text); color: var(--ink); }
    .g-type p { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    @media (max-width: 900px) { .g-princ, .g-sw { grid-template-columns: 1fr 1fr; } .g-type > div { grid-template-columns: 1fr; gap: 4px; } }
    @media (prefers-reduced-motion: reduce) { .stk6 { transition: none; } .stk-host:hover .stk6, .stk6:hover { transform: none; } }
  `;

  window.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('app')) return; // index pages list the options only
    const list = window.LAYOUTS;
    const params = new URLSearchParams(location.search);
    let idx = list.findIndex((d) => d.id === params.get('d'));
    if (idx < 0) idx = 0;
    const L = list[idx];
    const root = document.documentElement;
    const D = R.make({ css: R.kit });
    Object.entries(D.tokens).forEach(([k, v]) => root.style.setProperty(k, v));
    const st = document.createElement('style');
    st.textContent = D.css + SHARED + (L.css || '');
    document.head.appendChild(st);
    document.getElementById('defs').innerHTML = R.printKit.defs;
    document.title = `${L.name} · Sensoria round 7`;
    root.dataset.layout = L.id;

    const code = `7${String.fromCharCode(65 + idx)}`;
    document.getElementById('app').innerHTML = `
      <nav class="toolbar" aria-label="Exploration">
        <a class="tb-title" href="index.html">Sensoria · Round 7</a>
        ${list.map((d, i) => `<a class="tb-dir" href="?d=${d.id}"${i === idx ? ' aria-current="page"' : ''}>${i + 1} ${d.name}</a>`).join('')}
        <span class="tb-spacer"></span><a href="../final/">Final guide</a>
      </nav>
      <div class="r5-intro"><b>${code} · ${L.name}</b><span>${L.idea}</span></div>
      ${L.render(K, R)}`;

    document.querySelectorAll('[data-bt]').forEach((el) => {
      const html = el.innerHTML;
      el.innerHTML = `<span class="bt-layer bt-soft" aria-hidden="true">${html}</span><span class="bt-layer bt-sharp">${html}</span>`;
      el.style.cssText += '--mx:42%;--my:46%;--nx:-.16;--ny:-.08';
    });
    if (L.init) L.init(K, R);

    const s = document.createElement('script');
    s.src = '../labels.js'; s.dataset.prefix = code;
    document.body.appendChild(s);
  });
})();
