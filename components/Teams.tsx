import { gql } from "@apollo/client";
import { useUser } from "../state/user";
import { Text, Card, Link as A } from "rebass";
import { QForm, ErrorBox } from "./Form";
import { useMutation } from "@apollo/client";
import { useState, Fragment, ReactElement } from "react";
import { Team, TeamWhereInput, useTeamsQuery } from "graphql/types";
import { Page } from "./Page";
import { Users } from "./Users";

const TeamUserFields = gql`
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
`;

const TeamTeacherFields = gql`
  fragment TeamTeacherFields on Team {
    id
    invite
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
      email
      emailVerified
    }
  }
`;

export const fragments = { TeamUserFields, TeamTeacherFields };

export const GET_TEAMS = gql`
  query teams($where: TeamWhereInput) {
    teams(where: $where) {
      ...TeamTeacherFields
    }
  }
  ${fragments.TeamTeacherFields}
`;

export const GET_TEAM_USER = gql`
  query teamUser($where: TeamWhereUniqueInput!) {
    team(where: $where) {
      ...TeamUserFields
    }
  }
  ${fragments.TeamUserFields}
`;

export const GET_TEAM_TEACHER = gql`
  query teamTeacher($where: TeamWhereUniqueInput!) {
    team(where: $where) {
      ...TeamTeacherFields
    }
  }
  ${fragments.TeamTeacherFields}
`;

type TeamsProps = {
  where?: TeamWhereInput;
  teamClick: (team: Team) => void;
};

export const Teams: React.FC<TeamsProps> = ({ where, teamClick }) => {
  const [focus, setFocus] = useState();
  const teamsQuery = useTeamsQuery({ variables: { where } });
  const teams = teamsQuery.data?.teams;

  if (teamsQuery.error) {
    return (
      <Page>
        <h1>Error loading data: {teamsQuery.error.message}</h1>
      </Page>
    );
  }
  if (teamsQuery.loading) {
    return (
      <Page>
        <h1>Loading data</h1>
      </Page>
    );
  }

  if (teams?.length === 0) {
    return <Text>Noch keine Klassen erfasst</Text>;
  }
  return (
    <>
      <table width="100%">
        <thead>
          <tr>
            <th align="left">Klasse</th>
            <th align="left">Schulhaus</th>
            <th align="left">Schüler|innen</th>
            <th align="left">Bearbeiten</th>
          </tr>
        </thead>

        <tbody>
          {teams?.map((team: any) => (
            <Fragment key={team.id}>
              <tr>
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
                  <A onClick={() => teamClick(team)}>Bearbeiten</A>
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
                    <Users users={team.members} />
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

export function CreateTeamForm({
  onCompleted,
}: {
  onCompleted?: () => void;
}): ReactElement {
  const user = useUser();
  const [error, setError] = useState("");
  const [doCreateTeam] = useMutation(CREATE_TEAM, {
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
              fragmentName: "TeamTeacherFields",
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
      <ErrorBox error={error} />
    </Card>
  );
}
