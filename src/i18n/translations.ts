
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
        endGame: {
          title: "End of the Game",
          description: "The game ends when a player has at most 5 points in their display or the draw pile is empty. Each player gets one more turn (except the player who ended the game)."
        },
        scoring: {
          title: "Scoring",
          description: "The player with the lowest total points wins. Number cards count their face value. All action cards count as 11 points each."
        }
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
        description: "Action cards are special cards that influence the game flow and provide strategic options.",
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
        cards: {
          shield: {
            name: "Shield",
            description: "Protects against action cards",
            rules: [
              "Place this card face up in front of you",
              "You are protected from action cards that target you",
              "Lasts until another player discards a 'Shield' card"
            ]
          },
          swap: {
            name: "Swap",
            description: "Exchange cards with other players",
            rules: [
              "Exchange one of your cards with one of another player's cards",
              "You decide which of your cards to give away, but you can't look at it first",
              "The opponent decides which of their cards to exchange, without looking at it"
            ]
          },
          reveal: {
            name: "Reveal",
            description: "Look at other players' cards",
            rules: [
              "Look at one card of each opponent",
              "You may not show these cards to other players",
              "You may not exchange these cards"
            ]
          },
          glimpse: {
            name: "Glimpse",
            description: "Look at your own cards",
            rules: [
              "Look at up to three of your own cards",
              "Place them back in the same position"
            ]
          },
          shuffle: {
            name: "Shuffle",
            description: "Rearrange cards in the game",
            rules: [
              "Shuffle all player displays together",
              "Deal them out again so each player has the same number as before"
            ]
          },
          discard: {
            name: "Discard",
            description: "Get rid of cards",
            rules: [
              "Choose one opponent",
              "They must discard a card of your choice from their display",
              "They draw a replacement from the draw pile"
            ]
          }
        }
      },
    },
    shop: {
      title: "Shop",
      product: {
        name: "MYSTIC - The Card Game",
        description: "Experience the magical world of Mystic with this unique card game that combines strategy and mysticism.",
        shipping: "Shipping within Switzerland included in price",
      },
      cart: {
        title: "Cart",
        total: "Total",
        checkout: "Checkout",
        continueShopping: "Continue Shopping",
        remove: "Remove",
      },
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
        endGame: {
          title: "Spielende",
          description: "Das Spiel endet, wenn ein Spieler höchstens 5 Punkte in seiner Auslage hat oder der Nachziehstapel leer ist. Jeder Spieler bekommt noch einen letzten Zug (außer dem Spieler, der das Spielende eingeläutet hat)."
        },
        scoring: {
          title: "Wertung",
          description: "Der Spieler mit den wenigsten Punkten gewinnt. Zahlenkarten zählen ihren aufgedruckten Wert. Alle Aktionskarten zählen jeweils 11 Punkte."
        }
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
        description: "Aktionskarten sind spezielle Karten, die den Spielverlauf beeinflussen und strategische Möglichkeiten bieten.",
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
        cards: {
          shield: {
            name: "Schutz",
            description: "Schützt vor Aktionskarten",
            rules: [
              "Lege diese Karte offen vor dir ab",
              "Du bist vor Aktionskarten geschützt, die dich zum Ziel haben",
              "Wirkt bis ein anderer Spieler eine 'Schutz'-Karte ablegt"
            ]
          },
          swap: {
            name: "Tausch",
            description: "Tausche Karten mit anderen Spielern",
            rules: [
              "Tausche eine deiner Karten mit einer Karte eines anderen Spielers",
              "Du entscheidest, welche deiner Karten du abgibst, darfst sie aber nicht vorher ansehen",
              "Der Gegner entscheidet, welche seiner Karten er tauscht, ohne sie anzusehen"
            ]
          },
          reveal: {
            name: "Enthüllen",
            description: "Sieh dir Karten anderer Spieler an",
            rules: [
              "Sieh dir von jedem Gegner eine Karte an",
              "Du darfst diese Karten nicht anderen Spielern zeigen",
              "Du darfst diese Karten nicht austauschen"
            ]
          },
          glimpse: {
            name: "Einblick",
            description: "Sieh dir deine eigenen Karten an",
            rules: [
              "Sieh dir bis zu drei deiner eigenen Karten an",
              "Lege sie an dieselbe Position zurück"
            ]
          },
          shuffle: {
            name: "Mischen",
            description: "Karten im Spiel neu anordnen",
            rules: [
              "Mische alle Spielerauslagen zusammen",
              "Teile sie neu aus, sodass jeder Spieler wieder gleich viele Karten hat"
            ]
          },
          discard: {
            name: "Ablegen",
            description: "Karten loswerden",
            rules: [
              "Wähle einen Gegner aus",
              "Dieser muss eine Karte deiner Wahl aus seiner Auslage abwerfen",
              "Er zieht Ersatz vom Nachziehstapel"
            ]
          }
        }
      },
    },
    shop: {
      title: "Shop",
      product: {
        name: "MYSTIC - Das Kartenspiel",
        description: "Erlebe die magische Welt von Mystic mit diesem einzigartigen Kartenspiel, das Strategie und Mystik verbindet.",
        shipping: "Versand innerhalb der Schweiz im Preis inbegriffen",
      },
      cart: {
        title: "Warenkorb",
        total: "Gesamt",
        checkout: "Zur Kasse",
        continueShopping: "Weiter einkaufen",
        remove: "Entfernen",
      },
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
