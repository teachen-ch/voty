import { Page } from "components/Page";
import { Flex, Heading } from "rebass";
import { ReactElement } from "react";

export default function NewsletterConfirmed(): ReactElement {
  return (
    <Page heading="Newsletter-Anmeldung">
      <Flex
        flexDirection="column"
        minheight="450"
        sx={{ background: 'url("/images/voty_welcome.svg") center no-repeat' }}
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
