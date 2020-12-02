import { LoggedInPage } from "../../components/Page";
import { Teams } from "../../components/Teams";
import { ReactElement } from "react";
import { A, Breadcrumb } from "components/Breadcrumb";
import { useRouter } from "next/router";

export default function TeamsPage(): ReactElement {
  const router = useRouter();

  return (
    <LoggedInPage heading="Klassen">
      <Breadcrumb>
        <A href="/admin">Admin</A>
        <b>Klassen</b>
      </Breadcrumb>
      <Teams
        teamClick={(team) => router.push(`/teacher/team/${team.id}/admin`)}
      />
    </LoggedInPage>
  );
}
