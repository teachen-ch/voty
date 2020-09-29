import { LoggedInPage } from "../../../../components/Page";
import { Heading, Card, Text, Button, Link } from "rebass";
import { useTeamTeacher } from "../../../../components/Teams";
import { Users } from "../../../../components/Users";
import { Input, Textarea } from "@rebass/forms";
import { Grid, Label } from "theme-ui";
import { useRef, useState, RefObject } from "react";
import { useUser } from "state/user";
import { Team } from "graphql/types";
import { Navigation, Route } from "components/Navigation";
import { useRouter } from "next/router";
import _ from "lodash";
import { gql, useMutation } from "@apollo/client";
import { fragments } from "components/Teams";

const INVITE_STUDENTS = gql`
  mutation inviteStudents($team: Int!, $emails: [String!]!) {
    inviteStudents(team: $team, emails: $emails) {
      ...TeamUserFields
    }
  }
  ${fragments.TeamUserFields}
`;

export default function TeamPage() {
  const user = useUser();
  const router = useRouter();
  const id = parseInt(String(router.query.id));
  const team = useTeamTeacher(id, user);
  const [emails, setEmails] = useState<string[]>([]);
  const [matches, setMatches] = useState<number | undefined>();
  const [showInviteLink, setShowInviteLink] = useState(false);

  const [doInviteStudents] = useMutation(INVITE_STUDENTS, {
    onCompleted({ team }) {
      console.log(team);
      setEmails([]);
      setMatches(undefined);
      setShowInviteLink(false);
    },
  });

  function checkEmails(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    const str = evt.target.value.toLowerCase();
    const re = /[^@\s<>,;]+@[^@\s]+\.[^@\s<>,;]+/g;
    const emails = _.uniq(str.match(re) || []);
    setEmails(emails);
    setMatches(emails.length ? emails.length : undefined);
  }

  async function inviteStudents() {
    doInviteStudents({ variables: { team: team.id, emails } });
  }

  if (!team) {
    return (
      <LoggedInPage heading="Klassenseite">
        Team konnte nicht gefunden werden
      </LoggedInPage>
    );
  }

  return (
    <LoggedInPage heading="Klassenseite">
      <TeacherTeamNavigation team={team} />
      <Heading as="h2">Schüler|innen</Heading>
      <Users where={{ team: { id: { equals: team.id } } }} />

      <Card>
        <Heading mt={0}>Schülerinnen und Schüler einladen</Heading>
        <Grid my={1} gap={2} columns={[0, 0, "1fr 4fr"]}>
          <span />
          <small>Neue Schüler|innen per Email einladen:</small>
          <Label sx={{ alignSelf: "top", fontWeight: "bold" }}>
            Email-Adressen:
          </Label>
          <Textarea
            bg="white"
            sx={{ border: "white" }}
            onChange={checkEmails}
            fontSize={1}
          />
          <span />
          <Button
            onClick={inviteStudents}
            disabled={!matches}
            bg={matches ? "primary" : "muted"}
          >
            {matches} Einladungen verschicken
          </Button>
          {matches && (
            <>
              <span />
              <small>
                {matches} Email{matches == 1 ? "" : "s"} werden verschickt an:{" "}
                {emails.map((email) => (
                  <li key={email}>{email}</li>
                ))}
              </small>
            </>
          )}
          <span />
          <small>
            <br />
            <br />
            Alternativ können Sie Schüler|innen auch mit einem{" "}
            <Link>
              <button onClick={() => setShowInviteLink(true)}>
                Einladungslink
              </button>
            </Link>{" "}
            einladen
          </small>
        </Grid>
        {showInviteLink && <InviteLink team={team} />}
      </Card>
    </LoggedInPage>
  );
}

function InviteLink({ team }: { team: Team }) {
  const inviteRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");

  function copyInvite(ref: RefObject<any>) {
    if (ref && ref.current) {
      ref.current.select();
      document.execCommand("copy");
      setStatus("Einladungslink erfolgreich in Zwischenablage kopiert");
    }
  }

  return (
    <Grid my={1} gap={2} columns={[0, 0, "1fr 3fr 1fr"]}>
      <Label sx={{ alignSelf: "center", fontWeight: "bold" }}>
        Einladungslink:
      </Label>
      <Input
        ref={inviteRef}
        readOnly
        value={`${document?.location.origin}/i/${team.invite}`}
      />
      <Button onClick={() => copyInvite(inviteRef)}>Copy</Button>
      <span />
      <Text fontSize={1}>{status}</Text>
    </Grid>
  );
}

export function TeacherTeamNavigation({ team }: { team: Team }) {
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
