import { gql, useApolloClient } from "@apollo/client";

import { Text, Link as A, Button, Card, Box, Flex } from "rebass";
import {
  BallotWhereInput,
  useBallotsQuery,
  BallotFieldsFragment,
  TeamTeacherFieldsFragment,
  useAddBallotRunMutation,
  useRemoveBallotRunMutation,
  useGetBallotRunsQuery,
  BallotResults,
  BallotQuery,
  GetBallotResultsQuery,
  BallotScope,
  BallotRunFieldsFragment,
  UserBallotFieldsFragment,
  useCreateOneBallotMutation,
} from "graphql/types";

import { formatFromTo, formatDate } from "../util/date";

import { useRouter } from "next/router";
import find from "lodash/find";
import Link from "next/link";
import Image from "next/legacy/image";
import IconResults from "../public/images/icon_results.svg";
import IconCheckOn from "../public/images/icon_check_on.svg";
import IconCheckOff from "../public/images/icon_check_off.svg";
import IconDeadline from "../public/images/icon_deadline.svg";
import IconCal from "../public/images/icon_cal.svg";
import { MouseEvent } from "react";
import type { Nullable } from "simplytyped";
import { Markdown } from "util/markdown";
import { Err, Loading } from "./Page";
import { OneRowTable, TDImage } from "./Table";
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

export const CreateBallotForm: React.FC<React.PropsWithChildren<unknown>> = () => {
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
