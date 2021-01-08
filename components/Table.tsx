import { useRouter } from "next/router";
import {
  Flex,
  FlexProps,
  Image,
  ImageProps,
  BoxProps,
  Text,
  Box,
} from "rebass";

export const Table: React.FC<BoxProps> = ({
  id,
  fontSize = [1, 1, 2],
  children,
  ...props
}) => {
  return (
    <Box
      id={id}
      fontSize={fontSize}
      textAlign="left"
      sx={{ borderTop: "2px solid white", borderBottom: "2px solid white" }}
      {...props}
    >
      {children}
    </Box>
  );
};

export const TR: React.FC<FlexProps & { href?: string }> = ({
  href,
  ...props
}) => {
  const router = useRouter();
  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="nowrap"
      height="40px"
      onClick={href ? () => router.push(href) : undefined}
      sx={{
        borderBottom: "1px solid gray",
        ":hover": {
          bg: "secondary",
        },
        cursor: href ? "pointer" : "inherit",
      }}
      {...props}
    >
      {props.children}
    </Flex>
  );
};

export const TD: React.FC<
  BoxProps & { smHide?: boolean; flexy?: boolean; fixed?: boolean }
> = ({ flexy, smHide, fixed, children, ...props }) => (
  <Box
    {...props}
    px={2}
    display={smHide ? ["none", "none", "block"] : "block"}
    sx={{
      flexShrink: fixed ? 0 : 1,
      flexGrow: flexy ? 1 : 0,
    }}
  >
    <Text
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {children}
    </Text>
  </Box>
);

export const TDIcon: React.FC<ImageProps> = (props) => (
  <Image alignSelf="center" mx={2} sx={{ flexShrink: 0 }} {...props} />
);

export const OneRowTable: React.FC<{ text?: string }> = ({
  text,
  children,
}) => (
  <Table>
    <TR>
      <TD>{text ? text : children}</TD>
    </TR>
  </Table>
);
