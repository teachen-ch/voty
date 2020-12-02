import { useRouter } from "next/router";
import { useMutation, useApolloClient } from "@apollo/client";
import { useState, useEffect } from "react";
import { Text, Box, Button, Heading } from "rebass";
import { Grid } from "theme-ui";
import { Label, Input } from "@rebass/forms";
import { AppPage, Loading } from "components/Page";
import { ErrorBox } from "components/Form";
import { usePageEvent, trackEvent } from "util/stats";
import { useQueryParam } from "util/hooks";
import {
  useSetAccessToken,
  useUser,
  useSetUser,
  SessionUser,
} from "../../state/user";
import { Role, useCheckVerificationMutation } from "graphql/types";
import { getStartpage, CHANGE_PASSWORD } from "./login";

export default function VerifyPage(): React.ReactElement {
  const token = useQueryParam("t");
  const purpose = useQueryParam("p");
  const router = useRouter();

  if (!token || !purpose) {
    return (
      <AppPage heading="Anmelden">
        <Loading />
      </AppPage>
    );
  }

  return (
    <AppPage heading="Anmelden" onClose={() => void router.push("/")}>
      <CheckToken token={token} purpose={purpose} />
    </AppPage>
  );
}

const CheckToken: React.FC<{
  token: string;
  purpose: string;
}> = ({ token, purpose }) => {
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const [error, setError] = useState("");
  const [tempUser, setTempUser] = useState<SessionUser | undefined | null>();
  const router = useRouter();
  const client = useApolloClient();
  const [doVerification] = useCheckVerificationMutation({
    onCompleted: (data) => {
      if (data.checkVerification && data.checkVerification.token) {
        setTempUser(data.checkVerification.user);
        setAccessToken(data.checkVerification.token);
      }
    },
    onError(error) {
      setError("Dieser Email-Link ist leider nicht mehr gültig!");
      console.error(error.message);
    },
  });

  useEffect(() => {
    // first logout current user, as doVerification will auto-login user based on token
    void client.clearStore();
    setAccessToken("");
    setUser(undefined);
    void doVerification({ variables: { token } });
  }, []);

  const isTeacher = tempUser?.role === Role.Teacher;
  // token verification succeded, we have a session & user
  if (tempUser !== undefined) {
    // login -> go straight back
    if (purpose === "login") {
      setUser(tempUser);
    }
    if (purpose === "verification") {
      trackEvent({ category: "Login", action: "EmailVerified" });
      return (
        <Box>
          <Text mb={4}>
            Super, Deine Email-Adresse ist nun bestätigt.{" "}
            {isTeacher
              ? "Dein Konto für Lehrpersonen ist nun eröffnet und Du bist bereits angemeldet."
              : ""}
          </Text>
          <Button onClick={() => router.push(getStartpage(tempUser?.role))}>
            {isTeacher
              ? "Weiter geht's zur Auswahl Deiner Schule"
              : "Weiter geht's"}
          </Button>
        </Box>
      );
    }
    if (purpose === "reset") {
      return <PasswordResetForm />;
    }
  }

  if (error) {
    return (
      <>
        <Heading as="h2">Fehler</Heading>
        <Text mb={4}>{error}</Text>
        <Button as="a" href="/user/login">
          zurück
        </Button>
      </>
    );
  }

  return <Text>Überprüfen</Text>;
};
function PasswordResetForm() {
  usePageEvent({ category: "Login", action: "PasswordRequest" });
  const user = useUser();
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [doChangePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted({ changePassword }) {
      if (changePassword && changePassword.token) {
        setUser(changePassword.user);
        setAccessToken(changePassword.token);
      }
      setSuccess(true);
    },
    onError() {
      setError("Es ist ein Fehler aufgetreten.");
    },
  });

  async function checkPasswords(pw1: string, pw2: string) {
    if (pw1 !== pw2) {
      return setError("Die beiden Passwörter stimmen nicht überein…");
    }
    return doChangePassword({ variables: { password } });
  }
  if (success) {
    return (
      <>
        <Heading as="h2">Passwort geändert</Heading>
        <Text mb={4}>Super, das hat geklappt.</Text>
        <Button onClick={() => router.replace(getStartpage(user?.role))}>
          Weiter geht&apos;s
        </Button>
      </>
    );
  }
  return (
    <>
      <Heading as="h2">Passwort ändern</Heading>
      <Grid gap={2} columns={[0, 0, "2fr 3fr"]}>
        <Label alignSelf="center">Neues Passwort:</Label>
        <Input
          autoCapitalize="none"
          value={password}
          name="password"
          type="password"
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setPassword(event.currentTarget.value)
          }
        />
        <Label alignSelf="center">Password wiederholen:</Label>
        <Input
          value={password2}
          name="password2"
          type="password"
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setPassword2(event.currentTarget.value)
          }
        />
        <Button
          onClick={() => checkPasswords(password, password2)}
          sx={{ gridColumn: [0, 0, 2] }}
        >
          Passwort ändern
        </Button>
        <ErrorBox error={error} />
      </Grid>
    </>
  );
}
