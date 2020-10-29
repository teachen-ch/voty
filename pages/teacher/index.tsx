import { useUser } from "state/user";
import { LoggedInPage } from "components/Page";
import { Box, Button, Text } from "rebass";
import { Teams, CreateTeamForm } from "components/Teams";
import { useState, ReactElement } from "react";
import { useRouter } from "next/router";
import { SelectSchool } from "components/Schools";

export default function Teacher(): ReactElement {
  const user = useUser();
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
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
        <Text mb={3}>Wähle zuerst Deine Schule aus oder erfasse eine Neue</Text>
        <SelectSchool />
      </LoggedInPage>
    );
  }

  return (
    <LoggedInPage heading="Meine Klassen">
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
