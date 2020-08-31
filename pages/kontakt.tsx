import Newsletter from "components/Newsletter";
import { Page } from "components/Page";
import { Card, Heading, Text, Button } from "rebass";

export default function Kontakt() {
  function sendMail() {
    const email = "hc.nehcaet@ytov:otliam";
    document.location.href = email.split("").reverse().join("");
  }
  return (
    <Page heading="Kontakt">
      <Heading as="h2">Feedback oder Fragen?</Heading>
      <Text>
        Für Feedback, Anregungen und Fragen freuen wir uns auf eure Email:
      </Text>
      <Text my={4}>
        <Button onClick={sendMail}>Email schreiben</Button>
      </Text>

      <Card id="newsletter">
        <Heading as="h2" my={0}>
          Möchtet ihr regelmässig über «voty» informiert werden?
        </Heading>
        <Newsletter />
      </Card>
    </Page>
  );
}
