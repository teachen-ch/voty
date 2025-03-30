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
      <Text my={5}>
        <Button onClick={sendMail}>Email senden</Button>
      </Text>
    </Page>
  );
}
