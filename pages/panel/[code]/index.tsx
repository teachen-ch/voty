import { Page, ErrorPage, LoadingPage } from "components/Page";
import { Heading, Box, Flex } from "rebass";
import { Ballot } from "components/Ballots";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import {
  BallotFieldsFragment,
  useGetBallotRunsQuery,
  useTeamByCodeQuery,
  useVoteCodeMutation,
  BallotRunFieldsFragment,
} from "graphql/types";
import { BigButton } from "components/BigButton";
import { ErrorBox } from "components/Form";
import { getBrowserCookie } from "util/cookies";
import { isBrowser } from "util/isBrowser";

export default function PanelBallots(): ReactElement {
  const router = useRouter();
  const code = String(router.query.code);
  const teamQuery = useTeamByCodeQuery({ variables: { code } });
  const team = teamQuery.data?.team;
  const [activeBallot, setActiveBallot] = useState<BallotFieldsFragment>();
  let cookie = getBrowserCookie("voty") as Record<string, any>;
  if (!cookie || typeof cookie == "string") {
    cookie = {};
  }

  const ballotRunsQuery = useGetBallotRunsQuery({
    variables: { teamId: String(team?.id) },
    skip: !team,
  });
  const ballotRuns = ballotRunsQuery.data?.getBallotRuns;

  if (!code || teamQuery.loading) {
    return <LoadingPage />;
  }

  if (!team) {
    return (
      <ErrorPage>
        Der Abstimmungs-Code wurde leider nicht gefunden. Vertippt?
      </ErrorPage>
    );
  }

  function detailBallot(ballot: BallotFieldsFragment) {
    setActiveBallot(ballot);
  }

  return (
    <Page heading="Abstimmen">
      <Heading as="h2">Abstimmungen</Heading>
      {ballotRuns?.length
        ? ballotRuns.map((run) => (
            <>
              <Ballot
                key={run.id}
                ballot={run.ballot}
                buttonText={cookie[run.id] ? "" : "Abstimmmen"}
                onButton={detailBallot}
                onDetail={detailBallot}
              />
              {(run.ballot === activeBallot || cookie[run.id]) && (
                <VoteCode
                  run={run}
                  code={code}
                  voted={cookie[run.id] ? true : false}
                />
              )}
            </>
          ))
        : "Keine Abstimmungen gefunden."}
    </Page>
  );
}

const VoteCode: React.FC<{
  run: BallotRunFieldsFragment;
  code: string;
  voted: boolean;
}> = ({ run, code, voted }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  if (!isBrowser()) return null;

  const [doVoteCode] = useVoteCodeMutation({
    onCompleted() {
      setSuccess(true);
    },
    onError(err) {
      setError(err.message);
    },
  });

  if (success || voted) {
    return (
      <BigButton color="gray" width="100%" mb={4}>
        Du hast erfolgreich abgestimmt ✅
      </BigButton>
    );
  }

  async function voteCode(ballotRunId: string, code: string, vote: number) {
    await doVoteCode({ variables: { ballotRunId, code, vote } });
  }

  return (
    <Box my={4}>
      <Flex>
        <BigButton color="green" onClick={() => voteCode(run.id, code, 1)}>
          Ja, ich stimme zu
        </BigButton>
        <BigButton color="primary" onClick={() => voteCode(run.id, code, 2)}>
          Nein, ich lehne ab
        </BigButton>
      </Flex>
      <ErrorBox my={2} error={error} />
    </Box>
  );
};
