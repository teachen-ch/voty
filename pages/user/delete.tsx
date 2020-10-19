import { ReactElement, useState } from "react";
import {
  useUser,
  SessionUser,
  useSetUser,
  useSetAccessToken,
} from "state/user";
import { Heading, Text, Card, Button, Link as A } from "rebass";
import { Page } from "components/Page";
import { Role, useDeleteAccountMutation } from "graphql/types";
import { useRouter } from "next/router";
import Link from "next/link";
import { gql } from "@apollo/client";
import { Grid } from "theme-ui";

export default function Delete(): ReactElement {
  const user = useUser();
  const role = user?.role;
  return (
    <Page heading="Konto löschen">
      <Heading as="h2">Ich möchte mein Konto auf voty löschen.</Heading>
      {role === Role.Student || (true && <DeleteForm user={user} />)}
    </Page>
  );
}

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount {
    deleteAccount {
      success
      error
      message
    }
  }
`;

const DeleteForm: React.FC<{ user: SessionUser }> = ({ user }) => {
  const router = useRouter();
  const setAccessToken = useSetAccessToken();
  const setUser = useSetUser();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [doDeleteAccount] = useDeleteAccountMutation({
    onCompleted: ({ deleteAccount }) => {
      if (deleteAccount?.success) {
        setAccessToken("");
        setUser(undefined);
        setSuccess(true);
      } else setError(true);
    },
    onError: () => {
      setError(true);
    },
  });

  if (success) {
    return (
      <Card>
        <Text>Dein Konto wurde erfolgreich gelöscht.</Text>
        <Text fontSize={6}>👋</Text>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Text>
          Leider hat die Löschung nicht geklappt! Bitte nimm mit uns{" "}
          <Link href="/kontakt">
            <A>Kontakt</A>
          </Link>{" "}
          auf.
        </Text>
      </Card>
    );
  }

  return (
    <>
      <Text>
        Schade! Wir würden uns freuen, wenn Du auch bei zukünftigen Abstimmungen
        auf voty mitmachst! Möchtest Du wirklich Dein Konto mit der Email{" "}
        {user?.email} löschen.
      </Text>
      <Grid my={4} columns={[0, 0, "1fr 1fr"]}>
        <Button onClick={() => doDeleteAccount()} variant="secondary">
          Mein Konto löschen
        </Button>
        <Button onClick={() => router.push("/student")}>
          Ich bleibe auf voty!
        </Button>
      </Grid>
    </>
  );
};
