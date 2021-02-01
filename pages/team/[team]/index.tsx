import { AppPage, H2 } from "components/Page";
import { Box, Flex, Text } from "rebass";
import { Breadcrumb, Here } from "components/Breadcrumb";
import { HideFeature } from "components/HideFeature";
import { StudentCardList } from "components/Cards";
import { StudentListBallots } from "components/Ballots";
import IconWelcome from "../../../public/images/students_welcome.svg";
import { useUser } from "state/user";
import { Role, useTeamAnonQuery } from "graphql/types";
import StudentTeamPage from "./student";
import TeacherTeamPage from "./admin";
import { useRouter } from "next/router";

export default function TeamHome(): React.ReactElement {
  const user = useUser();
  const router = useRouter();
  const id = String(router.query.team);
  const teamQuery = useTeamAnonQuery({
    variables: { where: { id } },
    skip: !id,
  });
  const team = teamQuery?.data?.team;

  if (user?.role === Role.Student) return <StudentTeamPage />;

  if (user?.role === Role.Teacher) {
    return <TeacherTeamPage />;
  }

  if (!team) {
    return <AppPage heading="" />;
  }

  // this is the anonymous view
  return (
    <AppPage heading={`Klasse (${team.name})`}>
      <Breadcrumb>
        <Here>Klasse «{team.name}»</Here>
      </Breadcrumb>

      <Flex justifyContent="center" mt={-20} mb={0}>
        <IconWelcome width="350px" height="259px" maxWidth="80%" />
      </Flex>

      <HideFeature id="cards">
        <H2 mt={0}>Lerninhalte Klasse {team.name}</H2>
        <Text mb={4} fontSize={2}>
          Diese Lerninhalte werden in der Klasse bearbeitet:
        </Text>
        <StudentCardList teamCards={String(team.cards)} teamId={team.id} />
        <Box mt={6} />
      </HideFeature>

      <H2>Abstimmungen Klasse {team.name}</H2>
      <Text fontSize={2} mb={4}>
        Diese Abstimmungen sind für die Klasse verfügbar:
      </Text>
      <StudentListBallots teamId={team.id} />

      <H2 mt={6}>Aktivitäten in der Klasse</H2>
      <Text mb={4} fontSize={2}>
        Klassenaktivitäten werden nur Mitgliedern der Klasse angezeigt.
      </Text>
      <Box mb={4} />
    </AppPage>
  );
}
