import { LoggedInPage, Page } from "components/Page";
import { Cards, CardListAdmin } from "components/Cards";
import { Input } from "@rebass/forms";
import { Flex, Button, Text } from "rebass";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTeamTeacherQuery } from "graphql/types";
import { A, Breadcrumb } from "components/Breadcrumb";
import { debounce } from "lodash";
import { Filter } from "components/Swissvotes";

export default function CardsPage(): React.ReactElement {
  const router = useRouter();
  const id = String(router.query.id);
  const teamQuery = useTeamTeacherQuery({
    variables: { where: { id } },
    skip: !id,
  });

  const [keywords, setKeywords] = useState("");
  const [type, setType] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();

  if (teamQuery.loading) {
    return (
      <LoggedInPage heading="Detailansicht Klasse">
        Klasse wird geladen…
      </LoggedInPage>
    );
  }

  const team = teamQuery.data?.team;
  if (!team) {
    return (
      <LoggedInPage heading="Detailansicht Klasse">
        Team konnte nicht gefunden werden
      </LoggedInPage>
    );
  }
  function resetFilters() {
    setAge(undefined);
    setType(undefined);
    setKeywords("");
  }
  return (
    <Page heading="Lerninhalte">
      <Breadcrumb>
        <A href="/">Start</A>
        <A href="/teacher/">Meine Klassen</A>
        <A href={`/team/${team.id}/admin`}>{team.name}</A>
        <b>Lerninhalte</b>
      </Breadcrumb>

      <b>Folgende Lerninhalte sind ausgewählt</b>

      <CardListAdmin teamCards={team.cards} teamId={team.id} />

      <Flex mt={4}>
        <Input
          onChange={debounce((evt) => setKeywords(evt.target.value), 400)}
          placeholder="Suche..."
        />
        <Button ml={3} px={5} height="100%" mt="3px">
          Suche
        </Button>
      </Flex>
      <Text mb={3} mt={1} fontSize={1}>
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
        teamId={team.id}
        teamCards={team.cards}
        resetFilters={resetFilters}
      />
    </Page>
  );
}
