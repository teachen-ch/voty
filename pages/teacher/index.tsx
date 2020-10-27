import { useUser } from "state/user";
import { LoggedInPage } from "components/Page";
import { Heading, Button, Text } from "rebass";
import { Teams, CreateTeamForm } from "components/Teams";
import { useState, ReactElement } from "react";
import { useRouter } from "next/router";
import { SelectSchool } from "components/Schools";

export default function Teacher(): ReactElement {
  const user = useUser();
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  async function teamDetail(teamId: string) {
    await router.push(
      "/teacher/team/[id]/admin",
      `/teacher/team/${teamId}/admin`
    );
  }

  if (user?.school === null) {
    return (
      <LoggedInPage heading="Willkommen auf voty.ch">
        <Text mb={3}>
          Wähle zuerst Dein Schulhaus aus oder erfasse ein Neues…
        </Text>
        <SelectSchool />
      </LoggedInPage>
    );
  }

  return (
    <LoggedInPage heading="Meine Schulklassen">
      <Text fontWeight="bold">Willkommen {user && user.name}</Text>
      <Text>Hier siehst Du eine Übersicht Deiner Klassen</Text>
      <Heading as="h3">Deine Klassen auf voty.ch</Heading>
      <Teams
        where={{ teacher: { id: { equals: user?.id } } }}
        teamClick={(team) => teamDetail(team.id)}
      />
      {showForm ? (
        <CreateTeamForm onCompleted={teamDetail} />
      ) : user?.school ? (
        <Button onClick={() => setShowForm(!showForm)} my={4}>
          Neue Klasse erfassen
        </Button>
      ) : (
        "Bitte wähle zuerst Dein Schulhaus."
      )}
      <Text />
    </LoggedInPage>
  );
}
