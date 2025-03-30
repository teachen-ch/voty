import { ErrorPage, LoadingPage } from "components/Page";
import { Text, Box, Image, Flex, Card, Button, Link as A } from "rebass";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import {
  useGetBallotRunsQuery,
  useTeamByCodeQuery,
  useVoteCodeMutation,
  BallotRunFieldsFragment,
  useBallotQuery,
} from "graphql/types";
import { BigGray } from "components/BigButton";
import { ErrorBox } from "components/Form";
import { getBrowserCookie } from "util/cookies";
import { isBrowser } from "util/isBrowser";
import { useTr } from "util/translate";
import { PanelPage } from "./present";

export default function PanelBallots(): ReactElement {
  const router = useRouter();
  const code = String(router.query.code);
  const teamQuery = useTeamByCodeQuery({ variables: { code } });
  const team = teamQuery.data?.team;
  let cookie = getBrowserCookie("voty") as Record<string, any>;
  if (!cookie || typeof cookie == "string") {
    cookie = {};
  }

  const ballotRunsQuery = useGetBallotRunsQuery({
    variables: { teamId: String(team?.id) },
    skip: !team,
  });
  const ballotRuns = ballotRunsQuery.data?.getBallotRuns;
  const refetch = ballotRunsQuery.refetch;

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

  return (
    <PanelPage heading="Jetzt bist du dran!">
      {ballotRuns?.length
        ? ballotRuns.map(
            (ballotRun) =>
              ballotRun && (
                <BallotRunDetail
                  key={ballotRun.id}
                  ballotRun={ballotRun}
                  code={code}
                  refetch={refetch}
                  cookie={cookie}
                />
              )
          )
        : "Keine Abstimmungen gefunden."}
      <Box mt={300} />
    </PanelPage>
  );
}

const BallotRunDetail: React.FC<React.PropsWithChildren<{
  ballotRun: BallotRunFieldsFragment;
  refetch: () => void;
  cookie: Record<string, any>;
  code: string;
}>> = ({ ballotRun, refetch, code, cookie }) => {
  const ballotQuery = useBallotQuery({
    variables: { where: { id: ballotRun.ballotId } },
  });
  const ballot = ballotQuery.data?.ballot;
  if (!ballotRun || !ballot) return null;

  return (
    <Card key={ballotRun.id} py={3}>
      <Text fontWeight="bold" fontSize="24px" lineHeight="24px">
        {ballot.title}
      </Text>
      <VoteCode
        ballotRun={ballotRun}
        refetch={refetch}
        code={code}
        voted={cookie[ballotRun.id] ? true : false}
      />
    </Card>
  );
};

const VoteCode: React.FC<React.PropsWithChildren<{
  ballotRun: BallotRunFieldsFragment;
  code: string;
  voted: boolean;
  refetch: () => void;
}>> = ({ ballotRun, code, voted, refetch }) => {
  const [error, setError] = useState("");
  const tr = useTr();
  const [success, setSuccess] = useState(false);

  const [doVoteCode] = useVoteCodeMutation({
    onCompleted() {
      setSuccess(true);
    },
    onError(err) {
      setError(tr(err.message));
    },
  });
  if (!isBrowser()) return null;

  const now = new Date();
  const start = ballotRun.start ? new Date(ballotRun.start) : undefined;
  const end = ballotRun.end ? new Date(ballotRun.end) : undefined;
  if (success || voted) return <VotySuccess />;

  if (!start || start > now)
    return (
      <Flex>
        <BigGray>Abstimmung noch nicht gestartet </BigGray>
        <Button onClick={() => refetch()} fontSize={2}>
          Seite Aktualisieren
        </Button>
      </Flex>
    );

  if (end && end < now) return <BigGray>Abstimmung bereits beendet</BigGray>;

  async function vote(ballotRunId: string, code: string, vote: number) {
    await doVoteCode({ variables: { ballotRunId, code, vote } });
  }

  return (
    <Text sx={{ margin: "0 auto" }}>
      <Box variant="centered">
        <Box width={["100%", "100%", 400]}>
          <img src="/images/voty_now.svg" alt="Abstimmen" width="100%" />
          <Box px={[0, 0, 2]} mt={[-10]}>
            <Box fontSize={2}>
              <Flex justifyContent="space-around">
                <A onClick={() => vote(ballotRun.id, code, 1)}>
                  <Flex flexDirection="column" alignItems="center">
                    <Image src="/images/icon_yes.svg" height="50px" alt="Ja" />
                    <Text mt={1}>Ja, ich stimme zu</Text>
                  </Flex>
                </A>
                <A onClick={() => vote(ballotRun.id, code, 2)}>
                  <Flex flexDirection="column" alignItems="center">
                    <Image src="/images/icon_no.svg" height="50px" alt="Nein" />
                    <Text mt={1}>Nein, ich lehne ab</Text>
                  </Flex>
                </A>
              </Flex>
              <Box variant="centered" mt={3} mb={4}>
                <A
                  onClick={() => vote(ballotRun.id, code, 0)}
                  variant="underline"
                >
                  <Text fontSize={1}>Ich möchte mich der Stimme enthalten</Text>
                </A>
              </Box>
              <ErrorBox my={2} error={error} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Text>
  );
};

const VotySuccess: React.FC<React.PropsWithChildren<unknown>> = () => (
  <>
    <Text mb={4}>
      Super, du hast nun anonym abgestimmt und deine Stimme wurde gezählt.
    </Text>
    <Box textAlign="center">
      <img
        src="/images/voty_success.svg"
        alt="Juhee"
        style={{ width: "440px", maxWidth: "80%" }}
      />
    </Box>
  </>
);
