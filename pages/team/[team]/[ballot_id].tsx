import { LoggedInPage, AppPage, ErrorPage } from "components/Page";
import { Text, Box } from "components/ui";
import { useRouter } from "next/router";
import { Role, useBallotQuery, useGetBallotResultsQuery } from "graphql/types";
import { BallotResults, VotyPie } from "components/BallotResults";
import { BallotDetails } from "components/Ballots";
import { usePageEvent } from "util/stats";
import { Breadcrumb, A, Here } from "components/Breadcrumb";
import { usePolling } from "util/hooks";
import { Discussion } from "components/Discussion";
import { HideFeature } from "components/HideFeature";
import { useTeam } from "state/user";
import { useState } from "react";

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
  const compareQuery = useGetBallotResultsQuery({
    variables: { ballotId },
    skip: !(ballotId && team?.id),
  });
  const results = resultsQuery.data?.getBallotResults;
  const compare = compareQuery.data?.getBallotResults;
  const [comparison, setComparison] = useState(false);
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
        <A href="/teacher/">Meine Klassen</A>
        <A href={`/team/${team.id}`}>{team.name}</A>
        <Here>{ballot.title}</Here>
      </Breadcrumb>
      {!results?.total ? (
        <Box className="bg-white p-8 text-gray italic">
          Hier werden später die Resultate deiner Klasse angezeigt
        </Box>
      ) : (
        <Box className="my-8">
          <Text className="mb-8">
            Hier sind die aktuellen Resultate für die Klasse «{team.name}»:
          </Text>
          <BallotResults results={results} />
          {compare && compare.total && compare.total > 50 && (
            <Box className="mt-4">
              <A
                onClick={() => setComparison(!comparison)}
                className="text-base"
              >
                Vergleich mit allen Jugend-Stimmen auf voty.ch
              </A>
              {comparison && (
                <Box className="text-center mt-8">
                  <Text variant="semi">
                    Aktuelles Zwischenresultat aller Jugend-Stimmen auf voty.ch
                  </Text>
                  <Box className="mt-8 mx-auto h-[200px] w-[200px] bg-white rounded-[100px]">
                    <VotyPie results={compare} />
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
      <BallotDetails ballot={ballot} />
      <HideFeature id="discussions">
        <Discussion ballotId={ballot.id} />
      </HideFeature>
    </LoggedInPage>
  );
}
