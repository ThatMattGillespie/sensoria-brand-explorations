/* Final: renders the consolidated landing page mock-up, the brand guide and its applications.
   Same skeleton as the rounds, with section markers (data-sec, data-sub) so the review labels map the whole page. */
(function () {
  const COPY = {
    states: [
      ['Dreaming & hypnagogia', 'the edge of sleep'],
      ['Meditation & contemplation', 'from mindfulness to the jhānas'],
      ['Mystical & religious experience', 'prayer, ritual, revelation'],
      ['Aesthetic experience', 'awe, chills, absorption in art'],
      ['Breathwork, trance & flow', 'body-led states'],
      ['Technodelics', 'strobe light, binaural beats, VR'],
      ['Psychedelics', 'one route among many'],
    ],
    collab: ['Institute for Advanced Consciousness Studies', 'Qualia Research Institute', 'MINDS', 'Multi-Intelligence Institute'],
  };

  // Placeholder mark, redrawn loosely from the Instagram post until the real files arrive.
  const MARK = `<svg class="mark" viewBox="0 0 72 72" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 72V1h28"/><path d="M0 71h72"/><path d="M1 1h17c13 0 13 27 0 27H9"/><path d="M9 28C-1 32 1 45 11 47s11 15 1 23"/><path d="M15 28l56 43"/></g><circle cx="56" cy="14" r="8.5" fill="currentColor"/></svg>`;

  const list = window.DIRECTIONS || [];
  const params = new URLSearchParams(location.search);
  let idx = list.findIndex((d) => d.id === params.get('d'));
  if (idx < 0) idx = 0;
  const D = list[idx];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  document.title = 'Sensoria Research · Brand guide';
  root.dataset.dir = D.id;
  (D.fonts || []).forEach((href) => {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = href; document.head.appendChild(l);
  });
  Object.entries(D.tokens).forEach(([k, v]) => root.style.setProperty(k, v));
  D.spectrum.forEach((c, i) => root.style.setProperty(`--s${i + 1}`, c));
  const style = document.createElement('style');
  style.textContent = (D.css || '') + (window.GUIDE_CSS || '');
  document.head.appendChild(style);

  const H = {
    MARK, COPY, D,
    media: (f) => `media/${f}`,
    bt: (tag, cls, html) => `<${tag} class="${cls} bt" data-bt>${html}</${tag}>`,
    cap: (html, cls = '') => `<div class="cap ${cls}">${html}</div>`,
    badge: (name, role, cls = '') => `<div class="badge ${cls}"><b>${name}</b><span>${role}</span></div>`,
  };
  window.H = H;

  const states = (cls) => `<ol class="${cls}">${COPY.states.map((s, i) => `
      <li style="--c:var(--s${i + 1})"><span class="state-num">0${i + 1}</span><span class="state-chip"></span><span class="state-name">${s[0]}</span><span class="state-note">${s[1]}</span></li>`).join('')}</ol>`;

  const swatch = (name, value) => `<div class="swatch" style="--c:${value}"><i></i><span>${name}<br>${value}</span></div>`;

  const nav = list.map((d, i) => `<a class="tb-dir" href="?d=${d.id}"${i === idx ? ' aria-current="page"' : ''}>${i + 1} ${d.name}</a>`).join('');
  const prev = list[(idx - 1 + list.length) % list.length];
  const next = list[(idx + 1) % list.length];

  const frames = D.frames(H);

  document.getElementById('app').innerHTML = `
  <nav class="toolbar" aria-label="Exploration">
    <a class="tb-title" href="#top">Sensoria · Final</a>
    <a class="tb-dir" href="#top">Landing page</a>
    <a class="tb-dir" href="#guide">Brand guide</a>
    <a class="tb-dir" href="#apps">Applications</a>
    <a class="tb-dir" href="techniques.html">Techniques demo →</a>
    <span class="tb-spacer"></span>
    <a href="../">All rounds</a>
  </nav>

  <div class="site" id="top">
    <header class="site-head wrap" data-sec="Site header">
      <a class="brand" href="#" data-sub="Logo">${MARK}<span class="wordmark">Sensoria Research</span></a>
      <nav class="site-nav" aria-label="Site" data-sub="Navigation"><a href="#">Research</a><a href="#">Studies</a><a href="#">Gatherings</a><a href="#">About</a></nav>
      <a class="btn btn-primary" href="#" data-sub="Header button">Take the survey</a>
    </header>

    <section class="hero wrap" data-sec="Hero">
      <div class="hero-copy">
        <p class="eyebrow" data-sub="Eyebrow"><span class="num">01</span><span>Survey study · open now</span></p>
        ${H.bt('h1', 'display', 'Non-ordinary states in professional practice').replace('<h1 ', '<h1 data-sub="Headline" ')}
        <p class="lead" data-sub="Lead">Do states beyond ordinary waking consciousness have a role in serious intellectual, creative and material work? We’re asking you.</p>
        <div class="actions" data-sub="Buttons"><a class="btn btn-primary" href="#">Take the survey study</a><a class="btn btn-quiet" href="#">Why we’re asking</a></div>
      </div>
      <figure class="hero-visual ${D.heroClass || ''}" data-sub="Hero collage">${D.hero(H)}</figure>
    </section>

    <section class="states wrap" data-sec="States">
      <div class="section-head" data-sub="Headline">
        <div><p class="eyebrow"><span class="num">02</span><span>What we mean</span></p>${H.bt('h2', 'h2', 'Not just psychedelics.')}</div>
        <p class="lead">The whole range of experiences beyond ordinary waking cognition.</p>
      </div>
      <div data-sub="States list">${states('state-list')}</div>
    </section>

    <section class="coord wrap" data-sec="Coordination">
      <p class="eyebrow"><span class="num">03</span><span>A problem of coordination</span></p>
      <div class="coord-grid">
        <h2 class="h2" data-sub="Headline">Many already practice. <em>Few do so in an open or coordinated way.</em></h2>
        <div class="body" data-sub="Body">
          <p>Scientists, scholars and artists engage these states privately. Stigma keeps that out of the scientific record. So the field has no shared protocols for eliciting insight, no shared way to tell real insight from false, and no estimate of how often an idea born in a non-ordinary state survives sober testing.</p>
          <p>We think what holds back responsible use is less the evidence of risk than this coordination failure.</p>
        </div>
      </div>
      <div class="stats" data-sub="Stats">
        <div class="stat" style="--c:var(--s1)"><div class="stat-big">Private</div><span class="label">Practice, unrecorded</span></div>
        <div class="stat" style="--c:var(--s4)"><div class="stat-big">No</div><span class="label">Shared protocols</span></div>
        <div class="stat" style="--c:var(--s7)"><div class="stat-big">Unknown</div><span class="label">Base rate of true insight</span></div>
      </div>
    </section>

    <section class="collab wrap" data-sec="Collaborators">
      <p class="eyebrow">In collaboration with colleagues from</p>
      <ul>${COPY.collab.map((c) => `<li>${c}</li>`).join('')}</ul>
    </section>
    <footer class="site-foot wrap" data-sec="Footer"><span class="label">Sensoria Research</span><span class="label">sensoriaresearch.org</span></footer>
  </div>

  <section class="applied">
    <div class="wrap">
      <header class="applied-head" id="guide">
        <div><p class="eyebrow"><span class="num">Sensoria Research</span><span>Brand guide · draft</span></p><h2>${D.name}</h2></div>
        <p>${D.idea}</p>
      </header>

      ${window.GUIDE(D)}

      <div class="block" data-sec="Carousel" id="apps">
        <div class="block-head"><span class="label">Instagram carousel</span><span class="label">1080 × 1350</span></div>
        <div class="slides">
          <div class="slide ${D.slideClass || ''}" data-sub="Slide"><div class="slide-inner">
            <div class="slide-head">${MARK}<span class="wordmark">Sensoria Research</span><span class="count">01 / 09</span></div>
            <p class="eyebrow"><span class="num">01</span><span>Take our survey study</span></p>
            <div class="slide-body">
              <div class="slide-col">
                ${H.bt('h3', 'slide-title', 'Non-ordinary states in professional practice')}
                <p class="slide-sub">Do states beyond ordinary waking consciousness have a role in serious intellectual, creative and material work?</p>
                <p class="slide-kicker">We’re asking you.</p>
              </div>
              <div class="slide-art ${D.heroClass || ''}">${D.slideArt ? D.slideArt(H) : D.hero(H)}</div>
            </div>
          </div></div>
          <div class="slide ${D.slideClass || ''}" data-sub="Slide"><div class="slide-inner">
            <div class="slide-head">${MARK}<span class="wordmark">Sensoria Research</span><span class="count">03 / 09</span></div>
            <p class="eyebrow"><span class="num">03</span><span>What do we mean by non-ordinary states?</span></p>
            <div class="slide-col" style="margin-top:3.5cqw;flex:1">
              ${H.bt('h3', 'slide-title', 'Not just psychedelics.')}
              ${states('slide-states')}
            </div>
          </div></div>
        </div>
      </div>

      <div class="block" data-sec="Video">
        <div class="block-head"><span class="label">Video · reels and shorts</span><span class="label">1080 × 1920 · stills from a moving sequence</span></div>
        <div class="frames" style="--fcount:${frames.length}">${frames.map((f) => `
          <figure class="frame-wrap" data-sub="${f.label}"><div class="vf ${f.cls || ''}">${f.html}</div>
            <figcaption><b>${f.label}</b><span>${f.note}</span></figcaption></figure>`).join('')}</div>
      </div>
    </div>
  </section>`;

  // SVG filter defs for this direction
  document.getElementById('defs').innerHTML = D.defs || '';

  // Blur type: split each [data-bt] into a soft copy and a sharp copy.
  const bts = [...document.querySelectorAll('[data-bt]')];
  // Each headline keeps a focus point (x, y in %). The pointer sets a target and the point eases toward it,
  // so effects glide instead of snapping. With nobody pointing, the target drifts slowly near the centre.
  const state = bts.map(() => ({ x: 50, y: 50, tx: 50, ty: 50, hover: false }));
  const put = (el, s) => {
    el.style.setProperty('--mx', s.x.toFixed(2) + '%');
    el.style.setProperty('--my', s.y.toFixed(2) + '%');
    // the same point as unitless -1..1 from the centre, for effects that point toward or away from it
    el.style.setProperty('--nx', ((s.x - 50) / 50).toFixed(3));
    el.style.setProperty('--ny', ((s.y - 50) / 50).toFixed(3));
  };
  // a direction can ask for extra copies of the text (D.extraLayers), stacked above the sharp layer
  const extra = (html) => Array.from({ length: D.extraLayers || 0 }, (_, n) =>
    `<span class="bt-layer bt-x bt-x${n + 1}" aria-hidden="true">${html}</span>`).join('');
  bts.forEach((el, i) => {
    const html = el.innerHTML;
    el.innerHTML = `<span class="bt-layer bt-soft" aria-hidden="true">${html}</span><span class="bt-layer bt-sharp">${html}</span>${extra(html)}`;
    const s = state[i];
    put(el, s);
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      s.tx = ((e.clientX - r.left) / r.width) * 100;
      s.ty = ((e.clientY - r.top) / r.height) * 100;
      s.hover = true;
      if (reduce) { s.x = s.tx; s.y = s.ty; put(el, s); }
    });
    el.addEventListener('pointerleave', () => { s.hover = false; });
  });

  if (!reduce && D.drift !== false) {
    const AMP_X = 24, AMP_Y = 18, EASE = 0.045;
    const tick = (t) => {
      bts.forEach((el, i) => {
        const s = state[i];
        if (!s.hover) {
          const k = i * 1.9;
          s.tx = 50 + AMP_X * Math.sin(t / 4600 + k);
          s.ty = 50 + AMP_Y * Math.sin(t / 3700 + k * 1.3);
        }
        s.x += (s.tx - s.x) * EASE;
        s.y += (s.ty - s.y) * EASE;
        put(el, s);
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ?t=2.5 freezes every CSS animation at that second (for screenshots and side-by-side reviews)
  if (params.has('t')) {
    const freeze = document.createElement('style');
    freeze.textContent = `*, *::before, *::after { animation-delay: -${parseFloat(params.get('t')) || 0}s !important; animation-play-state: paused !important; }`;
    document.head.appendChild(freeze);
  }

  if (D.init) D.init(H);
  if (window.GUIDE_INIT) { window.GUIDE_INIT(); if (document.fonts) document.fonts.ready.then(window.GUIDE_INIT); addEventListener('resize', window.GUIDE_INIT); }
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('ready')));

})();
