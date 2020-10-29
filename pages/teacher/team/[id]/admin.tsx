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
import { ErrorBox } from "components/Form";
import {
  useTeamTeacherQuery,
  TeamTeacherFieldsFragment,
  useInviteStudentsMutation,
} from "graphql/types";
import { Nullable } from "simplytyped";

export const INVITE_STUDENTS = gql`
  mutation inviteStudents($team: String!, $emails: [String!]!) {
    inviteStudents(team: $team, emails: $emails) {
      created
      failed
      duplicated
      team {
        ...TeamTeacherFields
      }
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
  const [results, setResults] = useState<
    Nullable<{
      created?: Nullable<string[]>;
      failed?: Nullable<string[]>;
      duplicated?: Nullable<string[]>;
    }>
  >();
  const [showInviteLink, setShowInviteLink] = useState(false);
  const [importEmails, setImportEmails] = useState("");
  const [doInviteStudents, inviteQuery] = useInviteStudentsMutation({
    onCompleted({ inviteStudents }) {
      setEmails([]);
      setMatches(undefined);
      setShowInviteLink(false);
      setImportEmails("");
      setResults(inviteStudents);
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
      <LoggedInPage heading="Detailansicht Klasse">
        Klasse wird geladen…
      </LoggedInPage>
    );
  }

  const team = teamQuery.data?.team;
  if (!team) {
    return (
      <LoggedInPage heading="Detailansicht Klasse">
        Team konnte nicht gefunden werden
      </LoggedInPage>
    );
  }

  const duplicated = results?.duplicated?.length;
  const duplicatedEmails = results?.duplicated?.join(", ");
  const failed = results?.failed?.length;
  const failedEmails = results?.failed?.join(", ");

  return (
    <LoggedInPage heading="Detailansicht Klasse">
      <Text textAlign="left">
        <Heading as="h3">
          Folgende Abstimmungen sind für die Klasse verfügbar
        </Heading>
        <Text fontSize={2} mb={3}>
          Wähle hier aus der Liste die Abstimmungen aus, welche Deinen
          Schüler*innen gezeigt werden. Hier kannst Du später auch die
          Abstimmungsresultate Deiner Klasse zeigen.
        </Text>
        <SelectBallots team={team} />

        <Heading as="h2" mt="80px">
          Schülerinnen und Schüler
        </Heading>
        {!team.members.length ? (
          <Text fontSize={2}>
            Hier kannst Du Deine Schüler*innen auf die Klassenseite von voty.ch
            einladen. Kopiere einfach alle Email-Adressen auf einmal (aus Mail
            oder Excel) in untenstehende Feld. Hast Du eine zweite
            Email-Adresse? Dann teste den einfachen Ablauf doch kurz selbst:
          </Text>
        ) : (
          <>
            <Text fontSize={2} my={3}>
              Diese Einladungen wurden bereits verschickt. Hier siehst Du auch,
              wer die Einladung bereits akzeptiert hat.
            </Text>
            <Users users={team.members} />
          </>
        )}
        <Textarea
          mt={3}
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

        {duplicated ? (
          <ErrorBox
            error={`Folgende Accounts existieren bereits: ${duplicatedEmails}`}
          />
        ) : (
          ""
        )}
        {failed ? (
          <ErrorBox
            error={`Bei diesen Email-Adressen gab es einen Fehler: ${failedEmails}`}
          />
        ) : (
          ""
        )}
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
        <Text fontSize={[1, 1, 2]} sx={{ gridColumn: [0, 0, 2] }} mt={4}>
          <IconHint
            alt="Hinweis"
            height="24px"
            style={{ float: "left", marginRight: 8, verticalAlign: "center" }}
          />
          Alternativ kannst Du Schüler*innen auch mit einem{" "}
          <A
            onClick={() => setShowInviteLink(!showInviteLink)}
            variant="underline"
          >
            Einladungslink
          </A>{" "}
          einladen
        </Text>
        {showInviteLink && <InviteLink team={team} />}
      </Text>
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
      setStatus("Einladungslink erfolgreich in die Zwischenablage kopiert");
    }
  }

  return (
    <Grid my={1} gap={3} columns={[0, 0, "1fr 3fr 1fr"]}>
      <Label sx={{ alignSelf: "center", fontSize: 1 }}>Einladungslink:</Label>
      <Input
        ref={inviteRef}
        readOnly
        fontSize={1}
        value={`${document?.location.origin}/i/${team.invite}`}
      />
      <Button fontSize={1} onClick={() => copyInvite(inviteRef)}>
        Kopieren
      </Button>
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
