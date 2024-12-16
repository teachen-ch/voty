import { Heading, Text, Box, Link } from "rebass";
import { A } from "components/Breadcrumb";
import { HideFeature } from "./HideFeature";

export const FAQ: React.FC = () => (
  <Box className="faq" fontSize={2} textAlign="left">
    <Heading as="h3" mt={3}>
      Wer steht hinter voty.ch?
    </Heading>
    <Text>
      voty.ch war ein Projekt des Vereins «Teachen!», welches durch den
      prototypefund.opendata.ch unterstützt wurde. Aktuell wird die Plattform
      durch S. Niederhauser unentgeltlich betreut.
    </Text>
    <Heading as="h3">Wie funktioniert die Onlineabstimmung?</Heading>
    <Text>
      Auf dieser Website können Lehrpersonen mit ihren Klassen (Sek-I,
      Gymnasium, Berufsschulen) die Abstimmung auf Laptops, Tablets oder
      Smartphones durchführen. Wir stellen sicher, dass nur registrierte Klassen
      mitmachen können, dass jede Person nur einmal abstimmen kann und dass
      sämtliche Stimmabgaben anonym bleiben.{" "}
      <HideFeature id="demo">
        Der ganze Ablauf kann auf{" "}
        <A href="/demo" variant="underline">
          demo.voty.ch
        </A>{" "}
        getestet werden.
      </HideFeature>
    </Text>
    <Heading as="h3">Wie kann meine Klasse auf voty.ch abstimmen?</Heading>
    <Text>
      Über den Button{" "}
      <A href="/user/signup#form" variant="underline">
        «Jetzt Klasse anmelden»
      </A>{" "}
      können sich Lehrpersonen auf voty.ch kostenlos registrieren. Nach
      Bestätigung der Email-Adresse kann eine oder mehrere Klasse erstellt
      werden. Danach können die aktuellen Abstimmungen ausgewählt («E-ID Gesetz»
      und «Verhüllungsverbot-Initiative», «Abkommen mit Indonesien») und
      schliesslich die SuS via Email eingeladen werden. Wir empfehlen, die
      Themen vorgängig mit den Materialien von{" "}
      <Link
        href="https://www.easyvote.ch/de/school/unterrichtsmaterial"
        rel="noreferrer"
      >
        easyvote.ch
      </Link>{" "}
      zu diskutieren .
    </Text>
    <Heading as="h3">
      Wie wird die Anonymität und der Datenschutz sichergestellt?
    </Heading>
    <Text>
      Die abgegebenen Stimmen werden nicht mit Personen verknüpft. Es wird
      einzig registriert, welche Benutzer*innen bereits ihre Stimme abgegeben
      haben. Die Altersgruppe sowie der Kanton werden zu jeder Stimme
      gespeichert, eine «De-Anonymisierung» auf Ebene Person oder Klasse ist
      nicht möglich.
    </Text>
    <Heading as="h3">
      Wer sieht am Schluss die Resultate der Abstimmungen?
    </Heading>
    <Text>
      Eine Auswertung der Resultate wird nur auf Ebene Kanton und Altersstufe
      möglich sein. Wenn wir es gemeinsam schaffen, genügend Stimmen für ein
      statistisch signifikantes Ergebnis zu sammeln, möchten wir die Resultate
      in aggregierter Form der Öffentlichkeit vorstellen.
    </Text>
    <Heading as="h3">Wie stellt ihr statistische Signifikanz sicher?</Heading>
    <Text>
      Wir möchten gemeinsam mit{" "}
      <Link
        href="https://twitter.com/claudelongchamp"
        target="_blank"
        rel="noreferrer"
      >
        Claude Longchamps
      </Link>{" "}
      sicherstellen, dass unser Vorgehen wissenschaftlich kompetent begleitet
      wird. Je diverser unsere Testklassen sind (Kantone, Altersstufen,
      Schultypen), desto solider wird die Aussagekraft der Resultate.
    </Text>
    <Heading as="h3">Macht auch die Romandie und das Tessin mit?</Heading>
    <Text>
      Wenn du Kontakte in diese Sprachregionen hast, dann freuen wir uns sehr
      über <A href="/kontakt">Email</A>!
    </Text>
    <Heading as="h3">
      Ich habe keine Frage, aber eine kritische Anmerkung!
    </Heading>
    <Text>
      Wir sind auf dein Feedback angewiesen. Bitte nimm mit uns{" "}
      <A href="/kontakt">Kontakt</A> auf.
    </Text>
  </Box>
);
