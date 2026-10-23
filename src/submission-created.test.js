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
