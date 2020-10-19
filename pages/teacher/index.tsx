import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Heading, Button, Text, Box, Link as A } from "rebass";
import { Teams, CreateTeamForm } from "../../components/Teams";
import { useState, ReactElement } from "react";
import { SelectSchool } from "../../components/Schools";
import { useRouter } from "next/router";
import Link from "next/link";

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

  return (
    <LoggedInPage heading="Startseite für Lehrpersonen">
      <Heading as="h2">Willkommen {user && user.name}</Heading>
      <SelectSchool />
      <Heading as="h3">Deine Klassen auf voty</Heading>
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
      <Box mt={5} textAlign="right">
        Ich möchte mein Konto bei voty{" "}
        <Link href="/user/delete">
          <A>löschen</A>
        </Link>
      </Box>
    </LoggedInPage>
  );
}
