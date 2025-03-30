import { AppPage, H2 } from "components/Page";
import { Box, Flex, Text } from "rebass";
import { Breadcrumb, Here } from "components/Breadcrumb";
import { StudentCardList } from "components/Cards";
import { StudentListBallots } from "components/Ballots";
import Image from "next/legacy/image";
import IconWelcome from "../../../public/images/students_welcome.svg";
import { useTeamAnon, useUser } from "state/user";
import { Role } from "graphql/types";
import StudentTeamPage from "./student";
import TeacherTeamPage from "./admin";
import { LoginForm } from "pages/user/login";

export default function TeamHome(): React.ReactElement {
  const user = useUser();
  const team = useTeamAnon();

  if (user?.role === Role.Student) return <StudentTeamPage />;
  if (user?.role === Role.Teacher) return <TeacherTeamPage />;

  if (!team) {
    return <AppPage heading="" />;
  }

  // this is the anonymous view
  return (
    <AppPage heading={`Klasse (${team.name})`}>
      <Breadcrumb>
        <Here>Klasse «{team.name}»</Here>
      </Breadcrumb>

      <Flex justifyContent="center" mt={-20} mb={0} maxWidth="80%">
        <Image src={IconWelcome} width="350px" height="259px" alt="Welcome!" />
      </Flex>

      <H2 mt={0}>Lerninhalte Klasse {team.name}</H2>
      <Text mb={4} fontSize={2}>
        Diese Lerninhalte werden in der Klasse bearbeitet:
      </Text>
      <StudentCardList teamCards={String(team.cards)} teamId={team.id} />
      <Box mt={6} />

      <H2>Abstimmungen Klasse {team.name}</H2>
      <Text fontSize={2} mb={4}>
        Diese Abstimmungen sind für die Klasse verfügbar:
      </Text>
      <StudentListBallots teamId={team.id} />

      <TeamAnonLogin />

      <Box mb={4} />
    </AppPage>
  );
}

export const TeamAnonLogin: React.FC = () => (
  <Box>
    <H2 mt={6}>Anmelden</H2>
    <Text mb={3} fontSize={2}>
      Um Diskussionen und Aktivitäten der Klasse anzuzeigen musst du dich
      anmelden:
    </Text>
    <LoginForm />
  </Box>
);
