import { gql } from "@apollo/client";

import { BallotScope, useCreateOneBallotMutation } from "graphql/types";

import { fragments } from "./Ballots";
import { QForm } from "./Form";

export const CREATE_ONE_BALLOT = gql`
  mutation createOneBallot($data: BallotCreateInput!) {
    createOneBallot(data: $data) {
      ...BallotFields
    }
  }
  ${fragments.BallotFields}
`;

export const UPDATE_ONE_BALLOT = gql`
  mutation updateOneBallot(
    $data: BallotUpdateInput!
    $where: BallotWhereUniqueInput!
  ) {
    updateOneBallot(data: $data, where: $where) {
      ...BallotFields
    }
  }
  ${fragments.BallotFields}
`;

export const REMOVE_ONE_BALLOT = gql`
  mutation deleteOneBallot($where: BallotWhereUniqueInput!) {
    deleteOneBallot(where: $where) {
      id
    }
  }
`;

export const CreateBallotForm: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const [createOneBallot] = useCreateOneBallotMutation();
  return (
    <QForm
      fields={{
        type: {
          type: "select",
          label: "Abstimmungstyp",
          init: BallotScope.National,
          required: true,
          options: {
            [BallotScope.National]: "National",
            [BallotScope.Cantonal]: "Kantonal",
            [BallotScope.School]: "Schulabstimmung",
            [BallotScope.Team]: "Klassenabstimmung",
            [BallotScope.Public]: "Öffentliche Abstimmung",
          },
        },
        submit: {
          type: "submit",
          label: "Neue Abstimmung erstellen",
        },
      }}
      mutation={createOneBallot}
    ></QForm>
  );
};
