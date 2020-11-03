import { LoggedInPage } from "components/Page";
import { Text, Box, Card, Button, Image } from "rebass";
import { ReadMore } from "components/ReadMore";
import { useUser, SessionUser } from "state/user";
import { Breadcrumb, A } from "components/Breadcrumb";
import { useState } from "react";
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

  return (
    <LoggedInPage heading="Aktuelle Abstimmungen">
      <Breadcrumb>
        <A href="/">Start</A>
        <b>Abstimmungen</b>
      </Breadcrumb>
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

  return (
    <Box id="ballots">
      {ballotRuns?.length ? (
        ballotRuns.map((run) => <Ballot key={run.id} ballot={run.ballot} />)
      ) : (
        <AllBallots />
      )}
    </Box>
  );
};

export const AllBallots: React.FC = () => {
  const ballotsQuery = useBallotsQuery({
    variables: { where: { scope: BallotScope.National } },
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
        <Text fontWeight="bold">{ballot.title}</Text>
        {success ? (
          <VotySuccess name={user?.name} />
        ) : (
          <>
            <Text mt={3}>{ballot.description}</Text>
            <Image
              width={100}
              my={3}
              src="/images/easyvote.png"
              alt="EasyVote"
            />
            <ReadMore title="Nochmals genauer informieren" hidePlus>
              <div
                dangerouslySetInnerHTML={parseMarkdownInner(ballot.body)}
                style={{ textAlign: "left" }}
              />
            </ReadMore>
            {voty ? (
              <VotyNow ballot={ballot} onSuccess={() => setSuccess(true)} />
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
