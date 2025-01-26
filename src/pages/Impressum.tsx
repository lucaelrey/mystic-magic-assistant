import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Impressum = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto glass-card p-8">
          <h1 className="text-2xl font-semibold mb-8">Impressum</h1>
          
          <div className="space-y-6 text-sm leading-relaxed">
            <div>
              <strong className="font-semibold">Verantwortliche Instanz:</strong><br />
              Nussbaumer Artworks<br />
              Viktoriastrasse 21<br />
              3013 Bern<br />
              Schweiz<br />
              <strong className="font-semibold">E-Mail</strong>: contact@mysticgame.ch
            </div>

            <div>
              <strong className="font-semibold">Vertretungsberechtigte Personen</strong><br />
              Inhaber: Luca Nussbaumer
            </div>

            <div>
              <strong className="font-semibold">Name des Unternehmens</strong>: Nussbaumer Artworks<br />
              <strong className="font-semibold">Registrationsnummer</strong>: CHE-169.382.947
            </div>

            <div>
              <strong className="font-semibold">Haftungsausschluss</strong><br />
              Der Autor übernimmt keine Gewähr für die Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.<br />
              Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.
            </div>

            <div>
              Alle Angebote sind freibleibend. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
            </div>

            <div>
              <strong className="font-semibold">Haftungsausschluss für Inhalte und Links</strong><br />
              Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des jeweiligen Nutzers.
            </div>

            <div>
              <strong className="font-semibold">Urheberrechtserklärung</strong><br />
              Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website, gehören ausschliesslich Nussbaumer Artworks oder den speziell genannten Rechteinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung des Urheberrechtsträgers im Voraus einzuholen.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;