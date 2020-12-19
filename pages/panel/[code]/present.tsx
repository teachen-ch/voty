import React, { ReactElement, useEffect } from "react";
import { ErrorPage, LoadingPage, Container } from "components/Page";
import { Heading, Box, Flex, Text, Button, Image } from "rebass";
import { Ballot, getBallotStatus, BallotStatus } from "components/Ballots";
import { useRouter } from "next/router";
import { BallotResults } from "components/BallotResults";
import { A } from "components/Breadcrumb";
import {
  useGetBallotRunsQuery,
  useTeamByCodeQuery,
  BallotRunFieldsFragment,
  useStartBallotRunMutation,
  useEndBallotRunMutation,
  useGetBallotResultsQuery,
} from "graphql/types";
import { useUser } from "state/user";
import { Banner } from "components/Banner";

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
          <Text mb={4}>
            Es wurden noch keine Abstimmungen wurden ausgewählt
          </Text>
          <A href={`/team/${team.id}/admin`}>
            <Button>Abstimmungen auswählen</Button>
          </A>
        </>
      )}
      <Banner onClick={showQR}>
        <Box ml="50px" mr="20px" fontSize={4}>
          <Text fontWeight="normal">voty.ch/code</Text>
          <Text>{code.replace(/(\d\d)(\d\d\d)(\d\d\d)/, "$1 $2 $3")}</Text>
        </Box>
      </Banner>
    </PanelPage>
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
    buttonText = "Abstimmung bereits beendet";
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
    <Box id="results" mb={3}>
      <Heading as="h2" mt={0} mb={4}>
        {ballotRun.end ? "Endresultat:" : "Live-Resultat:"}
      </Heading>
      <Results ballotId={ballotRun.ballot.id} ballotRunId={ballotRun.id} />
    </Box>
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

export const PanelPage: React.FC<{ heading: string; teamId?: string }> = (
  props
) => {
  const votyLink = props.teamId ? `/team/${props.teamId}/admin` : "/";
  return (
    <Container mt={4}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        minWidth="min(100%, 800px)"
        px={[3, 3, 0]}
        mb={3}
      >
        <A href={votyLink}>
          <Image src="/images/voty_logo.svg" alt="voty" width="103px" />
        </A>
        <A href="http://discussit.ch" rel="noreferrer">
          <Image
            src="/images/logo_discussit.png"
            alt="discussit.ch"
            height="60px"
          />
        </A>
      </Flex>
      <Box
        as="main"
        px={[3, 3, 4]}
        py={4}
        sx={{
          minWidth: "min(100%, 800px)",
          borderRadius: [0, 0, 5],
          backgroundColor: ["silver_m", "silver_m", "silver"],
        }}
        maxWidth="800px"
        minHeight="450px"
        textAlign={["center", "center", "left"]}
      >
        <Heading
          mt={0}
          as="h1"
          fontSize={[5, 5, "34px", "50px"]}
          fontWeight="normal"
          sx={{ borderBottom: "2px solid black" }}
        >
          <Flex justifyContent="space-between">{props.heading}</Flex>
        </Heading>
        <Text>{props.children}</Text>
      </Box>
    </Container>
  );
};
