/* 7B · Collection. The page as a museum catalogue. Objects and figures sit square on plates in a strict grid,
   each with a catalogue number and a name. The hero is a cabinet of six instruments; the states are seven
   plates; photos sit in a captioned row. Hover lifts and tilts an object off its plate. */
(function () {
  const R = window.REFRACT, C = R.C;
  const CAB = [['goggles', 'Flicker goggles', 'Light, at 8 to 12 Hz'], ['eeg', 'EEG headband', 'Reads the brain’s rhythm'], ['headphones', 'Headphones', 'Binaural beats'],
    ['mindmachine', 'Mind machine', 'Light and sound together'], ['flask', 'Flask', 'Lab glassware'], ['tubes', 'Test tubes', 'Samples, sorted']];
  const plate = (img, no, name, note, cls = '') => `<figure class="co-plate stk-host ${cls}"><div class="pl"><img class="stk6" src="${img}" alt=""></div><figcaption><span>${no}</span><b>${name}</b><em>${note}</em></figcaption></figure>`;
  window.LAYOUTS.push({
    id: 'collection',
    name: 'Collection',
    idea: 'The page as a museum catalogue. Objects and figures sit square on plates in a strict grid, each with a number and a name. The hero is a cabinet of six instruments, the states are seven plates, and photos sit in a captioned row. Hover lifts an object off its plate.',
    css: `
      .co-hero { display: grid; grid-template-columns: 5fr 7fr; gap: 64px; align-items: center; padding-top: 56px; }
      .co-hero .display { font-size: clamp(46px, 5vw, 76px); line-height: .97; }
      .co-hero .lead { font-size: 21px; max-width: 30ch; margin-top: 28px; }
      .co-cab { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
      .co-plate { margin: 0; display: grid; gap: 10px; align-content: start; min-width: 0; }
      .co-plate .pl { aspect-ratio: 1; background: ${C.WHITE}; position: relative; }
      .co-plate .stk6 { position: absolute; left: 14%; top: 14%; width: 72%; height: 72%; filter: drop-shadow(0 12px 14px rgba(5,39,43,.18)); }
      .co-plate:hover .stk6 { transform: translateY(-8px) scale(1.06) rotate(-5deg); }
      .co-plate figcaption { display: grid; grid-template-columns: auto 1fr; column-gap: 10px; font-size: 14px; line-height: 1.35; }
      .co-plate figcaption span { font: 12px/1.6 var(--font-label); color: var(--ink-2); grid-row: span 2; }
      .co-plate figcaption b { font-weight: 500; } .co-plate figcaption em { font-style: normal; color: var(--ink-2); font-size: 13px; }
      .co-states { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 56px; }
      .co-states .pl { background: #E8E1D3; aspect-ratio: 4 / 5; }
      .co-states .stk6 { filter: var(--edge) drop-shadow(0 12px 14px rgba(5,39,43,.25)); }
      .co-states figcaption b { font: 400 21px/1.1 var(--font-display); letter-spacing: -.02em; }
      .co-intro { display: grid; align-content: end; gap: 12px; padding: 0 0 52px; }
      .co-intro b { font: 400 30px/1.05 var(--font-display); letter-spacing: -.025em; } .co-intro span { color: var(--ink-2); }
      .co-photos { display: grid; grid-template-columns: 5fr 4fr 3fr; gap: 24px; margin-top: 56px; align-items: start; }
      .co-photos .plate-im { aspect-ratio: 4 / 5; } .co-photos .plate:first-child .plate-im { aspect-ratio: 5 / 4; }
      @media (max-width: 900px) { .co-hero { grid-template-columns: 1fr; gap: 32px; padding-top: 32px; } .co-cab { grid-template-columns: 1fr 1fr; } .co-states { grid-template-columns: 1fr 1fr; gap: 16px; } .co-photos { grid-template-columns: 1fr; } .co-photos .plate-im { aspect-ratio: 4 / 3 !important; } }
    `,
    render: (K) => `
      ${K.head()}
      <section class="i7 co-hero" data-sec="Hero">
        <div data-sub="Copy">${K.meta()}${K.bt('h1', 'display', K.hero.title)}<p class="lead">${K.hero.lead}</p>${K.btns()}</div>
        <div class="co-cab" data-sub="Cabinet">${CAB.map(([k, n, note], i) => plate(K.img(k), `No. ${String(i + 1).padStart(2, '0')}`, n, note)).join('')}</div>
      </section>
      <section class="i7 i7-sec" data-sec="States">
        <div class="i7-split" data-sub="Headline"><h2 class="h2">${K.statesHead}</h2><p class="lead" style="color:var(--ink-2)">${K.statesLead}</p></div>
        <div class="co-states" data-sub="Plates">${K.states.map(([n, note, k], i) => plate(K.img(k), `0${i + 1}`, n, note)).join('')}
          <div class="co-intro"><b>Seven routes, one study.</b><span>Most research looks at one. Sensoria compares them.</span></div></div>
      </section>
      ${K.coordSec()}
      <section class="i7 i7-sec" data-sec="Gatherings">
        <div class="i7-split" data-sub="Headline"><h2 class="h2">Research happens in rooms like these.</h2><p class="lead" style="color:var(--ink-2)">Dinners, salons and installations where the questions get asked out loud.</p></div>
        <div class="co-photos" data-sub="Photos">${K.plate('dinner.jpg', 'Plate 1', 'Community dinner.', 'duo')}${K.plate('salon.jpg', 'Plate 2', 'A salon conversation.', 'duo')}${K.plate('installation.jpg', 'Plate 3', 'Inside an installation.', 'duo')}</div>
      </section>
      ${K.guideSec()}
      ${K.close()}`,
  });
})();
