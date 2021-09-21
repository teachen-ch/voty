import { Text, Box, Flex } from "rebass";

import { Grid } from "theme-ui";
import { PieChart } from "react-minimal-pie-chart";
import { LabelRenderFunction } from "react-minimal-pie-chart/types/commonTypes";
import { BallotResults as BallotResultsType } from "graphql/types";
import type { Nullable } from "simplytyped";
import { Info } from "./Info";
import { isProd } from "util/isBrowser";
import { useTr } from "util/translate";

export const BallotResults: React.FC<{
  results?: Nullable<BallotResultsType>;
}> = ({ results }) => {
  if (!results) return null;
  if (!results.total) return <Text>Noch keine Stimmen</Text>;

  // we used to not show results if there was only one answer...
  // let nullOptions = 0;
  // if (!results.yes) nullOptions++;
  // if (!results.no) nullOptions++;
  // if (!results.abs) nullOptions++;
  // ensure we only show results, once we don't mess with anonymization
  if (results.total < 5 && isProd())
    return (
      <Info type="important">
        Es wurden erst {results.total} Stimmen abgegeben. Resultate werde noch
        nicht angezeigt.
      </Info>
    );

  const votes = (i: Nullable<number>) =>
    `${i === 0 ? "–" : i === 1 ? "Eine Stimme" : `${i} Stimmen`}`;

  return (
    <div className="results">
      <Grid columns={[0, 0, "1fr 1fr"]}>
        <Flex justifyItems="center" flex={1} justifySelf="center">
          <Box
            height={200}
            width={200}
            sx={{ backgroundColor: "#fff", borderRadius: 100 }}
          >
            <VotyPie results={results} />
          </Box>
        </Flex>
        <Box mb={2}>
          <Grid columns="2fr 3fr" gap={2}>
            <Text>Ja:</Text>
            <Text>{votes(results.yes)}</Text>
            <Text>Nein:</Text>
            <Text>{votes(results.no)}</Text>
            <Text>Enthalten:</Text>
            <Text>{votes(results.abs)}</Text>
            <Text>Total:</Text>
            <Text>{results.total} Stimmen</Text>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
};

export const VotyPie: React.FC<{
  results: BallotResultsType;
}> = ({ results }) => {
  const tr = useTr();
  const data = [
    { title: tr("Ballot.Yes"), value: Number(results.yes), color: "green" },
    { title: tr("Ballot.No"), value: Number(results.no), color: "#d90000" },
  ];
  if (results.abs) {
    data.push({
      title: tr("Ballot.Abstain"),
      value: Number(results.abs),
      color: "#aaa",
    });
  }

  const pieLabel: LabelRenderFunction = (props) => {
    const { title, percentage, color } = props.dataEntry;
    const x = 50;
    const y = results.abs ? 50 : 55;
    const dx = 0;
    const dy =
      title === tr("Ballot.Yes") ? -8 : title === tr("Ballot.No") ? 8 : 20;
    const fontSize = title === tr("Ballot.Abstain") ? "8px" : "12px";
    return (
      <text
        key={title}
        dominantBaseline="central"
        width={50}
        textAnchor="middle"
        dx={dx}
        dy={dy}
        x={x}
        y={y}
        fill={color}
        style={{ fontSize }}
      >
        <tspan>{title}: </tspan>
        <tspan>{Math.round(percentage)}%</tspan>
      </text>
    );
  };

  return (
    <PieChart
      data={data}
      startAngle={-90}
      paddingAngle={1}
      lineWidth={20}
      animate
      label={pieLabel}
      labelPosition={50}
      style={{
        fontWeight: "bold",
        fontSize: "12px",
      }}
    />
  );
};
