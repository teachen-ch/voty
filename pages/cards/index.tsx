import { Input } from "components/ui";
import { Cards } from "components/Cards";
import { Page } from "components/Page";
import debounce from "lodash/debounce";
import { Button, Text, Flex } from "components/ui";
import { Filter } from "components/Swissvotes";
import { useState } from "react";
import { ListPaths } from "pages/team/[team]/select";

export default function CardsPublic(): React.ReactElement {
  const [keywords, setKeywords] = useState("");
  const [type, setType] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();

  function resetFilters() {
    setAge(undefined);
    setType(undefined);
    setKeywords("");
  }
  return (
    <Page heading="Lerninhalte">
      Diese ersten Lerninhalte stehen aktuell auf voty.ch in einer frühen
      Beta-Version zur Verfügung. Ohne Klassen-Login können aber keine Arbeiten
      hochgeladen oder Diskussionen geführt werden.
      <ListPaths anon={true} />
      <Flex className="mt-8">
        <Input
          onChange={debounce((evt) => setKeywords(evt.target.value), 300)}
          placeholder="Suche..."
          className="flex-1"
        />
        <Button className="ml-4 mt-0 sm:mt-1" style={{ flex: 0.3 }}>
          Suche
        </Button>
      </Flex>
      <Text className="mb-4 mt-1 text-sm">
        Filtern nach Stufe: &nbsp; &nbsp;
        <Filter set={setAge} v={age} val={"Zyklus-2"} label="Zyklus-2" sep />
        <Filter set={setAge} v={age} val={"Sek-1"} label="Sek-1" sep />
        <Filter set={setAge} v={age} val={"Gym"} label="Gym" sep />
        <Filter set={setAge} v={age} val={"Berufsschule"} label="BS" />
        &nbsp; &nbsp; &nbsp; nach Inhalt: &nbsp; &nbsp;
        <Filter set={setType} v={type} val={"tool"} label="Aufgaben" sep />
        <Filter set={setType} v={type} val={"video"} label="Videos" sep />
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
