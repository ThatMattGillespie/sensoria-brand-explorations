/* Direction: Overlap II. A quieter Overlap. Hairline circles on a wide field of paper; single regions are pale
   tints and full colour gathers only where the circles overlap. */
(function () {
  const COBALT = '#2E5AAC', VERMILION = '#D8553A', OCHRE = '#E0AE3A';
  const SAGE = '#6F9668', APRICOT = '#E5863F', PLUM = '#7A4E86', UMBER = '#5A4632';
  const A = [165, 200], B = [235, 200], C = [200, 262], R = 80;
  const circ = ([x, y], extra = '') => `<circle cx="${x}" cy="${y}" r="${R}" ${extra}/>`;

  // Venn drawn as a figure: tints for single regions, solid mixes for overlaps, hairlines on top
  const venn = (opts = {}) => `
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid ${opts.slice ? 'slice' : 'meet'}" aria-hidden="true">
      <defs>
        <clipPath id="o2-a">${circ(A)}</clipPath>
        <clipPath id="o2-b">${circ(B)}</clipPath>
      </defs>
      ${circ(A, `fill="${COBALT}" fill-opacity=".14"`)}${circ(B, `fill="${VERMILION}" fill-opacity=".14"`)}${circ(C, `fill="${OCHRE}" fill-opacity=".2"`)}
      <g clip-path="url(#o2-a)">${circ(B, `fill="${PLUM}"`)}${circ(C, `fill="${SAGE}"`)}</g>
      <g clip-path="url(#o2-b)">${circ(C, `fill="${APRICOT}"`)}</g>
      <g clip-path="url(#o2-a)"><g clip-path="url(#o2-b)">${circ(C, `fill="${UMBER}"`)}</g></g>
      <g fill="none" stroke="var(--ink)" stroke-width=".7" stroke-opacity=".55">${circ(A)}${circ(B)}${circ(C)}</g>
      ${opts.labels === false ? '' : `<g class="o2-num">
        <text x="122" y="186">01</text><text x="166" y="258" class="lt">02</text><text x="200" y="316">03</text>
        <text x="200" y="232" class="lt">04</text><text x="234" y="258">05</text><text x="200" y="168" class="lt">06</text><text x="278" y="186">07</text>
      </g>`}
      ${opts.caption === false ? '' : `<text x="24" y="476" class="svg-label">FIG. 2 · WHERE EXPERIENCES OVERLAP</text>`}
    </svg>`;

  // transition: the next shot is visible only inside the overlap of two circles
  const lensWipe = (H) => `
    <svg class="layer" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <clipPath id="o2-w1"><circle cx="138" cy="300" r="130"/></clipPath>
        <clipPath id="o2-w2"><circle cx="222" cy="300" r="130"/></clipPath>
      </defs>
      <g clip-path="url(#o2-w1)"><g clip-path="url(#o2-w2)">
        <image href="${H.media('brain.jpg')}" x="0" y="0" width="360" height="640" preserveAspectRatio="xMidYMid slice" class="o2-photo"/>
        <rect width="360" height="640" fill="${OCHRE}" style="mix-blend-mode:multiply" opacity=".35"/>
      </g></g>
      <g fill="none" stroke="#F4F0E8" stroke-width=".9" stroke-opacity=".8"><circle cx="138" cy="300" r="130"/><circle cx="222" cy="300" r="130"/></g>
    </svg>`;

  window.DIRECTIONS.push({
    id: 'overlap-2',
    name: 'Overlap II',
    lens: 'Colour blending, refined',
    idea: 'The same three primaries, used sparingly. Circles are drawn as hairlines on a wide field of paper, and colour only gathers where they overlap, the way meaning gathers where experiences meet. Lighter type, more space, pigment colours instead of pure primaries.',
    fonts: ['https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Funnel+Display:wght@300..800&family=Spline+Sans+Mono:wght@300..700&display=swap'],
    fontNames: { display: 'Funnel Display Light (stand-in for FF Blur)', text: 'Bricolage Grotesque, text size', label: 'Spline Sans Mono' },
    tokens: {
      '--ground': '#F4F0E8', '--ground-2': '#ECE6DB', '--ink': '#1E1C19', '--ink-2': '#6B655C',
      '--line': 'rgba(30,28,25,.11)', '--line-strong': 'rgba(30,28,25,.26)',
      '--accent': '#1E1C19', '--on-accent': '#F4F0E8',
      '--font-display': "'Funnel Display', system-ui, sans-serif",
      '--font-text': "'Bricolage Grotesque', system-ui, sans-serif",
      '--font-label': "'Spline Sans Mono', ui-monospace, monospace",
      '--display-weight': '300', '--display-tracking': '-0.03em', '--display-leading': '.98',
      '--label-tracking': '.14em', '--radius': '2px', '--btn-radius': '999px', '--grain-amt': '.12',
    },
    spectrum: [COBALT, SAGE, OCHRE, UMBER, APRICOT, PLUM, VERMILION],
    swatches: [['Paper', '#F4F0E8'], ['Cobalt', COBALT], ['Vermilion', VERMILION], ['Ochre', OCHRE], ['Ink', '#1E1C19']],
    specimenWord: 'Overlap',
    behaviors: [
      ['Blur mask', 'A faint, pigment-tinted copy sits just behind each headline. Near the cursor the black ink thins a little and the colour comes through. Barely there until you look for it.'],
      ['Images', 'Footage in warm monochrome. Colour arrives only through overlap: a hairline circle, a soft ochre disc, and the shot visible where they cross.'],
      ['Motion', 'Slow and sparse. Circles converge and the next shot appears inside their overlap. The numbered figure is the one recurring graphic.'],
    ],
    hero: () => venn(),
    slideArt: () => venn({ caption: false }),
    css: `
      body { font-variation-settings: "opsz" 14; }
      .display { font-size: clamp(52px, 6.2vw, 88px); }
      .state-name { font-weight: 300; font-size: 28px; }
      .stat-big { font-weight: 300; }
      .lead { font-weight: 300; }
      .svg-label { font: 9px var(--font-label); letter-spacing: .14em; fill: var(--ink-2); }
      .o2-num text { font: 400 10px var(--font-label); text-anchor: middle; fill: var(--ink); }
      .o2-num text.lt { fill: #F4F0E8; }
      .hero-visual, .slide-art { background: transparent; }
      .state-chip { width: 10px; height: 10px; }
      .slide-states .state-chip { width: 1.3cqw; height: 1.3cqw; }
      .slide-kicker { font-style: normal; font-weight: 300; }
      .btn { font-weight: 500; }
      .btn-quiet { box-shadow: inset 0 0 0 1px var(--line-strong); }

      /* blur mask: faint pigment copy behind; the ink thins slightly near the cursor */
      .bt-soft {
        color: transparent;
        background: linear-gradient(100deg, ${COBALT} 10%, ${OCHRE} 45%, ${VERMILION} 80%) 0 0 / 200% 100%;
        -webkit-background-clip: text; background-clip: text;
        filter: blur(.02em); opacity: .28; transform: translate(.01em, .012em);
        animation: inks 24s ease-in-out infinite alternate;
      }
      @keyframes inks { to { background-position: 100% 0; } }
      .bt-sharp {
        --m: radial-gradient(ellipse 18% 60% at var(--mx) var(--my), rgba(0,0,0,.68) 20%, #000 100%);
        -webkit-mask-image: var(--m); mask-image: var(--m);
      }

      .o2-img { position: absolute; inset: 0; overflow: hidden; background: #2a2622; }
      .o2-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) sepia(.25) contrast(.92) brightness(var(--lift, 1.15)); }
      .o2-photo { filter: grayscale(1) sepia(.25) contrast(.92) brightness(1.1); }
      .o2-disc { position: absolute; border-radius: 50%; mix-blend-mode: multiply; }
      .o2-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(244,240,232,.75); }
      .vf .cap { color: #F4F0E8; font-weight: 400; font-size: 5.8cqw; }
      .vf .badge { color: #F4F0E8; flex-direction: row; align-items: center; gap: 2.4cqw; }
      .vf .badge::before { content: ""; width: 4.6cqw; height: 4.6cqw; border-radius: 50%; border: 1px solid currentColor; box-shadow: 2.2cqw 0 0 -1px transparent; background: radial-gradient(circle at 70% 50%, ${OCHRE} 0 38%, transparent 40%); }
      .vf .badge div { display: flex; flex-direction: column; gap: .6cqw; }
      .vf .badge b { font-weight: 400; font-size: 4cqw; }
      .vf .badge span { font-size: 2.2cqw; opacity: .8; }
      .vf-fig { position: absolute; left: 0; right: 0; top: 14cqw; height: 112cqw; }
      .vf-fig svg { width: 100%; height: 100%; }
      .wipe-label { position: absolute; left: 7cqw; bottom: 9cqw; font: 2.4cqw var(--font-label); letter-spacing: .14em; text-transform: uppercase; color: #F4F0E8; }
    `,
    frames: (H) => [
      {
        label: 'Title card',
        note: 'The figure sits small in a wide field of paper. The headline is light and quiet, with a faint pigment copy behind it.',
        cls: 'grain',
        html: `<div class="vf-fig">${venn({ caption: false })}</div>
          <div class="vf-safe">
            <span class="label" style="font-size:2.4cqw">Sensoria Research</span>
            <div style="margin-top:auto">${H.bt('div', 'vf-title', 'One light. Seven routes.')}</div>
            <span class="label" style="font-size:2.2cqw;margin-top:4cqw">Seven kinds of state · three inks</span>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Warm monochrome footage. One hairline circle and one soft ochre disc cross near the speaker, and colour exists only where they meet.',
        cls: 'grain',
        html: `<div class="o2-img layer" style="--lift:1.5"><img src="${H.media('leo-1.jpg')}" alt=""></div>
          <div class="o2-disc" style="background:${OCHRE};opacity:.75;mix-blend-mode:color;width:62cqw;height:62cqw;left:44cqw;top:96cqw"></div>
          <div class="o2-ring" style="width:62cqw;height:62cqw;left:14cqw;top:76cqw"></div>
          <div class="badge"><div><b>Leo Christov-Moore</b><span>Sensoria Research</span></div></div>
          ${H.cap('That shiver when the music lands')}`,
      },
      {
        label: 'Transition',
        note: 'Two circles converge over the outgoing shot. The next shot appears only inside their overlap, then the overlap widens to fill the frame.',
        cls: 'grain',
        html: `<div class="o2-img layer" style="--lift:1.3"><img src="${H.media('leo-2.jpg')}" alt=""></div>
          ${lensWipe(H)}
          <span class="wipe-label">Overlap reveal · 24 frames</span>`,
      },
    ],
  });
})();
