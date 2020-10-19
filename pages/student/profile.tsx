import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Heading, Box, Link as A, Card } from "rebass";
import { ReactElement } from "react";
import Link from "next/link";
import { ProfileEdit } from "components/Users";

export default function StudentProfilePage({
  firstRun,
}: {
  firstRun?: boolean;
}): ReactElement {
  const user = useUser();

  return (
    <LoggedInPage heading="Startseite">
      <Card>
        <Heading as="h2" mt={0}>
          {firstRun ? "Bitte ergänze Deine Angaben…" : "Profil bearbeiten"}
        </Heading>
        <ProfileEdit user={user} editMode={firstRun} />
      </Card>

      {!firstRun && (
        <Box mt={5}>
          Ich möchte mein Konto bei voty{" "}
          <Link href="/user/delete">
            <A>löschen</A>
          </Link>
        </Box>
      )}
    </LoggedInPage>
  );
}

export { StudentProfilePage };
