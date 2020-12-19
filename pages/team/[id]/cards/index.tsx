import { Page } from "components/Page";
import { Cards } from "components/Cards";
import { Input } from "@rebass/forms";
import { Flex, Button } from "rebass";
import { useState } from "react";

export default function CardsPage(): React.ReactElement {
  const [keywords, setKeywords] = useState("");
  return (
    <Page heading="Lerninhalte">
      <Flex mb={3}>
        <Input
          onChange={(evt) => setKeywords(evt.target.value)}
          placeholder="Suche..."
        />
        <Button ml={3} px={5} height="100%" mt="3px">
          Suche
        </Button>
      </Flex>
    </Page>
  );
}
