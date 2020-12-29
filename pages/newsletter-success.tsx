import { Page } from "components/Page";
import { Flex, Heading } from "rebass";
import { ReactElement } from "react";

export default function NewsletterSuccess(): ReactElement {
  return (
    <Page heading="Newsletter-Anmeldung bestätigen">
      <Flex
        flexDirection="column"
        minHeight="450px"
        sx={{ background: 'url("/images/voty_welcome.svg") center no-repeat' }}
      >
        <Heading as="h2" id="newsletter">
          Danke für Dein Interesse an voty.ch!
        </Heading>
        Schau in Deiner Inbox nach und bestätige die Anmeldung dort.
      </Flex>
    </Page>
  );
}
