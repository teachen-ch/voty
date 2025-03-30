import { Loading } from "components/Page";
import { BallotScope, Role, useUserBallotsQuery } from "graphql/types";
import { Box, Button, Card, Flex, Heading, Image, Text } from "rebass";
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

  // ask for demographics on first login
  if (user?.year === null && user?.role === Role.Student) {
    return (
      <ZDAVoteTemplate>
        {tr("ZDA.Vote.Intro")}
        <Text my={2} mt={4}>
          {tr("Profile.Intro")}
        </Text>
        <ProfileEdit user={user} editMode={true} skipName />
      </ZDAVoteTemplate>
    );
  }
  return (
    <ZDAVoteTemplate>
      {tr("ZDA.Vote.Intro")}
      <Flex justifyContent="space-between" alignItems="flex-end">
        <Heading fontSize={[2, 2, 3]}>{tr("ZDA.Vote.Header1")}</Heading>
        <Image
          src="/images/logo_schulen_nach_bern2.png"
          width={100}
          height={45}
          mb={2}
          alt="Schulen nach Bern Logo"
        />
      </Flex>
      <Box height={2} bg="#000" />
      <ZDAResultPies />

      <Flex justifyContent="space-between" alignItems="flex-end">
        <Heading mt={5} fontSize={[2, 2, 3]}>
          {tr("ZDA.Vote.Header2")}
        </Heading>
        <Image
          src="/images/easyvote.png"
          width={100}
          height={36}
          mb={2}
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
      <Box mt={5}></Box>
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

  // only show ballots with end-date less than maxAge days ago
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
      mt={-1}
      id="ballots"
      style={{ borderTop: "2px solid", borderBottom: "1px solid" }}
    >
      {ballots.map((ballot) => (
        <Box
          key={ballot.id}
          width="100%"
          style={{ borderBottom: "1px solid" }}
          py={2}
        >
          <Flex
            flexDirection={["column", "column", "row"]}
            justifyContent={["space-between"]}
            alignItems={["", "", "center"]}
          >
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
              <Text fontSize={1}>{tr(getUserBallotStatus(ballot))}</Text>
            )}
          </Flex>

          {detail == ballot.id && (
            <Card>
              <Heading mt={0}>{ballot.title}</Heading>
              <Text fontSize={[1, 2, 2]}>
                {ballot.description}
                <Detail>
                  <Box fontSize={1} mb={4}>
                    <Markdown>{ballot.body}</Markdown>
                  </Box>
                </Detail>
                <VotyNow
                  slim
                  ballot={ballot}
                  onSuccess={successVoted}
                  loginLink="/spielpolitik"
                />
              </Text>
            </Card>
          )}
        </Box>
      ))}
    </Box>
  );
};
