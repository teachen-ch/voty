import { LoggedInPage } from "components/Page";
import { Heading } from "rebass";
import { Ballots, BallotScope } from "components/Ballots";
import { Ballot } from "graphql/types";
import { useRouter } from "next/router";
import { StudentTeamNavigation } from "./index";
import { ReactElement } from "react";

export default function StudentTest(): ReactElement {
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
