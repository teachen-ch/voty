import { Input, Select, Textarea } from "components/ui";
import { useContext, useState } from "react";
import { Box, Button, Text, Card, Flex } from "components/ui";
import { authHeaders } from "util/apollo";
import { A } from "./A";
import { Grid } from "components/ui";
import { CardContext, getCardTitle } from "./Cards";
import { Info } from "./Info";
import { Center } from "./Learning";
import { Err } from "./Page";
import NewWindow from "react-new-window";
import { useUser } from "state/user";

export const FeedbackText: React.FC<
  React.PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement> & {
      text?: string;
      quest?: string;
      card?: string;
    }
  >
> = ({
  text = "Hast du Fragen oder Verbesserungsvorschläge zu diesem Inhalt?",
  card,
  quest,
  className,
  ...props
}) => {
  const [show, setShow] = useState(false);
  return (
    <Box className={`mt-16 text-sm text-center ${className ?? ""}`} {...props}>
      <A onClick={() => setShow(!show)}>{text}</A>
      {show && (
        <FeedbackForm
          doClose={() => setShow(false)}
          quest={quest}
          card={card}
        />
      )}
    </Box>
  );
};

export const FeedbackForm: React.FC<
  React.PropsWithChildren<{
    doClose: () => void;
    card?: string;
    quest?: string;
  }>
> = ({ doClose, card, quest }) => {
  const { card: cardFromContext } = useContext(CardContext);
  if (cardFromContext) card = cardFromContext;
  const user = useUser();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState<string | undefined>();

  async function doSend() {
    const res = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ title, type, text, card, quest, email }),
      headers: authHeaders(),
    });
    const result = (await res.json()) as Record<string, any>;
    if (result.success) {
      setSuccess(true);
    }
    if (result.error) {
      setError(result.error);
    }
  }
  return (
    <NewWindow title="Feedback" name="feedback" center="screen">
      <Card className="bg-highlight h-full">
        <Text variant="semi" className="mt-4">
          Feedback für voty.ch
        </Text>
        <Text className="text-gray text-sm mb-4">
          {user && `Von: ${user.email}`}
          <br />
          Thema: {getCardTitle(String(card)) || card}{" "}
          {quest ? ` / ${quest}` : ""}
        </Text>
        {success ? (
          <>
            <Info type="info">
              Das Feedback wurde erfolgreich abgeschickt. Herzlichen Dank!
            </Info>
            <Center>
              <Button className="my-8 bg-primary" onClick={doClose}>
                Schliessen
              </Button>
            </Center>
          </>
        ) : (
          <>
            <Select onChange={(e) => setType(e.target.value)}>
              <option value="">–– Bitte wählen ––</option>
              <option>Mir ist etwas nicht klar 🤔</option>
              <option>Hier ist ein Schreibfehler! 🤓</option>
              <option>Verbesserungsvorschlag ☝️</option>
            </Select>
            {!user && (
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Deine Email"
                className="mt-2"
              />
            )}
            <Input
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Betreff..."
              className="mt-2"
            />
            <Box className="mt-2" />
            <Textarea
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="text-sm"
            />
            <Flex className="mt-2 justify-between">
              <Button
                className="w-[calc(50%-4px)]"
                onClick={doClose}
                variant="secondary"
              >
                Abbrechen
              </Button>
              <Button className="w-[calc(50%-4px)]" onClick={doSend}>
                Abschicken
              </Button>
            </Flex>
          </>
        )}
        <Err msg={error} />
        <Text className="text-sm italic text-gray mt-4">
          voty.ch wird als Open Education Content entwickelt. Der Progammcode
          und sämtliche Inhalte sind unter{" "}
          <a
            href="http://github.com/teachen-ch/voty/"
            target="_blank"
            rel="noreferrer"
          >
            github.com/teachen-ch/voty/
          </a>{" "}
          veröffentlicht. Dort können auch direkt Änderungen in Inhalten und im
          Code vorgeschlagen werden.
        </Text>
      </Card>
    </NewWindow>
  );
};

export const FeedbackPlain: React.FC<
  React.PropsWithChildren<{ title?: string }>
> = ({ title }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const user = useUser();
  const [email, setEmail] = useState<string | undefined>();

  async function doSend() {
    const res = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ title, email }),
      headers: authHeaders(),
    });
    const result = (await res.json()) as Record<string, any>;
    if (result.success) {
      setSuccess(true);
    }
    if (result.error) {
      setError(result.error);
    }
  }
  if (success)
    return <Info type="info">Erfolgreich abgeschickt. Herzlichen Dank!</Info>;
  return (
    <>
      <Text variant="semi">{title} &nbsp;</Text>
      <Text className="text-gray text-sm">
        {user && `Angemeldet als: ${user.email}`}
      </Text>
      <Grid columns="1fr 1fr">
        {!user && (
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Deine Email"
          />
        )}
        <Button className="w-1/2" onClick={doSend}>
          Anmelden
        </Button>
      </Grid>
      <Err msg={error} />
    </>
  );
};
