import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Link as A, Box, Text } from "rebass";
import { SessionUser } from "state/user";
import { useRouter } from "next/router";
import { Ballot, Ballots } from "components/Ballots";
import { Navigation, Route } from "components/Navigation";
import { ReactElement } from "react";
import {
  BallotScope,
  BallotFieldsFragment,
  useGetBallotRunsQuery,
} from "graphql/types";
import { ProfileEdit } from "components/Users";
import Link from "next/link";

export default function StudentHome(): ReactElement {
  const user = useUser();

  if (user?.year === null) {
    return (
      <LoggedInPage heading={`Hallo ${user?.name}`}>
        <Text>Willkommen auf voty.ch – schön bis Du da!</Text>
        <Text my={2}>
          Deine Klasse: {user?.team?.name}, {user?.school?.name}
        </Text>
        <Text fontWeight="bold" py={3}>
          Bitte ergänze Deine Angaben…
        </Text>
        <ProfileEdit user={user} editMode={true} />
      </LoggedInPage>
    );
  }

  return (
    <LoggedInPage heading="Aktuelle Abstimmungen">
      <Text>
        Hier kannst Du zu den aktuellen nationalen Abstimmungsvorlagen anonym
        Deine Stimme abgeben.
      </Text>
      <Box mt={4} mb={3} fontSize={2}>
        <Link href="/student/">
          <A variant="underline">Start</A>
        </Link>
        {" / "}
        <A variant="semi">Abstimmungen</A>
      </Box>
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
