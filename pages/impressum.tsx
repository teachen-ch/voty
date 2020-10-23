import { Page } from "components/Page";
import { Button, Text } from "rebass";
import { ReactElement } from "react";

export default function Impressum(): ReactElement {
  function sendMail() {
    const email = "hc.nehcaet@ytov:otliam";
    document.location.href = email.split("").reverse().join("");
  }
  return (
    <Page heading="Impressum">
      <Text>
        voty.ch ist ein Projekt des Vereins{" "}
        <a href="https://teachen.ch/verein-teachen/">«Teachen!»</a>
      </Text>
      <pre>
        Verein «Teachen!»
        <br />
        Alpenweg 11
        <br />
        3110 Münsingen
      </pre>
      <Text my={5}>
        <Button onClick={sendMail}>Email senden</Button>
      </Text>
    </Page>
  );
}
