import { Heading, Text, Flex, Button } from "rebass";
import { useState, ReactElement } from "react";
import { ErrorBox } from "../../components/Form";
import { SessionUser } from "state/user";
import { useEmailVerificationMutation } from "graphql/types";
import { usePageEvent } from "util/stats";
import { useRouter } from "next/router";

export default function Success({
  user,
}: {
  user?: SessionUser;
}): ReactElement {
  usePageEvent({ category: "Signup", action: "Success" });
  const router = useRouter();
  const [mailSent, setMailSent] = useState(false);
  const [error, setError] = useState("");
  const [doRequestReset] = useEmailVerificationMutation({
    onCompleted() {
      setMailSent(true);
      setError("");
    },
    onError() {
      setError("Es ist ein Fehler aufgetreten.");
    },
  });

  async function doResend() {
    await doRequestReset({
      variables: { email: String(user?.email), purpose: "verification" },
    });
  }
  return (
    <Flex
      flexDirection="column"
      minHeight="450px"
      sx={{ background: 'url("/images/voty_welcome.svg") center no-repeat' }}
    >
      <Heading mt={0}>Hallo {user?.name}</Heading>
      <Text>
        Dein neues Konto wurde erstellt und wir haben ein Email an die Adresse «
        {user?.email}» geschickt. Bitte öffne den Link in diesem Email, um Dich
        anzumelden.{" "}
      </Text>
      <Text my={4}>
        <strong>Keine Email erhalten?</strong> Bitte schau überprüfe Deine Email
        Adresse auf Tippfehler ({user?.email}) und schau im im Spam-Ordner nach.
      </Text>
      <Button variant="text" onClick={router.reload}>
        Ich habe mich vertippt...
      </Button>
      {!mailSent ? (
        <Button variant="text" onClick={doResend}>
          Bestätigungsmail nochmals senden
        </Button>
      ) : (
        "Das Bestätigungsmail wurde nochmals verschickt!"
      )}
      <ErrorBox error={error} />
    </Flex>
  );
}
