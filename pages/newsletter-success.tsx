import { Page } from "components/Page";
import { Heading } from "rebass";
import { ReactElement } from "react";

export default function NewsletterSuccess(): ReactElement {
  return (
    <Page heading="Es hat geklappt!">
      <Heading as="h2" id="newsletter">
        ✅ Super, die Anmeldung zum voty.ch Newsletter hat geklappt!
      </Heading>
    </Page>
  );
}
