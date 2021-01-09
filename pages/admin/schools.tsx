import { LoggedInPage } from "components/Page";
import { Schools } from "components/Schools";
import { ReactElement } from "react";
import { A, Here, Breadcrumb } from "components/Breadcrumb";

export default function SchoolsPage(): ReactElement {
  return (
    <LoggedInPage heading="Schulen">
      <Breadcrumb>
        <A href="/admin">Admin</A>
        <Here>Schulen</Here>
      </Breadcrumb>
      <Schools />
    </LoggedInPage>
  );
}
