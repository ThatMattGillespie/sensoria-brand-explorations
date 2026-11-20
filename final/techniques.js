/* Techniques demo: the final brand guide applied to a landing page that tries unconventional web techniques.
   Each section is one technique. Scroll-driven sections get a progress value --p (0 to 1) from one small engine.
   ?go=<section id>&p=0.5 jumps to a section at a given progress (for screenshots and reviews).
   Reduced motion and phones get a plain, unpinned version of every section. */
(function () {
  const R = window.REFRACT, C = R.C, SL = R.SPECTRUM_LIGHT, S = R.SPECTRUM;
  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = matchMedia('(max-width: 760px)');

  // brand tokens and base CSS, exactly as on the final page
  const D = R.make({ css: R.kit });
  Object.entries(D.tokens).forEach(([k, v]) => root.style.setProperty(k, v));
  const st = document.createElement('style');
  st.textContent = D.css;
  document.head.appendChild(st);
  document.getElementById('defs').innerHTML = R.printKit.defs;

  const MARK = `<svg class="mark" viewBox="0 0 72 72" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 72V1h28"/><path d="M0 71h72"/><path d="M1 1h17c13 0 13 27 0 27H9"/><path d="M9 28C-1 32 1 45 11 47s11 15 1 23"/><path d="M15 28l56 43"/></g><circle cx="56" cy="14" r="8.5" fill="currentColor"/></svg>`;
  const img = (k) => `media/${R.OBJ[k]}`;
  const bt = (tag, cls, html, extra = '') => `<${tag} class="${cls} bt" data-bt ${extra}>${html}</${tag}>`;
  const tech = (n, name, how) => `<p class="tech"><b>T-${n + 1} · ${name}</b>${how}</p>`;

  const STATES = [
    ['Dreaming & hypnagogia', 'The edge of sleep, where images arrive before words.', 'armchair'],
    ['Meditation & contemplation', 'From mindfulness to the jhānas: attention trained on itself.', 'writer'],
    ['Mystical & religious experience', 'Prayer, ritual and revelation, studied as experience.', 'brain'],
    ['Aesthetic experience', 'Awe, chills and absorption in art and music.', 'blindfold'],
    ['Breathwork, trance & flow', 'States the body leads you into.', 'standing'],
    ['Technodelics', 'Strobe light, binaural beats, VR: states made with technology.', 'goggles'],
    ['Psychedelics', 'One route among many, and the most studied.', 'eeg'],
  ];
  const QA = [
    ['What do you mean by non-ordinary states?', 'The whole range of experiences beyond ordinary waking cognition: dreaming, meditation, mystical and aesthetic experience, breathwork and flow, technodelics and psychedelics.', 'brain'],
    ['Why ask people about their work?', 'Scientists, scholars and artists engage these states privately. Stigma keeps that out of the scientific record, so nobody knows how they are used in serious work.', 'writer'],
    ['What is missing?', 'Shared protocols for eliciting insight, a shared way to tell real insight from false, and an estimate of how often an idea born in a non-ordinary state survives sober testing.', 'walker'],
    ['Who is behind it?', 'Sensoria Research, with colleagues from the Institute for Advanced Consciousness Studies, Qualia Research Institute, MINDS and the Multi-Intelligence Institute.', 'talker'],
  ];
  const SHEETS = [
    ['dinner.jpg', 'duo', 'Community dinner', 'People who study the mind, around one long table.', 'walker'],
    ['salon.jpg', 'duo', 'Salon', 'Small evenings of talks and argument.', 'standing'],
    ['blindfold-dinner.jpg', 'duo', 'Blindfold dinner', 'A meal eaten without sight, to notice the other senses.', 'writer'],
    ['lasers.jpg', 'colour', 'Technodelics night', 'Light and sound as the instrument. Here the colour is the point.', 'vr'],
  ];
  const COLLAB = ['Institute for Advanced Consciousness Studies', 'Qualia Research Institute', 'MINDS', 'Multi-Intelligence Institute'];
  const TRAY = ['goggles', 'headphones', 'brain', 'flask', 'eeg', 'mindmachine', 'vr', 'walker', 'standing', 'tubes'];

  const words = (text, stickers) => text.split(' ').map((w) => {
    const after = stickers[w] ? ` <img class="t-wsticker inl" src="${img(stickers[w])}" alt="">` : '';
    return `<span class="t-w">${w}${after}</span>`;
  }).join(' ');

  document.getElementById('app').innerHTML = `
  <header class="site-head wrap" data-sec="Site header">
    <a class="brand" href="#" data-sub="Logo">${MARK}<span class="wordmark">Sensoria Research</span></a>
    <nav class="site-nav" aria-label="Site"><a href="#routes">Research</a><a href="#words">Studies</a><a href="#sheets">Gatherings</a><a href="#ask">About</a></nav>
    <a class="btn btn-primary" href="#ask">Take the survey</a>
  </header>

  <section class="t-depth" id="depth" data-scrub data-sec="Depth hero">
    <div class="t-pin">
      ${tech(1, 'Scroll through the collage', 'The hero is pinned for about two screens. Scrolling pushes the camera through the layers: the front ones grow and fade past you, the print at the back stays. The headline never moves.')}
      <div class="wrap t-depth-grid">
        <div class="t-depth-copy" data-sub="Headline">
          <p class="eyebrow"><span class="num">01</span><span>Survey study · open now</span></p>
          ${bt('h1', 'display', `Non-ordinary ${R.inl('goggles')} states in professional practice`)}
          <p class="lead">Do states beyond ordinary waking consciousness have a role in serious intellectual, creative and material work? We’re asking you.</p>
          <div class="actions"><a class="btn btn-primary" href="#ask">Take the survey study</a><a class="btn btn-quiet" href="#words">Why we’re asking</a></div>
        </div>
        <div class="t-depth-stage" data-sub="Collage">
          <div class="plane" style="--z:.08;--f:0;--d:-1">${R.print('media/immersive.jpg', 'left:6%;top:4%;width:90%;height:56%;--r:2deg', 'duo')}</div>
          <div class="plane" style="--z:.7;--f:.9;--d:0">${R.cut('brain', 'left:-4%;top:30%;width:62%', 'cream')}${R.print('media/dinner.jpg', 'left:42%;top:46%;width:60%;height:30%;--r:-3deg', 'duo', 'Community dinner')}</div>
          <div class="plane" style="--z:1.5;--f:1.3;--d:1">${R.cut('tubes', 'left:6%;top:60%;width:22%')}${R.cut('goggles', 'left:50%;top:16%;width:44%')}</div>
          <div class="plane" style="--z:2.6;--f:1.7;--d:2">${R.cut('vr', 'left:42%;top:52%;width:30%')}</div>
        </div>
      </div>
      <div class="t-scrollcue" aria-hidden="true">Scroll</div>
    </div>
  </section>

  <section class="t-h" id="routes" data-scrub data-sec="Horizontal scroll">
    <div class="t-pin">
      ${tech(2, 'Horizontal scroll', 'Scrolling down moves a row of panels sideways, one state at a time, with a progress rail of seven spectrum marks. On phones it is a row you swipe; with reduced motion, a row you scroll.')}
      <div class="wrap t-h-head" data-sub="Headline">
        <div><p class="eyebrow"><span class="num">02</span><span>What we mean</span></p>${bt('h2', 'h2', `Not just ${R.inl('headphones')} psychedelics.`)}</div>
        <p class="lead">Seven kinds of state beyond ordinary waking cognition. Keep scrolling to walk through them.</p>
      </div>
      <div class="t-track" data-sub="Panels">
        ${STATES.map(([name, note, k], i) => `
          <article class="t-panel" style="--c:${S[i]}">
            <div class="t-panel-img"><img src="${img(k)}" alt=""></div>
            <span class="t-panel-num"><i></i>0${i + 1}</span>
            <h3>${name}</h3>
            <p>${note}</p>
          </article>`).join('')}
        <article class="t-panel t-panel-end"><h3>One map.</h3><p>Most research looks at one route. Sensoria compares them.</p></article>
      </div>
      <div class="wrap"><div class="t-rail" data-sub="Progress rail">${STATES.map((s, i) => `<i style="--c:${S[i]}"></i>`).join('')}<b></b></div></div>
    </div>
  </section>

  <section class="t-words" id="words" data-scrub data-sec="Sentence">
    <div class="t-pin">
      ${tech(3, 'A sentence that builds', 'The one teal surface on the page. Pinned while the sentence lights up word by word as you scroll, the way captions build in the videos. Stickers arrive with their clause; the stats settle in at the end.')}
      <div class="wrap">
        <p class="eyebrow"><span class="num">03</span><span>A problem of coordination</span></p>
        <p class="t-sentence" data-sub="Sentence">${words('Many already practice. Few do so in an open or coordinated way.', { 'practice.': 'headphones', coordinated: 'salon' })}</p>
        <div class="t-stats" data-sub="Stats">
          <div><b>Private</b><span class="label">Practice, unrecorded</span></div>
          <div><b>No</b><span class="label">Shared protocols</span></div>
          <div><b>Unknown</b><span class="label">Base rate of true insight</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="t-sheets wrap" id="sheets" data-sec="Stacked sheets">
    ${tech(4, 'Stacked sheets', 'Each gathering is a sheet that pins near the top as you scroll, and the next one is laid over it, a little rotated, like prints on a table. Plain CSS (position: sticky), no script.')}
    <div class="t-sheets-head" data-sub="Headline"><p class="eyebrow"><span class="num">04</span><span>Gatherings</span></p>${bt('h2', 'h2', 'Where the research meets people.')}</div>
    ${SHEETS.map(([f, tone, title, text, k], i) => `
      <article class="t-sheet" style="--i:${i};--r:${[-1.2, 1, -0.6, 1.4][i]}deg" data-sub="${title}">
        <figure class="print ${tone}" style="position:relative;--r:0deg"><img src="media/${f}" alt="">${tone === 'colour' ? `<figcaption>${R.tag(5, 'Technodelics')}</figcaption>` : `<figcaption>${title}</figcaption>`}</figure>
        <div class="t-sheet-copy"><span class="label">0${i + 1} / 04</span><h3>${title}</h3><p>${text}</p></div>
        <img class="cut sm t-sheet-stk" src="${img(k)}" alt="">
      </article>`).join('')}
  </section>

  <section class="t-play wrap" id="play" data-sec="Sticker playground">
    ${tech(5, 'Sticker playground', 'Drag stickers from the sheet onto the print; drag them again to move them. Keyboard: press a sticker to place it. Playful, and it shows the sticker system in one move.')}
    <div class="t-play-grid">
      <div class="t-play-copy" data-sub="Copy">
        <p class="eyebrow"><span class="num">05</span><span>Make the map</span></p>
        ${bt('h2', 'h2', 'Which instruments would you bring?')}
        <p class="lead">Every state has its tools. Put yours on the table.</p>
        <button class="btn btn-quiet t-reset" type="button">Clear the table</button>
      </div>
      <div class="t-board" data-sub="Board">${R.print('media/dinner.jpg', 'inset:0;--r:-1deg', 'duo', 'Drop stickers here')}<div class="t-board-layer"></div></div>
    </div>
    <div class="t-tray" data-sub="Sticker sheet" role="list">${TRAY.map((k) => `<button class="t-tray-item" type="button" role="listitem" data-k="${k}" aria-label="Place ${k} sticker"><img src="${img(k)}" alt="" draggable="false"></button>`).join('')}</div>
  </section>

  <section class="t-split wrap" id="ask" data-sec="Split screen">
    ${tech(6, 'Split screen', 'The call to action stays pinned on the left while the questions scroll past on the right, each with a sticker answering for it. On phones the two stack.')}
    <div class="t-split-grid">
      <div class="t-split-pin" data-sub="Call to action">
        <p class="eyebrow"><span class="num">06</span><span>Take part</span></p>
        ${bt('h2', 'h2', 'Tell us how you work.')}
        <p class="lead">A survey for people who think, make and research for a living.</p>
        <div class="actions"><a class="btn btn-primary" href="#">Take the survey study</a></div>
      </div>
      <div class="t-qa" data-sub="Questions">${QA.map(([q, a, k]) => `
        <article class="t-q"><img class="cut sm" src="${img(k)}" alt=""><h3>${q}</h3><p>${a}</p></article>`).join('')}</div>
    </div>
  </section>

  <section class="t-marquee" data-sec="Marquee">
    ${tech(7, 'Marquee', 'The collaborators drift past in a slow band with stickers between the names. It stops when you point at it; with reduced motion it is a still row.')}
    <p class="eyebrow wrap">In collaboration with colleagues from</p>
    <div class="t-band" data-sub="Band"><div class="t-band-row">${[0, 1].map(() => COLLAB.map((c, i) => `<span>${c}</span><img class="cut sm" src="${img(['goggles', 'brain', 'headphones', 'eeg'][i])}" alt="">`).join('')).join('')}</div></div>
  </section>
  <footer class="site-foot wrap" data-sec="Footer"><span class="label">Sensoria Research</span><span class="label">sensoriaresearch.org</span></footer>`;

  // headlines: soft + sharp layers (the faint blur mask), focus fixed slightly off centre
  document.querySelectorAll('[data-bt]').forEach((el) => {
    const html = el.innerHTML;
    el.innerHTML = `<span class="bt-layer bt-soft" aria-hidden="true">${html}</span><span class="bt-layer bt-sharp">${html}</span>`;
    el.style.cssText += '--mx:42%;--my:46%;--nx:-.16;--ny:-.08';
  });

  // Jeremy looks over the teal section (the margin sticker rule: one per section, beside its idea)
  R.peek('.t-words', 'jeremy', 'right:9%;width:150px;height:104px', 'cream');

  /* ---------- scroll engine ---------- */
  const tb = () => (document.querySelector('.toolbar')?.offsetHeight || 0);
  const flat = () => reduce || small.matches;
  const track = document.querySelector('.t-track');
  const hsec = document.querySelector('.t-h');
  const wordEls = [...document.querySelectorAll('.t-w')];
  const layout = () => {
    root.classList.toggle('t-flat', flat());
    if (!flat() && track) {
      const pinH = innerHeight - tb();
      hsec.style.height = `${pinH + Math.max(0, track.scrollWidth - innerWidth) + innerHeight * .2}px`;
    } else if (hsec) hsec.style.height = '';
  };
  const scrubs = [...document.querySelectorAll('[data-scrub]')];
  const progress = (el) => {
    const r = el.getBoundingClientRect();
    const total = el.offsetHeight - (innerHeight - tb());
    return total > 0 ? Math.min(1, Math.max(0, (tb() - r.top) / total)) : 0;
  };
  const update = () => {
    scrubs.forEach((el) => {
      const p = flat() ? 1 : progress(el);
      el.style.setProperty('--p', p.toFixed(4));
      if (el === hsec && track) {
        const dist = flat() ? 0 : Math.max(0, track.scrollWidth - innerWidth);
        track.style.transform = flat() ? '' : `translate3d(${(-p * dist).toFixed(1)}px,0,0)`;
        const n = Math.min(6, Math.floor(p * 7.001));
        el.querySelectorAll('.t-rail i').forEach((d, i) => d.classList.toggle('on', i <= n));
        el.style.setProperty('--rail', p.toFixed(4));
      }
      if (el.classList.contains('t-words')) {
        const lit = flat() ? wordEls.length : Math.round((p / .78) * wordEls.length);
        wordEls.forEach((w, i) => w.classList.toggle('on', i < lit));
        el.classList.toggle('done', flat() || p > .82);
      }
    });
  };
  let raf = 0;
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { layout(); update(); });
  small.addEventListener('change', () => { layout(); update(); });
  layout(); update();

  // ?go=<id>&p=<0..1>: jump to a section at a progress value (reviews and screenshots)
  const go = () => {
    const el = params.get('go') && document.getElementById(params.get('go'));
    if (!el) return;
    const p = parseFloat(params.get('p') || '0');
    const total = el.offsetHeight - (innerHeight - tb());
    scrollTo(0, el.offsetTop - tb() + Math.max(0, total) * p);
    update();
  };
  if (document.fonts) document.fonts.ready.then(() => { layout(); go(); update(); }); else go();

  /* ---------- sticker playground ---------- */
  const board = document.querySelector('.t-board');
  const layer = document.querySelector('.t-board-layer');
  const rot = () => (Math.random() * 16 - 8).toFixed(1);
  const place = (k, x, y) => {
    const s = document.createElement('img');
    s.className = 't-placed'; s.src = img(k); s.alt = ''; s.draggable = false;
    s.style.left = `${x}%`; s.style.top = `${y}%`; s.style.rotate = `${rot()}deg`;
    layer.appendChild(s);
    s.animate([{ transform: 'translate(-50%,-50%) scale(1.25)' }, { transform: 'translate(-50%,-50%) scale(1)' }], { duration: reduce ? 0 : 260, easing: 'cubic-bezier(.3,1.5,.5,1)' });
    return s;
  };
  const drag = (startEl, k, e, existing) => {
    e.preventDefault();
    const ghost = existing || document.createElement('img');
    if (!existing) { ghost.src = img(k); ghost.alt = ''; ghost.className = 't-ghost'; document.body.appendChild(ghost); }
    else { ghost.classList.add('t-lift'); }
    const moveTo = (cx, cy) => {
      if (existing) {
        const b = board.getBoundingClientRect();
        ghost.style.left = `${((cx - b.left) / b.width) * 100}%`; ghost.style.top = `${((cy - b.top) / b.height) * 100}%`;
      } else { ghost.style.left = `${cx + scrollX}px`; ghost.style.top = `${cy + scrollY}px`; }
    };
    moveTo(e.clientX, e.clientY);
    const move = (ev) => moveTo(ev.clientX, ev.clientY);
    const up = (ev) => {
      removeEventListener('pointermove', move); removeEventListener('pointerup', up);
      const b = board.getBoundingClientRect();
      const inside = ev.clientX > b.left && ev.clientX < b.right && ev.clientY > b.top && ev.clientY < b.bottom;
      if (existing) { ghost.classList.remove('t-lift'); if (!inside) ghost.remove(); return; }
      ghost.remove();
      if (inside) place(k, ((ev.clientX - b.left) / b.width) * 100, ((ev.clientY - b.top) / b.height) * 100);
    };
    addEventListener('pointermove', move); addEventListener('pointerup', up);
  };
  document.querySelectorAll('.t-tray-item').forEach((b) => {
    b.addEventListener('pointerdown', (e) => { if (e.button === 0 && e.pointerType !== 'keyboard') drag(b, b.dataset.k, e); });
    b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); place(b.dataset.k, 15 + Math.random() * 70, 15 + Math.random() * 60); } });
  });
  layer.addEventListener('pointerdown', (e) => { const s = e.target.closest('.t-placed'); if (s) drag(null, null, e, s); });
  document.querySelector('.t-reset').addEventListener('click', () => { layer.innerHTML = ''; });
  // start with a few stickers on the table so the idea reads at a glance
  [['goggles', 30, 34], ['brain', 68, 40], ['walker', 52, 70]].forEach(([k, x, y]) => place(k, x, y));
})();
