import Newsletter from "components/Newsletter";
import { Page } from "components/Page";
import { Card, Heading, Text } from "rebass";

export default function NewsletterSuccess() {
  return (
    <Page heading="Es hat geklappt!">
      <Text mb={2}>&nbsp;</Text>
      <Card>
        <Heading as="h2" my={0} id="newsletter">
          ✅ Super, die Anmeldung hat geklappt!
        </Heading>
        <Newsletter />
      </Card>
    </Page>
  );
}
