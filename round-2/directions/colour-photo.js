/* Round 2, C: Colour photography. Sensoria's own event photos in natural colour, lightly graded and matted in
   white. The spectrum becomes a tagging system: each image carries the colour of the kind of state it shows. */
(function () {
  const R = window.REFRACT, C = R.C, S = R.SPECTRUM, SL = R.SPECTRUM_LIGHT;
  const STATES = ['Dreaming', 'Meditation', 'Mystical', 'Aesthetic', 'Breathwork', 'Technodelics', 'Psychedelics'];

  const tag = (i, cls = '') => `<span class="tag ${cls}" style="--c:${S[i]}"><i></i>0${i + 1} · ${STATES[i]}</span>`;
  const mat = (src, style, pos = '50% 50%', caption = '') =>
    `<figure class="mat" style="${style}"><img src="${src}" alt="" style="object-position:${pos}">${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;

  window.DIRECTIONS.push(R.make({
    id: 'colour-photo',
    name: 'C · Colour photography',
    lens: 'Real events, natural colour',
    idea: 'Sensoria’s own photos, where light and colour are already the subject: laser installations, immersive rooms, long dinners. Natural colour with a light matte grade, white mats, and the spectrum used as a tag that links each image to a kind of state.',
    hero: (H) => mat(H.media('rainbow-mountain.jpg'), 'inset:0', '50% 70%', `<span>Fig. 1</span>${tag(3, 'small')}`),
    heroClass: 'is-mat',
    slideArt: (H) => mat(H.media('lasers.jpg'), 'inset:0', '50% 50%', tag(5, 'small')),
    behaviors: [
      ['Images', 'Real photos in natural colour, graded only slightly toward matte so they sit on the warm paper. White mats with a hairline turquoise and amber edge.'],
      ['Spectrum as tag', 'Each image is tagged with the colour and number of the state it shows. Over time the archive becomes browsable by colour.'],
      ['Video', 'Photos full-bleed with a paper band for type. Cuts are spectrum seams: a thin seven-colour line sweeps across and the next shot is on the other side.'],
    ],
    css: `
      .hero-visual.is-mat, .slide-art { background: transparent; overflow: visible; }
      .mat {
        position: absolute; margin: 0; background: ${C.WHITE}; padding: 4% 4% 12%;
        box-shadow: -1.5px 0 0 ${C.FT}, 1.5px 0 0 ${C.FA}, 0 18px 40px -24px rgba(5,39,43,.45);
      }
      .mat img { width: 100%; height: 100%; object-fit: cover; display: block; filter: saturate(.92) contrast(.96) brightness(1.02); }
      .mat figcaption { position: absolute; left: 4%; right: 4%; bottom: 3.6%; display: flex; justify-content: space-between; align-items: center; font: 10px var(--font-label); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-2); }
      .slide-art .mat figcaption { font-size: 1.2cqw; }
      .tag { display: inline-flex; align-items: center; gap: 6px; font: 10px var(--font-label); letter-spacing: .1em; text-transform: uppercase; color: var(--c); }
      .tag i { width: 8px; height: 8px; border-radius: 50%; background: var(--c); }
      .slide-art .tag { font-size: 1.2cqw; gap: .8cqw; } .slide-art .tag i { width: 1cqw; height: 1cqw; }

      .vf .photo { object-fit: cover; filter: saturate(.92) contrast(.96) brightness(1.02); }
      .vf .band { position: absolute; left: 0; right: 0; bottom: 0; height: 40%; background: var(--ground); padding: 7cqw; display: flex; flex-direction: column; }
      .vf-title { color: ${C.TEAL}; font-size: 11cqw; }
      .vf .tag { font-size: 2.4cqw; gap: 1.2cqw; } .vf .tag i { width: 1.8cqw; height: 1.8cqw; }
      .vf .tag.on-photo { position: absolute; left: 7cqw; top: 9cqw; color: ${C.WHITE}; background: rgba(5,39,43,.55); padding: 1cqw 2cqw; border-radius: 99px; backdrop-filter: blur(6px); }
      .vf .tag.on-photo i { background: var(--lc); }
      .vf .index { position: absolute; left: 7cqw; right: 7cqw; bottom: 9cqw; display: grid; grid-template-columns: repeat(7, 1fr); gap: 1cqw; }
      .vf .index i { height: 1cqw; background: rgba(254,254,254,.3); border-radius: 1px; }
      .vf .index i.on { background: var(--lc); height: 1.6cqw; }
      .seam { position: absolute; top: -10%; bottom: -10%; left: 46%; width: 5cqw; display: grid; grid-template-columns: repeat(7, 1fr); transform: rotate(8deg); }
      .seam i { background: var(--c); }
      .split-b { clip-path: polygon(54% 0, 100% 0, 100% 100%, 40% 100%); }
    `,
    frames: (H) => [
      {
        label: 'Title card',
        note: 'A real photo full-bleed above a paper band. Type stays teal on paper, so the photo keeps all its colour; the spectrum key sits under the headline.',
        html: `<img class="layer photo" src="${H.media('installation.jpg')}" alt="" style="object-position:60% 30%;height:62%">
          <div class="band">
            <div style="margin-top:auto">${H.bt('div', 'vf-title', 'One light.<br>Seven routes.')}</div>
            <div style="margin-top:5cqw">${R.strip()}</div>
          </div>`,
      },
      {
        label: 'Speaker with caption',
        note: 'Natural colour with only a light matte grade and a soft teal vignette. The one key word in the caption takes the amber accent.',
        html: R.speaker(H),
      },
      {
        label: 'Tagged photo',
        note: 'Each image carries the colour and number of the state it shows, and a small seven-step index marks where this video sits in the spectrum.',
        html: `<img class="layer photo" src="${H.media('lasers.jpg')}" alt="" style="object-position:45% 50%">
          <span class="tag on-photo" style="--c:${S[5]};--lc:${SL[5]}"><i></i>06 · Technodelics</span>
          <div class="index" style="--lc:${SL[5]}">${S.map((_, i) => `<i class="${i === 5 ? 'on' : ''}"></i>`).join('')}</div>`,
      },
      {
        label: 'Transition',
        note: 'Spectrum seam: a thin seven-colour line sweeps across the frame, and the next shot is already on the other side.',
        html: `<img class="layer photo" src="${H.media('immersive.jpg')}" alt="" style="object-position:30% 50%">
          <img class="layer photo split-b" src="${H.media('blindfold-dinner.jpg')}" alt="" style="object-position:62% 50%">
          <div class="seam">${SL.map((c) => `<i style="--c:${c}"></i>`).join('')}</div>
          <span class="frame-label">Spectrum seam · 16 frames</span>`,
      },
    ],
  }));
})();
