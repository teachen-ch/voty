import { AppPage, LoggedInPage, ErrorPage } from "components/Page";
import { Text, Box, Image, Button, Flex } from "components/ui";
import { useRouter } from "next/router";
import { useUser } from "state/user";
import { useBallotQuery, BallotQuery, useVoteMutation } from "graphql/types";
import { useState, ReactElement } from "react";
import { ErrorBox } from "components/Form";
import { Info } from "components/Info";
import Link from "next/link";
import { BigGray } from "components/BigButton";
import { BallotDetails } from "components/Ballots";
import { Breadcrumb, Here } from "components/Breadcrumb";
import { A } from "components/A";
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
          className="mt-4 w-full"
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

export const VotyNow: React.FC<
  React.PropsWithChildren<{
    ballot: BallotQuery["ballot"];
    onSuccess: () => void;
    slim?: boolean;
    loginLink?: string;
  }>
> = ({ ballot, onSuccess, slim, loginLink = "/user/login" }) => {
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
    <Box className="mx-auto">
      <Box className="flex justify-center">
        <Box className="w-full sm:w-100">
          {!slim && (
            <img src={`/images/voty_now.svg`} alt="Abstimmen" width="100%" />
          )}
          <Box className="px-0 sm:px-2 mt-8">
            <Box className="text-base">
              <Flex className="justify-around">
                <A onClick={() => vote(ballot.id, 1)}>
                  <Flex className="flex-col items-center">
                    <Image src="/images/icon_yes.svg" height={50} alt="Ja" />
                    <span className="mt-1 text-sm md:text-base">
                      {tr("VotyNow.Yes")}
                    </span>
                  </Flex>
                </A>
                <A onClick={() => vote(ballot.id, 2)}>
                  <Flex className="flex-col items-center">
                    <Image
                      src="/images/icon_no.svg"
                      width={26}
                      height={50}
                      alt="Nein"
                    />
                    <span className="mt-1 text-sm md:text-base">
                      {tr("VotyNow.No")}
                    </span>
                  </Flex>
                </A>
              </Flex>
              <Box className="flex justify-center mt-4 mb-8">
                <A onClick={() => vote(ballot.id, 0)} className="underline">
                  <span className="text-sm">{tr("VotyNow.Abstain")}</span>
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

export const VotySuccess: React.FC<
  React.PropsWithChildren<{ name: Nullable<string> }>
> = ({ name }) => (
  <>
    <Text className="mb-8">
      Super, {name}, du hast nun anonym abgestimmt und deine Stimme wurde
      gezählt. Die Resultate der Abstimmung könnt ihr mit eurer Lehrperson
      ansehen und besprechen.
    </Text>
    <Box className="text-center">
      <img
        src="/images/voty_success.svg"
        alt="Juhee"
        style={{ maxWidth: "240px" }}
      />
    </Box>
  </>
);
