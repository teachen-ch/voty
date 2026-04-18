import { Input, Label, Textarea } from "components/ui";
import { useState } from "react";
import { Box, Button } from "components/ui";
import { Chaty } from "./Chaty";
import { Err } from "components/Page";
import { Authors, usePostWork, WorkItem, Works } from "./Works";
import { UserWhereUniqueInput } from "graphql/types";
import { Info } from "./Info";
import { parseMessages } from "util/chaty";

export const ChatyCreate: React.FC<React.PropsWithChildren<{
  title?: string;
  lines?: string;
  rows?: number;
}>> = ({ title: initialTitle, lines: initialLines, rows = 10 }) => {
  const [title, setTitle] = useState("");
  const [lines, setLines] = useState(initialLines?.trim());
  const [error, setError] = useState("");
  const [users, setUsers] = useState<UserWhereUniqueInput[]>();
  const [trigger, setTrigger] = useState(0);
  const [doPostWork, state] = usePostWork({
    card: "chaty_create",
    title,
    text: lines,
    users,
    setTrigger,
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
    <Box className="mt-8">
      <Label>Titel deines Chats:</Label>
      <Input
        placeholder={initialTitle}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Label className="mt-4">Chatverlauf:</Label>
      <Textarea
        className="font-mono leading-[2em] text-[14px]"
        value={lines}
        wrap="off"
        onChange={(e) => changeLines(e.target.value)}
        rows={rows}
      />
      {error ? (
        <Err msg={error} />
      ) : (
        <>
          <Chaty slim title={title} lines={String(lines)} speed={5} />

          <Label className="mt-8">Erarbeitet durch:</Label>
          <Authors setUsers={setUsers} />
          {success ? (
            <Info>Erfolgreich abgeschickt!</Info>
          ) : (
            <Button className="mt-4" onClick={doPostWork}>
              Abschicken
            </Button>
          )}
        </>
      )}
      <Works
        className="mt-16"
        card="chaty_create"
        items={ChatyItem}
        trigger={trigger}
        flexDirection="column"
      />
    </Box>
  );
};

const ChatyItem: WorkItem = ({ work }) => {
  return <Chaty title={work.title} lines={work.text} slim />;
};
