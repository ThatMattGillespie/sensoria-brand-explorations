/* Final: the consolidated landing page mock-up.
   Base: round 4's 1A (layered hero collage, objects in headlines, sticker list, Jeremy over the teal section).
   Added: 3C's scroll movement in the hero planes, 4D's sticker hover, and a few of 2B's margin stickers,
   each placed for a reason (see the guide's "Stickers in the margin" section). */
(function () {
  const R = window.REFRACT, C = R.C;

  const hero = (H) => R.planes([
    [-1, R.print(H.media('immersive.jpg'), 'left:8%;top:0;width:90%;height:52%;--r:2deg', 'duo')],
    [0, R.cut('brain', 'left:-6%;top:26%;width:66%', 'cream') + R.print(H.media('dinner.jpg'), 'left:42%;top:44%;width:62%;height:30%;--r:-3deg', 'duo', 'Community dinner')],
    [1, R.cut('tubes', 'left:6%;top:58%;width:24%') + R.cut('goggles', 'left:50%;top:18%;width:46%')],
    [2, R.cut('vr', 'left:44%;top:56%;width:30%')],
  ]);

  // the margin stickers on this page and why each is where it is (the guide lists them from here)
  R.MARGIN = [
    ['vr', 'Technodelics', 'In the right margin beside the Technodelics row: the person in VR is the state, standing next to its name. Leans in when you point at the row.'],
    ['jeremy', 'Coordination', 'Looking over the top of the teal section about practice kept private: a researcher peeking out from behind it. Rises when you point at him.'],
    ['walker', 'Stats', 'Walking along the stats rule toward “Unknown”. Takes a step when you point at him.'],
  ];

  window.DIRECTIONS.push(R.make({
    id: 'final',
    name: 'Refract: paper, teal and stickers',
    lens: 'Final',
    idea: 'One brand from round 4. The base is 1A: a layered collage that moves with the cursor and the scroll (3C), one small object per headline, a sticker for each state that grows when you point at it (4D), and a few figures in the margins, each placed beside the idea it belongs to (2B, edited down). Type is two-colour: deep teal on paper, white on teal.',
    hero, heroClass: 'is-collage',
    slideArt: (H) => `<div class="collage kit">${R.print(H.media('salon.jpg'), 'left:0;top:6%;width:100%;height:70%;--r:2deg', 'duo')}${R.cut('goggles', 'left:4%;top:18%;width:62%;--r:-6deg')}${R.cut('flask', 'left:56%;top:40%;width:38%;--r:5deg')}${R.cut('tubes', 'left:10%;top:56%;width:30%;--r:-2deg')}${R.cut('walker', 'left:44%;top:60%;width:16%')}</div>`,
    behaviors: [],
    defs: R.printKit.defs,
    css: R.kit + `
      .site { overflow-x: clip; } /* margin stickers lean in from the screen edge; never a sideways scroll */
      /* sticker hover (from 4D): a quick spring, off under reduced motion */
      .state-obj { transition: transform .28s cubic-bezier(.3,1.5,.5,1); }
      .state-list li:hover .state-obj { transform: scale(1.7) rotate(-6deg); }

      /* margin stickers respond too: each one moves the way its figure would */
      .mgn { pointer-events: auto; transition: transform .35s cubic-bezier(.3,1.5,.5,1); }
      .mgn-vr { position: absolute; right: calc(50% - 50vw - 34px); top: 50%; width: 132px; translate: 0 -50%; transform-origin: 80% 90%; }
      .state-list li:hover .mgn-vr, .mgn-vr:hover { transform: rotate(-7deg) translateX(-14px); }
      .peek { pointer-events: auto; clip-path: inset(-60px -40px 0 -40px); }
      .peek .cut { transition: transform .4s cubic-bezier(.3,1.5,.5,1); }
      .peek:hover .cut { transform: translateY(-16px); }
      .mgn-walk { left: 58%; top: -75px; height: 74px; width: auto; }
      .mgn-walk:hover { transform: translateX(16px) rotate(2deg); }
      @media (max-width: 1320px) { .mgn-vr { display: none; } }
      @media (prefers-reduced-motion: reduce) { .state-obj, .mgn, .peek .cut { transition: none; transform: none !important; } }
    `,
    init: () => {
      R.rebus('.hero .display .bt-layer', 'Non-ordinary', 'goggles');
      R.rebus('.section-head .bt .bt-layer', 'just', 'headphones');
      R.rebus('.slide:first-child .slide-title .bt-layer', 'states', 'brain');
      R.stateObjects();
      const techno = document.querySelector('.state-list li:nth-child(6)');
      if (techno) { techno.style.position = 'relative'; techno.insertAdjacentHTML('beforeend', R.cut('vr', '', 'stk mgn mgn-vr')); }
      R.peek('.coord', 'jeremy', 'right:8%;width:150px;height:104px', 'cream');
      R.sticker('.stats', 'walker', '', 'sm mgn mgn-walk');
      R.parallax({ scroll: true });
    },
    frames: (H) => [
      R.fr.title(H, `<div class="planes" style="position:absolute;inset:0">
          ${R.plane(-1, R.print(H.media('immersive.jpg'), 'left:6%;top:8%;width:88%;height:30%;--r:-1.5deg', 'duo'))}
          ${R.plane(0, R.cut('brain', 'left:-8%;top:26%;width:70%', 'cream'))}
          ${R.plane(1, R.cut('mindmachine', 'left:40%;top:36%;width:56%'))}</div>`,
        'Multiplane push: the back print barely moves, the cut-outs drift, the front object moves most. The goggles drop into the title like a word.'),
      R.fr.speaker(H),
      R.fr.peek(H),
      R.fr.sheet(),
      R.fr.index(),
    ],
  }));
})();
