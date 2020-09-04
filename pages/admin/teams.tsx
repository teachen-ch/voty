import { gql, useQuery, useMutation } from "@apollo/client";

import { Text, Card, Link } from "rebass";
import { Page } from "components/Page";
import { QForm, ErrorBox } from "components/forms";
import { useUser } from "../../state/user";
import { useState } from "react";

Teams.fragments = {
  TeamTeacherFields: gql`
    fragment TeamTeacherFields on Team {
      id
      name
      invite
      school {
        id
        name
        city
      }
      members {
        id
        name
        lastname
      }
    }
  `,
};

const GET_TEAMS = gql`
  query($id: Int) {
    teams(where: { teacher: { id: { equals: $id } } }) {
      ...TeamTeacherFields
    }
  }
  ${Teams.fragments.TeamTeacherFields}
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

  if (teams.data.length === 0) {
    return <Text>Noch keine Klassen erfasst</Text>;
  }
  return (
    <>
      <table width="100%">
        <thead>
          <tr>
            <th align="left">#</th>
            <th align="left">Klasse</th>
            <th align="left">Schulhaus</th>
            <th align="left">Schüler|innen</th>
            <th align="left">Link</th>
          </tr>
        </thead>

        <tbody>
          {teams.data.teams.map((team: any) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>
                {team.school?.name} ({team.school?.city})
              </td>
              <td>{team.members ? team.members.length : "-"}</td>
              <td>
                <Link href={`/i/${team.invite}`}>Einladung</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const CREATE_TEAM = gql`
  mutation($name: String!, $school: Int!, $teacher: Int!) {
    createOneTeam(
      data: {
        name: $name
        school: { connect: { id: $school } }
        teacher: { connect: { id: $teacher } }
      }
    ) {
      ...TeamTeacherFields
    }
  }
  ${Teams.fragments.TeamTeacherFields}
`;

export function CreateTeamForm() {
  const user = useUser();
  console.log(user);
  const [error, setError] = useState("");
  const [doCreateTeam, mutation] = useMutation(CREATE_TEAM, {
    onCompleted: (data) => {},
    onError: (error) => {
      setError(error.message);
    },
    update: (cache, { data: { createOneTeam } }) => {
      cache.modify({
        fields: {
          teams(existingTeams = []) {
            const newTeamRef = cache.writeFragment({
              data: createOneTeam,
              fragment: Teams.fragments.TeamTeacherFields,
            });
            return [...existingTeams, newTeamRef];
          },
        },
      });
    },
  });

  if (mutation.data) {
    return (
      <Card>
        <Text>
          Klasse «{mutation.data.createOneTeam?.name}» erfolgreich erstellt.
          <br />
          <Link href="/user/teacher">Weitere Klasse erstellen</Link>
        </Text>
      </Card>
    );
  }

  return (
    <Card>
      <QForm
        mutation={doCreateTeam}
        onSubmit={(values) =>
          doCreateTeam({
            variables: {
              name: values.name,
              teacher: user.id, // @ts-ignore
              school: user.school?.id,
            },
          })
        }
        fields={{
          name: {
            label: "Klasse:",
            required: true,
          },
          submit: { type: "submit", label: "Klasse erstellen" },
        }}
      >
        <ErrorBox error={error} my={4} />
      </QForm>
    </Card>
  );
}
