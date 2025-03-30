import { Page } from "components/Page";
import { Text, Button } from "rebass";
import { ReactElement } from "react";
import Link from "next/link";

export default function Kontakt(): ReactElement {
  function sendMail() {
    const email = "hc.nehcaet@ytov:otliam";
    document.location.href = email.split("").reverse().join("");
  }
  return (
    <Page heading="Kontakt &amp; Impressum">
      <Text>voty.ch ist ein Projekt des Non-Profit Vereins «voty.ch».</Text>
      <pre>
        Verein voty.ch
        <br />
        Effingerstrasse 10
        <br />
        3011 Bern
        <br />
        <br />
        Geschäftsleiter: Stefan Niederhauser
      </pre>
      <Text>
        Möchtet ihr mit uns Kontakt aufnehmen? Wir freuen uns auf Feedback,
        Anregungen und Fragen zu voty.ch:
      </Text>
      <Text my={4}>
        <Button onClick={sendMail} width={["100%", "100%", "auto"]}>
          Email schreiben
        </Button>
      </Text>
      <Text mt={5}>
        Möchtet ihr regelmässig über voty.ch informiert werden (ca. 2-3 mal pro
        Semester):
      </Text>
      <Text my={4}>
        <Link href="/newsletter" passHref legacyBehavior>
          <Button width={["100%", "100%", "auto"]}>Newsletter anmelden</Button>
        </Link>
      </Text>
    </Page>
  );
}
