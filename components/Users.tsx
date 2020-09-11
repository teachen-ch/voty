import { gql, useQuery } from "@apollo/client";
import { Text } from "rebass";
import { UserWhereInput } from "@prisma/client";
const GET_USERS = gql`
  query($where: UserWhereInput) {
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
export function Users({ where }: { where?: UserWhereInput }) {
  const users = useQuery(GET_USERS, { variables: { where } });

  if (users.error) {
    return <h1>Error loading data: {users.error.message}</h1>;
  }
  if (users.loading) {
    return <h1>Loading data</h1>;
  }

  if (users.data.length === 0) {
    return <Text>Keine Benutzer gefunden</Text>;
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
          {users.data.users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.shortname}</td>
              <td>{user.team?.name || "–"}</td>
              <td>{user.team?.school?.name || "–"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
