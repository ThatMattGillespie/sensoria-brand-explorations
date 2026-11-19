/* Direction 4: Soft focus. Things arrive out of focus and resolve. Insight as a focus pull. */
(function () {
  const ruler = (cls = '') => `
    <div class="ruler ${cls}" aria-hidden="true">
      ${['∞', '10', '5', '3', '2', '1.5', '1', '0.7'].map((n) => `<span><i></i>${n}</span>`).join('')}
      <b class="needle"></b>
    </div>`;

  const focusImg = (src, cls = '', mode = 'band') =>
    `<div class="focus ${mode} ${cls}"><img class="soft" src="${src}" alt=""><img class="sharp" src="${src}" alt=""></div>`;

  window.DIRECTIONS.push({
    id: 'soft-focus',
    name: 'Soft focus',
    lens: 'Focus pull',
    idea: 'Things arrive out of focus and resolve, the way an idea does. Blur is the resting state and sharpness is earned, so the brand reads as calm and a little mysterious, and still lands on clear information.',
    fonts: [
      'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&family=DM+Mono:wght@300;400;500&display=swap',
      'https://api.fontshare.com/v2/css?f[]=gambarino@400&display=swap',
    ],
    fontNames: { display: 'Schibsted Grotesk (stand-in for FF Blur)', text: 'Gambarino for leads, Schibsted for body', label: 'DM Mono' },
    tokens: {
      '--ground': '#ECE6DA', '--ground-2': '#E1D9C9', '--ink': '#26221D', '--ink-2': '#6A6257',
      '--line': 'rgba(38,34,29,.13)', '--line-strong': 'rgba(38,34,29,.3)',
      '--accent': '#3B5BA5', '--on-accent': '#F4EFE6',
      '--font-display': "'Schibsted Grotesk', system-ui, sans-serif",
      '--font-text': "'Schibsted Grotesk', system-ui, sans-serif",
      '--font-lead': "'Gambarino', Georgia, serif",
      '--font-label': "'DM Mono', ui-monospace, monospace",
      '--display-weight': '500', '--display-tracking': '-0.04em', '--display-leading': '.94',
      '--label-tracking': '.14em', '--radius': '6px', '--btn-radius': '999px', '--grain-amt': '.28',
    },
    spectrum: ['#3B5BA5', '#4E8F8B', '#D6A53A', '#D2703A', '#7C9A4E', '#7B62A6', '#C24A3A'],
    swatches: [['Ground', '#ECE6DA'], ['Panel', '#E1D9C9'], ['Ink', '#26221D'], ['Blue', '#3B5BA5'], ['Muted', '#6A6257']],
    specimenWord: 'Resolve',
    behaviors: [
      ['Blur mask', 'Headlines load blurred and pull into focus. After that, a focus plane follows the cursor up and down the lines, and the rest stays soft.'],
      ['Images', 'Shallow depth of field everywhere: one sharp band or subject, everything else soft and matte, with film grain.'],
      ['Motion', 'Cuts are rack focuses. Captions sharpen word by word as they are spoken. A lens focus scale is the recurring graphic.'],
    ],
    hero: (H) => `${focusImg(H.media('brain.jpg'))}${ruler()}`,
    heroClass: 'grain',
    slideClass: 'grain',
    css: `
      .slide-kicker { font-style: normal; }
      .state-note { font-size: 19px; }

      /* blur mask: loads blurred, pulls into focus, then a focus plane follows the cursor */
      .bt-soft { filter: blur(.04em); opacity: .9; animation: pullSoft 1.8s cubic-bezier(.2,.7,.2,1) both; }
      @keyframes pullSoft { from { filter: blur(.18em); } }
      .bt-sharp {
        animation: pullSharp 1.8s cubic-bezier(.2,.7,.2,1) .2s both;
        --m: linear-gradient(to bottom, rgba(0,0,0,.55) calc(var(--my) - 55%), #000 calc(var(--my) - 14%), #000 calc(var(--my) + 14%), rgba(0,0,0,.55) calc(var(--my) + 55%));
        -webkit-mask-image: var(--m); mask-image: var(--m);
      }
      @keyframes pullSharp { from { opacity: 0; } }
      .state-chip { filter: blur(1.5px); width: 16px; height: 16px; }

      .focus { position: absolute; inset: 0; overflow: hidden; }
      .focus img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .focus .soft { filter: grayscale(.85) sepia(.3) blur(9px) contrast(.9); transform: scale(1.06); }
      .focus .sharp { filter: grayscale(.85) sepia(.3) contrast(.94); }
      @property --a { syntax: '<percentage>'; inherits: true; initial-value: 30%; }
      .focus.band { animation: band 10s ease-in-out infinite alternate; }
      @keyframes band { from { --a: 12%; } to { --a: 58%; } }
      .focus.band .sharp { --m: linear-gradient(to bottom, transparent var(--a), #000 calc(var(--a) + 10%), #000 calc(var(--a) + 20%), transparent calc(var(--a) + 34%)); -webkit-mask-image: var(--m); mask-image: var(--m); }
      .focus.face .soft { filter: blur(14px) contrast(.9) saturate(.8) sepia(.1) brightness(1.1); }
      .focus.face .sharp { filter: contrast(.95) saturate(.85) sepia(.1) brightness(1.15); --m: radial-gradient(ellipse 38% 26% at 50% 44%, #000 45%, transparent 100%); -webkit-mask-image: var(--m); mask-image: var(--m); }
      .focus.out .soft { filter: grayscale(.85) sepia(.3) blur(18px) brightness(1.1); }
      .focus.out .sharp { display: none; }

      .ruler { position: absolute; right: 0; top: 10%; bottom: 10%; width: 64px; display: flex; flex-direction: column; justify-content: space-between; font: 10px var(--font-label); letter-spacing: .06em; color: #F4EFE6; }
      .ruler span { display: flex; align-items: center; gap: 6px; }
      .ruler i { width: 14px; height: 1px; background: currentColor; }
      .ruler .needle { position: absolute; left: 0; width: 26px; height: 2px; background: #F4EFE6; top: calc(var(--a) + 15%); }
      .hero-visual .ruler, .slide-art .ruler { animation: band 10s ease-in-out infinite alternate; }
      .slide-art .ruler { font-size: 1.1cqw; width: 6cqw; }
      .hero-visual, .slide-art { background: #6b6a5f; }

      .rack { display: flex; flex-direction: column; }
      .rack span { transition: none; animation: rackA 4s ease-in-out infinite alternate; }
      .rack span + span { animation-name: rackB; }
      @keyframes rackA { 0%, 35% { filter: blur(0); } 65%, 100% { filter: blur(.12em); opacity: .6; } }
      @keyframes rackB { 0%, 35% { filter: blur(.12em); opacity: .6; } 65%, 100% { filter: blur(0); } }
      .vf-ruler { display: flex; justify-content: space-between; margin-top: auto; padding-top: 3cqw; border-top: 1px solid var(--line-strong); font: 2.4cqw var(--font-label); color: var(--ink-2); }
      .vf-ruler b { color: var(--ink); font-weight: 400; }

      .vf .cap { color: #F4EFE6; font-weight: 500; font-size: 6.6cqw; }
      .vf .cap .w { filter: blur(.1em); opacity: .65; }
      .vf .badge { color: #F4EFE6; }
      .vf .badge b { font-family: var(--font-lead); font-weight: 400; font-size: 5.4cqw; }
      .rack-label { position: absolute; left: 0; right: 0; bottom: 10cqw; text-align: center; font: 2.6cqw var(--font-label); letter-spacing: .14em; text-transform: uppercase; color: #F4EFE6; }
      .rack-ring { position: absolute; left: 50%; top: 46%; width: 34cqw; height: 34cqw; translate: -50% -50%; border-radius: 50%; border: 1px solid rgba(244,239,230,.7); }
    `,
    frames: (H) => [
      {
        label: 'Title card',
        note: 'A rack focus between two lines: the first sharpens while the second softens, then they swap. The lens focus scale sits underneath.',
        cls: 'grain',
        html: `<div class="vf-safe">
            <span class="label" style="font-size:2.6cqw">Sensoria Research</span>
            <div class="vf-title rack" style="margin-top:46cqw"><span>One light.</span><span>Seven routes.</span></div>
            <div class="vf-ruler"><span>∞</span><span>10</span><span>5</span><b>3 m</b><span>2</span><span>1</span></div>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Shallow depth of field: face sharp, surroundings soft, matte grade with grain. The caption sharpens one word at a time as it is spoken.',
        cls: 'grain',
        html: `${focusImg(H.media('leo-1.jpg'), 'layer', 'face')}
          ${H.badge('Leo Christov-Moore', 'Sensoria Research')}
          ${H.cap('That shiver <span class="w">when the music lands</span>')}`,
      },
      {
        label: 'Transition',
        note: 'Rack focus between shots. The outgoing shot blurs out, the next one arrives soft, then pulls sharp.',
        cls: 'grain',
        html: `${focusImg(H.media('leo-2.jpg'), 'layer', 'out')}
          <div class="layer" style="opacity:.55">${focusImg(H.media('brain.jpg'), '', 'out')}</div>
          <div class="rack-ring"></div>
          <span class="rack-label">Rack focus · 12 frames</span>`,
      },
    ],
  });
})();
