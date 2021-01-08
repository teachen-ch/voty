import { LoggedInPage } from "components/Page";
import { Heading, Image, Box, Text, Button } from "rebass";
import { Users } from "components/Users";
import { Input, Textarea } from "@rebass/forms";
import { Grid, Label } from "theme-ui";
import { useRef, useState, RefObject } from "react";
import { useRouter } from "next/router";
import { uniq } from "lodash";
import { SelectBallots } from "components/Ballots";
import { gql } from "@apollo/client";
import IconHint from "../../../public/images/icon_hint.svg";
import { fragments } from "components/Teams";
import { ErrorBox } from "components/Form";
import { trackEvent, usePageEvent } from "util/stats";
import { HideFeature } from "components/HideFeature";
import {
  useTeamTeacherQuery,
  TeamTeacherFieldsFragment,
  useInviteStudentsMutation,
  Role,
} from "graphql/types";
import { Nullable } from "simplytyped";
import { Breadcrumb, A } from "components/Breadcrumb";
import { Spinner } from "theme-ui";
import PanelPage from "./panel";
import { CardList } from "components/Cards";
import { Activities } from "components/Activities";
// import { usePolling } from "util/hooks";

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
  usePageEvent({ category: "Teacher", action: "Admin" });
  const router = useRouter();
  const id = String(router.query.team);
  const teamQuery = useTeamTeacherQuery({
    variables: { where: { id } },
    skip: !id,
  });
  // usePolling(teamQuery);
  const [emails, setEmails] = useState<string[]>([]);
  const [matches, setMatches] = useState<number | undefined>();
  const [results, setResults] = useState<
    Nullable<{
      created?: Nullable<Nullable<string>[]>;
      failed?: Nullable<Nullable<string>[]>;
      duplicated?: Nullable<Nullable<string>[]>;
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
    const emails = uniq(str.match(re) || []);
    setEmails(emails);
    setMatches(emails.length ? emails.length : undefined);
  }

  async function inviteStudents(team: TeamTeacherFieldsFragment) {
    trackEvent({
      category: "Teacher",
      action: "Invited",
      value: String(emails.length),
    });
    return doInviteStudents({ variables: { team: team.id, emails } });
  }

  if (teamQuery.loading) {
    return (
      <LoggedInPage heading="Detailansicht Klasse" role={Role.Teacher}>
        Klasse wird geladen…
      </LoggedInPage>
    );
  }

  const team = teamQuery.data?.team;
  if (!team) {
    return (
      <LoggedInPage heading="Detailansicht Klasse" role={Role.Teacher}>
        <Text mb={3}>Klasse wurde nicht gefunden.</Text>
        <Button onClick={() => router.push("/teacher/")}>Meine Klassen</Button>
      </LoggedInPage>
    );
  }

  const duplicated = results?.duplicated?.length;
  const duplicatedEmails = results?.duplicated?.join(", ");
  const failed = results?.failed?.length;
  const failedEmails = results?.failed?.join(", ");

  if (team.name.toLowerCase().indexOf("discuss") >= 0) {
    return <PanelPage />;
  }

  return (
    <LoggedInPage heading="Detailansicht Klasse" role={Role.Teacher}>
      <Breadcrumb>
        <A href="/">Start</A>
        <A href="/teacher/">Meine Klassen</A>
        <b>{team.name}</b>
      </Breadcrumb>
      <Text textAlign="left">
        <HideFeature id="cards">
          <Heading as="h3">Lerninhalte Klasse {team.name}</Heading>
          <Text mb={3}>
            Hier siehst du die Lerninhalte, welche bereits ausgewählt sind und
            deinen Schüler*innen auf der Klassenseite angezeigt werden.
          </Text>
          <CardList teamCards={team.cards} teamId={team.id} />
          <Button
            mt={3}
            onClick={() => router.push(`/team/${team.id}/select`)}
            width="100%"
          >
            Lerninhalte hinzufügen
          </Button>
        </HideFeature>
        <Heading as="h3" mt={6}>
          Abstimmungen Klasse {team.name}
        </Heading>
        <Text fontSize={2} mb={3}>
          Wähle hier aus der Liste die Abstimmungen aus, welche Deinen
          Schüler*innen auf der Klassenseite angezeigt werden sollen. Nach der
          Abstimmung kannst Du hier auch die Abstimmungsresultate Deiner Klasse
          zeigen.
        </Text>
        <SelectBallots team={team} />

        <HideFeature id="activities">
          <Heading as="h3" mt={6}>
            Aktivitäten Klasse {team.name}
          </Heading>
          <Text mb={3} fontSize={2}>
            Hier siehst du alle Aktivitäten, Uploads und Diskussionen der Klasse
            {team.name}.
          </Text>
          <Activities teamId={team.id} />
        </HideFeature>

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

        <Text mt={4} fontSize={2} fontWeight="semi">
          {team.members.length ? "Weitere" : ""} Schüler*innen einladen:
        </Text>
        <Textarea
          mt={3}
          value={importEmails}
          bg="#B1BDC3"
          sx={{ border: "white", "::placeholder": { color: "white" } }}
          onChange={checkEmails}
          fontSize={1}
          height="auto"
          rows={2}
          placeholder="name1@schule.ch, name2@schule; name3.schule.ch; ..."
        />
        <Button
          my={2}
          onClick={() => inviteStudents(team)}
          disabled={!matches || inviteQuery.loading}
          width="100%"
          bg="secondary"
        >
          {inviteQuery.loading ? (
            <Text>
              <Spinner color="gray" size={20} mr={3} />
              Bitte warten...
            </Text>
          ) : (
            `${matches ? matches : ""} Einladungen verschicken`
          )}
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
          Alternativ kannst Du auch mit einem{" "}
          <A
            onClick={() => setShowInviteLink(!showInviteLink)}
            variant="underline"
          >
            Einladungslink oder QR-Code
          </A>{" "}
          einladen
        </Text>
        {showInviteLink && <InviteLink team={team} />}
      </Text>
    </LoggedInPage>
  );
}

