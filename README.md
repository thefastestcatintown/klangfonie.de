# Klangfonie

Moderne, statisch erzeugte Website für Daniela Schneider / Klangfonie. Gebaut mit Astro, TypeScript und einem direkt unter `/studio` eingebetteten Sanity Studio.

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
PUBLIC_SITE_URL=https://klangfonie.de
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

Astro erzeugt die Website statisch in `dist/`. Veröffentlichte CMS-Änderungen werden beim nächsten Build übernommen. Beim späteren Hosting empfiehlt sich dafür ein Sanity-Webhook auf den Build-Hook des Hosting-Anbieters.

## CMS

Daniela kann im Studio folgende Inhalte bearbeiten, ohne das Layout frei umbauen zu müssen:

- Website-Einstellungen und Kontaktdaten
- Hero und Einleitung der Startseite
- Über-Daniela-Seite samt Rich Text und musikalischen Stationen
- Angebote für Unterricht, Yoga, Live und Band
- echte Kundenstimmen
- YouTube-Videos
- kommende Termine

Die initial einzutragenden Inhalte stehen in [SANITY_CONTENT_SETUP.md](./SANITY_CONTENT_SETUP.md).

## Projektstruktur

```text
sanity/schemas/       CMS-Schemas
src/components/       wiederverwendbare Astro-Komponenten
src/layouts/          globales Seitenlayout und SEO
src/lib/              CMS-Abfragen, Typen und Fallbacks
src/pages/            Seitenrouten
src/styles/           globale Gestaltung
public/               statische Assets
```

Die lokal eingebundenen Originalaufnahmen von Daniela dienen als hochwertiger Fallback. Über Sanity gepflegte Hero- und Porträtbilder ersetzen sie automatisch, sobald entsprechende CMS-Inhalte veröffentlicht sind.

## Kontaktformular

Das Formular ist vollständig gestaltet und validiert Eingaben im Browser. Es versendet aktuell bewusst nichts und zeigt keine Fake-Erfolgsmeldung. Später kann der Formular-Handler mit Formspree, Netlify Forms oder einer Astro Server Action verbunden werden.

## Vor dem Livegang

- echte Impressumsdaten ergänzen
- passende Datenschutzerklärung rechtlich prüfen und ergänzen
- echtes Bildmaterial und Videos einpflegen
- Formularversand und gegebenenfalls Einwilligung für YouTube-Einbettungen konfigurieren
- `PUBLIC_SITE_URL` auf die endgültige Canonical-Domain setzen
