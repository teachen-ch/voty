import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Heading, Text, Link as A, Card } from "rebass";
import { Navigation, Route } from "components/Navigation";
import { ReactElement } from "react";
import Link from "next/link";
import { StudentProfileEdit } from "components/Users";

export default function Teacher(): ReactElement {
  const user = useUser();

  return (
    <LoggedInPage heading="Startseite">
      <StudentTeamNavigation />
      <Heading as="h2">Hey {user?.name} 👋</Heading>
      <Text>
        {user &&
          `Deine Klasse: ${user?.team?.name}, ${user?.school?.name} (${user?.school?.city})`}
      </Text>
      {user?.year === null && (
        <Card>
          <Heading as="h2" mt={0}>
            Bitte ergänze Deine Angaben…
          </Heading>
          <StudentProfileEdit user={user} />
        </Card>
      )}
      <Card>
        Hier geht es zu den 👉{" "}
        <Link href="/student/test">
          <A>Abstimmungen</A>
        </Link>
      </Card>
    </LoggedInPage>
  );
}

export function StudentTeamNavigation(): ReactElement {
  return (
    <Navigation>
      <Route href="/student" label="Dein Profil" />
      <Route href="/student/test" label="Demokratie testen" />
    </Navigation>
  );
}
