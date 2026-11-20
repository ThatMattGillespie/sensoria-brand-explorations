/* Round 5: the same content in four layout languages that avoid hairline dividers.
   content.js holds the copy and the shared parts; each file in directions/ (after base.js and kit.js) pushes
   { id, name, idea, css, render(K, P) } onto window.LAYOUTS. page.html?d=<id> renders one. */
(function () {
  const R = window.REFRACT, C = R.C;
  window.LAYOUTS = [];

  const K = window.K = {
    nav: ['Research', 'Studies', 'Gatherings', 'About'],
    hero: {
      eyebrow: 'Survey study · open now',
      title: `Non-ordinary ${R.inl('goggles')} states in professional practice`,
      titlePlain: 'Non-ordinary states in professional practice',
      lead: 'Do states beyond ordinary waking consciousness have a role in serious intellectual, creative and material work? We’re asking you.',
    },
    states: [
      ['Dreaming & hypnagogia', 'the edge of sleep', 'armchair'],
      ['Meditation & contemplation', 'from mindfulness to the jhānas', 'writer'],
      ['Mystical & religious experience', 'prayer, ritual, revelation', 'brain'],
      ['Aesthetic experience', 'awe, chills, absorption in art', 'blindfold'],
      ['Breathwork, trance & flow', 'body-led states', 'standing'],
      ['Technodelics', 'strobe light, binaural beats, VR', 'goggles'],
      ['Psychedelics', 'one route among many', 'eeg'],
    ],
    coord: {
      a: 'Many already practice.', b: 'Few do so in an open or coordinated way.',
      body: [
        'Scientists, scholars and artists engage these states privately. Stigma keeps that out of the scientific record. So the field has no shared protocols for eliciting insight, no shared way to tell real insight from false, and no estimate of how often an idea born in a non-ordinary state survives sober testing.',
        'We think what holds back responsible use is less the evidence of risk than this coordination failure.',
      ],
      stats: [['Private', 'Practice, unrecorded'], ['No', 'Shared protocols'], ['Unknown', 'Base rate of true insight']],
    },
    collab: ['Institute for Advanced Consciousness Studies', 'Qualia Research Institute', 'MINDS', 'Multi-Intelligence Institute'],
    principles: [
      ['Paper first', 'Warm paper carries the page. Deep teal is the ink, and one surface per page.'],
      ['Two-colour type', 'Deep teal on paper, white on teal. Amber marks one word, on teal only.'],
      ['Real material first', 'Sensoria’s own photos and people lead; generated objects fill the gaps.'],
      ['Stickers with intent', 'One white edge on every cut-out, and a reason for where it sits.'],
      ['Light, not effects', 'Blur, fringe and motion stay barely there, and hold still on request.'],
    ],
    palette: [
      ['Paper', C.SURFACE, 'Main surface'], ['White', C.WHITE, 'Prints, edges, cards'], ['Deep teal', C.TEAL, 'Ink, one surface'],
      ['Ink 2', '#4C6466', 'Secondary text'], ['Amber', C.AMBER, 'One word, on teal'], ['Turquoise', C.TURQ, 'Fringe, dots'],
    ],
    type: [
      ['Display', 'Funnel Display 400', 'Non-ordinary', 'clamp(56px, 7vw, 100px)', '-.035em'],
      ['Headline', 'Funnel Display 400', 'Not just psychedelics.', '48px', '-.03em'],
      ['Lead', 'Funnel Sans 400', 'We’re asking you.', '23px', '0'],
      ['Body', 'Funnel Sans 400', 'Scientists, scholars and artists engage these states privately.', '18px', '0'],
      ['Label', 'Fragment Mono 400', 'Survey study · open now', '12px', '.14em'],
    ],
  };

  // shared parts every layout can use
  K.MARK = `<svg class="mark" viewBox="0 0 72 72" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 72V1h28"/><path d="M0 71h72"/><path d="M1 1h17c13 0 13 27 0 27H9"/><path d="M9 28C-1 32 1 45 11 47s11 15 1 23"/><path d="M15 28l56 43"/></g><circle cx="56" cy="14" r="8.5" fill="currentColor"/></svg>`;
  K.img = (k) => `media/${R.OBJ[k]}`;
  K.bt = (tag, cls, html, extra = '') => `<${tag} class="${cls} bt" data-bt ${extra}>${html}</${tag}>`;
  K.collage = () => R.planes([
    [-1, R.print('media/immersive.jpg', 'left:8%;top:0;width:90%;height:52%;--r:2deg', 'duo')],
    [0, R.cut('brain', 'left:-6%;top:26%;width:66%', 'cream') + R.print('media/dinner.jpg', 'left:42%;top:44%;width:62%;height:30%;--r:-3deg', 'duo', 'Community dinner')],
    [1, R.cut('tubes', 'left:6%;top:58%;width:24%') + R.cut('goggles', 'left:50%;top:18%;width:46%')],
    [2, R.cut('vr', 'left:44%;top:56%;width:30%')],
  ]);
  K.btns = (q = 'Why we’re asking') => `<div class="actions"><a class="btn btn-primary" href="#">Take the survey study</a><a class="btn btn-quiet" href="#">${q}</a></div>`;

  // render the chosen layout
  window.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('app')) return; // index pages list the options only
    const list = window.LAYOUTS;
    const params = new URLSearchParams(location.search);
    let idx = list.findIndex((d) => d.id === params.get('d'));
    if (idx < 0) idx = 0;
    const L = list[idx];
    const root = document.documentElement;
    const D = R.make({ css: R.kit });
    Object.entries(D.tokens).forEach(([k, v]) => root.style.setProperty(k, v));
    const st = document.createElement('style');
    st.textContent = D.css + (L.css || '');
    document.head.appendChild(st);
    document.getElementById('defs').innerHTML = R.printKit.defs;
    document.title = `${L.name} · Sensoria round 5`;
    root.dataset.layout = L.id;

    const code = `5${String.fromCharCode(65 + idx)}`;
    document.getElementById('app').innerHTML = `
      <nav class="toolbar" aria-label="Exploration">
        <a class="tb-title" href="index.html">Sensoria · Round 5</a>
        ${list.map((d, i) => `<a class="tb-dir" href="?d=${d.id}"${i === idx ? ' aria-current="page"' : ''}>${i + 1} ${d.name}</a>`).join('')}
        <span class="tb-spacer"></span><a href="../final/">Final guide</a>
      </nav>
      <div class="r5-intro"><b>${code} · ${L.name}</b><span>${L.idea}</span></div>
      ${L.render(K, R)}`;

    // headline blur layers, as on the final page
    document.querySelectorAll('[data-bt]').forEach((el) => {
      const html = el.innerHTML;
      el.innerHTML = `<span class="bt-layer bt-soft" aria-hidden="true">${html}</span><span class="bt-layer bt-sharp">${html}</span>`;
      el.style.cssText += '--mx:42%;--my:46%;--nx:-.16;--ny:-.08';
    });
    if (L.init) L.init(K, R);
    R.parallax({ scroll: true });

    // the labels script reads its prefix when it loads, so add it now
    const s = document.createElement('script');
    s.src = '../labels.js'; s.dataset.prefix = code;
    document.body.appendChild(s);
  });
})();
