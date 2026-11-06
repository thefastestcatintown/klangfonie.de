# Klangfonia

Moderne, statisch erzeugte Website für Daniela Schneider / Klangfonia. Gebaut mit Astro, TypeScript und einem direkt unter `/studio` eingebetteten Sanity Studio.

## Entwicklung starten

Voraussetzung: eine aktuelle Node.js-LTS-Version (Node 22 oder neuer empfohlen).

```bash
npm install
npm run dev
```

Die Website läuft danach unter `http://localhost:4321`. Solange keine Sanity Project ID gesetzt ist, nutzt das Frontend bewusst die mitgelieferten Fallback-Inhalte und führt keine CMS-Abfragen aus.

## Sanity konfigurieren

Die Project ID findest du nach dem Anlegen eines Projekts unter [sanity.io/manage](https://www.sanity.io/manage). Am schnellsten erstellst bzw. wählst du Projekt und Dataset im Projektordner mit genau diesem Befehl:

```bash
npx sanity init --bare --dataset-default --env .env
```

Der Befehl öffnet bei Bedarf den Sanity-Login und fragt nach dem Projekt. `--bare` ist wichtig: Die fertige Studio-Konfiguration in diesem Repository wird nicht überschrieben. Prüfe danach, dass `.env` diese Werte enthält:

```env
PUBLIC_SANITY_PROJECT_ID=deine_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SITE_URL=https://klangfonia.de
```

`.env` wird von Git ignoriert. Für die aktuell statische, nur veröffentlichte Inhalte lesende Website ist kein API-Token erforderlich.

Danach:

1. `npm run dev` neu starten.
2. `http://localhost:4321/studio` öffnen und bei Sanity anmelden.
3. In [Sanity Manage](https://www.sanity.io/manage) unter **API → CORS origins** `http://localhost:4321` hinzufügen und **Allow credentials** aktivieren.
4. Vor dem Livegang auch die echte Website-Domain als CORS-Origin mit Credentials ergänzen. Nur eigene Domains freigeben.

Das Studio verwendet Hash-Routing, damit `/studio` auch in der statischen Ausgabe funktioniert. Eine Preview-/Draft-Infrastruktur ist bewusst noch nicht enthalten.

## Build

```bash
npm run check
npm run build
npm run preview
```

Astro erzeugt die Website statisch in `dist/`. Veröffentlichte CMS-Änderungen werden durch den Netcup-Workflow automatisch übernommen. Konzerttermine lädt die Live-Seite zusätzlich direkt aus dem öffentlichen Sanity-Dataset, damit neue oder geänderte Termine schon vor dem nächsten Build sichtbar werden.

## CMS

Das Studio ist nach den sichtbaren Website-Seiten gegliedert. Daniela wählt zuerst die
gewünschte Seite und bearbeitet dort die zugehörigen Texte, Bilder oder Termine. Der
frühere technische Sammelbereich **Seitentexte** und die separaten **Angebote** werden
in der Hauptnavigation nicht mehr angezeigt. Technische Schlüssel und nicht verwendete
Felder sind ausgeblendet; englische Übersetzungen sind standardmäßig eingeklappt.

Regelmäßig gepflegte Inhalte sind insbesondere:

- Startseite und die einzelnen Angebotsseiten
- Live-Musik, Musikvideo sowie Konzerte und Termine
- Danielas Geschichte und Stationen
- Bewertungen und Stimmen
- Kontakt und Selbsteinschätzung

Navigation, allgemeine Hinweise, Kontaktdaten und Suchmaschinenangaben liegen gesammelt
unter **Weitere Einstellungen**.

Impressum und Datenschutzerklärung bleiben bewusst codeverwaltet: Änderungen daran
sollen zusammen mit einer rechtlichen Prüfung veröffentlicht werden und nicht wie
gewöhnliche Marketingtexte versehentlich überschrieben werden.

Die initial einzutragenden Inhalte stehen in [SANITY_CONTENT_SETUP.md](./SANITY_CONTENT_SETUP.md).

## Projektstruktur

```text
sanity/schemas/       CMS-Schemas
src/components/       wiederverwendbare Astro-Komponenten
src/content/          sichere Text-Fallbacks für Sanity
src/layouts/          globales Seitenlayout und SEO
src/lib/              CMS-Abfragen, Typen und Fallbacks
src/pages/            Seitenrouten
src/styles/           globale Gestaltung
public/               statische Assets
```

Die unveränderten Bildquellen liegen unter `src/assets/images/originals/`. Astro
erzeugt daraus beim Build responsive WebP-Varianten; Sanity-Bilder werden über die
Image API automatisch zugeschnitten und im geeigneten Browserformat ausgeliefert.
Das frühere Startseitenbild bleibt als Original erhalten.

## Kontaktformular

Das Formular ist vollständig gestaltet, validiert Eingaben im Browser und versendet sie per Formspree, sobald ein Formular-Endpoint konfiguriert ist. Ohne Endpoint nutzt es weiterhin die E-Mail-/Kopierfunktion als Rückfall.

Für den echten Versand wird ein Formspree-Formular verwendet. Lege dort ein Formular mit der gewünschten Empfängeradresse an und hinterlege dessen Endpoint lokal in `.env` sowie als GitHub-Repository-Variable `PUBLIC_CONTACT_FORM_ENDPOINT`:

```env
PUBLIC_CONTACT_FORM_ENDPOINT=https://formspree.io/f/DEINE_FORMULAR_ID
```

Ist kein Endpoint gesetzt, fällt das Formular weiterhin auf die vorhandene E-Mail-/Kopierfunktion zurück. Die Empfängeradresse wird bei Formspree verwaltet und kann dort später ohne Codeänderung ausgetauscht werden.

## Automatisches Deployment zu Netcup

`.github/workflows/deploy.yml` prüft, baut und überträgt die Website per FTP mit TLS-geschützter Anmeldung nach Netcup. Der Workflow läuft bei einem Push auf `main`, manuell, über ein `repository_dispatch`-Ereignis namens `sanity-publish` und als Ausfallsicherung alle sechs Stunden. Fehlgeschlagene Läufe werden in GitHub Actions angezeigt und über die persönlichen GitHub-Benachrichtigungen gemeldet. Ein Deployment-Manifest verhindert, dass unveränderte, gehashte Build-Dateien erneut übertragen werden.

Benötigte Repository-Variablen:

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`
- `PUBLIC_SITE_URL`
- `PUBLIC_BASE_PATH`
- `PUBLIC_CONTACT_FORM_ENDPOINT`
- optional `PUBLIC_GOOGLE_SITE_VERIFICATION`

Benötigte Repository-Secrets:

- `NETCUP_FTP_HOST`
- `NETCUP_FTP_USER`
- `NETCUP_FTP_PASSWORD`

Für eine sofortige Veröffentlichung kann Sanity unter **API → Webhooks** einen POST an `https://api.github.com/repos/thefastestcatintown/klangfonie.de/dispatches` senden. Der Request benötigt den JSON-Inhalt `{"event_type":"sanity-publish"}` sowie einen eigenen, nur für dieses Repository ausgestellten GitHub-Token im Header `Authorization: Bearer …`. Diesen Token nicht in Git oder in Sanity-Inhalte kopieren. Ohne diesen optionalen Webhook übernimmt der Sechs-Stunden-Zeitplan die Veröffentlichung.

## Vor dem Livegang

- echte Impressumsdaten ergänzen
- passende Datenschutzerklärung rechtlich prüfen und ergänzen
- echtes Bildmaterial und Videos einpflegen
- Formularversand und gegebenenfalls Einwilligung für YouTube-Einbettungen konfigurieren
- `PUBLIC_SITE_URL` auf die endgültige Canonical-Domain setzen

## Wartung und technische SEO

- Navigation: `src/lib/navigation.ts` ist die gemeinsame Quelle für Header und Footer.
- Termine: `src/lib/dates.ts` formatiert Datumsbereiche auf Server und Client in der Zeitzone Europe/Berlin. Die Aktualisierung im Browser liegt in `src/scripts/events.ts`.
- Metadaten: Titel und Beschreibungen der öffentlichen Seiten stehen in `src/lib/seo.ts`. Explizite Props an `BaseLayout` überschreiben sie. Die sichtbaren Überschriften bleiben davon unabhängig; für zusätzliche Seiten greifen die Standardwerte aus Sanity.
- URLs: `src/lib/urls.ts` berücksichtigt `PUBLIC_BASE_PATH` und vereinheitlicht Seiten-URLs mit abschließendem Slash. `PUBLIC_SITE_URL` legt die Domain für Canonical-URLs, strukturierte Daten und Sitemap fest.
- `robots.txt` wird beim Build aus derselben Konfiguration erzeugt. Studio, Fehlerseite, rechtliche Seiten und die alte Weiterleitungsroute stehen nicht in der Sitemap.
- JSON-LD beschreibt Website, Daniela und die jeweilige Seite. Es werden keine unbelegten Adressen, Bewertungen oder Veranstaltungsdaten ergänzt.

Prüfungen mit Node.js 22.6 oder neuer:

```bash
npm test
npm run build
npm run check:seo
```

`check:seo` prüft den letzten Build: eindeutige Metadaten, Überschriftenhierarchie, Bildbeschreibungen, interne Links und Sprungziele, Canonical/Sitemap-Konsistenz, JSON-LD, Indexierungsregeln und robots.txt. Ein alternatives Build-Verzeichnis kann als Argument übergeben werden. Die Tests veröffentlichen die Website nicht und melden keine Sitemap bei Suchmaschinen an.

Für die Bestätigung einer URL-Präfix-Property in Google Search Console kann optional `PUBLIC_GOOGLE_SITE_VERIFICATION` lokal und als GitHub-Repository-Variable gesetzt werden. Nach Anschluss der endgültigen Domain muss `PUBLIC_SITE_URL` auf `https://klangfonia.de` und `PUBLIC_BASE_PATH` auf `/` gesetzt werden; anschließend wird `https://klangfonia.de/sitemap-index.xml` in der Search Console eingereicht.
