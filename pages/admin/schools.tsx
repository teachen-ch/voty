import { gql, useQuery } from "@apollo/client";

import { Page } from "components/Page";

const GET_SCHOOLS = gql`
  query users {
    schools {
      id
      name
      city
      zip
      canton
      members {
        id
        name
        lastname
      }
    }
  }
`;

export default function Schools() {
  const schools = useQuery(GET_SCHOOLS);

  if (schools.error) {
    return (
      <Page>
        <h1>Error loading data: {schools.error.message}</h1>
      </Page>
    );
  }
  if (schools.loading) {
    return (
      <Page>
        <h1>Loading data</h1>
      </Page>
    );
  }
  return (
    <Page>
      <h1>Schulen</h1>
      <h2>Auflistung aller voty Schulen</h2>
      <table>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>City</th>
          <th>Members</th>
        </tr>

        {schools.data.schools.map((school: any) => (
          <tr key={school.id}>
            <td>{school.id}</td>
            <td>{school.name}</td>
            <td>{school.city}</td>
            <td>{school.members ? school.members.length : "-"}</td>
          </tr>
        ))}
      </table>
    </Page>
  );
}
