import { Field } from "components/Newsletter";
import { Page, PageHeading } from "components/Page";
import { Card, Heading, Text, Box, Flex, Button } from "rebass";
import { Grid } from "theme-ui";
import Link from "next/link";
import { ReactElement } from "react";

export default function Abstimmung(): ReactElement {
  return (
    <Page heading="Jugendliche stimmen ab – ein Experiment">
      <Text mt={3}>
        <img
          src="/images/voty_module_2.svg"
          alt="Bundeshaus"
          style={{ float: "right", marginLeft: 30, maxWidth: "30%" }}
        />
        Wie motivieren wir Jugendliche für unsere Demokratie? Wir möchten
        gemeinsam mit engagierten Lehrpersonen ein Experiment starten und im
        November Abstimmungen für Schülerinnen und Schüler durchführen. Wir sind
        überzeugt: Interesse für Politik entsteht dann, wenn man diskutieren und
        mitentscheiden kann. Eine solche Gelegenheit möchten wir erschaffen.
      </Text>
      <Text my={4}>
        Wenn die Schweiz am 29. November über die{" "}
        <b>«Konzernverantwortungsinitiative»</b> und die{" "}
        <b>«Kriegsgeschäfte Initiative»</b> abstimmt, sind das Themen, zu denen
        auch Jugendliche eine Meinung haben. Wir möchten mit mindestens 50
        Klassen in der Schweiz eine <b>Abstimmung</b> durchführen und dazu
        brauchen wir Ihre Hilfe:
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
            Ich führe die Abstimmung mit meiner Klasse online durch und
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
              Klassen zu motivieren, dann hat das Ergebnis der Abstimmung auch
              eine statistische Signifikanz und repräsentiert die Meinung der
              Jugend zu relevanten Themen. Herzlichen Dank für Ihre Mithilfe!
            </em>
          </Text>
        </Box>
      </Card>

      <Box mt={5} mb={100} maxWidth="600px" mx={"auto"}>
        <Text fontSize={4} textAlign="center" sx={{ lineHeight: "1.5" }}>
          Kennen Sie interessierte Lehrpersonen, welche ebenfalls politische
          Bildung unterrichten (Sekundarstufe, Gymnasium, Berufsschulen). Dann
          versuchen Sie doch, sie ebenfalls für dieses Experiment zu engagieren.
        </Text>
      </Box>

      <Stats />

      <PageHeading>Fragen und Antworten</PageHeading>
      <Heading as="h3">Wer steht hinter https://votyapp.ch/?</Heading>
      <Text>
        voty ist ein Projekt des Vereins «Teachen!», welcher während des
        Corona-Lockdowns von engagierten Eltern, Lehrpersonen und
        Informatiker|innen gegründet wurde. Das Projekt wird unterstützt durch
        den prototypefund.opendata.ch.
      </Text>
      <Heading as="h3">Wie funktioniert die Online – Abstimmung?</Heading>
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
        Wir möchten gemeinsam mit{" "}
        <a
          href="https://twitter.com/claudelongchamp"
          target="_blank"
          rel="noreferrer"
        >
          Claude Longchamps
        </a>{" "}
        sicherstellen, das unser Vorgehen wissenschaftlich kompetent begleitet
        wird. Je diverser unsere Test-Klassen sind (Kantone, Altersstufen,
        Schultypen), desto solider wird die Aussagekraft der Resultate.
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
        Wir sind auf Ihr Feedback angewiesen. Bitte nehmen sie mit uns{" "}
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
    <input type="hidden" name="subform" value="yes" />
    <input type="hidden" name="list" value="OBApcqKWRIftOg4d892voU2A" />
    <Grid gap={3} pb={4} columns={[0, 0, "100px 3fr 1fr"]}>
      <Field id="email" label="Email" />
      <Button type="submit" name="submit" variant="primary">
        Abschicken
      </Button>
    </Grid>
  </form>
);

const Stats = () => (
  <Card>
    <Heading mt={0}>Aktueller Stand</Heading>
    <Grid columns="1fr 4fr">
      <label>Anzahl Klassen:</label>
      <ClassBar classes={7} total={50} />

      <label>Diversität Kantone:</label>
      <CantonsBar cantons="BS, BE, LU, ZH" diversity={23} />

      <label>Verteilung Typus:</label>
      <TypeBar
        types={{ Berufsschulen: 0.2, "Sekundarstufe I": 0.5, Gymnasien: 0.3 }}
      />
    </Grid>
  </Card>
);

const ClassBar = ({ classes, total }: { classes: number; total: number }) => (
  <Flex height="30px" width="100%">
    <Box
      width={classes / total}
      sx={{
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        textAlign: "center",
        lineHeight: 1.7,
      }}
      bg="primary"
      color="white"
    >
      {classes}
    </Box>
    <Box
      width={(total - classes) / total}
      bg="white"
      sx={{
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        lineHeight: 1.7,
      }}
    >
      &nbsp; mindestens {total} Klassen
    </Box>
  </Flex>
);

const CantonsBar = ({
  cantons,
  diversity,
}: {
  cantons: string;
  diversity: number;
}) => (
  <Box
    height="30px"
    pl={3}
    sx={{
      borderRadius: 20,
      lineHeight: 1.7,
      backgroundImage: `linear-gradient(133deg, rgba(36,185,7,0.5) 0%, rgba(255,255,255,1) ${diversity}%)`,
    }}
  >
    {cantons}
  </Box>
);

const TypeBar = ({ types }: { types: any }) => (
  <Box
    height="30px"
    pl={3}
    bg="white"
    sx={{
      borderRadius: 20,
    }}
  >
    <Flex>
      {Object.keys(types).map((name, ix) => (
        <Box
          key={name}
          width={`${types[name] * 100}%`}
          sx={{
            textAlign: "center",
            textOverflow: "ellipsis",
            overflow: "hidden",
            lineHeight: 1.7,
            borderRight: ix < 2 ? "3px solid lightgray" : "",
          }}
        >
          {name}
        </Box>
      ))}
    </Flex>
  </Box>
);
