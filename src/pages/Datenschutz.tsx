import { LegalPage, LegalSection } from "./LegalPage";

export function Datenschutz() {
  return (
    <LegalPage
      eyebrow="Rechtliches"
      title="Datenschutzerklärung"
      docTitle="Datenschutzerklärung · NEO THE AGENCY"
      canonical="https://www.neotheagency.de/datenschutz"
    >
      <LegalSection title="1. Verantwortlicher">
        <p>
          NEO THE AGENCY, Inhaber: Raoul Müller und Johannes Kaluc, Kolonnenstraße 8, 10827 Berlin.
          <br />
          Telefon und WhatsApp: +49 160 9689 7003
        </p>
        <p>
          Diese Erklärung beschreibt, welche personenbezogenen Daten beim Besuch von
          www.neotheagency.de verarbeitet werden. Wir setzen keine Cookies, keine Analyse-Tools und
          keine Werbe-Tracker ein.
        </p>
      </LegalSection>

      <LegalSection title="2. Hosting und Server-Protokolle">
        <p>
          Die Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA,
          gehostet. Beim Aufruf jeder Seite verarbeitet Vercel technisch notwendige Daten: IP-Adresse,
          Datum und Uhrzeit, aufgerufene Adresse, Referrer, Browser und Betriebssystem. Das ist nötig,
          um die Website auszuliefern und vor Missbrauch zu schützen (Art. 6 Abs. 1 lit. f DSGVO). Die
          Protokolle werden von Vercel nur kurzfristig gespeichert und danach gelöscht.
        </p>
        <p>
          Eine Übermittlung in die USA ist möglich. Sie erfolgt auf Grundlage des EU-US Data Privacy
          Framework beziehungsweise der EU-Standardvertragsklauseln (Art. 45, 46 DSGVO).
        </p>
      </LegalSection>

      <LegalSection title="3. Schriften, Bilder und Videos">
        <p>
          Schriften, Bilder und Videos liegen auf unserem eigenen Server. Beim Laden der Seite werden
          dafür keine Daten an Dritte wie Google Fonts übertragen.
        </p>
      </LegalSection>

      <LegalSection title="4. Spracheinstellung">
        <p>
          Die Seite ist auf Deutsch. Die englische Fassung hat eigene Adressen unter /en/. Wählen Sie
          eine Sprache, wechseln wir nur die Adresse. Dafür speichern wir nichts in Ihrem Browser.
        </p>
      </LegalSection>

      <LegalSection title="5. Kontakt per Telefon, WhatsApp und Formular">
        <p>
          Rufen Sie uns an oder schreiben Sie uns, verarbeiten wir Ihre Angaben, um Ihre Anfrage zu
          beantworten (Art. 6 Abs. 1 lit. b DSGVO).
        </p>
        <p>
          Die Formulare auf dieser Website speichern nichts auf unserem Server. Beim Absenden öffnet
          sich WhatsApp mit einer vorausgefüllten Nachricht, die Sie selbst prüfen und absenden.
          WhatsApp wird von WhatsApp Ireland Limited, Merrion Road, Dublin 4, Irland, betrieben; dabei
          gelten die Datenschutzhinweise von WhatsApp. Wir löschen Anfragen, sobald sie erledigt sind
          und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </LegalSection>

      <LegalSection title="6. Kostenlose SEO-Analyse">
        <p>
          Nutzen Sie die SEO-Analyse, senden wir die eingegebene Domain und Ihre Angaben zu
          Branche und Kennzahlen an eine Serverfunktion bei Vercel. Diese ruft öffentlich verfügbare
          Ranking-Daten bei Semrush Inc., 800 Boylston Street, Suite 2475, Boston, MA 02199, USA, ab.
          An Semrush wird nur die Domain beziehungsweise werden nur Suchbegriffe übermittelt, keine
          Angaben zu Ihrer Person. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, weil Sie die Analyse
          anfordern. Die Ergebnisse werden nicht dauerhaft gespeichert.
        </p>
      </LegalSection>

      <LegalSection title="7. Links zu anderen Websites">
        <p>
          Wir verlinken auf Instagram, Google und Websites unserer Kunden. Daten werden erst übertragen,
          wenn Sie einen solchen Link anklicken. Ab dann gelten die Datenschutzhinweise des jeweiligen
          Anbieters.
        </p>
      </LegalSection>

      <LegalSection title="8. Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17),
          Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch
          gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21). Wenden Sie sich dafür an
          die oben genannten Kontaktdaten.
        </p>
        <p>
          Sie können sich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel bei
          der Berliner Beauftragten für Datenschutz und Informationsfreiheit, Alt-Moabit 59–61, 10555
          Berlin.
        </p>
      </LegalSection>

      <p className="text-[14px] text-ink-muted">Stand: November 2026</p>
    </LegalPage>
  );
}
