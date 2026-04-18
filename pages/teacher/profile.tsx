import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Box, Text, Link as A } from "components/ui";
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

      <Box className="mt-8">
        <SelectSchool />
      </Box>

      {!firstRun && (
        <Box className="mt-16 ml-0 sm:ml-[26%]">
          Ich möchte mein Konto auf voty.ch{" "}
          <Link href="/user/delete" passHref legacyBehavior>
            <A className="underline">löschen</A>
          </Link>
          .
          <Text className="text-base">
            Achtung, dabei werden auch deine Klassen gelöscht. Konten der
            Schüler*innen werden nicht automatisch gelöscht.
          </Text>
        </Box>
      )}
    </LoggedInPage>
  );
}

export { TeacherProfilePage };
