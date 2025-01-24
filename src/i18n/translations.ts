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
    shop: {
      title: "Shop",
      product: {
        name: "MYSTIC - The Card Game",
        description: "Experience the magical world of Mystic with this unique card game that combines strategy and mysticism.",
        shipping: "Shipping within Switzerland included in price",
        content: {
          title: "Game Contents:",
          description: "110 high-quality playing cards with breathtaking design that bring elements and actions to life."
        },
        facts: {
          title: "Facts:",
          players: "Number of players: 2-6 players",
          age: "Age: 12 years and up",
          duration: "Playing time: 20-40 minutes"
        }
      },
      purchase: {
        quantity: "Quantity",
        buyNow: "Buy Now",
        securePayment: "Secure payment with SSL encryption"
      },
      cart: {
        title: "Shopping Cart",
        total: "Total",
        checkout: "Checkout",
        continueShopping: "Continue Shopping",
        remove: "Remove",
        empty: "Your cart is empty",
        quantity: "Quantity",
        price: "Price",
        shipping: "Shipping",
        free: "Free",
        subtotal: "Subtotal",
        backToShop: "Back to Shop",
        proceedToCheckout: "Proceed to Checkout",
        secureCheckout: "Secure Checkout",
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
      shop: {
        title: "Shop",
        product: {
          name: "MYSTIC - Das Kartenspiel",
          description: "Erlebe die magische Welt von Mystic mit diesem einzigartigen Kartenspiel, das Strategie und Mystik verbindet.",
          shipping: "Versand innerhalb der Schweiz im Preis inbegriffen",
          content: {
            title: "Inhalt des Spiels:",
            description: "110 hochwertige Spielkarten mit atemberaubendem Design, die Elemente und Aktionen zum Leben erwecken."
          },
          facts: {
            title: "Fakten:",
            players: "Spieleranzahl: 2-6 Spieler",
            age: "Alter: Ab 12 Jahren",
            duration: "Spieldauer: 20-40 Minuten"
          }
        },
        purchase: {
          quantity: "Anzahl",
          buyNow: "Jetzt kaufen",
          securePayment: "Sichere Bezahlung mit SSL-Verschlüsselung"
        },
        cart: {
          title: "Warenkorb",
          total: "Gesamt",
          checkout: "Zur Kasse",
          continueShopping: "Weiter einkaufen",
          remove: "Entfernen",
          empty: "Ihr Warenkorb ist leer",
          quantity: "Anzahl",
          price: "Preis",
          shipping: "Versand",
          free: "Kostenlos",
          subtotal: "Zwischensumme",
          backToShop: "Zurück zum Shop",
          proceedToCheckout: "Weiter zur Kasse",
          secureCheckout: "Sichere Bezahlung",
        },
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
