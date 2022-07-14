import { AppPage, LoggedInPage, ErrorPage } from "components/Page";
import { Text, Box, Image, Button, Flex } from "rebass";
import { useRouter } from "next/router";
import { useUser } from "state/user";
import { useBallotQuery, BallotQuery, useVoteMutation } from "graphql/types";
import { useState, ReactElement } from "react";
import { ErrorBox } from "components/Form";
import { Info } from "components/Info";
import Link from "next/link";
import { BigGray } from "components/BigButton";
import { BallotDetails } from "components/Ballots";
import { Breadcrumb, A, Here } from "components/Breadcrumb";
import { Nullable } from "simplytyped";
import { Discussion } from "components/Discussion";
import { HideFeature } from "components/HideFeature";
import { useTr } from "util/translate";

export default function BallotPage(): ReactElement {
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const user = useUser();
  const ballotId = String(router.query.ballot);
  const ballotQuery = useBallotQuery({
    variables: { where: { id: ballotId } },
  });

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
          <A href="/student/">Meine Klasse</A>
          <Here>{ballot.title}</Here>
        </Breadcrumb>
        <VotySuccess name={user?.name} />
        <Button
          mt={3}
          width="100%"
          onClick={() => {
            window.scrollTo(0, 0);
            void router.push("/student/");
          }}
        >
          Zu den Abstimmungen
        </Button>
      </LoggedInPage>
    );
  }

  return (
    <LoggedInPage heading={ballot.title}>
      <Breadcrumb>
        <A href="/student/">Meine Klasse</A>
        <Here>{ballot.title}</Here>
      </Breadcrumb>

      <Text>
        Jetzt bist du dran! Hast du Dir eine Meinung gebildet? Wie stimmst Du
        ab? Deine Wahl ist anonym, niemand kann nachverfolgen, wie du abstimmst.
      </Text>

      <BallotDetails ballot={ballot}>
        <VotyNow ballot={ballot} onSuccess={() => setSuccess(true)} />
      </BallotDetails>

      <HideFeature id="discussions">
        <Discussion ballotId={ballot.id} />
      </HideFeature>
    </LoggedInPage>
  );
}

export const VotyNow: React.FC<{
  ballot: BallotQuery["ballot"];
  onSuccess: () => void;
  slim?: boolean;
  loginLink?: string;
}> = ({ ballot, onSuccess, slim, loginLink = "/user/login" }) => {
  const [error, setError] = useState("");
  const tr = useTr();
  const user = useUser();
  const [doVote] = useVoteMutation({
    onCompleted() {
      onSuccess();
    },
    onError(err) {
      setError(err.message);
    },
  });
  if (!ballot) return null;

  if (!user) {
    return (
      <Info type="default">
        {tr("VotyNow.Login")}{" "}
        <Link href={loginLink}>{tr("VotyNow.LoginLink")}</Link>.
      </Info>
    );
  }

  const now = new Date();
  if (ballot.hasVoted === true) {
    return <BigGray>{tr("VotyNow.Success")}</BigGray>;
  }
  if (new Date(ballot.start) > now) {
    return <BigGray>{tr("VotyNow.NotStarted")}</BigGray>;
  }
  if (new Date(ballot.end) < now) {
    return <BigGray>{tr("VotyNow.Closed")}</BigGray>;
  }
  if (ballot.canVote === false) {
    return <BigGray>{tr("VotyNow.Permission")}</BigGray>;
  }

  async function vote(ballotId: string, vote: number) {
    return doVote({ variables: { ballotId, vote } });
  }

  return (
    <Text sx={{ margin: "0 auto" }}>
      <Box variant="centered">
        <Box width={["100%", "100%", 400]}>
          {!slim && (
            <img src={`/images/voty_now.svg`} alt="Abstimmen" width="100%" />
          )}
          <Box px={[0, 0, 2]} mt={10}>
            <Box fontSize={2}>
              <Flex justifyContent="space-around">
                <A onClick={() => vote(ballot.id, 1)}>
                  <Flex flexDirection="column" alignItems="center">
                    <Image src="/images/icon_yes.svg" height="50px" alt="Ja" />
                    <Text mt={1}>{tr("VotyNow.Yes")}</Text>
                  </Flex>
                </A>
                <A onClick={() => vote(ballot.id, 2)}>
                  <Flex flexDirection="column" alignItems="center">
                    <Image src="/images/icon_no.svg" height="50px" alt="Nein" />
                    <Text mt={1}>{tr("VotyNow.No")}</Text>
                  </Flex>
                </A>
              </Flex>
              <Box variant="centered" mt={3} mb={4}>
                <A onClick={() => vote(ballot.id, 0)} variant="underline">
                  <Text fontSize={1}>{tr("VotyNow.Abstain")}</Text>
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

export const VotySuccess: React.FC<{ name: Nullable<string> }> = ({ name }) => (
  <>
    <Text mb={4}>
      Super, {name}, du hast nun anonym abgestimmt und deine Stimme wurde
      gezählt. Die Resultate der Abstimmung könnt ihr mit Eurer Lehrperson
      ansehen und besprechen.
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
