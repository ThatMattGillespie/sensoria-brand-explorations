/* Direction: Primary prism. Prism's type (Funnel) with Primary riso's three inks. A beam splits into three
   printed bands that overprint where they cross; no prism triangle. */
(function () {
  const BLUE = '#0078BF', RED = '#F15060', YELLOW = '#FFE800', NAVY = '#002648';
  const SPECTRUM = [BLUE, '#318423', '#F5C400', '#2E3A11', '#EF6616', '#2E3F5F', RED];

  const beams = (opts = {}) => `
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid ${opts.slice ? 'slice' : 'meet'}" aria-hidden="true">
      ${opts.bg === false ? '' : '<rect width="400" height="500" fill="var(--ground-2)"/>'}
      <line x1="-10" y1="262" x2="64" y2="250" stroke="${NAVY}" stroke-width="1.4"/>
      <g class="pp-beams">
        <polygon class="pp-beam" points="64,250 410,78 410,282" fill="${BLUE}"/>
        <polygon class="pp-beam" style="--o:1" points="64,250 410,160 410,362" fill="${RED}"/>
        <polygon class="pp-beam" style="--o:2" points="64,250 410,240 410,444" fill="${YELLOW}"/>
      </g>
      <circle cx="64" cy="250" r="3.2" fill="${NAVY}"/>
      ${opts.caption === false ? '' : `<text x="24" y="476" class="svg-label">FIG. 1 · ONE BEAM, THREE INKS</text>`}
    </svg>`;

  const plates = (src, lift = 1.3, cls = '', style = '') =>
    `<div class="pp ${cls}" style="--lift:${lift};${style}"><img class="p-y" src="${src}" alt=""><img class="p-r" src="${src}" alt=""><img class="p-b" src="${src}" alt=""></div>`;

  const bands = () => `<div class="pp-bands">${SPECTRUM.map((c, i) => `<i style="--c:${c};--i:${i}"></i>`).join('')}</div>`;

  window.DIRECTIONS.push({
    id: 'primary-prism',
    name: 'Primary prism',
    lens: 'Prism type, riso inks',
    idea: 'Prism’s calm, precise type printed in the three riso primaries. A single beam splits into blue, red and yellow bands that overprint where they cross, so the spectrum is made from ink and not from a rainbow.',
    fonts: ['https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=Fragment+Mono&display=swap'],
    fontNames: { display: 'Funnel Display (stand-in for FF Blur)', text: 'Funnel Sans', label: 'Fragment Mono' },
    tokens: {
      '--ground': '#F3EEE2', '--ground-2': '#EAE3D3', '--ink': NAVY, '--ink-2': '#4D5A6E',
      '--line': 'rgba(0,38,72,.13)', '--line-strong': 'rgba(0,38,72,.3)',
      '--accent': NAVY, '--on-accent': '#F3EEE2',
      '--font-display': "'Funnel Display', system-ui, sans-serif",
      '--font-text': "'Funnel Sans', system-ui, sans-serif",
      '--font-label': "'Fragment Mono', ui-monospace, monospace",
      '--display-weight': '400', '--display-tracking': '-0.035em', '--radius': '2px', '--grain-amt': '.2',
    },
    spectrum: SPECTRUM,
    swatches: [['Paper', '#F3EEE2'], ['Blue', BLUE], ['Red', RED], ['Yellow', YELLOW], ['Navy text', NAVY]],
    specimenWord: 'Refract',
    behaviors: [
      ['Blur mask', 'Navy type with a faint primary fringe (red one side, blue the other). A slightly sharper band passes slowly across, following the cursor.'],
      ['Images', 'Photos separated into blue, red and yellow plates with a fine grain, printed translucent so they stay light.'],
      ['Motion', 'Seven-band wipes in the overprint colours, and beams that fan open from a single point.'],
    ],
    hero: () => beams(),
    slideArt: () => beams({ caption: false }),
    defs: [['b', BLUE, '-1 0 0 0 1', 7, '.95'], ['r', RED, '0 -1 0 0 1', 12, '.8'], ['y', YELLOW, '0 0 -1 0 1', 21, '.65']].map(([id, ink, row, seed, freq]) => `
      <filter id="pp-${id}" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="1" seed="${seed}" result="n"/>
        <feColorMatrix in="n" type="saturate" values="0" result="ng"/>
        <feComposite in="SourceGraphic" in2="ng" operator="arithmetic" k2="1" k3=".5" k4="-.25" result="m"/>
        <feColorMatrix in="m" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${row}" result="amt"/>
        <feComponentTransfer in="amt" result="t"><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer>
        <feFlood flood-color="${ink}"/><feComposite in2="t" operator="in"/>
      </filter>`).join(''),
    css: `
      .svg-label { font: 9px var(--font-label); letter-spacing: .16em; fill: var(--ink-2); }
      .pp-beams { isolation: isolate; }
      .pp-beam {
        mix-blend-mode: multiply; opacity: .7;
        transform: translate(calc(var(--o, 0) * 1.2px), calc(var(--o, 0) * -.8px));
        -webkit-mask-image: var(--speck); mask-image: var(--speck);
      }
      :root { --speck: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='1' seed='3'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -3.4 0 0 0 3.1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
      .state-chip { border-radius: 0; width: 22px; height: 6px; mix-blend-mode: multiply; }
      .slide-states .state-chip { width: 2.4cqw; height: .8cqw; }
      .stat-big { mix-blend-mode: multiply; }

      /* blur mask: faint primary fringe and a slow sharper band */
      .bt-soft {
        color: transparent;
        text-shadow: -.022em 0 .03em ${RED}, .022em 0 .03em ${BLUE}, 0 .018em .03em ${YELLOW};
        opacity: .38;
      }
      .bt-sharp {
        --m: linear-gradient(100deg, rgba(0,0,0,.66) calc(var(--mx) - 42%), #000 calc(var(--mx) - 12%), #000 calc(var(--mx) + 12%), rgba(0,0,0,.66) calc(var(--mx) + 42%));
        -webkit-mask-image: var(--m); mask-image: var(--m);
      }

      .pp { position: absolute; inset: 0; background: var(--ground); isolation: isolate; overflow: hidden; }
      .pp img { position: absolute; inset: -3%; width: 106%; height: 106%; object-fit: cover; mix-blend-mode: multiply; opacity: .62; }
      .pp .p-b { filter: brightness(var(--lift)) contrast(1.1) url(#pp-b); }
      .pp .p-r { filter: brightness(var(--lift)) contrast(1.1) url(#pp-r); transform: translate(.6%, .4%); opacity: .7; }
      .pp .p-y { filter: brightness(var(--lift)) contrast(1.1) url(#pp-y); transform: translate(-.4%, .6%); }

      .pp-bands { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(7, 1fr); transform: skewX(-10deg) scaleX(1.3); isolation: isolate; }
      .pp-bands i { background: var(--c); mix-blend-mode: multiply; opacity: .9; transform-origin: top; transform: scaleY(calc(1 - var(--i) / 6.5)); -webkit-mask-image: var(--speck); mask-image: var(--speck); }

      .vf-top { display: flex; align-items: center; gap: 3cqw; }
      .vf-top .mark { width: 9cqw; height: 9cqw; }
      .vf-top .wordmark { font-size: 2.6cqw; }
      .vf-beams { position: relative; flex: 1; margin: 4cqw -7cqw 6cqw; }
      .vf-beams svg { position: absolute; inset: 0; width: 100%; height: 100%; }
      .vf-strip { display: grid; grid-template-columns: repeat(7, 1fr); height: 1.4cqw; margin-top: 6cqw; }
      .vf-strip i { background: var(--c); }
      .vf .cap { color: var(--ink); font-weight: 500; font-size: 5.8cqw; }
      .vf .cap span { background: var(--ground); box-decoration-break: clone; -webkit-box-decoration-break: clone; padding: .4cqw 2cqw; line-height: 1.55; }
      .vf .badge { background: var(--ground); color: var(--ink); padding: 2.4cqw 3cqw; border-left: 1.2cqw solid ${RED}; }
      .wipe-label { position: absolute; left: 7cqw; bottom: 9cqw; font: 2.4cqw var(--font-label); letter-spacing: .16em; text-transform: uppercase; color: var(--ink); background: var(--ground); padding: .6cqw 1.4cqw; }
    `,
    frames: (H) => [
      {
        label: 'Title card',
        note: 'A beam fans into three printed bands that overprint into the secondaries. The headline is calm Funnel type in navy with a faint primary fringe.',
        cls: 'grain',
        html: `<div class="vf-safe">
            <div class="vf-top">${H.MARK}<span class="wordmark">Sensoria Research</span></div>
            <div class="vf-beams">${beams({ caption: false, bg: false })}</div>
            ${H.bt('div', 'vf-title', 'One light.<br>Seven routes.')}
            <div class="vf-strip">${SPECTRUM.map((c) => `<i style="--c:${c}"></i>`).join('')}</div>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Footage in three translucent plates with fine grain, lighter and calmer than Primary riso. Captions on paper strips; the badge has a red edge.',
        cls: 'grain',
        html: `${plates(H.media('leo-1.jpg'), 2.9, 'layer')}
          ${H.badge('Leo Christov-Moore', 'Sensoria Research')}
          ${H.cap('<span>That shiver when the music lands</span>')}`,
      },
      {
        label: 'Transition',
        note: 'The Prism seven-band wipe, now printed: each band is an ink or an overprint, with riso grain at the edges.',
        cls: 'grain',
        html: `${plates(H.media('brain.jpg'), 1.35, 'layer')}
          ${bands()}
          <span class="wipe-label">Seven-band wipe · 18 frames</span>`,
      },
    ],
  });
})();
