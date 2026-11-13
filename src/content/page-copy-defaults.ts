export type CopyLanguage = 'de' | 'en';

type LocalizedPageCopy = Record<CopyLanguage, Record<string, string>>;

export const pageCopyDefaults: Record<string, LocalizedPageCopy> = {
  global: {
    de: {
      homeLabel: 'Klangfonia – Startseite', menuLabel: 'Menü öffnen', navigationLabel: 'Hauptnavigation',
      coachingLabel: 'Coaching', aboutLabel: 'Über mich', privacyLabel: 'Datenschutz', legalLabel: 'Impressum',
      coachingLessons: 'Lernbegleitung 1:1', coachingBand: 'Big Band', coachingWorkshops: 'Workshops',
      navRetreats: 'Retreats', navMusic: 'Musik', navAbout: 'Über mich', navEvents: 'Termine', navContact: 'Kontakt',
      aboutIntention: 'Meine Intention', aboutStory: 'Meine Geschichte',
      logoAlt: 'Klangfonia – Daniela Schneider, Handpan-Musik', skipLabel: 'Zum Inhalt springen',
      footerTagline: 'Klang, der verbindet',
      footerNewsletter: 'Newsletter abonnieren',
      heroImageAlt: 'Daniela Schneider spielt Handpan auf einem Waldweg', heroCaption: 'Handpan · Musik · Begegnung',
      aboutImageAlt: 'Daniela Schneider spielt Handpan unter einem Baum', durationLabel: 'Dauer', imagePlaceholder: 'Bild kann im Sanity Studio ergänzt werden.',
      eventMore: 'Mehr erfahren', eventBook: 'Termin buchen', eventEmpty: 'Neue Konzerttermine werden hier veröffentlicht.',
      videoConsent: 'Mit dem Laden des Videos stimmst du zu, dass eine Verbindung zu YouTube hergestellt und Daten an Google übertragen werden können.', videoLoad: 'Video von YouTube laden', videoPrivacy: 'Mehr zum Datenschutz', videoPlaceholder: 'Hier klingt bald Klangfonia.', videoStudio: 'Video lässt sich im Sanity Studio hinterlegen.',
      notFoundTitle: 'Dieser Klang ist verklungen.', notFoundText: 'Die gesuchte Seite gibt es nicht oder nicht mehr.', notFoundCta: 'Zur Startseite',
    },
    en: {
      homeLabel: 'Klangfonia – Home', menuLabel: 'Open menu', navigationLabel: 'Main navigation',
      coachingLabel: 'Coaching', aboutLabel: 'About me', privacyLabel: 'Privacy', legalLabel: 'Legal notice',
      coachingLessons: 'One-to-one guidance', coachingBand: 'Big Band', coachingWorkshops: 'Workshops',
      navRetreats: 'Retreats', navMusic: 'Music', navAbout: 'About me', navEvents: 'Events', navContact: 'Contact',
      aboutIntention: 'My intention', aboutStory: 'My story',
      logoAlt: 'Klangfonia – Daniela Schneider, handpan music', skipLabel: 'Skip to content',
      footerTagline: 'Sound that connects',
      footerNewsletter: 'Join the newsletter',
      heroImageAlt: 'Daniela Schneider playing a handpan on a woodland path', heroCaption: 'Handpan · Music · Connection',
      aboutImageAlt: 'Daniela Schneider playing a handpan beneath a tree', durationLabel: 'Duration', imagePlaceholder: 'An image can be added in Sanity Studio.',
      eventMore: 'Find out more', eventBook: 'Book event', eventEmpty: 'New concert dates will be published here.',
      videoConsent: 'By loading the video, you agree that a connection to YouTube may be established and data may be transferred to Google.', videoLoad: 'Load video from YouTube', videoPrivacy: 'More about privacy', videoPlaceholder: 'Klangfonia will soon be heard here.', videoStudio: 'The video can be added in Sanity Studio.',
      notFoundTitle: 'This sound has faded.', notFoundText: 'The page you are looking for does not exist or is no longer available.', notFoundCta: 'Back to home',
    },
  },
  home: {
    de: {
      introEyebrow: 'Handpan · Coaching · Musik',
    },
    en: {
      introEyebrow: 'Handpan · Coaching · Music',
    },
  },
  unterricht: {
    de: {
      title: 'Dein eigener Zugang zur Handpan.', intro: 'Ein persönlicher, klarer Weg zum Instrument – in deinem Tempo und mit Raum für Ideen und Wünsche, die dir entsprechen. Lernbegleitung für Anfänger und Fortgeschrittene.',
      imageAlt: 'Persönliche Lernbegleitung an einer kupferfarbenen Handpan', contentHeading: 'Was du beim Handpan-Unterricht lernst',
      body: 'Vielleicht bringst du bereits musikalische Vorerfahrung mit und wünscht dir Feedback und neue Inspirationen. Vielleicht hast du noch nie ein Instrument gespielt. Vielleicht steht deine erste Handpan bereits zuhause und du fragst dich: Und jetzt?\n\nIn der 1:1-Lernbegleitung verbinden wir eine klare, verständliche Struktur mit spielerischer Neugier und Freude am Ausprobieren. In einer entspannten Atmosphäre darf Neues entstehen, entdeckt und ganz in Ruhe angespielt werden. Dabei geht es nicht darum, möglichst schnell möglichst viel zu können, sondern mit Leichtigkeit und Spaß einen eigenen, lebendigen Zugang zur Musik zu entwickeln.',
      topics: 'Rhythmus und Timing\nAnschlagtechnik und Klang\nGrooves und Patterns\nMelodie und Dynamik\nKoordination\nÜbergänge und Variationen\nFreies Spiel und Improvisation\nKomposition und Arrangement',
      cta: 'Lernbegleitung anfragen', levelPrompt: 'Du bist dir noch nicht sicher, wo du gerade stehst?', levelLink: 'Schätze dein Handpan-Level ein', durationLabel: 'Dauer',
    },
    en: {
      title: 'Your own approach to the handpan.', intro: 'A personal, clear path to the instrument – at your own pace and with space for ideas and wishes that suit you. Guidance for beginners and advanced players.',
      imageAlt: 'Personal guidance on a copper-coloured handpan', contentHeading: 'What you will learn in handpan lessons',
      body: 'Perhaps you already have some musical experience and would like feedback and fresh inspiration. Perhaps you have never played an instrument. Perhaps your first handpan is already at home and you are asking yourself: What now?\n\nIn one-to-one guidance, we combine a clear, easy-to-understand structure with playful curiosity and the joy of experimenting. In a relaxed atmosphere, new things can emerge, be discovered and explored at leisure. The aim is not to learn as much as possible as quickly as possible, but to develop your own lively connection to music with ease and enjoyment.',
      topics: 'Rhythm and timing\nTouch and tone\nGrooves and patterns\nMelody and dynamics\nCoordination\nTransitions and variations\nFree playing and improvisation\nComposition and arrangement',
      cta: 'Enquire about guidance', levelPrompt: 'Not sure where you are starting from?', levelLink: 'Assess your handpan level', durationLabel: 'Duration',
    },
  },
  live: {
    de: {
      title: 'Musik', imageAlt: 'Live-Auftritt mit Handpan bei einem stimmungsvollen Konzert',
      body: 'Der sphärische Klang der Handpan weckt meine Spielfreude und animiert mich, melodische Linien mit erdigen Grooves in Form zu bringen oder einfach zu improvisieren. Sanfte, meditative Passagen wechseln sich mit lebendigen, kraftvollen Momenten ab. Aus wenigen Tönen entstehen weit schwingende Klangbilder, die zum Lauschen, Träumen und Eintauchen einladen.\n\nMeine Eigenkompositionen erzählen eigene Geschichten. Sie nehmen euch mit auf Reisen zu fernen Landschaften und Kulturen oder öffnen Räume für Bilder, Gefühle und innere Welten. Ich schenke euch Einblicke in die Gedanken und den Humor hinter meiner Musik.\n\nMein Soloprogramm ist eine musikalische Reise zwischen sphärischen Melodien, pulsierenden Rhythmen und meditativer Klangfülle – mal ruhig und schwebend, mal voller Energie und Lebensfreude.\n\nMeine Handpan-Musik kann für verschiedenste Anlässe gebucht werden. Z.B. für Yoga-Stunden, Retreats und Klangevents, in Wellness-Orten, für persönliche Feierlichkeiten wie etwa Trauerfeiern und Geburtstage. Dabei gestalte ich den musikalischen Raum achtsam, einfühlsam und passend zum jeweiligen Anlass.',
      cta: 'Live-Musik anfragen', videoIntro: 'Lehn dich gern zurück und lausche.',
    },
    en: {
      title: 'Music', imageAlt: 'Live handpan performance at an atmospheric concert',
      body: 'The ethereal sound of the handpan awakens my joy of playing and inspires me to shape melodic lines with earthy grooves, or simply to improvise. Gentle, meditative passages alternate with lively, powerful moments. From just a few notes, expansive soundscapes emerge that invite you to listen, dream and immerse yourself.\n\nMy original compositions tell stories of their own. They take you on journeys to distant landscapes and cultures or open spaces for images, feelings and inner worlds. I share glimpses of the thoughts and humour behind my music.\n\nMy solo programme is a musical journey between ethereal melodies, pulsating rhythms and meditative richness of sound – sometimes calm and floating, sometimes full of energy and joy.\n\nMy handpan music can be booked for a wide range of occasions. For example, yoga classes, retreats and sound events, wellness venues, and personal ceremonies such as funerals and birthdays. I shape the musical space with care and sensitivity, always in tune with the occasion.',
      cta: 'Enquire about live music', videoIntro: 'Make yourself comfortable and have a listen.',
    },
  },
  yoga: {
    de: {
      title: 'Musik erleben. Rhythmus spüren. Gemeinschaft fühlen.', imageAlt: 'Kupferfarbene Handpan in einem hellen Yogaraum', cta: 'Retreat anfragen',
      body: 'Tauche ein in die Welt der Handpansounds getragen von Rhythmus in Bewegung. In meinen Retreats begegnen sich Handpanmusik und gemeinsame Bodypercussion – eine inspirierende Verbindung aus Achtsamkeit, musikalischem Erleben und gemeinschaftlichem Ausdruck.',
      bullets: 'Handpan: In sphärische Klänge eintauchen und sich von ihrer Tiefe berühren lassen.\nBodypercussion: Bewegung und Rhythmus mit dem ganzen Körper erfahren, Lebendigkeit spüren und gemeinsam in den Flow kommen.',
      closing: 'Ob in stillen Momenten oder im kraftvollen Zusammenspiel – es entsteht Raum für neue Erfahrungen, musikalische Lebendigkeit und Verbundenheit.\n\nDu brauchst keine musikalischen Vorkenntnisse. Alles, was du mitbringst, ist die Offenheit, dich auf die Handpansounds, Rhythmus in Bewegung und Begegnung einzulassen.\n\nGetragen von der Musik. Gemeinsam im Rhythmus. Verbunden im Augenblick.',
    },
    en: {
      title: 'Experience music. Feel rhythm. Share connection.', imageAlt: 'Copper-coloured handpan in a bright retreat space', cta: 'Enquire about a retreat',
      body: 'Immerse yourself in the world of handpan sounds, carried by rhythm in motion. In my retreats, handpan music and shared body percussion come together – an inspiring combination of mindfulness, musical experience and collective expression.',
      bullets: 'Handpan: Immerse yourself in ethereal sounds and let their depth move you.\nBody percussion: Experience movement and rhythm with your whole body, feel alive and find a shared flow.',
      closing: 'Whether in quiet moments or powerful ensemble playing, space opens up for new experiences, musical vitality and connection.\n\nYou do not need any musical experience. All you need is an openness to handpan sounds, rhythm in motion and meeting others.\n\nCarried by music. Together in rhythm. Connected in the moment.',
    },
  },
  'about-intention': {
    de: {
      title: 'Meine Intention',
      body: 'Ich möchte Menschen durch Musik berühren, Emotionen wecken und besondere Momente schaffen, die in Erinnerung bleiben. Für mich ist Handpan-Musik mehr als Klang – sie ist Energie, Ausdruck und eine Sprache, die Menschen verbindet.\n\nAls Percussionistin und Handpan-Musikerin verbinde ich Rhythmus, Feingefühl und Leidenschaft zu atmosphärischen und melodiösen Klangerlebnissen – mal sanft und tief, mal kraftvoll und lebendig. Dabei folge ich dem Gespür für den Augenblick und der Magie, die entsteht, wenn klangvolle Melodien Menschen im Innersten erreichen.\n\nMusik ist meine Sprache. Rhythmus ist meine Leidenschaft. Verbindung ist meine Intention.',
    },
    en: {
      title: 'My intention',
      body: 'I want to touch people through music, awaken emotions and create special moments that stay in the memory. To me, handpan music is more than sound – it is energy, expression and a language that connects people.\n\nAs a percussionist and handpan musician, I combine rhythm, sensitivity and passion to create atmospheric and melodic sound experiences – sometimes gentle and deep, sometimes powerful and alive. I follow my sense of the moment and the magic that arises when resonant melodies reach people at their core.\n\nMusic is my language. Rhythm is my passion. Connection is my intention.',
    },
  },
  'about-story': {
    de: {
      title: 'Meine Geschichte',
      body: 'Die Freude am gemeinsamen Musizieren begleitet mich seit meiner Kindheit. Mein musikalischer Weg führte mich über das Studium des klassischen Schlagwerks und der Elementaren Musikpädagogik an der Hochschule für Musik in Nürnberg auf deutschlandweite Bühnen mit unterschiedlichen Bandprojekten – von Jazz, Rock und Pop bis hin zur akustischen Salonmusik.\n\nAus jahrzehntelanger musikalischer Erfahrung schöpfe ich heute die Vielfalt und Ausdruckskraft meiner Handpan-Musik.',
    },
    en: {
      title: 'My story',
      body: 'The joy of making music with others has accompanied me since childhood. My musical path led from studying classical percussion and elementary music education at the Nuremberg University of Music to stages throughout Germany with a variety of band projects – from jazz, rock and pop to acoustic salon music.\n\nToday, I draw the diversity and expressive power of my handpan music from decades of musical experience.',
    },
  },
  ensemble: {
    de: {
      title: 'Bandcoaching - Handpan-Ensamble', intro: 'Begegnung und Austausch stehen bei uns an erster Stelle.', imageAlt: 'Drei Menschen musizieren gemeinsam auf Handpans',
      section1Title: 'Begegnung, Austausch und gemeinsames Musizieren',
      section1Body: 'Wenn du Lust hast, dich regelmäßig mit anderen Handpan-Artists zu treffen, gemeinsam Musik zu entwickeln, deine eigenen Ideen einzubringen und dich inspirieren zu lassen, bist du herzlich willkommen. Zum Kennenlernen kannst du gerne zunächst ein unverbindliches Schnuppertreffen vereinbaren.\n\nGemeinsam entwickeln wir ein abwechslungsreiches Auftrittsprogramm, in dem sowohl ein- und mehrstimmige Patterns als auch Solostücke ihren Platz finden. Dabei geht es nicht nur darum, gemeinsam zu spielen, sondern auch darum, musikalisch miteinander zu wachsen und unsere unterschiedlichen Ideen und Spielweisen zu einem gemeinsamen Klangbild zu verbinden.',
      section2Title: 'Rhythmus, Timing und musikalischer Flow',
      section2Body: 'Beim Warm-up mit Bodypercussion nähern wir uns spielerisch den rhythmischen Figuren der Patterns an und trainieren dabei Koordination, Timing und Körpergefühl. Das zunächst langsame Übertragen auf die Handpan, die schrittweise Wiederholung einzelner Takte im Loop und das meditative Eingrooven in einen stabilen Beat spielen dabei eine zentrale Rolle.\n\nDie Stücke werden gefilmt und ich notiere sie sowohl in Zahlenschrift als auch mit Notennamen und klassischer Notenschrift. So können wir musikalische Ideen festhalten, weiterentwickeln und auch nach und nach zu einem gemeinsamen Repertoire ausbauen.\n\nIm kreativen Prozess erfährst du, wie elegante Übergänge zwischen Strophe und Refrain entstehen und wie sich durch progressive Variationen der Melodie-Patterns ein musikalischer Spannungsbogen entwickeln lässt. Wir experimentieren mit Dynamik, Zusammenspiel und Ausdruck und entdecken dabei, wie aus einzelnen Patterns ein lebendiges gemeinsames Stück entsteht.',
      section3Title: 'Von dem Probenraum auf die Bühne',
      section3Body: 'Ein weiterer wichtiger Bestandteil ist die Bühnenerfahrung. Die gemeinsam erarbeiteten Stücke tragen wir vom Proberaum auf die Bühne. Dabei kannst du Erfahrungen mit dem gemeinsamen Auftreten sammeln, Sicherheit on stage gewinnen und erleben, wie sich unsere Musik im Zusammenspiel mit einem Publikum entfaltet.\n\nOb du bereits Bühnenerfahrung mitbringst oder deine ersten Schritte in diese Richtung machen möchtest – beides ist willkommen. Im Mittelpunkt steht die Freude am gemeinsamen Musizieren und die Bereitschaft, sich aufeinander einzulassen.\n\nWenn dich das anspricht, melde dich gerne! Ich/wir freuen uns über Verstärkung, neue musikalische Impulse und vor allem auf viele schöne gemeinsame Momente mit der Handpan.',
      cta: 'Schnuppertreffen anfragen',
    },
    en: {
      title: 'Band coaching – handpan ensemble', intro: 'Meeting and exchange come first for us.', imageAlt: 'Three people making music together on handpans',
      section1Title: 'Connection, exchange and making music together',
      section1Body: 'If you would like to meet other handpan artists regularly, develop music together, contribute your own ideas and be inspired, you are warmly welcome. You can begin with a no-obligation trial session to get to know the group.\n\nTogether, we develop a varied performance programme with space for both single- and multi-voice patterns as well as solo pieces. It is not only about playing together, but also about growing musically and bringing our different ideas and playing styles into one shared sound.',
      section2Title: 'Rhythm, timing and musical flow',
      section2Body: 'In our body-percussion warm-up, we explore the rhythmic shapes of the patterns through play while training coordination, timing and body awareness. Slowly transferring them to the handpan, repeating individual bars in a loop and settling meditatively into a steady beat all play a central role.\n\nThe pieces are filmed and I write them down using numbers, note names and standard notation. This lets us capture and develop musical ideas and gradually build a shared repertoire.\n\nDuring the creative process, you discover how elegant transitions between verse and chorus emerge and how progressive variations of melodic patterns can create a musical arc. We experiment with dynamics, ensemble playing and expression, discovering how individual patterns become a living piece of music.',
      section3Title: 'From the rehearsal room to the stage',
      section3Body: 'Stage experience is another important part of the project. We take the pieces we develop together from the rehearsal room onto the stage. You can gain experience performing as a group, grow in confidence on stage and feel how our music unfolds in dialogue with an audience.\n\nWhether you already have stage experience or want to take your first steps in this direction, both are welcome. The focus is on the joy of making music together and being open to one another.\n\nIf this speaks to you, get in touch. We look forward to new members, fresh musical ideas and, above all, many wonderful shared moments with the handpan.',
      cta: 'Ask about a trial session',
    },
  },
  workshops: {
    de: {
      title: 'Handpan-Workshops in Berlin', intro: 'Die Handpan kennenlernen oder dein Spiel vertiefen: Workshops für Einsteiger und Fortgeschrittene mit Raum für deinen eigenen musikalischen Ausdruck.', detailsLabel: 'Was dich im Workshop erwartet', cta: 'Preise anfragen',
      beginnerImageAlt: 'Erste Spielversuche bei einem Handpan-Workshop', beginnerEyebrow: 'Workshops für Einsteiger', beginnerTitle: 'Deine erste Reise mit der Handpan',
      beginnerIntro: 'Du möchtest die Handpan kennenlernen und herausfinden, was in diesem faszinierenden Instrument steckt?\n\nIn meinem Einsteiger-Workshop bekommst du die Möglichkeit, dich ganz in Ruhe und ohne Vorkenntnisse an die Handpan heranzutasten. Entdecke ihren Klang, spüre ihre Schwingung und finde deinen ganz eigenen Zugang zum Spielen.',
      beginnerDetails: 'Wie halte und spiele ich die Handpan am besten? Sitze ich bequem mit dem Instrument auf dem Schoß oder spiele ich lieber im Stehen auf einem Stativ? Welche Spielhaltung fühlt sich für mich richtig an?\n\nWir erkunden gemeinsam, wie die einzelnen Tonfelder zum Klingen und Schwingen gebracht werden – mit welchen Fingern, an welchen Stellen und mit welcher Intensität. Du lernst, wie du deine Anschläge sanft abfederst, damit sich der Klang voll entfalten kann.\n\nUnd dann wird es musikalisch:\nWelche Skala und Harmonie passen zu dir? Wie findest du deine ersten Töne? Und wie entsteht daraus deine erste eigene Melodie?\n\nDabei geht es nicht darum, etwas perfekt zu machen. Vielmehr darfst du lauschen, ausprobieren, experimentieren und staunen, was mit wenigen Tönen möglich ist.\n\nDer Workshop bietet viel Raum für spielerisches Erkunden, persönliche Fragen und einfach Spaß an deinen ersten eigenen Erfahrungen mit der Handpan.\n\nDu brauchst keine musikalischen Vorkenntnisse – nur Neugier und Lust, dich auf den Klang einzulassen. Du möchtest die Handpan kennenlernen? Dann melde dich gerne bei Interesse!',
      advancedImageAlt: 'Fortgeschrittenes, ausdrucksstarkes Handpan-Spiel', advancedEyebrow: 'Workshop für Fortgeschrittene', advancedTitle: 'Dein Spiel. Dein Ausdruck. Dein nächster Schritt.',
      advancedIntro: 'Du spielst bereits Handpan und möchtest dein Spiel vertiefen, neue Impulse bekommen und deinen eigenen musikalischen Ausdruck weiterentwickeln?\n\nIn diesem Workshop geht es um mehr Sicherheit, musikalischen Flow und kreative Freiheit. Wir widmen uns mit Leichtigkeit und Spaß Themen wie, Rhythmus und Timing, Anschlagtechnik, Dynamik, Koordination und abwechslungsreichen Patterns. Du lernst, Übergänge bewusst zu gestalten, Variationen zu entwickeln und aus einzelnen Ideen lebendige musikalische Stücke entstehen zu lassen.',
      advancedDetails: 'Dabei verbinden wir gezieltes Üben mit freiem Ausprobieren und Improvisation. Du bringst dein Spiel mit – ich gebe dir neue Impulse, Inspiration und individuelles Feedback.\n\nOb du dein Repertoire erweitern, an deiner Technik feilen oder einfach neue Wege auf der Handpan entdecken möchtest: Du bestimmst, wohin die Reise geht.\n\nFür alle, die ihre Handpan nicht „nur“ spielen, sondern Spaß am musikalischen Wachsen mit der Handpan haben.\n\nMelde dich gerne und entdecke deinen nächsten Schritt auf der Handpan.',
    },
    en: {
      title: 'Handpan workshops in Berlin', intro: 'Get to know the handpan or deepen your playing: workshops for beginners and advanced players with space for your own musical expression.', detailsLabel: 'What to expect in the workshop', cta: 'Ask about prices',
      beginnerImageAlt: 'First steps at a handpan workshop', beginnerEyebrow: 'Workshops for beginners', beginnerTitle: 'Your first journey with the handpan',
      beginnerIntro: 'Would you like to discover the handpan and find out what this fascinating instrument has to offer?\n\nMy beginner workshop gives you the opportunity to approach the handpan calmly and without any previous experience. Discover its sound, feel its vibration and find your own way of playing.',
      beginnerDetails: 'What is the best way to hold and play the handpan? Do I sit comfortably with the instrument on my lap, or would I rather play standing up with a stand? Which playing position feels right for me?\n\nTogether, we explore how to make the individual tone fields resonate: which fingers to use, where to touch and with how much intensity. You learn to soften each stroke so the sound can unfold fully.\n\nThen it becomes musical:\nWhich scale and harmony suit you? How do you find your first notes? And how can they become your first melody?\n\nThis is not about doing everything perfectly. You are invited to listen, try things out, experiment and be surprised by what is possible with just a few notes.\n\nThe workshop offers plenty of space for playful exploration, personal questions and simply enjoying your first experiences with the handpan.\n\nYou do not need any musical experience – just curiosity and a desire to engage with the sound. If you would like to discover the handpan, get in touch.',
      advancedImageAlt: 'Expressive handpan playing for advanced players', advancedEyebrow: 'Workshop for advanced players', advancedTitle: 'Your playing. Your expression. Your next step.',
      advancedIntro: 'Do you already play the handpan and want to deepen your playing, find new inspiration and develop your own musical expression?\n\nThis workshop is about greater confidence, musical flow and creative freedom. With ease and enjoyment, we explore topics such as rhythm and timing, touch, dynamics, coordination and varied patterns. You learn to shape transitions deliberately, develop variations and turn individual ideas into vibrant pieces of music.',
      advancedDetails: 'We combine focused practice with free exploration and improvisation. You bring your playing; I offer fresh impulses, inspiration and personal feedback.\n\nWhether you want to expand your repertoire, refine your technique or simply discover new paths on the handpan, you decide where the journey leads.\n\nFor everyone who does not want to “just” play their handpan, but enjoys growing musically with the handpan.\n\nGet in touch and discover your next step on the handpan.',
    },
  },
  'self-assessment': {
    de: {
      eyebrow: 'KURZE SELBSTEINSCHÄTZUNG', title: 'Wo stehst du mit der Handpan?', intro: 'Beantworte fünf Fragen zu deiner Erfahrung und deinem Spielgefühl. Die Auswertung gibt dir eine erste Orientierung – sie ist kein Test.',
      q1: '1. Wie viel Erfahrung hast du mit dem Handpan-Spielen?\nIch fange gerade erst an oder habe noch nicht gespielt.\nIch habe es ein paar Mal ausprobiert oder spiele noch nicht lange.\nIch spiele schon länger regelmäßig.',
      q2: '2. Wie sicher fühlst du dich dabei, einen klaren, entspannten Klang zu erzeugen?\nIch suche noch nach meinem Anschlag.\nMit Konzentration gelingt es mir manchmal.\nMeistens gelingt mir ein kontrollierter, klarer Klang.',
      q3: '3. Wie gut gelingt es dir, einen gleichmäßigen Puls zu halten und ein einfaches Pattern zu spielen?\nDas gelingt mir noch nicht.\nLangsam und konzentriert klappt es.\nIch kann den Puls halten und finde in den Groove.',
      q4: '4. Welche Erfahrung hast du mit Variationen und Übergängen zwischen Patterns?\nIch konzentriere mich gerade auf meine ersten Patterns.\nEinzelne Variationen oder Übergänge gelingen mir.\nIch kombiniere Patterns und gestalte sie unterschiedlich.',
      q5: '5. Wie oft spielst du frei oder improvisierst?\nDas habe ich bisher kaum ausprobiert.\nManchmal, mit etwas Unterstützung oder Inspiration.\nOft; ich entwickle gerne eigene Ideen.',
      submit: 'Meine Orientierung anzeigen', resultEyebrow: 'DEINE ERSTE ORIENTIERUNG', resultTitle: 'Deine Auswertung', resultNote: 'Dein Level ist keine feste Schublade. Das Ergebnis ist ein Ausgangspunkt, um gemeinsam herauszufinden, was du als Nächstes lernen möchtest.', resultCta: 'Über deinen nächsten Schritt sprechen',
      level1: 'Einsteiger\nDu stehst am Anfang deiner Handpan-Reise. Ein ruhiger Einstieg in Anschlag, Klang und einfache Rhythmen könnte ein guter nächster Schritt sein.',
      level2: 'Im Aufbau\nDu bringst schon Grundlagen mit und entwickelst Rhythmus, Patterns und Übergänge weiter. Gezielte Impulse können deinem Spiel mehr Sicherheit und Ausdruck geben.',
      level3: 'Fortgeschritten\nDu hast eine solide Spielbasis und erkundest Variationen, Improvisation oder eigene musikalische Ideen. Individuelles Feedback kann dir helfen, diese weiterzuentwickeln.',
    },
    en: {
      eyebrow: 'A SHORT SELF-ASSESSMENT', title: 'Where are you with the handpan?', intro: 'Answer five questions about your experience and feel for the instrument. This is a first orientation, not a test.',
      q1: '1. How much experience do you have playing the handpan?\nI am new to it or have not played yet.\nI have tried it a few times or have been playing for a short while.\nI have been playing regularly for some time.',
      q2: '2. How comfortable are you with producing a clear, relaxed tone?\nI am still finding my touch.\nI can do it sometimes, with concentration.\nI can usually play with a controlled, clear tone.',
      q3: '3. How does keeping a steady pulse while playing a simple pattern feel?\nI am not there yet.\nSlowly and with focus, I can manage it.\nI can keep it steady and feel the groove.',
      q4: '4. What is your experience with changing or combining patterns?\nI am focused on learning my first patterns.\nI can make a few changes or transitions.\nI combine patterns and shape them in different ways.',
      q5: '5. How often do you explore freely or improvise?\nI have not really tried that yet.\nSometimes, with a little support or inspiration.\nOften; I enjoy developing my own ideas.',
      submit: 'Show my orientation', resultEyebrow: 'YOUR FIRST ORIENTATION', resultTitle: 'Your result', resultNote: 'Your level is not a fixed category. The result is only a starting point for a conversation about what you want to learn next.', resultCta: 'Talk about your next step',
      level1: 'Starting out\nYou are at the beginning of your handpan journey. A calm introduction to touch, sound and simple rhythms could be a good next step.',
      level2: 'Building confidence\nYou already have some foundations and are developing your rhythm, patterns and transitions. Focused practice can help your playing feel more settled and expressive.',
      level3: 'Developing your own voice\nYou have a solid playing foundation and are exploring variations, improvisation or your own musical ideas. Individual feedback can help you take those ideas further.',
    },
  },
  contact: {
    de: {
      title: 'Handpan in Berlin anfragen', intro: 'Ob Handpan-Unterricht, Workshop oder Live-Musik: Ein paar Zeilen genügen für den Anfang. Ich melde mich persönlich bei dir zurück.',
      emailHeading: 'Lieber per E-Mail?', enquiryHeading: 'Deine Anfrage', noEmailIntro: 'Erzähl mir kurz, wobei ich dich begleiten darf. Deine Anfrage kannst du anschließend mit einem Klick kopieren.', emailNote: 'Du kannst das Formular nutzen oder Daniela direkt eine E-Mail schreiben.',
      nameLabel: 'Name', emailLabel: 'E-Mail', interestLabel: 'Wofür interessierst du dich?', selectLabel: 'Bitte auswählen', lessonsOption: 'Lernbegleitung 1:1', bandOption: 'Big Band', workshopsOption: 'Handpan Workshops', yogaOption: 'Yoga-Begleitung', retreatOption: 'Retreat', liveOption: 'Live-Musik', concertOption: 'Band / Konzert', otherOption: 'Sonstiges', messageLabel: 'Nachricht', messagePlaceholder: 'Was möchtest du gerne anfragen?', honeypotLabel: 'Bitte nicht ausfüllen',
      defaultInterest: 'Anfrage', greeting: 'Hallo Daniela,', signoff: 'Viele Grüße', sending: 'Wird gesendet…', submit: 'Nachricht senden', prepare: 'E-Mail vorbereiten', copy: 'Anfrage kopieren',
      success: 'Vielen Dank! Deine Nachricht wurde gesendet. Ich melde mich persönlich bei dir zurück.', error: 'Die Nachricht konnte gerade nicht gesendet werden. Bitte versuche es noch einmal oder nutze die angegebene E-Mail-Adresse.', prepared: 'Die Nachricht wurde in deinem E-Mail-Programm vorbereitet. Bitte prüfe sie dort und sende sie ab.', copied: 'Die Anfrage wurde kopiert. Du kannst sie nun in eine E-Mail oder Nachricht einfügen.',
      mailingTitle: 'Interesse am Verteiler?', mailingIntro: 'Erhalte gelegentlich Neuigkeiten zu Terminen, Workshops und Musik von Klangfonia.', mailingConsent: 'Ich möchte per E-Mail Neuigkeiten von Klangfonia erhalten. Meine Einwilligung kann ich jederzeit per E-Mail widerrufen.', mailingSubmit: 'Interesse am Verteiler senden', mailingSending: 'Wird gesendet…', mailingSuccess: 'Vielen Dank! Dein Interesse am Verteiler wurde gesendet.', mailingPrepared: 'Die Nachricht wurde in deinem E-Mail-Programm vorbereitet. Bitte sende sie dort noch ab.',
    },
    en: {
      title: 'Enquire about handpan in Berlin', intro: 'Whether you are interested in handpan lessons, a workshop or live music, a few lines are enough to begin. I will get back to you personally.',
      emailHeading: 'Prefer email?', enquiryHeading: 'Your enquiry', noEmailIntro: 'Tell me briefly how I can support you. You can then copy your enquiry with one click.', emailNote: 'You can use the form or email Daniela directly.',
      nameLabel: 'Name', emailLabel: 'Email', interestLabel: 'What are you interested in?', selectLabel: 'Please select', lessonsOption: 'One-to-one guidance', bandOption: 'Big Band', workshopsOption: 'Handpan Workshops', yogaOption: 'Retreat music', retreatOption: 'Retreat', liveOption: 'Live music', concertOption: 'Band / concert', otherOption: 'Other', messageLabel: 'Message', messagePlaceholder: 'What would you like to ask about?', honeypotLabel: 'Please leave blank',
      defaultInterest: 'Enquiry', greeting: 'Hello Daniela,', signoff: 'Best wishes', sending: 'Sending…', submit: 'Send message', prepare: 'Prepare email', copy: 'Copy enquiry',
      success: 'Thank you! Your message has been sent. I will get back to you personally.', error: 'Your message could not be sent right now. Please try again or use the email address provided.', prepared: 'The message has been prepared in your email programme. Please review it there and send it.', copied: 'The enquiry has been copied. You can now paste it into an email or message.',
      mailingTitle: 'Interested in the mailing list?', mailingIntro: 'Receive occasional news about Klangfonia events, workshops and music.', mailingConsent: 'I would like to receive Klangfonia news by email. I can withdraw my consent at any time by email.', mailingSubmit: 'Send mailing-list interest', mailingSending: 'Sending…', mailingSuccess: 'Thank you! Your interest in the mailing list has been sent.', mailingPrepared: 'The message has been prepared in your email programme. Please send it from there.',
    },
  },
};

export function defaultsFor(pageId: string, language: CopyLanguage): Record<string, string> {
  return { ...(pageCopyDefaults[pageId]?.[language] || {}) };
}
