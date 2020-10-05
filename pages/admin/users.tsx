import { LoggedInPage } from "../../components/Page";
import { Users, useUsers } from "../../components/Users";
import { ReactElement } from "react";

export default function UsersPage(): ReactElement {
  const users = useUsers();
  return (
    <LoggedInPage heading="Benutzer">
      <Users data={users} />
    </LoggedInPage>
  );
}
