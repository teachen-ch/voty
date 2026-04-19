import { Page } from "components/Page";
import { Flex, Heading } from "components/ui";
import { ReactElement } from "react";

export default function NewsletterSuccess(): ReactElement {
  return (
    <Page heading="Newsletter-Anmeldung bestätigen">
      <Flex
        className="flex-col min-h-[450px]"
        style={{ background: 'url("/images/voty_welcome.svg") center no-repeat' }}
      >
        <Heading as="h2" id="newsletter">
          Danke für dein Interesse an voty.ch!
        </Heading>
        Schau in deiner Inbox nach und bestätige die Anmeldung dort.
      </Flex>
    </Page>
  );
}
