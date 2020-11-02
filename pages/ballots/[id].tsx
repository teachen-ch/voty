import { AppPage, LoggedInPage, ErrorPage } from "components/Page";
import { Text, Box, Button, Flex, Heading } from "rebass";
import { useRouter } from "next/router";
import { useUser } from "state/user";
import { useBallotQuery, BallotQuery, useVoteMutation } from "graphql/types";
import { useState, ReactElement } from "react";
import { ErrorBox } from "components/Form";
import Info from "components/Info";
import Link from "next/link";
import { BigGray } from "components/BigButton";
import { BallotDetails } from "components/Ballots";
import { Breadcrumb, A } from "components/Breadcrumb";

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
        <Breadcrumb>
          <A href="/">Start</A>
          <A href="/student/test">Abstimmungen</A>
          <A onClick={() => setSuccess(false)}>{ballot.title}</A>
          <b>Deine Stimme</b>
        </Breadcrumb>
        <Text mb={4}>
          Super, {user?.name}, Du hast nun anonym abgestimmt und Deine Stimme
          wurde gezählt. Die Resultate der Abbstimmung könnt ihr mit Eurer
          Lehrperson ansehen und besprechen.
        </Text>
        <Box textAlign="center">
          <img
            src="/images/voty_success.svg"
            alt="Juhee"
            style={{ maxWidth: "400px" }}
          />
        </Box>
        <Button
          mt={4}
          width="100%"
          onClick={() => {
            window.scrollTo(0, 0);
            void router.push("/student/test");
          }}
        >
          Zu den Abstimmungen
        </Button>
      </LoggedInPage>
    );
  }

  if (votyNow) {
    return (
      <LoggedInPage heading="Deine Stimme">
        <Breadcrumb>
          <A href="/">Start</A>
          <A href="/student/test">Abstimmungen</A>
          <A onClick={() => setVotyNow(false)}>{ballot.title}</A>
          <b>Deine Stimme</b>
        </Breadcrumb>
        <Text textAlign="left" sx={{ margin: "0 auto" }}>
          <Text mb={3}>
            Jetzt bist du dran! Hast Du Dir eine Meinung gebildet? Wie stimmst
            Du ab? Deine Wahl ist anonym, niemand kann nachverfolgen, wie Du
            abstimmst.
          </Text>
          <Box variant="centered">
            <Box maxWidth="500px">
              <img src="/images/voty_now.svg" alt="Abstimmen" width="100%" />
              <Box px={[0, 0, 2]} mt={[0, 0, -20]}>
                <VotyNow
                  ballot={ballot}
                  onSuccess={() => {
                    window.scrollTo(0, 0);
                    setSuccess(true);
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Text>
      </LoggedInPage>
    );
  }

  return (
    <LoggedInPage heading={ballot.title}>
      <Breadcrumb>
        <A href="/">Start</A>
        <A href="/student/test">Abstimmungen</A>
        <b>{ballot.title}</b>
      </Breadcrumb>

      <Text>
        Hier kannst Du zu den aktuellen nationalen Abstimmungsvorlagen anonym
        Deine Stimme abgeben.
      </Text>

      <BallotDetails ballot={ballot}>
        <Heading>
          <hr />
          Alles klar? Dann ab zur Abstimmung!
        </Heading>
        <Button
          onClick={() => {
            window.scrollTo(0, 0);
            setVotyNow(true);
          }}
        >
          Zur Abstimmung
        </Button>
      </BallotDetails>
    </LoggedInPage>
  );
}

export const VotyNow: React.FC<{
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
        Um über diese Abstimmung abzustimmen, musst Du Dich zu erst{" "}
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
        <A onClick={() => vote(ballot.id, 1)}>
          <Flex flexDirection="column" alignItems="center">
            <img src="/images/icon_yes.svg" height="100px" alt="Ja" />
            Ja, ich stimme zu
          </Flex>
        </A>
        <A onClick={() => vote(ballot.id, 2)}>
          <Flex flexDirection="column" alignItems="center">
            <img src="/images/icon_no.svg" height="100px" alt="Nein" />
            <Text>Nein, ich lehne ab</Text>
          </Flex>
        </A>
      </Flex>
      <Box variant="centered" my={4}>
        <Button variant="text">
          <A onClick={() => vote(ballot.id, 0)}>
            Ich möchte mich der Stimme enthalten
          </A>
        </Button>
      </Box>
      <ErrorBox my={2} error={error} />
    </Box>
  );
};
