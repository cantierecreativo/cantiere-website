import { test, expect } from "bun:test";
import { buildSpamEmail } from "../netlify/functions/spam-check.mjs";

test("avviso spam: conteggio, campi escapati, link ai form", () => {
  const mail = buildSpamEmail(
    [
      { form: "contatti", created_at: "2026-10-23T13:10:00Z", data: { nome: "Mario <b>", email: "m@example.com", messaggio: "x".repeat(300) } },
      { form: "candidature", created_at: "2026-10-23T14:00:00Z", data: { nome: "Ada", cognome: "Lovelace" } },
    ],
    "https://app.netlify.com/projects/sito/forms"
  );
  expect(mail.subject).toBe("Sito: 2 invii finiti nello spam dei form");
  expect(mail.htmlContent).toContain("Mario &lt;b&gt;");
  expect(mail.htmlContent).toContain("Ada Lovelace &lt;senza email&gt;");
  expect(mail.htmlContent).not.toContain("x".repeat(201));
  expect(mail.htmlContent).toContain('href="https://app.netlify.com/projects/sito/forms"');
  expect(buildSpamEmail([{ form: "contatti", created_at: "2026-10-23T13:10:00Z", data: {} }], "u").subject).toBe("Sito: 1 invio finito nello spam dei form");
});
