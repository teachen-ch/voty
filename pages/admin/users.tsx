import { LoggedInPage } from "../../components/Page";
import { Users } from "../../components/Users";
import { ReactElement } from "react";
import { useUsersQuery } from "graphql/types";

export default function UsersPage(): ReactElement {
  const usersQuery = useUsersQuery();
  if (usersQuery.loading) {
    return <LoggedInPage heading="Benutzer">Loading...</LoggedInPage>;
  }
  const users = usersQuery.data?.users;
  return (
    <LoggedInPage heading="Benutzer">
      <Users users={users} />
    </LoggedInPage>
  );
}
