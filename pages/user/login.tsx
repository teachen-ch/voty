import Head from "next/head";
import { useRouter, Router } from "next/router";
import { Page, PageHeading, ErrorPage } from "components/Page";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { Card, Text, Link, Button } from "rebass";
import { Grid } from "theme-ui";
import { Label, Input } from "@rebass/forms";

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        lastname
      }
      error
    }
  }
`;

export const EMAIL_VERIFICATION = gql`
  mutation($email: String!, $purpose: String!) {
    emailVerification(email: $email, purpose: $purpose) {
      error
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation($password: String!) {
    changePassword(password: $password) {
      error
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      name
      lastname
      email
      role
    }
  }
`;

export const CHECK_VERIFICATION = gql`
  mutation($token: String!) {
    checkVerification(token: $token) {
      token
      user {
        id
        name
        lastname
      }
      error
    }
  }
`;

export default function Login() {
  const { t: token } = useRouter().query;
  const { p: purpose } = useRouter().query;

  const [user, setUser] = useState();
  const [requestReset, setRequestReset] = useState("");
  const [emailError, setEmailError] = useState("");
  useQuery(ME, {
    onCompleted: (data) => {
      if (data) {
        setUser(data.me);
      } else {
        setUser(undefined);
      }
    },
  });

  if (user) {
    return <LoggedIn user={user} setUser={setUser} />;
  }
  if (requestReset) {
    return <RequestReset email={requestReset} />;
  }

  if (emailError) {
    return <VerificationForm email={emailError} />;
  }

  // purpose: verification, reset, login
  if (token) {
    return <CheckToken token={token} purpose={purpose} setUser={setUser} />;
  } else {
    return (
      <LoginForm
        setEmailError={setEmailError}
        setUser={setUser}
        setRequestReset={setRequestReset}
      />
    );
  }
}

function LoginForm({ setEmailError, setUser, setRequestReset }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [doLogin, resultLogin] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const err = data.login?.error;
      if (err === "ERR_USER_PASSWORD") {
        setError("Email oder Passwort passen leider nicht zueinander…");
      }
      if (err === "ERR_EMAIL_NOT_VERIFIED") {
        setEmailError(email);
      }
      if (!err) {
        setUser(data.login.user);
        localStorage.setItem("@token", data.login.token);
      }
    },
  });
  function requestReset() {
    if (email) {
      setRequestReset(email);
    } else {
      setError("Bitte gib Deine Email-Adresse ein");
    }
  }
  return (
    <Page>
      <PageHeading>Anmeldung</PageHeading>
      <Text>
        Hier kannst Du dich mit Deiner Schul-Emailadresse anmelden, wenn Du
        bereits einen Benutzeraccount bei voty hast.
      </Text>
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
          <span />
          <Button onClick={() => router.push("/user/signup")} variant="outline">
            Ich habe noch keinen Account
          </Button>
          <ErrorBox error={error} />
          <Text sx={{ gridColumn: "2" }}>
            <Link onClick={requestReset}>Passwort vergessen?</Link> Wir können
            Dir ein Email schicken…
          </Text>
        </Grid>
      </Card>
    </Page>
  );
}

function VerificationForm({ email }) {
  const [mailSent, setMailSent] = useState(false);
  const [error, setError] = useState("");

  const [doVerification, resultVerification] = useMutation(EMAIL_VERIFICATION, {
    onCompleted: (data) => {
      console.log("DONE: ", data);
      if (data.emailVerification?.error) {
        setError(data.emailVerification.error);
      } else {
        setMailSent(true);
      }
    },
  });
  return (
    <Page>
      <PageHeading>Email bestätigen</PageHeading>
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
    </Page>
  );
}

function LoggedIn({ user, setUser }) {
  function onLogout() {
    localStorage.setItem("@token", "");
    setUser(undefined);
    /*setPassword("");
    setEmail("");
    setError("");*/
  }
  return (
    <Page>
      <PageHeading>Angemeldet</PageHeading>
      <Text mb={4}>
        Du bist angemeldet als «{user.name} {user.lastname}»
      </Text>
      <Button onClick={() => onLogout()}>Abmelden</Button>
    </Page>
  );
}

function CheckToken({ token, purpose, setUser }) {
  const [error, setError] = useState("");
  const [tempUser, setTempUser] = useState();
  const router = useRouter();
  const [doVerification, resultVerification] = useMutation(CHECK_VERIFICATION, {
    onCompleted: (data) => {
      if (data.checkVerification?.error) {
        setError("Dieser Email-Link ist leider nicht mehr gültig.");
      } else {
        setTempUser(data.checkVerification.user);
        localStorage.setItem("@token", data.checkVerification.token);
      }
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
        <Page>
          <PageHeading>Email bestätigt</PageHeading>
          <Text mb={4}>Super, Deine Email-Adresse ist nun bestätigt.</Text>
          <Button onClick={() => router.push("/")}>Weiter geht's</Button>
        </Page>
      );
    }
    if (purpose === "reset") {
      return <PasswordResetForm finished={() => setUser(tempUser)} />;
    }
  }

  if (error) {
    return (
      <Page>
        <PageHeading>Fehler</PageHeading>
        <Text mb={4}>{error}</Text>
        <Button as="a" href="/user/login">
          zurück
        </Button>
      </Page>
    );
  }

  return (
    <Page>
      <PageHeading>Überprüfen…</PageHeading>
    </Page>
  );
}

function RequestReset({ email }) {
  const [mailSent, setMailSent] = useState(false);
  const [error, setError] = useState("");
  const [doRequestReset] = useMutation(EMAIL_VERIFICATION, {
    onCompleted: (data) => {
      console.log("Email verification done", data);
      if (data.emailVerification?.error) {
        setError("Es ist ein Fehler aufgetreten.");
      } else {
        setMailSent(true);
      }
    },
  });

  return (
    <Page>
      <PageHeading>Passwort zurücksetzen</PageHeading>
      <Text>Du hast Dein Passwort vergessen?</Text>
      <Text mb={4}>
        Wir schicken Dir eine Email an «{email}
        », dann kannst Du es zurücksetzen.
      </Text>
      <Button
        onClick={() =>
          doRequestReset({ variables: { email, purpose: "reset" } })
        }
        variant={mailSent ? "muted" : "primary"}
        disabled={mailSent}
      >
        {mailSent ? "Email verschickt!" : "Email schicken"}
      </Button>
      <ErrorBox error={error} />
    </Page>
  );
}

function PasswordResetForm({ finished }) {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [doChangePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted: (data) => {
      if (data.changePassword?.error) {
        setError("Es ist ein Fehler aufgetreten.");
      } else {
        setSuccess(true);
      }
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
      <Page>
        <PageHeading>Passwort geändert</PageHeading>
        <Text mb={4}>Super, das hat geklappt.</Text>
        <Button onClick={() => router.push("/")}>Weiter geht's</Button>
      </Page>
    );
  }
  return (
    <Page>
      <PageHeading>Passwort ändern</PageHeading>
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
    </Page>
  );
}

const ErrorBox = (props) => (
  <Text sx={{ gridColumn: "2" }} fontWeight="bold" color="primary">
    {props.error}
  </Text>
);
