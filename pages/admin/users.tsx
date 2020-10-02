import { LoggedInPage } from "../../components/Page";
import { Users, useUsers } from "../../components/Users";

export default function UsersPage() {
  const users = useUsers();
  return (
    <LoggedInPage heading="Benutzer">
      <Users data={users} />
    </LoggedInPage>
  );
}
