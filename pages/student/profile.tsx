import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Box, Link as A } from "components/ui";
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
      <ProfileEdit user={user} editMode={firstRun} />
      {!firstRun && (
        <Box className="mt-16 ml-0 sm:ml-[26%]">
          Ich möchte mein Konto auf voty.ch{" "}
          <Link href="/user/delete" passHref legacyBehavior>
            <A className="underline">löschen</A>
          </Link>
        </Box>
      )}
    </LoggedInPage>
  );
}

export { StudentProfilePage };
