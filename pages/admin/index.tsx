import { LoggedInPage } from "../../components/Page";
import Link from "next/link";
import { ReactElement } from "react";
import { Role } from "graphql/types";
import { A } from "components/Breadcrumb";

export default function AdminHome(): ReactElement {
  return (
    <LoggedInPage heading="Admin Bereich" role={Role.Admin}>
      <div className="leading-[2em]">
        <div><Link href="/admin/users"><A>😀 Benutzer</A></Link></div>
        <div><Link href="/admin/teachers"><A>🧑🏼‍🤝‍🧑🏻 Lehrpersonen</A></Link></div>
        <div><Link href="/admin/teams"><A>🖖 Klassen</A></Link></div>
        <div><Link href="/admin/schools"><A>🏫 Schulen</A></Link></div>
        <div><Link href="/admin/ballots"><A>🗳 Abstimmungen</A></Link></div>
        <div><Link href="/admin/stats"><A>📈 Statistiken</A></Link></div>
      </div>
    </LoggedInPage>
  );
}
