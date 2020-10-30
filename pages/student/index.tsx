import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Text } from "rebass";
import { ReactElement } from "react";
import { ProfileEdit } from "components/Users";
import StudentTest from "./test";
import { trackEvent } from "util/stats";

export default function StudentHome(): ReactElement {
  const user = useUser();

  if (user?.year === null) {
    trackEvent({ category: "Student", action: "FirstRun" });
    return (
      <LoggedInPage heading={`Hallo ${user?.name}`}>
        <Text>Willkommen auf voty.ch – schön bis Du da!</Text>
        <Text my={2}>
          Deine Klasse: {user?.team?.name}, {user?.school?.name}
        </Text>
        <Text my={2} mt={4}>
          Bitte ergänze hier noch Deine Angaben:
        </Text>
        <ProfileEdit user={user} editMode={true} />
      </LoggedInPage>
    );
  }

  return <StudentTest />;
}
