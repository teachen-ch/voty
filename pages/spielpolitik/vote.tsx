import { Loading } from "components/Page";
import { BallotScope, Role, useUserBallotsQuery } from "graphql/types";
import { Box, Button, Card, Flex, Heading, Image, Text } from "components/ui";
import { Logos, ZDAFullPage, ZDAFAQ } from "./index";
import { useState } from "react";
import { getUserBallotStatus } from "components/Ballots";
import { Markdown } from "util/markdown";
import { VotyNow } from "pages/team/[team]/ballots/[ballot]";
import { Detail } from "pages/projekt";
import { useTr } from "util/translate";
import { useUser } from "state/user";
import { ProfileEdit } from "components/Users";
import { ZDAResultPies } from "./resultate";

const SKIP_DEMOGRAPHICS =
  process.env.SKIP_DEMOGRAPHICS?.toUpperCase() === "TRUE";

export default function ZDAVote(): React.ReactElement {
  const tr = useTr();
  const user = useUser();

  if (user?.year === null && user?.role === Role.Student) {
    return (
      <ZDAVoteTemplate>
        {tr("ZDA.Vote.Intro")}
        <Text className="my-2 mt-8">
          {tr("Profile.Intro")}
        </Text>
        <ProfileEdit user={user} editMode={true} skipName />
      </ZDAVoteTemplate>
    );
  }
  return (
    <ZDAVoteTemplate>
      {tr("ZDA.Vote.Intro")}
      <Flex className="justify-between items-end">
        <Heading className="text-base sm:text-lg">{tr("ZDA.Vote.Header1")}</Heading>
        <Image
          src="/images/logo_schulen_nach_bern2.png"
          width={100}
          height={45}
          className="mb-2"
          alt="Schulen nach Bern Logo"
        />
      </Flex>
      <Box className="h-[2px] bg-black" />
      <ZDAResultPies />

      <Flex className="justify-between items-end">
        <Heading className="mt-16 text-base sm:text-lg">
          {tr("ZDA.Vote.Header2")}
        </Heading>
        <Image
          src="/images/easyvote.png"
          width={100}
          height={36}
          className="mb-2"
          alt="EasyVote Logo"
        />
      </Flex>
      <ZDABallots scope={BallotScope.National} maxAge={45} />
    </ZDAVoteTemplate>
  );
}

const ZDAVoteTemplate: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const tr = useTr();
  return (
    <ZDAFullPage heading={tr("ZDA.Header")}>
      {children}
      <ZDAFAQ />
      <Box className="mt-16" />
      <Logos />
    </ZDAFullPage>
  );
};

const ZDABallots: React.FC<React.PropsWithChildren<{ scope: BallotScope; maxAge: number }>> = ({
  scope,
  maxAge,
}) => {
  const [detail, setDetail] = useState("");
  const tr = useTr();

  const ballotsQuery = useUserBallotsQuery({
    variables: {
      where: {
        scope: { equals: scope },
      },
    },
  });

  const old = maxAge * 24 * 60 * 60 * 1000;
  const ballots = maxAge
    ? ballotsQuery.data?.ballots.filter(
        (ballot) => new Date(ballot.end).getTime() > Date.now() - old
      )
    : ballotsQuery.data?.ballots;

  if (!ballots || ballotsQuery.loading) return <Loading />;

  function detailBallot(id: string) {
    if (detail === id) {
      setDetail("");
    } else {
      setDetail(id);
    }
  }

  async function successVoted() {
    await ballotsQuery.refetch();
    setDetail("");
  }

  return (
    <Box
      className="mt-[-4px]"
      id="ballots"
      style={{ borderTop: "2px solid", borderBottom: "1px solid" }}
    >
      {ballots.map((ballot) => (
        <Box
          key={ballot.id}
          className="w-full py-2"
          style={{ borderBottom: "1px solid" }}
        >
          <Flex className="flex-col sm:flex-row justify-between sm:items-center">
            <Text>{ballot.title}</Text>
            {ballot.canVote ? (
              <Button
                onClick={() => detailBallot(ballot.id)}
                variant={detail === ballot.id ? "secondary" : "primary"}
              >
                {detail === ballot.id
                  ? tr("ZDA.Vote.Cancel")
                  : tr("ZDA.Vote.VoteNow")}
              </Button>
            ) : (
              <Text className="text-sm">{tr(getUserBallotStatus(ballot))}</Text>
            )}
          </Flex>

          {detail == ballot.id && (
            <Card>
              <Heading className="mt-0">{ballot.title}</Heading>
              <Box className="text-sm xs:text-base">
                {ballot.description}
                <Detail>
                  <Box className="text-sm mb-8">
                    <Markdown>{ballot.body}</Markdown>
                  </Box>
                </Detail>
                <VotyNow
                  slim
                  ballot={ballot}
                  onSuccess={successVoted}
                  loginLink="/spielpolitik"
                />
              </Box>
            </Card>
          )}
        </Box>
      ))}
    </Box>
  );
};
