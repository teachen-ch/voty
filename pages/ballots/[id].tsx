import { Page, LoggedInPage, ErrorPage } from "components/Page";
import { Text, Box, Button, Card, Flex, Link as A } from "rebass";
import { useRouter } from "next/router";
import { useUser } from "state/user";
import { formatFromTo } from "util/date";
import { useBallotQuery, BallotQuery, useVoteMutation } from "graphql/types";
import { useState, ReactElement } from "react";
import { ErrorBox } from "components/Form";
import Info from "components/Info";
import Link from "next/link";
import { parseMarkdownInner } from "util/markdown";
import { BigGray } from "components/BigButton";

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
    <LoggedInPage heading="Abstimmen">
      <Text>
        Hier kannst Du zu den aktuellen nationalen Abstimmungsvorlagen anonym
        Deine Stimme abgeben.
      </Text>
      <Box mt={4} mb={3} fontSize={2}>
        <Link href="/student/">
          <A variant="underline">Start</A>
        </Link>
        {" / "}
        <Link href="/student/">
          <A variant="underline">Abstimmungen</A>
        </Link>
        {" / "}
        <A variant="semi">{ballot.title}</A>
      </Box>

      <Card>
        <Text fontWeight="bold">{ballot.title}</Text>
        <Text mt={3}>{ballot.description}</Text>
        <Text fontSize={2} my={4}>
          <img src="/images/icon_cal.svg" /> &nbsp; Zeit:{" "}
          {formatFromTo(ballot.start, ballot.end)}
        </Text>
        <Text textAlign="center">
          <img width={150} src="/images/easyvote.png" />
        </Text>
        <div dangerouslySetInnerHTML={parseMarkdownInner(ballot.body)} />
        <Box my={4}>
          <VotyNow ballot={ballot} />
        </Box>
      </Card>
    </LoggedInPage>
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

  const now = new Date();
  if (ballot.hasVoted === true || success) {
    return <BigGray>Du hast erfolgreich abgestimmt ✅</BigGray>;
  }
  if (new Date(ballot.start) > now) {
    return <BigGray>Abstimmung noch nicht gestartet</BigGray>;
  }
  if (new Date(ballot.end) < now) {
    return <BigGray>Abstimmung ist beendet</BigGray>;
  }

  if (ballot.canVote === false) {
    return <BigGray>Du bist nicht für die Abstimmung berechtigt</BigGray>;
  }

  async function vote(ballotId: string, vote: number) {
    return doVote({ variables: { ballotId, vote } });
  }

  return (
    <Box>
      <Flex justifyContent="space-between">
        <A onClick={() => vote(ballot.id, 1)} flex={1}>
          <Flex flexDirection="column" alignItems="center">
            <img src="/images/icon_yes.svg" height="100px" />
            Ja, ich stimme zu
          </Flex>
        </A>
        <A onClick={() => vote(ballot.id, 2)} flex={1}>
          <Flex flexDirection="column" alignItems="center">
            <img src="/images/icon_no.svg" height="100px" />
            Nein, ich lehne ab
          </Flex>
        </A>
      </Flex>
      <Button variant="text" my={4} textAlign="center" width="100%">
        Ich möchte mich{" "}
        <A onClick={() => vote(ballot.id, 0)}>der Stimme enthalten</A>
      </Button>
      <ErrorBox my={2} error={error} />
    </Box>
  );
};
