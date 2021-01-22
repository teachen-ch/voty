import { gql } from "@apollo/client";
import { useUser } from "../state/user";
import { Text, Box, Link as A, Button } from "rebass";
import { QForm, ErrorBox } from "./Form";
import { useState, ReactElement, useEffect } from "react";
import IconSuS from "../public/images/icon_sus.svg";
import {
  TeamWhereInput,
  useTeamsQuery,
  TeamUserFieldsFragment,
  useCreateOneTeamMutation,
  useSetPrefsMutation,
  TeamTeacherFieldsFragment,
} from "graphql/types";
import { Err, Loading } from "./Page";
import { cloneDeep } from "lodash";
import { Label, Select } from "@rebass/forms";
import { Grid } from "theme-ui";

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
    cards
    prefs
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
                <td width="40px">
                  <A onClick={() => teamClick(team)}>
                    <Box variant="centered">
                      <IconSuS height="24px" alt="SuS" />
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

export const SET_PREFS = gql`
  mutation setPrefs($teamId: String!, $prefs: Json!) {
    setPrefs(teamId: $teamId, prefs: $prefs) {
      ...TeamTeacherFields
    }
  }
  ${fragments.TeamTeacherFields}
`;

export const EditTeamPrefs: React.FC<{ team: TeamTeacherFieldsFragment }> = ({
  team,
}) => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [prefs, setPrefs] = useState<Record<string, any>>(team.prefs);
  let cancel = 0;
  const [doSetPrefs, mutation] = useSetPrefsMutation({
    variables: { teamId: team.id, prefs },
    onCompleted() {
      setSuccess(true);
      cancel = setTimeout(() => setShow(false), 1000);
    },
    onError(err) {
      setError(err.message);
    },
  });
  useEffect(() => {
    return () => clearTimeout(cancel);
  });

  function setPref(name: string, value: string) {
    const newPrefs = cloneDeep(prefs);
    newPrefs[name] = value;
    setPrefs(newPrefs);
  }

  return (
    <>
      <Text my={2} textAlign="right" fontSize={1}>
        <A onClick={() => setShow(!show)}>Klassen-Einstellungen bearbeiten</A>
      </Text>
      {show && (
        <Box mt={3}>
          <Label>
            Bereits eingegebene Arbeiten der ganzen Klasse anzeigen:
          </Label>
          <Select
            value={prefs["showWorks"] as string}
            onChange={(e) => setPref("showWorks", e.target.value)}
          >
            <option value="">Immer</option>
            <option value="after">Nach eigener Abgabe</option>
            <option value="never">Nie</option>
          </Select>
          <Label mt={3}>Gruppenarbeiten erlauben:</Label>
          <Select
            value={prefs["allowGroups"] as string}
            onChange={(e) => setPref("allowGroups", e.target.value)}
          >
            <option value="">Ja</option>
            <option value="no">Nein</option>
          </Select>
          <Grid columns={"1fr 1fr"} mt={3}>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Abbrechen
            </Button>
            <Button onClick={() => doSetPrefs()} disabled={mutation.loading}>
              {success ? "Erfolgreich gespeichert" : "Speichern"}
            </Button>
          </Grid>
          <Err msg={error} />
        </Box>
      )}
    </>
  );
};
