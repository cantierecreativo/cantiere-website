// Netlify Forms, come nei siti di 21: il form è nell'HTML statico (Astro rende l'isola React in build),
// quindi Netlify lo trova al deploy con i suoi campi. Un campo che non è nell'HTML non viene registrato:
// per questo i valori scelti con i bottoni (servizio, budget) e l'origine hanno un input nascosto.

// Attributi del <form>: Netlify lo riconosce dal nome e scarta gli invii con il campo trappola compilato.
export const netlifyForm = (name) => ({
  name,
  method: "POST",
  "data-netlify": "true",
  "data-netlify-honeypot": "bot-field",
});

// Nome del form (serve agli invii via fetch) e campo trappola per i bot, nascosto anche agli screen reader.
export function NetlifyHiddenFields({ name, register }) {
  return (
    <>
      <input type="hidden" name="form-name" value={name} />
      <p className="hidden" aria-hidden="true">
        <label>
          Non compilare
          <input tabIndex={-1} autoComplete="off" {...register("bot-field")} />
        </label>
      </p>
    </>
  );
}

// Invio a Netlify: POST urlencoded sulla radice del sito, con il nome del form. Netlify risponde 200 se lo accetta.
export async function submitNetlifyForm(name, data) {
  const body = new URLSearchParams({ "form-name": name });
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null && value !== false) body.append(key, String(value));
  }
  const res = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  return res.ok;
}
