import { Box } from "rebass";

export default function Info(props) {
  const type = props.type || "default";
  const typeColors = {
    important: "#d90000",
    info: "#000099",
    light: "lightgray",
    default: "gray",
  };
  const color = typeColors[type];

  return (
    <Box
      py={2}
      my={4}
      bg="lightgray"
      px={4}
      color="black"
      fontSize={2}
      sx={{ borderLeft: `10px solid ${color}` }}
    >
      {props.children}
    </Box>
  );
}
