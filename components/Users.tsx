import { gql, useQuery } from "@apollo/client";
import { Text } from "rebass";
import { UserWhereInput, User, Team, School } from "graphql/types";

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

export function useUsers(where?: UserWhereInput) {
  const users = useQuery(GET_USERS, { variables: { where } });
  return users.data?.users;
}

export function Users({
  data,
  team,
  school,
}: {
  data: User[];
  team?: Team;
  school?: School;
}) {
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
            <th>#</th>
            <th>Name</th>
            <th>Klasse</th>
            <th>Schulhaus</th>
          </tr>
        </thead>

        <tbody>
          {data!.map((user: User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.shortname}</td>
              <td>{user.team?.name || team?.name}</td>
              <td>{user.team?.school?.name || school?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
