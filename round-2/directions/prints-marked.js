/* Round 2, F: E's image rules with D's marks on type. Teal prints by default, ligne claire when there is no photo,
   colour when colour is the point. Amber marks reach into the typography. Teal is allowed as a surface, once per
   page and never the main one: here the coordination section sits on the lit teal stage. */
(function () {
  const R = window.REFRACT, C = R.C, S = R.SPECTRUM, SL = R.SPECTRUM_LIGHT;
  const tag = (i, name) => `<span class="ctag" style="--c:${S[i]}"><i></i>0${i + 1} ${name}</span>`;

  const hero = (H) => `
    <div class="collage">
      ${R.print(H.media('dinner.jpg'), 'left:0;top:2%;width:66%;height:38%;--r:-2deg', 'duo', 'Community dinner', R.tape('left:8%;top:-3%;--r:-7deg'))}
      ${R.print(H.media('lc-desk.jpg'), 'left:40%;top:27%;width:60%;height:34%;--r:3deg', 'nat', 'Illustration')}
      ${R.print(H.media('lasers.jpg'), 'left:2%;top:55%;width:46%;height:40%;--r:-3deg', 'colour', tag(5, 'Technodelics'))}
      <img class="cutout" src="${H.media('jeremy-cutout.png')}" alt="" style="left:52%;top:62%;width:52%">
      ${R.circle('36%', '6%', '20%', '17%')}
      ${R.dots('46,14 62,36 26,62')}
    </div>`;

  window.DIRECTIONS.push(R.make({
    id: 'prints-marked',
    name: 'F · Prints, marked',
    lens: 'E’s rules + D’s marks on type',
    idea: 'E’s rules for images (teal prints by default, ligne claire when there is no photo, colour when colour is the point) with D’s amber marks reaching into the type. Teal is allowed as a surface, once per page and never the main one: here the coordination section sits on the lit teal stage.',
    hero: (H) => hero(H),
    heroClass: 'is-collage',
    slideArt: (H) => `<div class="collage">${R.print(H.media('lc-box.jpg'), 'left:4%;top:4%;width:90%;height:54%;--r:2deg', 'nat', '', R.tape('left:36%;top:-4%;--r:-3deg'))}${R.print(H.media('salon.jpg'), 'left:0;top:58%;width:76%;height:34%;--r:-3deg', 'duo')}${R.circle('20%', '10%', '40%', '36%')}</div>`,
    behaviors: [
      ['Images, by rule', 'Teal prints for people and events. Ligne claire when there is no photo. Natural colour, tagged with its state, when colour is the point. All arrive as prints.'],
      ['Marks on type', 'One amber mark per view, drawn by hand: an underline in a headline, a circle round a finding, a dotted thread through a list. Amber ink on paper, light amber on teal.'],
      ['Teal as a surface', 'Allowed once per page and in video grounds, lit from behind. Paper stays the main surface.'],
    ],
    defs: R.printKit.defs,
    css: R.printKit.css + `
      html { overflow-x: clip; }
      .hero-visual.is-collage, .slide-art { background: transparent; overflow: visible; }
      .ctag { display: inline-flex; align-items: center; gap: 5px; color: var(--c); }
      .ctag i { background: var(--c); }

      /* marks on type */
      .state-list { position: relative; }
      .state-list::before { content: ""; position: absolute; left: 73px; top: 34px; bottom: 34px; border-left: 2px dotted ${C.AMBER_INK}; }
      .state-chip { position: relative; z-index: 1; box-shadow: 0 0 0 4px var(--ground); }
      .stat-big { position: relative; display: inline-block; }

      /* the one teal section */
      .coord { position: relative; isolation: isolate; color: ${C.WHITE}; border-top: 0;
        --s1: ${SL[0]}; --s4: ${SL[3]}; --s7: ${SL[6]}; }
      .coord::before { content: ""; position: absolute; z-index: -2; inset: 0 calc(50% - 50vw);
        background: radial-gradient(ellipse 50% 80% at 30% 40%, #1F5D64 0%, #0A3238 55%, #05272B 100%); }
      .coord::after { content: ""; position: absolute; z-index: -1; inset: 0 calc(50% - 50vw); background: var(--grain); mix-blend-mode: soft-light; opacity: .55; }
      .coord .eyebrow, .coord .eyebrow .num, .coord .label { color: rgba(254,254,254,.7); }
      .coord .h2 em { color: rgba(254,254,254,.6); }
      .coord .body p { color: rgba(254,254,254,.86); }
      .coord .stat { border-top-color: rgba(254,254,254,.25); }
      .collab { border-top: 0; }

      .vf-title { color: ${C.WHITE}; }
      .vf-safe .label { font-size: 2.4cqw; }
      .vf .ctag { color: ${C.TEAL}; }
      .vf .cap .key { position: relative; }
      .vf .cap .key .mark-under { left: -4%; bottom: -.32em; height: .3em; width: 108%; }
      .vf .rule { position: absolute; left: 7cqw; right: 7cqw; top: 8cqw; z-index: 5; color: rgba(254,254,254,.75); font: 2.3cqw var(--font-label); letter-spacing: .12em; text-transform: uppercase; }
      .vf .rule b { position: relative; display: inline-block; font: 400 6.4cqw/1.02 var(--font-display); letter-spacing: -.03em; text-transform: none; color: ${C.WHITE}; margin-top: 1.6cqw; }
      .vf .rule b .mark-under { left: 0; bottom: -1.6cqw; width: 100%; height: 2.4cqw; }
    `,
    init: () => {
      const h1 = document.querySelector('.hero .display');
      if (h1) h1.insertAdjacentHTML('beforeend', R.underline('left:-.02em;bottom:-.1em;width:3.9em;height:.2em'));
      const unknown = document.querySelector('.stats .stat:nth-child(3) .stat-big');
      if (unknown) unknown.insertAdjacentHTML('beforeend', R.circle('-9%', '-26%', '118%', '150%', C.AMBER));
      const slide = document.querySelector('.slide .slide-title');
      if (slide) slide.insertAdjacentHTML('beforeend', R.underline('left:0;bottom:-.08em;width:3.9em;height:.2em'));
    },
    frames: (H) => [
      {
        label: 'Title card',
        note: 'A teal print on the lit ground, the headline with its faint fringe, and an amber underline drawing itself under the second line.',
        cls: 'ground on-dark',
        html: `${R.print(H.media('dinner.jpg'), 'left:8%;top:14%;width:84%;height:32%;--r:-2deg', 'duo', '', R.tape('left:10%;top:-4%;--r:-6deg'))}
          <div class="vf-safe">
            <span class="label">Sensoria Research</span>
            <div style="margin-top:auto;position:relative">${H.bt('div', 'vf-title', 'One light.<br>Seven routes.')}${R.underline('left:0;bottom:-2.4cqw;width:72%;height:3cqw', C.AMBER)}</div>
            <div style="margin-top:7cqw">${R.strip(SL)}</div>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Natural colour, light grade. The key word gets a hand-drawn amber underline.',
        html: R.speaker(H, { cap: H.cap(`That shiver when the music <span class="key">lands${R.underline('', C.AMBER)}</span>`) }),
      },
      {
        label: 'No photo: illustration',
        note: 'An idea with no photo becomes a ligne claire illustration, arriving as a print with an amber circle.',
        cls: 'ground on-dark',
        html: `<div class="rule">When there is no photo<br><b>Illustrate the idea${R.underline('', C.AMBER)}</b></div>
          ${R.print(H.media('lc-lab.jpg'), 'left:5%;top:30%;width:90%;height:36%;--r:2deg', 'nat')}
          ${R.circle('34%', '38%', '34%', '16%', C.AMBER)}
          <img class="cutout" src="${H.media('jeremy-cutout.png')}" alt="" style="left:28%;top:62%;width:76%">`,
      },
      {
        label: 'Colour is the point',
        note: 'A light installation keeps its colour and its spectrum tag, beside the teal prints of the same evening.',
        cls: 'ground on-dark',
        html: `<div class="rule">When colour is the point<br><b>Keep the colour${R.underline('', C.AMBER)}</b></div>
          ${R.print(H.media('blindfold-dinner.jpg'), 'left:4%;top:30%;width:62%;height:24%;--r:-3deg', 'duo')}
          ${R.print(H.media('installation.jpg'), 'left:26%;top:46%;width:70%;height:38%;--r:2.5deg', 'colour', tag(5, 'Technodelics'))}
          ${R.dots('30,44 54,58', C.AMBER)}`,
      },
    ],
  }));
})();
