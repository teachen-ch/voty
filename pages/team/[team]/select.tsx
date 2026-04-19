import { H3, LoggedInPage, ShowFor } from "components/Page";
import { Cards, EditCardList } from "components/Cards";
import { Input } from "components/ui";
import { Flex, Button, Text, Box } from "components/ui";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Breadcrumb, Here } from "components/Breadcrumb";
import { A } from "components/A";
import debounce from "lodash/debounce";
import { Filter } from "components/Swissvotes";
import { useTeam } from "state/user";
import { Role } from "graphql/types";
import { ReadMore } from "components/ReadMore";
import { LearningPath } from "components/LearningPaths";
import { EditTeamPrefs } from "components/Prefs";

export default function SelectCardsPage(): React.ReactElement {
  const router = useRouter();
  const team = useTeam();
  const [keywords, setKeywords] = useState("");
  const [type, setType] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();

  if (!team) {
    return (
      <LoggedInPage heading="Detailansicht Klasse" role={Role.Teacher}>
        <Text className="mb-4">Klasse wurde nicht gefunden.</Text>
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
    <LoggedInPage heading="Lerninhalte hinzufügen" role={Role.Teacher}>
      <Breadcrumb>
        <A href="/teacher/">Meine Klassen</A>
        <A href={`/team/${team.id}`}>{team.name}</A>
        <Here>Lerninhalte</Here>
      </Breadcrumb>

      <ListPaths />

      <H3>Folgende Lerninhalte sind ausgewählt</H3>
      <EditCardList teamCards={team.cards} teamId={team.id} />
      <Text className="my-2 text-right text-sm">
        <EditTeamPrefs team={team} />
      </Text>
      <ShowFor role="Admin">
        <Text className="mt-2 text-sm text-right">
          <A onClick={() => alert(team.cards)}>Pfad anzeigen</A>
        </Text>
      </ShowFor>
      <H3 className="mt-16">Weitere Lerninhalte hinzufügen</H3>
      <Flex>
        <Input
          onChange={debounce((evt) => setKeywords(evt.target.value), 300)}
          placeholder="Suche..."
          className="flex-1"
        />
        <Button className="ml-4 px-20">Suchen</Button>
      </Flex>
      <Text className="mb-8 mt-6 text-sm">
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
    </LoggedInPage>
  );
}

export const ListPaths: React.FC<
  React.PropsWithChildren<{ anon?: boolean }>
> = ({ anon }) => (
  <Box className="mt-8">
    <Text className="text-base mb-4">
      Wähle entweder einen vorgeschlagenen Lernpfad für deine Klasse oder stelle
      die Inhalte frei zusammen.
    </Text>
    <ReadMore
      title="Lernpfad Sek-1 (8-12 Lektionen)"
      bg="darkgray"
      fontSize={2}
    >
      <LearningPath
        anon={anon}
        path="srf_abstimmen passion srf_regieren srf_wahlen chaty_initiativen chaty_referendum swissvotes_themen plakate plakat_gestalten tweety"
      />
    </ReadMore>
    <Box className="mt-4" />
    <ReadMore
      title="Lernpfad Berufsschule (12-16 Lektionen)"
      bg="darkgray"
      fontSize={2}
    >
      <LearningPath
        anon={anon}
        path="srf_abstimmen passion srf_regieren srf_wahlen chaty_initiativen chaty_referendum swissvotes_themen plakate plakat_gestalten tweety"
      />
    </ReadMore>
  </Box>
);
