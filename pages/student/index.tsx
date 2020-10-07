import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Heading, Text, Link as A } from "rebass";
import { Navigation, Route } from "components/Navigation";
import { ReactElement } from "react";
import Link from "next/link";

export default function Teacher(): ReactElement {
  const user = useUser();

  return (
    <LoggedInPage heading="Startseite">
      <StudentTeamNavigation />
      <Heading as="h2">Hey {user?.name} 👋</Heading>
      <Text>{user && "Deine Klasse: " + user?.team?.name}</Text>
      <Text my={3}>
        Hier geht es zu den 👉{" "}
        <Link href="/student/test">
          <A>Abstimmungen</A>
        </Link>
      </Text>
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
