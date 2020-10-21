import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Heading, Box, Text, Link as A, Card } from "rebass";
import { ReactElement } from "react";
import Link from "next/link";
import { ProfileEdit } from "components/Users";
import { SelectSchool } from "../../components/Schools";

export default function TeacherProfilePage({
  firstRun,
}: {
  firstRun?: boolean;
}): ReactElement {
  const user = useUser();

  return (
    <LoggedInPage heading="Startseite">
      <SelectSchool />
      <Card>
        <Heading as="h2" mt={0}>
          {firstRun ? "Bitte ergänze Deine Angaben…" : "Profil bearbeiten"}
        </Heading>
        <ProfileEdit user={user} editMode={firstRun} />
      </Card>

      {!firstRun && (
        <Box mt={5}>
          Ich möchte mein Konto auf voty.ch{" "}
          <Link href="/user/delete">
            <A>löschen</A>
          </Link>
          .
          <Text fontSize={1}>
            Achtung, dabei werden auch alle durch Dich erstellte Klassen
            gelöscht. Konten der Schüler*innen werden nicht automatisch
            gelöscht.
          </Text>
        </Box>
      )}
    </LoggedInPage>
  );
}

export { TeacherProfilePage };
