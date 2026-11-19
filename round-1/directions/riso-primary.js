/* Direction: Primary riso. Three primary inks only. Every other colour is an overprint, so the seven
   colours of the seven kinds of state come from three plates. */
(function () {
  const BLUE = '#0078BF', RED = '#F15060', YELLOW = '#FFE800';
  // overprints (multiply of the inks above)
  const GREEN = '#006D00', ORANGE = '#F14900', NAVY = '#002648', ALL = '#002300';

  const regMark = (x, y) => `<g transform="translate(${x} ${y})" stroke="${NAVY}" stroke-width=".8" fill="none"><circle r="6"/><path d="M-10 0h20M0-10v20"/></g>`;

  const plates = (src, lift = 1.2, cls = '', style = '') =>
    `<div class="rp ${cls}" style="--lift:${lift};${style}"><img class="p-y" src="${src}" alt=""><img class="p-r" src="${src}" alt=""><img class="p-b" src="${src}" alt=""></div>`;

  // print control strip: the three inks and their overprints, which double as the seven-state spectrum
  const strip = () => `<div class="rp-strip">${[[BLUE], [BLUE, YELLOW], [YELLOW], [BLUE, RED, YELLOW], [RED, YELLOW], [BLUE, RED], [RED]]
    .map((inks) => `<i>${inks.map((c) => `<b style="background:${c}"></b>`).join('')}</i>`).join('')}</div>`;

  const hero = (H) => `
    <div class="rp-hero">
      ${plates(H.media('brain.jpg'), 1.35)}
      <svg class="rp-marks" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true">${regMark(22, 22)}${regMark(378, 22)}${regMark(22, 478)}${regMark(378, 478)}</svg>
      ${strip()}
      <span class="rp-plate">3 colour · blue + red + yellow</span>
    </div>`;

  window.DIRECTIONS.push({
    id: 'riso-primary',
    name: 'Primary riso',
    lens: 'Three-colour overprint',
    idea: 'Risograph with only the three primaries. Every other colour, including the dark used for text, is an overprint, so seven colours for seven kinds of state come from just three plates. Print texture with the logic of colour mixing.',
    fonts: ['https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Martian+Mono:wght@300..600&display=swap'],
    fontNames: { display: 'Archivo Expanded Black (stand-in for Balium Blur)', text: 'Archivo', label: 'Martian Mono' },
    tokens: {
      '--ground': '#F3EEE2', '--ground-2': '#EAE2D0', '--ink': NAVY, '--ink-2': '#4D5A6E',
      '--line': 'rgba(0,38,72,.16)', '--line-strong': 'rgba(0,38,72,.4)',
      '--accent': RED, '--on-accent': NAVY,
      '--font-display': "'Archivo', system-ui, sans-serif",
      '--font-text': "'Archivo', system-ui, sans-serif",
      '--font-label': "'Martian Mono', ui-monospace, monospace",
      '--display-weight': '850', '--display-tracking': '-0.01em', '--display-leading': '.9',
      '--display-case': 'uppercase', '--display-stretch': '125%',
      '--label-tracking': '.08em', '--radius': '0px', '--grain-amt': '.3',
    },
    // list order: three inks, three two-ink overprints, one three-ink overprint
    spectrum: [BLUE, GREEN, '#F5C400', ALL, ORANGE, NAVY, RED],
    swatches: [['Paper', '#F3EEE2'], ['Blue', BLUE], ['Red', RED], ['Yellow', YELLOW], ['Blue + red', NAVY]],
    specimenWord: 'Primary',
    behaviors: [
      ['Blur mask', 'Display type in two plates: crisp blue over a red plate that swells with ink gain. Where they overlap they print navy. They slip out of register as the cursor moves.'],
      ['Images', 'Photos separated into three plates (blue, red, yellow) with a grainy dither, so greens, oranges and darks come from overprinting. A print control strip of all seven mixes is the recurring motif.'],
      ['Text colour', 'There is no black ink. Body text is the blue and red overprint, a deep navy.'],
    ],
    hero: (H) => hero(H),
    defs: `
      <filter id="rp-spread" x="-5%" y="-15%" width="110%" height="130%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="b"/>
        <feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="4" result="n"/>
        <feDisplacementMap in="b" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" result="d"/>
        <feComponentTransfer in="d"><feFuncA type="discrete" tableValues="0 0 .92 .92 .92"/></feComponentTransfer>
      </filter>
      ${[['b', BLUE, '-1 0 0 0 1', 7, '.95'], ['r', RED, '0 -1 0 0 1', 12, '.8'], ['y', YELLOW, '0 0 -1 0 1', 21, '.65']].map(([id, ink, row, seed, freq]) => `
      <filter id="rp-${id}" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="1" seed="${seed}" result="n"/>
        <feColorMatrix in="n" type="saturate" values="0" result="ng"/>
        <feComposite in="SourceGraphic" in2="ng" operator="arithmetic" k2="1" k3=".6" k4="-.3" result="m"/>
        <feColorMatrix in="m" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${row}" result="amt"/>
        <feComponentTransfer in="amt" result="t"><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer>
        <feFlood flood-color="${ink}"/><feComposite in2="t" operator="in"/>
      </filter>`).join('')}`,
    css: `
      .display { font-size: clamp(44px, 4.9vw, 70px); }
      .h2 { font-size: clamp(34px, 3.3vw, 46px); }
      .stat-big { font-size: 48px; mix-blend-mode: multiply; }
      .applied-head h2, .specimen .sp-display { font-size: 44px; }
      .state-name { font-weight: 600; font-stretch: 112%; font-size: 26px; letter-spacing: -.01em; }
      .slide-title { font-size: 5.1cqw; }
      .slide-states .state-name { font-size: 3cqw; }
      .vf-title { font-size: 10.5cqw; }
      .slide-kicker { font-style: normal; font-weight: 700; }
      .btn { font-weight: 700; text-transform: uppercase; letter-spacing: .04em; font-size: 13px; }
      .btn-quiet { box-shadow: inset 0 0 0 2px ${BLUE}; color: ${BLUE}; }
      .state-chip { border-radius: 0; transform: rotate(8deg); }

      /* blur mask: crisp blue plate over a swollen red plate; the overlap prints navy */
      .bt { isolation: isolate; }
      .bt-sharp {
        color: ${BLUE}; mix-blend-mode: multiply;
        --speck: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='1' seed='3'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -3.4 0 0 0 2.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        -webkit-mask-image: var(--speck); mask-image: var(--speck);
        transform: translate(calc((var(--mx) - 50%) * -.005), calc((var(--my) - 50%) * -.008));
      }
      .bt-soft {
        color: ${RED}; mix-blend-mode: multiply; filter: url(#rp-spread);
        transform: translate(calc((var(--mx) - 50%) * .007), calc((var(--my) - 50%) * .012));
      }

      /* three-plate image */
      .rp { position: absolute; inset: 0; background: var(--ground); isolation: isolate; overflow: hidden; }
      .rp img { position: absolute; inset: -4%; width: 108%; height: 108%; object-fit: cover; mix-blend-mode: multiply; opacity: .8; }
      .rp .p-b { filter: brightness(var(--lift)) contrast(1.15) url(#rp-b); }
      .rp .p-r { filter: brightness(var(--lift)) contrast(1.15) url(#rp-r); transform: translate(1.1%, .7%) rotate(-.3deg); opacity: .78; }
      .rp .p-y { filter: brightness(var(--lift)) contrast(1.15) url(#rp-y); transform: translate(-.8%, 1.2%) rotate(.4deg); }
      .rp.wide-reg .p-r { transform: translate(5%, 2.5%) rotate(-1.5deg); }
      .rp.wide-reg .p-y { transform: translate(-4%, 4%) rotate(1deg); }

      .rp-hero { position: absolute; inset: 0; background: var(--ground); }
      .rp-hero .rp { inset: 9% 9% 20% 9%; }
      .rp-marks { position: absolute; inset: 0; width: 100%; height: 100%; }
      .rp-strip { position: absolute; left: 9%; right: 9%; bottom: 9%; height: 5%; display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
      .rp-strip i { position: relative; isolation: isolate; }
      .rp-strip b { position: absolute; inset: 0; mix-blend-mode: multiply; opacity: .8; }
      .rp-plate { position: absolute; left: 9%; bottom: 4%; font: 10px var(--font-label); letter-spacing: .08em; text-transform: uppercase; color: var(--ink); }
      .slide-art .rp-plate { font-size: 1.2cqw; }
      .slide-art .rp-strip { gap: 2px; }

      .vf-yellow { position: absolute; left: -4cqw; right: 18cqw; top: 46cqw; height: 48cqw; background: ${YELLOW}; mix-blend-mode: multiply; transform: rotate(-2deg); }
      .vf-safe .wordmark { font-size: 2.6cqw; letter-spacing: .2em; }
      .vf-safe .rp-strip { position: static; height: 5cqw; margin-top: auto; gap: 1cqw; }
      .vf .cap { font-weight: 800; color: var(--ink); font-size: 6cqw; }
      .vf .cap span { background: ${YELLOW}; box-decoration-break: clone; -webkit-box-decoration-break: clone; padding: .3cqw 1.6cqw; line-height: 1.5; }
      .vf .badge { background: ${RED}; color: var(--ink); padding: 2.4cqw 3cqw; transform: rotate(-2deg); mix-blend-mode: multiply; }
      .vf-marks { position: absolute; inset: 0; width: 100%; height: 100%; }
    `,
    frames: (H) => [
      {
        label: 'Title card',
        note: 'Blue type over a swelling red plate on a yellow block. Where all three overlap, the paper prints near-black. The control strip at the bottom carries all seven mixes.',
        cls: 'grain',
        html: `<div class="vf-yellow"></div>
          <svg class="vf-marks" viewBox="0 0 360 640" preserveAspectRatio="none" aria-hidden="true">${regMark(20, 20)}${regMark(340, 20)}${regMark(20, 620)}${regMark(340, 620)}</svg>
          <div class="vf-safe">
            <span class="wordmark">Sensoria Research</span>
            <div style="margin-top:36cqw">${H.bt('div', 'vf-title', 'One light. Seven routes.')}</div>
            ${strip()}
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Footage separated into blue, red and yellow plates, frame by frame. Skin and shadows come from overprinting. Captions print on yellow; the badge is a red sticker.',
        cls: 'grain',
        html: `${plates(H.media('leo-1.jpg'), 2.4, 'layer')}
          ${H.badge('Leo Christov-Moore', 'Sensoria Research')}
          ${H.cap('<span>That shiver when the music lands</span>')}`,
      },
      {
        label: 'Transition',
        note: 'A plate change with all three plates far out of register: the outgoing shot holds in yellow and red while the incoming shot arrives in blue.',
        cls: 'grain',
        html: `<div class="rp layer wide-reg" style="--lift:1.35"><img class="p-y" src="${H.media('brain.jpg')}" alt=""><img class="p-r" src="${H.media('brain.jpg')}" alt=""><img class="p-b" style="filter:brightness(2) contrast(1.2) url(#rp-b)" src="${H.media('leo-2.jpg')}" alt=""></div>`,
      },
    ],
  });
})();
