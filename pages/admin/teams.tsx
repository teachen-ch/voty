import { gql, useQuery, useMutation } from "@apollo/client";
import { Text, Card, Link as A } from "rebass";
import { Page, LoggedInPage } from "../../components/Page";
import { QForm, ErrorBox } from "../../components/Forms";
import { useUser } from "../../state/user";
import { useState, Fragment } from "react";
import Link from "next/link";
import { TeamWhereInput } from "@prisma/client";
import { Users } from "./users";

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
  query($where: TeamWhereInput) {
    teams(where: $where) {
      ...TeamTeacherFields
    }
  }
  ${Teams.fragments.TeamTeacherFields}
`;

export default function TeamsPage() {
  return (
    <LoggedInPage heading="Schulklassen">
      <Teams />
    </LoggedInPage>
  );
}

export function Teams({ where }: { where?: TeamWhereInput }) {
  const user = useUser();
  const [focus, setFocus] = useState();
  const teams = useQuery(GET_TEAMS, { variables: { where } });

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
            <Fragment key={team.id}>
              <tr>
                <td>{team.id}</td>
                <td>{team.name}</td>
                <td>
                  {team.school?.name} ({team.school?.city})
                </td>
                <td>
                  <A
                    onClick={() => setFocus(focus == team.id ? null : team.id)}
                  >
                    {team.members ? team.members.length : "-"}
                  </A>
                </td>
                <td>
                  <Link href={`/i/${team.invite}`}>
                    <A>Einladung</A>
                  </Link>
                </td>
              </tr>
              {focus === team.id && (
                <tr
                  style={{
                    backgroundColor: "#ddd",
                    border: "1px solid gray",
                  }}
                >
                  <td colSpan={10}>
                    <Users where={{ team: { id: { equals: team.id } } }} />
                  </td>
                </tr>
              )}
            </Fragment>
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

export function CreateTeamForm({ onCompleted }: { onCompleted?: () => void }) {
  const user = useUser();
  console.log(user);
  const [error, setError] = useState("");
  const [doCreateTeam, mutation] = useMutation(CREATE_TEAM, {
    onCompleted: onCompleted,
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
      ></QForm>
    </Card>
  );
}
