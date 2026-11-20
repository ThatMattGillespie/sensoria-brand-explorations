/* Final brand guide: principles, colour, type, imagery, margin stickers, motion and layout, under the landing page.
   Values are read from the live page where possible (font sizes, line heights, tracking, contrast), so the guide
   always matches the mock-up above it. An option can override the colour mix with D.guide.mix. */
(function () {
  const R = window.REFRACT, C = R.C;

  const PALETTE = [
    ['Paper', C.SURFACE, 'Main surface: pages, slides, cards in video. Warm, matte, never pure white.'],
    ['White', C.WHITE, 'Print borders, sticker edges, cards. The edge that holds every cut-out.'],
    ['Deep teal', C.TEAL, 'All text on paper, and the one teal surface per page.'],
    ['Ink 2', '#4C6466', 'Secondary text: labels, notes, the second half of a headline.'],
    ['Amber', C.AMBER, 'The accent on teal: a caption’s key word, the main button on the stage. One per view.'],
    ['Turquoise', C.TURQ, 'Small details only: the headline fringe, a dot. Never text, never a fill.'],
    ['Amber ink', C.AMBER_INK, 'Amber on paper, for a rare mark. Large or decorative only.'],
  ];
  const STAGE = 'radial-gradient(ellipse 70% 60% at 50% 42%, #1A5259 0%, #0A3238 55%, #05272B 100%)';
  const MIX = [['Paper', 58, C.SURFACE], ['White', 15, C.WHITE], ['Deep teal', 23, C.TEAL], ['Spectrum', 1, 'linear-gradient(90deg,' + R.SPECTRUM.join(',') + ')'], ['Amber', 2, C.AMBER], ['Turquoise', 1, C.TURQ]];
  const STATES = ['Dreaming & hypnagogia', 'Meditation & contemplation', 'Mystical & religious experience', 'Aesthetic experience', 'Breathwork, trance & flow', 'Technodelics', 'Psychedelics'];

  // WCAG contrast
  const lum = (hex) => {
    const c = hex.replace('#', '').match(/../g).map((h) => parseInt(h, 16) / 255).map((v) => (v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4));
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + .05) / (y + .05); };
  const grade = (r) => (r >= 7 ? 'AAA, any size' : r >= 4.5 ? 'AA, any size' : r >= 3 ? 'AA, large text only' : 'Decoration only');
  const PAIRS = [
    ['Deep teal on paper', C.TEAL, C.SURFACE, 'Body, headlines'],
    ['Ink 2 on paper', '#4C6466', C.SURFACE, 'Labels, secondary text'],
    ['White on deep teal', C.WHITE, C.TEAL, 'Text on the stage'],
    ['Amber on deep teal', C.AMBER, C.TEAL, 'Key word, button'],
    ['Deep teal on amber', C.TEAL, C.AMBER, 'Button label'],
    ['Deep teal on white', C.TEAL, C.WHITE, 'Text on cards and prints'],
    ['Paper on deep teal', C.SURFACE, C.TEAL, 'Warm text on the stage'],
    ['Amber ink on paper', C.AMBER_INK, C.SURFACE, 'Rare marks'],
  ];

  // type roles: [name, selector on this page, sample, where it is used]
  const ROLES = [
    ['Display XL', '.hero .display', 'Non-ordinary states', 'The hero headline. One per page.'],
    ['Display L', '.section-head .h2', 'Not just psychedelics.', 'Section headlines.'],
    ['Display M', '.state-list .state-name', 'Aesthetic experience', 'List items, card titles.'],
    ['Stat', '.stat-big', 'Unknown', 'One word or number, in the text colour of its ground.'],
    ['Lead', '.hero .lead', 'Do states beyond ordinary waking consciousness have a role?', 'The sentence under a headline.'],
    ['Body', '.coord .body p', 'Scientists, scholars and artists engage these states privately.', 'Running text. 62 characters a line at most.'],
    ['Button', '.hero .btn-primary', 'Take the survey study', 'Buttons, in Funnel Sans medium.'],
    ['Label', '.hero .eyebrow', '01 · Survey study · open now', 'Eyebrows, navigation, metadata. Uppercase, tracked.'],
    ['Caption', '.print figcaption', 'Community dinner', 'Print captions and tags.'],
  ];
  const SOCIAL = [
    ['Carousel title', 'Funnel Display', '8.4% of width', 91], ['Carousel text', 'Funnel Sans', '3.3%', 36], ['Carousel label', 'Fragment Mono', '1.6%', 17],
    ['Video title', 'Funnel Display', '12.5%', 135], ['Video caption', 'Funnel Sans semibold', '5.4%', 58], ['Video name badge', 'Funnel Sans semibold', '4.4%', 48], ['Video label', 'Fragment Mono', '2.4%', 26],
  ];

  const sub = (code, title, body, cls = '') => `<div class="g-sub ${cls}" data-sub="${title}"><h3 class="g-h"><span>${title}</span></h3>${body}</div>`;
  const head = (title, note) => `<div class="block-head"><span class="label">${title}</span><span class="label">${note}</span></div>`;

  window.GUIDE = (D) => {
    const mix = (D.guide && D.guide.mix) || MIX;
    const colour = `
      <div class="block guide" data-sec="Colour">${head('Colour', 'Palette · proportion · spectrum · contrast')}
        ${sub('A', 'Core palette', `<div class="g-pal">${PALETTE.map(([n, v, role]) => `
          <div class="g-sw"><i style="background:${v}"></i><b>${n}</b><code>${v}</code><code class="rgb">${v.replace('#', '').match(/../g).map((h) => parseInt(h, 16)).join(' ')}</code><p>${role}</p></div>`).join('')}
          <div class="g-sw"><i style="background:${STAGE}"></i><b>Stage</b><code>#1A5259 → #05272B</code><code class="rgb">radial, light behind</code><p>The lit teal ground from the videos: lighter behind the subject, with a soft grain.</p></div></div>`)}
        ${sub('B', 'Proportion', `<div class="g-mix">${mix.map(([n, p, c]) => `<i style="flex:${p};background:${c}" title="${n} ${p}%"></i>`).join('')}</div>
          <div class="g-mixkey">${mix.map(([n, p, c]) => `<span><i style="background:${c}"></i>${n} <b>${p}%</b></span>`).join('')}</div>
          <p class="g-note">${(D.guide && D.guide.mixNote) || 'Roughly how much of a page each colour covers. Paper carries the page; teal is text plus one surface; colour arrives in photos, with the spectrum only as small marks.'}</p>`)}
        ${sub('C', 'Spectrum', `<div class="g-spec">${STATES.map((s, i) => `
          <div class="g-row"><span class="g-num">0${i + 1}</span><img src="media/${R.OBJ[R.STATE_OBJ[i]]}" alt=""><span class="g-name">${s}</span>
            <span class="g-chip" style="background:${R.SPECTRUM[i]}"></span><code>${R.SPECTRUM[i]}</code>
            <span class="g-chip on-teal" style="background:${R.SPECTRUM_LIGHT[i]}"></span><code>${R.SPECTRUM_LIGHT[i]}</code></div>`).join('')}
          <div class="g-row g-row-head"><span></span><span></span><span></span><span class="label" style="grid-column:span 2">On paper</span><span class="label" style="grid-column:span 2">On teal</span></div></div>
          <p class="g-note">One hue per state, all at the same lightness so none shouts. The spectrum is for small marks only: a dot in a photo tag, the strip under a video title, a chip in a diagram. Never text, never a fill or a background. Type stays two-colour: deep teal on paper, white on teal.</p>`)}
        ${sub('D', 'Contrast', `<div class="g-pairs">${PAIRS.map(([n, fg, bg, use]) => {
          const r = ratio(fg, bg);
          return `<div class="g-pair" style="background:${bg};color:${fg}"><span class="g-aa">Aa</span><span class="g-pn">${n}</span><span class="g-r">${r.toFixed(1)}:1 · ${grade(r)}</span><span class="g-use">${use}</span></div>`;
        }).join('')}</div>`)}
      </div>`;

    const type = `
      <div class="block guide" data-sec="Type">${head('Type', 'Families · scale · social sizes · headline rules')}
        ${sub('A', 'Families', `<div class="g-fam">
          <div><span class="g-aa" style="font-family:var(--font-display)">Aa</span><b>Funnel Display</b><span class="label">“Refract” · headlines, stats · 400</span><p style="font-family:var(--font-display)">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz 0123456789</p></div>
          <div><span class="g-aa" style="font-family:var(--font-text)">Aa</span><b>Funnel Sans</b><span class="label">Text, leads, buttons, captions · 400, 500, 600</span><p style="font-family:var(--font-text)">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz 0123456789</p></div>
          <div><span class="g-aa" style="font-family:var(--font-label)">Aa</span><b>Fragment Mono</b><span class="label">Labels, numbers, metadata · 400</span><p style="font-family:var(--font-label)">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz 0123456789</p></div>
          </div><p class="g-note">All three are open-licensed (SIL OFL) Google Fonts. Display stands in for FF Blur; the faint blur and fringe come from the headline treatment, not the font.</p>`)}
        ${sub('B', 'Scale', `<div class="g-scale">${ROLES.map(([n, sel, sample, use]) => `
          <div class="g-step" data-sel="${sel}"><div class="g-meta"><b>${n}</b><code class="g-spec-v">…</code><span>${use}</span></div><div class="g-sample">${sample}</div></div>`).join('')}</div>
          <p class="g-note">Sizes and spacing are read from the page above at this window width. Display sizes scale with the window between their minimum and maximum.</p>`)}
        ${sub('C', 'Social sizes', `<table class="g-tab"><thead><tr><th>Role</th><th>Font</th><th>Size</th><th>At 1080 px wide</th></tr></thead><tbody>
          ${SOCIAL.map(([r, f, s, px]) => `<tr><td>${r}</td><td>${f}</td><td>${s}</td><td><b>${px} px</b></td></tr>`).join('')}</tbody></table>
          <p class="g-note">Sizes are set as a share of the frame width, so a carousel slide or reel scales as one piece. Video captions never go below 54 px at 1080.</p>`)}
        ${sub('D', 'Headline rules', `<div class="g-rules">
          <div><h4>Treatment</h4><p>Headlines carry a faint blur mask that follows the cursor and a turquoise and amber fringe of 0.018em. Barely there: it should read as light, not as an effect.</p></div>
          <div><h4>Setting</h4><p>Sentence case, tracking −0.035em, balanced line breaks. One idea per headline. A second clause may drop to Ink 2.</p></div>
          <div><h4>Objects in type</h4><p>At most one sticker per headline, set after a word at 0.78em, on the baseline. It sits beside a word; it never replaces one.</p></div>
          <div><h4>Avoid</h4><p>Italic display, all caps display, more than two weights in a view, and spectrum colour in any text.</p></div>
          </div>`)}
      </div>`;

    const principles = `
      <div class="block guide" data-sec="Principles">${head('Principles', 'Five rules everything else follows')}
        <div class="g-princ">${[
          ['Paper first', 'Warm paper carries the page. Deep teal is the ink, and the one teal surface per page.'],
          ['Two-colour type', 'Deep teal on paper, white on teal. Amber marks one word, and only on teal. No other colour touches text.'],
          ['Real material first', 'Sensoria’s own photos, people and illustrations lead. Generated photos fill in objects nobody photographed.'],
          ['Stickers with intent', 'Every cut-out has the same white edge and a reason to be where it is: in a collage, a list, a headline, or beside the idea it belongs to.'],
          ['Light, not effects', 'Blur, fringe and motion stay barely there. Pointing at things rewards curiosity; nothing moves on its own except a slow drift, and everything holds still under reduced motion.'],
        ].map(([t, d], i) => `<div data-sub="${t}"><span class="g-pn">0${i + 1}</span><h4>${t}</h4><p>${d}</p></div>`).join('')}</div>
        <p class="g-note">Logo: Sensoria Research and Sensoria Events are getting new marks. The mark in the mock-up is a stand-in; this guide will add a logo section when the files arrive.</p>
      </div>`;

    const imagery = `
      <div class="block guide" data-sec="Imagery">${head('Imagery', 'Prints · stickers · planes')}
        ${sub('A', 'Prints', `<div class="g-two"><div class="g-demo">${R.print('media/dinner.jpg', 'left:12%;top:10%;width:76%;height:70%;--r:-2deg', 'duo', 'Community dinner')}</div>
          <ul class="g-list"><li><b>Border</b>White, 2.2% of the print’s width on three sides, 6.5% at the bottom, where the caption sits.</li><li><b>Angle</b>Between −4° and 4°. Never straight, never more.</li><li><b>Tone</b>People and events in teal duotone. Colour photos only when the colour is the point, tagged with their state (a spectrum dot, the name in Ink 2).</li><li><b>Caption</b>Fragment Mono 10 px, uppercase, Ink 2.</li></ul></div>`)}
        ${sub('B', 'Stickers', `<div class="g-two"><div class="g-demo g-stk">${['goggles', 'standing', 'flask', 'vr', 'headphones', 'walker'].map((k, i) => `<img src="media/${R.OBJ[k]}" alt="" style="--i:${i}">`).join('')}</div>
          <ul class="g-list"><li><b>Edge</b>One white edge, 3 px at any size (1.5 px on small inline stickers), drawn by the page, never baked into the image.</li><li><b>Shadow</b>Soft, falling down and to the front. Deeper planes cast longer shadows.</li><li><b>Sources</b>Sensoria’s own photos and illustrations first; generated product photos for objects. <a href="objects.html">All objects and their codes</a>.</li><li><b>Placement</b>In a collage, in a list, after a word, over an edge. About one surprise per screenful.</li></ul></div>`)}
        ${sub('C', 'Planes & motion', `<div class="g-two"><div class="g-demo g-planes">${[['−1', 'Print at the back', 'moves 0'], ['0', 'Objects', 'moves 1×'], ['1', 'Objects in front', '2×'], ['2', 'One person', '3×']].map(([d, n, m], i) => `<div style="--i:${i}"><b>${d}</b><span>${n}</span><em>${m}</em></div>`).join('')}</div>
          <ul class="g-list"><li><b>Depth</b>Three or four planes. Each step forward moves about 14 px more with the cursor.</li><li><b>Idle</b>With nobody pointing, the planes drift on a slow loop (about 5 s).</li><li><b>Video</b>A multiplane push over 6 s: the back barely moves, the front moves most.</li><li><b>Reduced motion</b>Everything holds still.</li></ul></div>`)}
      </div>`;

    const margins = `
      <div class="block guide" data-sec="Margin stickers">${head('Stickers in the margin', 'The occasional surprise, placed on purpose')}
        ${sub('A', 'Rules', `<div class="g-rules">
          <div><h4>One per section, at most</h4><p>Three or four on a whole page. More than that turns a surprise into wallpaper.</p></div>
          <div><h4>Beside its idea</h4><p>A figure sits next to the thing it stands for: the person in VR beside “Technodelics”, a walker heading for “Unknown”. If you can’t say why it is there, it goes.</p></div>
          <div><h4>On an edge, never on text</h4><p>In the page margin, standing on a rule, or looking over a section edge. Never over words, buttons or faces in photos.</p></div>
          <div><h4>Responds, then settles</h4><p>Pointed at, it moves the way its figure would: leans in, rises, steps forward. Hidden when the margin is too narrow (below 1320 px wide) unless it stands on a rule.</p></div>
          </div>`)}
        ${sub('B', 'On this page', `<div class="g-mgn">${(R.MARGIN || []).map(([k, where, why]) => `
          <div><div class="g-mgn-img"><img src="media/${R.OBJ[k]}" alt=""></div><b>${where}</b><p>${why}</p></div>`).join('')}</div>`)}
      </div>`;

    const motion = `
      <div class="block guide" data-sec="Motion">${head('Motion & interaction', 'What moves, how far, and what you can touch')}
        ${sub('A', 'Values', `<table class="g-tab"><thead><tr><th>Behaviour</th><th>Trigger</th><th>Amount</th><th>Feel</th></tr></thead><tbody>
          <tr><td>Hero planes</td><td>Cursor over the hero</td><td>14 px per plane, front moves most</td><td>Eases in, about 1 s to settle</td></tr>
          <tr><td>Hero planes</td><td>Page scroll</td><td>36 px per plane across a screen of scroll</td><td>Tied to the scroll, no lag</td></tr>
          <tr><td>Idle drift</td><td>Nobody pointing</td><td>Half the cursor range</td><td>Slow loop, about 5 s</td></tr>
          <tr><td>Headline focus</td><td>Cursor over a headline</td><td>Blur mask follows, fringe points at it</td><td>Eases at 4.5% a frame</td></tr>
          <tr><td>State sticker</td><td>Pointing at a state</td><td>Grows to 1.7×, tilts −6°</td><td>Spring, 0.28 s</td></tr>
          <tr><td>Margin sticker</td><td>Pointing at it</td><td>Leans, rises or steps, 14 to 16 px</td><td>Spring, 0.35 s</td></tr>
          <tr><td>Video push</td><td>Every scene</td><td>Back plane still, front plane about 3%</td><td>6 s, slow in and out</td></tr>
          <tr><td colspan="4"><b>Reduced motion:</b> every one of these is off. Stickers stay put, planes hold still, headlines stay sharp.</td></tr>
          </tbody></table>`)}
        ${sub('B', 'Try it', `<div class="g-try"><ol class="state-list g-try-list">${R.STATE_OBJ.slice(0, 4).map((k, i) => `<li><span class="state-num">0${i + 1}</span><img class="state-obj" src="media/${R.OBJ[k]}" alt=""><span class="state-name">${R.STATE_SHORT[i]}</span></li>`).join('')}</ol>
          <p class="g-note">Point at a row. The sticker answers; the type does not move.</p></div>`)}
      </div>`;

    const layout = `
      <div class="block guide" data-sec="Layout">${head('Layout', 'Grid · spacing · corners')}
        ${sub('A', 'Grid', `<div class="g-grid-demo"><div class="g-gd-page"><i style="flex:7"><span>7</span></i><i style="flex:5"><span>5</span></i></div></div>
          <ul class="g-list g-wide" style="margin-top:20px">
            <li><b>Width</b><span data-live=".wrap" data-prop="max-width">1280 px</span> at most, centred. Side padding <span data-live=".wrap" data-prop="padding-left">48 px</span>, 16 px on phones.</li>
            <li><b>Columns</b>Hero and section heads split 7 : 5 with a 64 px gap. Copy on the left, image or note on the right.</li>
            <li><b>Measure</b>Body text 62 characters a line at most; leads 32.</li>
          </ul>`)}
        ${sub('B', 'Spacing', `<div class="g-space">${[[8, 'Inline'], [16, 'Tight'], [24, 'Group'], [40, 'Block'], [64, 'Column gap'], [96, 'Section']].map(([v, n]) => `<div><i style="height:${v}px;width:${v}px"></i><b>${v}</b><span>${n}</span></div>`).join('')}</div>
          <p class="g-note">An 8 px base. Sections sit 96 px apart top and bottom; the hero gets 72 px above and 104 px below.</p>`)}
        ${sub('C', 'Corners and lines', `<ul class="g-list g-wide">
            <li><b>Corners</b>3 px on images and slides, 6 px on guide cards, 10 px on video frames, round on buttons.</li>
            <li><b>Rules</b>1 px hairlines in deep teal at 12% (light) and 28% (strong). They divide lists and sit under labels; stickers may stand on them.</li>
            <li><b>Edges</b>Sections end in a clean straight edge. No torn or deckled paper.</li>
          </ul>`)}
      </div>`;
    return principles + colour + type + imagery + margins + motion + layout;
  };

  // fill the type scale from the live page
  window.GUIDE_INIT = () => {
    document.querySelectorAll('[data-live]').forEach((el) => {
      const src = document.querySelector(el.dataset.live);
      if (src) el.textContent = Math.round(parseFloat(getComputedStyle(src)[el.dataset.prop.replace(/-(.)/g, (m, c) => c.toUpperCase())])) + ' px';
    });
    const px = (v) => Math.round(parseFloat(v) * 10) / 10;
    document.querySelectorAll('.g-step').forEach((row) => {
      const el = document.querySelector(row.dataset.sel);
      const sample = row.querySelector('.g-sample');
      if (!el) { row.remove(); return; }
      const cs = getComputedStyle(el);
      ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform'].forEach((k) => { sample.style[k] = cs[k]; });
      const fam = cs.fontFamily.split(',')[0].replace(/['"]/g, '');
      const size = px(cs.fontSize);
      const lh = cs.lineHeight === 'normal' ? 'normal' : (parseFloat(cs.lineHeight) / parseFloat(cs.fontSize)).toFixed(2);
      const tr = cs.letterSpacing === 'normal' ? '0' : (parseFloat(cs.letterSpacing) / parseFloat(cs.fontSize)).toFixed(3) + 'em';
      row.querySelector('.g-spec-v').textContent = `${fam} · ${cs.fontWeight} · ${size} px / ${lh} · ${tr}`;
    });
  };

  window.GUIDE_CSS = `
    .guide .g-sub { margin-top: 40px; }
    .guide .g-sub:first-of-type { margin-top: 8px; }
    .g-h { font: 400 26px/1.1 var(--font-display); letter-spacing: -.02em; margin-bottom: 18px; }
    .g-note { margin-top: 14px; max-width: 70ch; font-size: 14px; color: var(--ink-2); }
    .guide code { font: 11px var(--font-label); letter-spacing: .04em; color: var(--ink-2); }
    .g-pal { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .g-sw i { display: block; height: 96px; border-radius: 6px; box-shadow: inset 0 0 0 1px var(--line); margin-bottom: 10px; }
    .g-sw b { display: block; font: 500 15px var(--font-text); }
    .g-sw code { display: block; text-transform: uppercase; }
    .g-sw p { font-size: 13px; line-height: 1.45; color: var(--ink-2); margin-top: 6px; }
    .g-mix { display: flex; height: 56px; border-radius: 6px; overflow: hidden; box-shadow: inset 0 0 0 1px var(--line); }
    .g-mix { background: var(--line); gap: 1px; padding: 1px; }
    .g-mix i { border-radius: 2px; }
    .g-mixkey { display: flex; flex-wrap: wrap; gap: 8px 22px; margin-top: 12px; font-size: 13px; }
    .g-mixkey span { display: inline-flex; align-items: center; gap: 6px; }
    .g-mixkey i { width: 12px; height: 12px; border-radius: 3px; box-shadow: inset 0 0 0 1px var(--line); }
    .g-spec { display: grid; }
    .g-row { display: grid; grid-template-columns: 40px 48px 1fr 28px 90px 28px 90px; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid var(--line); }
    .g-row img { width: 40px; height: 32px; object-fit: contain; filter: var(--edge-sm) drop-shadow(0 2px 3px rgba(5,39,43,.25)); }
    .g-row-head { border: 0; order: -1; padding-bottom: 4px; }
    .g-num { font: 12px var(--font-label); }
    .g-name { font: 400 20px var(--font-display); letter-spacing: -.02em; }
    .g-chip { width: 28px; height: 28px; border-radius: 50%; }
    .g-chip.on-teal { box-shadow: 0 0 0 4px ${C.TEAL}; }
    .g-pairs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    .g-pair { border-radius: 6px; padding: 16px; display: grid; gap: 4px; box-shadow: inset 0 0 0 1px var(--line); }
    .g-pair .g-aa { font: 400 40px/1 var(--font-display); }
    .g-pair .g-pn { font: 500 14px var(--font-text); }
    .g-pair .g-r, .g-pair .g-use { font: 11px var(--font-label); letter-spacing: .04em; opacity: .85; }
    .g-fam { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    .g-fam > div { border-top: 1px solid var(--line); padding-top: 14px; display: grid; gap: 6px; align-content: start; }
    .g-fam .g-aa { font-size: 88px; line-height: 1; }
    .g-fam b { font: 500 17px var(--font-text); }
    .g-fam p { font-size: 15px; line-height: 1.5; color: var(--ink-2); margin-top: 6px; }
    .g-step { display: grid; grid-template-columns: 280px 1fr; gap: 32px; align-items: baseline; padding: 18px 0; border-bottom: 1px solid var(--line); }
    .g-step:first-child { border-top: 1px solid var(--line-strong); }
    .g-meta { display: grid; gap: 4px; }
    .g-meta b { font: 500 15px var(--font-text); }
    .g-meta span { font-size: 13px; color: var(--ink-2); }
    .g-sample { color: var(--ink); min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .g-tab { width: 100%; border-collapse: collapse; font-size: 14px; }
    .g-tab th { text-align: left; font: 11px var(--font-label); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-2); font-weight: 400; padding: 8px 0; border-bottom: 1px solid var(--line-strong); }
    .g-tab td { padding: 10px 0; border-bottom: 1px solid var(--line); }
    .g-rules { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .g-rules > div { border-top: 1px solid var(--line); padding-top: 12px; }
    .g-rules h4 { font: 11px var(--font-label); letter-spacing: .12em; text-transform: uppercase; font-weight: 400; margin-bottom: 6px; }
    .g-rules p { font-size: 14px; line-height: 1.5; }
    .g-two { display: grid; grid-template-columns: 5fr 7fr; gap: 40px; align-items: center; }
    .g-demo { position: relative; aspect-ratio: 16 / 10; background: var(--ground); border-radius: 6px; overflow: hidden; }
    .g-stk { display: flex; align-items: center; justify-content: center; gap: 4%; padding: 0 4%; }
    .g-stk { gap: 3%; }
    .g-stk img { height: calc(30% + var(--i) % 3 * 10%); width: auto; max-width: 14%; object-fit: contain; filter: var(--edge) drop-shadow(0 8px 10px rgba(5,39,43,.3)); rotate: calc((var(--i) % 2 * 2 - 1) * 3deg); }
    .g-planes { display: block; perspective: 900px; }
    .g-planes div { position: absolute; left: calc(8% + var(--i) * 15%); top: calc(8% + var(--i) * 18%); width: 40%; height: 30%; border-radius: 4px; background: rgba(254,254,254,.86); box-shadow: 0 calc(4px + var(--i) * 6px) calc(10px + var(--i) * 8px) -6px rgba(5,39,43,.4), inset 0 0 0 1px var(--line); padding: 10px 12px; display: grid; align-content: start; gap: 2px; font-size: 13px; }
    .g-planes div:first-child { background: ${C.TEAL}; color: ${C.WHITE}; }
    .g-planes b { font: 400 22px/1 var(--font-display); }
    .g-planes em { font: 11px var(--font-label); font-style: normal; opacity: .7; }
    .g-list { list-style: none; display: grid; gap: 12px; }
    .g-list li { border-top: 1px solid var(--line); padding-top: 10px; font-size: 15px; line-height: 1.5; }
    .g-list b { display: block; font: 11px var(--font-label); letter-spacing: .12em; text-transform: uppercase; font-weight: 400; color: var(--ink-2); margin-bottom: 2px; }
    .g-list a { color: inherit; }
    .g-wide { grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .g-princ { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
    .g-princ > div { border-top: 2px solid var(--ink); padding-top: 12px; }
    .g-princ .g-pn { font: 12px var(--font-label); color: var(--ink-2); }
    .g-princ h4 { font: 400 24px/1.1 var(--font-display); letter-spacing: -.02em; margin: 8px 0 8px; }
    .g-princ p { font-size: 14px; line-height: 1.5; color: var(--ink-2); }
    .g-mgn { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .g-mgn-img { height: 150px; background: var(--ground); border-radius: 6px; display: grid; place-items: center; margin-bottom: 12px; }
    .g-mgn-img img { max-height: 120px; max-width: 70%; filter: var(--edge) drop-shadow(0 8px 10px rgba(5,39,43,.3)); }
    .g-mgn b { font: 500 15px var(--font-text); }
    .g-mgn p { font-size: 14px; line-height: 1.5; color: var(--ink-2); margin-top: 4px; }
    .g-try-list { max-width: 640px; }
    .g-try-list li { grid-template-columns: 56px 56px 1fr; }
    .g-grid-demo { background: var(--ground); border-radius: 6px; padding: 20px 48px; }
    .g-gd-page { display: flex; gap: 32px; height: 120px; }
    .g-gd-page i { background: rgba(5,39,43,.08); border: 1px dashed var(--line-strong); border-radius: 3px; display: grid; place-items: center; font: 400 28px var(--font-display); color: var(--ink-2); }
    .g-space { display: flex; align-items: flex-end; gap: 28px; flex-wrap: wrap; }
    .g-space div { display: grid; gap: 6px; justify-items: start; font-size: 13px; }
    .g-space i { display: block; background: var(--ink); opacity: .85; border-radius: 2px; }
    .g-space b { font: 12px var(--font-label); }
    .g-space span { color: var(--ink-2); }
    @media (max-width: 960px) {
      .g-princ, .g-mgn { grid-template-columns: 1fr; }
      .g-pal, .g-pairs { grid-template-columns: repeat(2, 1fr); } .g-fam, .g-rules, .g-two, .g-wide { grid-template-columns: 1fr; }
      .g-step { grid-template-columns: 1fr; gap: 8px; } .g-row { grid-template-columns: 30px 40px 1fr 24px 72px; } .g-row > :nth-child(n+6) { display: none; }
    }
  `;
})();
