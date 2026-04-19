import { LoggedInPage } from "../../components/Page";
import { ReactElement } from "react";
import { Role } from "graphql/types";
import { A } from "components/A";

export default function AdminHome(): ReactElement {
  return (
    <LoggedInPage heading="Admin Bereich" role={Role.Admin}>
      <div className="leading-[2em]">
        <div><A href="/admin/users">😀 Benutzer</A></div>
        <div><A href="/admin/teachers">🧑🏼‍🤝‍🧑🏻 Lehrpersonen</A></div>
        <div><A href="/admin/teams">🖖 Klassen</A></div>
        <div><A href="/admin/schools">🏫 Schulen</A></div>
        <div><A href="/admin/ballots">🗳 Abstimmungen</A></div>
        <div><A href="/admin/stats">📈 Statistiken</A></div>
      </div>
    </LoggedInPage>
  );
}
