/* Direction: Refract primaries. Same palette and surfaces as Refract teal, but every headline is three layers
   (red, blue, yellow) that multiply to black where they overlap, each drifting slowly on its own. */
(function () {
  const SURFACE = '#F2ECE2', WHITE = '#FEFEFE', TEAL = '#05272B', TEAL700 = '#1A5259';
  const TURQ = '#40E0D0', AMBER = '#FFD28D';
  // chosen so red x blue x yellow multiplies to a warm near-black (about #190A03)
  const RED = '#E8342C', BLUE = '#1C3EBE', YELLOW = '#FACC14';
  const SPECTRUM = ['#0A3238', TEAL700, '#2A7F7A', '#279E92', '#E9B567', '#D4943E', '#B9722F'];

  const plates = (src, cls = '', style = '') =>
    `<div class="rpx ${cls}" style="${style}"><img class="pl-y" src="${src}" alt=""><img class="pl-r" src="${src}" alt=""><img class="pl-b" src="${src}" alt=""></div>`;

  const hero = (H, caption = true) => `
    <div class="rpx-mat">
      ${plates(H.media('brain.jpg'), 'rpx-in', '--lift:1')}
      ${caption ? '<span class="rpx-cap">Fig. 1 · Three inks, printed to black</span>' : ''}
    </div>`;

  const dots = () => `<div class="rpx-dots"><i style="background:${RED}"></i><i style="background:${BLUE}"></i><i style="background:${YELLOW}"></i></div>`;

  window.DIRECTIONS.push({
    id: 'refract-primaries',
    name: 'Refract primaries',
    lens: 'Current palette, three-ink type',
    idea: 'The Refract teal page, with one change in the type. Every headline is printed from red, blue and yellow layers that add up to black. They drift a fraction apart and back, so a hint of colour lives at the edges of the black.',
    extraLayers: 2,
    fonts: ['https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=Fragment+Mono&display=swap'],
    fontNames: { display: 'Funnel Display (stand-in for FF Blur)', text: 'Funnel Sans', label: 'Fragment Mono' },
    tokens: {
      '--ground': SURFACE, '--ground-2': WHITE, '--ink': TEAL, '--ink-2': '#4C6466',
      '--line': 'rgba(5,39,43,.12)', '--line-strong': 'rgba(5,39,43,.28)',
      '--accent': TEAL, '--on-accent': WHITE,
      '--font-display': "'Funnel Display', system-ui, sans-serif",
      '--font-text': "'Funnel Sans', system-ui, sans-serif",
      '--font-label': "'Fragment Mono', ui-monospace, monospace",
      '--display-weight': '400', '--display-tracking': '-0.035em', '--radius': '3px', '--btn-radius': '999px', '--grain-amt': '.1',
    },
    spectrum: SPECTRUM,
    swatches: [['Warm surface', SURFACE], ['White', WHITE], ['Deep teal', TEAL], ['Turquoise', TURQ], ['Amber', AMBER]],
    specimenWord: 'Refract',
    behaviors: [
      ['Type layers', 'Red, blue and yellow copies of each headline multiply to black. Each drifts on its own slow loop and leans a little with the cursor, so thin edges of colour come and go.'],
      ['Blur mask', 'A faint blurred copy sits underneath. Away from the cursor the colour layers thin slightly and the soft copy shows through.'],
      ['Images', 'Photos printed from the same three inks: each one a separate plate, drifting slowly, meeting in black. Teal stays in the interface and the type colour.'],
    ],
    hero: (H) => hero(H),
    slideArt: (H) => hero(H, false),
    defs: [['r', '.91 .2 .17'], ['b', '.11 .24 .75'], ['y', '.98 .8 .08']].map(([id, rgb]) => {
      const [r, g, b] = rgb.split(' ');
      // two-level plate: full ink where the photo is dark, none elsewhere, so all three plates meet in black
      return `<filter id="rpx-${id}" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%">
        <feColorMatrix type="matrix" values="0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  -.33 -.33 -.34 0 1" result="a"/>
        <feComponentTransfer in="a"><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer>
      </filter>`;
    }).join(''),
    css: `
      /* three ink layers, each on its own slow drift plus a small lean toward the cursor */
      .bt { isolation: isolate; }
      .bt-sharp, .bt-x {
        mix-blend-mode: multiply;
        --m: radial-gradient(ellipse 34% 90% at var(--mx) var(--my), #000 30%, rgba(0,0,0,.8) 100%);
        -webkit-mask-image: var(--m); mask-image: var(--m);
      }
      .bt-sharp { color: ${BLUE}; translate: calc(var(--nx, 0) * -.006em) calc(var(--ny, 0) * -.004em); animation: inkA 9s ease-in-out infinite alternate; }
      .bt-x1 { color: ${RED}; translate: calc(var(--nx, 0) * .007em) calc(var(--ny, 0) * .003em); animation: inkB 11.7s ease-in-out infinite alternate; }
      .bt-x2 { color: ${YELLOW}; translate: calc(var(--nx, 0) * .002em) calc(var(--ny, 0) * .007em); animation: inkC 13.3s ease-in-out infinite alternate; }
      @keyframes inkA { from { transform: translate(-.011em, .005em); } to { transform: translate(.008em, -.006em); } }
      @keyframes inkB { from { transform: translate(.01em, .004em); } to { transform: translate(-.007em, -.009em); } }
      @keyframes inkC { from { transform: translate(-.002em, -.011em); } to { transform: translate(.006em, .01em); } }
      .bt-soft { color: rgba(25,10,3,.35); filter: blur(.04em); }

      .state-chip { width: 10px; height: 10px; }
      .slide-states .state-chip { width: 1.3cqw; height: 1.3cqw; }
      .hero-visual, .slide-art { background: ${WHITE}; box-shadow: 0 1px 0 var(--line-strong); }
      .btn-quiet { box-shadow: inset 0 0 0 1px var(--line-strong); background: ${WHITE}; }

      .rpx { position: absolute; inset: 0; overflow: hidden; background: ${SURFACE}; isolation: isolate; --amp: .5%; }
      .rpx img { position: absolute; inset: -3%; width: 106%; height: 106%; object-fit: cover; mix-blend-mode: multiply; }
      .rpx .pl-b { filter: brightness(var(--lift, 1.1)) contrast(1.15) url(#rpx-b); animation: plA 10s ease-in-out infinite alternate; }
      .rpx .pl-r { filter: brightness(var(--lift, 1.1)) contrast(1.15) url(#rpx-r); animation: plB 12.5s ease-in-out infinite alternate; }
      .rpx .pl-y { filter: brightness(var(--lift, 1.1)) contrast(1.15) url(#rpx-y); animation: plC 14s ease-in-out infinite alternate; }
      @keyframes plA { from { transform: translate(calc(var(--amp) * -1), calc(var(--amp) * .5)); } to { transform: translate(var(--amp), calc(var(--amp) * -.4)); } }
      @keyframes plB { from { transform: translate(var(--amp), calc(var(--amp) * .3)); } to { transform: translate(calc(var(--amp) * -.6), calc(var(--amp) * -.8)); } }
      @keyframes plC { from { transform: translate(calc(var(--amp) * -.2), calc(var(--amp) * -1)); } to { transform: translate(calc(var(--amp) * .5), var(--amp)); } }
      .rpx-mat { position: absolute; inset: 0; background: ${WHITE}; }
      .rpx-mat .rpx-in { inset: 7% 7% 15% 7%; }
      .rpx-cap { position: absolute; left: 7%; right: 7%; bottom: 5.5%; font: 10px/1.4 var(--font-label); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-2); }

      .vf .cap { color: ${TEAL}; font-weight: 500; font-size: 5.8cqw; }
      .vf .cap span { background: ${WHITE}; box-decoration-break: clone; -webkit-box-decoration-break: clone; padding: .4cqw 2cqw; line-height: 1.55; }
      .vf .badge { background: ${WHITE}; color: ${TEAL}; padding: 2.4cqw 3cqw; border-radius: 3px; }
      .vf .badge span { color: var(--ink-2); }
      .rpx-dots { position: relative; height: 16cqw; margin: auto 0 0; }
      .rpx-dots i { position: absolute; top: 0; width: 14cqw; height: 14cqw; border-radius: 50%; mix-blend-mode: multiply; }
      .rpx-dots i:nth-child(1) { left: 0; animation: plA 6s ease-in-out infinite alternate; --amp: 2cqw; }
      .rpx-dots i:nth-child(2) { left: 3cqw; animation: plB 7s ease-in-out infinite alternate; --amp: 2cqw; }
      .rpx-dots i:nth-child(3) { left: 1.5cqw; top: 2cqw; animation: plC 8s ease-in-out infinite alternate; --amp: 2cqw; }
      .vf-strip { display: grid; grid-template-columns: repeat(7, 1fr); height: 1.2cqw; margin-top: 6cqw; }
      .vf-strip i { background: var(--c); }
      .part-label { position: absolute; left: 7cqw; bottom: 9cqw; font: 2.4cqw var(--font-label); letter-spacing: .14em; text-transform: uppercase; color: ${TEAL}; background: ${WHITE}; padding: .6cqw 1.4cqw; }
    `,
    frames: (H) => [
      {
        label: 'Title card',
        note: 'Three ink dots that make black where they meet, drifting slowly. The headline’s red, blue and yellow layers wander independently, so colour flickers at the edges.',
        cls: 'grain',
        html: `<div class="vf-safe">
            <span class="label" style="font-size:2.4cqw">Sensoria Research</span>
            <div style="margin-top:44cqw">${H.bt('div', 'vf-title', 'One light.<br>Seven routes.')}</div>
            ${dots()}
            <div class="vf-strip">${SPECTRUM.map((c) => `<i style="--c:${c}"></i>`).join('')}</div>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Footage printed from three drifting ink plates that meet in near-black, so the image is monochrome with a breath of colour at the edges. White caption strips in teal.',
        cls: 'grain',
        html: `${plates(H.media('leo-1.jpg'), 'layer', '--lift:1.7;--amp:.6%')}
          ${H.badge('Leo Christov-Moore', 'Sensoria Research')}
          ${H.cap('<span>That shiver when the music lands</span>')}`,
      },
      {
        label: 'Transition',
        note: 'The plates part: red, blue and yellow pull apart across the cut, then converge on the next shot and print black again.',
        cls: 'grain',
        html: `${plates(H.media('brain.jpg'), 'layer', '--lift:1;--amp:4%')}
          <span class="part-label">Plates part · 12 frames</span>`,
      },
    ],
  });
})();
