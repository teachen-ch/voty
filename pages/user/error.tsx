import { csrfToken } from "next-auth/client";
import { Page, PageHeading } from "components/Page";
import { useRouter } from "next/router";
import { Heading, Link, Text } from "rebass";

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
      <PageHeading>Login - Fehler</PageHeading>
      <Heading as="h2">
        Es ist ein Fehler bei der Anmeldung aufgetreten:
      </Heading>
      <blockquote>{message}</blockquote>
      <Text textAlign="center">
        <Link href="/user/login" role="button" className="button primary">
          Nochmals versuchen
        </Link>
      </Text>
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
