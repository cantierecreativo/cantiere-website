# Traduzione IT → EN dei contenuti DatoCMS

Pipeline locale in tre passi. Riscrive il locale `en` dei modelli del sito pubblico traducendo dall'italiano
(il blog è escluso). L'EN esistente su Dato viene sostituito, non riusato.

## Prerequisiti in `.env.local`

```
DATOCMS_CMA_TOKEN=...      # token CMA full-access, solo per la durata dell'operazione, poi rimuoverlo
ANTHROPIC_API_KEY=...
TRANSLATE_MODEL=...        # opzionale, default claude-opus-5-5
```

L'environment è `NEXT_PUBLIC_DATO_ENV` (oggi `version-25`). Gli script rifiutano di partire se è vuoto.

## Ordine

```bash
bun run i18n:check                                # self-check offline della logica dei path
bun run i18n:export                               # sola lettura: scripts/i18n/data/export = BACKUP
bun run i18n:translate -- --ids <id1>,<id2>,<id3> # pilota: leggere data/translated/<id>.json
bun run i18n:import -- --ids <id1>,<id2>,<id3> --dry-run
bun run i18n:import -- --ids <id1>,<id2>,<id3>    # pilota in scrittura: verificare il tab EN nel CMS
bun run i18n:translate                            # tutto (riprende da dove si era fermato)
bun run i18n:import -- --dry-run                  # tutto, nessuna scrittura
bun run i18n:import                               # tutto: update + publish dei record pubblicati
bun run i18n:import -- --verify
```

`--force` rifà traduzioni o import già fatti. Un record modificato nel CMS dopo l'export dà `STALE`:
riesportare e ripetere solo quell'id.

## Link nei testi EN

```bash
bun run i18n:links -- --dry-run   # elenca i link interni italiani dentro i testi EN
bun run i18n:links                # li riscrive verso le pagine EN (solo locale en, blocchi aggiornati in place)
```

Da rilanciare dopo ogni import: le traduzioni copiano gli URL dall'italiano. Usa `redirects/legacy-map.json`
per risolvere prima i vecchi URL.

## Regole

- Si traducono i campi localizzati `string`/`text`, `seo.title`/`seo.description`, `alt`/`title` dei campi file,
  e gli stessi campi dentro i blocchi (compresi i blocchi del menu). URL, slug, nomi di persone e clienti no.
- I blocchi IT restano intatti; l'EN riceve copie nuove dei blocchi IT con i testi tradotti.
- I campi localizzati non testuali (booleani, link, immagini) in EN diventano uguali all'IT.
- Slug EN: quello esistente se presente, altrimenti dal titolo tradotto. `about_index` = `about`, `partners_index` = `partners`.
- Publish solo dei record che erano pubblicati all'export; quelli con bozza IT pendente vengono segnalati.
- Gli alt di default degli asset (metadati dell'upload) non vengono toccati.

## Ripristino

`data/export/<model>/<id>.json` contiene il record completo (tutti i locali) prima dell'import.
