import Newsletter from "components/Newsletter";
import { Page } from "components/Page";
import { Text } from "rebass";
import { ReactElement } from "react";

export default function Kontakt(): ReactElement {
  return (
    <Page heading="Newsletter">
      <Text mb={2}>
        Möchtet Ihr regelmässig über voty.ch informiert werden?
      </Text>
      <Newsletter />
    </Page>
  );
}
