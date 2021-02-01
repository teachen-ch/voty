import Head from "next/head";
import { Flex, Heading, Box, Text, Button, Image } from "rebass";
import { Container, Background } from "components/Page";
import { Footer } from "components/Footer";
import { ReadMore } from "components/ReadMore";
import { FAQ } from "../components/FAQ";
import { TopBar } from "components/TopBar";
import Link from "next/link";
import { useRef } from "react";
import { A } from "components/Breadcrumb";
import { useColorMode } from "theme-ui";
import { useRouter } from "next/router";

export default function Home(): React.ReactElement {
  const [colorMode] = useColorMode();

  return (
    <>
      <Head>
        <title>voty.ch – Demokratie an die Schule</title>
      </Head>

      <Background
        bgImages={[
          "voty_bg_mobile_1.svg",
          "voty_bg_mobile_1.svg",
          "voty_bg_1.svg",
        ]}
      />
      <TopBar />
      <Container as="main" pt={[30, 30, 30, 40]} px={[3, 3, 3, 0]}>
        <Image
          alignSelf="center"
          width={[240, 207, 426]}
          height={[95, 82, 164]}
          src={`/images/voty_logo${
            colorMode === "light" ? "_black" : "_white"
          }.svg`}
          alt="voty.ch"
        />
        <Flex flexDirection="row" justifyContent="center">
          <Module
            href="/lernen"
            title="Demokratie verstehen"
            image="/images/voty_module_1_soon.svg"
          >
            Wie funktioniert Demokra&shy;tie in der Schweiz und warum ist sie so
            wertvoll? Wir entwickeln interaktive E-Learning Tools für den
            Einsatz in der Schulklasse auf Stufe Sek-1, Gym und
            Berufs&shy;schule. <br />
            <A href="/lernen">Mehr erfahren</A>
          </Module>
          <Box>
            <Heading
              as="h1"
              my={0}
              pt={3}
              pb={[3, 3, 3, 4]}
              fontSize={[3, 4, "28px", "40px"]}
              textAlign="center"
              color="primary"
            >
              Demokratie an die Schule!
            </Heading>

            <Module
              title="Demokratie testen"
              image="/images/voty_module_2.svg"
              href="/abstimmung"
            >
              Nur Erwachsene dürfen abstimmen, aber auch Jugendliche haben eine
              Meinung! Lass Deine Klassen an den Urnen&shy;gängen vom 9. März
              mitmachen und ab&shy;stimmen. <br />
              <A href="/abstimmung">Mehr erfahren</A>
            </Module>
          </Box>

          <Module
            href="/projekt#module3"
            title="Demokratie erleben"
            image="/images/voty_module_3_soon.svg"
          >
            Wer entscheidet an Eurer Schule? Dürfen Schüler&shy;innen und
            Schü&shy;ler mit&shy;reden und Vor&shy;schläge einbringen? Wir
            möchten gemeinsam testen, wie wir Demo&shy;kratie in
            Schul&shy;häuser bringen können.{" "}
            <A href="/projekt#module3">Mehr erfahren</A>
          </Module>
        </Flex>

        <Box maxWidth="800px" width="100%" textAlign="center">
          <Link href="/abstimmung">
            <Button
              fontSize={[3, 3, 5, 5]}
              p={3}
              px={[4, 4, 5]}
              mt={[2, 2, 3, 4]}
              height={80}
            >
              Jetzt Klasse anmelden!
            </Button>
          </Link>

          <Heading as="h2" fontSize={["30px", "30px", 5]} mt={[4, 4, 5]}>
            Jugendliche stimmen ab – ein Experiment
          </Heading>
          <Flex mb={5} justifyContent="space-around">
            <Text
              fontWeight="semi"
              lineHeight="1.5em"
              fontSize="18px"
              maxWidth="700px"
            >
              Die Demokratie ist eines der wohl wichtigsten Güter der Schweiz.
              Aber wie ge­lingt es uns, die Ju­gendlichen für die Demo­kratie zu
              begeis­tern?
              <br />
              <br />
              Wir glauben, dass ein demokratisches Verständnis nur durch
              demokratische Praxis erreicht werden kann. Deshalb möchten wir mit
              voty.ch bereits in der Schule eine Basis für das
              Demokratieverständnis schaffen, dieses mit den Schüler*Innen
              praktisch anwenden und so die Fähigkeiten fördern, welche für eine
              demokratische Partizipation wichtig sind.
              <br />
              <A href="/projekt">Weitere Informationen zum Projekt voty.ch</A>
            </Text>
          </Flex>

          <ReadMore title="Fragen und Antworten">
            <FAQ />
          </ReadMore>
          <Flex
            justifyContent="space-between"
            mt={3}
            flexWrap={["wrap", "wrap", "nowrap", "nowrap"]}
          >
            <Link href="/newsletter">
              <Button width="100%" mb={3}>
                Newsletter abonnieren
              </Button>
            </Link>
          </Flex>
        </Box>
        <Footer />
      </Container>
    </>
  );
}

const Module: React.FC<{ title: string; image: string; href: string }> = (
  props
) => {
  const img = useRef<HTMLImageElement>(null);
  const router = useRouter();
  return (
    <Box
      mx={4}
      onClick={() => router.push(props.href)}
      sx={{ display: ["none", "none", "block", "block"], cursor: "pointer" }}
    >
      <Flex alignItems="center" flexDirection="column">
        <div className="flip-container">
          <div className="flipper">
            <div className="front">
              <img
                src={props.image}
                alt="Bundeshaus"
                width="100%"
                ref={img}
                onTouchStart={() => img.current?.classList.add("hover")}
              />
            </div>
            <Box
              className="back"
              fontSize="17px"
              bg="topbarColor"
              p={3}
              sx={{ borderRadius: 5 }}
            >
              {props.children}
            </Box>
          </div>
        </div>
        <Heading as="h2" py={2} my={0} fontSize={2} textAlign="center">
          {props.title}
        </Heading>
      </Flex>
    </Box>
  );
};
