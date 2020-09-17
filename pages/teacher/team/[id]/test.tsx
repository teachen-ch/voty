import { LoggedInPage } from "components/Page";
import { Heading } from "rebass";
import { useTeamTeacher } from "components/Teams";
import { useUser } from "state/user";
import { Ballots, BallotScope } from "components/Ballots";
import { Ballot } from "graphql/types";
import { useRouter } from "next/router";
import { TeacherTeamNavigation } from "./admin";

export default function TeacherTest() {
  const user = useUser();
  const router = useRouter();
  const id = parseInt(String(router.query.id));
  const team = useTeamTeacher(id, user);

  function selectBallot(ballot: Ballot) {
    router.push("/ballots/[id]", `/ballots/${ballot.id}`);
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
