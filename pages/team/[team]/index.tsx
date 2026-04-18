import { AppPage, H2 } from "components/Page";
import { Box, Flex, Text } from "components/ui";
import { Breadcrumb, Here } from "components/Breadcrumb";
import { StudentCardList } from "components/Cards";
import { StudentListBallots } from "components/Ballots";
import Image from "next/image";
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

  return (
    <AppPage heading={`Klasse (${team.name})`}>
      <Breadcrumb>
        <Here>Klasse «{team.name}»</Here>
      </Breadcrumb>

      <Flex className="justify-center mt-[-20px] mb-0 max-w-[80%]">
        <Image src={IconWelcome} width={350} height={259} alt="Welcome!" />
      </Flex>

      <H2 className="mt-0">Lerninhalte Klasse {team.name}</H2>
      <Text className="mb-8 text-base">
        Diese Lerninhalte werden in der Klasse bearbeitet:
      </Text>
      <StudentCardList teamCards={String(team.cards)} teamId={team.id} />
      <Box className="mt-24" />

      <H2>Abstimmungen Klasse {team.name}</H2>
      <Text className="text-base mb-8">
        Diese Abstimmungen sind für die Klasse verfügbar:
      </Text>
      <StudentListBallots teamId={team.id} />

      <TeamAnonLogin />

      <Box className="mb-8" />
    </AppPage>
  );
}

export const TeamAnonLogin: React.FC<React.PropsWithChildren<unknown>> = () => (
  <Box>
    <H2 className="mt-24">Anmelden</H2>
    <Text className="mb-4 text-base">
      Um Diskussionen und Aktivitäten der Klasse anzuzeigen musst du dich
      anmelden:
    </Text>
    <LoginForm />
  </Box>
);
