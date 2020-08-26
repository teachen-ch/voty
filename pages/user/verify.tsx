import { csrfToken } from "next-auth/client";
import { Page, PageHeading } from "components/Page";
import { Text, Heading } from "rebass";

export default function Verify() {
  return (
    <Page>
      <PageHeading>Email verschickt</PageHeading>
      <Heading as="h2" textAlign="center">
        Wir haben Dir einen Login-Link an Deine Email-Adresse geschickt.
      </Heading>
      <h1>💌</h1>
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
