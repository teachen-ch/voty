import { Input } from "@rebass/forms";
import { Cards } from "components/Cards";
import { Page } from "components/Page";
import debounce from "lodash/debounce";
import { Button, Text, Flex } from "rebass";
import { Filter } from "components/Swissvotes";
import { useState } from "react";

export default function CardsPublic(): React.ReactElement {
  const [keywords, setKeywords] = useState("Aula");
  const [type, setType] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();

  function resetFilters() {
    setAge(undefined);
    setType(undefined);
    setKeywords("");
  }
  return (
    <Page heading="Demokratie lernen">
      In Zusammenarbeit mit <a href="https://voty.ch/">voty.ch</a> stellen wir
      hier verschiedene Lerninhalte zur Verfügung. Um diese für interaktive
      Klassenarbeiten zu nutzen, müssen sie für sich und ihre Klasse einen
      Account erstellen.
      <Flex mt={4}>
        <Input
          onChange={debounce((evt) => setKeywords(evt.target.value), 300)}
          placeholder="Suche..."
          flex={1}
        />
        <Button ml={3} flex={0.3} mt={[0, 0, "4px"]}>
          Suche
        </Button>
      </Flex>
      <Text mb={3} mt={1} fontSize={1}>
        Filtern nach Stufe: &nbsp; &nbsp;
        <Filter set={setAge} v={age} val={"Zyklus-2"} label="Unterstufe" sep />
        <Filter set={setAge} v={age} val={"Sek-1"} label="Oberstufe" sep />
        <Filter set={setAge} v={age} val={"Gym"} label="Gymnasium" />
        &nbsp; &nbsp; &nbsp; nach Inhalt: &nbsp; &nbsp;
        <Filter set={setType} v={type} val={"tool"} label="Aufgaben" sep />
        <Filter set={setType} v={type} val={"chaty"} label="Chaty" />
      </Text>
      <Cards
        keywords={keywords}
        type={type}
        age={age}
        resetFilters={resetFilters}
      />
    </Page>
  );
}
