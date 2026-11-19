/* Direction: Refract teal. Sensoria's current teal and amber, moved off the surface: warm paper and white
   carry the page, deep teal is the ink. Headlines get a very faint aberration in brand colours (turquoise one
   side, amber the other) that swings around with the cursor like light around a lens. */
(function () {
  const SURFACE = '#F2ECE2', WHITE = '#FEFEFE', TEAL = '#05272B', TEAL700 = '#1A5259';
  const TURQ = '#40E0D0', AMBER = '#FFD28D';
  const FT = 'rgba(44,199,184,.9)', FA = 'rgba(242,180,96,.95)'; // fringe tones, a step deeper so they read on paper
  const SPECTRUM = ['#0A3238', TEAL700, '#2A7F7A', '#279E92', '#E9B567', '#D4943E', '#B9722F'];

  const img = (src, cls = '', style = '') =>
    `<div class="rt-img ${cls}" style="${style}"><img class="f-a" src="${src}" alt=""><img class="f-t" src="${src}" alt=""><img class="duo" src="${src}" alt=""></div>`;

  const hero = (H, caption = true) => `
    <div class="rt-mat">
      ${img(H.media('brain.jpg'), 'rt-in', '--lift:1.1')}
      ${caption ? '<span class="rt-cap">Fig. 1 · Duotone, teal on paper, with a turquoise and amber fringe</span>' : ''}
    </div>`;

  window.DIRECTIONS.push({
    id: 'refract-teal',
    name: 'Refract teal',
    lens: 'Current palette, warmed',
    idea: 'Sensoria’s existing teal, amber and turquoise, with the teal moved off the surface. Warm paper and white carry the page and deep teal is the ink. Light bends faintly at the edges of things, in brand colours instead of the usual red and blue.',
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
      ['Blur mask', 'Headlines are crisp near the cursor and a touch softer away from it. A hairline fringe, turquoise on one side and amber on the other, turns to point at the cursor.'],
      ['Images', 'Photos become teal-on-paper duotones. A turquoise and an amber copy sit a fraction out of register underneath, so edges carry a faint fringe. White mats frame them.'],
      ['Motion', 'Cuts are refraction slips: the fringe widens for a few frames as the shot changes, then settles.'],
    ],
    hero: (H) => hero(H),
    slideArt: (H) => hero(H, false),
    defs: `
      <filter id="rt-duo" color-interpolation-filters="sRGB">
        <feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer>
          <feFuncR type="table" tableValues=".02 .1 .949"/>
          <feFuncG type="table" tableValues=".153 .32 .925"/>
          <feFuncB type="table" tableValues=".169 .35 .886"/>
        </feComponentTransfer>
      </filter>
      <filter id="rt-turq" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 .17  0 0 0 0 .78  0 0 0 0 .72  -.33 -.33 -.34 0 1"/></filter>
      <filter id="rt-amber" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 .95  0 0 0 0 .70  0 0 0 0 .38  -.33 -.33 -.34 0 1"/></filter>`,
    css: `
      /* blur mask + a fringe that always points at the cursor */
      .bt {
        --len: max(hypot(var(--nx, 0), var(--ny, 0)), .2);
        --fx: calc(var(--nx, 0) / var(--len) * .018em);
        --fy: calc(var(--ny, 0) / var(--len) * .018em);
      }
      .bt-soft {
        color: transparent;
        text-shadow: var(--fx) var(--fy) .02em ${FT}, calc(var(--fx) * -1) calc(var(--fy) * -1) .02em ${FA}, 0 0 .045em rgba(5,39,43,.45);
      }
      .bt-sharp {
        --m: radial-gradient(ellipse 34% 90% at var(--mx) var(--my), #000 30%, rgba(0,0,0,.76) 100%);
        -webkit-mask-image: var(--m); mask-image: var(--m);
      }
      .state-chip { width: 10px; height: 10px; box-shadow: -1.5px 0 0 ${FT}, 1.5px 0 0 ${FA}; }
      .slide-states .state-chip { width: 1.3cqw; height: 1.3cqw; }
      .hero-visual, .slide-art { background: ${WHITE}; box-shadow: 0 1px 0 var(--line-strong); }
      .btn-quiet { box-shadow: inset 0 0 0 1px var(--line-strong); background: ${WHITE}; }
      .slide { background: var(--ground); }

      .rt-img { position: absolute; inset: 0; overflow: hidden; background: ${SURFACE}; isolation: isolate; --fr: .5%; }
      .rt-img img { position: absolute; inset: -2%; width: 104%; height: 104%; object-fit: cover; mix-blend-mode: multiply; }
      .rt-img .f-t { filter: brightness(var(--lift, 1.1)) url(#rt-turq); transform: translate(calc(var(--fr) * -1), calc(var(--fr) * -.3)); opacity: .85; }
      .rt-img .f-a { filter: brightness(var(--lift, 1.1)) url(#rt-amber); transform: translate(var(--fr), calc(var(--fr) * .3)); opacity: .9; }
      .rt-img .duo { filter: brightness(var(--lift, 1.1)) url(#rt-duo); }
      .rt-mat { position: absolute; inset: 0; background: ${WHITE}; }
      .rt-mat .rt-in { inset: 7% 7% 15% 7%; }
      .rt-cap { position: absolute; left: 7%; right: 7%; bottom: 5.5%; font: 10px/1.4 var(--font-label); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-2); }

      .vf .cap { color: ${WHITE}; font-weight: 500; text-shadow: -.04em 0 0 ${FT}, .04em 0 0 ${FA}; }
      .vf .badge { background: ${WHITE}; color: ${TEAL}; padding: 2.4cqw 3cqw; border-radius: 3px; }
      .vf .badge span { color: var(--ink-2); }
      .vf-ring { position: relative; flex: 1; display: grid; place-items: center; }
      .vf-ring i { position: absolute; width: 52cqw; height: 52cqw; border-radius: 50%; border: 1.5px solid; }
      .vf-ring i:nth-child(1) { border-color: ${FT}; translate: -1.2cqw 0; }
      .vf-ring i:nth-child(2) { border-color: ${FA}; translate: 1.2cqw 0; }
      .vf-ring i:nth-child(3) { border-color: ${TEAL}; }
      .vf-ring b { position: absolute; width: 30cqw; height: 30cqw; border-radius: 50%; border: 1px solid var(--line-strong); }
      .vf-strip { display: grid; grid-template-columns: repeat(7, 1fr); height: 1.2cqw; margin-top: 6cqw; }
      .vf-strip i { background: var(--c); }
      .slip-label { position: absolute; left: 7cqw; bottom: 9cqw; font: 2.4cqw var(--font-label); letter-spacing: .14em; text-transform: uppercase; color: ${TEAL}; background: ${WHITE}; padding: .6cqw 1.4cqw; }
    `,
    frames: (H) => [
      {
        label: 'Title card',
        note: 'A lens ring drawn three times: teal, with turquoise and amber copies a hair out of register. The headline’s fringe turns slowly as the focus point drifts.',
        cls: 'grain',
        html: `<div class="vf-safe">
            <span class="label" style="font-size:2.4cqw">Sensoria Research</span>
            <div class="vf-ring"><i></i><i></i><i></i><b></b></div>
            ${H.bt('div', 'vf-title', 'One light.<br>Seven routes.')}
            <div class="vf-strip">${SPECTRUM.map((c) => `<i style="--c:${c}"></i>`).join('')}</div>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Footage as a teal duotone with a faint turquoise and amber fringe at the edges. White badge, white captions with the same hairline fringe.',
        cls: 'grain',
        html: `${img(H.media('leo-1.jpg'), 'layer', '--lift:1.9;--fr:.7%')}
          ${H.badge('Leo Christov-Moore', 'Sensoria Research')}
          ${H.cap('That shiver when the music lands')}`,
      },
      {
        label: 'Transition',
        note: 'Refraction slip: for a few frames the fringe widens until the shot doubles in turquoise and amber, then it settles on the next shot.',
        cls: 'grain',
        html: `${img(H.media('brain.jpg'), 'layer', '--lift:1.15;--fr:3.2%')}
          <span class="slip-label">Refraction slip · 8 frames</span>`,
      },
    ],
  });
})();
