import { gql } from "@apollo/client";
import { Heading, Text, Link as A, Button, Card } from "rebass";
import {
  BallotWhereInput,
  useBallotsQuery,
  BallotFieldsFragment,
  TeamTeacherFieldsFragment,
  useAddBallotRunMutation,
  useRemoveBallotRunMutation,
  useGetBallotRunsQuery,
} from "graphql/types";
import { formatFromTo, formatDate } from "../util/date";
import { useRouter } from "next/router";
import { find } from "lodash";
import Link from "next/link";
import IconResults from "../public/images/icon_results.svg";

const BallotFields = gql`
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
`;
const BallotRunFields = gql`
  fragment BallotRunFields on BallotRun {
    id
    start
    end
    ballot {
      ...BallotFields
    }
  }
  ${BallotFields}
`;

export const fragments = {
  BallotFields,
  BallotRunFields,
};

export const GET_BALLOTS = gql`
  query ballots($where: BallotWhereInput) {
    ballots(where: $where) {
      ...BallotFields
    }
  }
  ${fragments.BallotFields}
`;

export const GET_BALLOT = gql`
  query ballot($where: BallotWhereUniqueInput!) {
    ballot(where: $where) {
      ...BallotFields
      canVote
      hasVoted
    }
  }
  ${fragments.BallotFields}
`;

export const GET_BALLOT_RUNS = gql`
  query getBallotRuns($teamId: String!) {
    getBallotRuns(teamId: $teamId) {
      ...BallotRunFields
    }
  }
  ${fragments.BallotFields}
`;

export const ADD_BALLOT_RUN = gql`
  mutation addBallotRun($ballotId: String!, $teamId: String!) {
    addBallotRun(ballotId: $ballotId, teamId: $teamId) {
      ...BallotRunFields
    }
  }
`;

export const REMOVE_BALLOT_RUN = gql`
  mutation removeBallotRun($ballotRunId: String!) {
    removeBallotRun(ballotRunId: $ballotRunId) {
      success
      error
      message
    }
  }
`;

export const START_BALLOT_RUN = gql`
  mutation startBallotRun($ballotRunId: String!) {
    startBallotRun(ballotRunId: $ballotRunId) {
      ...BallotRunFields
    }
  }
`;

export const END_BALLOT_RUN = gql`
  mutation endBallotRun($ballotRunId: String!) {
    endBallotRun(ballotRunId: $ballotRunId) {
      ...BallotRunFields
    }
  }
`;

export const VOTE = gql`
  mutation vote($ballotId: String!, $vote: Int!) {
    vote(ballotId: $ballotId, vote: $vote) {
      verify
      ballot {
        id
        canVote
        hasVoted
      }
    }
  }
`;

export const VOTE_CODE = gql`
  mutation voteCode($code: String!, $ballotRunId: String!, $vote: Int!) {
    voteCode(code: $code, ballotRunId: $ballotRunId, vote: $vote) {
      success
      error
      message
    }
  }
`;

