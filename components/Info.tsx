import { Card } from "rebass";
import { PropsWithChildren, ReactElement } from "react";

export default function Info(
  props: PropsWithChildren<{ type?: string }>
): ReactElement {
  const type = props.type || "default";
  const typeColors: Record<string, string> = {
    important: "danger",
    info: "primary",
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
