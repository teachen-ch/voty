import Newsletter from "components/Newsletter";
import { Page } from "components/Page";
import { Card, Heading, Text } from "rebass";

export default function Kontakt() {
  function sendMail() {
    const email = "hc.nehcaet@ytov:otliam";
    document.location.href = email.split("").reverse().join("");
  }
  return (
    <Page heading="Newsletter">
      <Text mb={2}>&nbsp;</Text>
      <Card id="newsletter">
        <Heading as="h2" my={0}>
          Möchtet ihr regelmässig über «voty» informiert werden?
        </Heading>
        <Newsletter />
      </Card>
    </Page>
  );
}
