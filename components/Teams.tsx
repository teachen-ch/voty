import { gql, useQuery } from "@apollo/client";
import { useUser } from "../state/user";
import { Button, Text, Card, Link as A } from "rebass";
import Link from "next/link";
import { QForm } from "./Form";
import { useMutation } from "@apollo/client";
import { useState, Fragment } from "react";
import { Team, TeamWhereInput } from "@prisma/client";
import { Page } from "./Page";
import { Users } from "./Users";

export const fragments = {
  TeamUserFields: gql`
    fragment TeamUserFields on Team {
      id
      name
      school {
        id
        name
        city
      }
      members {
        id
        name
        shortname
      }
    }
  `,
  TeamTeacherFields: gql`
    fragment TeamTeacherFields on Team {
      invite
      id
      name
      school {
        id
        name
        city
      }
      members {
        id
        name
        shortname
      }
    }
  `,
};

const GET_TEAMS = gql`
  query teams($where: TeamWhereInput) {
    teams(where: $where) {
      ...TeamTeacherFields
    }
  }
  ${fragments.TeamTeacherFields}
`;

const GET_TEAM_USER = gql`
  query teamUser($where: TeamWhereUniqueInput!) {
    team(where: $where) {
      ...TeamUserFields
    }
  }
  ${fragments.TeamUserFields}
`;

export function useTeamUser(id: Number) {
  const { data } = useQuery(GET_TEAM_USER, {
    variables: { where: { id } },
    skip: !id,
  });
  return data?.team;
}

const GET_TEAM_TEACHER = gql`
  query teamTeacher($where: TeamWhereUniqueInput!) {
    team(where: $where) {
      ...TeamTeacherFields
    }
  }
  ${fragments.TeamTeacherFields}
`;

export function useTeamTeacher(id: Number, user: any) {
  const { data } = useQuery(GET_TEAM_TEACHER, {
    variables: { where: { id } },
    skip: !id,
  });
  return data?.team;
}

type TeamsProps = {
  where?: TeamWhereInput;
  teamClick: (team: Team) => void;
};

export const Teams: React.FC<TeamsProps> = ({ where, teamClick }) => {
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
                <td>
                  <A onClick={() => teamClick(team)}>{team.name}</A>
                </td>
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
                    <Users
                      data={team.members}
                      school={team.school}
                      team={team}
                    />
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

const CREATE_TEAM = gql`
  mutation createOneTeam($name: String!, $school: Int!, $teacher: Int!) {
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
  ${fragments.TeamTeacherFields}
`;

export function CreateTeamForm({ onCompleted }: { onCompleted?: () => void }) {
  const user = useUser();
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
              fragment: fragments.TeamTeacherFields,
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
              teacher: user?.id,
              school: user?.school?.id,
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
