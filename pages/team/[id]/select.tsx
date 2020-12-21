import { LoggedInPage, Page } from "components/Page";
import { Cards, CardList } from "components/Cards";
import { Input } from "@rebass/forms";
import { Flex, Button } from "rebass";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTeamTeacherQuery } from "graphql/types";
import { A, Breadcrumb } from "components/Breadcrumb";
import { debounce } from "lodash";

export default function CardsPage(): React.ReactElement {
  const router = useRouter();
  const id = String(router.query.id);
  const teamQuery = useTeamTeacherQuery({
    variables: { where: { id } },
    skip: !id,
  });

  const [keywords, setKeywords] = useState("");

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
  return (
    <Page heading="Lerninhalte">
      <Breadcrumb>
        <A href="/">Start</A>
        <A href="/teacher/">Meine Klassen</A>
        <A href={`/team/${team.id}/admin`}>{team.name}</A>
        <b>Lerninhalte</b>
      </Breadcrumb>

      <b>Folgende Lerninhalte sind ausgewählt</b>

      <CardList teamCards={team.cards} teamId={team.id} />

      <Flex mb={3} mt={4}>
        <Input
          onChange={debounce((evt) => setKeywords(evt.target.value), 400)}
          placeholder="Suche..."
        />
        <Button ml={3} px={5} height="100%" mt="3px">
          Suche
        </Button>
      </Flex>

      <Cards keywords={keywords} teamId={team.id} teamCards={team.cards} />
    </Page>
  );
}
