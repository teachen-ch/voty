import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Box } from "components/ui";
import { ReactElement } from "react";
import { A } from "components/A";
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
          <A href="/user/delete" className="underline">löschen</A>
        </Box>
      )}
    </LoggedInPage>
  );
}

export { StudentProfilePage };
