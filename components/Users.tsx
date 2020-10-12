import { gql } from "@apollo/client";
import { TeamTeacherFieldsFragment, User } from "graphql/types";
import { ReactElement } from "react";
import { Link } from "rebass";

export const GET_USERS = gql`
  query users($where: UserWhereInput) {
    users(where: $where) {
      id
      shortname
      team {
        id
        name
        school {
          id
          name
        }
      }
    }
  }
`;

type myUser = Pick<
  User,
  "email" | "emailVerified" | "id" | "name" | "shortname"
>;

export function Users({
  users,
}: {
  users?: TeamTeacherFieldsFragment["members"];
}): ReactElement {
  if (!users || users.length === 0) {
    return <span>Keine Benutzer gefunden…</span>;
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user: myUser) => (
            <tr key={user.id}>
              <td>{user.shortname}</td>
              <td>
                <Link href={`mailto:${user.email}`}>{user.email}</Link>
              </td>
              <td>{user.emailVerified ? "✅ Bestätigt" : "☑️ Verschickt"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
