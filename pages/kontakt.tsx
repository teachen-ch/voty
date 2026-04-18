import { Page } from "components/Page";
import { Box, Text, Button } from "components/ui";
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
      <pre className="mt-4">
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
      <Box className="my-8">
        <Button onClick={sendMail} className="w-full sm:w-auto">
          Email schreiben
        </Button>
      </Box>

      <Text className="mt-16">
        Möchtet ihr regelmässig über voty.ch informiert werden (ca. 2-3 mal pro
        Semester):
      </Text>
      <Box className="my-8">
        <Link href="/newsletter">
          <Button className="w-full sm:w-auto">Newsletter anmelden</Button>
        </Link>
      </Box>
    </Page>
  );
}
