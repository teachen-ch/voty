import { Input, Select, Textarea } from "@rebass/forms";
import { useContext, useState } from "react";
import { Box, Text, Button, Card, Flex } from "rebass";
import { authHeaders } from "util/apollo";
import { A } from "./Breadcrumb";
import { CardContext } from "./Cards";
import { Info } from "./Info";
import { Center } from "./Learning";
import { Err } from "./Page";

export const FeedbackText: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Text mt={5} fontSize={1} textAlign="center">
        Hast Du{" "}
        <A onClick={() => setShow(!show)}>
          Fragen oder Verbesserungsvorschläge?
        </A>{" "}
      </Text>
      {show && <FeedbackForm doClose={() => setShow(false)} />}
    </>
  );
};

export const Feedback: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(!show)}>Feedback!</Button>
      {show && <FeedbackForm doClose={() => setShow(false)} />}
    </>
  );
};

export const FeedbackForm: React.FC<{ doClose: () => void }> = ({
  doClose,
}) => {
  const { card } = useContext(CardContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  async function doSend() {
    const res = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ title, type, text, card }),
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
    <Card
      bg="lightgray"
      sx={{
        position: "absolute",
        bottom: [-250, -250, "50px"],
        left: [0, 0, "25%"],
        margin: "auto",
        boxShadow: "0px 0px 0px 2000px rgba(0,0,0,0.7)",
      }}
    >
      {success ? (
        <>
          <Info type="info">
            Das Feedback wurde erfolgreich abgeschickt. Herzlichen Dank!
          </Info>
          <Center>
            <Button my={4} onClick={doClose}>
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
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Betreff..."
          />
          <Box mt={2} />
          <Textarea
            onChange={(e) => setText(e.target.value)}
            rows={4}
            fontSize={1}
          />
          <Flex mt={2} justifyContent="space-between">
            <Button
              width="calc(50% - 4px)"
              onClick={doClose}
              variant="secondary"
            >
              Abbrechen
            </Button>
            <Button width="calc(50% - 4px)" onClick={doSend}>
              Abschicken
            </Button>
          </Flex>
        </>
      )}
      <Err msg={error} />
    </Card>
  );
};
