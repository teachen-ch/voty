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
      <Text>
        voty.ch war ein Projekt des Vereins «Teachen!» und wird aktuell betreut
        durch
      </Text>
      <pre>
        S. Niederhauser
        <br />
        Alpenweg 11
        <br />
        3110 Münsingen
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
        <Link href="/newsletter" passHref>
          <Button width={["100%", "100%", "auto"]}>Newsletter anmelden</Button>
        </Link>
      </Text>
    </Page>
  );
}
