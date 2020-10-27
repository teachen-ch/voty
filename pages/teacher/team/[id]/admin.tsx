import { LoggedInPage } from "components/Page";
import { Heading, Text, Button, Link as A } from "rebass";
import { Users } from "components/Users";
import { Input, Textarea } from "@rebass/forms";
import { Grid, Label } from "theme-ui";
import { useRef, useState, RefObject } from "react";
import { Navigation, Route } from "components/Navigation";
import { useRouter } from "next/router";
import _ from "lodash";
import { SelectBallots } from "components/Ballots";
import { gql } from "@apollo/client";
import IconHint from "../../../../public/images/icon_hint.svg";
import { fragments } from "components/Teams";
import {
  useTeamTeacherQuery,
  TeamTeacherFieldsFragment,
  useInviteStudentsMutation,
} from "graphql/types";

export const INVITE_STUDENTS = gql`
  mutation inviteStudents($team: String!, $emails: [String!]!) {
    inviteStudents(team: $team, emails: $emails) {
      ...TeamTeacherFields
    }
  }
  ${fragments.TeamTeacherFields}
`;

export default function TeacherTeamPage(): React.ReactElement {
  const router = useRouter();
  const id = String(router.query.id);
  const teamQuery = useTeamTeacherQuery({
    variables: { where: { id } },
    skip: !id,
  });
  const [emails, setEmails] = useState<string[]>([]);
  const [matches, setMatches] = useState<number | undefined>();
  const [showInviteLink, setShowInviteLink] = useState(false);
  const [importEmails, setImportEmails] = useState("");

  const [doInviteStudents, inviteQuery] = useInviteStudentsMutation({
    onCompleted(/*{ inviteStudents }*/) {
      // TODO: currently we get the page updated via cache
      // but we do not show (or send over the API) errors
      // const updatedTeam = inviteStudents;
      setEmails([]);
      setMatches(undefined);
      setShowInviteLink(false);
      setImportEmails("");
    },
  });

  function checkEmails(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    setImportEmails(evt.target.value);
    const str = evt.target.value.toLowerCase();
    const re = /[^@\s<>,;]+@[^@\s]+\.[^@\s<>,;]+/g;
    const emails = _.uniq(str.match(re) || []);
    setEmails(emails);
    setMatches(emails.length ? emails.length : undefined);
  }

  async function inviteStudents(team: TeamTeacherFieldsFragment) {
    return doInviteStudents({ variables: { team: team.id, emails } });
  }

  if (teamQuery.loading) {
    return (
      <LoggedInPage heading="Klasseseite">Klasse wird geladen…</LoggedInPage>
    );
  }

  const team = teamQuery.data?.team;
  if (!team) {
    return (
      <LoggedInPage heading="Klassenseite">
        Team konnte nicht gefunden werden
      </LoggedInPage>
    );
  }

  return (
    <LoggedInPage heading="Detailansicht Schulklasse">
      <Heading as="h3">
        Folgende Abstimmungen sind für die Klasse verfügbar
      </Heading>
      <SelectBallots team={team} />

      <Heading as="h2">
        {team.name} / {team.school.name}, {team.school.city}
      </Heading>
      <Users users={team.members} />

      <Text fontWeight="bold" fontSize={[2, 2, 3]} mt={5}>
        An alle diese Email-Adressen eine Einladung schicken:
      </Text>
      <Text fontSize={[1, 1, 2]} mb={3}>
        Sie können die mehrere Adressen auf einmal aus ihrem Mailprogramm
        kopieren
      </Text>
      <Textarea
        value={importEmails}
        bg="white"
        sx={{ border: "white" }}
        onChange={checkEmails}
        fontSize={1}
        height="auto"
        rows={3}
        placeholder="name1@schule.ch, name2@schule; name3.schule.ch; ..."
      />
      <Button
        my={3}
        onClick={() => inviteStudents(team)}
        disabled={!matches || inviteQuery.loading}
        width="100%"
        bg={!matches || inviteQuery.loading ? "muted" : "secondary"}
      >
        {inviteQuery.loading
          ? "Bitte warten..."
          : `${matches ? matches : ""} Einladungen verschicken`}
      </Button>
      {matches && (
        <>
          <Text fontSize={1}>
            {matches} Email{matches == 1 ? "" : "s"} werden verschickt an:{" "}
            {emails.map((email) => (
              <li key={email}>{email}</li>
            ))}
          </Text>
        </>
      )}
      <Text fontSize={2} sx={{ gridColumn: [0, 0, 2] }} mt={4}>
        <IconHint
          height="24px"
          style={{ float: "left", marginRight: 8, verticalAlign: "center" }}
        />
        Alternativ können Sie Schüler*innen auch mit einem{" "}
        <A onClick={() => setShowInviteLink(true)} variant="underline">
          Einladungslink
        </A>{" "}
        einladen
      </Text>
      {showInviteLink && <InviteLink team={team} />}
    </LoggedInPage>
  );
}

function InviteLink({ team }: { team: TeamTeacherFieldsFragment }) {
  const inviteRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  if (!team.invite) {
    return null;
  }

  function copyInvite(ref: RefObject<HTMLInputElement>) {
    if (ref && ref.current) {
      ref.current.select();
      document.execCommand("copy");
      setStatus("Einladungslink erfolgreich in Zwischenablage kopiert");
    }
  }

  return (
    <Grid my={1} gap={2} columns={[0, 0, "1fr 3fr 1fr"]}>
      <Label sx={{ alignSelf: "center" }}>Einladungslink:</Label>
      <Input
        ref={inviteRef}
        readOnly
        value={`${document?.location.origin}/i/${team.invite}`}
      />
      <Button onClick={() => copyInvite(inviteRef)}>Kopieren</Button>
      <Text fontSize={1} sx={{ gridColumn: [0, 0, 2] }}>
        {status}
      </Text>
    </Grid>
  );
}

export function TeacherTeamNavigation({
  team,
}: {
  team: TeamTeacherFieldsFragment;
}): React.ReactElement {
  return (
    <Navigation>
      <Route
        href="/teacher/team/[id]/admin"
        as={`/teacher/team/${team?.id}/admin`}
        label="Administration"
      />
      <Route
        href="/teacher/team/[id]/test"
        as={`/teacher/team/${team?.id}/test`}
        label="Demokratie testen"
      />
      <Route
        href="/teacher/team/[id]/learn"
        as={`/teacher/team/${team?.id}/learn`}
        label="Demokratie lernen"
        disabled
      />
      <Route
        href="/teacher/team/[id]/experience"
        as={`/teacher/team/${team?.id}/experience`}
        label="Demokratie leben"
        disabled
      />
    </Navigation>
  );
}
