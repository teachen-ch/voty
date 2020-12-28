import { LoggedInPage, AppPage, ErrorPage } from "components/Page";
import { Text, Box } from "rebass";
import { useRouter } from "next/router";
import { Role, useBallotQuery, useGetBallotResultsQuery } from "graphql/types";
import { BallotResults } from "components/BallotResults";
import { BallotDetails } from "components/Ballots";
import { usePageEvent } from "util/stats";
import { Breadcrumb, A } from "components/Breadcrumb";
import { usePolling } from "util/hooks";
import { Discussion } from "components/Discussion";
import { HideFeature } from "components/HideFeature";
import { useTeam } from "state/user";

export default function TeacherBallotPage(): React.ReactElement {
  usePageEvent({ category: "Teacher", action: "BallotDetails" });
  const router = useRouter();
  const ballotId = String(router.query.ballot_id);
  const team = useTeam();
  const ballotQuery = useBallotQuery({
    variables: { where: { id: ballotId } },
    skip: !ballotId,
  });
  const ballot = ballotQuery.data?.ballot;
  const resultsQuery = useGetBallotResultsQuery({
    variables: { ballotId, teamId: team?.id },
    skip: !(ballotId && team?.id),
  });
  const results = resultsQuery.data?.getBallotResults;
  usePolling(resultsQuery);

  if (ballotQuery.loading || !team)
    return <AppPage heading="Abstimmungsseite"></AppPage>;
  if (ballotQuery.error)
    return <ErrorPage>{ballotQuery.error.message}</ErrorPage>;

  if (!ballot) {
    return (
      <AppPage heading="Abstimmung">
        Abstimmung konnte nicht gefunden werden
      </AppPage>
    );
  }

  return (
    <LoggedInPage heading={`${ballot.title}`} role={Role.Teacher}>
      <Breadcrumb>
        <A href="/">Start</A>
        <A href="/teacher/">Meine Klassen</A>
        <A href={`/team/${team.id}/admin`}>{team.name}</A>
        <b>{ballot.title}</b>
      </Breadcrumb>
      {!results?.total ? (
        ""
      ) : (
        <Box my={4}>
          <Text mb={4}>
            Hier sind die aktuellen Resultate für die Klasse «{team.name}»:
          </Text>
          <BallotResults results={results} />
        </Box>
      )}
      <BallotDetails ballot={ballot} />
      <HideFeature id="discussion">
        <Discussion ballotId={ballot.id} />
      </HideFeature>
    </LoggedInPage>
  );
}
