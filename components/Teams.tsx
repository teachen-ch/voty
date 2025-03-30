import { gql } from "@apollo/client";
import { useUser } from "../state/user";
import { Text, Box, Link as A, Button, BoxProps } from "rebass";
import { QForm, ErrorBox } from "./Form";
import { useState, ReactElement } from "react";
import IconSuS from "../public/images/icon_sus.svg";
import {
  TeamWhereInput,
  useTeamsQuery,
  TeamUserFieldsFragment,
  useCreateOneTeamMutation,
  useDeleteOneTeamMutation,
  TeamOrderByInput,
} from "graphql/types";
import { Loading } from "./Page";
import { useRouter } from "next/router";
import Image from "next/legacy/image";

const TeamAnonFields = gql`
  fragment TeamAnonFields on Team {
    id
    name
    cards
    prefs
    notes
    teacherId
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
    teacher {
      id
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
  query teams($where: TeamWhereInput, $orderBy: [TeamOrderByInput!]) {
    teams(where: $where, orderBy: $orderBy) {
      ...TeamTeacherFields
    }
  }
  ${fragments.TeamTeacherFields}
`;

export const GET_TEAM_ANON = gql`
  query teamAnon($where: TeamWhereUniqueInput!) {
    team(where: $where) {
      ...TeamAnonFields
    }
  }
  ${fragments.TeamAnonFields}
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

export const DELETE_TEAM = gql`
  mutation deleteOneTeam($where: TeamWhereUniqueInput!) {
    deleteOneTeam(where: $where) {
      id
    }
  }
`;

type TeamsProps = {
  where?: TeamWhereInput;
  orderBy?: TeamOrderByInput[];
  teamClick: (team: TeamUserFieldsFragment) => void;
};

export const Teams: React.FC<React.PropsWithChildren<TeamsProps>> = ({
  where,
  orderBy,
  teamClick,
}) => {
  const teamsQuery = useTeamsQuery({ variables: { where, orderBy } });
  const teams = teamsQuery.data?.teams;

  if (teamsQuery.error) {
    return <Text>Error loading data: {teamsQuery.error.message}</Text>;
  }
  if (teamsQuery.loading || !teams) {
    return <Loading />;
  }

  return (
    <div className="teams">
      <table width="100%">
        <thead>
          <tr>
            <th align="left">Klasse</th>
            <th align="left">Schule</th>
            <th align="center">SuS</th>
            <th align="left"></th>
          </tr>
        </thead>

        <tbody>
          {teams.length === 0 ? (
            <tr>
              <td colSpan={4}>Es wurden noch keine Klassen erfasst.</td>
            </tr>
          ) : (
            teams?.map((team) => (
              <tr key={team.id} onClick={() => teamClick(team)}>
                <td style={{ maxWidth: "100px" }}>
                  <A onClick={() => teamClick(team)}>{team.name}</A>
                </td>
                <td style={{ maxWidth: "100px" }}>
                  {team.school?.name} ({team.school?.city})
                </td>
                <td align="center">
                  {team.members ? <>{team.members.length}</> : "-"}
                </td>
                <td width="40">
                  <A onClick={() => teamClick(team)}>
                    <Box variant="centered">
                      <Image src={IconSuS} height="24" alt="SuS" />
                    </Box>
                  </A>
                </td>
              </tr>
            ))
          )}
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
  onCancel,
}: {
  onCompleted: (teamId: string) => void;
  onCancel: () => void;
}): ReactElement | null {
  const user = useUser();
  const [error, setError] = useState("");
  const [doCreateTeam] = useCreateOneTeamMutation({
    onCompleted: ({ createOneTeam }) => {
      onCompleted(String(createOneTeam?.id));
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
          label: "Klasse",
          required: true,
        },
        submit: { type: "submit", label: "Klasse erstellen" },
      }}
    >
      <ErrorBox error={error} />
      <Button variant="text" onClick={onCancel} sx={{ gridColumn: [0, 0, 2] }}>
        Abbrechen
      </Button>
    </QForm>
  );
}

export const DeleteTeamLink: React.FC<
  React.PropsWithChildren<BoxProps & { teamId: string }>
> = ({ teamId, ...props }) => {
  const [doDelete] = useDeleteOneTeamMutation();
  const router = useRouter();

  async function doDel() {
    if (confirm("Klasse unwiederruflich löschen?")) {
      await doDelete({ variables: { where: { id: teamId } } });
      router.back();
    }
  }
  return (
    <Box {...props}>
      <Text>
        <A onClick={doDel}>Diese Klasse löschen</A>
      </Text>
    </Box>
  );
};
