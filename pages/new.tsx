import Head from "next/head";
import { Flex, Heading, Box, Text, Button, Image } from "rebass";
import { Background, Container, H1 } from "components/Page";
import { Footer } from "components/Footer";
import { TopBar } from "components/TopBar";
import { Grid, useColorMode } from "theme-ui";
import { useRouter } from "next/router";
import { isMobile } from "util/isBrowser";
import NextImage from "next/image";
import Link from "next/link";

export default function Home(): React.ReactElement {
  const [colorMode] = useColorMode();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>voty.ch – Demokratie an die Schule</title>
      </Head>

      <Background bgImages={[]} />
      <TopBar hideLogo={true} />
      <Container as="main" pt={[0, 0, 30, 40]} px={[3, 3, 3, 0]}>
        <Image
          alignSelf="center"
          width={[240, 207, 426]}
          height={[95, 82, 164]}
          src={`/images/voty_logo${colorMode === "light" ? "" : "_white"}.svg`}
          alt="voty.ch"
        />

        <H1
          as="h1"
          mt={0}
          mb={[0, 0, -2, -3]}
          pt={3}
          fontSize={[3, 4, "32px", "40px"]}
          textAlign="center"
        >
          Demokratie an die Schule!
        </H1>

        <Box maxWidth="85%">
          <NextImage src="/images/start_intro.png" width={2144} height={1175} />
        </Box>

        <Box maxWidth="960px" width="100%" textAlign="center">
          <Button
            onClick={() => router.push("/abstimmung")}
            mt={[2, 2, 3, 4]}
            px={4}
            sx={{ borderRadius: "25px" }}
            width="600px"
            maxWidth="80%"
          >
            Jetzt Klasse anmelden{isMobile() ? "" : " und abstimmen"}!
          </Button>

          <Heading as="h2" fontSize={["30px", "30px", "40px"]} mt={[4, 4, 5]}>
            Jugendliche stimmen ab – ein Experiment
          </Heading>
          <Flex mb={[4, 4, 5]} justifyContent="space-around">
            <Text lineHeight="1.5em" fontSize={[2, 2, 3]}>
              Die Demokratie ist eines der wohl wichtigsten Güter der Schweiz.
              Aber wie ge­lingt es uns, die Ju­gendlichen für die Demo­kratie zu
              begeis­tern?
              <br />
              <br />
              Wir glauben, dass ein demokratisches Verständnis nur durch
              demokratische Praxis erreicht werden kann. Deshalb möchten wir mit
              voty.ch bereits in der Schule eine Basis für das
              Demokratieverständnis schaffen, dieses mit den Schüler*Innen
              anwenden und so die Fähigkeiten fördern, welche für eine
              demokratische Partizipation wichtig sind.
            </Text>
          </Flex>

          <Grid columns={["", "", "auto auto auto"]} gap={2}>
            <Button onClick={() => router.push("/demo")}>voty.ch testen</Button>
            <Button onClick={() => router.push("/projekt")} flex={1}>
              Weitere Infos zum Projekt
            </Button>
            <Button onClick={() => router.push("/newsletter")}>
              Newsletter abonnieren
            </Button>
          </Grid>
        </Box>

        <Flex
          mb={200}
          width={["100%", "100%", "80%", "100%"]}
          maxWidth="1160px"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <H1 mt={[5, 5, 6]}>Module 1 – Demokratie verstehen</H1>
          <Teaser>
            <TeaserImage
              src="/images/start_teaser_1.png"
              width={570}
              height={538}
              top={-150}
            />
            <TeaserText title="Eine Online-Werkzeugkiste für politische Bildung">
              voty.ch stellt ein wachsendes Angebot an digitalen Lerninhalten
              für die politischen Bildung zur Verfügung. Neben einer
              Aus&shy;wahl an Videos von SRF mySchool und dem Bot «Chaty», der
              Grundbegriffe der Demo&shy;kratie erklärt, stehen vor allem
              interaktive Tools (Einzel- oder Gruppen&shy;arbeiten) im
              Vordergrund. <LearnMore href="/lernen" />
            </TeaserText>
          </Teaser>

          <H1>Module 2 – Demokratie testen</H1>
          <Teaser reverse>
            <TeaserText title="Auch die Jugend hat eine Meinung!">
              Im Vergleich zu älteren Generationen gehen junge Menschen (18-30)
              in der Schweiz halb so oft abstimmen. Dabei wäre gerade ihre
              Meinung wichtig! Wir wollen Jugendliche ermutigen und befähigen,
              ihr Stimmrecht aktiv wahrzunehmen – das will geübt sein! Lassen
              sie jetzt ihre Klasse über aktuelle Themen abstimmen.{" "}
              <LearnMore href="/abstimmung" />
            </TeaserText>
            <TeaserImage
              src="/images/start_teaser_2.png"
              width={1070}
              height={1007}
              top={-100}
            />
          </Teaser>

          <H1>Module 3 – Demokratie leben</H1>

          <Teaser>
            <TeaserImage
              src="/images/start_teaser_3.png"
              width={1126}
              height={1126}
              top={-165}
            />
            <TeaserText title="Partizipative Prozesse an der Schule">
              Wie können wir demokratische Entscheidungsprozesse in die Schule
              bringen? Schulleitung, Lehrerschaft und Schüler*Innen führen
              gemeinsam einen offenen und kreativen Dialog über schulinterne
              Ideen und Vorschläge. Schüler*innen können in einem mit der
              Schulleitung vereinbarten Rahmen auf voty.ch eigene Ideen
              entwickeln, diese gemeinsam off- und online diskutieren,
              verbessern, final ausarbeiten und dafür Mehrheiten finden.{" "}
              <LearnMore href="/abstimmung" />
            </TeaserText>
          </Teaser>

          <H1>Neues aus dem voty.ch Blog</H1>
          <Teaser reverse>
            <TeaserText title="Wie sehen gute Distance Learning Lehrmittel aus?">
              Im Vergleich zu älteren Generationen gehen junge Menschen (18-30)
              in der Schweiz halb so oft abstimmen. Dabei wäre gerade ihre
              Meinung wichtig! Wir wollen Jugendliche ermutigen und befähigen,
              ihr Stimmrecht aktiv wahrzunehmen – das will geübt sein! Lassen
              sie jetzt ihre Klasse über aktuelle Themen abstimmen.{" "}
              <LearnMore href="/distance-learning" />
            </TeaserText>
            <TeaserImage
              src="/images/start_teaser_4.png"
              width={1070}
              height={1007}
              top={-60}
            />
          </Teaser>

          <H1>Und weiteres aus dem voty.ch Blog</H1>
          <Teaser>
            <TeaserImage
              src="/images/start_teaser_5.png"
              width={1070}
              height={1007}
              top={-60}
            />
            <TeaserText title="Wie sehen gute Distance Learning Lehrmittel aus?">
              Im Vergleich zu älteren Generationen gehen junge Menschen (18-30)
              in der Schweiz halb so oft abstimmen. Dabei wäre gerade ihre
              Meinung wichtig! Wir wollen Jugendliche ermutigen und befähigen,
              ihr Stimmrecht aktiv wahrzunehmen – das will geübt sein! Lassen
              sie jetzt ihre Klasse über aktuelle Themen abstimmen.{" "}
              <LearnMore href="/distance-learning" />
            </TeaserText>
          </Teaser>
        </Flex>
        <Footer />
      </Container>
    </>
  );
}

