/* Round 2, B: Ligne claire. The website's current illustration style kept as it is (clean outlines, flat colour,
   teal, amber and cream), framed as comic panels. The refraction fringe touches the panel edges only. */
(function () {
  const R = window.REFRACT, C = R.C;

  const panel = (src, style, pos = '50% 50%', extra = '') =>
    `<div class="panel" style="${style}"><img src="${src}" alt="" style="object-position:${pos}">${extra}</div>`;
  const box = (text, style = '') => `<span class="narr" style="${style}">${text}</span>`;

  const hero = (H) => `
    <div class="panels">
      ${panel(H.media('lc-desk.jpg'), 'left:0;top:0;width:100%;height:57%', '40% 40%', box('Fig. 1 · An interview, Sensoria Research', 'left:3%;top:4%'))}
      ${panel(H.media('lc-armchair.jpg'), 'left:0;top:60%;width:48.5%;height:40%', '38% 50%')}
      ${panel(H.media('lc-group.jpg'), 'left:51.5%;top:60%;width:48.5%;height:40%', '55% 50%')}
    </div>`;

  window.DIRECTIONS.push(R.make({
    id: 'ligne-claire',
    name: 'B · Ligne claire',
    lens: 'The website’s illustration style',
    idea: 'Keeps the illustration style already on the website: clean outlines, flat colour, teal, amber and cream, warm lamplight. The images stay as they are; the brand frames them as comic panels, and the refraction fringe touches only the panel edges.',
    hero: (H) => hero(H),
    heroClass: 'is-panels',
    slideArt: (H) => `<div class="panels">${panel(H.media('lc-box.jpg'), 'inset:0', '30% 50%')}</div>`,
    behaviors: [
      ['Images', 'Ligne claire illustrations in their own colour, unfiltered. New ones are generated in the same style so the site, posts and videos share one look.'],
      ['Panels', 'Images sit in comic panels: deep teal hairline outlines, white gutters, narration boxes for labels. Panel edges carry a hairline turquoise and amber fringe.'],
      ['Video', 'Captions become speech balloons. Explainers can run as a vertical comic strip, and cuts push from one panel into the next.'],
    ],
    css: `
      .hero-visual.is-panels, .slide-art { background: transparent; overflow: visible; }
      .panels { position: absolute; inset: 0; }
      .panel {
        position: absolute; overflow: hidden; background: ${C.WHITE};
        border: 1.5px solid ${C.TEAL}; border-radius: 3px;
        box-shadow: -1.5px 0 0 ${C.FT}, 1.5px 0 0 ${C.FA};
      }
      .panel img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .narr {
        position: absolute; background: #FFF4DE; color: ${C.TEAL}; border: 1.2px solid ${C.TEAL};
        font: 10px/1.3 var(--font-label); letter-spacing: .06em; text-transform: uppercase; padding: 5px 8px;
      }
      .state-chip { border-radius: 2px; border: 1px solid ${C.TEAL}; }

      .vf { background: var(--ground); }
      .vf .panel { border-width: .45cqw; border-radius: .8cqw; box-shadow: -.45cqw 0 0 ${C.FT}, .45cqw 0 0 ${C.FA}; }
      .vf .narr { font-size: 2.2cqw; padding: 1cqw 1.8cqw; border-width: .35cqw; }
      .vf-title { color: ${C.TEAL}; font-size: 11cqw; }
      .balloon {
        position: absolute; left: 9cqw; right: 9cqw; bottom: 16cqw; padding: 3.4cqw 4.4cqw;
        background: ${C.WHITE}; color: ${C.TEAL}; border: .5cqw solid ${C.TEAL}; border-radius: 6cqw;
        font: 500 5cqw/1.25 var(--font-text); text-align: center;
      }
      .balloon em { font-style: normal; background: linear-gradient(transparent 62%, ${C.AMBER} 62%); }
      .balloon::after {
        content: ""; position: absolute; left: 30%; top: -4.6cqw; width: 6cqw; height: 6cqw;
        background: ${C.WHITE}; border-left: .5cqw solid ${C.TEAL}; border-top: .5cqw solid ${C.TEAL};
        transform: skewY(-24deg) rotate(28deg);
      }
      .vf .narr-badge { left: 7cqw; top: 9cqw; }
      .push-in { position: absolute; inset: 22cqw 12cqw 40cqw; }
    `,
    frames: (H) => [
      {
        label: 'Title card',
        note: 'A ligne claire panel above, the headline set on paper below with its faint fringe, and the seven-colour key underneath.',
        html: `${panel(H.media('lc-terrace.jpg'), 'left:6cqw;right:6cqw;top:8cqw;height:96cqw', '30% 50%')}
          <div class="vf-safe">
            <div style="margin-top:auto">${H.bt('div', 'vf-title', 'One light.<br>Seven routes.')}</div>
            <div style="margin-top:6cqw">${R.strip()}</div>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Natural colour footage inside a panel border. The caption is a speech balloon; the one key word gets an amber highlighter stroke. The name sits in a narration box.',
        html: `${R.speaker(H, { badge: false, cap: `<div class="balloon">That shiver when the music <em>lands</em></div>` })}
          ${box('Leo Christov-Moore · Sensoria Research', 'left:7cqw;top:9cqw')}
          <div class="layer" style="border:.9cqw solid ${C.WHITE};border-radius:10px;box-shadow:inset 0 0 0 .45cqw ${C.TEAL}"></div>`,
      },
      {
        label: 'Explainer as a comic strip',
        note: 'Three panels stacked down the frame, each revealed on its line of narration. Narration boxes carry the words, so captions can stay off.',
        html: `${panel(H.media('lc-desk.jpg'), 'left:6cqw;right:6cqw;top:7cqw;height:54cqw', '42% 45%', box('Many already practice', 'left:2.4cqw;top:2.4cqw'))}
          ${panel(H.media('lc-lab.jpg'), 'left:6cqw;right:6cqw;top:64cqw;height:54cqw', '50% 40%', box('in private, unrecorded', 'left:2.4cqw;top:2.4cqw'))}
          ${panel(H.media('lc-group.jpg'), 'left:6cqw;right:6cqw;top:121cqw;height:54cqw', '55% 45%', box('few in a coordinated way', 'left:2.4cqw;top:2.4cqw'))}`,
      },
      {
        label: 'Transition',
        note: 'Panel push: the next panel opens inside the current one and grows to fill the frame, with a white gutter around it.',
        html: `<img class="layer" src="${H.media('lc-lab.jpg')}" alt="" style="object-fit:cover;object-position:50% 50%">
          <div class="push-in panel">${`<img src="${H.media('lc-armchair.jpg')}" alt="" style="object-position:35% 50%">`}</div>
          <div class="push-in" style="box-shadow:0 0 0 2.4cqw ${C.WHITE};border-radius:.8cqw;pointer-events:none"></div>
          <span class="frame-label">Panel push · 14 frames</span>`,
      },
    ],
  }));
})();
