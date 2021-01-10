import { Input, Label, Textarea } from "@rebass/forms";
import { useState } from "react";
import { Box, Button } from "rebass";
import { Chaty, parseMessages } from "./Chaty";
import { Err } from "components/Page";
import { Authors, usePostWork, WorkCard, WorkItem, Works } from "./Works";
import { UserWhereUniqueInput } from "graphql/types";
import Info from "./Info";

export const ChatyCreate: React.FC<{
  title?: string;
  lines?: string;
  rows?: number;
}> = ({ title: initialTitle, lines: initialLines, rows = 10 }) => {
  const [title, setTitle] = useState("");
  const [lines, setLines] = useState(initialLines?.trim());
  const [error, setError] = useState("");
  const [users, setUsers] = useState<UserWhereUniqueInput[]>();
  const [doPostWork, state, trigger] = usePostWork({
    card: "chaty_create",
    title,
    text: lines,
    users,
  });

  function changeLines(lines: string) {
    setLines(lines);
    try {
      if (lines.length > 3) {
        void parseMessages(lines);
        setError("");
      } else {
        setError("Dein Chat ist leer");
      }
    } catch (err) {
      setError(
        "Du hast einen Fehler im Chat-Format. Chaty versteht dich nicht 😥. Fängt jede Zeile mit einem - oder * an?"
      );
    }
  }

  const success = state.called && !state.error;
  return (
    <Box mt={4}>
      <Label>Titel deines Chats:</Label>
      <Input
        placeholder={initialTitle}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></Input>
      <Label mt={3}>Chatverlauf:</Label>
      <Textarea
        sx={{ fontFamily: "monospace", lineHeight: "2em" }}
        fontSize="14px !important"
        value={lines}
        wrap="off"
        onChange={(e) => changeLines(e.target.value)}
        rows={rows}
      />
      {error ? (
        <Err msg={error} />
      ) : (
        <>
          <Chaty title={title} lines={String(lines)} speed={5} />

          <Label mt={4}>Erarbeitet durch:</Label>
          <Authors setUsers={setUsers} />
          {success ? (
            <Info>Erfolgreich abgeschickt!</Info>
          ) : (
            <Button mt={3} onClick={doPostWork}>
              Abschicken
            </Button>
          )}
        </>
      )}
      <Works
        mt={5}
        card="chaty_create"
        items={ChatyItem}
        trigger={trigger}
        flexDirection="column"
      />
    </Box>
  );
};

const ChatyItem: WorkItem = ({ work }) => {
  return (
    <WorkCard>
      <Chaty title={work.title} lines={work.text} />
    </WorkCard>
  );
};
