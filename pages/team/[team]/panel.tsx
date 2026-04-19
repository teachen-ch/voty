import { LoggedInPage } from "components/Page";
import { Heading, Box, Text, Button } from "components/ui";
import { useRouter } from "next/router";
import { SelectBallots } from "components/Ballots";
import { usePageEvent } from "util/stats";
import { Role, useTeamTeacherQuery } from "graphql/types";
import { Breadcrumb, Here } from "components/Breadcrumb";
import { A } from "components/A";
import { BallotScope } from "graphql/types";

export default function PanelPage(): React.ReactElement {
  usePageEvent({ category: "Teacher", action: "Admin" });
  const router = useRouter();
  const id = String(router.query.team);
  const teamQuery = useTeamTeacherQuery({
    variables: { where: { id } },
    skip: !id,
  });

  if (teamQuery.loading) {
    return (
      <LoggedInPage heading="discussit.ch Panel" role={Role.Teacher}>
        Panel wird geladen…
      </LoggedInPage>
    );
  }
  const team = teamQuery.data?.team;
  if (!team) {
    return (
      <LoggedInPage heading="discussit.ch Panel" role={Role.Teacher}>
        Panel konnte nicht gefunden werden
      </LoggedInPage>
    );
  }

  return (
    <LoggedInPage heading="discussit.ch Panel" role={Role.Teacher}>
      <Breadcrumb>
        <A href="/teacher/">Meine Klassen</A>
        <Here>{team.name}</Here>
      </Breadcrumb>
      <Heading as="h3">
        Folgende Abstimmungen sind für das Panel verfügbar
      </Heading>
      <Text className="text-base mb-4">
        Wähle hier aus der Liste die Abstimmungen aus, über welche im Panel
        diskutiert wird. Hier können später auch die Resultate angezeigt werden.
      </Text>
      <SelectBallots team={team} scope={BallotScope.National} />

      <Box className="mt-8" />

      <A href={`/panel/${team.code}/present`}>
        <Button>Panel präsentieren</Button>
      </A>
    </LoggedInPage>
  );
}
