import Newsletter, { Field, SelectField, Submit } from "components/Newsletter";
import { Page, PageHeading } from "components/Page";
import { Card, Heading, Text, Link as A, Box, Flex, Button } from "rebass";
import { Center, Info } from "components/Learning";
import { Grid } from "theme-ui";
import Link from "next/link";

export default function Demokratie() {
  return (
    <Page heading="Jugendliche stimmen ab – Ein Experiment">
      <Text mt={3}>
        <img
          src="/images/voty_module_2.svg"
          alt="Bundeshaus"
          style={{ float: "right", marginLeft: 30, maxWidth: "30%" }}
        />
        Wie motivieren wir Jugendliche für unsere Demokratie? Wir möchten
        gemeinsam mit engagierten Lehrpersonen ein Experiment starten und im
        November Test-Abstimmungen für Schülerinnen und Schüler durchführen.
      </Text>
      <Text my={4}>
        Wenn die Schweiz am 29. November über die
        <b>«Konzernverantwortungsinitiative»</b> und das{" "}
        <b>«Stop Palmöl – Referendum</b>
        abstimmt, sind das Themen, zu denen auch Jugendliche eine Meinung haben.
        Wir möchten mit mindestens 50 Klassen in der Schweiz eine
        <b>Test-Abstimmung</b> durchführen und dazu brauchen wir eure Hilfe:
      </Text>
      <Flex my={4} alignItems="center" flexDirection="column">
        <Flex my={2}>
          <Text px={3} textAlign="center">
            ✅
          </Text>
          <Text maxWidth="600px">
            Ja, ich unterrichte politische Bildung in meiner Klasse und nehme
            auch Bezug auf aktuellen Themen und Abstimmungen
          </Text>
        </Flex>
        <Flex my={2}>
          <Text px={3} textAlign="center">
            ✅
          </Text>
          <Text maxWidth="600px">
            Ich nehme mir 2-4 Lektionen Zeit im November, um die Vorlagen mit
            den SchülerInnen zu diskutieren (z.B. mit easyvote.ch-Materialien)
          </Text>
        </Flex>
        <Flex my={2}>
          <Text px={3} textAlign="center">
            ✅
          </Text>
          <Text maxWidth="600px">
            Ich führe die Test-Abstimmung mit meiner Klasse online durch und
            bespreche im Nachgang das Resultat mit der Klasse
          </Text>
        </Flex>
      </Flex>
      <Card>
        <Heading as="h2" mt={0}>
          Klingt interessant? Dann tragen Sie sich ein für weitere
          Informationen:
        </Heading>
        <Signup />
        <Box mb={2} mt={-3} pl={[0, 0, 115]}>
          <Text>
            <em>
              Wir sind uns bewusst, das die Zeit bis Ende November in der
              Planung knapp ist. Aber wenn wir es gemeinsam schaffen, genügend
              Klassen zu motivieren, dann hat das Ergebnis der Test-Abstimmung
              auch eine statistische Signifikanz und repräsentiert die Meinung
              der Jugend zu relevanten Themen.
            </em>
          </Text>
        </Box>
      </Card>

      <Box mt={3}>
        <Text>
          Kennen Sie interessierte Lehrpersonen, welche ebenfalls politische
          Bildung unterrichten (Sekundarstufe, Gymnasium, Berufsschulen). Dann
          versuchen Sie unbedingt, sie für dieses Experiment zu gewinnen.
        </Text>
      </Box>
      <PageHeading>Fragen und Antworten</PageHeading>
      <Heading as="h3">Wer steht hinter https://votyapp.ch/?</Heading>
      <Text>
        voty ist ein Projekt des Vereins «Teachen!», welcher während des
        Corona-Lockdowns von engagierten Eltern, Lehrpersonen und
        Informatiker|innen gegründet wurde. Das Projekt wird unterstützt vom
        prototypefund.opendata.ch.
      </Text>
      <Heading as="h3">
        Wie funktionieren die Online – Testabstimmungen?
      </Heading>
      <Text>
        Auf unserer Website können Lehrpersonen mit ihren Klassen die Abstimmung
        auf Laptops, iPads oder Smartphones durchführen. Wir stellen sicher, das
        nur registrierte Klassen mitmachen können, das jede Person nur einmal
        abstimmen kann und das sämtliche Stimmabgaben anonym bleiben.
      </Text>
      <Heading as="h3">
        Wie wird die Anonymität und der Datenschutz sichergestellt?
      </Heading>
      <Text>
        Die abgegebenen Stimmen werden nicht mit Personen verknüpft. Es wird
        einzig registriert, welche Benutzer|innen bereits ihre Stimme abgegeben
        haben. Die Altersgruppe sowie der Kanton werden zu jeder Stimme
        gespeichert, eine «De-Anonymisierung» auf Ebene Person oder Schulklasse
        ist nicht möglich.
      </Text>
      <Heading as="h3">
        Wer sieht am Schluss die Resultate der Abstimmungen?
      </Heading>
      <Text>
        Eine Auswertung der Resultate wird nur auf Ebene Kanton und Altersstufe
        möglich sein. Wenn wir es gemeinsam schaffen, genügend Stimmen für ein
        statistisch signifikantes Ergebnis zu sammeln, dann möchten wir die
        Resultate in aggregierter Form der Öffentlichkeit vorstellen.
      </Text>
      <Heading as="h3">Wie stellt ihr statistische Signifikanz sicher?</Heading>
      <Text>
        Wir sind in Kontakt mit{" "}
        <a href="https://twitter.com/claudelongchamp" target="_blank">
          Claude Longchamps
        </a>{" "}
        und werden sicherstellen, das unser Vorgehen wissenschaftlich kompetent
        begleitet wird. Je diverser unsere Test-Klassen sind (Kantone,
        Altersstufen, Schultypen), desto solider wird die Aussagekraft der
        Resultate.
      </Text>
      <Heading as="h3">Macht auch die Romandie und das Tessin mit?</Heading>
      <Text>
        Wenn Sie Kontakte in diese Sprachregionen haben, dann freuen wir uns
        sehr über eine{" "}
        <Link href="/kontakt">
          <a>Email</a>
        </Link>
        !
      </Text>
      <Heading as="h3">
        Ich habe keine Frage, aber eine kritische Anmerkung!
      </Heading>
      <Text>
        Wir sind auf Ihr Feedback angewiesen und freuen uns sehr über kritische
        Fragen. Bitte nehmen sie mit uns{" "}
        <Link href="/kontakt">
          <a>Kontakt</a>
        </Link>{" "}
        auf.
      </Text>
    </Page>
  );
}

const Signup = () => (
  <form action="https://newsletter.teachen.ch/subscribe" method="POST">
    <input type="hidden" name="Funktion" value="Lehrer/-in" />
    <input type="hidden" name="subform" value="yes" />
    <input type="hidden" name="list" value="tpTmOmECEZr7Zjk76307UvTA" />
    <Grid gap={3} pb={4} columns={[0, 0, "100px 3fr 1fr"]}>
      <Field id="email" label="Email" />
      <Button type="submit" name="submit" variant="primary">
        Abschicken
      </Button>
    </Grid>
  </form>
);
