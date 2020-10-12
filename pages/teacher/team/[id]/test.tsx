import { LoggedInPage } from "components/Page";
import { Heading } from "rebass";
import { Ballots, BallotScope } from "components/Ballots";
import { useTeamTeacherQuery, BallotFieldsFragment } from "graphql/types";
import { useRouter } from "next/router";
import { TeacherTeamNavigation } from "./admin";
import { ReactElement } from "react";

export default function TeacherTest(): ReactElement {
  const router = useRouter();
  const id = String(router.query.id);
  const teamQuery = useTeamTeacherQuery({
    variables: { where: { id } },
    skip: !id,
  });
  const team = teamQuery.data?.team;

  function selectBallot(ballot: BallotFieldsFragment) {
    void router.push("/ballots/[id]", `/ballots/${ballot.id}`);
  }
  if (!team) {
    return (
      <LoggedInPage heading="Demokratie testen">
        Team konnte nicht gefunden werden
      </LoggedInPage>
    );
  }

  return (
    <LoggedInPage heading="Demokratie testen">
      <TeacherTeamNavigation team={team} />
      <Heading as="h2">Demokratie Testen: Nationale Abstimmungen</Heading>
      <Ballots where={{ scope: BallotScope.National }} onClick={selectBallot} />
    </LoggedInPage>
  );
}
