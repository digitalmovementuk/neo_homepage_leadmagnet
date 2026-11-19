import { Link } from "react-router-dom";
import { LegalPage, LegalSection } from "./LegalPage";

const a = "text-ink underline underline-offset-2 hover:text-[#0071E3]";

export function Impressum() {
  return (
    <LegalPage eyebrow="Rechtliches" title="Impressum" path="/impressum/">
      <LegalSection title="Angaben gemäß § 5 DDG">
        <p>
          Digital Movement Germany
          <br />
          Raoul Müller
          <br />
          Kolonnenstraße 8
          <br />
          10827 Berlin
          <br />
          Deutschland
        </p>
        <p>NEO THE AGENCY ist eine Marke von Digital Movement Germany.</p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          Telefon:{" "}
          <a className={a} href="tel:+4916096897003">
            +49 160 9689 7003
          </a>
          <br />
          WhatsApp:{" "}
          <a className={a} href="https://wa.me/4916096897003" target="_blank" rel="noopener noreferrer">
            +49 160 9689 7003
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          Raoul Müller
          <br />
          Kolonnenstraße 8, 10827 Berlin
        </p>
      </LegalSection>

      <LegalSection title="Verbraucherstreitbeilegung">
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>

      <LegalSection title="Haftung für Inhalte und Links">
        <p>
          Wir erstellen die Inhalte dieser Website mit Sorgfalt. Für die Richtigkeit, Vollständigkeit
          und Aktualität können wir jedoch keine Gewähr übernehmen. Für Inhalte externer Websites, auf
          die wir verlinken, sind ausschließlich deren Betreiber verantwortlich. Werden uns
          Rechtsverstöße bekannt, entfernen wir die betreffenden Inhalte oder Links umgehend.
        </p>
      </LegalSection>

      <LegalSection title="Urheberrecht">
        <p>
          Texte, Bilder, Grafiken und Videos auf dieser Website unterliegen dem Urheberrecht.
          Vervielfältigung oder Verwendung außerhalb der Grenzen des Urheberrechts bedarf unserer
          vorherigen Zustimmung.
        </p>
      </LegalSection>

      <p className="text-[14px] text-ink-muted">
        Informationen zum Umgang mit Ihren Daten finden Sie in unserer{" "}
        <Link className={a} to="/datenschutz/">
          Datenschutzerklärung
        </Link>
        .
      </p>
    </LegalPage>
  );
}