export const GET_BALLOT_RESULTS = gql`
  query getBallotResults(
    $ballotId: String!
    $ballotRunId: String
    $teamId: String
    $schoolId: String
    $canton: String
  ) {
    getBallotResults(
      ballotRunId: $ballotRunId
      ballotId: $ballotId
      teamId: $teamId
      schoolId: $schoolId
      canton: $canton
    ) {
      yes
      no
      abs
      total
    }
  }
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

type BallotsProps = {
  where?: BallotWhereInput;
  onClick: (ballot: BallotFieldsFragment) => void;
};

export const Ballots: React.FC<BallotsProps> = ({ where, onClick }) => {
  const ballotsQuery = useBallotsQuery({ variables: { where } });

  if (ballotsQuery.error) {
    return <Heading>Error loading data: {ballotsQuery.error.message}</Heading>;
  }
  if (ballotsQuery.loading) {
    return <Heading>Loading data</Heading>;
  }

  if (!ballotsQuery.data?.ballots?.length) {
    return <Text>Noch keine Abstimmungen erfasst</Text>;
  }

  return (
    <>
      {ballotsQuery.data.ballots.map((ballot) => (
        <Ballot
          key={ballot.id}
          ballot={ballot}
          buttonText="Informieren und abstimmen"
          onDetail={onClick}
          onButton={onClick}
        />
      ))}
    </>
  );
};

export const Ballot: React.FC<{
  ballot: BallotFieldsFragment;
  buttonText?: string;
  buttonColor?: string;
  onButton?: (ballot: BallotFieldsFragment) => void;
  onDetail?: (ballot: BallotFieldsFragment) => void;
}> = ({
  ballot,
  children,
  buttonText,
  buttonColor = "",
  onButton,
  onDetail,
}) => {
  return (
    <div className="ballot">
      <Card>
        <A variant="bold" onClick={() => onDetail && onDetail(ballot)}>
          {ballot.title}
        </A>
        <Text mt={3}>{ballot.description}</Text>
        <Text fontSize={2} my={4}>
          <img src="/images/icon_cal.svg" /> &nbsp; Zeit:{" "}
          {formatFromTo(ballot.start, ballot.end)}
        </Text>
        {children}
        {buttonText && (
          <Button
            onClick={() => onButton && onButton(ballot)}
            bg={buttonColor}
            width="100%"
          >
            {buttonText}
          </Button>
        )}
      </Card>
    </div>
  );
};

export enum BallotStatus {
  Not_Started = "Nicht gestartet",
  Started = "Gestartet",
  Ended = "Beendet",
}

export const getBallotStatus = (ballot: BallotFieldsFragment): string => {
  const now = new Date();
  if (new Date(ballot.start) > now) return BallotStatus.Not_Started;
  if (new Date(ballot.end) < now) return BallotStatus.Ended;
  else return BallotStatus.Started;
};

export const SelectBallots: React.FC<{ team: TeamTeacherFieldsFragment }> = ({
  team,
}) => {
  const router = useRouter();
  const [doAddBallotRun] = useAddBallotRunMutation();
  const [doRemoveBallotRun] = useRemoveBallotRunMutation();

  const ballotRunsQuery = useGetBallotRunsQuery({
    variables: { teamId: String(team?.id) },
    skip: !team,
  });
  const ballotRuns = ballotRunsQuery.data?.getBallotRuns;

  const ballotsQuery = useBallotsQuery({
    variables: { where: { scope: BallotScope.National } },
  });

  const ballots = ballotsQuery.data?.ballots;

  function detailBallot(ballot: BallotFieldsFragment) {
    void router.push("/ballots/[id]", `/ballots/${ballot.id}`);
  }

  async function addBallot(ballotId: string, teamId: string) {
    await doAddBallotRun({
      variables: { ballotId, teamId },
      refetchQueries: ["getBallotRuns"],
    });
    window.scrollTo(0, 0);
  }

  async function removeBallot(ballotRunId: string) {
    await doRemoveBallotRun({
      variables: { ballotRunId },
      refetchQueries: ["getBallotRuns"],
    });
  }

  if (!ballots) return <Text>Laden...</Text>;

  return (
    <>
      <table id="ballots">
        <thead>
          <tr>
            <th>Abstimmung</th>
            <th>Deadline</th>
            <th>Resultate</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {ballots.map((ballot) => (
            <tr key={ballot.id}>
              <td>{ballot.title}</td>
              <td>{formatDate(ballot.end)}</td>
              <td>
                <IconResults sx={{ opacity: 1 }} />
              </td>
              <td>
                {find(ballotRuns, { ballot: { id: ballot.id } })
                  ? "ausgewählt"
                  : "–"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export const PanelCode: React.FC<{
  team: TeamTeacherFieldsFragment;
  hasRuns: boolean;
}> = ({ team, hasRuns }) => {
  if (!team?.code || !hasRuns) return null;
  return (
    <Text id="livepanel">
      Seite für Live-Abstimmungen:{" "}
      <Link href="/panel/[code]/present" as={`/panel/${team.code}/present`}>
        <Button>Code: {team.code}</Button>
      </Link>
    </Text>
  );
};
