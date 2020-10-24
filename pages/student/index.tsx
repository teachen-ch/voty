import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Text } from "rebass";
import { Navigation, Route } from "components/Navigation";
import { ReactElement } from "react";
import { ProfileEdit } from "components/Users";
import StudentTest from "./test";

export default function StudentHome(): ReactElement {
  const user = useUser();

  if (user?.year === null) {
    return (
      <LoggedInPage heading={`Hallo ${user?.name}`}>
        <Text>Willkommen auf voty.ch – schön bis Du da!</Text>
        <Text my={2}>
          Deine Klasse: {user?.team?.name}, {user?.school?.name}
        </Text>
        <Text fontWeight="bold" py={3}>
          Bitte ergänze Deine Angaben…
        </Text>
        <ProfileEdit user={user} editMode={true} />
      </LoggedInPage>
    );
  }

  return <StudentTest />;
}

export function StudentTeamNavigation(): ReactElement {
  return (
    <Navigation>
      <Route href="/student" label="Dein Profil" />
      <Route href="/student/test" label="Demokratie testen" />
    </Navigation>
  );
}
