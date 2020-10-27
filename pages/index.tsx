import Head from "next/head";
import { Flex, Heading, Box, Text, Button, Image } from "rebass";
import { Container, Background } from "components/Page";
import { Banner } from "components/Banner";
import { Footer } from "components/Footer";
import { ReadMore } from "components/ReadMore";
import { FAQ } from "./abstimmung";
import { TopBar } from "components/TopBar";
import Link from "next/link";
import { useRef } from "react";

export default function Home(): React.ReactElement {
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
        light
      />
      <TopBar hideLogo={true} />
      <Container as="main" pt={[0, 0, 20, 49]} px={[3, 3, 3, 0]} color="black">
        <Image
          alignSelf="center"
          width={["70%", "70%", "40%", "426px"]}
          src="/images/voty_logo.svg"
          alt="voty.ch"
        />
        <Flex flexDirection="row" justifyContent="center">
          <Module
            title="Demokratie verstehen"
            image="/images/voty_module_1_soon.svg"
          >
            Die Demokratie ist das wohl wichtigste Gut der Schweiz. Aber wie
            ge&shy;lingt es uns, die Ju&shy;gend für die Demo&shy;kratie zu
            begeis&shy;tern? voty.ch ist ein Pro&shy;jekt für die
            De&shy;mo&shy;kratie&shy;förderung an Schwei&shy;zer Schulen in drei
            Modulen.
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

            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <Image
                src="images/voty_module_2.svg"
                alt="Abstimmen"
                width="65%"
              />
              <Heading
                as="h3"
                py={[2, 2, 3]}
                my={0}
                textAlign="center"
                fontSize={[4, 4, 4, 5]}
              >
                Demokratie testen
              </Heading>
            </Flex>
          </Box>

          <Module
            title="Demokratie erleben"
            image="/images/voty_module_3_soon.svg"
          >
            Wer entscheidet an Eurer Schule? Dürfen Schüler&shy;innen und
            Schü&shy;ler mit&shy;reden und Vor&shy;schläge einbringen? Wir
            möchten gemeinsam testen, wie wir Demo&shy;kratie in
            Schul&shy;häuser bringen können.
          </Module>
        </Flex>

        <Box maxWidth="800px" width="100%" textAlign="center">
          <Link href="/abstimmung">
            <Button
              bg="primary"
              fontSize={[3, 3, 5, 5]}
              width="100%"
              p={3}
              mt={[2, 2, 1, 4]}
            >
              Jetzt Schulklasse anmelden!
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
              Wie motivieren wir Jugendliche für unsere Demokratie? Wir möchten
              gemeinsam mit engagierten Lehrpersonen ein Experiment starten und
              im November mit mindestens 50 Schulklassen über die beiden
              nationalen Vorlagen abstimmen. Interesse für Politik entsteht
              dann, wenn man diskutieren und mitentscheiden kann. Helfen Sie
              mit!
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
              <Button width="100%" mr={[0, 0, 3]} mb={3}>
                Newsletter abonnieren
              </Button>
            </Link>
            <Link href="/abstimmung">
              <Button width="100%" mb={3}>
                Schulklasse anmelden?
              </Button>
            </Link>
          </Flex>
        </Box>

        <Box sx={{ display: ["none", "none", "block"] }}>
          <Banner href="/abstimmung">
            Jetzt mitmachen: Jugendliche stimmen ab!
          </Banner>
        </Box>
        <Footer color="black" />
      </Container>
    </>
  );
}

const Module: React.FC<{ title: string; image: string }> = (props) => {
  const img = useRef<HTMLImageElement>(null);
  return (
    <Box
      mx={4}
      sx={{ display: ["none", "none", "block", "block"], cursor: "pointer" }}
    >
      <Flex alignItems="center" flexDirection="column">
        <div className="flip-container">
          <div className="flipper">
            <div className="front">
              <img
                src={props.image}
                alt="Bundehaus"
                width="100%"
                ref={img}
                onTouchStart={() => img.current?.classList.add("hover")}
              />
            </div>
            <Box
              className="back"
              fontSize="17px"
              color="white"
              bg="gray"
              p={3}
              sx={{ borderRadius: 5 }}
            >
              {props.children}
            </Box>
          </div>
        </div>
        <Heading as="h3" py={2} my={0} fontSize={2} textAlign="center">
          {props.title}
        </Heading>
      </Flex>
    </Box>
  );
};
