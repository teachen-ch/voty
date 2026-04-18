import { Text, Box, Link } from "components/ui";
import { H3 } from "components/Page";
import { A } from "components/Breadcrumb";
import { HideFeature } from "./HideFeature";

export const FAQ: React.FC<React.PropsWithChildren<unknown>> = () => (
  <Box className="faq text-base text-left">
    <H3 className="mt-4">Wer steht hinter voty.ch?</H3>
    <Text>
      voty.ch ist ein Projekt des Non-Profit Vereins «voty.ch», welches initial
      durch den prototypefund.opendata.ch und die Stiftung mercator-schweiz.ch
      unterstützt wurde.
    </Text>
    <H3>Wie funktioniert die Onlineabstimmung?</H3>
    <Text>
      Auf dieser Website können Lehrpersonen mit ihren Klassen (Sek-I,
      Gymnasium, Berufsschulen) die Abstimmung auf Laptops, Tablets oder
      Smartphones durchführen. Wir stellen sicher, dass nur registrierte Klassen
      mitmachen können, dass jede Person nur einmal abstimmen kann und dass
      sämtliche Stimmabgaben anonym bleiben.{" "}
      <HideFeature id="demo">
        Der ganze Ablauf kann auf{" "}
        <A href="/demo" className="underline">
          demo.voty.ch
        </A>{" "}
        getestet werden.
      </HideFeature>
    </Text>
    <H3>Wie kann meine Klasse auf voty.ch abstimmen?</H3>
    <Text>
      Über den Button{" "}
      <A href="/user/signup#form" className="underline">
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
    <H3>Wie wird die Anonymität und der Datenschutz sichergestellt?</H3>
    <Text>
      Die abgegebenen Stimmen werden nicht mit Personen verknüpft. Es wird
      einzig registriert, welche Benutzer*innen bereits ihre Stimme abgegeben
      haben. Die Altersgruppe sowie der Kanton werden zu jeder Stimme
      gespeichert, eine «De-Anonymisierung» auf Ebene Person oder Klasse ist
      nicht möglich.
    </Text>
    <H3>Wer sieht am Schluss die Resultate der Abstimmungen?</H3>
    <Text>
      Eine Auswertung der Resultate wird nur auf Ebene Kanton und Altersstufe
      möglich sein. Wenn wir es gemeinsam schaffen, genügend Stimmen für ein
      statistisch signifikantes Ergebnis zu sammeln, möchten wir die Resultate
      in aggregierter Form der Öffentlichkeit vorstellen.
    </Text>
    <H3>Wie stellt ihr statistische Signifikanz sicher?</H3>
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
    <H3>Macht auch die Romandie und das Tessin mit?</H3>
    <Text>
      Wenn du Kontakte in diese Sprachregionen hast, dann freuen wir uns sehr
      über <A href="/kontakt">Email</A>!
    </Text>
    <H3>Ich habe keine Frage, aber eine kritische Anmerkung!</H3>
    <Text>
      Wir sind auf dein Feedback angewiesen. Bitte nimm mit uns{" "}
      <A href="/kontakt">Kontakt</A> auf.
    </Text>
  </Box>
);
