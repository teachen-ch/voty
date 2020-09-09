import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Heading, Text } from "rebass";
import { Schools } from "../admin/schools";
import { LogoutButton } from "../user/logout";
import Link from "next/link";

export default function Teacher() {
  const user = useUser();

  return (
    <LoggedInPage heading="Admin Bereich">
      <Text>
        <Link href="users">Users</Link>
      </Text>
      <Text>
        <Link href="teams">Teams</Link>
      </Text>
      <Text>
        <Link href="schools">Schools</Link>
      </Text>
      <LogoutButton my={4} />
    </LoggedInPage>
  );
}
