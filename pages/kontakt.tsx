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
      <Text>
        Möchtet ihr mit uns Kontakt aufnehmen? Wir freuen uns auf Feedback,
        Anregungen und Fragen:
      </Text>
      <Text my={4}>
        <Button onClick={sendMail}>Email schreiben</Button>
      </Text>

      <Text mt={5}>
        Möchtet ihr regelmässig über voty.ch informiert werden
        <br /> (ca. 2-3 mal pro Semester):
      </Text>
      <Text my={4}>
        <Button onClick={sendMail}>Newsletter anmelden</Button>
      </Text>
    </Page>
  );
}
