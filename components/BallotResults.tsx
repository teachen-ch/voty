import { Text, Box, Flex } from "rebass";

import { Grid } from "theme-ui";
import { PieChart } from "react-minimal-pie-chart";
import { LabelRenderFunction } from "react-minimal-pie-chart/types/commonTypes";
import { BallotResults as BallotResultsType } from "graphql/types";

export const BallotResults: React.FC<{
  results?: BallotResultsType | null;
}> = ({ results }) => {
  if (!results) return null;
  if (!results.total) return <Text>Noch keine Stimmen</Text>;

  const votes = (i: number | null | undefined) =>
    `${i === 0 ? "–" : i === 1 ? "Eine Stimme" : `${i} Stimmen`}`;

  const data = [
    { title: "Ja", value: Number(results.yes), color: "green" },
    { title: "Nein", value: Number(results.no), color: "#d90000" },
  ];
  if (results.abs) {
    data.push({
      title: "Enthalten",
      value: Number(results.abs),
      color: "#aaa",
    });
  }

  const pieLabel: LabelRenderFunction = (props) => {
    const { title, percentage, color } = props.dataEntry;
    const x = 50;
    const y = results.abs ? 50 : 55;
    const dx = 0;
    const dy = title === "Ja" ? -8 : title === "Nein" ? 8 : 20;
    const fontSize = title === "Enthalten" ? "8px" : "12px";
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
    <div className="results">
      <Grid columns="1fr 1fr">
        <Flex justifyItems="center" flex={1} justifySelf="center">
          <Box
            height={200}
            width={200}
            sx={{ backgroundColor: "white", borderRadius: 100 }}
          >
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
          </Box>
        </Flex>
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
      </Grid>
    </div>
  );
};
