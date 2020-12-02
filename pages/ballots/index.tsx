import { LoggedInPage } from "components/Page";
import { Heading } from "rebass";
import { Ballots } from "components/Ballots";
import { BallotFieldsFragment, BallotScope } from "graphql/types";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export default function TeacherTest(): ReactElement {
  const router = useRouter();

  function selectBallot(ballot: BallotFieldsFragment) {
    void router.push("/ballots/[id]", `/ballots/${ballot.id}`);
  }

  return (
    <LoggedInPage heading="Aktuelle Abstimmungen">
      <Heading as="h2">Nationale Abstimmungen</Heading>
      <Ballots
        where={{ scope: { equals: BallotScope.National } }}
        onClick={selectBallot}
      />
    </LoggedInPage>
  );
}
