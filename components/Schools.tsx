import { gql, useQuery } from "@apollo/client";

const GET_SCHOOLS = gql`
  query {
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

export function Schools() {
  const schools = useQuery(GET_SCHOOLS);

  if (schools.error) {
    return <h1>Error loading data: {schools.error.message}</h1>;
  }
  if (schools.loading) {
    return <h1>Loading data</h1>;
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>City</th>
            <th>Members</th>
          </tr>
        </thead>

        <tbody>
          {schools.data.schools.map((school: any) => (
            <tr key={school.id}>
              <td>{school.id}</td>
              <td>{school.name}</td>
              <td>{school.city}</td>
              <td>{school.members ? school.members.length : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// update
export const SET_USER_SCHOOL = gql`
  mutation($school: Int) {
    setSchool(school: { connect: { id: $school } }) {
      id
      name
      shortname
    }
  }
`;

export async function useSchoolList() {
  const schools = useQuery(GET_SCHOOLS);
  return schools.data?.schools;
}
