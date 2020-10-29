import { LoggedInPage } from "components/Page";
import { Text, Box } from "rebass";
import { Ballot, Ballots } from "components/Ballots";
import { useRouter } from "next/router";
import { useUser, SessionUser } from "state/user";
import { Breadcrumb, A } from "components/Breadcrumb";
import { ReactElement } from "react";
import {
  BallotScope,
  BallotFieldsFragment,
  useGetBallotRunsQuery,
} from "graphql/types";

export default function StudentTest(): ReactElement {
  const user = useUser();

  return (
    <LoggedInPage heading="Abstimmungen">
      <Breadcrumb>
        <A href="/">Start</A>
        <b>Abstimmungen</b>
      </Breadcrumb>
      <Text>
        Hier kannst Du zu den aktuellen nationalen Abstimmungsvorlagen anonym
        Deine Stimme abgeben.
      </Text>
      <ShowBallots user={user} />
    </LoggedInPage>
  );
}

const ShowBallots: React.FC<{ user: SessionUser }> = ({ user }) => {
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
    <Box id="ballots">
      {ballotRuns?.length ? (
        ballotRuns.map((run) => (
          <Ballot
            key={run.id}
            ballot={run.ballot}
            buttonText="Informieren und abstimmen"
            onButton={detailBallot}
            onDetail={detailBallot}
          />
        ))
      ) : (
        <AllBallots onClick={detailBallot} />
      )}
    </Box>
  );
};
const AllBallots: React.FC<{
  onClick: (ballot: BallotFieldsFragment) => void;
}> = ({ onClick }) => {
  return <Ballots where={{ scope: BallotScope.National }} onClick={onClick} />;
};
