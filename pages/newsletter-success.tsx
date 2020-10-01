import Newsletter from "components/Newsletter";
import { Page } from "components/Page";
import { Card, Heading, Text } from "rebass";

export default function NewsletterSuccess() {
  return (
    <Page heading="Es hat geklappt!">
      <Heading as="h2" id="newsletter">
        ✅ Super, die Anmeldung hat geklappt!
      </Heading>
    </Page>
  );
}
