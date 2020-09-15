import { LoggedInPage } from "components/Page";
import { Heading } from "rebass";
import { useTeamTeacher } from "components/Teams";
import { useUser } from "state/user";
import { Ballots, BallotScope } from "components/Ballots";
import { Ballot } from "graphql/types";
import { useRouter } from "next/router";
import { StudentTeamNavigation } from "./index";

export default function StudentTest() {
  const router = useRouter();

  function selectBallot(ballot: Ballot) {
    router.push("/ballots/[id]", `/ballots/${ballot.id}`);
  }

  return (
    <LoggedInPage heading="Demokratie Testen">
      <StudentTeamNavigation />
      <Heading as="h2">Demokratie Testen: Nationale Abstimmungen</Heading>
      <Ballots where={{ scope: BallotScope.National }} onClick={selectBallot} />
    </LoggedInPage>
  );
}
