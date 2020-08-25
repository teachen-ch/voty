import Head from "next/head";
import Page from "components/Page";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

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
        <p>
          <b>Current User:</b> {user.name} {user.lastname}
        </p>
        <button onClick={() => onLogout()}>Logout</button>
      </Page>
    );
  } else {
    return (
      <Page>
        <Head>
          <title>voty - Anmeldung</title>
        </Head>
        <h1>Anmeldung</h1>
        <h2></h2>
        <p>
          Hier kannst Du dich mit Deiner Schul-Emailadresse anmelden, wenn Du
          bereits einen Benutzeraccount bei voty hast.
        </p>
        <div>
          <label>
            Email:
            <input
              autoFocus
              autoCapitalize="none"
              value={email}
              name="email"
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setEmail(event.currentTarget.value)
              }
            />
          </label>
          <label>
            Password:
            <input
              value={password}
              name="password"
              type="password"
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setPassword(event.currentTarget.value)
              }
            />
          </label>
          <button onClick={() => onLogin()} className="button primary">
            Anmelden
          </button>
          <p>{message}</p>
        </div>
      </Page>
    );
  }
}
