import Head from "next/head";
import { Page, PageHeading } from "components/Page";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Box, Flex, Text, Link, Button } from "rebass";
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
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
  //console.log('Loading: ', loading);
  const [doLogin, resultLogin] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setUser(data.login.user);
      localStorage.setItem("@token", data.login.token);
    },
  });

  function onLogin() {
    console.log("Login", email, password);
    doLogin({ variables: { email, password } });
  }

  function onLogout() {
    localStorage.setItem("@token", "");
    setUser(undefined);
    setPassword("");
    setEmail("");
    setMessage("");
  }

  /********** Render ************/

  if (loading || resultLogin.loading) {
    return (
      <div>
        <h3>loading...</h3>
      </div>
    );
  }

  if (user) {
    return (
      <Page>
        <Head>
          <title>voty - Anmeldung</title>
        </Head>
        <Text>
          <b>Current User:</b> {user.name} {user.lastname}
        </Text>
        <button onClick={() => onLogout()}>Logout</button>
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
        <div>
          <Label>
            Email:
            <Input
              autoFocus
              autoCapitalize="none"
              value={email}
              name="email"
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setEmail(event.currentTarget.value)
              }
            />
          </Label>
          <Label>
            Password:
            <input
              value={password}
              name="password"
              type="password"
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setPassword(event.currentTarget.value)
              }
            />
          </Label>
          <Button onClick={() => onLogin()}>Anmelden</Button>
          <Text>{message}</Text>
        </div>
      </Page>
    );
  }
}
