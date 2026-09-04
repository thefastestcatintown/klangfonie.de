# Sanity: erste Inhalte

Nach der Konfiguration aus der `README.md` öffnest du `http://localhost:4321/studio`. Die folgenden Einträge ergeben den vorgesehenen Startzustand.

## 1. Website-Einstellungen

- **Name der Website:** Klangfonia
- **Standardtitel:** Klangfonia – Handpan, Musik & Begegnung
- **Standardbeschreibung:** Handpanunterricht und feinfühlige Live-Musik für Yoga, Events und besondere Momente mit Daniela Schneider.
- **E-Mail:** echte Kontaktadresse ergänzen
- Telefon, Instagram, YouTube und Ort nur eintragen, wenn die Angaben veröffentlicht werden sollen.

## 2. Startseite

- **Hero: kleine Zeile:** HANDPAN · MUSIK · BEGEGNUNG
- **Hero: Überschrift:** Klang, der verbindet.
- **Hero: Text:** Persönliche Lernbegleitung an der Handpan, Live-Musik und feinfühlige Klangbegleitung für Yoga, besondere Momente und Menschen, die selbst ins Spielen eintauchen möchten.
- **Primärer Button:** Lernbegleitung entdecken → `/unterricht`
- **Sekundärer Button:** Musik hören → `#musik`
- **Einleitung: Überschrift:** Erst hören. Dann weiterlesen.
- **Einleitung: Text:** Die Handpan muss man eigentlich nicht erklären. Man muss sie hören.
- Ein echtes Hero-Bild hochladen und einen beschreibenden Alternativtext ergänzen.

## 3. Angebote

Je ein Dokument anlegen. `sortOrder` steuert die Reihenfolge.

### Lernbegleitung

- Kategorie: Unterricht
- URL-Kürzel: `unterricht`
- Seitenüberschrift: Dein eigener Zugang zur Handpan.
- Kurzbeschreibung: Persönliche Lernbegleitung für Menschen, die das Instrument neu entdecken oder ihr Spiel weiterentwickeln möchten.
- Button: Lernbegleitung anfragen → `/kontakt?interesse=unterricht`
- Reihenfolge: 10

### Yoga & Handpan

- Kategorie: Yoga
- URL-Kürzel: `yoga`
- Seitenüberschrift: Live-Klang für deine Yogaklasse.
- Kurzbeschreibung: Musik, die Bewegung, Atem und Stille begleitet, ohne sich in den Vordergrund zu drängen.
- Button: Gemeinsame Klasse anfragen → `/kontakt?interesse=yoga`
- Reihenfolge: 20

### Live & Band

- Kategorie: Live
- URL-Kürzel: `live`
- Seitenüberschrift: Musik für besondere Räume.
- Kurzbeschreibung: Solo, gemeinsam mit anderen Musiker:innen oder als musikalische Begleitung für Events, Retreats und besondere Momente.
- Button: Live-Musik anfragen → `/kontakt?interesse=live`
- Reihenfolge: 30

## 4. Über Daniela

- Überschrift: Musik entsteht für mich im Zuhören.
- Einleitung: den freigegebenen Kurztext über Daniela eintragen
- echtes Porträt mit Alternativtext hochladen
- Vita und Stationen nur mit verifizierten Angaben ergänzen

## 5. Video

Ein Video mit Titel und vollständiger YouTube-URL anlegen, **Auf der Startseite zeigen** aktivieren und Reihenfolge `10` setzen. Die Website verwendet die datenschutzfreundlichere `youtube-nocookie.com`-Einbettungsdomain; rechtliche Anforderungen an eine Einwilligung sind vor dem Livegang trotzdem zu prüfen.

## 6. Stimmen

Unter **Bewertungen & Stimmen** lassen sich freigegebene Rückmeldungen von Schüler:innen, Veranstalter:innen und Yogalehrer:innen eintragen. Neben dem Zitat werden die Art der Stimme, ein Name oder eine anonyme Bezeichnung und optional das betreffende Angebot gepflegt. `Reihenfolge` steuert die Darstellung auf der Startseite; maximal vier Einträge werden gezeigt.

Solange keine Dokumente dieses Typs existieren, blendet die Website den gesamten Bereich automatisch aus. Es gibt keine erfundenen Demo-Zitate.

## 7. Termine

Kommende Termine können mit Datum, Ort und optionalem externem Link gepflegt werden. Vergangene Termine werden im Frontend automatisch ausgefiltert.
