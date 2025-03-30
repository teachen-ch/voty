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

const UserBallotFields = gql`
  fragment UserBallotFields on Ballot {
    ...BallotFields
    canVote
    hasVoted
  }
  ${BallotFields}
`;
const BallotRunFields = gql`
  fragment BallotRunFields on BallotRun {
    id
    start
    end
    ballotId
  }
  ${BallotFields}
`;

export const fragments = {
  BallotFields,
  UserBallotFields,
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

export const GET_USER_BALLOTS = gql`
  query userBallots($where: BallotWhereInput) {
    ballots(where: $where) {
      ...BallotFields
      canVote
      hasVoted
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

type BallotsProps = {
  where?: BallotWhereInput;
  onClick: (ballot: BallotFieldsFragment) => void;
};

export const Ballots: React.FC<React.PropsWithChildren<BallotsProps>> = ({ where, onClick }) => {
  const ballotsQuery = useBallotsQuery({ variables: { where } });

  if (ballotsQuery.error) return <Err msg={ballotsQuery.error.message} />;
  if (ballotsQuery.loading) return <Loading />;
  if (!ballotsQuery.data?.ballots?.length)
    return <OneRowTable text="Noch keine Abstimmungen erfasst" />;

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

export const StudentListBallots: React.FC<React.PropsWithChildren<{
  teamId: string;
}>> = ({ teamId }) => {
  const router = useRouter();
  const where = { ballotRuns: { some: { teamId: { equals: teamId } } } };
  const ballotsQuery = useBallotsQuery({ variables: { where } });

  if (ballotsQuery.error) return <Err msg={ballotsQuery.error.message} />;
  if (ballotsQuery.loading) return <Loading />;
  if (!ballotsQuery.data?.ballots?.length)
    return <OneRowTable text="Noch keine Abstimmungen erfasst" />;

  return (
    <Box color="#fff">
      {ballotsQuery.data.ballots.map((ballot) => (
        <Flex
          key={ballot.id}
          onClick={() =>
            void router.push(`/team/${teamId}/ballots/${ballot.id}`)
          }
          alignItems="center"
          bg="primary"
          mb={3}
          px={3}
          height={76}
          fontWeight="semi"
          sx={{ ":hover": { bg: "primary" }, cursor: "pointer" }}
        >
          <TDImage src="/images/card_ballot.svg" mr={3} ml={0} light />
          {ballot.title}
        </Flex>
      ))}
    </Box>
  );
};

export const Ballot: React.FC<React.PropsWithChildren<{
  ballot: BallotFieldsFragment;
  buttonText?: string;
  buttonColor?: string;
  onButton?: (ballot: BallotFieldsFragment) => void;
  onDetail?: (ballot: BallotFieldsFragment) => void;
}>> = ({
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
          <Image src={IconCal} alt="Deadline" width="20px" height="20px" />{" "}
          &nbsp; Zeit: {formatFromTo(ballot.start, ballot.end)}
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
  Not_Started = "Ballot.Not_Started",
  Started = "Ballot.Started",
  Ended = "Ballot.Ended",
  Voted = "Ballot.Voted",
  Permission = "Ballot.Permission",
}

export const getBallotStatus = (ballot: BallotFieldsFragment): string => {
  const now = new Date();
  if (new Date(ballot.start) > now) return BallotStatus.Not_Started;
  if (new Date(ballot.end) < now) return BallotStatus.Ended;
  else return BallotStatus.Started;
};

export const getUserBallotStatus = (
  ballot: UserBallotFieldsFragment
): string => {
  const now = new Date();
  if (new Date(ballot.start) > now) return BallotStatus.Not_Started;
  if (ballot.hasVoted) return BallotStatus.Voted;
  if (new Date(ballot.end) < now) return BallotStatus.Ended;
  if (!ballot.canVote) return BallotStatus.Permission;
  else return BallotStatus.Started;
};

export const SelectBallots: React.FC<React.PropsWithChildren<{
  team: TeamTeacherFieldsFragment;
  scope: BallotScope;
}>> = ({ team, scope }) => {
  const router = useRouter();
  const [doAddBallotRun, addMutation] = useAddBallotRunMutation();
  const [doRemoveBallotRun, removeMutation] = useRemoveBallotRunMutation();
  const client = useApolloClient();

  const ballotRunsQuery = useGetBallotRunsQuery({
    variables: { teamId: String(team?.id) },
    skip: !team,
  });
  const ballotRuns = ballotRunsQuery.data?.getBallotRuns;

  const ballotsQuery = useBallotsQuery({
    variables: { where: { scope: { equals: scope } } },
  });

  const ballots = ballotsQuery.data?.ballots;

  async function getResults(
    ballotId: string,
    ballotRunId: string
  ): Promise<Nullable<BallotResults>> {
    const query = await client.query<GetBallotResultsQuery>({
      query: GET_BALLOT_RESULTS,
      variables: { ballotId, ballotRunId },
    });
    return query.data.getBallotResults;
  }

  function detailBallot(ballotId: string) {
    void router.push(`/team/${team.id}/${ballotId}`);
  }

  async function toggleBallot(ballotId: string, teamId: string, e: MouseEvent) {
    e.stopPropagation();
    if (removeMutation.loading || addMutation.loading)
      return alert("Bitte warten…");
    const run = find(ballotRuns, { ballotId: ballotId });
    if (run && typeof run == "object") {
      const results = await getResults(ballotId, run.id);
      if (results?.total !== 0) {
        const confirmed = confirm(
          "Für diese Abstimmung wurden bereits Stimmen abgegeben. Wirklich löschen?"
        );
        if (!confirmed) return;
      }
      await doRemoveBallotRun({
        variables: { ballotRunId: run.id },

        update: (cache) => {
          cache.evict({
            id: `BallotRun:${run.id}`,
          });
          cache.gc();
        },
      });
    } else {
      await doAddBallotRun({
        variables: { ballotId, teamId },

        update: (cache, result) => {
          cache.modify({
            fields: {
              getBallotRuns(existingRuns: BallotRunFieldsFragment[] = []) {
                const newRun = cache.writeFragment({
                  data: result.data?.addBallotRun,
                  fragment: fragments.BallotRunFields,
                  fragmentName: "BallotRunFields",
                });
                return [...existingRuns, newRun];
              },
            },
          });
        },
      });
    }
  }

  if (!ballots || ballotRunsQuery.loading) return <Loading />;

  // only show ballots with end-date less than 45 days ago
  const old = 45 * 24 * 60 * 60 * 1000;
  const currentBallots = ballots.filter(
    (ballot) => new Date(ballot.end).getTime() > Date.now() - old
  );

  return (
    <>
      <table id="ballots" style={{ borderTop: "2px solid" }}>
        <tbody>
          {currentBallots.map((ballot) => (
            <tr key={ballot.id}>
              <td style={{ maxWidth: "200px" }}>
                <A onClick={() => detailBallot(ballot.id)}>{ballot.title}</A>
              </td>
              <td>
                <Box
                  variant="centered"
                  sx={{ display: ["none", "none", "inline"] }}
                  color="white"
                >
                  <Image src={IconDeadline} height="20px" alt="Deadline" />
                  &nbsp;
                  {formatDate(ballot.end)}
                </Box>
              </td>
              <td>
                <Box variant="centered">
                  <Image
                    src={IconResults}
                    alt="Resultate"
                    width="20px"
                    height="20px"
                    onClick={() => detailBallot(ballot.id)}
                  />
                </Box>
              </td>
              <td onClick={(evt) => toggleBallot(ballot.id, team.id, evt)}>
                <Box variant="centered">
                  {find(ballotRuns, { ballotId: ballot.id }) ? (
                    <Image
                      src={IconCheckOn}
                      alt="ausgewählt"
                      data-cy="on"
                      width="20px"
                      height="20px"
                      className="pointer"
                    />
                  ) : (
                    <Image
                      src={IconCheckOff}
                      alt="abgewählt"
                      data-cy="off"
                      width="20px"
                      height="20px"
                      className="pointer"
                    />
                  )}
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export const BallotDetails: React.FC<React.PropsWithChildren<{
  ballot: NonNullable<BallotQuery["ballot"]>;
}>> = ({ ballot, children }) => (
  <Card>
    <Text>
      <Text fontWeight="bold">{ballot.title}</Text>
      <Text mt={3}>{ballot.description}</Text>
      <Text fontSize={2} my={4}>
        <img src="/images/icon_cal.svg" width="20px" alt="Zeit" /> &nbsp; Zeit:{" "}
        {formatFromTo(ballot.start, ballot.end)}
      </Text>
      {children}
      {ballot.scope === BallotScope.National && (
        <Text textAlign="center" mt={3}>
          <img width={150} src="/images/easyvote.png" alt="EasyVote" />
        </Text>
      )}
      <Markdown>{ballot.body}</Markdown>
    </Text>
  </Card>
);

export const PanelCode: React.FC<React.PropsWithChildren<{
  team: TeamTeacherFieldsFragment;
  hasRuns: boolean;
}>> = ({ team, hasRuns }) => {
  if (!team?.code || !hasRuns) return null;
  return (
    <Text id="livepanel">Seite für Live-Abstimmungen:{" "}
      <Link
        href="/panel/[code]/present"
        as={`/panel/${team.code}/present`}
        passHref
        legacyBehavior>
        <Button>Code: {team.code}</Button>
      </Link>
    </Text>
  );
};
