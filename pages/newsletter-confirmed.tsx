import { Page } from "components/Page";
import { Flex, Heading } from "components/ui";
import { ReactElement } from "react";

export default function NewsletterConfirmed(): ReactElement {
  return (
    <Page heading="Newsletter-Anmeldung">
      <Flex
        className="flex-col min-h-[450px]"
        style={{ background: 'url("/images/voty_welcome.svg") center no-repeat' }}
      >
        <Heading as="h2" id="newsletter">
          ✅ Super, deine Newsletter-Anmeldung ist jetzt bestätigt!
        </Heading>
        Du kannst dich jederzeit wieder von Newsletter abmelden, wenn Du auf den
        entsprechenden Link im Newsletter klickst.
      </Flex>
    </Page>
  );
}
