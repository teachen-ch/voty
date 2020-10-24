import { ReactElement, useEffect } from "react";
import { LoggedInPage, ErrorPage, LoadingPage } from "components/Page";
import { Heading, Box } from "rebass";
import { Ballot, getBallotStatus, BallotStatus } from "components/Ballots";
import { useRouter } from "next/router";
import { BallotResults } from "components/BallotResults";
import {
  useGetBallotRunsQuery,
  useTeamByCodeQuery,
  Role,
  BallotRunFieldsFragment,
  useStartBallotRunMutation,
  useEndBallotRunMutation,
  useGetBallotResultsQuery,
} from "graphql/types";
import { useUser } from "state/user";

const POLLING_DELAY = Number(process.env.POLLING_DELAY) || 5000;

export default function PanelBallots(): ReactElement {
  const router = useRouter();
  const user = useUser();
  const code = String(router.query.code);
  const teamQuery = useTeamByCodeQuery({ variables: { code } });
  const team = teamQuery.data?.team;

  const ballotRunsQuery = useGetBallotRunsQuery({
    variables: { teamId: String(team?.id) },
    skip: !team,
  });
  const ballotRuns = ballotRunsQuery.data?.getBallotRuns;

  if (!code || teamQuery.loading) {
    return <LoadingPage />;
  }

  if (!team && user) {
    return (
      <ErrorPage>
        Der Abstimmungs-Code wurde leider nicht gefunden. Vertippt?
      </ErrorPage>
    );
  }

  return (
    <LoggedInPage role={Role.Teacher} heading="Jetzt abstimmen">
      {ballotRuns?.length
        ? ballotRuns.map((ballotRun) => (
            <BallotRunListing key={ballotRun.id} ballotRun={ballotRun} />
          ))
        : "Keine Abstimmungen wurden ausgewählt."}
    </LoggedInPage>
  );
}

const BallotRunListing: React.FC<{ ballotRun: BallotRunFieldsFragment }> = ({
  ballotRun,
}) => {
  const ballotRunId = ballotRun.id;
  const ballot = ballotRun.ballot;
  const [doStartRun] = useStartBallotRunMutation({
    variables: { ballotRunId },
  });
  const [doEndRun] = useEndBallotRunMutation({ variables: { ballotRunId } });

  let buttonText = "Abstimmung ist noch nicht gestartet";
  let buttonColor = "gray";
  let buttonAction;
  const status = getBallotStatus(ballot);
  if (status === BallotStatus.Started) {
    if (ballotRun.start) {
      buttonText = ballotRun.end ? "Beendet" : "Beenden";
      buttonColor = ballotRun.end ? "gray" : "#d90000";
    } else {
      buttonText = "Starten";
      buttonColor = "green";
    }
    buttonAction = startStopBallot;
  }
  if (status === BallotStatus.Ended) {
    buttonText = "Abstimmung ist bereits beendet";
  }

  async function startStopBallot() {
    if (!ballotRun.start) await doStartRun();
    else if (ballotRun.start && !ballotRun.end) await doEndRun();
  }
  return (
    <Box key={ballotRun.id} mb={5}>
      <Ballot
        ballot={ballotRun.ballot}
        buttonText={buttonText}
        buttonColor={buttonColor}
        onButton={buttonAction}
      >
        {ballotRun.start && <BallotRunDetail ballotRun={ballotRun} />}
      </Ballot>
    </Box>
  );
};

const BallotRunDetail: React.FC<{ ballotRun: BallotRunFieldsFragment }> = ({
  ballotRun,
}) => {
  return (
    <>
      <Heading as="h2" mt={0} mb={4}>
        {ballotRun.end ? "Endresultat:" : "Live-Resultat:"}
      </Heading>
      <Results ballotId={ballotRun.ballot.id} ballotRunId={ballotRun.id} />
    </>
  );
};

const Results: React.FC<{ ballotId: string; ballotRunId: string }> = ({
  ballotId,
  ballotRunId,
}) => {
  const resultsQuery = useGetBallotResultsQuery({
    variables: { ballotId, ballotRunId },
    // had some issues with pollInterval when using next dev
    // pollInterval: 5000,
  });

  const results = resultsQuery.data?.getBallotResults;

  useEffect(() => {
    resultsQuery.startPolling(POLLING_DELAY);
    return () => {
      resultsQuery.stopPolling();
    };
  }, []);
  return <BallotResults results={results} />;
};
