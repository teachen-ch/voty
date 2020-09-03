import { gql, useQuery } from "@apollo/client";

import { Page } from "components/Page";
import { useUser } from "../../state/user";

const GET_TEAMS = gql`
  query($id: Int) {
    teams(where: { teacher: { id: { equals: $id } } }) {
      id
      name
      school {
        name
      }
      members {
        id
        name
        lastname
      }
    }
  }
`;

export default function TeamsPage() {
  return (
    <Page heading="Schulklassen">
      <Teams />
    </Page>
  );
}

export function Teams() {
  const user = useUser();
  const teams = useQuery(GET_TEAMS, { variables: { id: user?.id } });

  if (teams.error) {
    return (
      <Page>
        <h1>Error loading data: {teams.error.message}</h1>
      </Page>
    );
  }
  if (teams.loading) {
    return (
      <Page>
        <h1>Loading data</h1>
      </Page>
    );
  }
  return (
    <>
      <table width="100%">
        <thead>
          <tr>
            <th align="left">#</th>
            <th align="left">Klasse</th>
            <th align="left">Schulhaus</th>
            <th align="left">Anzahl</th>
          </tr>
        </thead>

        <tbody>
          {teams.data.teams.map((team: any) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.school?.name}</td>
              <td>{team.members ? team.members.length : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
