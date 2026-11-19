/* Direction 2: Risograph. Two-colour overprint, misregistration, grain. Research printed in a small studio. */
(function () {
  const BLUE = '#0078BF', PINK = '#FF48B0', YELLOW = '#FFE800';

  const regMark = (x, y) => `<g transform="translate(${x} ${y})" stroke="var(--ink)" stroke-width=".8" fill="none"><circle r="6"/><path d="M-10 0h20M0-10v20"/></g>`;

  const risoImg = (src, lift = 1.1, cls = '') =>
    `<div class="riso ${cls}" style="--lift:${lift}"><img class="p-pink" src="${src}" alt=""><img class="p-blue" src="${src}" alt=""></div>`;

  const hero = (H) => `
    <div class="riso-hero">
      <div class="riso-yellow"></div>
      ${risoImg(H.media('brain.jpg'), 1.05)}
      <svg class="riso-marks" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true">${regMark(22, 22)}${regMark(378, 22)}${regMark(22, 478)}${regMark(378, 478)}</svg>
      <span class="riso-plate">2 colour · blue + fluoro pink</span>
    </div>`;

  window.DIRECTIONS.push({
    id: 'risograph',
    name: 'Risograph',
    lens: 'Overprint',
    idea: 'Research printed in a small studio. Two inks laid over each other, never quite in register, so every surface carries a little evidence of the hand. Colour mixing happens on the page, where the inks overlap.',
    fonts: ['https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Martian+Mono:wght@300..600&display=swap'],
    fontNames: { display: 'Archivo Expanded Black (stand-in for Balium Blur)', text: 'Archivo', label: 'Martian Mono' },
    tokens: {
      '--ground': '#F3EEE2', '--ground-2': '#EAE2D0', '--ink': '#2B2D52', '--ink-2': '#5F5D78',
      '--line': 'rgba(43,45,82,.16)', '--line-strong': 'rgba(43,45,82,.4)',
      '--accent': PINK, '--on-accent': '#2B2D52',
      '--font-display': "'Archivo', system-ui, sans-serif",
      '--font-text': "'Archivo', system-ui, sans-serif",
      '--font-label': "'Martian Mono', ui-monospace, monospace",
      '--display-weight': '850', '--display-tracking': '-0.01em', '--display-leading': '.9',
      '--display-case': 'uppercase', '--display-stretch': '125%',
      '--label-tracking': '.08em', '--radius': '0px', '--grain-amt': '.3',
    },
    spectrum: ['#3D5588', '#00838A', '#F5C400', PINK, '#00A95C', '#765BA7', '#FF665E'],
    swatches: [['Paper', '#F3EEE2'], ['Blue', BLUE], ['Fluoro pink', PINK], ['Yellow', YELLOW], ['Midnight', '#2B2D52']],
    specimenWord: 'Overprint',
    behaviors: [
      ['Blur mask', 'The blur is ink gain. A pink plate swells and bleeds under a crisp blue plate, and the two slip out of register as the cursor moves.'],
      ['Images', 'Every photo is separated into two plates (blue shadows, pink midtones) with a grainy dither. Overlaps print purple.'],
      ['Motion', 'Plates slide into register on entry, and cuts are plate changes: one ink leaves, the next arrives.'],
    ],
    hero: (H) => hero(H),
    defs: `
      <filter id="ink-spread" x="-5%" y="-15%" width="110%" height="130%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="b"/>
        <feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="4" result="n"/>
        <feDisplacementMap in="b" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" result="d"/>
        <feComponentTransfer in="d"><feFuncA type="discrete" tableValues="0 0 .92 .92 .92"/></feComponentTransfer>
      </filter>
      <filter id="riso-blue" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%">
        <feColorMatrix type="saturate" values="0" result="g"/>
        <feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="1" seed="7" result="n"/>
        <feColorMatrix in="n" type="saturate" values="0" result="ng"/>
        <feComposite in="g" in2="ng" operator="arithmetic" k2="1" k3=".6" k4="-.3" result="m"/>
        <feColorMatrix in="m" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1 0 0 0 1" result="inv"/>
        <feComponentTransfer in="inv" result="t"><feFuncA type="discrete" tableValues="0 0 1"/></feComponentTransfer>
        <feFlood flood-color="${BLUE}"/><feComposite in2="t" operator="in"/>
      </filter>
      <filter id="riso-pink" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%">
        <feColorMatrix type="saturate" values="0" result="g"/>
        <feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="1" seed="12" result="n"/>
        <feColorMatrix in="n" type="saturate" values="0" result="ng"/>
        <feComposite in="g" in2="ng" operator="arithmetic" k2="1" k3=".6" k4="-.3" result="m"/>
        <feColorMatrix in="m" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1 0 0 0 1" result="inv"/>
        <feComponentTransfer in="inv" result="t"><feFuncA type="discrete" tableValues="0 1 1"/></feComponentTransfer>
        <feFlood flood-color="${PINK}"/><feComposite in2="t" operator="in"/>
      </filter>`,
    css: `
      body { font-stretch: 100%; }
      .display { font-size: clamp(44px, 4.9vw, 70px); }
      .h2 { font-size: clamp(34px, 3.3vw, 46px); }
      .stat-big { font-size: 48px; }
      .applied-head h2, .specimen .sp-display { font-size: 44px; }
      .state-name { font-weight: 600; font-stretch: 112%; font-size: 26px; letter-spacing: -.01em; }
      .slide-title { font-size: 5.1cqw; }
      .slide-states .state-name { font-size: 3cqw; }
      .vf-title { font-size: 10.5cqw; }
      .slide-kicker { font-style: normal; font-weight: 700; }
      .btn { font-weight: 700; text-transform: uppercase; letter-spacing: .04em; font-size: 13px; }
      .btn-quiet { box-shadow: inset 0 0 0 2px var(--ink); }
      .state-chip { border-radius: 0; mix-blend-mode: multiply; transform: rotate(8deg); }
      .stat-big { mix-blend-mode: multiply; }

      /* blur mask: pink plate with ink gain under a crisp, speckled blue plate */
      .bt { isolation: isolate; }
      .bt-sharp {
        color: ${BLUE}; mix-blend-mode: multiply;
        --speck: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='1' seed='3'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -3.4 0 0 0 2.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        -webkit-mask-image: var(--speck); mask-image: var(--speck);
        transform: translate(calc((var(--mx) - 50%) * -.005), calc((var(--my) - 50%) * -.008));
      }
      .bt-soft {
        color: ${PINK}; mix-blend-mode: multiply; filter: url(#ink-spread);
        transform: translate(calc((var(--mx) - 50%) * .007), calc((var(--my) - 50%) * .012));
      }

      /* two-plate image */
      .riso { position: absolute; inset: 0; background: var(--ground); isolation: isolate; overflow: hidden; }
      .riso img { position: absolute; inset: -4%; width: 108%; height: 108%; object-fit: cover; mix-blend-mode: multiply; }
      .riso .p-blue { filter: brightness(var(--lift)) contrast(1.2) url(#riso-blue); }
      .riso .p-pink { filter: brightness(var(--lift)) contrast(1.1) url(#riso-pink); transform: translate(1.4%, .9%) rotate(-.4deg); opacity: .9; }
      .riso.wide-reg .p-pink { transform: translate(6%, 3%) rotate(-1.5deg); }

      .riso-hero { position: absolute; inset: 0; background: var(--ground); }
      .riso-hero .riso { inset: 9% 9% 14% 9%; }
      .riso-yellow { position: absolute; left: 24%; right: 4%; top: 48%; bottom: 8%; background: ${YELLOW}; mix-blend-mode: multiply; transform: rotate(-1.2deg); }
      .riso-marks { position: absolute; inset: 0; width: 100%; height: 100%; }
      .riso-plate { position: absolute; left: 9%; bottom: 5%; font: 10px var(--font-label); letter-spacing: .08em; text-transform: uppercase; color: var(--ink); }
      .slide-art .riso-plate { font-size: 1.3cqw; }

      .vf-yellow { position: absolute; left: -4cqw; right: 18cqw; top: 46cqw; height: 48cqw; background: ${YELLOW}; mix-blend-mode: multiply; transform: rotate(-2deg); }
      .vf-safe .wordmark { font-size: 2.6cqw; letter-spacing: .2em; }
      .vf-plate { margin-top: auto; display: flex; justify-content: space-between; font: 2.4cqw var(--font-label); letter-spacing: .08em; text-transform: uppercase; }
      .vf .cap { font-weight: 800; color: var(--ink); font-size: 6cqw; }
      .vf .cap span { background: ${YELLOW}; box-decoration-break: clone; -webkit-box-decoration-break: clone; padding: .3cqw 1.6cqw; line-height: 1.5; }
      .vf .badge { background: ${PINK}; color: var(--ink); padding: 2.4cqw 3cqw; transform: rotate(-2deg); mix-blend-mode: multiply; }
      .vf-marks { position: absolute; inset: 0; width: 100%; height: 100%; }
    `,
    frames: (H) => [
      {
        label: 'Title card',
        note: 'Heavy expanded type in two plates. The pink plate swells like ink on uncoated paper and slides in and out of register.',
        cls: 'grain',
        html: `<div class="vf-yellow"></div>
          <svg class="vf-marks" viewBox="0 0 360 640" preserveAspectRatio="none" aria-hidden="true">${regMark(20, 20)}${regMark(340, 20)}${regMark(20, 620)}${regMark(340, 620)}</svg>
          <div class="vf-safe">
            <span class="wordmark">Sensoria Research</span>
            <div style="margin-top:36cqw">${H.bt('div', 'vf-title', 'One light. Seven routes.')}</div>
            <div class="vf-plate"><span>Plate 1 blue</span><span>Plate 2 pink</span></div>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Footage separated into two plates, frame by frame. Captions print on a yellow strip; the speaker badge is a pink sticker.',
        cls: 'grain',
        html: `${risoImg(H.media('leo-1.jpg'), 2.2, 'layer')}
          ${H.badge('Leo Christov-Moore', 'Sensoria Research')}
          ${H.cap('<span>That shiver when the music lands</span>')}`,
      },
      {
        label: 'Transition',
        note: 'A plate change. The outgoing shot leaves in pink while the incoming shot arrives in blue, badly out of register on purpose.',
        cls: 'grain',
        html: `<div class="riso layer wide-reg" style="--lift:1.05"><img class="p-pink" src="${H.media('brain.jpg')}" alt=""><img class="p-blue" style="filter:brightness(2.1) contrast(1.2) url(#riso-blue)" src="${H.media('leo-2.jpg')}" alt=""></div>`,
      },
    ],
  });
})();
