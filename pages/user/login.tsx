import { csrfToken } from "next-auth/client";
import Head from "next/head";
import { Page, PageHeading } from "components/Page";
import { Box, Flex, Text, Link, Button } from "rebass";
import { Label, Input } from "@rebass/forms";

export default function Login({ csrfToken }: { csrfToken: string }) {
  return (
    <Page>
      <Head>
        <title>voty - Anmeldung</title>
      </Head>
      <PageHeading>Anmeldung</PageHeading>
      <Text>
        Hier kannst Du dich mit Deiner Schul-Emailadresse anmelden. Wir schicken
        Dir per Email einen Link mit dem Du Dich ohne Passwort anmelden kannst.
      </Text>
      <form method="post" action="/api/auth/signin/email" className="row">
        <Flex my={4} justifyContent="space-between">
          <Box width={1 / 6}>
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <Label htmlFor="email">Email: </Label>
          </Box>
          <Box width={1 / 2}>
            <Input id="email" name="email" />
          </Box>
          <Box width={1 / 4}>
            <Button type="submit">Login Link schicken</Button>
          </Box>
        </Flex>
      </form>
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await csrfToken(context),
    },
  };
}
