export const translations = {
  en: {
    general: {
      back: "Back",
      loading: "Loading...",
      error: "Error",
      submit: "Submit",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      close: "Close",
    },
    navigation: {
      home: "Home",
      rules: "Rules",
      shop: "Shop",
      cart: "Cart",
      admin: "Admin",
    },
    home: {
      welcome: "Welcome to Mystic",
      subtitle: "Experience the magical world of Mystic - the card game that brings strategy and mysticism together in perfect harmony.",
      buyNow: "Buy Mystic",
      viewRules: "Game Rules",
    },
    rules: {
      title: "Game Rules",
      overview: {
        general: {
          title: "General Rules",
          description: "The goal is to have the fewest points at the end of the game by strategically exchanging cards and using special action cards. Each player has partially hidden cards, whose values they only partially know.",
        },
        preparation: {
          title: "Game Preparation",
          steps: [
            "Each player receives four, five, or six cards depending on the game mode and places them unseen and face down in front of them (own display).",
            "The remaining cards are placed face down as a draw pile in the middle of the table.",
            "A card is drawn from the draw pile and placed face up next to it: it marks the beginning of the discard pile.",
            "Each player may look at two of their cards once.",
            "A starting player is determined and the game begins.",
          ],
        },
        gameplay: {
          title: "Gameplay",
          description: "Play proceeds clockwise. When it's a player's turn, they can choose one of the following options:",
          drawCard: {
            title: "1. Draw a card from the draw pile:",
            options: [
              "immediately discard it or",
              "replace it with a card from your own display or",
              "if it's an action card, perform the action",
            ],
          },
          takeDiscard: {
            title: "2. Take a discard pile card:",
            rules: [
              "Take the top card from the discard pile and replace it with a card from your own display.",
              "If a player has an identical card to the one just placed on the discard pile, they can immediately discard up to two of these cards.",
            ],
          },
        },
      },
      numberCards: {
        title: "Number Cards",
        values: "Values and Distribution:",
        rules: [
          "Number cards have values from 0 to 10",
          "Each value appears multiple times in the game",
        ],
        scoring: {
          title: "Scoring:",
          rules: [
            "Each card counts its printed value as points",
            "The goal is to collect as few points as possible",
          ],
        },
      },
      actionCards: {
        title: "Action Cards",
        description: "Action cards are special cards that influence the game flow and provide strategic options. They can be used to:",
        uses: [
          "View your own or opponent's cards",
          "Exchange or rearrange cards",
          "Protect yourself from other players' actions",
          "Manipulate the game",
        ],
        important: {
          title: "Important Notes:",
          rules: [
            "Action cards must be played immediately",
            "Only one action card can be used per turn",
            "Protected players are immune to most action cards",
            "Action cards go to the discard pile after use",
            "All action cards count 11 points (highest score in the game)",
          ],
        },
      },
    },
    cards: {
      crystalOfMystara: {
        name: "Crystal of Mystara",
        description: "The most powerful and pure object in Mystara, representing the balance of all elements. The crystal is free from negative influences and symbolizes ultimate harmony.",
        rules: [
          "Counts 0 points (best card)"
        ]
      },
      airSpirit: {
        name: "Air Spirit",
        description: "The Air Spirit is closest to the Crystal of Purity. It symbolizes freedom, lightness, and the life-giving element of air. Its purity and subtlety make it almost unbeatable.",
        rules: [
          "Counts 1 point"
        ]
      },
      fireSpirit: {
        name: "Fire Spirit",
        description: "The Fire Spirit embodies the element of transformation and destruction. Fire brings light and warmth but can also be unpredictable and destructive.",
        rules: [
          "Counts 2 points"
        ]
      },
      waterBeing: {
        name: "Water Being",
        description: "Water stands for life and purity, yet is also powerful and dual. It can cleanse and nourish, but also strike with unpredictable force.",
        rules: [
          "Counts 3 points"
        ]
      },
      earthGolem: {
        name: "Earth Golem",
        description: "The Earth Golem represents stability and strength. Earth is the foundation that carries everything, but lacks the flexibility and lightness of other elements.",
        rules: [
          "Counts 4 points"
        ]
      },
      lightningDragon: {
        name: "Lightning Dragon",
        description: "The Lightning Dragon symbolizes raw energy and deadly power. Lightning is fast and powerful, but short-lived and often unpredictable.",
        rules: [
          "Counts 5 points"
        ]
      },
      lightGuardian: {
        name: "Light Guardian",
        description: "Light brings truth, clarity, and dispels darkness. It is powerful, but sometimes blinding and therefore not as subtle as air or water.",
        rules: [
          "Counts 6 points"
        ]
      },
      shadowCreature: {
        name: "Shadow Creature",
        description: "Shadows are mysterious, dangerous, and conceal the unknown. They swallow light but are less tangible and less constructive than other elements.",
        rules: [
          "Counts 7 points"
        ]
      },
      mistSpirit: {
        name: "Mist Spirit",
        description: "The Mist Spirit stands for the mysterious and the opaque. Mist confuses and obscures the truth, making it powerful but hard to grasp.",
        rules: [
          "Counts 8 points"
        ]
      },
      forestNymph: {
        name: "Forest Nymph",
        description: "The Forest Nymph represents life, growth, and permanence. She is deeply rooted and strong, but her rigidity prevents her from flexibly responding to changes.",
        rules: [
          "Counts 9 points"
        ]
      },
      stormTitan: {
        name: "Storm Titan",
        description: "The Storm Titan is the most powerful and destructive element. It embodies chaos and uncontrollability. Its raw power is unmatched, but this very fact makes it the worst card in the game.",
        rules: [
          "Counts 10 points (worst card)"
        ]
      }
    },
  },
  de: {
    general: {
      back: "Zurück",
      loading: "Lädt...",
      error: "Fehler",
      submit: "Absenden",
      save: "Speichern",
      cancel: "Abbrechen",
      delete: "Löschen",
      edit: "Bearbeiten",
      view: "Ansehen",
      close: "Schließen",
    },
    navigation: {
      home: "Startseite",
      rules: "Regeln",
      shop: "Shop",
      cart: "Warenkorb",
      admin: "Admin",
    },
    home: {
      welcome: "Willkommen bei Mystic",
      subtitle: "Erlebe die magische Welt von Mystic - das Kartenspiel, das Strategie und Mystik in perfekter Harmonie vereint.",
      buyNow: "Mystic kaufen",
      viewRules: "Spielregeln",
    },
    rules: {
      title: "Spielregeln",
      overview: {
        general: {
          title: "Allgemeine Regeln",
          description: "Das Ziel ist es, am Ende des Spiels die wenigsten Punkte auf der Hand zu haben, indem man strategisch Karten austauscht und besondere Aktionskarten nutzt. Jeder Spieler hat teilweise verdeckte Karten, deren Werte er nur begrenzt kennt.",
        },
        preparation: {
          title: "Spielvorbereitung",
          steps: [
            "Jeder Spieler erhält je nach Spielmodus vier, fünf oder sechs Karten und legt sie unangesehen und verdeckt nebeneinander vor sich auf den Tisch (eigene Auslage).",
            "Der Rest der Karten kommt verdeckt als Nachziehstapel in die Mitte des Tisches.",
            "Eine Karte wird vom Nachziehstapel gezogen und aufgedeckt neben den Nachziehstapel gelegt: Sie markiert den Anfang des Ablagestapels.",
            "Jeder Spieler darf sich einmalig zwei seiner vor ihm ausliegenden Karten ansehen.",
            "Ein Startspieler wird bestimmt und das Spiel beginnt.",
          ],
        },
        gameplay: {
          title: "Spielverlauf",
          description: "Gespielt wird nacheinander im Uhrzeigersinn. Wenn ein Spieler an der Reihe ist, kann er eine der folgenden Optionen wählen:",
          drawCard: {
            title: "1. Nachziehstapelkarte ziehen:",
            options: [
              "direkt auf den Ablagestapel werfen oder",
              "mit einer Karte der eigenen Auslage ersetzen oder",
              "wenn es sich um eine Aktionskarte handelt, die Aktion ausführen",
            ],
          },
          takeDiscard: {
            title: "2. Ablagestapelkarte nehmen:",
            rules: [
              "Die oberste Karte des Ablagestapels nehmen und durch eine Karte der eigenen Auslage ersetzen.",
              "Hat ein Spieler eine identische Karte wie die gerade auf den Ablagestapel gelegte, kann er bis zu zwei dieser Karten direkt auf den Ablagestapel werfen.",
            ],
          },
        },
      },
      numberCards: {
        title: "Zahlenkarten",
        values: "Werte und Verteilung:",
        rules: [
          "Die Zahlenkarten haben Werte von 0 bis 10",
          "Jeder Wert ist mehrfach im Spiel vorhanden",
        ],
        scoring: {
          title: "Punktewertung:",
          rules: [
            "Jede Karte zählt ihren aufgedruckten Wert als Punkte",
            "Das Ziel ist es, möglichst wenig Punkte zu sammeln",
          ],
        },
      },
      actionCards: {
        title: "Aktionskarten",
        description: "Aktionskarten sind spezielle Karten, die den Spielverlauf beeinflussen und strategische Möglichkeiten bieten. Sie können verwendet werden, um:",
        uses: [
          "Eigene oder gegnerische Karten anzusehen",
          "Karten zu tauschen oder neu anzuordnen",
          "Sich vor den Aktionen anderer Spieler zu schützen",
          "Das Spielgeschehen zu manipulieren",
        ],
        important: {
          title: "Wichtige Hinweise:",
          rules: [
            "Aktionskarten müssen sofort gespielt werden",
            "Pro Zug kann nur eine Aktionskarte eingesetzt werden",
            "Geschützte Spieler sind immun gegen die meisten Aktionskarten",
            "Aktionskarten kommen nach der Nutzung auf den Ablagestapel",
            "Alle Aktionskarten zählen 11 Punkte (höchste Punktzahl im Spiel)",
          ],
        },
      },
    },
    cards: {
      crystalOfMystara: {
        name: "Crystal of Mystara",
        description: "Der mächtigste und reinste Gegenstand in Mystara, der das Gleichgewicht aller Elemente repräsentiert. Der Kristall ist frei von negativen Einflüssen und symbolisiert ultimative Harmonie.",
        rules: [
          "Zählt 0 Punkte (beste Karte)"
        ]
      },
      airSpirit: {
        name: "Air Spirit",
        description: "Der Luftgeist ist dem Kristall der Reinheit am nächsten. Er symbolisiert Freiheit, Leichtigkeit und das lebensspendende Element Luft. Seine Reinheit und Subtilität machen ihn fast unschlagbar.",
        rules: [
          "Zählt 1 Punkt"
        ]
      },
      fireSpirit: {
        name: "Fire Spirit",
        description: "Der Feuergeist verkörpert das Element der Transformation und der Zerstörung. Feuer bringt Licht und Wärme, kann aber auch unberechenbar und zerstörerisch sein.",
        rules: [
          "Zählt 2 Punkte"
        ]
      },
      waterBeing: {
        name: "Water Being",
        description: "Wasser steht für Leben und Reinheit, ist jedoch auch mächtig und dual. Es kann reinigen und nähren, aber auch mit unvorhersehbarer Gewalt zuschlagen.",
        rules: [
          "Zählt 3 Punkte"
        ]
      },
      earthGolem: {
        name: "Earth Golem",
        description: "Der Erdgolem repräsentiert Stabilität und Stärke. Die Erde ist das Fundament, das alles trägt, jedoch fehlt ihr die Flexibilität und Leichtigkeit anderer Elemente.",
        rules: [
          "Zählt 4 Punkte"
        ]
      },
      lightningDragon: {
        name: "Lightning Dragon",
        description: "Der Blitzdrache symbolisiert rohe Energie und tödliche Kraft. Blitze sind schnell und mächtig, aber kurzlebig und oft unberechenbar.",
        rules: [
          "Zählt 5 Punkte"
        ]
      },
      lightGuardian: {
        name: "Light Guardian",
        description: "Licht bringt Wahrheit, Klarheit und vertreibt die Dunkelheit. Es ist kraftvoll, aber manchmal blendend und daher nicht so subtil wie Luft oder Wasser.",
        rules: [
          "Zählt 6 Punkte"
        ]
      },
      shadowCreature: {
        name: "Shadow Creature",
        description: "Schatten sind geheimnisvoll, gefährlich und verbergen das Unbekannte. Sie verschlucken das Licht, sind jedoch weniger greifbar und weniger konstruktiv als andere Elemente.",
        rules: [
          "Zählt 7 Punkte"
        ]
      },
      mistSpirit: {
        name: "Mist Spirit",
        description: "Der Nebelgeist steht für das Geheimnisvolle und das Undurchsichtige. Nebel verwirrt und verschleiert die Wahrheit, was ihn mächtig, aber schwer fassbar macht.",
        rules: [
          "Zählt 8 Punkte"
        ]
      },
      forestNymph: {
        name: "Forest Nymph",
        description: "Die Waldnymphe repräsentiert Leben, Wachstum und Beständigkeit. Sie ist tief verwurzelt und stark, aber ihre Starrheit hindert sie daran, flexibel auf Veränderungen zu reagieren.",
        rules: [
          "Zählt 9 Punkte"
        ]
      },
      stormTitan: {
        name: "Storm Titan",
        description: "Der Sturmtitan ist das mächtigste und destruktivste Element. Er verkörpert Chaos und Unkontrollierbarkeit. Seine rohe Kraft ist unübertroffen, doch gerade diese macht ihn zur schlechtesten Karte im Spiel.",
        rules: [
          "Zählt 10 Punkte (schlechteste Karte)"
        ]
      }
    },
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export const getTranslation = (lang: Language, key: string): string | string[] => {
  const keys = key.split('.');
  let current: any = translations[lang];
  
  for (const k of keys) {
    if (current[k] === undefined) {
      console.warn(`Translation missing for key: ${key} in language: ${lang}`);
      return key;
    }
    current = current[k];
  }
  
  return current;
};
