/* Direction 1: Prism. One beam of light split into seven bands, one per kind of state. */
(function () {
  // visual order of a real prism (red on top, violet at the bottom), mapped to the state colours
  const RAY_ORDER = [7, 4, 3, 5, 2, 1, 6];

  const prismSVG = (opts = {}) => {
    const rays = RAY_ORDER.map((s, i) => {
      const y0 = 203 + i * 2.2, ye = 246 + i * 34;
      return `<polygon class="ray" style="--i:${i}" fill="var(--s${s})" points="248,${y0} 250,${y0 + 2.6} 420,${ye + 31} 420,${ye}"/>`;
    }).join('');
    return `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      ${opts.bg === false ? '' : '<rect width="400" height="500" fill="var(--ground-2)"/>'}
      <line x1="-10" y1="262" x2="152" y2="208" stroke="var(--ink)" stroke-width="1.6"/>
      <polygon points="152,208 247,201 251,213" fill="var(--ink)" opacity=".08"/>
      <g style="mix-blend-mode:multiply">${rays}</g>
      <polygon points="200,104 106,292 294,292" fill="var(--ground)" fill-opacity=".35" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/>
      ${opts.caption === false ? '' : `<text x="24" y="476" class="svg-label">FIG. 1 · ONE LIGHT, SEVEN ROUTES</text>`}
    </svg>`;
  };

  window.DIRECTIONS.push({
    id: 'prism',
    name: 'Prism',
    lens: 'Refraction',
    idea: 'One beam of light, split into many. Each kind of experience gets its own band of the spectrum, and the brand is the glass that holds them together. Closest to the current Instagram post, pushed further.',
    fonts: ['https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=Fragment+Mono&display=swap'],
    fontNames: { display: 'Funnel Display (stand-in for FF Blur)', text: 'Funnel Sans', label: 'Fragment Mono' },
    tokens: {
      '--ground': '#F2EDE4', '--ground-2': '#E8E1D4', '--ink': '#1B1915', '--ink-2': '#625A4E',
      '--line': 'rgba(27,25,21,.13)', '--line-strong': 'rgba(27,25,21,.3)',
      '--accent': '#1B1915', '--on-accent': '#F2EDE4',
      '--font-display': "'Funnel Display', system-ui, sans-serif",
      '--font-text': "'Funnel Sans', system-ui, sans-serif",
      '--font-label': "'Fragment Mono', ui-monospace, monospace",
      '--display-weight': '400', '--display-tracking': '-0.035em', '--radius': '2px',
    },
    spectrum: ['#34508C', '#2E8C86', '#E2B33C', '#E07432', '#6F9A3E', '#6B4FA0', '#C8402F'],
    swatches: [['Ground', '#F2EDE4'], ['Panel', '#E8E1D4'], ['Ink', '#1B1915'], ['Muted', '#625A4E'], ['Accent', '#1B1915']],
    specimenWord: 'Refract',
    behaviors: [
      ['Blur mask', 'Display type rests slightly out of focus with a spectral fringe. A sharp band sweeps across it like light passing through glass, and follows the cursor.'],
      ['Images', 'Photos and footage graded warm and matte, then crossed by a slow spectral light leak.'],
      ['Motion', 'Transitions wipe in seven bands, one per kind of state. Nothing bounces.'],
    ],
    hero: () => prismSVG(),
    slideArt: () => prismSVG({ caption: false }),
    defs: `
      <filter id="prism-grade" color-interpolation-filters="sRGB">
        <feColorMatrix type="saturate" values=".18"/>
        <feComponentTransfer>
          <feFuncR type="linear" slope=".9" intercept=".09"/>
          <feFuncG type="linear" slope=".86" intercept=".08"/>
          <feFuncB type="linear" slope=".78" intercept=".07"/>
        </feComponentTransfer>
      </filter>`,
    css: `
      .svg-label { font: 9px var(--font-label); letter-spacing: .16em; fill: var(--ink-2); }
      .ray { opacity: .82; animation: ray 5.5s ease-in-out infinite; animation-delay: calc(var(--i) * -.7s); }
      @keyframes ray { 50% { opacity: .55; } }

      /* blur mask: spectral soft copy + a sharp band that sweeps with --mx */
      .bt-soft {
        color: transparent;
        text-shadow: -.024em 0 .035em var(--s7), -.012em 0 .035em var(--s4), 0 0 .035em var(--s3),
                     .012em 0 .035em var(--s5), .024em 0 .035em var(--s1), .036em 0 .035em var(--s6);
        opacity: .4;
      }
      .bt-sharp {
        --m: linear-gradient(100deg, rgba(0,0,0,.62) calc(var(--mx) - 42%), #000 calc(var(--mx) - 12%), #000 calc(var(--mx) + 12%), rgba(0,0,0,.62) calc(var(--mx) + 42%));
        -webkit-mask-image: var(--m); mask-image: var(--m);
      }
      .state-chip { border-radius: 0; width: 22px; height: 6px; }
      .slide-states .state-chip { width: 2.4cqw; height: .8cqw; }

      .prism-img { filter: url(#prism-grade) contrast(1.05); }
      .leak {
        position: absolute; top: 0; bottom: 0; left: -60%; width: 220%;
        background: linear-gradient(105deg, transparent 22%, var(--s7) 31%, var(--s4) 36%, var(--s3) 41%, var(--s5) 46%, var(--s2) 51%, var(--s1) 56%, var(--s6) 61%, transparent 70%);
        mix-blend-mode: screen; opacity: .5;
        animation: leak 8s ease-in-out infinite alternate;
      }
      @keyframes leak { from { transform: translateX(-22%); } to { transform: translateX(14%); } }

      .vf .cap { color: #F2EDE4; font-weight: 500; text-shadow: 0 .3cqw 2cqw rgba(0,0,0,.35); }
      .vf .cap .hl { background: linear-gradient(90deg, var(--s7), var(--s4), var(--s3), var(--s5), var(--s1), var(--s6)) bottom / 100% .7cqw no-repeat; padding-bottom: .6cqw; }
      .vf .badge { color: #F2EDE4; padding-left: 3cqw; border-left: .5cqw solid; border-image: linear-gradient(var(--s7), var(--s4), var(--s3), var(--s5), var(--s1), var(--s6)) 1; }

      .vf-top { display: flex; align-items: center; gap: 3cqw; }
      .vf-top .mark { width: 9cqw; height: 9cqw; }
      .vf-top .wordmark { font-size: 2.6cqw; }
      .vf-prism { position: relative; flex: 1; margin: 4cqw -7cqw 6cqw; }
      .vf-prism svg { position: absolute; inset: 0; width: 100%; height: 100%; }
      .vf-prism svg { transform: scale(1.25); transform-origin: 50% 45%; }
      .vf-bar { display: grid; grid-template-columns: repeat(7, 1fr); height: 1.4cqw; margin-top: 6cqw; }
      .vf-bar i { background: var(--c); }

      .bands { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(7, 1fr); transform: skewX(-12deg) scaleX(1.3); }
      .bands i { background: var(--c); mix-blend-mode: multiply; transform-origin: top; transform: scaleY(calc(1 - var(--i) / 6)); animation: band 4s cubic-bezier(.7,0,.2,1) infinite alternate; animation-delay: calc(var(--i) * -.35s); }
      @keyframes band { from { transform: scaleY(1); } to { transform: scaleY(.15); } }
      .wipe-label { position: absolute; left: 7cqw; bottom: 9cqw; font: 2.6cqw var(--font-label); letter-spacing: .16em; text-transform: uppercase; color: #F2EDE4; }
    `,
    frames: (H) => [
      {
        label: 'Title card',
        note: 'The headline drifts in and out of focus as the sharp band passes. The seven rays carry on from the website hero.',
        html: `<div class="vf-safe">
            <div class="vf-top">${H.MARK}<span class="wordmark">Sensoria Research</span></div>
            <div class="vf-prism">${prismSVG({ caption: false, bg: false })}</div>
            ${H.bt('div', 'vf-title', 'One light.<br>Seven routes.')}
            <div class="vf-bar">${[1, 2, 3, 4, 5, 6, 7].map((n) => `<i style="--c:var(--s${n})"></i>`).join('')}</div>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Footage graded warm and matte. A spectral leak drifts across the frame, and the active caption word gets a spectrum underline.',
        cls: 'grain',
        html: `<img class="layer prism-img" src="${H.media('leo-1.jpg')}" alt="">
          <div class="leak"></div>
          ${H.badge('Leo Christov-Moore', 'Sensoria Research')}
          ${H.cap('That shiver when the music <span class="hl">lands</span>')}`,
      },
      {
        label: 'Transition',
        note: 'Seven bands wipe across the cut, one per kind of state, and lift away to reveal the next shot.',
        cls: 'grain',
        html: `<img class="layer prism-img" src="${H.media('brain.jpg')}" alt="">
          <div class="bands">${[7, 4, 3, 5, 2, 1, 6].map((n, i) => `<i style="--c:var(--s${n});--i:${i}"></i>`).join('')}</div>
          <span class="wipe-label">Spectral wipe · 18 frames</span>`,
      },
    ],
  });
})();