const Teaser: React.FC<{ reverse?: boolean }> = ({ reverse, children }) => (
  <Flex
    mt={[4, 4, 4, 5]}
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

const TeaserText: React.FC<{ title: string }> = ({ title, children }) => (
  <Box width={["100%", "100%", "100%", "40%"]} px={[0, 0, 3]}>
    <Text fontSize={[2, 2, 3, 3]} lineHeight="1.45em">
      <Text color="primary" fontWeight="semi" fontSize={[2, 2, 4, 4]}>
        {title}
      </Text>
      {children}
    </Text>
  </Box>
);

const TeaserImage: React.FC<{
  src: string;
  width: number;
  height: number;
  top?: number;
}> = ({ src, width, height, top }) => (
  <Box width={["90%", "90%", "70%", "50%"]} mx="auto">
    <Box
      sx={{ position: "relative", marginTop: [0, 0, 0, top] }}
      mx={[0, 0, 2]}
      mb={4}
    >
      <NextImage src={src} width={width} height={height} layout="responsive" />
    </Box>
  </Box>
);

const LearnMore: React.FC<{ href: string }> = ({ href }) => (
  <Link href={href}>
    <Text fontWeight="semi" color="primary" variant="link">
      Mehr erfahren »»
    </Text>
  </Link>
);
