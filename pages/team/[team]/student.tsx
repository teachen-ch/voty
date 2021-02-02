import { H2, LoggedInPage } from "components/Page";
import { Box, Flex, Text } from "rebass";
import { Breadcrumb, Here } from "components/Breadcrumb";
import { HideFeature } from "components/HideFeature";
import { StudentCardList } from "components/Cards";
import { Activities } from "components/Activities";
import { StudentListBallots } from "components/Ballots";
import IconWelcome from "../../../public/images/students_welcome.svg";
import { useUser } from "state/user";

export default function StudentTeamPage(): React.ReactElement {
  const user = useUser();

  // ask for login if not yet logged in
  if (!user || !user.team) {
    return <LoggedInPage heading="Meine Klasse" />;
  }

  return (
    <LoggedInPage heading={`Meine Klasse (${user.team.name})`}>
      <Breadcrumb>
        <Here>Meine Klasse</Here>
      </Breadcrumb>

      <Flex justifyContent="center" mt={-20} mb={0} maxWidth="80%">
        <IconWelcome width="350px" height="259px" />
      </Flex>

      <HideFeature id="cards">
        <H2 mt={0}>Deine Lerninhalte</H2>
        <Text mb={4} fontSize={2}>
          Wähle hier die Lerninhalte, die Du bearbeiten möchtest:
        </Text>
        <StudentCardList
          teamCards={String(user.team?.cards)}
          teamId={user.team.id}
        />
        <Box mt={6} />
      </HideFeature>

      <H2>Abstimmungen Klasse {user.team.name}</H2>
      <Text fontSize={2} mb={4}>
        Diese Abstimmungen sind für Deine Klasse verfügbar:
      </Text>
      <StudentListBallots teamId={user.team.id} />

      <HideFeature id="activities">
        <H2 mt={6}>Aktivitäten in der Klasse</H2>
        <Text mb={4} fontSize={2}>
          Hier siehst du alle Aktivitäten, Uploads und Diskussionen der Klasse{" "}
          {user.team.name}.
        </Text>
        <Activities teamId={user.team.id} />
      </HideFeature>
      <Box mb={4} />
    </LoggedInPage>
  );
}
