import { ReactElement, useEffect } from "react";
import { LoggedInPage, ErrorPage, LoadingPage } from "components/Page";
import { Heading, Text, Card, Box, Flex } from "rebass";
import { Ballot } from "components/Ballots";
import { useRouter } from "next/router";
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
import { Grid } from "theme-ui";
import { PieChart } from "react-minimal-pie-chart";
import { LabelRenderFunction } from "react-minimal-pie-chart/types/commonTypes";

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
  const [doStartRun] = useStartBallotRunMutation({
    variables: { ballotRunId },
  });
  const [doEndRun] = useEndBallotRunMutation({ variables: { ballotRunId } });

  async function startStopBallot() {
    if (!ballotRun.start) await doStartRun();
    else if (ballotRun.start && !ballotRun.end) await doEndRun();
  }
  return (
    <Box key={ballotRun.id} mb={5}>
      <Ballot
        ballot={ballotRun.ballot}
        buttonText={
          ballotRun.start ? (ballotRun.end ? "Beendet" : "Beenden") : "Starten"
        }
        buttonColor={
          ballotRun.start ? (ballotRun.end ? "gray" : "#d90000") : "green"
        }
        onButton={startStopBallot}
        onDetail={startStopBallot}
      />
      {ballotRun.start && <BallotRunDetail ballotRun={ballotRun} />}
    </Box>
  );
};

const BallotRunDetail: React.FC<{ ballotRun: BallotRunFieldsFragment }> = ({
  ballotRun,
}) => {
  return (
    <Card>
      <>
        <Heading as="h2" mt={0} mb={4}>
          {ballotRun.end ? "Endresultat:" : "Live-Resultat:"}{" "}
          {ballotRun.ballot.title}
        </Heading>
        <Results ballotId={ballotRun.ballot.id} ballotRunId={ballotRun.id} />
      </>
    </Card>
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

  if (!results) return null;
  if (!results.total) return <Text>Noch keine Stimmen</Text>;

  const votes = (i: number | null | undefined) =>
    `${i === 0 ? "–" : i === 1 ? "Eine Stimme" : `${i} Stimmen`}`;

  const data = [
    { title: "Ja", value: Number(results.yes), color: "green" },
    { title: "Nein", value: Number(results.no), color: "#d90000" },
  ];
  if (results.abs) {
    data.push({
      title: "Enthalten",
      value: Number(results.abs),
      color: "#aaa",
    });
  }

  const pieLabel: LabelRenderFunction = (props) => {
    const { title, percentage, color } = props.dataEntry;
    const x = 50;
    const y = results.abs ? 50 : 55;
    const dx = 0;
    const dy = title === "Ja" ? -8 : title === "Nein" ? 8 : 20;
    const fontSize = title === "Enthalten" ? "8px" : "12px";
    return (
      <text
        key={title}
        dominantBaseline="central"
        width={50}
        textAnchor="middle"
        dx={dx}
        dy={dy}
        x={x}
        y={y}
        fill={color}
        style={{ fontSize }}
      >
        <tspan>{title}: </tspan>
        <tspan>{Math.round(percentage)}%</tspan>
      </text>
    );
  };

  return (
    <div className="results">
      <Grid columns="1fr 1fr">
        <Flex justifyItems="center" flex={1} justifySelf="center">
          <Box
            height={200}
            width={200}
            sx={{ backgroundColor: "white", borderRadius: 100 }}
          >
            <PieChart
              data={data}
              startAngle={-90}
              paddingAngle={1}
              lineWidth={20}
              animate
              label={pieLabel}
              labelPosition={50}
              style={{
                fontWeight: "bold",
                fontSize: "12px",
              }}
            />
          </Box>
        </Flex>
        <Grid columns="2fr 3fr" gap={2}>
          <Text>Ja:</Text>
          <Text>{votes(results.yes)}</Text>
          <Text>Nein:</Text>
          <Text>{votes(results.no)}</Text>
          <Text>Enthalten:</Text>
          <Text>{votes(results.abs)}</Text>
          <Text>Total:</Text>
          <Text>{results.total} Stimmen</Text>
        </Grid>
      </Grid>
    </div>
  );
};
