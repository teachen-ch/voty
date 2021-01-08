import { Flex, Image, ImageProps, Text, BoxProps, Box } from "rebass";

export const Table: React.FC<{
  id?: string;
  fontSize?: string | number | Array<number | string>;
}> = ({ id, fontSize = [1, 1, 2], children }) => {
  return (
    <Flex
      id={id}
      flexDirection="column"
      sx={{ borderTop: "2px solid white", borderBottom: "2px solid white" }}
    >
      <Text fontSize={fontSize}>{children}</Text>
    </Flex>
  );
};

export const TR: React.FC<{
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}> = ({ onClick, children, onMouseOver, onMouseOut }) => (
  <Flex
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    flexWrap="nowrap"
    onClick={onClick}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    height="40px"
    sx={{
      borderBottom: "1px solid gray",
      ":hover": {
        bg: "secondary",
      },
    }}
  >
    {children}
  </Flex>
);

export const TD: React.FC<BoxProps & { smHide?: boolean }> = (props) => (
  <Box
    {...props}
    px={2}
    display={props.smHide ? ["none", "none", "flex"] : "flex"}
    sx={{
      flexShrink: 0,
      alignItems: "center",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
  >
    {props.children}
  </Box>
);

// @ts-ignore
export const Icon: React.FC<ImageProps> = (props) => <Image {...props} />;
