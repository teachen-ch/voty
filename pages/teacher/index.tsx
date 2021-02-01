import { useUser } from "state/user";
import { LoggedInPage } from "components/Page";
import { Box, Button, Text } from "rebass";
import { Teams, CreateTeamForm } from "components/Teams";
import { useState, ReactElement } from "react";
import { useRouter } from "next/router";
import { SelectSchool } from "components/Schools";
import { Breadcrumb, Here } from "components/Breadcrumb";
import { Role } from "graphql/types";

export default function TeacherHome(): ReactElement {
  const user = useUser();
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function teamDetail(teamId: string) {
    await router.push(`/team/${teamId}`);
  }

  if (user?.school === null) {
    return (
      <LoggedInPage heading="Willkommen auf voty.ch" role={Role.Teacher}>
        <Text mb={3}>Wähle zuerst Deine Schule aus oder erfasse eine Neue</Text>
        <SelectSchool />
      </LoggedInPage>
    );
  }

  return (
    <LoggedInPage heading="Meine Klassen" role={Role.Teacher}>
      <Breadcrumb>
        <Here>Meine Klassen</Here>
      </Breadcrumb>
      <Text fontWeight="bold">Willkommen {user && user.name}</Text>
      <Text mb={4}>Hier siehst Du eine Übersicht Deiner Klassen</Text>
      <Teams
        where={{ teacher: { id: { equals: user?.id } } }}
        teamClick={(team) => teamDetail(team.id)}
      />
      <Box mt={4} minHeight="175px">
        {success && (
          <Text mb={4}>
            Die neue Klasse wurde erfolgreich erstellt. Du kannst diese nun in
            der Tabelle anwählen um Schüler*innen hinzuzufügen und Abstimmungen
            auszuwählen.
          </Text>
        )}
        {showForm ? (
          <CreateTeamForm
            onCompleted={() => {
              setShowForm(false);
              setSuccess(true);
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <Button onClick={() => setShowForm(!showForm)} width="100%">
            Neue Klasse erfassen
          </Button>
        )}
      </Box>
    </LoggedInPage>
  );
}
