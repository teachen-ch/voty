import { LoggedInPage } from "components/Page";
import { Text, Heading, Box, Card, Button, Image } from "components/ui";
import { ReadMore } from "components/ReadMore";
import { useUser, SessionUser } from "state/user";
import React, { useState } from "react";
import {
  BallotScope,
  BallotFieldsFragment,
  useGetBallotRunsQuery,
  useBallotsQuery,
  useBallotQuery,
  BallotRunFieldsFragment,
} from "graphql/types";
import { Markdown } from "util/markdown";
import { VotyNow, VotySuccess } from "pages/team/[team]/ballots/[ballot]";
import { OneRowTable } from "components/Table";

export default function StudentTest(): React.ReactElement {
  const user = useUser();

  if (!user || !user.team) {
    return <LoggedInPage heading="Meine Klasse" />;
  }
  return <ShowBallots user={user} />;
}

const ShowBallots: React.FC<React.PropsWithChildren<{ user: SessionUser }>> = ({ user }) => {
  const ballotRunsQuery = useGetBallotRunsQuery({
    variables: { teamId: String(user?.team?.id) },
    skip: !user?.team,
  });
  const ballotRuns = ballotRunsQuery.data?.getBallotRuns;

  if (ballotRunsQuery.loading) {
    return <Text>Laden...</Text>;
  }

  if (ballotRuns?.length === 0) {
    return null;
  }

  return (
    <Box id="ballots">
      <Heading>Abstimmungen</Heading>
      <Text>
        Hier kannst du zu den aktuellen nationalen Abstimmungsvorlagen anonym
        deine Stimme abgeben.
      </Text>
      {
        ballotRuns?.length
          ? ballotRuns.map(
              (run) => run && <BallotRunDetail run={run} key={run.id} />
            )
          : null
      }
    </Box>
  );
};

const BallotRunDetail: React.FC<React.PropsWithChildren<{ run: BallotRunFieldsFragment }>> = ({
  run,
}) => {
  const ballotQuery = useBallotQuery({
    variables: { where: { id: run?.id } },
  });
  const ballot = ballotQuery.data?.ballot;
  if (!ballot) return null;
  return ballot && <Ballot key={run.id} ballot={ballot} />;
};

export const AllBallots: React.FC<React.PropsWithChildren<unknown>> = () => {
  const ballotsQuery = useBallotsQuery({
    variables: { where: { scope: { equals: BallotScope.National } } },
  });

  if (ballotsQuery.error) {
    return <Text>Error loading data: {ballotsQuery.error.message}</Text>;
  }
  if (ballotsQuery.loading) {
    return <Text>Loading data</Text>;
  }

  if (!ballotsQuery.data?.ballots?.length) {
    return <OneRowTable text="Noch keine Abstimmungen erfasst" />;
  }

  return (
    <>
      {ballotsQuery.data.ballots.map((ballot) => (
        <Ballot key={ballot.id} ballot={ballot} />
      ))}
    </>
  );
};

export const Ballot: React.FC<React.PropsWithChildren<{
  ballot: BallotFieldsFragment;
}>> = ({ ballot }) => {
  const [voty, setVoty] = useState(false);
  const [success, setSuccess] = useState(false);
  const user = useUser();
  return (
    <div className="ballot">
      <Card>
        <Text className="font-bold mt-2 text-[24px] leading-[24px]">
          {ballot.title}
        </Text>
        {success ? (
          <VotySuccess name={user?.name} />
        ) : (
          <>
            <Text className="mt-4">{ballot.description}</Text>
            <Box className="text-center my-4">
              <Image
                className="w-[100px] sm:w-[150px]"
                src="/images/easyvote.png"
                alt="Informationen von EasyVote"
              />
            </Box>
            <ReadMore title="Nochmals genauer informieren" hidePlus>
              <Markdown>{ballot.body}</Markdown>
            </ReadMore>
            {voty ? (
              <>
                <Text variant="semi" className="mt-8">
                  Jetzt bist du dran! Hast du Dir eine Meinung gebildet? Was
                  stimmst Du?
                </Text>
                <VotyNow ballot={ballot} onSuccess={() => setSuccess(true)} />
              </>
            ) : (
              <Button className="mt-4 w-full" onClick={() => setVoty(true)}>
                Jetzt abstimmen
              </Button>
            )}
          </>
        )}
      </Card>
    </div>
  );
};
