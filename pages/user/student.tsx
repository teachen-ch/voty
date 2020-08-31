import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Heading } from "rebass";
import { Schools } from "../admin/schools";
import { LogoutButton } from "../user/login";

export default function Teacher() {
  const user = useUser();

  return (
    <LoggedInPage heading="Startseite für Schüler/-innen">
      <Heading as="h2">Hey {user && user.name}</Heading>
      <LogoutButton my={4} />
    </LoggedInPage>
  );
}
