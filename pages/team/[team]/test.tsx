import { Loading, LoggedInPage } from "components/Page";
import { Box, Heading, Text, Button } from "components/ui";
import Link from "next/link";
import { Ballot } from "components/Ballots";
import {
  useBallotsQuery,
  BallotScope,
  TeamTeacherFieldsFragment,
  BallotFieldsFragment,
  useGetBallotRunsQuery,
  useAddBallotRunMutation,
  useRemoveBallotRunMutation,
  Role,
  useBallotQuery,
  BallotRunFieldsFragment,
} from "graphql/types";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import find from "lodash/find";
import { usePageEvent, trackEvent } from "util/stats";
import { useTeam } from "state/user";

export default function TeacherTest(): ReactElement {
  usePageEvent({ category: "Teacher", action: "Ballots" });
  const router = useRouter();
  const team = useTeam();
  const [doAddBallotRun] = useAddBallotRunMutation();

  const ballotRunsQuery = useGetBallotRunsQuery({
    variables: { teamId: String(team?.id) },
    skip: !team,
  });
  const ballotRuns = ballotRunsQuery.data?.getBallotRuns;

  const ballotsQuery = useBallotsQuery({
    variables: { where: { scope: { equals: BallotScope.National } } },
  });

  const ballots = ballotsQuery.data?.ballots;
  const unselectedBallots = ballots
    ? ballots.filter(({ id }) => !find(ballotRuns, { ballot: { id } }))
    : [];

  if (team === null) {
    return (
      <LoggedInPage heading="Demokratie testen" role={Role.Teacher}>
        <Text className="mb-4">Klasse wurde nicht gefunden.</Text>
        <Button onClick={() => router.push("/teacher/")}>Meine Klassen</Button>
      </LoggedInPage>
    );
  }

  if (!team)
    return (
      <LoggedInPage role={Role.Teacher}>
        <Loading />
      </LoggedInPage>
    );

  async function addBallot(ballotId: string, teamId: string) {
    trackEvent({ category: "Teacher", action: "AddBallot" });
    await doAddBallotRun({
      variables: { ballotId, teamId },
      refetchQueries: ["getBallotRuns"],
    });
    window.scrollTo(0, 0);
  }

  return (
    <LoggedInPage heading="Demokratie testen" role={Role.Teacher}>
      <Heading as="h2">Diese Abstimmungen wurden ausgewählt:</Heading>
      <div id="selectedBallots">
        {ballotRuns?.length
          ? ballotRuns.map(
              (run) => run && <BallotRunDetail run={run} key={run.id} />
            )
          : "Noch keine Abstimmungen ausgewählt."}
      </div>
      <Heading as="h2">Aktuelle Abstimmungen zur Auswahl:</Heading>
      <div id="unselectedBallots">
        {unselectedBallots.map((ballot) => (
          <Ballot
            key={ballot.id}
            ballot={ballot}
            buttonText="Auswählen"
            onButton={() => addBallot(ballot.id, team.id)}
            onDetail={() => void router.push(`/ballots/${ballot.id}`)}
          />
        ))}
      </div>

      <PanelCode team={team} hasRuns={ballotRuns?.length ? true : false} />
    </LoggedInPage>
  );
}

const BallotRunDetail: React.FC<React.PropsWithChildren<{ run: BallotRunFieldsFragment }>> = ({
  run,
}) => {
  const [doRemoveBallotRun] = useRemoveBallotRunMutation();
  const router = useRouter();
  async function removeBallot(ballotRunId: string) {
    trackEvent({ category: "Teacher", action: "RemoveBallot" });
    await doRemoveBallotRun({
      variables: { ballotRunId },
      refetchQueries: ["getBallotRuns"],
    });
    window.scrollTo(0, 0);
  }
  const ballotQuery = useBallotQuery({
    variables: { where: { id: run?.ballotId } },
  });
  const ballot = ballotQuery.data?.ballot;
  return run && ballot ? (
    <Ballot
      key={run.id}
      ballot={ballot}
      buttonText="Entfernen"
      onButton={() => removeBallot(run.id)}
      onDetail={() => void router.push(`/ballots/${ballot.id}`)}
    />
  ) : null;
};

const PanelCode: React.FC<React.PropsWithChildren<{
  team: TeamTeacherFieldsFragment;
  hasRuns: boolean;
}>> = ({ team, hasRuns }) => {
  if (!team?.code || !hasRuns) return null;
  return (
    <Box id="livepanel">
      Seite für Live-Abstimmungen:{" "}
      <Link href={`/panel/${team.code}/present`}>
        <Button>Code: {team.code}</Button>
      </Link>
    </Box>
  );
};
