import { LoggedInPage, AppPage, ErrorPage } from "components/Page";
import { Text } from "rebass";
import { useRouter } from "next/router";
import {
  useBallotQuery,
  useTeamTeacherQuery,
  useGetBallotResultsQuery,
} from "graphql/types";
import { BallotResults } from "components/BallotResults";

export default function TeacherBallotPage(): React.ReactElement {
  const router = useRouter();
  const ballotId = String(router.query.ballot_id);
  const teamId = String(router.query.id);
  const ballotQuery = useBallotQuery({
    variables: { where: { id: ballotId } },
    skip: !ballotId,
  });
  const resultsQuery = useGetBallotResultsQuery({
    variables: { ballotId, teamId },
    skip: !(ballotId && teamId),
  });
  const teamQuery = useTeamTeacherQuery({
    variables: { where: { id: teamId } },
    skip: !teamId,
  });
  const team = teamQuery.data?.team;

  if (ballotQuery.loading)
    return <AppPage heading="Abstimmungsseite"></AppPage>;
  if (ballotQuery.error)
    return <ErrorPage>{ballotQuery.error.message}</ErrorPage>;

  const ballot = ballotQuery.data?.ballot;
  if (!ballot) {
    return (
      <AppPage heading="Abstimmung">
        Abstimmung konnte nicht gefunden werden
      </AppPage>
    );
  }

  const results = resultsQuery.data?.getBallotResults;

  return (
    <LoggedInPage heading={`${ballot.title}`}>
      <Text mb={4}>
        Hier sind die aktuellen Resultate für die Klasse «{team?.name}»:
      </Text>
      <BallotResults results={results} />
    </LoggedInPage>
  );
}
