import { gql } from "@apollo/client";
import { TeamAnonFieldsFragment, useSetNotesMutation } from "graphql/types";
import { A } from "./Breadcrumb";
import { Info } from "./Info";
import { fragments } from "./Teams";
import { Flex, Text } from "components/ui";
import { useState } from "react";
import { Textarea } from "components/ui";
import clone from "lodash/clone";

export const SET_NOTES = gql`
  mutation setNotes($teamId: String!, $notes: Json!) {
    setNotes(teamId: $teamId, notes: $notes) {
      ...TeamTeacherFields
    }
  }
  ${fragments.TeamTeacherFields}
`;

export const ShowNote: React.FC<
  React.PropsWithChildren<{
    team: TeamAnonFieldsFragment;
    card: string;
    teacher?: boolean;
  }>
> = ({ team, card, teacher }) => {
  const [edit, setEdit] = useState(false);

  if (edit) {
    return <EditNote team={team} card={card} close={() => setEdit(false)} />;
  }
  if (!team.notes[card]) {
    if (teacher) {
      return (
        <Text className="text-right text-sm">
          <A onClick={() => setEdit(true)}>Klassennotiz hinzufügen</A>
        </Text>
      );
    } else {
      return null;
    }
  }
  return (
    <Info>
      <Flex className="justify-between">
        <Text className="font-semibold">Klassennotiz der Lehrperson:</Text>
        {teacher && (
          <Text className="mt-2 text-right text-sm">
            <A onClick={() => setEdit(true)}>Klassennotiz bearbeiten</A>
          </Text>
        )}
      </Flex>
      {team.notes[card]}
    </Info>
  );
};

export const EditNote: React.FC<
  React.PropsWithChildren<{
    team: TeamAnonFieldsFragment;
    card: string;
    close: () => void;
  }>
> = ({ team, card, close }) => {
  const [note, setNote] = useState(team.notes[card] as string);
  const [doSetNotes] = useSetNotesMutation();

  async function doSave(text: string) {
    const notes = clone(team.notes) as Record<string, string>;
    notes[card] = text;
    await doSetNotes({ variables: { teamId: team.id, notes } });
    close();
  }
  async function doDelete() {
    if (confirm("Notiz wirklich löschen?")) {
      await doSave("");
      close();
    }
  }
  return (
    <Info className="text-sm">
      <Text className="font-semibold">
        Klassennotiz für alle Schüler*innen:
      </Text>
      <Textarea
        autoFocus
        className="bg-highlight"
        value={note}
        rows={4}
        onChange={(e) => setNote(e.target.value)}
      />
      <Flex className="justify-between">
        <A onClick={close}>Abbrechen</A>
        <A onClick={doDelete}>Notiz löschen</A>
        <A onClick={() => doSave(note)}>Speichern</A>
      </Flex>
    </Info>
  );
};
