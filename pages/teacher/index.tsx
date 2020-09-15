import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Heading, Button, Text, Card } from "rebass";
import { Teams, CreateTeamForm } from "../../components/Teams";
import { LogoutButton } from "../user/logout";
import { useState } from "react";
import { SelectSchool } from "../../components/Schools";
import router from "next/router";

export default function Teacher() {
  const user = useUser();
  const [showForm, setShowForm] = useState(false);

  return (
    <LoggedInPage heading="Startseite für Lehrpersonen">
      <Heading as="h2">Willkommen {user && user.name}</Heading>
      <SelectSchool />
      <Heading as="h3">Deine Klassen auf voty</Heading>
      <Teams
        where={{ teacher: { id: { equals: user?.id } } }}
        teamClick={(team) =>
          router.push(
            "/teacher/team/[id]/admin",
            `/teacher/team/${team.id}/admin`
          )
        }
      />
      {showForm ? (
        <CreateTeamForm onCompleted={() => setShowForm(false)} />
      ) : (
        <Button onClick={() => setShowForm(!showForm)} my={4}>
          Neue Klasse erfassen
        </Button>
      )}
      <Text />
      <LogoutButton my={4} />
    </LoggedInPage>
  );
}
