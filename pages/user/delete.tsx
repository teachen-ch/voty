import { ReactElement, useState } from "react";
import {
  useUser,
  SessionUser,
  useSetUser,
  useSetAccessToken,
} from "state/user";
import { Heading, Text, Box, Button, Link as A } from "rebass";
import { Page } from "components/Page";
import { useDeleteAccountMutation } from "graphql/types";
import { useRouter } from "next/router";
import Link from "next/link";
import { gql } from "@apollo/client";
import { Grid } from "theme-ui";

export default function Delete(): ReactElement {
  const user = useUser();
  return (
    <Page heading="Konto löschen">
      <Heading as="h2">Ich möchte mein Konto auf voty.ch löschen.</Heading>
      <DeleteForm user={user} />
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

const DeleteForm: React.FC<React.PropsWithChildren<{ user: SessionUser }>> = ({ user }) => {
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
      <Box>
        <Text>Dein Konto wurde erfolgreich gelöscht.</Text>
        <Text fontSize={6}>👋</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Text>
          Leider hat die Löschung nicht geklappt! Bitte nimm mit uns{" "}
          <Link href="/kontakt" passHref>
            <A>Kontakt</A>
          </Link>{" "}
          auf.
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Text>
        Schade! Wir würden uns freuen, wenn du auch bei zukünftigen Abstimmungen
        auf voty.ch mitmachst! Möchtest du wirklich dein Konto mit der Email «
        {user?.email}» endgültig löschen?
      </Text>
      <Grid my={4} columns={[0, 0, "1fr 1fr"]}>
        <Button onClick={() => router.push("/user/profile")}>
          Ich bleibe auf voty.ch!
        </Button>
        <Button onClick={() => doDeleteAccount()} bg="danger">
          Mein Konto löschen
        </Button>
      </Grid>
    </>
  );
};
