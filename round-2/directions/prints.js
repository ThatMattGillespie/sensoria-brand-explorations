/* Round 2, A: Prints & cutouts. The image language of the Jeremy explainer (teal prints with paper borders,
   cut-out people, an amber hand-drawn circle and dotted connectors) carried onto the warm paper site. */
(function () {
  const R = window.REFRACT, C = R.C;

  const print = (src, style, cls = '', label = '') =>
    `<figure class="print ${cls}" style="${style}"><img src="${src}" alt="">${label ? `<figcaption>${label}</figcaption>` : ''}</figure>`;

  const hero = (H) => `
    <div class="collage">
      ${print(H.media('dinner.jpg'), 'left:3%;top:5%;width:80%;height:50%;--r:-2.2deg', 'duo', 'Community dinner')}
      ${print(H.media('brain-nihonga.jpg'), 'left:44%;top:49%;width:52%;height:40%;--r:2.6deg', 'nat')}
      <img class="cutout" src="${H.media('jeremy-cutout.png')}" alt="" style="left:-2%;bottom:3%;width:58%">
      ${R.circle('53%', '9%', '20%', '19%')}
      ${R.dots('64,28 70,44 66,58 70,64')}
    </div>`;

  window.DIRECTIONS.push(R.make({
    id: 'prints',
    name: 'A · Prints & cutouts',
    lens: 'From the Jeremy explainer',
    idea: 'The image language from the Jeremy explainer, carried onto the paper site: photos become teal prints with white borders, people are cut out, and one amber hand-drawn mark points at what matters. Teal moves into the photos instead of the surface.',
    hero: (H) => hero(H),
    heroClass: 'is-collage',
    slideArt: (H) => `<div class="collage">${print(H.media('brain-nihonga.jpg'), 'left:6%;top:8%;width:88%;height:60%;--r:2deg', 'nat')}${print(H.media('salon.jpg'), 'left:4%;top:60%;width:70%;height:32%;--r:-3deg', 'duo')}${R.circle('40%', '18%', '40%', '28%')}</div>`,
    behaviors: [
      ['Images', 'Photos printed in a teal duotone with a white paper border, set at a slight angle with a soft shadow. Paintings and illustrations stay in their own colour, also as prints.'],
      ['Cutouts', 'People are cut out with a pale outline and laid over prints, as in the Jeremy video. In video they sit on a deep teal ground lit from behind.'],
      ['Accent marks', 'One amber colour for marks only: a hand-drawn circle that draws itself in, and dotted lines that connect people or ideas.'],
    ],
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
      .hero-visual.is-collage, .slide-art { background: transparent; overflow: visible; }
      .collage { position: absolute; inset: 0; }
      .print {
        position: absolute; margin: 0; background: ${C.WHITE};
        padding: 2.2% 2.2% 6.5%; transform: rotate(var(--r, 0deg));
        box-shadow: 0 14px 30px -14px rgba(5,39,43,.5), 0 1px 2px rgba(5,39,43,.18);
      }
      .print img { width: 100%; height: 100%; object-fit: cover; }
      .print.duo img { filter: brightness(1.35) url(#r2-duo); }
      .print.nat img { filter: saturate(.95); }
      .print figcaption { position: absolute; left: 4%; bottom: 1.6%; font: 10px var(--font-label); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-2); }
      .cutout { position: absolute; filter: drop-shadow(0 12px 18px rgba(5,39,43,.35)); }
      .slide-art .print figcaption { font-size: 1.1cqw; }

      .vf .print { padding: 2.4% 2.4% 6%; }
      .vf .print figcaption { font-size: 2cqw; }
      .vf-title { color: ${C.WHITE}; }
      .vf-safe .label { font-size: 2.4cqw; }
      .vf .sink { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(5,39,43,.82) 0%, rgba(5,39,43,.35) 45%, rgba(5,39,43,.7) 100%); }
      .vf .net circle { fill: ${C.AMBER}; }
      .vf .tiny { position: absolute; left: 0; right: 0; bottom: 18cqw; text-align: center; font: 500 3.6cqw var(--font-text); color: ${C.WHITE}; }
      .vf .build { position: absolute; left: 7cqw; right: 7cqw; top: 14cqw; font: 400 8.6cqw/1.02 var(--font-display); letter-spacing: -.03em; color: ${C.WHITE}; }
      .vf .build em { font-style: normal; color: ${C.AMBER}; }
      .vf .build span { opacity: .35; }
    `,
    frames: (H) => [
      {
        label: 'Title card',
        note: 'Deep teal ground lit from behind, as in the video house look. A print drops in at an angle; the headline carries the faint turquoise and amber fringe; the light spectrum runs underneath.',
        cls: 'ground on-dark',
        html: `${print(H.media('dinner.jpg'), 'left:9%;top:16%;width:82%;height:30%;--r:-2deg', 'duo')}
          <div class="vf-safe">
            <span class="label">Sensoria Research</span>
            <div style="margin-top:auto">${H.bt('div', 'vf-title', 'One light.<br>Seven routes.')}</div>
            <div style="margin-top:6cqw">${R.strip(R.SPECTRUM_LIGHT)}</div>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Natural colour with only a light matte grade and a soft teal vignette. The one key word in the caption takes the amber accent.',
        html: R.speaker(H),
      },
      {
        label: 'Archive: print and cutout',
        note: 'A real photo as a teal print, a person cut out and laid over it, and an amber circle drawing itself around a detail. Tiny captions, one phrase at a time.',
        cls: 'ground on-dark',
        html: `${print(H.media('dinner.jpg'), 'left:5%;top:14%;width:90%;height:40%;--r:-2.5deg', 'duo', 'Community dinner')}
          <img class="cutout" src="${H.media('jeremy-cutout.png')}" alt="" style="left:18%;top:50%;width:82%">
          ${R.circle('52%', '16%', '26%', '15%', C.AMBER)}
          <div class="tiny">builds</div>`,
      },
      {
        label: 'Type over archive',
        note: 'The sentence builds word by word over a darkened print, with the key word in amber. Dotted amber lines join people at the table: coordination made visible.',
        html: `<img class="layer" src="${H.media('dinner.jpg')}" alt="" style="object-fit:cover;filter:brightness(1.3) url(#r2-duo)">
          <div class="sink"></div>
          <svg class="layer net" viewBox="0 0 360 640" preserveAspectRatio="none" aria-hidden="true">
            <polyline points="40,420 120,392 196,404 262,372 330,398" fill="none" stroke="${C.AMBER}" stroke-width="1.4" stroke-dasharray="1 6" stroke-linecap="round"/>
            <polyline points="120,392 170,330 262,372" fill="none" stroke="${C.AMBER}" stroke-width="1.4" stroke-dasharray="1 6" stroke-linecap="round"/>
            <circle cx="40" cy="420" r="4"/><circle cx="120" cy="392" r="4"/><circle cx="196" cy="404" r="4"/><circle cx="262" cy="372" r="4"/><circle cx="330" cy="398" r="4"/><circle cx="170" cy="330" r="4"/>
          </svg>
          <div class="build">Many already practice. Few in a <em>coordinated</em> <span>way.</span></div>`,
      },
    ],
  }));
})();
