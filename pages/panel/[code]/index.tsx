import { ErrorPage, LoadingPage } from "components/Page";
import { Text, Box, Image, Flex, Card, Button, Link as A } from "rebass";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import {
  useGetBallotRunsQuery,
  useTeamByCodeQuery,
  useVoteCodeMutation,
  BallotRunFieldsFragment,
} from "graphql/types";
import { BigGray } from "components/BigButton";
import { ErrorBox } from "components/Form";
import { getBrowserCookie } from "util/cookies";
import { isBrowser } from "util/isBrowser";
import { tr } from "util/translate";
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
    <PanelPage heading="Jetzt bist Du dran!">
      {ballotRuns?.length
        ? ballotRuns.map(
            (ballotRun) =>
              ballotRun && (
                <Card key={ballotRun.id} py={3}>
                  <Text fontWeight="bold" fontSize="24px" lineHeight="24px">
                    {ballotRun.ballot.title}
                  </Text>
                  <VoteCode
                    ballotRun={ballotRun}
                    refetch={refetch}
                    code={code}
                    voted={cookie[ballotRun.id] ? true : false}
                  />
                </Card>
              )
          )
        : "Keine Abstimmungen gefunden."}
      <Box mt={300} />
    </PanelPage>
  );
}

const VoteCode: React.FC<{
  ballotRun: BallotRunFieldsFragment;
  code: string;
  voted: boolean;
  refetch: () => void;
}> = ({ ballotRun, code, voted, refetch }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  if (!isBrowser()) return null;

  const [doVoteCode] = useVoteCodeMutation({
    onCompleted() {
      setSuccess(true);
    },
    onError(err) {
      setError(tr(err.message));
    },
  });

  const now = new Date();
  const start = ballotRun.start ? new Date(ballotRun.start) : undefined;
  const end = ballotRun.end ? new Date(ballotRun.end) : undefined;
  if (success || voted) return <VotySuccess />;

  if (!start || start > now)
    return (
      <BigGray>
        Abstimmung noch nicht gestartet{" "}
        <Button onClick={() => refetch()} fontSize={2}>
          Seite Aktualisieren
        </Button>
      </BigGray>
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

const VotySuccess: React.FC = () => (
  <>
    <Text mb={4}>
      Super, Du hast nun anonym abgestimmt und Deine Stimme wurde gezählt.
    </Text>
    <Box textAlign="center">
      <img
        src="/images/voty_success.svg"
        alt="Juhee"
        style={{ maxWidth: "240px" }}
      />
    </Box>
  </>
);
