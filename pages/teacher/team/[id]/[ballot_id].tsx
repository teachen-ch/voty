import { LoggedInPage, AppPage, ErrorPage } from "components/Page";
import { Text, Box } from "rebass";
import { useRouter } from "next/router";
import {
  useBallotQuery,
  useTeamTeacherQuery,
  useGetBallotResultsQuery,
} from "graphql/types";
import { BallotResults } from "components/BallotResults";
import { BallotDetails } from "components/Ballots";
import { usePageEvent } from "util/stats";
import { Breadcrumb, A } from "components/Breadcrumb";
import { usePolling } from "util/hooks";
import { Discussion } from "components/Discussion";
import { HideFeature } from "components/HideFeature";

export default function TeacherBallotPage(): React.ReactElement {
  usePageEvent({ category: "Teacher", action: "BallotDetails" });
  const router = useRouter();
  const ballotId = String(router.query.ballot_id);
  const teamId = String(router.query.id);
  const ballotQuery = useBallotQuery({
    variables: { where: { id: ballotId } },
    skip: !ballotId,
  });
  const ballot = ballotQuery.data?.ballot;
  const resultsQuery = useGetBallotResultsQuery({
    variables: { ballotId, teamId },
    skip: !(ballotId && teamId),
  });
  const results = resultsQuery.data?.getBallotResults;
  usePolling(resultsQuery);
  const teamQuery = useTeamTeacherQuery({
    variables: { where: { id: teamId } },
    skip: !teamId,
  });
  const team = teamQuery.data?.team;

  if (ballotQuery.loading || teamQuery.loading || !team)
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
    <LoggedInPage heading={`${ballot.title}`}>
      <Breadcrumb>
        <A href="/">Start</A>
        <A href="/teacher/">Meine Klassen</A>
        <A
          href="/teacher/team/[id]/admin"
          as={`/teacher/team/${team.id}/admin`}
        >
          {team.name}
        </A>
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
        <Discussion refid={ballot.id} teamId={team.id} />
      </HideFeature>
    </LoggedInPage>
  );
}
