import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Box, Text, Link as A } from "rebass";
import { ReactElement } from "react";
import Link from "next/link";
import { ProfileEdit } from "components/Users";
import { SelectSchool } from "../../components/Schools";
import { Role } from "graphql/types";

export default function TeacherProfilePage({
  firstRun,
}: {
  firstRun?: boolean;
}): ReactElement {
  const user = useUser();

  return (
    <LoggedInPage heading="Dein Profil" role={Role.Teacher}>
      {firstRun && "Bitte ergänze deine Angaben…"}
      <ProfileEdit user={user} editMode={firstRun} />
      <Box mt={4}>
        <SelectSchool />
      </Box>
      {!firstRun && (
        <Box mt={5} ml={[0, 0, "26%"]}>
          Ich möchte mein Konto auf voty.ch{" "}
          <Link href="/user/delete" passHref legacyBehavior>
            <A variant="underline">löschen</A>
          </Link>
          .
          <Text fontSize={2}>
            Achtung, dabei werden auch deine Klassen gelöscht. Konten der
            Schüler*innen werden nicht automatisch gelöscht.
          </Text>
        </Box>
      )}
    </LoggedInPage>
  );
}

export { TeacherProfilePage };
