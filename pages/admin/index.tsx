import { LoggedInPage } from "../../components/Page";
import { Text, Link as A } from "rebass";
import Link from "next/link";
import { ReactElement } from "react";
import { Role } from "graphql/types";

export default function Teacher(): ReactElement {
  return (
    <LoggedInPage heading="Admin Bereich" role={Role.Admin}>
      <Text lineHeight="2em">
        <Text>
          <Link href="/admin/teachers">
            <A>🧑🏼‍🤝‍🧑🏻 Lehrpersonen</A>
          </Link>
        </Text>
        <Text>
          <Link href="/admin/teams">
            <A>🖖 Klassen</A>
          </Link>
        </Text>
        <Text>
          <Link href="/admin/schools">
            <A>🏫 Schulen</A>
          </Link>
        </Text>
      </Text>
    </LoggedInPage>
  );
}
