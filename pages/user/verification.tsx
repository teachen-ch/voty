import Head from "next/head";
import { Page, PageHeading } from "components/Page";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { Box, Flex, Text, Link, Button } from "rebass";
import { Grid } from "theme-ui";
import { Label, Input } from "@rebass/forms";

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

export default function Verification({ token }: { token: string }) {
  const [user, setUser] = useState<any | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [doVerification, resultVerification] = useMutation(CHECK_VERIFICATION, {
    onCompleted: (data) => {
      if (data.checkVerification?.error) {
        setMessage(data.checkVerification.error);
      } else {
        setUser(data.checkVerification.user);
        localStorage.setItem("@token", data.checkVerification.token);
      }
    },
  });

  useEffect(() => {
    doVerification({ variables: { token } });
  }, []);

  function onLogout() {
    localStorage.setItem("@token", "");
    setUser(undefined);
    setMessage("Logout erfolgreich");
  }
  /********** Render ************/

  console.log("TOKEN: ", token);

  if (resultVerification.loading) {
    return (
      <div>
        <h3>loading...</h3>
      </div>
    );
  }

  if (resultVerification.data?.login?.error) {
    return (
      <Page>
        <PageHeading>Fehler</PageHeading>
        <Text mb={4}>Es ist ein Fehler aufgetreten</Text>
        <Text>{message}</Text>
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
        <PageHeading>Email-Anmeldung</PageHeading>
        <Text>now what?</Text>
      </Page>
    );
  }
}

export async function getServerSideProps(context) {
  const { t } = context.query;
  return {
    props: { token: t },
  };
}
