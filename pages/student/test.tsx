import { LoggedInPage } from "components/Page";
import { Text, Heading, Box, Card, Button, Image } from "rebass";
import { ReadMore } from "components/ReadMore";
import { useUser, SessionUser } from "state/user";
import { Breadcrumb, A } from "components/Breadcrumb";
import React, { useState } from "react";
import { CardList } from "components/Cards";
import {
  BallotScope,
  BallotFieldsFragment,
  useGetBallotRunsQuery,
  useBallotsQuery,
} from "graphql/types";
import { parseMarkdownInner } from "util/markdown";
import { VotyNow, VotySuccess } from "pages/ballots/[id]";

export default function StudentTest(): React.ReactElement {
  const user = useUser();

  if (!user) {
    return <LoggedInPage heading="Aktuelle Abstimmungen" />;
  }

  return (
    <LoggedInPage heading="Aktuelle Abstimmungen">
      <Breadcrumb>
        <A href="/">Start</A>
        <b>Abstimmungen</b>
      </Breadcrumb>
      <Heading>Lerninhalte</Heading>

      <CardList teamCards={String(user.team?.cards)} />

      <Heading>Abstimmungen</Heading>
      <Text>
        Hier kannst Du zu den aktuellen nationalen Abstimmungsvorlagen anonym
        Deine Stimme abgeben.
      </Text>
      <ShowBallots user={user} />
    </LoggedInPage>
  );
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

  return (
    <Box id="ballots">
      {ballotRuns?.length ? (
        ballotRuns.map(
          (run) => run && <Ballot key={run.id} ballot={run.ballot} />
        )
      ) : (
        <AllBallots />
      )}
    </Box>
  );
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
    return <Text>Noch keine Abstimmungen erfasst</Text>;
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
              <div
                dangerouslySetInnerHTML={parseMarkdownInner(ballot.body)}
                style={{ textAlign: "left" }}
              />
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
