import { LoggedInPage } from "components/Page";
import { Cards, CardListSelect } from "components/Cards";
import { Input } from "@rebass/forms";
import { Flex, Button, Text, Heading, HeadingProps } from "rebass";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { A, Breadcrumb, Here } from "components/Breadcrumb";
import { debounce } from "lodash";
import { Filter } from "components/Swissvotes";
import { useTeam } from "state/user";
import { Role } from "graphql/types";

export default function CardsPage(): React.ReactElement {
  const router = useRouter();
  const team = useTeam();
  const [keywords, setKeywords] = useState("");
  const [type, setType] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();

  if (!team) {
    return (
      <LoggedInPage heading="Detailansicht Klasse" role={Role.Teacher}>
        <Text mb={3}>Klasse wurde nicht gefunden.</Text>
        <Button onClick={() => router.push("/teacher/")}>Meine Klassen</Button>
      </LoggedInPage>
    );
  }
  function resetFilters() {
    setAge(undefined);
    setType(undefined);
    setKeywords("");
  }
  return (
    <LoggedInPage heading="Lerninhalte" role={Role.Teacher}>
      <Breadcrumb>
        <A href="/">Start</A>
        <A href="/teacher/">Meine Klassen</A>
        <A href={`/team/${team.id}/admin`}>{team.name}</A>
        <Here>Lerninhalte</Here>
      </Breadcrumb>

      <Text textAlign="left">
        <H3>Folgende Lerninhalte sind ausgewählt</H3>

        <CardListSelect teamCards={team.cards} teamId={team.id} />

        <H3 mt={5}>Weitere Lerninhalte hinzufügen</H3>
        <Flex>
          <Input
            onChange={debounce((evt) => setKeywords(evt.target.value), 300)}
            placeholder="Suche..."
            flex={1}
          />
          <Button
            ml={3}
            width="calc(34% - 16px)"
            mt={[0, 0, "4px"]}
            height="50px"
          >
            Suchen
          </Button>
        </Flex>
        <Text mb={4} mt="24px" fontSize={1}>
          Filtern nach Stufe: &nbsp; &nbsp;
          <Filter set={setAge} v={age} val={"Zyklus-2"} label="Zyklus-2" sep />
          <Filter set={setAge} v={age} val={"Sek-1"} label="Sek-1" sep />
          <Filter set={setAge} v={age} val={"Gym"} label="Gym" sep />
          <Filter set={setAge} v={age} val={"Berufsschule"} label="BS" />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; nach&nbsp;Inhalt: &nbsp; &nbsp;
          <Filter set={setType} v={type} val={"tool"} label="Aufgaben" sep />
          <Filter set={setType} v={type} val={"video"} label="Videos" sep />
          <Filter set={setType} v={type} val={"chaty"} label="Chaty" />
        </Text>

        <Cards
          keywords={keywords}
          type={type}
          age={age}
          teamId={team.id}
          teamCards={team.cards}
          resetFilters={resetFilters}
        />
      </Text>
    </LoggedInPage>
  );
}

export const H3: React.FC<HeadingProps> = (props) => (
  <Heading as="h3" color="#508DEA" pb={2} fontWeight="semi" {...props}>
    {props.children}
  </Heading>
);
