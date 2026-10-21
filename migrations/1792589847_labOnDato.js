'use strict';

// Porta la sezione Lab su DatoCMS: modelli lab_index e lab_project, i blocchi delle sezioni,
// i contenuti IT/EN (da migrations/lab, la copia statica usata finora dal sito) e i link al Lab
// (voce di menu e banner del portfolio "Mappe degli Uffizi", che puntava all'URL scritto a mano).
const path = require('path');
const { buildBlockRecord } = require('@datocms/cma-client-node');

const LOCALES = ['it', 'en'];
const MEDIA = path.join(__dirname, 'lab/media');

const plain = { editor: 'textarea', parameters: { placeholder: null }, addons: [] };
const required = { required: {} };
const refs = (ids) => ({
  item_types: ids,
  on_publish_with_unpublished_references_strategy: 'fail',
  on_reference_unpublish_strategy: 'delete_references',
  on_reference_delete_strategy: 'delete_references',
});

/** @param client { import("datocms/lib/cma-client-node").Client } */
module.exports = async (client) => {
  const { getLabProjects, getLabIndex } = await import('./lab/lab-index.js');

  // ---------- Schema ----------

  async function model(attrs, fields) {
    const type = await client.itemTypes.create({ ...attrs });
    for (const [api_key, f] of Object.entries(fields)) {
      await client.fields.create(type, { api_key, ...f });
    }
    return type;
  }
  const str = (label, opts = {}) => ({ label, field_type: 'string', validators: opts.optional ? {} : required, ...opts.extra });
  const txt = (label, hint, opts = {}) => ({ label, field_type: 'text', appearance: plain, hint, validators: opts.optional ? {} : required });
  const lines = (label) => txt(label, 'Una voce per riga.');
  const image = (label) => ({
    label,
    field_type: 'file',
    validators: { ...required, required_alt_title: { alt: true, title: false }, extension: { predefined_list: 'image' } },
  });
  const blocks = (label, types, extra = {}) => ({ label, field_type: 'rich_text', validators: { rich_text_blocks: { item_types: types.map((t) => t.id) } }, ...extra });
  const enumStr = (label, options) => ({
    label,
    field_type: 'string',
    validators: { ...required, enum: { values: options.map((o) => o.value) } },
    appearance: { editor: 'string_radio_group', parameters: { radios: options }, addons: [] },
  });
  const block = (name, api_key, fields) => model({ name, api_key, modular_block: true }, fields);
  const heading = { eyebrow: str('Occhiello'), title: str('Titolo') };

  const labProject = await client.itemTypes.create({
    name: 'Lab: progetto',
    api_key: 'lab_project',
    sortable: true,
    draft_mode_active: true,
    hint: 'Una pagina sotto /lab. L\'ordine della lista è l\'ordine nell\'indice del Lab.',
  });

  const labCard = await block('Lab: card', 'lab_card', { title: str('Titolo'), text: txt('Testo') });
  const labFact = await block('Lab: numero', 'lab_fact', { number: str('Numero', { extra: { hint: 'Es. "75 minuti", "1.887"' } }), label: str('Didascalia') });
  const labChapter = await block('Lab: capitolo', 'lab_chapter', {
    title: str('Titolo'),
    text: txt('Testo'),
    points: lines('Punti elenco'),
    image: image('Immagine'),
  });
  const labStep = await block('Lab: passaggio', 'lab_step', {
    time: str('Ora', { extra: { hint: 'Es. "11:30" o "7/10 11:15"' } }),
    who: enumStr('Chi', [
      { label: 'Noi', value: 'human' },
      { label: 'Agente AI', value: 'ai' },
      { label: 'Noi + agente', value: 'both' },
    ]),
    title: str('Titolo'),
    text: txt('Testo'),
  });
  const pageTypes = (await client.itemTypes.list()).filter((t) =>
    ['service', 'solution', 'technology', 'method', 'case_study', 'company_service'].includes(t.api_key)
  );
  const labService = await block('Lab: servizio', 'lab_service', {
    title: str('Titolo'),
    text: txt('Testo'),
    link: { label: 'Pagina collegata', field_type: 'link', validators: { item_item_type: refs(pageTypes.map((t) => t.id)) } },
    videocall: { label: 'Apre la video call', field_type: 'boolean', hint: 'Al posto della pagina collegata.' },
    link_label: str('Testo del link', { optional: true }),
  });

  const labCards = await block('Lab: card in griglia', 'lab_cards_block', {
    ...heading,
    text: txt('Testo', null, { optional: true }),
    variant: enumStr('Aspetto', [
      { label: 'Colonne su fondo bianco', value: 'columns' },
      { label: 'Riquadri su fondo colorato', value: 'tiles' },
    ]),
    items: blocks('Card', [labCard]),
  });
  const labProjects = await block('Lab: elenco progetti', 'lab_projects_block', {
    ...heading,
    text: txt('Testo', null, { optional: true }),
    projects: { label: 'Progetti', field_type: 'links', validators: { items_item_type: refs([labProject.id]) } },
  });
  const labCallCta = await block('Lab: invito alla video call', 'lab_call_block', {
    title: str('Titolo'),
    text: txt('Testo'),
    call_label: str('Testo del bottone'),
  });
  const labServices = await block('Lab: servizi', 'lab_services_block', {
    ...heading,
    show_links: { label: 'Mostra i link', field_type: 'boolean', hint: 'Spento: le card restano senza link (pagine dei servizi non ancora pronte).' },
    items: blocks('Servizi', [labService]),
  });
  const labFacts = await block('Lab: numeri', 'lab_facts_block', { ...heading, items: blocks('Numeri', [labFact]) });
  const labChapters = await block('Lab: capitoli', 'lab_chapters_block', { ...heading, items: blocks('Capitoli', [labChapter]) });
  const labStory = await block('Lab: racconto', 'lab_story_block', { ...heading, text: txt('Testo'), steps: blocks('Passaggi', [labStep]) });
  const labContact = await block('Lab: contatto e form', 'lab_contact_block', {
    ...heading,
    text: txt('Testo'),
    deliverables: lines('Cosa ottieni'),
    call_label: str('Testo del bottone video call'),
    form_title: str('Titolo del form'),
    form_text: txt('Testo del form'),
    form_interests: lines('Interessi proposti nel form'),
    form_origin: str('Origine del contatto', { extra: { hint: 'Arriva con la richiesta, per capire da quale pagina è partita. Non cambiarla.' } }),
  });

  const loc = { localized: true };
  const projectFields = {
    title: { ...str('Titolo'), ...loc },
    short_title: { ...str('Titolo breve', { extra: { hint: 'Nel menu, nelle briciole e nelle card.' } }), ...loc },
    slug: null, // creato dopo, serve l'id di short_title
    abstract: { ...txt('Sommario'), ...loc },
    preview_text: { ...txt('Testo dell\'anteprima', 'Nella card dell\'indice del Lab.'), ...loc },
    project_status: { ...str('Stato', { extra: { hint: 'Es. "Online"' } }), ...loc },
    project_url: { ...str('Indirizzo del progetto online'), validators: { ...required, format: { predefined_pattern: 'url' } } },
    data_date: { label: 'Data dei dati', field_type: 'date', validators: required, hint: 'Per i dati strutturati (dateModified).' },
    about: { label: 'Soggetto (schema.org)', field_type: 'json', hint: 'Oggetto JSON-LD "about" del progetto.' },
    poster: { ...image('Anteprima del video'), ...loc },
    video: { label: 'Video', field_type: 'file', validators: { ...required, extension: { predefined_list: 'video' } } },
    video_caption: { ...str('Didascalia del video'), ...loc },
    primary_label: { ...str('Bottone verso il progetto online'), ...loc },
    secondary_label: { ...str('Bottone verso il contatto'), ...loc },
    seo: { label: 'SEO', field_type: 'seo', ...loc },
    sections: { ...blocks('Sezioni', [labFacts, labChapters, labStory, labCards, labContact]), ...loc },
  };
  const created = {};
  for (const [api_key, f] of Object.entries(projectFields)) {
    if (!f) continue;
    created[api_key] = await client.fields.create(labProject, { api_key, ...f });
  }
  await client.fields.create(labProject, {
    label: 'Slug',
    api_key: 'slug',
    field_type: 'slug',
    localized: true,
    validators: { ...required, unique: {}, slug_title_field: { title_field_id: created.short_title.id }, slug_format: { predefined_pattern: 'webpage_slug' } },
  });
  await client.itemTypes.update(labProject, { title_field: created.short_title });

  const labIndex = await model(
    { name: 'Lab: indice', api_key: 'lab_index', singleton: true, hint: 'La pagina /lab.' },
    {
      title: { ...str('Titolo', { extra: { hint: 'Ogni frase va a capo; l\'ultima è evidenziata.' } }), ...loc },
      abstract: { ...txt('Sommario'), ...loc },
      seo: { label: 'SEO', field_type: 'seo', ...loc },
      sections: { ...blocks('Sezioni', [labCards, labProjects, labCallCta, labServices]), ...loc },
    }
  );

  // I link interni del sito (voci di menu, link interni) possono puntare al Lab.
  for (const [typeKey, fieldKey] of [['menu_item', 'link'], ['internal_link', 'related_element']]) {
    const field = await client.fields.find(`${typeKey}::${fieldKey}`);
    const v = field.validators.item_item_type;
    await client.fields.update(field, {
      validators: { ...field.validators, item_item_type: { ...v, item_types: [...v.item_types, labIndex.id, labProject.id] } },
    });
  }

  // ---------- Contenuti ----------

  const uploads = {};
  async function upload(src) {
    if (!uploads[src]) {
      const filePath = path.join(MEDIA, src.replace(/^\/lab\//, ''));
      uploads[src] = (await client.uploads.createFromLocalFile({ localPath: filePath, tags: ['lab'] })).id;
    }
    return uploads[src];
  }
  const file = async (src, alt = null) => ({ upload_id: await upload(src), alt, title: null, custom_data: {}, focal_point: null });
  const seo = async (s) => ({ title: s.title, description: s.description, image: await upload(s.image), twitter_card: 'summary_large_image', no_index: false });
  const b = (type, attrs) => buildBlockRecord({ item_type: { id: type.id, type: 'item_type' }, ...attrs });
  const join = (list) => list.join('\n');
  const byLocale = async (fn) => Object.fromEntries(await Promise.all(LOCALES.map(async (l) => [l, await fn(l)])));

  async function projectSections(p) {
    const s = [
      b(labFacts, { eyebrow: p.facts.eyebrow, title: p.facts.title, items: p.facts.items.map((f) => b(labFact, { number: f.number, label: f.label })) }),
    ];
    if (p.chapters) {
      s.push(
        b(labChapters, {
          eyebrow: p.chapters.eyebrow,
          title: p.chapters.title,
          items: await Promise.all(
            p.chapters.items.map(async (c) =>
              b(labChapter, { title: c.title, text: c.text, points: join(c.points), image: await file(c.image.src, c.image.alt) })
            )
          ),
        })
      );
    }
    s.push(
      b(labStory, {
        eyebrow: p.story.eyebrow,
        title: p.story.title,
        text: p.story.text,
        steps: p.story.steps.map((st) => b(labStep, { time: st.time, who: st.who, title: st.title, text: st.text })),
      }),
      b(labCards, {
        eyebrow: p.tools.eyebrow,
        title: p.tools.title,
        text: p.tools.text,
        variant: 'tiles',
        items: p.tools.items.map((t) => b(labCard, { title: t.title, text: t.text })),
      }),
      b(labContact, {
        eyebrow: p.cta.eyebrow,
        title: p.cta.title,
        text: p.cta.text,
        deliverables: join(p.cta.deliverables),
        call_label: p.cta.callLabel,
        form_title: p.cta.formTitle,
        form_text: p.cta.formText,
        form_interests: join(p.cta.interests),
        form_origin: p.cta.origin,
      })
    );
    return s;
  }

  // Lo stesso progetto ha lo stesso `id` statico in ogni lingua.
  const projectIds = {};
  for (const it of getLabProjects('it')) {
    const p = Object.fromEntries(LOCALES.map((l) => [l, getLabProjects(l).find((x) => x.id === it.id)]));
    const pick = (fn) => Object.fromEntries(LOCALES.map((l) => [l, fn(p[l])]));
    const record = await client.items.create({
      item_type: labProject,
      title: pick((x) => x.title),
      short_title: pick((x) => x.shortTitle),
      slug: pick((x) => x.slug),
      abstract: pick((x) => x.abstract),
      preview_text: pick((x) => x.previewText),
      project_status: pick((x) => x.status),
      project_url: it.atlasUrl,
      data_date: it.dataDate,
      about: JSON.stringify(it.about),
      poster: await byLocale((l) => file(p[l].media.poster, p[l].media.alt)),
      video: await file(it.media.video),
      video_caption: pick((x) => x.media.caption),
      primary_label: pick((x) => x.heroActions.primary.label),
      secondary_label: pick((x) => x.heroActions.secondary.label),
      seo: await byLocale((l) => seo(p[l].seo)),
      sections: await byLocale((l) => projectSections(p[l])),
    });
    await client.items.publish(record);
    projectIds[it.id] = record.id;
  }

  async function findBySlug(type, slug) {
    const [item] = await client.items.list({ filter: { type, fields: { slug: { eq: slug } } }, locale: 'it', version: 'current' });
    return item?.id ?? null;
  }
  // I link dei servizi erano URL: diventano link ai record (le pagine EN sono le traduzioni degli stessi record).
  const serviceLinks = {};
  for (const item of getLabIndex('it').services.items) {
    const m = item.href?.match(/^\/(tecnologie|soluzioni)\/([\w-]+)$/);
    serviceLinks[item.id] = m ? await findBySlug(m[1] === 'tecnologie' ? 'technology' : 'solution', m[2]) : null;
  }

  const indexSections = (x) => [
    b(labCards, {
      eyebrow: x.manifesto.eyebrow,
      title: x.manifesto.title,
      text: null,
      variant: 'columns',
      items: x.manifesto.items.map((m) => b(labCard, { title: m.title, text: m.text })),
    }),
    b(labProjects, {
      eyebrow: x.projects.eyebrow,
      title: x.projects.title,
      text: x.projects.text,
      projects: getLabProjects('it').map((p) => projectIds[p.id]),
    }),
    b(labCallCta, { title: x.cta.title, text: x.cta.text, call_label: x.cta.callLabel }),
    b(labServices, {
      eyebrow: x.services.eyebrow,
      title: x.services.title,
      show_links: x.services.showLinks !== false,
      items: x.services.items.map((s) =>
        b(labService, { title: s.title, text: s.text, link: serviceLinks[s.id] ?? null, videocall: Boolean(s.call), link_label: s.linkLabel ?? null })
      ),
    }),
  ];
  const ix = Object.fromEntries(LOCALES.map((l) => [l, getLabIndex(l)]));
  const pickIx = (fn) => Object.fromEntries(LOCALES.map((l) => [l, fn(ix[l])]));
  const labIndexRecord = await client.items.create({
    item_type: labIndex,
    title: pickIx((x) => x.title),
    abstract: pickIx((x) => x.abstract),
    seo: await byLocale((l) => seo(ix[l].seo)),
    sections: pickIx(indexSections),
  });

  // ---------- Link al Lab ----------

  // Voce "Lab" nel menu principale, dopo "Case studies" (prima la aggiungeva il codice, withLabMenu).
  const [caseStudiesIndex] = await client.items.list({ filter: { type: 'case_studies_index' } });
  const [menu] = await client.items.list({ filter: { type: 'menu' }, nested: true });
  const menuLevels = {};
  for (const l of LOCALES) {
    const levels = menu.menu_first_levels[l] || [];
    const after = levels.findIndex((blk) => blk.attributes.link === caseStudiesIndex.id);
    const ids = levels.map((blk) => blk.id);
    const labItem = b(await client.itemTypes.find('menu_item'), { label: 'Lab', link: labIndexRecord.id, tag: null });
    const at = after === -1 ? ids.length : after + 1;
    menuLevels[l] = [...ids.slice(0, at), labItem, ...ids.slice(at)];
  }
  await client.items.update(menu, { menu_first_levels: menuLevels });

  // Banner del portfolio "Mappe degli Uffizi": da link esterno scritto a mano a link interno al progetto.
  const atlasId = projectIds['lab-atlante-uffizi'];
  const internalLinks = {};
  for await (const work of client.items.listPagedIterator({ filter: { type: 'work' }, nested: true, version: 'current' })) {
    let changed = false;
    const blocksByLocale = {};
    for (const l of LOCALES) {
      blocksByLocale[l] = [];
      for (const blk of work.blocks?.[l] || []) {
        const linkId = blk.attributes.link;
        if (!linkId || typeof linkId !== 'string') {
          blocksByLocale[l].push(blk.id);
          continue;
        }
        const link = await client.items.find(linkId).catch(() => null);
        const url = link?.url?.[l] ?? '';
        if (!/^https?:\/\/(www\.)?cantierecreativo\.net(\/en)?\/lab(\/|$)/.test(url)) {
          blocksByLocale[l].push(blk.id);
          continue;
        }
        internalLinks[linkId] ??= (
          await client.items.create({
            item_type: await client.itemTypes.find('internal_link'),
            label: link.label,
            related_element: url.includes('/lab/') ? atlasId : labIndexRecord.id,
            link_contact_form: false,
          })
        ).id;
        blocksByLocale[l].push(buildBlockRecord({ id: blk.id, link: internalLinks[linkId] }));
        changed = true;
      }
    }
    if (!changed) continue;
    const wasPublished = work.meta.status === 'published';
    await client.items.update(work, { blocks: blocksByLocale });
    // Si ripubblica solo se non c'erano bozze in sospeso, per non pubblicare modifiche altrui.
    if (wasPublished) await client.items.publish(work);
  }
};
