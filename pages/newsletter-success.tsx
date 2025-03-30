import { Page } from "components/Page";
import { Flex, Heading } from "rebass";
import { ReactElement } from "react";

export default function NewsletterSuccess(): ReactElement {
  return (
    <Page heading="Newsletter-Anmeldung bestätigen">
      <Flex
        flexDirection="column"
        minHeight="450"
        sx={{ background: 'url("/images/voty_welcome.svg") center no-repeat' }}
      >
        <Heading as="h2" id="newsletter">
          Danke für dein Interesse an voty.ch!
        </Heading>
        Schau in deiner Inbox nach und bestätige die Anmeldung dort.
      </Flex>
    </Page>
  );
}
