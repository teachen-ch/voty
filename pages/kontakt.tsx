import Newsletter from "components/Newsletter";
import { Page } from "components/Page";
import { Card, Heading, Text, Button } from "rebass";
import { ReactElement } from "react";

export default function Kontakt(): ReactElement {
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

      <Card>
        <Heading as="h2" my={0} id="newsletter">
          Möchtet ihr regelmässig über voty.ch informiert werden?
        </Heading>
        <Newsletter />
      </Card>
    </Page>
  );
}
