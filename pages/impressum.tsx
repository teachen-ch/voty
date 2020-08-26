import Head from "next/head";
import { Page, PageHeading } from "components/Page";
import { Box, Heading, Button, Text } from "rebass";

export default function Impressum() {
  function sendMail() {
    const email = "hc.nehcaet@ytov:otliam";
    document.location.href = email.split("").reverse().join("");
  }
  return (
    <Page>
      <Head>
        <title>voty - Datenschutz</title>
      </Head>

      <PageHeading>Impressum</PageHeading>
      <Text>
        Voty ist ein Projekt des Vereins{" "}
        <a href="https://teachen.ch/verein-teachen/">«Teachen!»</a>
      </Text>
      <Box my={3} bg="lightgray" p={3} px={4}>
        <pre>
          Verein «Teachen!»
          <br />
          Alpenweg 11
          <br />
          3110 Münsingen
        </pre>
      </Box>
      <Text>
        <Button onClick={sendMail} role="button" className="button primary">
          Email senden
        </Button>
      </Text>
    </Page>
  );
}
