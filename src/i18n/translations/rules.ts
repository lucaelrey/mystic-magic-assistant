
export const rulesTranslations = {
  en: {
    rules: {
      title: "Game Rules",
      sections: {
        overview: "Game Overview",
        setup: "Game Setup",
        gameplay: "Gameplay",
        scoring: "Scoring"
      },
      overview: {
        general: {
          title: "Game Overview",
          description: "The most important thing first: Whoever has collected the fewest points at the end of a game wins!"
        },
        preparation: {
          title: "Game Preparation",
          steps: [
            "Shuffle the cards thoroughly and deal four face-down cards to yourself and your fellow players.",
            "Each player places the four cards - without looking at them - in front of them on the table. These are your hand cards.",
            "The remaining cards go face down on the draw pile.",
            "Turn over the top card of the draw pile and place it face up on the table. This is the first card of the discard pile."
          ]
        },
        gameplay: {
          title: "Gameplay",
          description: "All players are allowed to look at two of their four face-down cards once. Then the first round begins.",
          drawCard: {
            title: "1. Draw a card from the draw pile:",
            options: [
              "immediately discard it or",
              "replace it with a card from your own display or",
              "if it's an action card, perform the action"
            ]
          },
          takeDiscard: {
            title: "2. Take a discard pile card:",
            rules: [
              "Take the top card from the discard pile and replace it with a card from your own display.",
              "If a player has an identical card to the one just placed on the discard pile, they can immediately discard up to two of these cards."
            ]
          }
        },
        detailed: {
          title: "Detailed Game Rules",
          description: "Complete and detailed rules for the Mystic card game with all special rules."
        }
      },
      numberCards: {
        title: "Number Cards",
        values: "Values and Distribution:",
        rules: [
          "Number cards have values from 0 to 10",
          "Each value appears multiple times in the game"
        ],
        scoring: {
          title: "Scoring:",
          rules: [
            "Each card counts its printed value as points",
            "The goal is to collect as few points as possible"
          ]
        }
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
            "All action cards count 11 points (highest score in the game)"
          ]
        }
      }
    }
  },
  de: {
    rules: {
      title: "Spielregeln",
      sections: {
        overview: "Mystic in Kürze",
        setup: "Spielvorbereitung",
        gameplay: "Spielablauf",
        scoring: "Punktezählung"
      },
      overview: {
        general: {
          title: "Mystic in Kürze",
          description: "Das Wichtigste zuerst: Wer am Ende einer Partie am wenigsten Punkte gesammelt hat, gewinnt!"
        },
        preparation: {
          title: "Spielvorbereitung",
          steps: [
            "Mische die Spielkarten gründlich durch und teile dir und deinen Mitspieler:innen verdeckt je vier Karten aus.",
            "Jede:r Spieler:in legt die vier Karten – ohne sie sich anzuschauen – vor sich auf den Tisch. Das sind deine Handkarten.",
            "Die restlichen Spielkarten kommen verdeckt auf den Ziehstapel.",
            "Decke die oberste Karte des Ziehstapels auf und lege sie offen auf den Tisch. Das ist die erste Karte des Ablagestapels."
          ]
        },
        gameplay: {
          title: "Spielablauf",
          description: "Alle Spieler:innen dürfen zwei ihrer vier verdeckten Karten einmalig anschauen. Danach beginnt die erste Runde.",
          drawCard: {
            title: "1. Nachziehstapelkarte ziehen:",
            options: [
              "direkt auf den Ablagestapel werfen oder",
              "mit einer Karte der eigenen Auslage ersetzen oder",
              "wenn es sich um eine Aktionskarte handelt, die Aktion ausführen"
            ]
          },
          takeDiscard: {
            title: "2. Ablagestapelkarte nehmen:",
            rules: [
              "Die oberste Karte des Ablagestapels nehmen und durch eine Karte der eigenen Auslage ersetzen.",
              "Hat ein Spieler eine identische Karte wie die gerade auf den Ablagestapel gelegte, kann er bis zu zwei dieser Karten direkt auf den Ablagestapel werfen."
            ]
          }
        },
        detailed: {
          title: "Ausführliche Spielregeln",
          description: "Vollständige und detaillierte Regeln zum Mystic Kartenspiel mit allen Sonderregeln."
        }
      },
      numberCards: {
        title: "Zahlenkarten",
        values: "Werte und Verteilung:",
        rules: [
          "Die Zahlenkarten haben Werte von 0 bis 10",
          "Jeder Wert ist mehrfach im Spiel vorhanden"
        ],
        scoring: {
          title: "Punktewertung:",
          rules: [
            "Jede Karte zählt ihren aufgedruckten Wert als Punkte",
            "Das Ziel ist es, möglichst wenig Punkte zu sammeln"
          ]
        }
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
            "Alle Aktionskarten zählen 11 Punkte (höchste Punktzahl im Spiel)"
          ]
        }
      }
    }
  }
};
