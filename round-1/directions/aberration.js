/* Direction 3: Chromatic aberration. A lens that splits colour at its edges. Sharp where you look, split where you don't. */
(function () {
  const C = 'rgba(0,170,225,.95)', M = 'rgba(232,0,125,.9)', Y = 'rgba(255,208,0,.95)';

  const finder = (extra = '') => `
    <svg class="finder" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="1.4">
        <path d="M20 46V20h26M354 20h26v26M380 454v26h-26M46 480H20v-26"/>
        <path d="M200 236v28M186 250h28"/>
      </g>
    </svg>${extra}`;

  const lens = (src, cls = '') => `
    <div class="lens ${cls}"><img class="base" src="${src}" alt=""><img class="split" src="${src}" alt=""></div>`;

  const hero = (H) => `
    <div class="ab-hero">
      ${lens(H.media('brain.jpg'))}
      ${finder(`<div class="readout"><span>ƒ/1.4</span><span>R · G · B</span><span>∞</span></div>`)}
    </div>`;

  window.DIRECTIONS.push({
    id: 'aberration',
    name: 'Aberration',
    lens: 'Chromatic aberration',
    idea: 'An optical instrument. Colour lives at the edges of things, where a lens fails to bring every wavelength to the same point. The centre is precise and trustworthy; the periphery is where the mystery is.',
    fonts: ['https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@300..600&display=swap'],
    fontNames: { display: 'Geist (stand-in for FF Blur)', text: 'Geist', label: 'Geist Mono' },
    tokens: {
      '--ground': '#EFEBE4', '--ground-2': '#E4DFD5', '--ink': '#121212', '--ink-2': '#58544D',
      '--line': 'rgba(18,18,18,.12)', '--line-strong': 'rgba(18,18,18,.3)',
      '--accent': '#121212', '--on-accent': '#EFEBE4',
      '--font-display': "'Geist', system-ui, sans-serif",
      '--font-text': "'Geist', system-ui, sans-serif",
      '--font-label': "'Geist Mono', ui-monospace, monospace",
      '--display-weight': '500', '--display-tracking': '-0.05em', '--display-leading': '.92',
      '--label-tracking': '.12em', '--radius': '4px', '--btn-radius': '999px',
    },
    spectrum: ['#2B3FD6', '#009CB0', '#E9B800', '#FF6A1A', '#25A866', '#8A3FFC', '#EE2A3C'],
    swatches: [['Ground', '#EFEBE4'], ['Ink', '#121212'], ['Cyan', '#00AAE1'], ['Magenta', '#E8007D'], ['Yellow', '#FFD000']],
    specimenWord: 'Lens',
    behaviors: [
      ['Blur mask', 'A lens drifts over the display type. Inside it the letters are sharp; outside, they soften and split into cyan, magenta and yellow. It follows the cursor.'],
      ['Images', 'Photos stay clean in the centre and split into colour channels toward the edges, like a fast lens shot wide open. A viewfinder frames them.'],
      ['Motion', 'Cuts are channel slips: the three colour channels separate, the image changes, and they snap back into register.'],
    ],
    hero: (H) => hero(H),
    defs: `
      <filter id="ca-split" color-interpolation-filters="sRGB">
        <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
        <feOffset in="r" dx="-7" dy="0" result="ro"/>
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>
        <feOffset in="b" dx="7" dy="2" result="bo"/>
        <feBlend in="ro" in2="g" mode="screen" result="rg"/>
        <feBlend in="rg" in2="bo" mode="screen"/>
      </filter>
      <filter id="ca-heavy" color-interpolation-filters="sRGB">
        <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
        <feOffset in="r" dx="-26" dy="-4" result="ro"/>
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>
        <feOffset in="b" dx="24" dy="6" result="bo"/>
        <feBlend in="ro" in2="g" mode="screen" result="rg"/>
        <feBlend in="rg" in2="bo" mode="screen"/>
      </filter>`,
    css: `
      /* blur mask: a lens. Sharp inside, soft and colour-split outside */
      .bt { --ca: .028em; }
      .bt-soft {
        color: transparent;
        text-shadow: calc(var(--ca) * -1) 0 .03em ${C}, var(--ca) 0 .03em ${M}, 0 calc(var(--ca) * .7) .03em ${Y};
        filter: blur(.012em); mix-blend-mode: multiply;
      }
      .bt-sharp {
        --m: radial-gradient(ellipse 34% 75% at var(--mx) var(--my), #000 30%, rgba(0,0,0,.5) 100%);
        -webkit-mask-image: var(--m); mask-image: var(--m);
      }
      .display.bt::after, .vf-title.bt::after {
        content: ""; position: absolute; left: var(--mx); top: var(--my);
        width: .7em; height: .7em; translate: -50% -50%;
        border: 1px solid currentColor; border-radius: 50%; opacity: .18; pointer-events: none;
      }
      .state-chip { box-shadow: -2px 0 0 ${C}, 2px 0 0 ${M}; }

      .lens { position: absolute; inset: 0; overflow: hidden; background: #111; }
      .lens img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .lens .base { filter: grayscale(1) contrast(1.1) brightness(1.05); }
      .lens .split {
        filter: grayscale(1) contrast(1.1) brightness(1.05) url(#ca-split); transform: scale(1.02);
        --m: radial-gradient(ellipse 60% 52% at 50% 46%, transparent 38%, #000 92%);
        -webkit-mask-image: var(--m); mask-image: var(--m);
      }
      .lens.heavy .split { filter: grayscale(1) contrast(1.15) url(#ca-heavy); -webkit-mask-image: none; mask-image: none; }
      .ab-hero { position: absolute; inset: 0; color: #EFEBE4; }
      .finder { position: absolute; inset: 0; width: 100%; height: 100%; color: inherit; }
      .readout { position: absolute; left: 0; right: 0; bottom: 8%; display: flex; justify-content: center; gap: 22px; font: 11px var(--font-label); letter-spacing: .12em; }
      .slide-art .readout { font-size: 1.3cqw; gap: 2cqw; }

      .vf .cap { color: #fff; font-weight: 600; text-shadow: -.06em 0 0 ${C}, .06em 0 0 ${M}; }
      .vf .badge { color: #fff; }
      .vf .badge span { opacity: .75; }
      .vf-ui { position: absolute; inset: 0; color: #fff; }
      .rec { position: absolute; right: 7cqw; top: 9cqw; display: flex; align-items: center; gap: 1.6cqw; font: 2.6cqw var(--font-label); letter-spacing: .1em; }
      .rec::before { content: ""; width: 2.2cqw; height: 2.2cqw; border-radius: 50%; background: #EE2A3C; }
      .dots { display: flex; margin-top: auto; height: 22cqw; position: relative; }
      .dots i { position: absolute; width: 14cqw; height: 14cqw; border-radius: 50%; mix-blend-mode: multiply; top: 0; left: 0; }
      .dots i:nth-child(1) { background: ${C}; transform: translateX(calc(var(--d) * -1)); }
      .dots i:nth-child(2) { background: ${M}; }
      .dots i:nth-child(3) { background: ${Y}; transform: translate(var(--d), calc(var(--d) * .5)); }
      .dots { margin-left: 6cqw; --d: 4cqw; animation: dots 3s ease-in-out infinite alternate; }
      @property --d { syntax: '<length>'; inherits: true; initial-value: 0px; }
      @keyframes dots { from { --d: 2.5cqw; } to { --d: 6cqw; } }
      .vf > .finder { color: var(--ink); }
      .scan { position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(0,0,0,.18) 0 1px, transparent 1px 4px); mix-blend-mode: multiply; }
      .slip-label { position: absolute; left: 7cqw; bottom: 9cqw; font: 2.6cqw var(--font-label); letter-spacing: .12em; text-transform: uppercase; color: #fff; }
    `,
    frames: (H) => [
      {
        label: 'Title card',
        note: 'The lens wanders across the headline. Three ink dots split and rejoin under it: a small motif that can also stand in for the logo dot.',
        html: `${finder()}
          <div class="vf-safe">
            <span class="label" style="font-size:2.6cqw">Sensoria Research · 01</span>
            <div style="margin-top:40cqw">${H.bt('div', 'vf-title', 'One light. Seven routes.')}</div>
            <div class="dots"><i></i><i></i><i></i></div>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Clean in the centre, split at the edges. A viewfinder and timecode make the camera part of the brand. Captions carry a slight cyan and magenta fringe.',
        html: `${lens(H.media('leo-1.jpg'), 'layer')}
          <div class="vf-ui">${finder()}<span class="rec">00:00:08:12</span></div>
          ${H.badge('Leo Christov-Moore', 'Sensoria Research')}
          ${H.cap('That shiver when the music lands')}`,
      },
      {
        label: 'Transition',
        note: 'Channel slip. Red, green and blue tear apart for a few frames while the shot changes, then snap back into register.',
        html: `${lens(H.media('brain.jpg'), 'layer heavy')}
          <div class="scan"></div>
          <span class="slip-label">Channel slip · 6 frames</span>`,
      },
    ],
  });
})();
