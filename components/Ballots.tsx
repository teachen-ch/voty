import { gql, useQuery, QueryResult } from "@apollo/client";
import { Heading, Text, Link as A, Button } from "rebass";
import { Fragment } from "react";
import { Ballot, BallotWhereInput } from "graphql/types";
import { formatFromTo } from "../util/date";
import { Grid } from "./Form";

export const fragments = {
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
  query ballots($where: BallotWhereInput) {
    ballots(where: $where) {
      ...BallotFields
    }
  }
  ${fragments.BallotFields}
`;

type BallotsAnswer = {
  ballots: Ballot[];
};

export function useBallots(
  where?: BallotWhereInput
): QueryResult<BallotsAnswer, Record<string, any>> {
  return useQuery<BallotsAnswer>(GET_BALLOTS, {
    variables: { where },
  });
}

const GET_BALLOT = gql`
  query ballot($where: BallotWhereUniqueInput!) {
    ballot(where: $where) {
      ...BallotFields
      canVote
      hasVoted
    }
  }
  ${fragments.BallotFields}
`;

// TODO: have to redefine enum here, otherwise hiting this issue
// https://github.com/prisma/prisma/issues/3252
export enum BallotScope {
  Public = "Public",
  National = "National",
  Cantonal = "Cantonal",
  School = "School",
  Team = "Team",
}

type BallotAnswer = {
  ballot: Ballot;
};
export function useBallot(id: number): QueryResult<BallotAnswer> {
  return useQuery(GET_BALLOT, {
    variables: { where: { id } },
    skip: !id,
  });
}

type BallotsProps = {
  where?: BallotWhereInput;
  onClick: (ballot: Ballot) => void;
};

export const Ballots: React.FC<BallotsProps> = ({ where, onClick }) => {
  const ballots = useBallots(where);

  if (ballots.error) {
    return <Heading>Error loading data: {ballots.error.message}</Heading>;
  }
  if (ballots.loading) {
    return <Heading>Loading data</Heading>;
  }

  if (!ballots.data?.ballots?.length) {
    return <Text>Noch keine Abstimmungen erfasst</Text>;
  }

  return (
    <>
      {ballots.data.ballots.map((ballot: any) => (
        <Fragment key={ballot.id}>
          <A
            fontSize={3}
            sx={{ fontWeight: "bold" }}
            onClick={() => onClick(ballot)}
          >
            {ballot.title}
          </A>
          <Text fontSize={2}>{ballot.description}</Text>
          <Grid mt={2} mb={4} columns={[0, 0, "2fr 1fr"]}>
            Zeit: {formatFromTo(ballot.start, ballot.end)}
            <Button
              onClick={() => onClick(ballot)}
              variant={
                getBallotStatus(ballot) === BallotStatus.Started
                  ? "primary"
                  : "muted"
              }
            >
              Zur Abstimmung
            </Button>
          </Grid>
        </Fragment>
      ))}
    </>
  );
};

enum BallotStatus {
  Not_Started = "Nicht gestartet",
  Started = "Gestartet",
  Ended = "Beendet",
}

export const getBallotStatus = (ballot: Ballot): string => {
  const now = new Date();
  if (ballot.start < now) return BallotStatus.Not_Started;
  if (ballot.end < now) return BallotStatus.Ended;
  else return BallotStatus.Started;
};
