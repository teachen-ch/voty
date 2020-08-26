import { csrfToken } from "next-auth/client";
import Page from "components/Page";
import { useRouter } from "next/router";

export default function Verify() {
  const router = useRouter();
  const { error } = router.query;

  let message = "";
  switch (error) {
    case "Verification":
      message = "Dieser Email-Link ist nicht mehr gültig.";
      break;
    default:
      message = String(error);
  }

  return (
    <Page>
      <h1>Login - Fehler</h1>
      <h2>Es ist ein Fehler bei der Anmeldung aufgetreten:</h2>
      <blockquote>{message}</blockquote>
      <p className="is-center">
        <a href="/user/login" role="button" className="button primary">
          Nochmals versuchen
        </a>
      <Text>
      <h1>🐛</h1>
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
