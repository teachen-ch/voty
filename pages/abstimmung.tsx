import { AppPage } from "components/Page";
import { Heading, Text, Box, Flex, Link as A } from "rebass";
import { Grid } from "theme-ui";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { CreateUserForm, Success } from "pages/user/signup";
import { Role } from "graphql/types";
import { SessionUser } from "state/user";
import { ReadMore } from "components/ReadMore";

export default function Abstimmung(): ReactElement {
  const [user, setUser] = useState<SessionUser | undefined>(undefined);
  return (
    <AppPage heading="Jugendliche stimmen ab – jetzt Schulklasse anmelden">
      <Text textAlign="left">
        <Text mt={4}>
          <img
            src="/images/voty_module_2.svg"
            alt="Bundeshaus"
            style={{
              float: "right",
              marginLeft: 30,
              width: "190px",
              maxWidth: "30%",
            }}
          />
          Wie motivieren wir Jugendliche für unsere Demokratie? Wir möchten
          gemeinsam mit engagierten Lehrpersonen ein Experiment starten und im
          November mit mindestens 50 Schulklassen über die beiden nationalen
          Vorlagen abstimmen. Interesse für Politik entsteht dann, wenn man
          diskutieren und mitentscheiden kann. Helfen Sie mit!
        </Text>
        <Flex
          my={4}
          alignItems="center"
          flexDirection="column"
          fontSize={[2, 2, 3]}
        >
          <Flex my={2}>
            <Text px={3} textAlign="center">
              <IconCheckWhite />
            </Text>
            <Text maxWidth="600px">
              Ja, ich unterrichte politische Bildung in meiner Klasse und nehme
              auch Bezug auf aktuellen Themen und Abstimmungen
            </Text>
          </Flex>
          <Flex my={2}>
            <Text px={3} textAlign="center">
              <IconCheckWhite />
            </Text>
            <Text maxWidth="600px">
              Ich nehme mir im November Zeit, um die Vorlagen mit den
              Schüler*innen zu diskutieren (z. B. mit Material von{" "}
              <A
                href="https://www.easyvote.ch/de/school/"
                rel="noreferrer"
                variant="underline"
              >
                easyvote.ch
              </A>{" "}
              )
            </Text>
          </Flex>
          <Flex my={2}>
            <Text px={3} textAlign="center">
              <IconCheckWhite />
            </Text>
            <Text maxWidth="600px">
              Ich führe die Abstimmung mit meiner Klasse online durch und
              bespreche im Nachgang das Resultat
            </Text>
          </Flex>
        </Flex>
        {!user ? (
          <>
            <Heading as="h2">
              Interessiert? Melden Sie jetzt ihre Klasse jetzt an
            </Heading>
            <CreateUserForm
              noFocus
              setUser={setUser}
              omitRole
              defaultRole={Role.Teacher}
            >
              <Text mt={3} fontSize={3}>
                Wir sind uns bewusst, dass die Zeit bis Ende November in der
                Planung knapp ist. Aber wenn wir es gemeinsam schaffen, genügend
                Klassen zu motivieren, dann hat das Ergebnis der Abstimmung auch
                eine statistische Signifikanz und repräsentiert die Meinung der
                Jugend zu relevanten Themen. Herzlichen Dank für Ihre Mithilfe!
              </Text>
            </CreateUserForm>
          </>
        ) : (
          <>
            <Heading as="h2">Die Anmeldung hat geklappt!</Heading>
            <Success user={user} />
          </>
        )}
      </Text>

      <Box mt={5} mb={5}>
        <Text
          fontSize={[3, 3, 4]}
          pl={4}
          fontWeight="semi"
          sx={{ lineHeight: "1.5", borderLeft: "6px solid white" }}
        >
          Kennen Sie interessierte Lehrpersonen, welche ebenfalls politische
          Bildung unterrichten (Sekundarstufe, Gymnasium, Berufsschulen). Dann
          versuchen Sie doch, sie ebenfalls für dieses Experiment zu engagieren.
        </Text>
      </Box>

      <Stats />

      <Box my={5} />
      <ReadMore title="Fragen und Antworten">
        <FAQ />
      </ReadMore>
    </AppPage>
  );
}

