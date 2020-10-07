import { gql, useQuery } from "@apollo/client";
import { UserWhereInput, User, Team, School } from "graphql/types";
import { ReactElement } from "react";
import { Link } from "rebass";

const GET_USERS = gql`
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

export function useUsers(where?: UserWhereInput): User[] | undefined {
  const users = useQuery(GET_USERS, { variables: { where } });
  return users.data?.users;
}

export function Users({
  data,
  team,
}: {
  data?: User[];
  team?: Team;
}): ReactElement {
  if (!data) {
    return <span>Loading…</span>;
  }
  if (data.length === 0) {
    return <span>Keine Benutzer gefunden…</span>;
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Klasse</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((user: User) => (
            <tr key={user.id}>
              <td>{user.shortname}</td>
              <td>
                <Link href={`mailto:${user.email}`}>{user.email}</Link>
              </td>
              <td>{user.team?.name || team?.name}</td>
              <td>{user.emailVerified ? "✅ Bestätigt" : "☑️ Verschickt"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
