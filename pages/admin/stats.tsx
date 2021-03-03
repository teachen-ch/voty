import { Err, Loading, LoggedInPage } from "../../components/Page";
import { ReactElement, useState } from "react";
import { A, Breadcrumb, Here } from "components/Breadcrumb";
import { Role, useStatsQuery } from "graphql/types";
import { gql } from "@apollo/client";
import date from "util/date";

export const STATS = gql`
  query stats($from: Int, $to: Int) {
    stats(from: $from, to: $to) {
      stats
    }
  }
`;

export default function StatsPage(): ReactElement {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  return (
    <LoggedInPage heading="Statistiken" role={Role.Admin}>
      <Breadcrumb>
        <A href="/admin">Admin</A>
        <Here>Statistiken</Here>
      </Breadcrumb>
      <Stats from={from} to={to} />
    </LoggedInPage>
  );
}

const Stats: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const queryStats = useStatsQuery({ variables: { from, to } });
  const stats = queryStats.data?.stats?.stats as
    | Record<string, number>
    | undefined;

  if (queryStats.loading) return <Loading />;
  if (!stats) {
    return <Err msg="No Stats to display…" />;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Statistik</th>
          <th>Anzahl</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(stats).map((key) => {
          return (
            <tr key={key}>
              <td width="90%">
                <b>{key}</b>
              </td>
              <td align="center">{stats[key]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
