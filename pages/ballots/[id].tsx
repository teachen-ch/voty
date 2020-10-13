import { Page, ErrorPage } from "components/Page";
import { Text, Heading, Box, Card, Flex } from "rebass";
import { useRouter } from "next/router";
import { useUser } from "state/user";
import { formatFromTo } from "util/date";
import { useBallotQuery, BallotQuery, useVoteMutation } from "graphql/types";
import { useState, ReactElement } from "react";
import { ErrorBox } from "components/Form";
import Info from "components/Info";
import Link from "next/link";
import { parseMarkdownInner } from "util/markdown";
import { BigButton } from "components/BigButton";

export default function BallotPage(): ReactElement {
  const router = useRouter();
  const id = String(router.query.id);
  const ballotQuery = useBallotQuery({ variables: { where: { id } } });

  if (ballotQuery.loading) return <Page heading="Abstimmungsseite"></Page>;
  if (ballotQuery.error)
    return <ErrorPage>{ballotQuery.error.message}</ErrorPage>;

  const ballot = ballotQuery.data?.ballot;

  if (!ballot)
    return (
      <Page heading="Abstimmung">Abstimmung konnte nicht gefunden werden</Page>
    );

  return (
    <Page heading="Abstimmung">
      <Heading as="h2">{ballot.title}</Heading>
      <Text my={2}>{ballot.description}</Text>
      <Text my={2}>📅 Dauer: {formatFromTo(ballot.start, ballot.end)}</Text>

      <Card>
        <Text textAlign="center">
          <img
            width={150}
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.engage.ch%2Fsites%2Fdefault%2Ffiles%2Frequests%2Feasyvote.png&f=1&nofb=1"
          />
        </Text>
        <div dangerouslySetInnerHTML={parseMarkdownInner(ballot.body)} />
      </Card>
      <VotyNow ballot={ballot} />
    </Page>
  );
}

const VotyNow: React.FC<{ ballot: BallotQuery["ballot"] }> = ({ ballot }) => {
  if (!ballot) return null;
  const [error, setError] = useState("");
  const user = useUser();
  const [success, setSuccess] = useState(false);
  const [doVote] = useVoteMutation({
    onCompleted() {
      setSuccess(true);
    },
    onError(err) {
      setError(err.message);
    },
  });

  if (!user) {
    return (
      <Info type="default">
        Um über diese Abstimmung abzustimmen, musst Du dich zu erst{" "}
        <Link href="/user/login">anmelden</Link>.
      </Info>
    );
  }

  if (ballot.hasVoted === true || success) {
    return (
      <BigButton color="gray" width="100%">
        Du hast erfolgreich abgestimmt ✅
      </BigButton>
    );
  }

  const now = new Date();
  if (new Date(ballot.start) > now) {
    return (
      <BigButton color="gray" width="100%">
        Abstimmung noch nicht gestartet
      </BigButton>
    );
  }
  if (new Date(ballot.end) < now) {
    return (
      <BigButton color="gray" width="100%">
        Abstimmung ist beendet
      </BigButton>
    );
  }

  if (ballot.canVote === false) {
    return (
      <BigButton color="gray" width="100%">
        Du bist nicht für die Abstimmung berechtigt
      </BigButton>
    );
  }

  async function vote(ballotId: string, vote: number) {
    return doVote({ variables: { ballotId, vote } });
  }

  return (
    <Box my={4}>
      <Flex>
        <BigButton color="green" onClick={() => vote(ballot.id, 1)}>
          Ja, ich stimme zu
        </BigButton>
        <BigButton color="primary" onClick={() => vote(ballot.id, 2)}>
          Nein, ich lehne ab
        </BigButton>
      </Flex>
      <ErrorBox my={2} error={error} />
    </Box>
  );
};