function InviteLink({ team }: { team: TeamTeacherFieldsFragment }) {
  usePageEvent({ category: "Teacher", action: "InviteLink" });
  const inviteRef = useRef<HTMLInputElement>(null);
  const url = `${document?.location.origin}/i/${team.invite}`;
  const [status, setStatus] = useState("");
  if (!team.invite) {
    return null;
  }

  function copyInvite(ref: RefObject<HTMLInputElement>) {
    if (ref && ref.current) {
      ref.current.select();
      document.execCommand("copy");
      setStatus("Erfolgreich in die Zwischenablage kopiert");
    }
  }

  function qrCode(url: string) {
    const qrUrl = `/i/qr?url=${url}`;
    window.open(
      qrUrl,
      "qr",
      "width=400,height=400,toolbar=no,scrollbars=no, location=no, status=no"
    );
  }

  return (
    <Grid my={2} gap={3} columns={[0, 0, "1fr 3fr 2fr"]}>
      <Label sx={{ alignSelf: "center", fontSize: 1 }}>Einladungslink:</Label>
      <Input ref={inviteRef} readOnly fontSize={1} value={url} />
      <Button fontSize={1} onClick={() => qrCode(url)}>
        <Box variant="centered">
          <Image src="/images/icon_qr.svg" mr={2} height="25px" />
          QR-Code
        </Box>
      </Button>
      <Text fontSize={1} sx={{ gridColumn: [0, 0, 2] }} mt="-10px">
        {status ? (
          status
        ) : (
          <a onClick={() => copyInvite(inviteRef)}>
            In die <u>Zwischenablage</u> kopieren
          </a>
        )}
      </Text>
    </Grid>
  );
}
