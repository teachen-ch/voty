import { gql, useQuery } from "@apollo/client";
import { Heading, Text, Link as A } from "rebass";
import { useState, Fragment } from "react";
import { Ballot, BallotWhereInput } from "@prisma/client";
import { formatFromTo } from "../util/date";

Ballots.fragments = {
  BallotFields: gql`
    fragment BallotFields on Ballot {
      id
      title
      description
      body
      start
      end
      scope
      canton
    }
  `,
};

const GET_BALLOTS = gql`
  query($where: BallotWhereInput) {
    ballots(where: $where) {
      ...BallotFields
    }
  }
  ${Ballots.fragments.BallotFields}
`;

// TODO: have to redefine enum here, otherwise hiting this issue
// https://github.com/prisma/prisma/issues/3252
export enum BallotScope {
  PUBLIC = "PUBLIC",
  NATIONAL = "NATIONAL",
  CANTONAL = "CANTONAL",
  SCHOOL = "SCHOOL",
  TEAM = "TEAM",
}

export function useBallots(where: BallotWhereInput) {
  return useQuery(GET_BALLOTS, {
    variables: { where },
  });
}

const GET_BALLOT = gql`
  query($where: BallotWhereUniqueInput!) {
    ballot(where: $where) {
      ...BallotFields
    }
  }
  ${Ballots.fragments.BallotFields}
`;

export function useBallot(id: Number) {
  return useQuery(GET_BALLOT, {
    variables: { where: { id } },
    skip: !id,
  });
}

export function Ballots({
  where,
  onClick,
}: {
  where?: BallotWhereInput;
  onClick?: (ballot: Ballot) => void;
}) {
  const [] = useState();
  const ballots = useBallots(where);

  if (ballots.error) {
    return <Heading>Error loading data: {ballots.error.message}</Heading>;
  }
  if (ballots.loading) {
    return <Heading>Loading data</Heading>;
  }

  if (ballots.data.length === 0) {
    return <Text>Noch keine Abstimmungen erfasst</Text>;
  }
  return (
    <>
      <table width="100%">
        <thead>
          <tr>
            <th align="left">Titel</th>
            <th align="left">Dauer</th>
            <th align="left">Status</th>
          </tr>
        </thead>

        <tbody>
          {ballots.data.ballots.map((ballot: any) => (
            <Fragment key={ballot.id}>
              <tr>
                <td>
                  <A onClick={() => onClick(ballot)}>{ballot.title}</A>
                </td>
                <td>{formatFromTo(ballot.start, ballot.end)}</td>
                <td>{getBallotStatus(ballot)}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <small>{ballot.description}</small>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
}

enum BallotStatus {
  NOT_STARTED = "Nicht gestartet",
  STARTED = "Gestartet",
  ENDED = "Beendet",
}

export function getBallotStatus(ballot) {
  const now = Date.now();
  if (ballot.start < now) return BallotStatus.NOT_STARTED;
  if (ballot.end < now) return BallotStatus.ENDED;
  else return BallotStatus.STARTED;
}
