import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Heading } from "rebass";
import { Teams, CreateTeamForm } from "../admin/teams";
import { LogoutButton } from "../user/logout";

export default function Teacher() {
  const user = useUser();

  return (
    <LoggedInPage heading="Startseite für Lehrpersonen">
      <Heading as="h2">Willkommen {user && user.name}</Heading>
      <Heading as="h3">Deine Klassen auf voty</Heading>
      <Teams />
      <Heading as="h3">Neue Klasse erfassen</Heading>
      <CreateTeamForm />
      <LogoutButton my={4} />
    </LoggedInPage>
  );
}
