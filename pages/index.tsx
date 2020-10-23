import Head from "next/head";
import { Flex, Heading, Box, Text, Button } from "rebass";
import { Container } from "components/Page";
import { Banner } from "components/Banner";
import { TopBar } from "components/TopBar";
import { Footer } from "components/Footer";
import { ReadMore } from "components/ReadMore";
import { FAQ } from "./abstimmung";
import Link from "next/link";

export default function Home(): React.ReactElement {
  return (
    <>
      <Head>
        <title>voty.ch – Demokratie an die Schule</title>
      </Head>

      <TopBar />

      <Container as="main" pt="49px" color="black" light>
        <img
          src="/images/voty_logo.svg"
          alt="voty.ch"
          style={{ width: "426px", maxWidth: "85%", margin: "0 auto" }}
        />
        <Flex flexDirection="row" justifyContent="center">
          <Box sx={{ display: ["none", "none", "block"] }}>
            <Flex alignItems="center" flexDirection="column" px={5}>
              <img
                src="images/voty_module_1_soon.svg"
                alt="Bundehaus"
                width="100%"
              />
              <Heading as="h3" py={2} my={0} fontSize={2} textAlign="center">
                Demokratie verstehen
              </Heading>
            </Flex>
          </Box>
          <Box>
            <Heading
              as="h1"
              my={0}
              pt={3}
              pb={[4, 4, 4, 4]}
              fontSize={[5, 5, "34px", "40px"]}
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
              <img src="images/voty_module_2.svg" alt="Abstimmen" width="70%" />
              <Heading as="h3" py={3} my={0} textAlign="center" fontSize={[5]}>
                Demokratie testen
              </Heading>
            </Flex>
          </Box>

          <Box sx={{ display: ["none", "none", "block"] }}>
            <Flex alignItems="center" flexDirection="column" px={5}>
              <img
                src="images/voty_module_3_soon.svg"
                alt="Diskutieren"
                width="100%"
              />
              <Heading as="h3" py={2} my={0} fontSize={2} textAlign="center">
                Demokratie erleben
              </Heading>
            </Flex>
          </Box>
        </Flex>

        <Box maxWidth="800px" textAlign="center">
          <Link href="/abstimmung">
            <Button fontSize={5} width="100%" p={3} mt={4}>
              Jetzt Schulklasse anmelden!
            </Button>
          </Link>

          <Heading as="h2" fontSize={5}>
            Jugendliche stimmen ab – ein Experiment
          </Heading>
          <Text fontWeight="bold" lineHeight="1.5em" fontSize="18px" mb={5}>
            <p>
              Wie motivieren wir Jugendliche für unsere Demokratie? Wir möchten
              gemeinsam mit engagierten Lehrpersonen ein Experiment starten und
              im November mit mindestens 50 Schulklassen Abstimmungen zu den
              beiden aktuellen Abstimmungsvorlagen
              «Konzernverantwortungsinitiative» und die «Kriegsgeschäfte
              Initiative» durchführen. Beide Vorlagen sind Themen, zu denen auch
              Jugendliche eine Meinung haben.
            </p>

            <p>
              Wir sind überzeugt: Interesse für Politik entsteht dann, wenn man
              diskutieren und mitentscheiden kann. Eine solche Gelegenheit
              möchten wir schaffen.
            </p>
          </Text>

          <ReadMore title="Fragen und Antworten">
            <FAQ />
          </ReadMore>
          <Flex justifyContent="space-between" mt={3}>
            <Link href="/newsletter">
              <Button variant="secondary" width="100%" mr={3}>
                Newsletter abonnieren
              </Button>
            </Link>
            <Link href="/abstimmung">
              <Button variant="secondary" width="100%">
                Schulklasse anmelden?
              </Button>
            </Link>
          </Flex>
        </Box>

        <Banner href="/abstimmung">
          Jetzt mitmachen: Jugendliche stimmen ab!
        </Banner>
        <Footer color="black" />
      </Container>
    </>
  );
}
