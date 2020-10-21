import Newsletter from "components/Newsletter";
import { Page } from "components/Page";
import { Card, Heading, Text } from "rebass";
import { ReactElement } from "react";

export default function Kontakt(): ReactElement {
  return (
    <Page heading="Newsletter">
      <Text mb={2}>&nbsp;</Text>
      <Card>
        <Heading as="h2" my={0} id="newsletter">
          Möchtet ihr regelmässig über voty.ch informiert werden?
        </Heading>
        <Newsletter />
      </Card>
    </Page>
  );
}
