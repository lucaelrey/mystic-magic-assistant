export const rulesTranslations = {
  en: {
    general: {
      title: "Game Rules",
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
    },
  },
  de: {
    rules: {
      title: "Spielregeln",
      overview: {
        general: {
          title: "Mystic in Kürze",
          description: "Das Wichtigste zuerst: Wer am Ende einer Partie am wenigsten Punkte gesammelt hat, gewinnt!\n\nEine Partie besteht aus mehreren Runden. In jeder Runde ziehen die Spieler:innen eine neue Karte, versuchen, unerwünschte Karten mit hohen Punkten loszuwerden oder das Spielgeschehen mit Aktionskarten auf den Kopf zu stellen.\n\nDas Geheimnis: Einige deiner Karten liegen verdeckt vor dir, sodass du ihre Punktewerte und die geheimen Kräfte deiner Aktionskarten nicht kennst!\n\nGeschick, strategisches Denken, schnelle Reaktionen und ein gutes Gedächtnis sind gefragt. Denn du sabotierst deine Gegner:innen am effektivsten, wenn du deine mystische Gabe dazu nutzt, zu durchschauen, wer auf welchen verdeckten Karten sitzt.\n\nUnd vergiss nicht: Wenn du oder eine:r deiner Mitspieler:innen »Mystic« flüstert, ist die Partie vorbei – und gewonnen hat, wer die wenigsten Punkte hat.",
        },
        preparation: {
          title: "Spielvorbereitung",
          steps: [
            "Mische die Spielkarten gründlich durch und teile dir und deinen Mitspieler:innen verdeckt je vier Karten aus.",
            "Jede:r Spieler:in legt die vier Karten – ohne sie sich anzuschauen – vor sich auf den Tisch. Das sind deine Handkarten.",
            "Die restlichen Spielkarten kommen verdeckt auf den Ziehstapel.",
            "Decke die oberste Karte des Ziehstapels auf und lege sie offen auf den Tisch. Das ist die erste Karte des Ablagestapels.",
            "Tipp für Zauberlehrlinge & Mystic-Neulinge: Beschwöre deinen persönlichen Mystic-Assistenten unter https://play.mysticgame.ch/ – er hilft dir, die Punkte zu zählen und weiss, welche Kraft in jeder Aktionskarte steckt!",
          ],
        },
        gameplay: {
          title: "Spielablauf",
          description: "Alle Spieler:innen dürfen zwei ihrer vier verdeckten Karten einmalig anschauen. Danach beginnt die erste Runde: Bestimme selbst, wer zuerst eine Karte ziehen darf und ob ihr die Partie im Uhrzeigersinn oder im Gegenuhrzeigersinn spielen wollt.",
          drawCard: {
            title: "Spieler:in 1:",
            options: [
              "Nimm eine Karte vom Ziehstapel oder schnapp dir die oberste Karte des Ablagestapels.",
              "Schau dir die Karte an – aber so, dass deine Mitspieler:innen die Karte nicht sehen können.",
              "Triff deine Entscheidung:",
              "Wenn du eine Aktionskarte gezogen hast: Lege sie auf den Ablagestapel und spiele die Aktion.",
              "Wenn du eine Zahlenkarte gezogen hast: Du kannst wählen, ob du sie direkt wieder loswerden willst, indem du sie auf den Ablagestapel legst, oder ob du sie verdeckt zu deinen Handkarten legst. Wenn du sie zu deinen Handkarten legst, darfst du dafür eine andere deiner Handkarten aufdecken und offen auf den Ablagestapel legen.",
            ],
          },
          takeDiscard: {
            title: "Und jetzt wird es spannend:",
            rules: [
              "Handelt es sich um eine Aktionskarte, die du ablegst, gelten einige besondere Regeln – schliesslich kannst du damit die ganze Dynamik des Spiels verändern! Mach dich auf https://mysticgame.ch/rules/action-cards mit den Regeln und der Auswirkungen jeder Aktionskarte vertraut – aber keine Angst – nach wenigen Partien spielst du Aktionskarten bereits wie ein weiser Magier!",
              "Legst du hingegen eine Zahlenkarte ab, öffnest du das Spiel für alle anderen: Besitzt jemand die gleiche Zahlenkarte, kann er/sie diese sofort auf den Ablagestapel legen – und zwar ohne abzuwarten, bis er/sie am Zug ist. Ein gewiefter Trick, um lästige Punkte loszuwerden!",
              "Wichtig: Pro Zug darfst du immer nur eine Zahlenkarte ablegen – auch wenn du mehrere identische Zahlenkarten in den Handkarten hältst.",
            ],
          },
          endGame: {
            title: "Spielende",
            description: "Die Partie endet spätestens dann, wenn der/die erste Spieler:in keine Handkarten mehr hat – und so die Partie gewinnt.\n\nDu willst nicht so lange warten und bist dir sicher, dass du der/die Spieler:in mit den wenigsten Punkten bist? Dann flüstere »Mystic« und lass deine Spielkameraden erschauern. Alle haben ab jetzt genau noch eine Runde Zeit, möglichst viele Punkte loszuwerden. Dann wird ausgezählt.",
          },
          scoring: {
            title: "Punktezählung",
            description: "Alle Spieler:innen decken ihre verbliebenen Handkarten auf und addieren die Kartenwerte: Die Zahlenkarten entsprechen dem aufgedruckten Wert (0 bis 10). Aktionskarten zählen 11 Punkte.\n\nDer/die Spieler:in mit den wenigsten Punkten gewinnt die Partie und verbucht 0 Punkte. Alle anderen Spieler notieren sich ihre Punkte.\n\nSonderregel: Wenn die:r Spieler:in, die »Mystic« gesagt hat, nicht die wenigsten Punkte hat, bekommt er/sie 5 Strafpunkte zusätzlich zur Summe der Punkte seiner/ihrer Handkarten. Der/die Spieler:in mit der tiefsten Punktzahl gewinnt die Partie, muss jedoch trotzdem die Punkte der Handkarten zählen.\n\nKeine Lust zu zählen? Überlass die Arbeit eurem Assistenten: https://play.mysticgame.ch/\n\nUnd nun: Karten neu mischen und auf zur nächsten Partie!",
          },
        },
      },
    },
  },
};
