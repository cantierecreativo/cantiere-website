// Genera il refresh token di Basecamp per la funzione submission-created, una volta sola.
// Legge BASECAMP_CLIENT_ID e BASECAMP_CLIENT_SECRET da .env.local, apre il consenso di Basecamp
// e scrive BASECAMP_REFRESH_TOKEN in .env.local. Non stampa mai i valori.
// Uso: node scripts/basecamp-token.mjs  (redirect URI dell'app: http://localhost:8787/callback)
import fs from "fs";
import http from "http";

const ENV = ".env.local";
const env = Object.fromEntries(
  fs.readFileSync(ENV, "utf8").split("\n").filter((l) => /^\w+=/.test(l)).map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()])
);
const { BASECAMP_CLIENT_ID: id, BASECAMP_CLIENT_SECRET: secret } = env;
if (!id || !secret) throw new Error(`Mancano BASECAMP_CLIENT_ID o BASECAMP_CLIENT_SECRET in ${ENV}`);
const redirect = "http://localhost:8787/callback";

http
  .createServer(async (req, res) => {
    const code = new URL(req.url, redirect).searchParams.get("code");
    if (!code) return res.end();
    const params = new URLSearchParams({ type: "web_server", client_id: id, client_secret: secret, redirect_uri: redirect, code });
    const r = await fetch(`https://launchpad.37signals.com/authorization/token?${params}`, { method: "POST" });
    if (!r.ok) {
      res.end("Errore, guarda il terminale.");
      console.error(`Basecamp ha risposto ${r.status}`);
      process.exit(1);
    }
    const { refresh_token } = await r.json();
    const text = fs.readFileSync(ENV, "utf8").replace(/^BASECAMP_REFRESH_TOKEN=.*\n?/m, "");
    fs.writeFileSync(ENV, `${text.replace(/\n*$/, "\n")}BASECAMP_REFRESH_TOKEN=${refresh_token}\n`);
    res.end("Fatto: puoi chiudere questa pagina.");
    console.log(`BASECAMP_REFRESH_TOKEN salvato in ${ENV}.`);
    process.exit(0);
  })
  .listen(8787, () => {
    console.log("Apri questo link e autorizza l'app con l'account che deve risultare autore delle card:");
    console.log(`https://launchpad.37signals.com/authorization/new?type=web_server&client_id=${id}&redirect_uri=${encodeURIComponent(redirect)}`);
  });
