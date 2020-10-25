import { Page, ErrorPage, LoadingPage } from "components/Page";
import { Text, Box, Flex, Button, Link as A } from "rebass";
import { Ballot } from "components/Ballots";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import {
  useGetBallotRunsQuery,
  useTeamByCodeQuery,
  useVoteCodeMutation,
  BallotRunFieldsFragment,
} from "graphql/types";
import { BigButton, BigGray } from "components/BigButton";
import { ErrorBox } from "components/Form";
import { getBrowserCookie } from "util/cookies";
import { isBrowser } from "util/isBrowser";

export default function PanelBallots(): ReactElement {
  const router = useRouter();
  const code = String(router.query.code);
  const teamQuery = useTeamByCodeQuery({ variables: { code } });
  const team = teamQuery.data?.team;
  let cookie = getBrowserCookie("voty") as Record<string, any>;
  if (!cookie || typeof cookie == "string") {
    cookie = {};
  }

  const ballotRunsQuery = useGetBallotRunsQuery({
    variables: { teamId: String(team?.id) },
    skip: !team,
  });
  const ballotRuns = ballotRunsQuery.data?.getBallotRuns;
  const refetch = ballotRunsQuery.refetch;

  if (!code || teamQuery.loading) {
    return <LoadingPage />;
  }

  if (!team) {
    return (
      <ErrorPage>
        Der Abstimmungs-Code wurde leider nicht gefunden. Vertippt?
      </ErrorPage>
    );
  }

  return (
    <Page heading="Jetzt abstimmen">
      {ballotRuns?.length
        ? ballotRuns.map((ballotRun) => (
            <>
              <Ballot key={ballotRun.id} ballot={ballotRun.ballot} />

              <VoteCode
                ballotRun={ballotRun}
                refetch={refetch}
                code={code}
                voted={cookie[ballotRun.id] ? true : false}
              />
            </>
          ))
        : "Keine Abstimmungen gefunden."}
    </Page>
  );
}

const VoteCode: React.FC<{
  ballotRun: BallotRunFieldsFragment;
  code: string;
  voted: boolean;
  refetch: () => void;
}> = ({ ballotRun, code, voted, refetch }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  if (!isBrowser()) return null;

  const [doVoteCode] = useVoteCodeMutation({
    onCompleted() {
      setSuccess(true);
    },
    onError(err) {
      // TODO: Replace with translation solution once ready
      const messages: Record<string, string> = {
        ERR_BALLOT_NOT_STARTED: "Diese Abstimmung ist noch nicht gestartet",
        ERR_BALLOT_ENDED: "Diese Abstimmung ist bereits beendet",
        ERR_BALLOTCODE_WRONG: "Ungültiger Abstimmungscode",
        ERR_ALREADY_VOTED: "Du hast bereits über diese Vorlage abgestimmt",
        ERR_VOTECODE_FAILED: "Datenbank-Fehler",
      };
      setError(messages[err.message] || err.message);
    },
  });

  const now = new Date();
  const start = ballotRun.start ? new Date(ballotRun.start) : undefined;
  const end = ballotRun.end ? new Date(ballotRun.end) : undefined;
  if (success || voted)
    return <BigGray>Du hast erfolgreich abgestimmt ✅</BigGray>;

  if (!start || start > now)
    return (
      <BigGray>
        Abstimmung noch nicht gestartet{" "}
        <Button variant="secondary" onClick={() => refetch()} fontSize={2}>
          Seite Aktualisieren
        </Button>
      </BigGray>
    );

  if (end && end < now) return <BigGray>Abstimmung bereits beendet</BigGray>;

  async function voteCode(ballotRunId: string, code: string, vote: number) {
    await doVoteCode({ variables: { ballotRunId, code, vote } });
  }

  return (
    <Box my={4}>
      <Flex>
        <BigButton
          color="green"
          onClick={() => voteCode(ballotRun.id, code, 1)}
        >
          Ja, ich stimme zu
        </BigButton>
        <BigButton
          color="primary"
          onClick={() => voteCode(ballotRun.id, code, 2)}
        >
          Nein, ich lehne ab
        </BigButton>
      </Flex>
      <Text my={2} textAlign="center">
        Ich möchte mich{" "}
        <A onClick={() => voteCode(ballotRun.id, code, 0)}>
          der Stimme enthalten
        </A>
      </Text>
      <ErrorBox my={2} error={error} />
    </Box>
  );
};