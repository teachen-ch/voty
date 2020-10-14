import { LoggedInPage } from "components/Page";
import { Heading } from "rebass";
import { Ballot, Ballots } from "components/Ballots";
import { useRouter } from "next/router";
import { StudentTeamNavigation } from "./index";
import { useUser } from "state/user";
import { ReactElement } from "react";
import {
  BallotScope,
  BallotFieldsFragment,
  useGetBallotRunsQuery,
} from "graphql/types";

export default function StudentTest(): ReactElement {
  const user = useUser();
  const router = useRouter();

  const ballotRunsQuery = useGetBallotRunsQuery({
    variables: { teamId: String(user?.team?.id) },
    skip: !user?.team,
  });
  const ballotRuns = ballotRunsQuery.data?.getBallotRuns;

  function detailBallot(ballot: BallotFieldsFragment) {
    void router.push("/ballots/[id]", `/ballots/${ballot.id}`);
  }
  return (
    <LoggedInPage heading="Abstimmen">
      <StudentTeamNavigation />
      <Heading as="h2">Nationale Abstimmungen</Heading>
      {ballotRuns?.length ? (
        ballotRuns.map((run) => (
          <Ballot
            key={run.id}
            ballot={run.ballot}
            buttonText="Abstimmen"
            onButton={detailBallot}
            onDetail={detailBallot}
          />
        ))
      ) : (
        <AllBallots onClick={detailBallot} />
      )}
    </LoggedInPage>
  );
}

const AllBallots: React.FC<{
  onClick: (ballot: BallotFieldsFragment) => void;
}> = ({ onClick }) => {
  return <Ballots where={{ scope: BallotScope.National }} onClick={onClick} />;
};
