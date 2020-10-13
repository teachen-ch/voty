import { useRouter } from "next/router";
import { Page } from "components/Page";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import { useState, useEffect, ReactElement } from "react";
import { Card, Text, Button, Heading } from "rebass";
import { Grid } from "theme-ui";
import { Label, Input } from "@rebass/forms";
import { QForm, ErrorBox } from "components/Form";
import CheckLogin from "components/CheckLogin";
import {
  useSetAccessToken,
  useUser,
  useSetUser,
  SessionUser,
} from "../../state/user";
import { useQueryParam } from "util/hooks";
import {
  Role,
  useLoginMutation,
  useCheckVerificationMutation,
  useEmailVerificationMutation,
} from "graphql/types";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        ...LoginFields
      }
    }
  }
  ${CheckLogin.fragments.LoginFields}
`;

export const EMAIL_VERIFICATION = gql`
  mutation emailVerification($email: String!, $purpose: String!) {
    emailVerification(email: $email, purpose: $purpose) {
      token # this is not really need, just a placeholder
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password) {
      token # this is not really need, just a placeholder
    }
  }
`;

export const CHECK_VERIFICATION = gql`
  mutation checkVerification($token: String!) {
    checkVerification(token: $token) {
      token
      user {
        ...LoginFields
      }
    }
  }
  ${CheckLogin.fragments.LoginFields}
