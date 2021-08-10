import { Loading } from "components/Page";
import { BallotScope, useUserBallotsQuery } from "graphql/types";
import { Box, Button, Card, Flex, Heading, Image, Text } from "rebass";
import { Logos, ZDAFullPage, ZDAFAQ } from "./index";
import { useState } from "react";
import { getUserBallotStatus } from "components/Ballots";
import { Markdown } from "util/markdown";
import { VotyNow } from "pages/team/[team]/ballots/[ballot]";
import { Detail } from "pages/projekt";

export default function ZDAVote(): React.ReactElement {
  return (
    <ZDAFullPage heading="Jetzt zu allen Vorlagen abstimmen">
      Jetzt bist Du dran! Diskutiere die Vorlagen, bilde Dir eine eigene Meinung
      und stimme ab!
      <Flex justifyContent="space-between" alignItems="flex-end">
        <Heading fontSize={[2, 2, 3]}>
          Initiativen «SpielPolitik!» / Schulen nach Bern
        </Heading>
        <Image
          src="/images/logo_schulen_nach_bern2.png"
          width={100}
          height={45}
          mb={2}
          alt="Schulen nach Bern Logo"
        />
      </Flex>
      <ZDABallots scope={BallotScope.Public} />
      <Flex justifyContent="space-between" alignItems="flex-end">
        <Heading mt={5} fontSize={[2, 2, 3]}>
          Eidgenössische Abstimmungen vom 26. September
        </Heading>
        <Image
          src="/images/easyvote.png"
          width={100}
          height={36}
          mb={2}
          alt="EasyVote Logo"
        />
      </Flex>
      <ZDABallots scope={BallotScope.National} />
      <Text variant="fielderror">
        Die neuen Abstimmungen werden am Montag, 30. August 2021 aufgeschaltet
      </Text>
      <ZDAFAQ />
      <Box mt={5}></Box>
      <Logos />
    </ZDAFullPage>
  );
}

const ZDABallots: React.FC<{ scope: BallotScope }> = ({ scope }) => {
  const [detail, setDetail] = useState("");

  const ballotsQuery = useUserBallotsQuery({
    variables: { where: { scope: { equals: scope } } },
  });
  const ballots = ballotsQuery.data?.ballots;

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
                {detail === ballot.id ? "Abbrechen" : "Jetzt abstimmen"}
              </Button>
            ) : (
              <Text fontSize={1}>{getUserBallotStatus(ballot)}</Text>
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
                <VotyNow slim ballot={ballot} onSuccess={successVoted} />
              </Text>
            </Card>
          )}
        </Box>
      ))}
    </Box>
  );
};
