import { LoggedInPage } from "components/Page";
import { useUser } from "state/user";
import { Schools } from "../../components/Schools";

export default function SchoolsPage() {
  return (
    <LoggedInPage heading="Schulen">
      <Schools />
    </LoggedInPage>
  );
}
