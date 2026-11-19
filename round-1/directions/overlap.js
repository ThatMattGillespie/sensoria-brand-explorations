/* Direction 5: Overlap. Three primaries, mixed by overlapping. Three circles make exactly seven regions: one per kind of state. */
(function () {
  const R = '#F06450', Y = '#FACE3C', B = '#4678E6';

  // Venn: blue (top left), red (top right), yellow (bottom). Seven regions, numbered in list order.
  const venn = (opts = {}) => `
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid ${opts.slice ? 'slice' : 'meet'}" aria-hidden="true">
      <g class="venn" style="isolation:isolate">
        <circle class="c c1" cx="152" cy="205" r="108" fill="${B}"/>
        <circle class="c c2" cx="248" cy="205" r="108" fill="${R}"/>
        <circle class="c c3" cx="200" cy="288" r="108" fill="${Y}"/>
      </g>
      ${opts.labels === false ? '' : `<g class="venn-num">
        <text x="96" y="178">01</text><text x="141" y="294" class="lt">02</text><text x="200" y="370">03</text>
        <text x="200" y="240" class="lt">04</text><text x="259" y="294">05</text><text x="200" y="152" class="lt">06</text><text x="304" y="178">07</text>
      </g>`}
      ${opts.caption === false ? '' : `<text x="24" y="476" class="svg-label">FIG. 2 · THREE INKS, SEVEN REGIONS</text>`}
    </svg>`;

  window.DIRECTIONS.push({
    id: 'overlap',
    name: 'Overlap',
    lens: 'Colour blending',
    idea: 'Three primary inks on warm paper. New colours only appear where they overlap, and three circles make exactly seven regions, one for each kind of state. Experience as mixture: no state stands alone.',
    fonts: ['https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Spline+Sans+Mono:wght@300..700&display=swap'],
    fontNames: { display: 'Bricolage Grotesque (stand-in for Balium Blur)', text: 'Bricolage Grotesque, text size', label: 'Spline Sans Mono' },
    tokens: {
      '--ground': '#F5F0E6', '--ground-2': '#ECE5D7', '--ink': '#161513', '--ink-2': '#5C574F',
      '--line': 'rgba(22,21,19,.13)', '--line-strong': 'rgba(22,21,19,.3)',
      '--accent': B, '--on-accent': '#161513',
      '--font-display': "'Bricolage Grotesque', system-ui, sans-serif",
      '--font-text': "'Bricolage Grotesque', system-ui, sans-serif",
      '--font-label': "'Spline Sans Mono', ui-monospace, monospace",
      '--display-weight': '700', '--display-tracking': '-0.045em', '--display-leading': '.9', '--display-stretch': '85%',
      '--label-tracking': '.12em', '--radius': '18px', '--btn-radius': '999px',
    },
    // list order; overlaps are the multiplied colours of the inks above them
    spectrum: [B, '#456136', Y, '#412612', '#EB5113', '#422F48', R],
    swatches: [['Paper', '#F5F0E6'], ['Blue', B], ['Red', R], ['Yellow', Y], ['Ink', '#161513']],
    specimenWord: 'Mixture',
    behaviors: [
      ['Blur mask', 'Behind every headline sits a soft, blurred copy filled with the three inks. Where the cursor goes, the black ink dissolves and the colour underneath shows through.'],
      ['Images', 'Photos are printed in one neutral ink, and coloured discs drift over them. Colour comes from the overlaps, never from the photo.'],
      ['Motion', 'Discs slide, overlap and part. Cuts are discs growing to fill the frame. The numbered seven-region diagram is the recurring figure.'],
    ],
    hero: () => venn(),
    slideArt: () => venn({ caption: false }),
    css: `
      body { font-variation-settings: "opsz" 14; }
      .display, .h2, .slide-title, .vf-title, .stat-big, .applied-head h2, .sp-display { font-variation-settings: "opsz" 96; }
      .svg-label { font: 9px var(--font-label); letter-spacing: .14em; fill: var(--ink-2); }
      .venn .c { mix-blend-mode: multiply; animation: drift 9s ease-in-out infinite alternate; }
      .venn .c2 { animation-delay: -3s; } .venn .c3 { animation-delay: -6s; }
      @keyframes drift { 0% { transform: translate(0, 0); } 50% { transform: translate(4px, -3px); } 100% { transform: translate(-3px, 4px); } }
      .venn-num text { font: 500 13px var(--font-label); text-anchor: middle; fill: var(--ink); }
      .venn-num text.lt { fill: #F5F0E6; }
      .slide-kicker { font-style: normal; font-weight: 600; }
      .state-chip { width: 18px; height: 18px; mix-blend-mode: multiply; }

      /* blur mask: blurred ink-filled copy beneath; the black dissolves around the cursor */
      .bt-soft {
        color: transparent;
        background: linear-gradient(100deg, ${B} 10%, ${Y} 45%, ${R} 80%) 0 0 / 200% 100%;
        -webkit-background-clip: text; background-clip: text;
        filter: blur(.025em); mix-blend-mode: multiply; transform: translate(.02em, .025em);
        animation: inks 14s ease-in-out infinite alternate;
      }
      @keyframes inks { to { background-position: 100% 0; } }
      .bt-sharp {
        --m: radial-gradient(ellipse 22% 70% at var(--mx) var(--my), rgba(0,0,0,.45) 15%, #000 100%);
        -webkit-mask-image: var(--m); mask-image: var(--m);
      }
      .btn-primary { font-weight: 600; }

      .ovl { position: absolute; inset: 0; overflow: hidden; background: var(--ground); isolation: isolate; }
      .ovl img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.05) brightness(var(--lift, 1.1)); mix-blend-mode: multiply; }
      .ovl i { position: absolute; border-radius: 50%; mix-blend-mode: multiply; opacity: .9; animation: drift2 7s ease-in-out infinite alternate; }
      @keyframes drift2 { to { transform: translate(6cqw, -4cqw); } }
      .vf .cap { font-weight: 600; color: var(--ink); }
      .vf .cap span { background: var(--ground); border-radius: 999px; padding: .6cqw 3cqw; box-decoration-break: clone; -webkit-box-decoration-break: clone; line-height: 1.6; }
      .vf .badge { flex-direction: row; align-items: center; gap: 2.4cqw; background: var(--ground); color: var(--ink); border-radius: 999px; padding: 1.6cqw 4cqw 1.6cqw 1.6cqw; }
      .vf .badge::before { content: ""; width: 7cqw; height: 7cqw; border-radius: 50%; background: conic-gradient(${B} 0 33%, ${R} 0 66%, ${Y} 0); }
      .vf .badge b { font-size: 3.8cqw; }
      .vf .badge span { font-size: 2.2cqw; color: var(--ink-2); }
      .vf-venn { position: absolute; left: -10cqw; right: -10cqw; top: -8cqw; height: 110cqw; }
      .vf-venn svg { width: 100%; height: 100%; }
      .grow-label { position: absolute; left: 7cqw; bottom: 9cqw; font: 2.6cqw var(--font-label); letter-spacing: .12em; text-transform: uppercase; color: var(--ink); }
    `,
    frames: (H) => [
      {
        label: 'Title card',
        note: 'The seven-region figure drifts at the top of the frame. The headline sits on a blurred copy of itself filled with the three inks.',
        html: `<div class="vf-venn">${venn({ caption: false, slice: true })}</div>
          <div class="vf-safe">
            <div style="margin-top:auto">${H.bt('div', 'vf-title', 'One light. Seven routes.')}</div>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Footage printed in one neutral ink. Blue and yellow discs drift across it and mix to green where they meet. Captions sit on paper-coloured pills.',
        html: `<div class="ovl layer" style="--lift:1.9"><img src="${H.media('leo-1.jpg')}" alt="">
            <i style="background:${B};width:70cqw;height:70cqw;left:-30cqw;top:30cqw"></i>
            <i style="background:${Y};width:56cqw;height:56cqw;left:-8cqw;top:62cqw;animation-delay:-3s"></i></div>
          ${H.badge('Leo Christov-Moore', 'Sensoria Research')}
          ${H.cap('<span>That shiver when the music lands</span>')}`,
      },
      {
        label: 'Transition',
        note: 'Three discs grow until they cover the frame, their overlaps briefly painting the screen in all seven colours, then part to reveal the next shot.',
        html: `<div class="ovl layer" style="--lift:1.15"><img src="${H.media('brain.jpg')}" alt="">
            <i style="background:${B};width:120cqw;height:120cqw;left:-48cqw;top:-10cqw"></i>
            <i style="background:${R};width:120cqw;height:120cqw;left:28cqw;top:10cqw;animation-delay:-2s"></i>
            <i style="background:${Y};width:120cqw;height:120cqw;left:-20cqw;top:78cqw;animation-delay:-4s"></i></div>
          <span class="grow-label">Disc wipe · 20 frames</span>`,
      },
    ],
  });
})();
