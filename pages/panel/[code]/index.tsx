import { ErrorPage, LoadingPage } from "components/Page";
import { Text, Box, Image, Flex, Card, Button, Link as A } from "components/ui";
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
      <Box className="mt-[300px]" />
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
    <Card key={ballotRun.id} className="py-4">
      <Text className="font-bold text-[24px] leading-[24px]">
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
        <Button onClick={() => refetch()} className="text-base">
          Seite Aktualisieren
        </Button>
      </Flex>
    );

  if (end && end < now) return <BigGray>Abstimmung bereits beendet</BigGray>;

  async function vote(ballotRunId: string, code: string, vote: number) {
    await doVoteCode({ variables: { ballotRunId, code, vote } });
  }

  return (
    <Box className="mx-auto">
      <Box className="flex justify-center">
        <Box className="w-full sm:w-[400px]">
          <img src="/images/voty_now.svg" alt="Abstimmen" width="100%" />
          <Box className="px-0 sm:px-2 mt-[-10px]">
            <Box className="text-base">
              <Flex className="justify-around">
                <A onClick={() => vote(ballotRun.id, code, 1)}>
                  <Flex className="flex-col items-center">
                    <Image src="/images/icon_yes.svg" height={50} alt="Ja" />
                    <span className="mt-1">Ja, ich stimme zu</span>
                  </Flex>
                </A>
                <A onClick={() => vote(ballotRun.id, code, 2)}>
                  <Flex className="flex-col items-center">
                    <Image src="/images/icon_no.svg" height={50} alt="Nein" />
                    <span className="mt-1">Nein, ich lehne ab</span>
                  </Flex>
                </A>
              </Flex>
              <Box className="flex justify-center mt-4 mb-8">
                <A
                  onClick={() => vote(ballotRun.id, code, 0)}
                  className="underline"
                >
                  <span className="text-sm">Ich möchte mich der Stimme enthalten</span>
                </A>
              </Box>
              <ErrorBox className="my-2" error={error} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const VotySuccess: React.FC<React.PropsWithChildren<unknown>> = () => (
  <>
    <Text className="mb-8">
      Super, du hast nun anonym abgestimmt und deine Stimme wurde gezählt.
    </Text>
    <Box className="text-center">
      <img
        src="/images/voty_success.svg"
        alt="Juhee"
        style={{ width: "440px", maxWidth: "80%" }}
      />
    </Box>
  </>
);
