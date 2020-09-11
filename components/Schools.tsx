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
    setSchool(school: $school) {
      id
      name
      shortname
      school {
        id
        name
        city
        zip
      }
    }
  }
`;

const GET_SCHOOL_LIST = gql`
  query {
    schools {
      id
      name
      city
      zip
      canton
    }
  }
`;

export function useSchoolList() {
  const { data } = useQuery(GET_SCHOOL_LIST);
  console.log("useSchools: ", data?.schools);
  return data?.schools;
}
