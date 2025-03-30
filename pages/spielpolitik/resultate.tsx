import { Box, Flex } from "rebass";
import { useBallotsQuery, useGetBallotResultsQuery } from "graphql/types";
import { trLink, useTr } from "util/translate";
import { useRouter } from "next/router";
import { Logos, ZDAFAQ, ZDAFullPage } from ".";
import { H2, H3, Loading } from "components/Page";
import { BallotScope } from "graphql/types";
import { VotyPie } from "components/BallotResults";
import { Grid } from "@theme-ui/components";
import { Center } from "components/Learning";

export default function ZDAResults(): React.ReactElement {
  const tr = useTr();
  const router = useRouter();
  const voteLink = trLink(
    "/spielpolitik/vote",
    router.locale,
    router.defaultLocale
  );

  return (
    <ZDAFullPage heading={tr("ZDA.Header")}>
      <Logos />
      <H2>{tr("ZDA.Results.Header")}</H2>
      <ZDAResultPies />

      <ZDAFAQ />
    </ZDAFullPage>
  );
}

export const ZDAResultPies: React.FC<React.PropsWithChildren<unknown>> = () => {
  const ballotsQuery = useBallotsQuery({
    variables: { where: { scope: { equals: BallotScope.Public } } },
  });
  const ballots = ballotsQuery.data?.ballots || [];

  return (
    <Center>
      <Grid my={3} columns={[0, 0, "1fr 1fr 1fr"]}>
        {ballots.map((ballot) => (
          <Pie key={ballot.id} ballotId={ballot.id} title={ballot.title} />
        ))}
      </Grid>
    </Center>
  );
};

const Pie: React.FC<
  React.PropsWithChildren<{ ballotId: string; title: string }>
> = ({ ballotId, title }) => {
  const resultsQuery = useGetBallotResultsQuery({ variables: { ballotId } });
  const results = resultsQuery.data?.getBallotResults;

  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-end"
      alignContent="flex-end"
      maxwidth="240"
      mb={[4, 4, 0]}
    >
      <H3 mt={0} color="#000" textAlign="center">
        {title}
      </H3>
      <Box>{results ? <VotyPie results={results} /> : <Loading />}</Box>
    </Flex>
  );
};
