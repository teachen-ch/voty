import Head from "next/head";
import Newsletter from "components/Newsletter";
import { Page, PageHeading } from "components/Page";
import { Box, Heading, Text } from "rebass";

export default function Kontakt() {
  function sendMail() {
    const email = "hc.nehcaet@ytov:otliam";
    document.location.href = email.split("").reverse().join("");
  }
  return (
    <Page>
      <Head>
        <title>voty - Kontakt</title>
      </Head>
      <PageHeading>Newsletter</PageHeading>

      <Text mb={2}>&nbsp;</Text>
      <Box bg="lightgray" p={3} id="newsletter">
        <Heading as="h2" my={0}>
          Möchtet ihr regelmässig über «voty» informiert werden?
        </Heading>
        <Newsletter />
      </Box>
    </Page>
  );
}
