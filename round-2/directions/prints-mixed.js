/* Round 2, E: A as the system, with B and C on occasion. Teal prints are the default. Two exceptions, each with
   a reason: a ligne claire illustration when there is no photo (an idea, the future, a composite), and a colour
   photo when the colour is the point (an installation, a light room). Both still arrive as prints. */
(function () {
  const R = window.REFRACT, C = R.C, S = R.SPECTRUM, SL = R.SPECTRUM_LIGHT;

  const tagCap = (i, name) => `<span class="ctag" style="--c:${S[i]}"><i></i>0${i + 1} ${name}</span>`;

  const hero = (H) => `
    <div class="collage">
      ${R.print(H.media('dinner.jpg'), 'left:0;top:2%;width:66%;height:38%;--r:-2deg', 'duo', 'Community dinner')}
      ${R.print(H.media('lc-desk.jpg'), 'left:40%;top:27%;width:60%;height:34%;--r:3deg', 'nat', 'Illustration')}
      ${R.print(H.media('lasers.jpg'), 'left:2%;top:55%;width:46%;height:40%;--r:-3deg', 'colour', tagCap(5, 'Technodelics'))}
      <img class="cutout" src="${H.media('jeremy-cutout.png')}" alt="" style="left:52%;top:62%;width:52%">
      ${R.circle('36%', '6%', '20%', '17%')}
      ${R.dots('46,14 62,36 26,62')}
    </div>`;

  window.DIRECTIONS.push(R.make({
    id: 'prints-mixed',
    name: 'E · Prints, mixed',
    lens: 'A, with B and C on occasion',
    idea: 'A is the system: photos become teal prints, people are cut out, amber marks point. Two exceptions, each with a reason. When there is no photo (an idea, the future, a composite), a ligne claire illustration. When the colour is the point (a light installation, an immersive room), a colour photo. Both still arrive as prints, so the page stays one family.',
    hero: (H) => hero(H),
    heroClass: 'is-collage',
    slideArt: (H) => `<div class="collage">${R.print(H.media('lc-box.jpg'), 'left:4%;top:4%;width:90%;height:54%;--r:2deg', 'nat')}${R.print(H.media('salon.jpg'), 'left:0;top:58%;width:76%;height:34%;--r:-3deg', 'duo')}${R.circle('20%', '10%', '40%', '36%')}</div>`,
    behaviors: [
      ['Default: teal print', 'Real photos of people and events become teal duotone prints with white borders. People are cut out. One amber mark per frame.'],
      ['When there is no photo', 'Ideas, mechanisms, futures and composites use a ligne claire illustration in its own colour, still as a print, still marked in amber.'],
      ['When colour is the point', 'Light installations, immersive rooms and other moments where colour is the experience stay in natural colour, tagged with the spectrum colour of their state. Roughly one in five images.'],
    ],
    defs: R.printKit.defs,
    css: R.printKit.css + `
      .hero-visual.is-collage, .slide-art { background: transparent; overflow: visible; }
      .ctag { display: inline-flex; align-items: center; gap: 5px; color: var(--c); }
      .ctag i { background: var(--c); }
      .vf-title { color: ${C.WHITE}; }
      .vf-safe .label { font-size: 2.4cqw; }
      .vf .ctag { color: ${C.TEAL}; }
      .vf .rule { position: absolute; left: 7cqw; right: 7cqw; top: 8cqw; z-index: 5; color: rgba(254,254,254,.75); font: 2.3cqw var(--font-label); letter-spacing: .12em; text-transform: uppercase; }
      .vf .rule b { display: block; font: 400 6.4cqw/1.02 var(--font-display); letter-spacing: -.03em; text-transform: none; color: ${C.WHITE}; margin-top: 1.6cqw; }
    `,
    frames: (H) => [
      {
        label: 'Title card · A',
        note: 'The default: a teal print on the lit ground, the headline with its faint fringe, the light spectrum under it.',
        cls: 'ground on-dark',
        html: `${R.print(H.media('dinner.jpg'), 'left:8%;top:14%;width:84%;height:32%;--r:-2deg', 'duo')}
          ${R.circle('50%', '18%', '24%', '13%', C.AMBER)}
          <div class="vf-safe">
            <span class="label">Sensoria Research</span>
            <div style="margin-top:auto">${H.bt('div', 'vf-title', 'One light.<br>Seven routes.')}</div>
            <div style="margin-top:6cqw">${R.strip(SL)}</div>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Natural colour, light grade, amber key word. The same in every option.',
        html: R.speaker(H),
      },
      {
        label: 'Occasionally B · no photo',
        note: 'An idea with no photo behind it becomes a ligne claire illustration, but it still arrives as a print with an amber mark, so it belongs to the same family.',
        cls: 'ground on-dark',
        html: `<div class="rule">When there is no photo<b>Illustrate the idea</b></div>
          ${R.print(H.media('lc-lab.jpg'), 'left:5%;top:30%;width:90%;height:36%;--r:2deg', 'nat')}
          ${R.circle('34%', '38%', '34%', '16%', C.AMBER)}
          <img class="cutout" src="${H.media('jeremy-cutout.png')}" alt="" style="left:28%;top:62%;width:76%">`,
      },
      {
        label: 'Occasionally C · colour is the point',
        note: 'A light installation keeps its colour and gets the spectrum tag of its state, beside the teal prints of the same evening. Colour reads as an event.',
        cls: 'ground on-dark',
        html: `<div class="rule">When colour is the point<b>Keep the colour</b></div>
          ${R.print(H.media('blindfold-dinner.jpg'), 'left:4%;top:30%;width:62%;height:24%;--r:-3deg', 'duo')}
          ${R.print(H.media('installation.jpg'), 'left:26%;top:46%;width:70%;height:38%;--r:2.5deg', 'colour', tagCap(5, 'Technodelics'))}
          ${R.dots('30,44 54,58')}`,
      },
    ],
  }));
})();
