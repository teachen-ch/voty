import { Input, Label } from "@rebass/forms";
import CheckLogin from "components/CheckLogin";
import { ErrorBox } from "components/Form";
import { Loading, LoggedInPage, Page } from "components/Page";
import { Role, useChangePasswordMutation } from "graphql/types";
import { useRouter } from "next/router";
import { useState } from "react";
import { Text, Button, Heading } from "rebass";
import { useSetAccessToken, useSetUser, useUser } from "state/user";
import { Grid } from "theme-ui";
import { useQueryParam } from "util/hooks";
import { getQueryParam, getHost } from "util/isBrowser";
import { trackEvent, usePageEvent } from "util/stats";
import { getStartpage } from "./login";

export default function VerifiedPage(): React.ReactElement {
  const purpose = useQueryParam("p");
  const user = useUser();
  const router = useRouter();
  const redirect = ensureSameDomain(
    getQueryParam("redirect", { sanitize: true })
  );

  if (!user)
    return (
      <Page heading="Anmelden">
        <CheckLogin />
        <Loading />
      </Page>
    );

  const isTeacher = user?.role === Role.Teacher;
  // token verification succeded, we have a session & user
  if (purpose === "verification") {
    trackEvent({ category: "Login", action: "EmailVerified" });
    return (
      <LoggedInPage heading="Anmelden">
        <Text mb={4}>
          Super, Deine Email-Adresse ist nun bestätigt.{" "}
          {isTeacher
            ? "Dein Konto für Lehrpersonen ist nun eröffnet und Du bist bereits angemeldet."
            : ""}
        </Text>
        <Button onClick={() => router.push(getStartpage(user?.role))}>
          {isTeacher
            ? "Weiter geht's zur Auswahl Deiner Schule"
            : "Weiter geht's"}
        </Button>
      </LoggedInPage>
    );
  }
  if (purpose === "reset") {
    return (
      <LoggedInPage heading="Passwort ändern">
        <PasswordResetForm />
      </LoggedInPage>
    );
  } else {
    if (redirect) {
      void router.push(String(redirect));
    } else {
      void router.push(getStartpage(user?.role));
    }
    return <LoggedInPage />;
  }
}

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

  const [doChangePassword] = useChangePasswordMutation({
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

function ensureSameDomain(url?: string): string | undefined {
  const host = getHost();
  if (!host || !url) return undefined;
  if (url.startsWith("https://" + host + "/")) return url;
  if (url.startsWith("http://" + host + "/")) return url;
  return undefined;
}
