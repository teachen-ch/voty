import { H2, LoggedInPage, ShowFor } from "components/Page";
import { Box, Text, Button } from "rebass";
import { Users } from "components/Users";
import { Input, Textarea } from "@rebass/forms";
import { Grid, Label } from "theme-ui";
import { useRef, useState, RefObject } from "react";
import { useRouter } from "next/router";
import { uniq } from "lodash";
import { SelectBallots } from "components/Ballots";
import { gql } from "@apollo/client";
import Image from "next/image";
import IconHint from "../../../public/images/icon_hint.svg";
import IconProgress from "../../../public/images/icon_progress.svg";
import { DeleteTeamLink, fragments } from "components/Teams";
import { EditTeamPrefs } from "components/Prefs";
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
import { Breadcrumb, A, Here } from "components/Breadcrumb";
import { Spinner } from "theme-ui";
import PanelPage from "./panel";
import { TeacherCardList } from "components/Cards";
import { Activities } from "components/Activities";
import IconQR from "../../../public/images/icon_qr_white.svg";
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
  const [showInvite, setShowInvite] = useState(false);
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
    const confirmed = confirm(`Jetzt ${matches} Email(s) verschicken?`);
    if (!confirmed) return;
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
        <A href="/teacher/">Meine Klassen</A>
        <Here>{team.name}</Here>
      </Breadcrumb>
      <HideFeature id="cards">
        <H2>Lerninhalte Klasse {team.name}</H2>
        <Text mb={4} fontSize={2}>
          Hier siehst du die Lerninhalte, welche bereits ausgewählt sind und
          deinen Schüler*innen auf der Klassenseite angezeigt werden.
        </Text>
        <TeacherCardList teamCards={team.cards} teamId={team.id} />
        <Button
          mt={3}
          onClick={() => router.push(`/team/${team.id}/select`)}
          width="100%"
        >
          Lerninhalte hinzufügen
        </Button>
        {team.cards && (
          <>
            <Box sx={{ position: "absolute" }}>
              <A href={`/team/${team.id}/progress`} fontSize={1}>
                <Box display="inline-block" mr={2}>
                  <Image src={IconProgress} />
                </Box>
                Fortschritt der Klasse
              </A>
            </Box>
            <Box fontSize={1} textAlign="right" mt={"5px"}>
              <EditTeamPrefs team={team} />
            </Box>
          </>
        )}
        <Box mt={6} />
      </HideFeature>
      <H2>Abstimmungen Klasse {team.name}</H2>
      <Text fontSize={2} mb={4}>
        Wähle aus der Liste die Abstimmungen aus, welche Deinen Schüler*innen
        auf der Klassenseite angezeigt werden sollen. Nach der Abstimmung kannst
        Du hier auch die Abstimmungsresultate Deiner Klasse zeigen.
      </Text>
      <SelectBallots team={team} />

      <HideFeature id="activities">
        <H2 mt={6}>Aktivitäten Klasse {team.name}</H2>
        <Text mb={4} fontSize={2}>
          Hier siehst du alle Aktivitäten, Uploads und Diskussionen der Klasse{" "}
          {team.name}.
        </Text>
        <Activities teamId={team.id} />
      </HideFeature>

      <H2 mt={6}>Schülerinnen und Schüler</H2>
      {!team.members.length ? (
        <Text fontSize={2}>
          Hier kannst Du Deine Schüler*innen auf die Klassenseite von voty.ch
          einladen. Kopiere einfach alle Email-Adressen auf einmal (aus Mail
          oder Excel) in untenstehende Feld. Hast Du eine zweite Email-Adresse?
          Dann teste den einfachen Ablauf doch kurz selbst:
        </Text>
      ) : (
        <>
          <Text fontSize={2} mb={4}>
            Diese Einladungen wurden bereits verschickt. Hier siehst Du auch,
            wer die Einladung bereits akzeptiert hat.
          </Text>
          <Users users={team.members} />
        </>
      )}

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

      {!team.members.length || showInvite ? (
        <>
          <Text mt={4} fontSize={2} fontWeight="semi">
            {team.members.length ? "Weitere" : ""} Schüler*innen einladen:
          </Text>
          <Textarea
            mt={3}
            value={importEmails}
            sx={{ border: "white" }}
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
            bg="primary"
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
          <Text fontSize={[1, 1, 2]} sx={{ gridColumn: [0, 0, 2] }} mt={4}>
            <Box display="inline-block" mr={2}>
              <Image src={IconHint} alt="Hinweis" height="24px" />
            </Box>
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
        </>
      ) : (
        <Button onClick={() => setShowInvite(true)} width="100%" mt={3}>
          Weitere Schüler*innen einladen
        </Button>
      )}

      <ShowFor role="admin">
        <DeleteTeamLink teamId={team.id} textAlign="right" fontSize={1} />
      </ShowFor>
    </LoggedInPage>
  );
}

const InviteLink: React.FC<{ team: TeamTeacherFieldsFragment }> = ({
  team,
}) => {
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
    <Grid my={2} gap={3} columns={[0, 0, "2fr 3fr 2fr"]}>
      <Label sx={{ alignSelf: "center", fontSize: 1 }}>Einladungslink:</Label>
      <Input ref={inviteRef} readOnly fontSize={1} value={url} />
      <Button fontSize={1} onClick={() => qrCode(url)}>
        <Box variant="centered">
          <Box display="inline-block" mr={2}>
            <Image src={IconQR} height="25px" width="25px" />
          </Box>
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
};
