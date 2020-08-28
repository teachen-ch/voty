import Head from "next/head";
import Newsletter from "components/Newsletter";
import { Page, PageHeading } from "components/Page";
import { Card, Heading, Text, Link } from "rebass";

export default function Kontakt() {
  return (
    <Page>
      <Head>
        <title>voty - Demokratie an die Schule!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeading>Demokratie an die Schule</PageHeading>
      <Heading as="h2">
        27. September – ein spannendes Abstimmungswochenende
      </Heading>
      <Text>
        Die Demokratie ist das wohl wichtigste Gut der Schweiz, das wird uns bei
        der aktuellen Weltlage bewusster denn je. Aber wie gelingt es uns, die
        Jugend für die Demokratie zu begeistern? Das Projekt «voty» will sich
        diesem Thema annehmen und das Demokratieverständnis fördern. Unterstützt
        durch den{" "}
        <Link href="https://prototypefund.opendata.ch" target="_blank">
          prototypefund.opendata.ch
        </Link>{" "}
        und in Zusammenarbeit mit SRF und weiteren Partnern werden wir in den
        nächsten Monaten gemeinsam mit Schulen einen Prototypen entwickeln und
        testen.
      </Text>
      <Text textAlign="center" my={4}>
        <img src="/images/voty_module_1.svg" alt="Bundeshaus" />
      </Text>
      <Text>
        Nun stehen am 27. September bereits wichtige Abstimmungen an, welche
        auch für Jugendliche greifbar und relevant sind (Kampfjets,
        Begrenzungsinitiative, Kinderdrittbetreuungskosten, Vaterschaftsurlaub,
        Jagdgesetz). Auch wenn wir erst am Anfang unseres Projektes stehen,
        möchten wir die Chance unbedingt packen und mit einigen Klassen eine
        erste Iteration durchführen. Dazu suchen wir engagierte Lehrerinnen und
        Lehrer der Oberstufe (Sek I + II), welche im September mindestens 8
        Lektionen diesem Thema widmen möchten. «voty» stellt dazu
        Unterrichtsmaterialien und eine Austauschplatform zur Verfügung.
      </Text>
      <Heading as="h2">Klingt spannend? </Heading>
      <Text>
        Wäre das etwas für sie und ihre Klasse? Dann tragen Sie sich auf unsere
        Liste ein und wir nehmen gerne Kontakt auf.
      </Text>
      <Card id="newsletter">
        <Heading as="h2" mt={0}>
          Das interessiert mich!
        </Heading>
        <Newsletter />
      </Card>
    </Page>
  );
}
