import { Err, Loading, LoggedInPage } from "../../components/Page";
import { ReactElement, useState } from "react";
import { A, Breadcrumb, Here } from "components/Breadcrumb";
import { Role, useStatsQuery } from "graphql/types";
import { gql } from "@apollo/client";
import date from "util/date";
import { Text } from "rebass";

export const STATS = gql`
  query stats($from: Float, $to: Float) {
    stats(from: $from, to: $to) {
      stats
    }
  }
`;

export default function StatsPage(): ReactElement {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [f, sf] = useState("Immer");

  function allTime() {
    setFrom(0);
    setTo(0);
  }
  function lastWeek(week = 1) {
    setFrom(date().subtract(week, "week").startOf("week").valueOf());
    setTo(date().subtract(week, "week").endOf("week").valueOf());
  }
  function lastDays(days = 7) {
    setFrom(date().subtract(days, "day").startOf("day").valueOf());
    setTo(date().valueOf());
  }
  return (
    <LoggedInPage heading="Statistiken" role={Role.Admin}>
      <Breadcrumb>
        <A href="/admin">Admin</A>
        <Here>Statistiken</Here>
      </Breadcrumb>

      <Text fontSize={1} mb={3}>
        <Filter set={() => allTime()} l="Immer" sf={sf} f={f} sep />
        <Filter set={() => lastDays(7)} l="-7 Tage" sf={sf} f={f} sep />
        <Filter set={() => lastDays(14)} l="-14 Tage" sf={sf} f={f} sep />
        <Filter set={() => lastDays(30)} l="-30 Tage" sf={sf} f={f} sep />
        <Filter set={() => lastDays(90)} l="-90 Tage" sf={sf} f={f} sep />
        <Filter set={() => lastWeek(1)} l="Woche - 1" sf={sf} f={f} sep />
        <Filter set={() => lastWeek(2)} l="Woche - 2" sf={sf} f={f} />
      </Text>

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
  if (queryStats.error) return <Err msg={queryStats.error.message} />;
  if (!stats) {
    return <Err msg="No Stats to display…" />;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>
            Statistik {from > 0 && date(from).format("DD/MMM – ")}
            {to > 0 && date(to).format("DD/MMM")}
          </th>
          <th>Anzahl</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(stats).map((key) => {
          return (
            <tr key={key}>
              <td width="90%">{key}</td>
              <td align="center">{stats[key] || "-"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Filter: React.FC<{
  set: () => void;
  sf: (val: string) => void;
  f: string;
  l: string;
  sep?: boolean;
}> = ({ set, sf, l, f, sep }) => (
  <>
    <A
      onClick={() => {
        set();
        sf(l);
      }}
      sx={{
        fontWeight: f === l ? "bold" : "normal",
        textDecoration: f === l ? "underline" : "none",
      }}
    >
      {l}
    </A>
    {sep && "  |  "}
  </>
);
