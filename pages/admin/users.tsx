import { LoggedInPage } from "../../components/Page";
import { Users } from "../../components/Users";

export default function UsersPage() {
  return (
    <LoggedInPage heading="Benutzer">
      <Users />
    </LoggedInPage>
  );
}
