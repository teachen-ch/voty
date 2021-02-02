import { useRouter } from "next/router";
import { useApolloClient, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import { Text, Button, Heading } from "rebass";
import { AppPage, Loading } from "components/Page";
import { useQueryParam } from "util/hooks";
import { useSetAccessToken, useSetUser } from "../../state/user";
import { useCheckVerificationMutation } from "graphql/types";

export const CHECK_VERIFICATION = gql`
  mutation checkVerification($token: String!) {
    checkVerification(token: $token) {
      token
    }
  }
`;

export default function VerifyPage(): React.ReactElement {
  const token = useQueryParam("t");
  const purpose = useQueryParam("p");
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const [error, setError] = useState("");
  const router = useRouter();
  const client = useApolloClient();
  const redirect = useQueryParam("redirect");
  const [doVerification] = useCheckVerificationMutation({
    onCompleted: (data) => {
      if (data.checkVerification && data.checkVerification.token) {
        setAccessToken(data.checkVerification.token);
        void router.push(`/user/verified?p=${purpose}&redirect=${redirect}`);
      }
    },
    onError(error) {
      setError("Dieser Email-Link ist leider nicht mehr gültig!");
      console.error(error.message);
    },
  });

  useEffect(() => {
    if (token) {
      // first logout current user, as doVerification will auto-login user based on token
      void client.clearStore();
      setAccessToken("");
      setUser(undefined);
      void doVerification({ variables: { token } });
    }
  }, [token]);

  if (!token || !purpose) {
    return (
      <AppPage heading="Anmelden">
        <Loading />
      </AppPage>
    );
  }
  if (error) {
    return (
      <AppPage heading="Anmelden" onClose={() => void router.push("/")}>
        <Heading as="h2">Fehler</Heading>
        <Text mb={4}>{error}</Text>
        <Button as="a" href="/user/login">
          zurück
        </Button>
      </AppPage>
    );
  }

  return (
    <AppPage heading="Anmelden" onClose={() => void router.push("/")}>
      <Loading />
      Überprüfen
    </AppPage>
  );
}
