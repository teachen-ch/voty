import { LoggedInPage } from "components/Page";
import { Text, Heading, Box, Card, Button, Image } from "rebass";
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

const ShowBallots: React.FC<{ user: SessionUser }> = ({ user }) => {
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
        Hier kannst Du zu den aktuellen nationalen Abstimmungsvorlagen anonym
        Deine Stimme abgeben.
      </Text>
      {
        ballotRuns?.length
          ? ballotRuns.map(
              (run) => run && <BallotRunDetail run={run} key={run.id} />
            )
          : null //<AllBallots/>
      }
    </Box>
  );
};

const BallotRunDetail: React.FC<{ run: BallotRunFieldsFragment }> = ({
  run,
}) => {
  const ballotQuery = useBallotQuery({
    variables: { where: { id: run?.id } },
  });
  const ballot = ballotQuery.data?.ballot;
  if (!ballot) return null;
  return ballot && <Ballot key={run.id} ballot={ballot} />;
};

export const AllBallots: React.FC = () => {
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

export const Ballot: React.FC<{
  ballot: BallotFieldsFragment;
}> = ({ ballot }) => {
  const [voty, setVoty] = useState(false);
  const [success, setSuccess] = useState(false);
  const user = useUser();
  return (
    <div className="ballot">
      <Card>
        <Text fontWeight="bold" mt={2} fontSize="24px" lineHeight="24px">
          {ballot.title}
        </Text>
        {success ? (
          <VotySuccess name={user?.name} />
        ) : (
          <>
            <Text mt={3}>{ballot.description}</Text>
            <Text textAlign="center" my={3}>
              <Image
                width={["100px", "100px", "150px"]}
                src="/images/easyvote.png"
                alt="Informationen von EasyVote"
              />
            </Text>
            <ReadMore title="Nochmals genauer informieren" hidePlus>
              <Markdown>{ballot.body}</Markdown>
            </ReadMore>
            {voty ? (
              <>
                <Text fontWeight="semi" mt={4}>
                  Jetzt bist du dran! Hast Du Dir eine Meinung gebildet? Was
                  stimmst Du?
                </Text>
                <VotyNow ballot={ballot} onSuccess={() => setSuccess(true)} />
              </>
            ) : (
              <Button mt={3} onClick={() => setVoty(true)} width="100%">
                Jetzt abstimmen
              </Button>
            )}
          </>
        )}
      </Card>
    </div>
  );
};
