import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Heading, Box } from "rebass";
import { SessionUser } from "state/user";
import { useRouter } from "next/router";
import { Ballot, Ballots } from "components/Ballots";
import { Navigation, Route } from "components/Navigation";
import { ReactElement } from "react";
import { StudentProfilePage } from "./profile";
import {
  BallotScope,
  BallotFieldsFragment,
  useGetBallotRunsQuery,
} from "graphql/types";

export default function StudentHome(): ReactElement {
  const user = useUser();

  if (user?.year === null) {
    return <StudentProfilePage firstRun />;
  }

  return (
    <LoggedInPage heading="Startseite">
      {/*<StudentTeamNavigation />*/}
      <Heading as="h2">Aktuelle Abstimmungen</Heading>
      <ShowBallots user={user} />
    </LoggedInPage>
  );
}

export function StudentTeamNavigation(): ReactElement {
  return (
    <Navigation>
      <Route href="/student" label="Dein Profil" />
      <Route href="/student/test" label="Demokratie testen" />
    </Navigation>
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
            buttonText="Abstimmen"
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
