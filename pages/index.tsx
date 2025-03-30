import Head from "next/head";
import { Flex, Heading, Box, Text, Button } from "rebass";
import { Background, Container, H1 } from "components/Page";
import { Footer } from "components/Footer";
import { TopBar } from "components/TopBar";
import { useRouter } from "next/router";
import NextImage from "next/legacy/image";
import Link from "next/link";
import TweetClaude from "../public/images/tweet_claude_longchamp.png";
import { A } from "components/Breadcrumb";
import { useTheme } from "util/hooks";

export default function Home(): React.ReactElement {
  const router = useRouter();
  const aula = useTheme("aula");
  const aulaPrefix = aula ? "aula_" : "";

  return (
    <>
      <Head>
        <title>voty.ch – Demokratie an die Schule!</title>
      </Head>

      <Background bgImages={[]} />
      <TopBar home />
      <Container as="main" px={[3, 3, 3, 0]} pt={[30, 35, 30, 30, 40]}>
        <H1 mt={0} fontSize={["10vw", "10vw", 50, 60, 76]} textAlign="center">
          <Text
            lineHeight={1}
            fontSize={["15vw", "15vw", 90, 100, 126]}
            fontWeight="black"
          >
            Demokratie
          </Text>{" "}
          an die Schule!
        </H1>
        <Box
          mt={[0, 0, -20, -30, -50]}
          maxWidth={["100%", "100%", "80%", "80%", "100%"]}
        >
          <NextImage
            src="/images/start_intro.svg"
            width={934}
            height={513}
            alt="voty.ch – Online Demokratie Lehrnmittel"
          />
        </Box>
        <Box maxWidth="800px" width="100%" textAlign="center">
          <Button
            onClick={() => router.push("/user/signup")}
            mt={[2, 2, 3, 4]}
            px={4}
            sx={{ borderRadius: "25px" }}
            width="600px"
            maxWidth="80%"
          >
            Jetzt Klasse anmelden!
          </Button>

          <Heading
            as="h2"
            fontSize={["30px", "30px", "40px"]}
            mt={[4, 4, 5]}
            color="primary"
          >
            Jugendliche stimmen ab
          </Heading>
          <Flex mb={[4, 4, 5]} justifyContent="space-around">
            <Text lineHeight="1.5em" fontSize={[2, 2, 3]}>
              Die Demokratie ist eines der wohl wichtigsten Güter der Schweiz.
              Aber wie ge­lingt es uns, die Ju­gendlichen für die Demo­kratie zu
              begeis­tern?
            </Text>
          </Flex>

          <Flex justifyContent="space-between" flexWrap="wrap">
            <Button
              mb={2}
              onClick={() => router.push("/projekt")}
              width={["100%", "100%", "calc(50% - 8px)"]}
            >
              Weitere Infos zum Projekt
            </Button>
            <Button
              mb={2}
              onClick={() => router.push("/newsletter")}
              width={["100%", "100%", "calc(50% - 8px)"]}
            >
              Newsletter abonnieren
            </Button>
          </Flex>
        </Box>
        <Flex
          width={["100%", "100%", "80%", "100%"]}
          maxWidth="1160px"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <H1 mt={[5, 5, 6]} width="100%" textAlign="center">
            Modul 1 – Demokratie verstehen
          </H1>
          <Teaser>
            <TeaserImage
              src="/images/start_teaser_m1a.svg"
              width={571}
              height={539}
              top={-150}
            />
            <TeaserText title="Ein Grundverständnis für Demokratie schaffen">
              Wir glauben, dass ein demokratisches Verständnis nur durch
              demokratische Praxis erreicht werden kann. Deshalb möchten wir mit
              voty.ch bereits in der Schule eine Basis für das
              Demokratieverständnis schaffen, dieses mit den Schüler*Innen
              anwenden und so die Fähigkeiten fördern, welche für eine
              demokratische Partizipation wichtig sind.
            </TeaserText>
          </Teaser>
          <Teaser reverse>
            <TeaserText title="Eine Online-Werkzeugkiste für politische Bildung">
              voty.ch stellt ein wachsendes Angebot an digitalen Lerninhalten
              für die politischen Bildung zur Verfügung. Neben einer
              Aus&shy;wahl an Videos von SRF mySchool und dem Bot «Chaty», der
              Grundbegriffe der Demo&shy;kratie erklärt, stehen vor allem
              interaktive Tools (Einzel- oder Gruppen&shy;arbeiten) im
              Vordergrund. <LearnMore href="/lernen" />
            </TeaserText>
            <TeaserImage
              src={`/images/${aulaPrefix}start_teaser_m1b.svg`}
              width={629}
              height={535}
              top={-120}
            />
          </Teaser>

          {/* ## Wie sehen gute Lehrmittel für Distance Learning aus?
              Als im Frühling 2020 die
              Schulen geschlossen wurden war Improvisation das Gebot der Stunde.
              Buchseiten wurde fotografiert, E-Learning Angebote für den
              Selbstunterricht wurden verteilt, kreative Aufgaben wurden
              erfunden. Aber wie sehen Lehrmittel aus, die den Lernprozess einer
              «Distributed Class» optimal unterstützen?{" "}
          <LearnMore href="/distance-learning" />*/}

          <H1 mt={[5, 5, 6]} width="100%" textAlign="center">
            Modul 2 – Demokratie testen
          </H1>
          <Teaser>
            <TeaserImage
              src={`/images/${aulaPrefix}start_teaser_m2a.svg`}
              width={609}
              height={536}
              top={-150}
            />
            <TeaserText title="Auch die Jugend hat eine Meinung">
              Im Vergleich zu älteren Generationen stimmen junge Menschen halb
              so oft ab. Dabei wäre gerade ihre Meinung wichtig! Wir wollen
              Jugendliche ermutigen und befähigen, ihr Stimmrecht aktiv
              wahrzunehmen – das will geübt sein und damit fangen wir am besten
              bereits in der Schule an! <LearnMore href="/abstimmung" />
            </TeaserText>
          </Teaser>
          <Teaser reverse>
            <TeaserText title="Jetzt Klasse anmelden!">
              Zu den vierteljährlichen eidgenössischen Abstimmungen führen wir
              in Zusammenarbeit mit easyvote.ch anonyme
              Online-Klassenabstimmungen durch. Melde jetzt deine Klasse für die
              Abstimmung an. <LearnMore href="/abstimmung" />
            </TeaserText>
            <TeaserImage
              src="/images/start_teaser_m2b.svg"
              width={597}
              height={529}
              top={-120}
            />
          </Teaser>

          <H1 mt={[5, 5, 6]} width="100%" textAlign="center">
            Modul 3 – Demokratie leben
          </H1>

          <Teaser reverse>
            <TeaserImage
              src={`/images/${aulaPrefix}start_teaser_m3.svg`}
              width={636}
              height={589}
              top={-60}
            />
            <TeaserText title="Wer entscheidet an euer Schule?">
              Wer fällt die Entscheidungen an eurem Schulhaus? Dürfen
              Schülerinnen und Schüler mitreden und Vorschläge einbringen? Wir
              möchten gemeinsam testen, wie wir partizipative Prozesse und mehr
              Demokratie in Schulhäuser bringen können.
              <LearnMore href="/leben" />
              <Box mb={4} />
            </TeaserText>
          </Teaser>
        </Flex>
        <Box
          mt={6}
          sx={{ border: "6px solid #C5CFD6", borderRadius: "20px" }}
          bg="#C5CFD6"
          p={0}
          width={["280px", "280px", "414px"]}
        >
          <Flex bg="#C5CFD6" height="50px" pt={15}>
            <Box
              bg="#98AAB2"
              width="20px"
              height="20px"
              sx={{ borderRadius: "10px" }}
              ml={15}
            />
            <Box
              bg="#98AAB2"
              width="20px"
              height="20px"
              sx={{ borderRadius: "10px" }}
              ml={15}
            />
            <Box
              bg="#98AAB2"
              width="20px"
              height="20px"
              sx={{ borderRadius: "10px" }}
              ml={15}
            />
          </Flex>
          <Flex justifyContent="center" mb={-2}>
            <A
              href="https://twitter.com/claudelongchamp/status/1360190735212032001?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1360190735212032001%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fdev.voty.ch%2F"
              target="_blank"
              rel="noopener noreferrer"
            >
              <NextImage
                src={TweetClaude}
                alt="Tweet Claude Longchamp – Tolle Möglichkeit, nutzen!"
              />
            </A>
          </Flex>
        </Box>
        <Footer />
      </Container>
    </>
  );
}

