import { Heading, Text, Flex, Button, Image } from "rebass";
import { useState, ReactElement } from "react";
import { ErrorBox } from "../../components/Form";
import { SessionUser } from "state/user";
import { useEmailVerificationMutation } from "graphql/types";
import { AppPage } from "components/Page";
import { usePageEvent } from "util/stats";

export default function Success({
  user,
}: {
  user?: SessionUser;
}): ReactElement {
  usePageEvent({ category: "Signup", action: "Success" });
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
    <AppPage heading="Dein Konto ist erstellt">
      <Flex flexDirection="column" minHeight="400px">
        <Image
          alt="Willkommen"
          src="/images/voty_welcome.svg"
          maxWidth={["80%", "80%", "40%"]}
          display={["none", "none", "inline"]}
          sx={{ position: "absolute", alignSelf: "center" }}
        />
        <Heading mt={0}>Hallo {user?.name}</Heading>
        <Text>
          Dein neues Konto wurde erstellt und wir haben ein Email an die Adresse
          «{user?.email}» geschickt. Bitte öffne den Link in diesem Email, um
          Dich anzumelden.{" "}
        </Text>
        <Text my={4}>
          Solltest Du kein Email von voty.ch in der Inbox Deines Email-Accounts
          finden, dann schau doch bitte im Spam-Ordner nach.
        </Text>
        {!mailSent ? (
          <Button variant="text" onClick={doResend}>
            Bestätigungsmail nochmals senden
          </Button>
        ) : (
          "Das Bestätigungsmail wurde nochmals verschickt!"
        )}
        <ErrorBox error={error} />
      </Flex>
    </AppPage>
  );
}
