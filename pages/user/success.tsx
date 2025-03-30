import { Heading, Text, Flex, Button } from "rebass";
import { useState, ReactElement } from "react";
import { ErrorBox } from "../../components/Form";
import { SessionUser } from "state/user";
import { useEmailVerificationMutation } from "graphql/types";
import { usePageEvent } from "util/stats";
import { useRouter } from "next/router";
import { DE, FR, IT } from "components/Translated";

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
      setError("Error.GenericError");
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
      minHeight="450"
      sx={{ background: 'url("/images/voty_welcome.svg") center no-repeat' }}
    >
      <DE>
        <Heading mt={0}>Hallo {user?.name}</Heading>
        <Text>
          Dein Konto wurde erstellt und wir haben ein Email an die Adresse «
          {user?.email}» geschickt. Bitte öffne den Link in diesem Email, um
          dich anzumelden.
        </Text>
        <Text my={4}>
          <strong>Keine Email erhalten?</strong> Bitte überprüfe deine Email
          Adresse auf Tippfehler ({user?.email}) und schau im Spam-Ordner nach.
        </Text>
        <Button variant="text" onClick={router.reload}>
          Ich habe mich vertippt...
        </Button>
        <br />
        {!mailSent ? (
          <Button variant="text" onClick={doResend}>
            Bestätigungsmail nochmals senden
          </Button>
        ) : (
          "Das Bestätigungsmail wurde nochmals verschickt!"
        )}
      </DE>

      <FR>
        <Heading mt={0}>Bonjour {user?.name}</Heading>
        <Text>
          Ton compte a été créé et nous avons envoyé un e-mail à {user?.email}.
          Ouvre le lien dans l&apos;e-mail pour t&apos;inscrire.
        </Text>
        <Text my={4}>
          <strong>Aucun e-mail reçu ?</strong> Vérifie que ton adresse e-mail ne
          contient pas de fautes de frappe ({user?.email}) et vérifie ton
          dossier spam.
        </Text>
        <Button variant="text" onClick={router.reload}>
          J&apos;ai fait une erreur de frappe...
        </Button>
        <br />
        {!mailSent ? (
          <Button variant="text" onClick={doResend}>
            Renvoyer l&apos;e-mail de confirmation
          </Button>
        ) : (
          "L&apos;e-mail de confirmation a été envoyé à nouveau!"
        )}
      </FR>

      <IT>
        <Heading mt={0}>Ciao {user?.name}</Heading>
        <Text>
          Tuo account è stato creato e abbiamo inviato una mail a «{user?.email}
          » Per favore apri il link in questa e-mail per registrarti.
        </Text>
        <Text my={4}>
          <strong>Non hai ricevuto un&apos;email?</strong> Controlla che il tuo
          indirizzo e-mail non contenga errori di battitura ({user?.email}) e
          controlla la cartella dello spam.
        </Text>
        <Button variant="text" onClick={router.reload}>
          Ho fatto un errore di battitura...
        </Button>
        <br />
        {!mailSent ? (
          <Button variant="text" onClick={doResend}>
            Invia nuovamente l&apos;e-mail di conferma.
          </Button>
        ) : (
          "L&apos;email di conferma è stata inviata di nuovo"
        )}
      </IT>

      <ErrorBox error={error} />
    </Flex>
  );
}