const Teaser: React.FC<React.PropsWithChildren<{ reverse?: boolean }>> = ({ reverse, children }) => (
  <Flex
    mt={[4, 4, 4, 6]}
    mx="auto"
    flexWrap={["wrap", "wrap", "wrap", "nowrap"]}
    flexDirection={
      reverse
        ? ["column-reverse", "column-reverse", "column-reverse", "row"]
        : undefined
    }
  >
    {reverse && <Box width={[0, 0, 0, "10%"]} />}
    {children}
    {!reverse && <Box width={[0, 0, 0, "10%"]} />}
  </Flex>
);

const TeaserText: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => (
  <Box width={["100%", "100%", "100%", "40%"]} px={[0, 0, 3]}>
    <Text fontSize={[2, 2, 3, 3]} lineHeight="1.45em">
      <Text color="primary" fontWeight="semi" fontSize={[2, 2, 4, 4]}>
        {title}
      </Text>
      {children}
    </Text>
  </Box>
);

const TeaserImage: React.FC<React.PropsWithChildren<{
  src: string;
  width: number;
  height: number;
  top?: number;
}>> = ({ src, width, height, top }) => (
  <Box width={["90%", "90%", "70%", "50%"]} mx="auto">
    <Box
      sx={{ position: "relative", marginTop: [0, 0, 0, top] }}
      mx={[0, 0, 2]}
      mb={4}
    >
      <NextImage
        src={src}
        width={width}
        height={height}
        layout="responsive"
        alt="Teaser-Bild"
      />
    </Box>
  </Box>
);

const LearnMore: React.FC<React.PropsWithChildren<{ href: string }>> = ({ href }) => (
  <Link href={href} passHref legacyBehavior>
    <Text fontWeight="semi" color="primary" variant="link">
      Mehr erfahren »»
    </Text>
  </Link>
);
