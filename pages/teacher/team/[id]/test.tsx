import { LoggedInPage } from "components/Page";
import { Heading, Text, Button } from "rebass";
import Link from "next/link";
import { Ballot } from "components/Ballots";
import {
  useBallotsQuery,
  BallotScope,
  TeamTeacherFieldsFragment,
  useTeamTeacherQuery,
  BallotFieldsFragment,
  useGetBallotRunsQuery,
  useAddBallotRunMutation,
  useRemoveBallotRunMutation,
} from "graphql/types";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { find } from "lodash";
import { usePageEvent, trackEvent } from "util/stats";

export default function TeacherTest(): ReactElement {
  usePageEvent({ category: "Teacher", action: "Ballots" });
  const router = useRouter();
  const id = String(router.query.id);
  const teamQuery = useTeamTeacherQuery({
    variables: { where: { id } },
    skip: !id,
  });
  const team = teamQuery.data?.team;
  const [doAddBallotRun] = useAddBallotRunMutation();
  const [doRemoveBallotRun] = useRemoveBallotRunMutation();

  const ballotRunsQuery = useGetBallotRunsQuery({
    variables: { teamId: String(team?.id) },
    skip: !team,
  });
  const ballotRuns = ballotRunsQuery.data?.getBallotRuns;

  const ballotsQuery = useBallotsQuery({
    variables: { where: { scope: BallotScope.National } },
  });

  const ballots = ballotsQuery.data?.ballots;
  const unselectedBallots = ballots
    ? ballots.filter(({ id }) => !find(ballotRuns, { ballot: { id } }))
    : [];

  if (!team) {
    return (
      <LoggedInPage heading="Demokratie testen">
        Team konnte nicht gefunden werden
      </LoggedInPage>
    );
  }

  function detailBallot(ballot: BallotFieldsFragment) {
    void router.push("/ballots/[id]", `/ballots/${ballot.id}`);
  }

  async function addBallot(ballotId: string, teamId: string) {
    trackEvent({ category: "Teacher", action: "AddBallot" });
    await doAddBallotRun({
      variables: { ballotId, teamId },
      refetchQueries: ["getBallotRuns"],
    });
    window.scrollTo(0, 0);
  }

  async function removeBallot(ballotRunId: string) {
    trackEvent({ category: "Teacher", action: "RemoveBallot" });
    await doRemoveBallotRun({
      variables: { ballotRunId },
      refetchQueries: ["getBallotRuns"],
    });
    window.scrollTo(0, 0);
  }

  return (
    <LoggedInPage heading="Demokratie testen">
      <Heading as="h2">Diese Abstimmungen wurden ausgewählt:</Heading>
      <div id="selectedBallots">
        {ballotRuns?.length
          ? ballotRuns.map((run) => (
              <Ballot
                key={run.id}
                ballot={run.ballot}
                buttonText="Entfernen"
                onButton={() => removeBallot(run.id)}
                onDetail={detailBallot}
              />
            ))
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
            onDetail={detailBallot}
          />
        ))}
      </div>

      <PanelCode team={team} hasRuns={ballotRuns?.length ? true : false} />
    </LoggedInPage>
  );
}

const PanelCode: React.FC<{
  team: TeamTeacherFieldsFragment;
  hasRuns: boolean;
}> = ({ team, hasRuns }) => {
  if (!team?.code || !hasRuns) return null;
  return (
    <Text id="livepanel">
      Seite für Live-Abstimmungen:{" "}
      <Link href="/panel/[code]/present" as={`/panel/${team.code}/present`}>
        <Button>Code: {team.code}</Button>
      </Link>
    </Text>
  );
};
