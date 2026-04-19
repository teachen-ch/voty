import React, { ReactElement, useEffect } from "react";
import { ErrorPage, LoadingPage, Container, Loading } from "components/Page";
import { Heading, Box, Flex, Text, Button, Image } from "components/ui";
import { Ballot, getBallotStatus, BallotStatus } from "components/Ballots";
import { useRouter } from "next/router";
import { BallotResults } from "components/BallotResults";
import { A } from "components/A";
import {
  useGetBallotRunsQuery,
  useTeamByCodeQuery,
  BallotRunFieldsFragment,
  useStartBallotRunMutation,
  useEndBallotRunMutation,
  useGetBallotResultsQuery,
  useBallotQuery,
} from "graphql/types";
import { useUser } from "state/user";
import { Banner } from "components/Banner";
import { useTr } from "util/translate";

const POLLING_DELAY = Number(process.env.POLLING_DELAY) || 5000;

export default function PanelBallotsPresent(): ReactElement {
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

  if (!team || !user) {
    return (
      <ErrorPage>
        Du bist nicht angemeldet oder der Abstimmungs-Code wurde nicht gefunden
      </ErrorPage>
    );
  }

  function showQR() {
    const url = `${document?.location.origin}/panel/${code}`;
    const qrUrl = `/i/qr?url=${url}`;
    window.open(
      qrUrl,
      "qr",
      "width=400,height=400,toolbar=no,scrollbars=no, location=no, status=no"
    );
  }

  return (
    <PanelPage heading={`${team.name}`} teamId={team.id}>
      {ballotRuns?.length ? (
        ballotRuns.map(
          (ballotRun) =>
            ballotRun && (
              <BallotRunListing key={ballotRun.id} ballotRun={ballotRun} />
            )
        )
      ) : (
        <>
          <Text className="mb-8">
            Es wurden noch keine Abstimmungen wurden ausgewählt
          </Text>
          <A href={`/team/${team.id}`}>
            <Button>Abstimmungen auswählen</Button>
          </A>
        </>
      )}
      <Banner onClick={showQR}>
        <Box className="ml-[50px] mr-[20px] text-xl">
          <span className="font-normal">voty.ch/code</span>
          <span>{code.replace(/(\d\d)(\d\d\d)(\d\d\d)/, "$1 $2 $3")}</span>
        </Box>
      </Banner>
    </PanelPage>
  );
}

const BallotRunListing: React.FC<
  React.PropsWithChildren<{ ballotRun: BallotRunFieldsFragment }>
> = ({ ballotRun }) => {
  const tr = useTr();
  const ballotRunId = ballotRun.id;
  const ballotId = ballotRun.ballotId;
  const ballotQuery = useBallotQuery({
    variables: { where: { id: ballotId } },
  });
  const ballot = ballotQuery.data?.ballot;
  const [doStartRun] = useStartBallotRunMutation({
    variables: { ballotRunId },
  });
  const [doEndRun] = useEndBallotRunMutation({ variables: { ballotRunId } });

  if (!ballot) return <Loading />;

  let buttonText = tr("Abstimmung ist noch nicht gestartet");
  let buttonColor = "gray";
  let buttonAction;
  const status = getBallotStatus(ballot);
  if (status === BallotStatus.Started) {
    if (ballotRun.start) {
      buttonText = ballotRun.end ? tr("Beendet") : tr("Beenden");
      buttonColor = ballotRun.end ? "gray" : "#d90000";
    } else {
      buttonText = tr("Starten");
      buttonColor = "green";
    }
    buttonAction = startStopBallot;
  }
  if (status === BallotStatus.Ended) {
    buttonText = tr("Abstimmung bereits beendet");
  }

  async function startStopBallot() {
    if (!ballotRun.start) await doStartRun();
    else if (ballotRun.start && !ballotRun.end) await doEndRun();
  }
  return (
    <Box key={ballotRun.id} className="mb-16">
      <Ballot
        ballot={ballot}
        buttonText={buttonText}
        buttonColor={buttonColor}
        onButton={buttonAction}
      >
        {ballotRun.start && <BallotRunDetail ballotRun={ballotRun} />}
      </Ballot>
    </Box>
  );
};

const BallotRunDetail: React.FC<
  React.PropsWithChildren<{ ballotRun: BallotRunFieldsFragment }>
> = ({ ballotRun }) => {
  return (
    <Box id="results" className="mb-4">
      <Heading as="h2" className="mt-0 mb-8">
        {ballotRun.end ? "Endresultat:" : "Live-Resultat:"}
      </Heading>
      <Results ballotId={ballotRun.ballotId} ballotRunId={ballotRun.id} />
    </Box>
  );
};

const Results: React.FC<
  React.PropsWithChildren<{ ballotId: string; ballotRunId: string }>
> = ({ ballotId, ballotRunId }) => {
  const resultsQuery = useGetBallotResultsQuery({
    variables: { ballotId, ballotRunId },
  });

  const results = resultsQuery.data?.getBallotResults;

  useEffect(() => {
    resultsQuery.startPolling(POLLING_DELAY);
    return () => {
      resultsQuery.stopPolling();
    };
  }, [resultsQuery]);
  return <BallotResults results={results} />;
};

export const PanelPage: React.FC<
  React.PropsWithChildren<{ heading: string; teamId?: string }>
> = (props) => {
  const votyLink = props.teamId ? `/team/${props.teamId}` : "/";
  return (
    <Container className="mt-8">
      <Flex
        className="justify-between items-center px-4 sm:px-0 mb-4"
        style={{ minWidth: "min(100%, 800px)" }}
      >
        <A href={votyLink}>
          <Image src="/images/voty_logo.svg" alt="voty" width={103} />
        </A>
        <A href="http://discussit.ch" rel="noreferrer">
          <Image
            src="/images/logo_discussit.png"
            alt="discussit.ch"
            height={60}
          />
        </A>
      </Flex>
      <Box
        as="main"
        className="px-4 sm:px-8 py-8 bg-panel min-h-[450px] text-center sm:text-left rounded-none sm:rounded-card"
        style={{ minWidth: "min(100%, 800px)" }}
      >
        <Heading className="mt-0 text-2xl sm:text-[34px] md:text-[50px] font-normal border-b-2 border-black">
          <Flex className="justify-between">{props.heading}</Flex>
        </Heading>
        <Box>{props.children}</Box>
      </Box>
    </Container>
  );
};
