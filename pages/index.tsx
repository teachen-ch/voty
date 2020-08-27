import Head from "next/head";
import { Flex, Heading, Text, Link, Button } from "rebass";
import { Container } from "components/Page";
import { Grid } from "theme-ui";

export default function Home() {
  return (
    <>
      <Head>
        <title>voty – Demokratie an die Schule</title>
      </Head>

      <Container as="main">
        <Heading
          as="h1"
          my={0}
          pt={["6rem", "6rem", 4]}
          pb={[2, 3, 4]}
          fontSize={[4, "28px", 6]}
          color="primary"
        >
          Demokratie an die Schule!
        </Heading>

        <img src="/images/voty_logo.svg" alt="voty" />

        <Text
          as="h2"
          fontWeight="normal"
          fontSize={2}
          my={4}
          mx={[0, 3, "20%", 230]}
        >
          Die Demokratie ist das wohl wichtigste Gut der Schweiz. Aber wie
          gelingt es uns, die Jugend für die Demokratie zu begeistern? Voty ist
          ein Projekt für die Demokratieförderung an Schweizer Schulen in drei
          Modulen.
        </Text>
        <Grid
          mt={2}
          mb={-6}
          gap={[0, "20px", "30px", "80px"]}
          columns={[1, 1, 3]}
          width="250px"
          justifyContent="center"
        >
          <Flex
            textAlign="center"
            flexDirection="column"
            justifyContent="space-between"
          >
            <img src="images/voty_module_1.svg" alt="Bundehaus" />
            <Heading as="h3" py={3} my={0} textAlign="center">
              Demokratie verstehen
            </Heading>
            <Text>
              Wie funktioniert die Demokratie in der Schweiz und warum ist sie
              so wertvoll? Wir möchten Jugendliche von 12-18 Jahren motivieren,
              sich mit unserem politischen System auseinanderzusetzen.
            </Text>
            <Button as="a" href="/newsletter" variant="full" mt={3} mb={6}>
              Anmeldung Newsletter
            </Button>
          </Flex>

          <Flex
            textAlign="center"
            flexDirection="column"
            justifyContent="space-between"
          >
            <img src="images/voty_module_2.svg" alt="Abstimmen" />
            <Heading as="h3" py={3} my={0} textAlign="center">
              Demokratie testen
            </Heading>
            <Text>
              Nur Erwachsene dürfen abstimmen, aber auch Jugendliche haben eine
              Meinung! Wir möchten Test-Abstimmungen zeitgleich zu nationalen
              Urnengängen durchführen und die Resultate diskutieren.
            </Text>
            <Button as="a" href="/newsletter" variant="full" mt={3} mb={6}>
              Wollen wir auch!
            </Button>
          </Flex>

          <Flex
            textAlign="center"
            flexDirection="column"
            justifyContent="space-between"
          >
            <img src="images/voty_module_3.svg" alt="Diskutieren" />
            <Heading as="h3" py={3} my={0} textAlign="center">
              Demokratie erleben
            </Heading>
            <Text>
              Wer entscheidet an Eurer Schule? Dürfen Schülerinnen und Schüler
              mitreden und Vorschläge einbringen? Wir möchten gemeinsam testen,
              wie wir Demokratie in Schulhäuser bringen können.
            </Text>

            <Button as="a" href="/kontakt" variant="full" mt={3} mb={6}>
              Das interessiert uns!
            </Button>
          </Flex>
        </Grid>

        <Banner href="/umfrage">
          Ihre Erfahrung mit <br />
          Demokratie an der Schule?
        </Banner>
      </Container>
    </>
  );
}

const Banner = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    bg="primary"
    px="70px"
    py={3}
    sx={{
      top: 40,
      left: -80,
      position: "absolute",
      display: "block",
      transform: "rotate(-45deg)",
      boxShadow: "0 2px 10px 0 #967676",
      "@media screen and (max-width: 800px)": {
        display: "none",
      },
    }}
    textAlign="center"
    href={href}
    color="white"
    fontWeight="bold"
    target="_blank"
  >
    {children}
  </Link>
);
