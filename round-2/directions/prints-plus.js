/* Round 2, D: A pushed further. The explainer's lit deep-teal stage comes onto the site for the hero, the
   collage becomes a research board (prints, tape, paper slips, a cut-out), and amber marks start touching the
   type itself: an underline in the headline, a circle round a stat, a dotted thread through the states list. */
(function () {
  const R = window.REFRACT, C = R.C, SL = R.SPECTRUM_LIGHT;

  const nodes = (pts, color = C.AMBER) => `
    <svg class="mark-dots" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style="z-index:4">
      <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.6" stroke-dasharray="0.1 5" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    </svg>
    ${pts.split(' ').map((p) => { const [x, y] = p.split(','); return `<i class="node" style="left:${x}%;top:${y}%"></i>`; }).join('')}`;

  const hero = (H) => `
    <div class="collage board">
      ${R.print(H.media('dinner.jpg'), 'left:-8%;top:0;width:80%;height:42%;--r:-3deg', 'duo', 'Community dinner', R.tape('left:6%;top:-3%;--r:-8deg') + R.tape('right:4%;top:-3%;--r:6deg'))}
      ${R.print(H.media('brain-nihonga.jpg'), 'left:54%;top:22%;width:50%;height:36%;--r:4deg', 'nat', 'Painting · AI', R.tape('left:38%;top:-4%;--r:2deg'))}
      ${R.print(H.media('salon.jpg'), 'left:-2%;top:47%;width:48%;height:28%;--r:-1.5deg', 'duo', 'Salon')}
      <img class="cutout" src="${H.media('jeremy-cutout.png')}" alt="" style="left:38%;top:56%;width:68%;z-index:3">
      ${R.circle('42%', '5%', '18%', '15%', C.AMBER)}
      ${nodes('51,13 74,34 22,58')}
      ${R.slip('The self, mapped', 'left:2%;top:84%;--r:-2deg', SL[0])}
      ${R.arrow('left:16%;top:64%;width:38%;height:22%', C.AMBER)}
    </div>`;

  window.DIRECTIONS.push(R.make({
    id: 'prints-plus',
    name: 'D · Prints, pushed',
    lens: 'A, pushed further',
    idea: 'What A looks like with the volume up. The explainer’s lit deep-teal stage comes onto the site for the hero, the collage becomes a research board (prints, tape, paper slips, a cut-out), and amber marks start touching the type: a headline underline, a circle round a finding, a dotted thread through the list.',
    hero: (H) => hero(H),
    heroClass: 'is-collage',
    slideArt: (H) => `<div class="collage">${R.print(H.media('brain-nihonga.jpg'), 'left:4%;top:4%;width:90%;height:56%;--r:2.5deg', 'nat', '', R.tape('left:36%;top:-4%;--r:-3deg'))}${R.print(H.media('salon.jpg'), 'left:0;top:58%;width:76%;height:34%;--r:-3deg', 'duo')}${R.circle('38%', '16%', '42%', '26%')}${R.slip('Fig. 2', 'left:62%;top:86%;--r:3deg')}</div>`,
    behaviors: [
      ['Stage', 'The hero sits on the explainer’s deep teal ground, lit from behind. Teal returns as a surface for this one moment only; the rest of the page stays on paper.'],
      ['Research board', 'Prints are taped down, labelled with paper slips and joined by dotted threads with amber nodes. A cut-out person stands in front of the evidence.'],
      ['Marks on type', 'Amber marks reach into the typography: a hand-drawn underline in the headline, a circle round the key finding, a dotted thread linking the seven states.'],
    ],
    defs: R.printKit.defs,
    css: R.printKit.css + `
      html { overflow-x: clip; }
      .hero { position: relative; isolation: isolate; color: ${C.WHITE}; padding-bottom: 120px; }
      .hero::before {
        content: ""; position: absolute; z-index: -2; top: 0; bottom: 0; left: calc(50% - 50vw); right: calc(50% - 50vw);
        background: radial-gradient(ellipse 45% 75% at 74% 52%, #1F5D64 0%, #0A3238 52%, #05272B 100%);
      }
      .hero::after { content: ""; position: absolute; z-index: -1; top: 0; bottom: 0; left: calc(50% - 50vw); right: calc(50% - 50vw); background: var(--grain); mix-blend-mode: soft-light; opacity: .55; }
      .site-head { border-bottom: 0; }
      .hero .eyebrow, .hero .eyebrow .num { color: rgba(254,254,254,.72); }
      .hero .lead { color: rgba(254,254,254,.86); }
      .hero .btn-primary { background: ${C.AMBER}; color: ${C.TEAL}; }
      .hero .btn-quiet { background: transparent; color: ${C.WHITE}; box-shadow: inset 0 0 0 1px rgba(254,254,254,.4); }
      .hero .btn:focus-visible { outline-color: ${C.AMBER}; }
      .hero-visual.is-collage, .slide-art { background: transparent; overflow: visible; }
      .board .node { position: absolute; z-index: 4; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: ${C.AMBER}; box-shadow: 0 0 0 3px rgba(255,210,141,.25); }

      .state-list { position: relative; }
      .state-list::before { content: ""; position: absolute; left: 73px; top: 34px; bottom: 34px; border-left: 2px dotted ${C.AMBER_INK}; }
      .state-chip { position: relative; z-index: 1; box-shadow: 0 0 0 4px var(--ground); }
      .stat-big { position: relative; display: inline-block; }

      .vf-title { color: ${C.WHITE}; }
      .vf-safe .label { font-size: 2.4cqw; }
      .vf .cap .key { position: relative; color: ${C.WHITE}; }
      .vf .cap .key .mark-under { left: -4%; right: -4%; bottom: -.32em; height: .3em; width: 108%; }
      .vf .node { position: absolute; z-index: 4; width: 2.4cqw; height: 2.4cqw; margin: -1.2cqw 0 0 -1.2cqw; border-radius: 50%; background: ${C.AMBER}; box-shadow: 0 0 0 1cqw rgba(255,210,141,.22); }
      .vf .board-title { position: absolute; left: 7cqw; right: 7cqw; top: 8cqw; font: 400 7cqw/1 var(--font-display); letter-spacing: -.03em; color: ${C.WHITE}; z-index: 5; }
      .vf .sliding { animation: slideOff 3s cubic-bezier(.6,0,.2,1) infinite alternate; }
      @keyframes slideOff { from { transform: translateX(0) rotate(-2deg); } to { transform: translateX(46%) rotate(6deg); } }
    `,
    init: () => {
      // amber marks that touch the type: underline the headline's last line, circle the key finding
      const h1 = document.querySelector('.hero .display');
      if (h1) h1.insertAdjacentHTML('beforeend', R.underline('left:-.02em;bottom:-.1em;width:3.9em;height:.2em', C.AMBER));
      const unknown = document.querySelector('.stats .stat:nth-child(3) .stat-big');
      if (unknown) unknown.insertAdjacentHTML('beforeend', R.circle('-9%', '-26%', '118%', '150%'));
    },
    frames: (H) => [
      {
        label: 'Title card',
        note: 'Prints drop onto the lit teal ground and get taped down; the cut-out arrives last. An amber underline draws itself under the second line.',
        cls: 'ground on-dark',
        html: `${R.print(H.media('dinner.jpg'), 'left:4%;top:12%;width:76%;height:26%;--r:-4deg', 'duo', '', R.tape('left:8%;top:-5%;--r:-6deg'))}
          ${R.print(H.media('salon.jpg'), 'left:34%;top:28%;width:60%;height:22%;--r:3deg', 'duo', '', R.tape('right:10%;top:-6%;--r:5deg'))}
          <img class="cutout" src="${H.media('jeremy-cutout.png')}" alt="" style="left:-6%;top:38%;width:62%;z-index:3">
          <div class="vf-safe" style="z-index:5">
            <span class="label">Sensoria Research</span>
            <div style="margin-top:auto;position:relative">${H.bt('div', 'vf-title', 'One light.<br>Seven routes.')}${R.underline('left:0;bottom:-2.4cqw;width:72%;height:3cqw', C.AMBER)}</div>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Natural colour, light grade. The key word gets a hand-drawn amber underline instead of a colour change.',
        html: R.speaker(H, { cap: H.cap(`That shiver when the music <span class="key">lands${R.underline('', C.AMBER)}</span>`) }),
      },
      {
        label: 'Research board',
        note: 'Five prints pinned to the ground, labelled with paper slips in the spectrum colours of the states they show, joined by dotted threads with amber nodes.',
        cls: 'ground on-dark',
        html: `<div class="board-title">Seven routes,<br>one map</div>
          ${R.print(H.media('blindfold-dinner.jpg'), 'left:4%;top:24%;width:54%;height:20%;--r:-3deg', 'duo')}
          ${R.print(H.media('immersive.jpg'), 'left:50%;top:30%;width:46%;height:18%;--r:4deg', 'duo')}
          ${R.print(H.media('brain-nihonga.jpg'), 'left:18%;top:50%;width:52%;height:20%;--r:1.5deg', 'nat')}
          ${R.print(H.media('lasers.jpg'), 'left:6%;top:73%;width:42%;height:16%;--r:-2deg', 'duo')}
          ${R.print(H.media('sunrise.jpg'), 'left:54%;top:70%;width:42%;height:16%;--r:3deg', 'duo')}
          ${nodes('30,36 72,40 44,60 26,80 75,78')}
          ${R.slip('04 Aesthetic', 'left:6%;top:41%;--r:-3deg', SL[3])}
          ${R.slip('06 Technodelics', 'left:52%;top:46%;--r:2deg', SL[5])}
          ${R.slip('01 Dreaming', 'left:56%;top:86%;--r:-2deg', SL[0])}`,
      },
      {
        label: 'Transition',
        note: 'Print slide: the top print is pulled off the board, revealing the next one already taped underneath.',
        cls: 'ground on-dark',
        html: `${R.print(H.media('sunrise.jpg'), 'left:8%;top:18%;width:84%;height:52%;--r:1.5deg', 'duo', '', R.tape('left:40%;top:-3%;--r:-2deg'))}
          <div class="sliding" style="position:absolute;left:6%;top:16%;width:84%;height:54%">${R.print(H.media('immersive.jpg'), 'inset:0;--r:0deg', 'duo')}</div>
          <span class="frame-label">Print slide · 10 frames</span>`,
      },
    ],
  }));
})();
