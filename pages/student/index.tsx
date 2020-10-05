import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Heading, Text } from "rebass";
import { LogoutButton } from "../user/logout";
import { Navigation, Route } from "components/Navigation";
import { ReactElement } from "react";

export default function Teacher(): ReactElement {
  const user = useUser();

  return (
    <LoggedInPage heading="Startseite für Schüler/-innen">
      <StudentTeamNavigation />
      <Heading as="h2">Hey {user?.name} 👋</Heading>
      <Text>{user && "Deine Klasse: " + user?.team?.name}</Text>

      <LogoutButton my={4} />
    </LoggedInPage>
  );
}

export function StudentTeamNavigation(): ReactElement {
  return (
    <Navigation>
      <Route href="/student" label="Dein Profil" />
      <Route href="/student/test" label="Demokratie testen" />
      <Route href="/student/learn" label="Demokratie lernen" disabled />
      <Route href="/student/experience" label="Demokratie leben" disabled />
    </Navigation>
  );
}
