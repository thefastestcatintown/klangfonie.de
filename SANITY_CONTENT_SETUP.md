# Sanity: erste Inhalte

Nach der Konfiguration aus der `README.md` öffnest du `http://localhost:4321/studio`. Die folgenden Einträge ergeben den vorgesehenen Startzustand.

## 1. Website-Einstellungen

- **Name der Website:** Klangfonie
- **Standardtitel:** Klangfonie – Handpan, Musik & Begegnung
- **Standardbeschreibung:** Handpanunterricht und feinfühlige Live-Musik für Yoga, Events und besondere Momente mit Daniela Schneider.
- **E-Mail:** echte Kontaktadresse ergänzen
- Telefon, Instagram, YouTube und Ort nur eintragen, wenn die Angaben veröffentlicht werden sollen.

## 2. Startseite

- **Hero: kleine Zeile:** HANDPAN · MUSIK · BEGEGNUNG
- **Hero: Überschrift:** Klang, der verbindet.
- **Hero: Text:** Handpanunterricht, Live-Musik und feinfühlige Klangbegleitung für Yoga, besondere Momente und Menschen, die selbst ins Spielen eintauchen möchten.
- **Primärer Button:** Handpanunterricht entdecken → `/unterricht`
- **Sekundärer Button:** Musik hören → `#musik`
- **Einleitung: Überschrift:** Erst hören. Dann weiterlesen.
- **Einleitung: Text:** Die Handpan muss man eigentlich nicht erklären. Man muss sie hören.
- Ein echtes Hero-Bild hochladen und einen beschreibenden Alternativtext ergänzen.

## 3. Angebote

Je ein Dokument anlegen. `sortOrder` steuert die Reihenfolge.

### Handpanunterricht

- Kategorie: Unterricht
- URL-Kürzel: `unterricht`
- Seitenüberschrift: Dein eigener Zugang zur Handpan.
- Kurzbeschreibung: Individueller Unterricht für Menschen, die das Instrument neu entdecken oder ihr Spiel weiterentwickeln möchten.
- Button: Unterricht anfragen → `/kontakt?interesse=unterricht`
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

Nur echte, freigegebene Zitate eintragen. Solange keine Dokumente vom Typ **Stimmen** existieren, blendet die Website den gesamten Bereich automatisch aus. Es gibt keine erfundenen Demo-Zitate.

## 7. Termine

Kommende Termine können mit Datum, Ort und optionalem externem Link gepflegt werden. Vergangene Termine werden im Frontend automatisch ausgefiltert.
