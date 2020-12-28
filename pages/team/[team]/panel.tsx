import { LoggedInPage } from "components/Page";
import { Heading, Box, Text, Button } from "rebass";
import { useRouter } from "next/router";
import { SelectBallots } from "components/Ballots";
import { usePageEvent } from "util/stats";
import { Role, useTeamTeacherQuery } from "graphql/types";
import { Breadcrumb, A } from "components/Breadcrumb";
// import { usePolling } from "util/hooks";

export default function PanelPage(): React.ReactElement {
  usePageEvent({ category: "Teacher", action: "Admin" });
  const router = useRouter();
  const id = String(router.query.team);
  const teamQuery = useTeamTeacherQuery({
    variables: { where: { id } },
    skip: !id,
  });
  // usePolling(teamQuery);

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
        <A href="/">Start</A>
        <A href="/teacher/">Meine Klassen</A>
        <b>{team.name}</b>
      </Breadcrumb>
      <Text textAlign="left">
        <Heading as="h3">
          Folgende Abstimmungen sind für das Panel verfügbar
        </Heading>
        <Text fontSize={2} mb={3}>
          Wähle hier aus der Liste die Abstimmungen aus, über welche im Panel
          diskutiert wird. Hier können später auch die Resultate angezeigt
          werden.
        </Text>
        <SelectBallots team={team} />

        <Box mt={4} />

        <A href={`/panel/${team.code}/present`}>
          <Button>Panel präsentieren</Button>
        </A>
      </Text>
    </LoggedInPage>
  );
}
