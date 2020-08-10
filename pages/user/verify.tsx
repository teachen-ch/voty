import { csrfToken } from "next-auth/client";

export default function Verify() {
  return (
    <Page>
      <h1>Email verschickt</h1>
      Wir haben Dir einen Login-Link an Deine Email-Adresse geschickt.
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
