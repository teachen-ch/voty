import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { ProfileEdit } from "components/Users";
import { trackEvent } from "util/stats";
import { useRouter } from "next/router";
import { Text } from "components/ui";

const SKIP_DEMOGRAPHICS =
  process.env.SKIP_DEMOGRAPHICS?.toUpperCase() === "TRUE";

export default function StudentHome(): React.ReactElement {
  const user = useUser();
  const router = useRouter();

  if (!user || !user.team) {
    return <LoggedInPage heading="Meine Klasse" />;
  }

  if (user.year === null && !SKIP_DEMOGRAPHICS) {
    trackEvent({ category: "Student", action: "FirstRun" });
    return (
      <LoggedInPage heading={`Hallo ${user?.name}`}>
        <Text>Willkommen auf voty.ch – schön bis du da!</Text>
        <Text className="my-2">
          Deine Klasse: {user?.team?.name}, {user?.school?.name}
        </Text>
        <Text className="my-2 mt-8">
          Bitte ergänze hier noch deine Angaben:
        </Text>
        <ProfileEdit user={user} editMode={true} />
      </LoggedInPage>
    );
  }

  void router.push(`/team/${user.team.id}/`);
  return <LoggedInPage heading={`Meine Klasse (${user.team.name})`} />;
}
