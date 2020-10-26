import { AppPage, LoggedInPage, ErrorPage } from "components/Page";
import { Text, Box, Button, Card, Flex, Heading, Link as A } from "rebass";
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
  const [success, setSuccess] = useState(false);
  const [votyNow, setVotyNow] = useState(false);
  const router = useRouter();
  const user = useUser();
  const id = String(router.query.id);
  const ballotQuery = useBallotQuery({ variables: { where: { id } } });

  if (ballotQuery.loading)
    return <AppPage heading="Abstimmungsseite"></AppPage>;
  if (ballotQuery.error)
    return <ErrorPage>{ballotQuery.error.message}</ErrorPage>;

  const ballot = ballotQuery.data?.ballot;

  if (!ballot) {
    return (
      <AppPage heading="Abstimmung">
        Abstimmung konnte nicht gefunden werden
      </AppPage>
    );
  }
  if (success) {
    return (
      <LoggedInPage heading="Du hast abgestimmt!">
        <Box mt={4} mb={3} fontSize={2}>
          <Link href="/student/">
            <A variant="underline">Start</A>
          </Link>
          {" / "}
          <Link href="/student/">
            <A variant="underline">Abstimmungen</A>
          </Link>
          {" / "}
          <A variant="underline" onClick={() => setSuccess(false)}>
            {ballot.title}
          </A>
          {" / "}
          <A variant="semi">Deine Stimme</A>
        </Box>
        <Text mb={4}>
          Super, {user?.name}, Du hast nun anonym abgestimmt und Deine Stimme
          wurde gezählt. Die Resultate der Abbstimmung könnt ihr mit Eurer
          Lerhperson ansehen und besprechen.
        </Text>
        <Box textAlign="center">
          <img src="/images/voty_success.svg" />
        </Box>
        <Button
          variant="secondary"
          mt={4}
          width="100%"
          onClick={() => void router.push("/student/test")}
        >
          Zu den Abstimmungen
        </Button>
      </LoggedInPage>
    );
  }

  if (votyNow) {
    return (
      <LoggedInPage heading="Und jetzt Du!">
        <Text textAlign="center" maxWidth="450px" sx={{ margin: "0 auto" }}>
          <Heading mt={0}>Jetzt bist du dran! Wie stimmst Du ab?</Heading>
          <img src="/images/voty_now.svg" />
          <VotyNow
            ballot={ballot}
            onSuccess={() => {
              window.scrollTo(0, 0);
              setSuccess(true);
            }}
          />
          <Text>
            <Button mt={4} variant="text" onClick={() => setVotyNow(false)}>
              Abbrechen
            </Button>
          </Text>
        </Text>
      </LoggedInPage>
    );
  }

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
        <div
          dangerouslySetInnerHTML={parseMarkdownInner(ballot.body)}
          style={{ textAlign: "left" }}
        />
        <Heading>
          <hr />
          Alles klar? Dann ab zur Abstimmung!
        </Heading>
        <Button
          onClick={() => {
            window.scrollTo(0, 0);
            setVotyNow(true);
          }}
          variant="secondary"
        >
          Zur Abstimmung
        </Button>
      </Card>
    </LoggedInPage>
  );
}

const VotyNow: React.FC<{
  ballot: BallotQuery["ballot"];
  onSuccess: () => void;
}> = ({ ballot, onSuccess }) => {
  if (!ballot) return null;
  const [error, setError] = useState("");
  const user = useUser();
  const [doVote] = useVoteMutation({
    onCompleted() {
      onSuccess();
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
  if (ballot.hasVoted === true) {
    return <BigGray>Du hast erfolgreich abgestimmt</BigGray>;
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
