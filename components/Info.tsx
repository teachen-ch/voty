import { Card, CardProps } from "rebass";

const typeColors: Record<string, string> = {
  important: "danger",
  info: "primary",
  light: "lightgray",
  default: "gray",
  success: "green",
};

/**
 *
 * @param type: important | info | light | default
 */
export const Info: React.FC<CardProps & { type?: string }> = ({
  type = "default",
  children,
  ...props
}) => (
  // @ts-ignore
  <Card
    py={2}
    my={4}
    px={4}
    fontSize={2}
    sx={{ borderLeft: `10px solid`, borderColor: typeColors[type] }}
    {...props}
  >
    {children}
  </Card>
);
