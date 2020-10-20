import { useUser } from "state/user";
import { LoggedInPage } from "components/Page";
import { Heading, Button, Text } from "rebass";
import { Teams, CreateTeamForm } from "components/Teams";
import { useState, ReactElement } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { TeacherProfilePage } from "./profile";

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
    return <TeacherProfilePage firstRun />;
  }

  return (
    <LoggedInPage heading="Startseite für Lehrpersonen">
      <Heading as="h2">Willkommen {user && user.name}</Heading>

      <Link href="/teacher/profile">
        <Button>Profil bearbeiten</Button>
      </Link>
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
    </LoggedInPage>
  );
}
