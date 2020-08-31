import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Heading } from "rebass";
import { Schools } from "../admin/schools";
import { LogoutButton } from "../user/login";

export default function Teacher() {
  const user = useUser();

  return (
    <LoggedInPage heading="Startseite für Lehrpersonen">
      <Heading as="h2">Willkommen {user && user.name}</Heading>
      <Heading as="h3">Alle Schulen auf voty</Heading>
      <Schools />
      <LogoutButton my={4} />
    </LoggedInPage>
  );
}
