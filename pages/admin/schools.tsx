import { LoggedInPage } from "components/Page";
import { Schools } from "../../components/Schools";
import { ReactElement } from "react";

export default function SchoolsPage(): ReactElement {
  return (
    <LoggedInPage heading="Schulen">
      <Schools />
    </LoggedInPage>
  );
}
