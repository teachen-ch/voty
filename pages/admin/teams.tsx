import { LoggedInPage } from "../../components/Page";
import { Teams } from "../../components/Teams";
import { ReactElement } from "react";
import { A, Breadcrumb, Here } from "components/Breadcrumb";
import { useRouter } from "next/router";

export default function TeamsPage(): ReactElement {
  const router = useRouter();

  return (
    <LoggedInPage heading="Klassen">
      <Breadcrumb>
        <A href="/admin">Admin</A>
        <Here>Klassen</Here>
      </Breadcrumb>
      <Teams teamClick={(team) => router.push(`/team/${team.id}/admin`)} />
    </LoggedInPage>
  );
}
