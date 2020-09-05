import { useRouter } from "next/router";
import { Page } from "components/Page";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { Card, Text, Link, Button, Heading } from "rebass";
import { Grid } from "theme-ui";
import { Label, Input } from "@rebass/forms";
import CheckLogin from "components/CheckLogin";
import { QForm, ErrorBox } from "components/forms";
import {
  useAccessToken,
  useSetAccessToken,
  useUser,
  useSetUser,
} from "../../state/user";

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
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
  mutation($email: String!, $purpose: String!) {
    emailVerification(email: $email, purpose: $purpose) {
      token # this is not really need, just a placeholder
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation($password: String!) {
    changePassword(password: $password) {
      token # this is not really need, just a placeholder
    }
  }
`;

export const CHECK_VERIFICATION = gql`
  mutation($token: String!) {
    checkVerification(token: $token) {
      token
      user {
        ...LoginFields
      }
    }
  }
  ${CheckLogin.fragments.LoginFields}
`;

export default function Login() {
  const { t: token } = useRouter().query;
  const { p: purpose } = useRouter().query;
  const user = useUser();

  if (user) {
    return (
      <Page heading="Angemeldet">
        <AfterLogin />
      </Page>
    );
  }

  // purpose: verification, reset, login
  if (token) {
    return (
      <Page heading="Anmelden">
        <CheckToken token={token} purpose={purpose} />
      </Page>
    );
  } else {
    return (
      <Page heading="Anmelden">
        <CheckLogin />
        <Text>
          Hier kannst Du dich mit Deiner Schul-Emailadresse anmelden, wenn Du
          bereits einen Benutzeraccount bei voty hast.
        </Text>
        <LoginForm />
      </Page>
    );
  }
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [requestReset, setRequestReset] = useState(undefined);
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const [doLogin, resultLogin] = useMutation(LOGIN, {
    onCompleted(data) {
      setUser(data.login.user);
      setAccessToken(data.login.token);
    },
    onError(error) {
      if (error.message === "ERR_USER_PASSWORD") {
        return setError("Email oder Passwort passen leider nicht zueinander…");
      } else if (error.message === "ERR_EMAIL_NOT_VERIFIED") {
        return setEmailError(email);
      } else {
        return setError(error.message);
      }
    },
  });
  if (typeof requestReset === "string") {
    return <RequestReset email={requestReset} />;
  }

  if (emailError) {
    return <VerificationForm email={emailError} />;
  }
  return (
    <>
      <Card my={3}>
        <Grid gap={2} columns={[0, 0, "1fr 3fr"]}>
          <Label>Email:</Label>
          <Input
            autoFocus
            autoCapitalize="none"
            value={email}
            name="email"
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setEmail(event.currentTarget.value)
            }
          />
          <Label>Password:</Label>

          <Input
            value={password}
            name="password"
            type="password"
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setPassword(event.currentTarget.value)
            }
          />

          <span />
          <Button onClick={() => doLogin({ variables: { email, password } })}>
            Anmelden
          </Button>
          <ErrorBox error={error} />
          <span />
          <Grid gap={2} columns={[0, 0, "3fr 2fr"]}>
            <Button
              onClick={() => router.push("/user/signup")}
              variant="outline"
            >
              Ich habe noch keinen Account
            </Button>
            <Button
              onClick={() => setRequestReset(email ? email : "")}
              variant="outline"
            >
              Passwort vergessen?
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

function VerificationForm({ email }) {
  const [mailSent, setMailSent] = useState(false);
  const [error, setError] = useState("");

  const [doVerification, resultVerification] = useMutation(EMAIL_VERIFICATION, {
    onCompleted(data) {
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
    </>
  );
}

function AfterLogin() {
  const user = useUser();
  const router = useRouter();

  if (user && user.role) {
    let page = "";
    switch (user.role) {
      case "TEACHER":
        page = "/user/teacher";
        break;
      case "STUDENT":
        page = "/user/student";
        break;
      case "ADMIN":
        page = "/admin";
        break;
      default:
        page = "/";
    }

    const next = () => router.push(page);
    setTimeout(next, 2000);
    return (
      <>
        <Heading as="h2">Super, Du bist angemeldet.</Heading>
        <Button onClick={next}>Zu Deiner Startseite</Button>
      </>
    );
  } else {
    return (
      <Heading as="h2">
        Etwas ist hier schief... Du hast keine Rolle im System hinterlegt :-/
      </Heading>
    );
  }
}

export function LogoutButton({ onSuccess = null, ...props }) {
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const router = useRouter();

  function onLogout() {
    setAccessToken("");
    setUser(undefined);
    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/");
    }
  }
  return (
    <Button onClick={() => onLogout()} {...props}>
      Abmelden
    </Button>
  );
}

function CheckToken({ token, purpose }) {
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const [error, setError] = useState("");
  const [tempUser, setTempUser] = useState();
  const router = useRouter();
  const [doVerification, resultVerification] = useMutation(CHECK_VERIFICATION, {
    onCompleted: (data) => {
      setTempUser(data.checkVerification.user);
      setAccessToken(data.checkVerification.token);
    },
    onError(error) {
      setError("Dieser Email-Link ist leider nicht mehr gültig.");
      console.log(error.message);
    },
  });

  useEffect(() => {
    doVerification({ variables: { token } });
  }, []);

  // token verification succeded, we have a session & user
  if (tempUser) {
    // login -> go straight back
    if (purpose === "login") {
      setUser(tempUser);
    }
    if (purpose === "verification") {
      return (
        <>
          <Heading as="h2">Email bestätigt</Heading>
          <Text mb={4}>Super, Deine Email-Adresse ist nun bestätigt.</Text>
          <Button onClick={() => router.push("/")}>Weiter geht's</Button>
        </>
      );
    }
    if (purpose === "reset") {
      return <PasswordResetForm finished={() => setUser(tempUser)} />;
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

function RequestReset({ email }) {
  const [mailSent, setMailSent] = useState(false);
  const [emailField, setEmailField] = useState(email);
  const [error, setError] = useState("");
  const [doRequestReset] = useMutation(EMAIL_VERIFICATION, {
    onCompleted(data) {
      setMailSent(true);
      setError("");
    },
    onError(error) {
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
        <Grid gap={2} columns={[0, 0, "1fr 3fr"]}>
          <Label>Email:</Label>
          <Input
            autoFocus
            autoCapitalize="none"
            value={emailField}
            name="email"
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setEmailField(event.currentTarget.value)
            }
          />
          <span />
          <Button
            onClick={() =>
              doRequestReset({
                variables: { email: emailField, purpose: "reset" },
              })
            }
            variant={mailSent ? "muted" : "primary"}
            disabled={mailSent}
          >
            {mailSent ? "Email verschickt!" : "Email schicken"}
          </Button>
          <span />
          <ErrorBox error={error} />
        </Grid>
      </Card>
    </>
  );
}

function PasswordResetForm({ finished }) {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [doChangePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted(data) {
      setSuccess(true);
    },
    onError(error) {
      setError("Es ist ein Fehler aufgetreten.");
    },
  });

  function checkPasswords(pw1, pw2) {
    if (pw1 !== pw2) {
      setError("Die beiden Passwörter stimmen nicht überein…");
    }
    doChangePassword({ variables: { password } });
  }
  if (success) {
    return (
      <>
        <Heading as="h2">Passwort geändert</Heading>
        <Text mb={4}>Super, das hat geklappt.</Text>
        <Button onClick={() => router.push("/")}>Weiter geht's</Button>
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
