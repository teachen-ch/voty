import { Err, H1, Loading, LoggedInPage } from "../../components/Page";
import { ReactElement, useState } from "react";
import { A, Breadcrumb, Here } from "components/Breadcrumb";
import { Role, useBallotsQuery, useGetBallotResultsQuery } from "graphql/types";
import { BallotResults } from "components/BallotResults";
import { Card } from "rebass";

export default function BallotsPage(): ReactElement {
  const [ballot, setBallot] = useState("");
  const ballotsQuery = useBallotsQuery();
  const ballots = ballotsQuery.data?.ballots;

  if (ballotsQuery.loading) return <Loading />;
  if (ballotsQuery.error) return <Err msg={ballotsQuery.error.message} />;

  return (
    <LoggedInPage heading="Abstimmungsresultate" role={Role.Admin}>
      <Breadcrumb>
        <A href="/admin">Admin</A>
        <Here>Abstimmungsresultate</Here>
      </Breadcrumb>

      <select onChange={(evt) => setBallot(evt.target.value)}>
        <option id="">-- Abstimmung auswählen --</option>
        {ballots?.map((ballot) => (
          <option key={ballot.id} value={ballot.id}>
            {ballot.title}
          </option>
        ))}
      </select>

      <Card>
        {!ballot && <H1>Abstimmung auswählen</H1>}
        <Results ballotId={ballot} />
      </Card>
    </LoggedInPage>
  );
}

const Results: React.FC<{ ballotId: string }> = ({ ballotId }) => {
  const resultsQuery = useGetBallotResultsQuery({
    variables: { ballotId },
    skip: !ballotId,
  });
  const results = resultsQuery.data?.getBallotResults;
  return <BallotResults results={results} />;
};
