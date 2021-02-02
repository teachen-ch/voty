import { gql } from "@apollo/client";
import { TeamAnonFieldsFragment } from "graphql/types";
import { Info } from "./Info";
import { fragments } from "./Teams";

export const SET_NOTES = gql`
  mutation setNotes($teamId: String!, $notes: Json!) {
    setNotes(teamId: $teamId, notes: $notes) {
      ...TeamTeacherFields
    }
  }
  ${fragments.TeamTeacherFields}
`;

export const ShowNote: React.FC<{
  team: TeamAnonFieldsFragment;
  card: string;
}> = ({ team, card }) => {
  return <Info>{team.notes[card]}</Info>;
};

export const EditNote: React.FC<{
  team: TeamAnonFieldsFragment;
  card: string;
}> = ({ team, card }) => {
  return <Info>{team.notes[card]}</Info>;
};
