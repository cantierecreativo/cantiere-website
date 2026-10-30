import { test, expect } from "bun:test";
import { buildCard } from "../netlify/functions/submission-created.mjs";

test("card dei contatti: titolo con nome e servizi, campi escapati", () => {
  const card = buildCard("contatti", {
    nome: "Mario <b>Rossi</b>",
    email: "mario@example.com",
    servizio: "Web Design|SEO",
    messaggio: "riga 1\nriga 2",
    privacy: "sì",
    "bot-field": "",
  });
  expect(card.title).toBe("Mario <b>Rossi</b> — Web Design, SEO");
  expect(card.content).toContain("Mario &lt;b&gt;Rossi&lt;/b&gt;");
  expect(card.content).toContain('<a href="mailto:mario@example.com">');
  expect(card.content).toContain("riga 1<br>riga 2");
  expect(card.content).not.toContain("privacy");
});

test("card delle candidature: nome, cognome e profilo; link cliccabile", () => {
  const card = buildCard("candidature", { nome: "Ada", cognome: "Lovelace", profilo: "Developer", link: "https://example.com/cv" });
  expect(card.title).toBe("Ada Lovelace — Developer");
  expect(card.content).toContain('<a href="https://example.com/cv">');
  expect(buildCard("candidature", {}).title).toBe("Nuovo invio dal sito");
});

test("risposta al candidato: lingua della pagina, nome escapato, mittente verificato", async () => {
  const { applicantReply } = await import("../netlify/functions/submission-created.mjs");
  const it = applicantReply({ nome: "Ada<", cognome: "Lovelace", email: "ada@example.com", lingua: "it" });
  expect(it.subject).toBe("Abbiamo ricevuto la tua candidatura");
  expect(it.htmlContent).toContain("Ciao Ada&lt;,");
  expect(it.to).toEqual([{ email: "ada@example.com", name: "Ada< Lovelace" }]);
  expect(it.sender.email).toBe("f.giovannetti@cantierecreativo.net");
  expect(it.replyTo.email).toBe("e.guerrini@cantierecreativo.net");
  expect(applicantReply({ email: "x@example.com", lingua: "en" }).subject).toBe("We've received your application");
  expect(applicantReply({ email: "x@example.com" }).subject).toBe("Abbiamo ricevuto la tua candidatura");
});

test("candidatura spontanea: niente riga 'Posizione aperta: false'", () => {
  expect(buildCard("candidature", { nome: "Ada", posizione: "false" }).content).not.toContain("Posizione aperta");
});
