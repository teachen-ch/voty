import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Box, Link as A } from "rebass";
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
    <LoggedInPage heading="Profil bearbeiten">
      {firstRun && "Bitte ergänze Deine Angaben…"}
      <ProfileEdit user={user} editMode={firstRun} />

      {!firstRun && (
        <Box mt={5}>
          Ich möchte mein Konto auf voty.ch{" "}
          <Link href="/user/delete">
            <A variant="underline">löschen</A>
          </Link>
        </Box>
      )}
    </LoggedInPage>
  );
}

export { StudentProfilePage };
