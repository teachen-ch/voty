import { Page } from "components/Page";
import { Heading } from "rebass";
import { useTeamTeacher } from "components/Teams";
import { Ballots, BallotScope } from "components/Ballots";
import { Ballot } from "graphql/types";
import { useRouter } from "next/router";

export default function TeacherTest() {
  const router = useRouter();

  function selectBallot(ballot: Ballot) {
    router.push("/ballots/[id]", `/ballots/${ballot.id}`);
  }

  return (
    <Page heading="Aktuelle Abstimmungen">
      <Heading as="h2">Nationale Abstimmungen</Heading>
      <Ballots where={{ scope: BallotScope.National }} onClick={selectBallot} />
    </Page>
  );
}
