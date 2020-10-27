import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Box, Text, Link as A } from "rebass";
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
    <LoggedInPage heading="Dein Profil">
      {firstRun && "Bitte ergänze Deine Angaben…"}
      <ProfileEdit user={user} editMode={firstRun} />

      <Box mt={4}>
        <SelectSchool />
      </Box>

      {!firstRun && (
        <Box mt={5} ml={[0, 0, "26%"]}>
          Ich möchte mein Konto auf voty.ch{" "}
          <Link href="/user/delete">
            <A variant="underline">löschen</A>
          </Link>
          .
          <Text fontSize={2}>
            Achtung, dabei werden auch Deine Klassen gelöscht. Konten der
            Schüler*innen werden nicht automatisch gelöscht.
          </Text>
        </Box>
      )}
    </LoggedInPage>
  );
}

export { TeacherProfilePage };
