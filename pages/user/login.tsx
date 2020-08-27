import Head from "next/head";
import { Page, PageHeading } from "components/Page";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Box, Flex, Text, Link, Button } from "rebass";
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

export const EMAIL_VERIFICATION = gql`
  mutation($email: String!, $purpose: String!) {
    emailVerification(email: $email, purpose: $purpose) {
      error
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [mailSent, setMailSent] = useState(false);
  const [user, setUser] = useState<any | undefined>(undefined);
  const { loading } = useQuery(ME, {
    onCompleted: (data) => {
      console.log("Received: ", data);
      if (data) {
        setUser(data.me);
      } else {
        setUser(undefined);
      }
    },
  });
  const [doLogin, resultLogin] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const err = data.login?.error;
      if (err === "ERR_USER_PASSWORD") {
        setMessage("Email oder Passwort passen leider nicht zueinander…");
      }
      if (!err) {
        setUser(data.login.user);
        localStorage.setItem("@token", data.login.token);
      }
    },
  });
  const [doVerification, resultVerification] = useMutation(EMAIL_VERIFICATION, {
    onCompleted: (data) => {
      console.log("DONE: ", data);
      if (data.emailVerification?.error) {
        setMessage(data.emailVerification.error);
      } else {
        setMailSent(true);
      }
    },
  });

  function onLogin() {
    doLogin({ variables: { email, password } });
  }

  function onLogout() {
    localStorage.setItem("@token", "");
    setUser(undefined);
    setPassword("");
    setEmail("");
    setMessage("");
  }

  function onVerification() {
    doVerification({ variables: { email, purpose: "verification" } });
  }

  /********** Render ************/

  if (resultLogin.data?.login?.error === "ERR_EMAIL_NOT_VERIFIED") {
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
          onClick={onVerification}
          my={3}
          disabled={mailSent}
          variant={mailSent ? "muted" : "primary"}
        >
          {mailSent ? "Email verschickt!" : "Email schicken"}
        </Button>
      </Page>
    );
  }

  if (user) {
    return (
      <Page>
        <PageHeading>Angemeldet</PageHeading>
        <Text>
          <b>Current User:</b> {user.name} {user.lastname}
        </Text>
        <Button onClick={() => onLogout()}>Logout</Button>
      </Page>
    );
  } else {
    return (
      <Page>
        <Head>
          <title>voty - Anmeldung</title>
        </Head>
        <PageHeading>Anmeldung</PageHeading>

        <Text>
          Hier kannst Du dich mit Deiner Schul-Emailadresse anmelden, wenn Du
          bereits einen Benutzeraccount bei voty hast.
        </Text>
        <Grid
          gap={2}
          py={4}
          columns={[0, 0, "1fr 3fr"]}
          bg="lightgray"
          p={3}
          my={3}
        >
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
          <Button onClick={() => onLogin()}>Anmelden</Button>
          <Text sx={{ gridColumn: "2" }} fontWeight="bold" color="primary">
            {message}
          </Text>
        </Grid>
        {loading || (resultLogin.loading && "Loading...")}
      </Page>
    );
  }
}
