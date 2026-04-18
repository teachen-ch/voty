import { H2, LoggedInPage } from "components/Page";
import { Box, Text } from "components/ui";
import { StudentCardList } from "components/Cards";
import { Activities } from "components/Activities";
import { StudentListBallots } from "components/Ballots";
import { useUser } from "state/user";

export default function StudentTeamPage(): React.ReactElement {
  const user = useUser();

  if (!user || !user.team) {
    return <LoggedInPage heading="Meine Klasse" />;
  }

  return (
    <LoggedInPage
      heading={`Meine Klasse (${user.team.name})`}
      image="/images/header_student.svg"
    >
      <H2 className="mt-16">Deine Lerninhalte</H2>
      <Text className="mb-8 text-base">
        Wähle hier die Lerninhalte, die du bearbeiten möchtest:
      </Text>
      <StudentCardList
        teamCards={String(user.team?.cards)}
        teamId={user.team.id}
      />
      <Box className="mt-24" />

      <H2>Abstimmungen Klasse {user.team.name}</H2>
      <Text className="text-base mb-8">
        Diese Abstimmungen sind für deine Klasse verfügbar:
      </Text>
      <StudentListBallots teamId={user.team.id} />

      <H2 className="mt-24">Aktivitäten in der Klasse</H2>
      <Text className="mb-8 text-base">
        Hier siehst du alle Aktivitäten, Uploads und Diskussionen der Klasse{" "}
        {user.team.name}.
      </Text>
      <Activities teamId={user.team.id} />
      <Box className="mb-8" />
    </LoggedInPage>
  );
}
