import { Box, Card } from "rebass";
import { PropsWithChildren } from "react";

export default function Info(props: PropsWithChildren<{ type?: string }>) {
  const type = props.type || "default";
  const typeColors: { [key: string]: string } = {
    important: "#d90000",
    info: "#000099",
    light: "lightgray",
    default: "gray",
  };
  const color = typeColors[type];

  return (
    <Card
      py={2}
      my={4}
      px={4}
      color="black"
      fontSize={2}
      sx={{ borderLeft: `10px solid ${color}` }}
    >
      {props.children}
    </Card>
  );
}
