/* Round 2 base: Refract teal. Every round-2 direction starts from this and changes only its image treatment.
   - Palette: Sensoria's current teal, turquoise and amber; warm paper and white carry the surfaces.
   - Spectrum: seven hues at one lightness and chroma (OKLCH), so no hue outshouts the core teal and amber.
   - Type: Funnel Display ("Refract"), Funnel Sans, Fragment Mono.
   - Headlines: faint blur mask and a turquoise/amber fringe that points at the cursor. */
(function () {
  const C = {
    SURFACE: '#F2ECE2', WHITE: '#FEFEFE', TEAL: '#05272B', TEAL900: '#0A3238', TEAL700: '#1A5259',
    TURQ: '#40E0D0', AMBER: '#FFD28D', AMBER_INK: '#C98622',
    FT: 'rgba(44,199,184,.9)', FA: 'rgba(242,180,96,.95)',
  };
  // OKLCH L .58 C .11 (on paper, ~3.6:1) and L .82 C .09 (on deep teal, ~9:1). Order follows the states list:
  // dreaming blue, meditation teal, mystical ochre, aesthetic orange, breathwork green, technodelics violet, psychedelics red
  const SPECTRUM = ['#437EB9', '#008E8E', '#98741A', '#AE653A', '#4D8B50', '#8A68AE', '#B25E59'];
  const SPECTRUM_LIGHT = ['#97C9FD', '#78D7D6', '#DFC07F', '#F4B390', '#A0D4A0', '#D1B6F3', '#F9AEA7'];

  // a hand-drawn ellipse (the accent mark from the Jeremy video), drawn in on load
  const circle = (x, y, w, h, color = C.AMBER_INK, sw = 2.2) => `
    <svg class="mark-circle" style="left:${x};top:${y};width:${w};height:${h}" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M14 58 C10 26 52 6 82 22 C102 34 94 76 62 88 C32 98 6 80 10 52 C12 40 26 28 44 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" vector-effect="non-scaling-stroke" pathLength="1"/>
    </svg>`;

  // dotted connector between two points (in % of the parent)
  const dots = (pts, color = C.AMBER_INK) => `
    <svg class="mark-dots" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.6" stroke-dasharray="0.1 5" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    </svg>`;

  // the speaker: natural colour, only a light matte grade and a soft vignette (house rule from treatment.md)
  const speaker = (H, opts = {}) => `
    <img class="layer spk" src="${H.media(opts.src || 'leo-1.jpg')}" alt="">
    <div class="layer spk-vignette"></div>
    ${opts.badge !== false ? H.badge('Leo Christov-Moore', 'Sensoria Research', opts.badgeCls || '') : ''}
    ${opts.cap || H.cap('That shiver when the music <em>lands</em>', opts.capCls || '')}`;

  const css = `
    /* fringe that points at the cursor + a faint blur mask */
    .bt {
      --len: max(hypot(var(--nx, 0), var(--ny, 0)), .2);
      --fx: calc(var(--nx, 0) / var(--len) * .018em);
      --fy: calc(var(--ny, 0) / var(--len) * .018em);
    }
    .bt-soft {
      color: transparent;
      text-shadow: var(--fx) var(--fy) .02em ${C.FT}, calc(var(--fx) * -1) calc(var(--fy) * -1) .02em ${C.FA}, 0 0 .045em rgba(5,39,43,.45);
    }
    .bt-sharp {
      --m: radial-gradient(ellipse 34% 90% at var(--mx) var(--my), #000 30%, rgba(0,0,0,.76) 100%);
      -webkit-mask-image: var(--m); mask-image: var(--m);
    }
    .state-chip { width: 10px; height: 10px; }
    .slide-states .state-chip { width: 1.3cqw; height: 1.3cqw; }
    .btn-quiet { box-shadow: inset 0 0 0 1px var(--line-strong); background: ${C.WHITE}; }

    /* accent marks */
    .mark-circle { position: absolute; overflow: visible; pointer-events: none; }
    .mark-circle path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.4s cubic-bezier(.6,0,.2,1) .5s forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    .mark-dots { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }

    /* speaker: natural colour, light grade */
    .spk { object-fit: cover; filter: saturate(.92) contrast(.97) brightness(1.06) sepia(.05); }
    .spk-vignette { background: radial-gradient(ellipse 80% 65% at 50% 42%, transparent 55%, rgba(5,39,43,.45) 100%); }
    .vf .cap { color: ${C.WHITE}; font-weight: 500; font-size: 5.4cqw; text-shadow: 0 .2cqw 1.6cqw rgba(5,39,43,.55); }
    .vf .cap em { font-style: normal; color: ${C.AMBER}; }
    .vf .badge { color: ${C.WHITE}; text-shadow: 0 .2cqw 1.4cqw rgba(5,39,43,.5); }
    .vf .badge span { opacity: .8; }

    /* deep teal ground with light behind the subject, as in the video house look */
    .ground { background: radial-gradient(ellipse 70% 50% at 50% 42%, #1A5259 0%, #0A3238 55%, #05272B 100%); }
    .ground::after { content: ""; position: absolute; inset: 0; background: var(--grain); mix-blend-mode: soft-light; opacity: .5; }
    .on-dark { color: ${C.WHITE}; }
    .on-dark .label { color: rgba(254,254,254,.7); }

    .vf-strip { display: grid; grid-template-columns: repeat(7, 1fr); height: 1.2cqw; }
    .vf-strip i { background: var(--c); }
    .frame-label { position: absolute; left: 7cqw; bottom: 8cqw; font: 2.3cqw var(--font-label); letter-spacing: .14em; text-transform: uppercase; color: ${C.TEAL}; background: ${C.WHITE}; padding: .6cqw 1.4cqw; }
  `;

  // Print kit (from option A): teal duotone prints with white borders, tape, paper slips, cut-outs, arrows.
  const print = (src, style, cls = 'duo', label = '', extra = '') =>
    `<figure class="print ${cls}" style="${style}"><img src="${src}" alt="">${label ? `<figcaption>${label}</figcaption>` : ''}${extra}</figure>`;
  const tape = (style) => `<i class="tape" style="${style}"></i>`;
  const slip = (text, style, dot = '') => `<span class="slip" style="${style}">${dot ? `<i style="background:${dot}"></i>` : ''}${text}</span>`;
  const arrow = (style, color = C.AMBER) => `
    <svg class="mark-arrow" style="${style}" viewBox="0 0 100 60" aria-hidden="true">
      <path d="M4 48 C30 52 62 40 88 14" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" pathLength="1"/>
      <path d="M74 12 L89 13 L86 28" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  const underline = (style, color = C.AMBER_INK) => `
    <svg class="mark-under" style="${style}" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
      <path d="M3 12 C50 6 110 15 160 9 C178 7 190 9 197 11" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" vector-effect="non-scaling-stroke" pathLength="1"/>
    </svg>`;
  const printKit = {
    defs: `
      <filter id="r2-duo" color-interpolation-filters="sRGB">
        <feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer>
          <feFuncR type="table" tableValues=".02 .1 .62 .95"/>
          <feFuncG type="table" tableValues=".153 .32 .7 .93"/>
          <feFuncB type="table" tableValues=".169 .35 .66 .87"/>
        </feComponentTransfer>
      </filter>`,
    css: `
      .collage { position: absolute; inset: 0; }
      .print {
        position: absolute; margin: 0; background: ${C.WHITE};
        padding: 2.2% 2.2% 6.5%; transform: rotate(var(--r, 0deg));
        box-shadow: 0 14px 30px -14px rgba(5,39,43,.55), 0 1px 2px rgba(5,39,43,.18);
      }
      .print img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .print.duo img { filter: brightness(1.35) url(#r2-duo); }
      .print.nat img { filter: saturate(.95); }
      .print.colour img { filter: saturate(.94) contrast(.97); }
      .print figcaption { position: absolute; left: 4%; right: 4%; bottom: 1.4%; display: flex; justify-content: space-between; align-items: center; gap: 6px; font: 10px var(--font-label); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-2); white-space: nowrap; overflow: hidden; }
      .print figcaption i { width: 8px; height: 8px; border-radius: 50%; flex: none; }
      .cutout { position: absolute; filter: drop-shadow(0 12px 18px rgba(5,39,43,.4)); }
      .tape { position: absolute; width: 22%; height: 7%; background: rgba(242,236,226,.72); box-shadow: 0 1px 2px rgba(5,39,43,.15); transform: rotate(var(--r, -4deg)); z-index: 2; }
      .slip { position: absolute; z-index: 3; display: inline-flex; align-items: center; gap: 6px; background: ${C.WHITE}; color: ${C.TEAL}; font: 10px var(--font-label); letter-spacing: .08em; text-transform: uppercase; padding: 4px 8px; box-shadow: 0 4px 10px -4px rgba(5,39,43,.4); transform: rotate(var(--r, 0deg)); white-space: nowrap; }
      .slip i { width: 8px; height: 8px; border-radius: 50%; }
      .mark-arrow, .mark-under { position: absolute; overflow: visible; pointer-events: none; z-index: 4; }
      .mark-arrow path:first-child, .mark-under path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.2s cubic-bezier(.6,0,.2,1) .8s forwards; }
      .slide-art .print figcaption, .slide-art .slip { font-size: 1.1cqw; }
      .vf .print { padding: 2.4% 2.4% 6%; }
      .vf .print figcaption { font-size: 2cqw; }
      .vf .slip { font-size: 2.2cqw; padding: 1cqw 1.8cqw; gap: 1.2cqw; }
      .vf .slip i { width: 1.8cqw; height: 1.8cqw; }
      .vf .tiny { position: absolute; left: 0; right: 0; bottom: 18cqw; text-align: center; font: 500 3.6cqw var(--font-text); color: ${C.WHITE}; z-index: 5; }
    `,
  };

  window.REFRACT = {
    C, SPECTRUM, SPECTRUM_LIGHT, circle, dots, speaker, print, tape, slip, arrow, underline, printKit,
    strip: (set = SPECTRUM) => `<div class="vf-strip">${set.map((c) => `<i style="--c:${c}"></i>`).join('')}</div>`,
    make(over) {
      return Object.assign({
        fonts: ['https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=Fragment+Mono&display=swap'],
        fontNames: { display: 'Funnel Display, "Refract" (stand-in for FF Blur)', text: 'Funnel Sans', label: 'Fragment Mono' },
        tokens: {
          '--ground': C.SURFACE, '--ground-2': C.WHITE, '--ink': C.TEAL, '--ink-2': '#4C6466',
          '--line': 'rgba(5,39,43,.12)', '--line-strong': 'rgba(5,39,43,.28)',
          '--accent': C.TEAL, '--on-accent': C.WHITE,
          '--font-display': "'Funnel Display', system-ui, sans-serif",
          '--font-text': "'Funnel Sans', system-ui, sans-serif",
          '--font-label': "'Fragment Mono', ui-monospace, monospace",
          '--display-weight': '400', '--display-tracking': '-0.035em', '--radius': '3px', '--btn-radius': '999px', '--grain-amt': '.1',
        },
        spectrum: SPECTRUM,
        spectrumLight: SPECTRUM_LIGHT,
        spectrumNote: 'Spectrum on paper: seven hues at one lightness (OKLCH L .58)',
        spectrumLightNote: 'Light set for deep teal grounds (OKLCH L .82)',
        swatches: [['Warm surface', C.SURFACE], ['White', C.WHITE], ['Deep teal', C.TEAL], ['Turquoise', C.TURQ], ['Amber', C.AMBER]],
        specimenWord: 'Refract',
      }, over, { css: css + (over.css || '') });
    },
  };
})();
