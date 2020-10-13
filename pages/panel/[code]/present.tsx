import { LoggedInPage, ErrorPage, LoadingPage } from "components/Page";
import { Heading } from "rebass";
import { Ballot } from "components/Ballots";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import {
  BallotFieldsFragment,
  useGetBallotRunsQuery,
  useTeamByCodeQuery,
  Role,
} from "graphql/types";
import { useUser } from "state/user";

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

  function detailBallot(ballot: BallotFieldsFragment) {
    void router.push("/ballots/[id]", `/ballots/${ballot.id}`);
  }

  return (
    <LoggedInPage role={Role.Teacher} heading="Abstimmen">
      <Heading as="h2">Abstimmungen</Heading>
      {ballotRuns?.length
        ? ballotRuns.map((run) => (
            <Ballot
              key={run.id}
              ballot={run.ballot}
              buttonText="Abstimmmen"
              onButton={detailBallot}
              onDetail={detailBallot}
            />
          ))
        : "Keine Abstimmungen gefunden."}
    </LoggedInPage>
  );
}
