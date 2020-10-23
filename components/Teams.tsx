import { gql } from "@apollo/client";
import { useUser } from "../state/user";
import { Text, Link as A } from "rebass";
import { QForm, ErrorBox } from "./Form";
import { useState, ReactElement } from "react";
import {
  TeamWhereInput,
  useTeamsQuery,
  TeamUserFieldsFragment,
  useCreateOneTeamMutation,
} from "graphql/types";
import { Page } from "./Page";

const TeamAnonFields = gql`
  fragment TeamAnonFields on Team {
    id
    name
    school {
      id
      name
      city
    }
  }
`;

const TeamUserFields = gql`
  fragment TeamUserFields on Team {
    ...TeamAnonFields
    members {
      id
      name
      shortname
    }
  }
  ${TeamAnonFields}
`;

const TeamTeacherFields = gql`
  fragment TeamTeacherFields on Team {
    ...TeamUserFields
    invite
    code
    members {
      email
      emailVerified
    }
  }
  ${TeamUserFields}
`;

export const fragments = { TeamUserFields, TeamTeacherFields, TeamAnonFields };

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

export const GET_INVITE_TEAM = gql`
  query teamByInvite($invite: String!) {
    team(where: { invite: $invite }) {
      ...TeamAnonFields
    }
  }
  ${fragments.TeamAnonFields}
`;

export const GET_CODE_TEAM = gql`
  query teamByCode($code: String!) {
    team(where: { code: $code }) {
      ...TeamAnonFields
    }
  }
  ${fragments.TeamAnonFields}
`;

type TeamsProps = {
  where?: TeamWhereInput;
  teamClick: (team: TeamUserFieldsFragment) => void;
};

export const Teams: React.FC<TeamsProps> = ({ where, teamClick }) => {
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
    return <Text>Noch keine Klassen erfasst.</Text>;
  }
  return (
    <div className="teams">
      <table width="100%">
        <thead>
          <tr>
            <th align="left">Klasse</th>
            <th align="left">Schulhaus</th>
            <th align="left">SuS</th>
            <th align="left">Bearbeiten</th>
          </tr>
        </thead>

        <tbody>
          {teams?.map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>
                {team.school?.name} ({team.school?.city})
              </td>
              <td>{team.members ? <>{team.members.length} SuS</> : "-"}</td>
              <td>
                <A onClick={() => teamClick(team)}>Bearbeiten</A>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const CREATE_TEAM = gql`
  mutation createOneTeam($name: String!, $school: String!, $teacher: String!) {
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
  onCompleted: (teamId: string) => void;
}): ReactElement | null {
  const user = useUser();
  const [error, setError] = useState("");
  const [doCreateTeam] = useCreateOneTeamMutation({
    onCompleted: ({ createOneTeam }) => {
      onCompleted(createOneTeam.id);
    },
    onError: (error) => {
      setError(error.message);
    },
    update: (cache, result) => {
      cache.modify({
        fields: {
          teams(existingTeams: typeof TeamTeacherFields[] = []) {
            const newTeamRef = cache.writeFragment({
              data: result.data?.createOneTeam,
              fragment: fragments.TeamTeacherFields,
              fragmentName: "TeamTeacherFields",
            });
            return [...existingTeams, newTeamRef];
          },
        },
      });
    },
  });

  if (!user || !user.school) {
    return null;
  }
  const schoolId = user.school.id;

  return (
    <QForm
      mutation={doCreateTeam}
      onSubmit={(values) =>
        doCreateTeam({
          variables: {
            name: String(values.name),
            teacher: user.id,
            school: schoolId,
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
      <ErrorBox error={error} />
    </QForm>
  );
}