export const FAQ: React.FC = () => (
  <Box className="faq" textAlign="left" fontSize={2}>
    <Heading as="h3" mt={3}>
      Wer steht hinter voty.ch?
    </Heading>
    <Text>
      voty.ch ist ein Projekt des Vereins «Teachen!», welcher während des
      Corona-Lockdowns von engagierten Eltern, Lehrpersonen und
      Informatiker*innen gegründet wurde. Das Projekt wird unterstützt durch den
      prototypefund.opendata.ch.
    </Text>
    <Heading as="h3">Wie funktioniert die Onlineabstimmung?</Heading>
    <Text>
      Auf unserer Website können Lehrpersonen mit ihren Klassen die Abstimmung
      auf Laptops, Tablets oder Smartphones durchführen. Wir stellen sicher,
      dass nur registrierte Klassen mitmachen können, dass jede Person nur
      einmal abstimmen kann und dass sämtliche Stimmabgaben anonym bleiben.
    </Text>
    <Heading as="h3">
      Wie wird die Anonymität und der Datenschutz sichergestellt?
    </Heading>
    <Text>
      Die abgegebenen Stimmen werden nicht mit Personen verknüpft. Es wird
      einzig registriert, welche Benutzer*innen bereits ihre Stimme abgegeben
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
      statistisch signifikantes Ergebnis zu sammeln, möchten wir die Resultate
      in aggregierter Form der Öffentlichkeit vorstellen.
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
      sicherstellen, dass unser Vorgehen wissenschaftlich kompetent begleitet
      wird. Je diverser unsere Testklassen sind (Kantone, Altersstufen,
      Schultypen), desto solider wird die Aussagekraft der Resultate.
    </Text>
    <Heading as="h3">Macht auch die Romandie und das Tessin mit?</Heading>
    <Text>
      Wenn Sie Kontakte in diese Sprachregionen haben, dann freuen wir uns sehr
      über{" "}
      <Link href="/kontakt">
        <a>Email</a>
      </Link>
      !
    </Text>
    <Heading as="h3">
      Ich habe keine Frage, aber eine kritische Anmerkung!
    </Heading>
    <Text>
      Wir sind auf Ihr Feedback angewiesen. Bitte nehmen Sie mit uns{" "}
      <Link href="/kontakt">
        <a>Kontakt</a>
      </Link>{" "}
      auf.
    </Text>
  </Box>
);

const Stats: React.FC = () => (
  <Box fontSize={2}>
    <Heading mt={0}>Aktueller Stand</Heading>
    <Grid columns={[0, 0, "160px auto"]}>
      <label>Anzahl Klassen:</label>
      <ClassBar classes={12} total={50} />

      <label>Diversität Kantone:</label>
      <CantonsBar cantons="BE, BS, LU, SG, ZH, " diversity={25} />

      <label>Verteilung Typus:</label>
      <TypeBar
        types={{ Berufsschulen: 0.2, "Sekundarstufe I": 0.56, Gymnasien: 0.24 }}
      />
    </Grid>
  </Box>
);

const ClassBar: React.FC<{ classes: number; total: number }> = ({
  classes,
  total,
}) => (
  <Flex height="30px" width="100%">
    <Box
      width={classes / total}
      sx={{
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        textAlign: "center",
        lineHeight: 1.4,
      }}
      bg="primary"
      color="white"
    >
      {classes}
    </Box>
    <Box
      width={(total - classes) / total}
      bg="white"
      color="gray"
      sx={{
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        lineHeight: 1.4,
      }}
    >
      &nbsp; mindestens {total} Klassen
    </Box>
  </Flex>
);

const CantonsBar: React.FC<{
  cantons: string;
  diversity: number;
}> = ({ cantons, diversity }) => (
  <Box
    height="30px"
    color="gray"
    pl={3}
    sx={{
      borderRadius: 20,
      lineHeight: 1.4,
      backgroundImage: `linear-gradient(133deg, rgba(36,185,7,0.5) 0%, rgba(255,255,255,1) ${diversity}%)`,
    }}
  >
    {cantons}
  </Box>
);

const TypeBar: React.FC<{ types: Record<string, number> }> = ({ types }) => (
  <Box
    height="30px"
    pl={3}
    bg="white"
    fontSize={1}
    sx={{
      borderRadius: 20,
    }}
  >
    <Flex>
      {Object.keys(types).map((name, ix) => (
        <Box
          key={name}
          width={`${types[name] * 100}%`}
          color="gray"
          sx={{
            textAlign: "center",
            textOverflow: "ellipsis",
            overflow: "hidden",
            lineHeight: 1.9,
            borderRight: ix < 2 ? "3px solid lightgray" : "",
          }}
        >
          {name}
        </Box>
      ))}
    </Flex>
  </Box>
);

export const IconCheckWhite: React.FC = () => (
  <img
    src="/images/icon_yes.svg"
    height="25px"
    style={{ filter: "brightness(100)" }}
  />
);
