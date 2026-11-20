/* 7C · Illustrated. Sensoria's own ligne claire scenes carry the personality. Each chapter opens with a wide,
   square-cornered illustration and a caption; the text around them stays quiet. The ligne claire figures also
   serve as the stickers, set square and lifted only on hover. */
(function () {
  const R = window.REFRACT, C = R.C;
  const scene = (file, n, cap, sec) => `<figure class="il-scene" data-sec="${sec}"><div class="ph"><img src="${'../round-5/media/' + file}" alt=""></div><figcaption class="i7"><b>${n}</b>${cap}</figcaption></figure>`;
  window.LAYOUTS.push({
    id: 'illustrated',
    name: 'Illustrated',
    idea: 'Sensoria’s own ligne claire scenes carry the personality. Each chapter opens with a wide illustration and a caption, and the text around them stays quiet. The ligne claire figures double as the stickers, square at rest and lifted on hover.',
    css: `
      .il-hero { padding: 80px 0 64px; display: grid; grid-template-columns: 7fr 5fr; gap: 64px; align-items: end; }
      .il-hero .display { font-size: clamp(42px, 6vw, 90px); line-height: .96; }
      .il-hero .lead { font-size: 22px; max-width: 30ch; }
      .il-scene { margin: 0 auto; max-width: 1440px; }
      .il-scene .ph { aspect-ratio: 1800 / 1004; overflow: hidden; }
      .il-scene img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .il-scene figcaption { font: 13px/1.4 var(--font-text); color: var(--ink-2); margin-top: 10px; }
      .il-scene figcaption b { font: 12px var(--font-label); color: var(--ink); margin-right: 10px; }
      .il-states { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 48px; }
      .il-states li { display: grid; grid-template-columns: 64px 1fr; gap: 18px; align-items: center; padding: 14px 0; }
      .il-states .stk6 { width: 64px; height: 64px; }
      .il-states b { display: block; font: 400 23px/1.1 var(--font-display); letter-spacing: -.02em; } .il-states span { color: var(--ink-2); font-size: 15px; }
      .il-pair { display: grid; grid-template-columns: 7fr 5fr; gap: 64px; align-items: center; }
      .il-pair .ph { aspect-ratio: 1800 / 1004; overflow: hidden; } .il-pair img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .il-pair ol { list-style: none; display: grid; gap: 28px; margin-top: 32px; }
      .il-pair ol b { display: block; font: 400 22px/1.1 var(--font-display); letter-spacing: -.02em; margin-bottom: 4px; } .il-pair ol span { color: var(--ink-2); }
      .il-pair .n { font: 12px var(--font-label); color: var(--ink-2); display: block; margin-bottom: 6px; }
      .il-gap { padding-top: 160px; }
      @media (max-width: 900px) { .il-hero, .il-pair { grid-template-columns: 1fr; gap: 28px; padding-top: 40px; } .il-states { grid-template-columns: 1fr; } .il-gap { padding-top: 96px; } .il-scene figcaption { padding: 0 16px; } }
    `,
    render: (K) => `
      ${K.head()}
      <section class="i7 il-hero" data-sec="Hero"><div data-sub="Headline">${K.meta()}${K.bt('h1', 'display', K.hero.title)}</div><div data-sub="Lead"><p class="lead">${K.hero.lead}</p>${K.btns()}</div></section>
      ${scene('lc-lab.jpg', 'Fig. 1', 'The lab, as Sensoria draws it: many disciplines around one table.', 'Opening scene')}
      <section class="i7 i7-sec" data-sec="States"><div class="i7-split"><div data-sub="Headline"><h2 class="h2">${K.statesHead}</h2><p class="lead" style="color:var(--ink-2);margin-top:20px">${K.statesLead}</p></div>
        <ol class="il-states" data-sub="List">${K.states.map(([n, note, k]) => `<li class="stk-host">${K.stk(k)}<div><b>${n}</b><span>${note}</span></div></li>`).join('')}</ol></div></section>
      <section class="i7 il-gap" data-sec="How we study it"><div class="il-pair">
        <div class="ph" data-sub="Illustration"><img src="${K.media('lc-desk.jpg')}" alt=""></div>
        <div data-sub="Text"><h2 class="h2">How we study it</h2><ol>
          <li><span class="n">01</span><b>Ask</b><span>A survey of people who already work with these states.</span></li>
          <li><span class="n">02</span><b>Listen</b><span>Long interviews about what happened and what it was worth.</span></li>
          <li><span class="n">03</span><b>Test</b><span>Shared protocols, so an insight can be checked sober.</span></li></ol></div></div></section>
      ${K.coordSec()}
      <div class="il-gap"></div>
      ${scene('lc-terrace.jpg', 'Fig. 2', 'Gatherings: where colleagues compare notes.', 'Gatherings scene')}
      ${K.guideSec()}
      ${K.close()}`,
  });
})();