`;

export default function Login(): ReactElement {
  const token = useQueryParam("t");
  const purpose = useQueryParam("p");
  const user = useUser();

  if (user) {
    return (
      <Page heading="Angemeldet">
        <AfterLogin />
      </Page>
    );
  }

  // purpose: verification, reset, login
  if (token && purpose) {
    return (
      <Page heading="Anmelden">
        <CheckToken token={token} purpose={purpose} />
      </Page>
    );
  } else {
    return (
      <Page heading="Anmelden">
        <Text>
          Hier kannst Du dich mit Deiner Schul-Emailadresse anmelden, wenn Du
          bereits ein Benutzer-Konto bei voty hast.
        </Text>
        <LoginForm />
      </Page>
    );
  }
}

export function LoginForm(): ReactElement {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [requestReset, setRequestReset] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const [doLogin, resultLogin] = useLoginMutation({
    onCompleted(data) {
      if (data.login && data.login.token) {
        console.log("LOGIN", data.login.token);
        setUser(data.login.user);
        setAccessToken(data.login.token);
      }
    },
    onError(error) {
      if (error.message === "ERR_USER_PASSWORD") {
        return setError("Email oder Passwort passen leider nicht zueinander…");
      } else if (error.message === "ERR_EMAIL_NOT_VERIFIED") {
        console.error(error, resultLogin.data);
        return setEmailError(email);
      } else {
        return setError(error.message);
      }
    },
  });
  if (typeof requestReset === "string") {
    return (
      <RequestReset
        email={requestReset}
        onCancel={() => setRequestReset(undefined)}
      />
    );
  }

  if (emailError) {
    return <VerificationForm email={emailError} />;
  }
  return (
    <Card>
      <QForm
        mutation={doLogin}
        fields={{
          email: {
            label: "Email:",
            required: true,
            type: "email",
            setter: setEmail,
            placeholder: "name@meineschule.ch",
          },
          password: {
            label: "Passwort:",
            type: "password",
            required: true,
          },
          submit: { type: "submit", label: "Anmelden" },
        }}
      >
        <ErrorBox error={error} />
        <span />
        <Grid gap={2} columns={[0, 0, "3fr 2fr"]}>
          <Button onClick={() => router.push("/user/signup")} variant="outline">
            Ich habe noch kein Benutzer-Konto
          </Button>
          <Button
            onClick={() => setRequestReset(email ? email : "")}
            variant="outline"
          >
            Passwort vergessen?
          </Button>
        </Grid>
      </QForm>
    </Card>
  );
}

function VerificationForm({ email }: { email: string }): ReactElement {
  const [mailSent, setMailSent] = useState(false);
  const [error, setError] = useState("");

  const [doVerification] = useMutation(EMAIL_VERIFICATION, {
    onCompleted() {
      setMailSent(true);
    },
    onError(error) {
      setError(error.message);
    },
  });
  return (
    <>
      <Heading as="h2">Email bestätigen</Heading>
      <Text mb={4}>
        Deine Email-Adresse «{email}» wurde noch nicht bestätigt.
        <br />
        Bitte klicke den Link im Aktivierungs-Email.
      </Text>
      <Text>Sollen wir Dir nochmals ein Email schicken?</Text>
      <Button
        onClick={() =>
          doVerification({ variables: { email, purpose: "verification" } })
        }
        my={3}
        disabled={mailSent}
        variant={mailSent ? "muted" : "primary"}
      >
        {mailSent ? "Email verschickt!" : "Email schicken"}
      </Button>
      <ErrorBox error={error} />
    </>
  );
}

function getStartpage(role?: string) {
  let page = "";
  switch (role) {
    case Role.Teacher:
      page = "/teacher";
      break;
    case Role.Student:
      page = "/student";
      break;
    case Role.Admin:
      page = "/admin";
      break;
    default:
      page = "/";
  }
  return page;
}

function AfterLogin() {
  const user = useUser();
  const router = useRouter();

  if (user && user.role) {
    const page = getStartpage(user.role);
    void router.push(page);
    return null;
  } else {
    return (
      <Heading as="h2">
        Etwas ist hier schief... Du hast keine Rolle im System hinterlegt :-/
      </Heading>
    );
  }
}

function CheckToken({ token, purpose }: { token: string; purpose: string }) {
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

  // token verification succeded, we have a session & user
  if (tempUser !== undefined) {
    // login -> go straight back
    if (purpose === "login") {
      setUser(tempUser);
    }
    if (purpose === "verification") {
      return (
        <>
          <Heading as="h2">Email bestätigt</Heading>
          <Text mb={4}>Super, Deine Email-Adresse ist nun bestätigt.</Text>
          <Button onClick={() => router.push(getStartpage(tempUser?.role))}>
            Weiter geht&apos;s
          </Button>
        </>
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
}

function RequestReset({
  email,
  onCancel,
}: {
  email: string;
  onCancel: () => void;
}) {
  const [mailSent, setMailSent] = useState(false);
  const [error, setError] = useState("");
  const [doRequestReset] = useEmailVerificationMutation({
    onCompleted() {
      setMailSent(true);
      setError("");
    },
    onError() {
      setError("Es ist ein Fehler aufgetreten.");
    },
  });

  return (
    <>
      <Card my={3}>
        <Heading as="h2" mt={0}>
          Passwort zurücksetzen
        </Heading>
        <Text mb={4}>
          Du hast Dein Passwort vergessen? Wir schicken Dir eine Email, dann
          kannst Du es zurücksetzen.
        </Text>
        <QForm
          mutation={doRequestReset}
          onSubmit={(values) => {
            if (mailSent) onCancel();
            else {
              void doRequestReset({
                variables: { email: String(values.email), purpose: "reset" },
              });
            }
          }}
          fields={{
            email: {
              label: "Email:",
              required: true,
              type: "email",
              placeholder: "name@meineschule.ch",
            },
            submit: {
              type: "submit",
              label: mailSent ? "Login" : "Email verschicken",
            },
          }}
        >
          <span />
          <Button onClick={onCancel} variant="outline">
            Abbrechen
          </Button>
          <span />
          <ErrorBox error={error} />
          {mailSent && (
            <>
              <span>Wir haben Dir ein Email geschickt</span>
            </>
          )}
        </QForm>
      </Card>
    </>
  );
}

function PasswordResetForm() {
  const user = useUser();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [doChangePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted() {
      setSuccess(true);
    },
    onError() {
      setError("Es ist ein Fehler aufgetreten.");
    },
  });

  async function checkPasswords(pw1: string, pw2: string) {
    if (pw1 !== pw2) {
      setError("Die beiden Passwörter stimmen nicht überein…");
    }
    return doChangePassword({ variables: { password } });
  }
  if (success) {
    return (
      <>
        <Heading as="h2">Passwort geändert</Heading>
        <Text mb={4}>Super, das hat geklappt.</Text>
        <Button onClick={() => router.push(getStartpage(user?.role))}>
          Weiter geht&apos;s
        </Button>
      </>
    );
  }
  return (
    <>
      <Heading as="h2">Passwort ändern</Heading>
      <Card my={3}>
        <Grid gap={2} columns={[0, 0, "1fr 3fr"]}>
          <Label>Neues Passwort:</Label>
          <Input
            autoFocus
            autoCapitalize="none"
            value={password}
            name="password"
            type="password"
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setPassword(event.currentTarget.value)
            }
          />
          <Label>Password wiederholen:</Label>
          <Input
            value={password2}
            name="password2"
            type="password"
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setPassword2(event.currentTarget.value)
            }
          />
          <span />
          <Button onClick={() => checkPasswords(password, password2)}>
            Passwort ändern
          </Button>
          <ErrorBox error={error} />
        </Grid>
      </Card>
    </>
  );
}
