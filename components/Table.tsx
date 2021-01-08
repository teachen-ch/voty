import {
  Flex,
  FlexProps,
  Image,
  ImageProps,
  BoxProps,
  Text,
  Box,
} from "rebass";

export const Table: React.FC<{
  id?: string;
  fontSize?: string | number | Array<number | string>;
}> = ({ id, fontSize = [1, 1, 2], children }) => {
  return (
    <Flex
      id={id}
      flexDirection="column"
      fontSize={fontSize}
      textAlign="left"
      sx={{ borderTop: "2px solid white", borderBottom: "2px solid white" }}
    >
      {children}
    </Flex>
  );
};

export const TR: React.FC<FlexProps> = (props) => (
  <Flex
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    flexWrap="nowrap"
    height="40px"
    sx={{
      borderBottom: "1px solid gray",
      ":hover": {
        bg: "secondary",
      },
    }}
    {...props}
  >
    {props.children}
  </Flex>
);

export const TD: React.FC<
  BoxProps & { smHide?: boolean; flexy?: boolean; fixed?: boolean }
> = (props) => (
  <Box
    {...props}
    px={2}
    display={props.smHide ? ["none", "none", "block"] : "block"}
    sx={{
      flexShrink: props.fixed ? 0 : 1,
      flexGrow: props.flexy ? 1 : 0,
    }}
  >
    <Text
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {props.children}
    </Text>
  </Box>
);

export const TDIcon: React.FC<ImageProps> = (props) => (
  <Image alignSelf="center" mx={2} sx={{ flexShrink: 0 }} {...props} />
);
