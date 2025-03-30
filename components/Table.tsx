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
import { useColorMode } from "theme-ui";
import { Center } from "./Learning";

export const Table: React.FC<React.PropsWithChildren<BoxProps>> = ({
  id,
  fontSize = [1, 1, 2],
  children,
  ...props
}) => {
  return (
    <Box
      id={id}
      fontSize={fontSize}
      sx={{
        borderBottom: "2px solid",
        borderTop: "2px solid",
        borderColor: "white",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export const TR: React.FC<
  React.PropsWithChildren<FlexProps & { href?: string; noHover?: boolean }>
> = ({ href, noHover, ...props }) => {
  const router = useRouter();
  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="nowrap"
      height="40"
      onClick={href ? () => router.push(href) : undefined}
      sx={{
        borderBottom: "1px solid",
        borderColor: "trColor",
        ":hover": noHover
          ? undefined
          : {
              bg: "primary",
              color: "#fff",
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
  React.PropsWithChildren<
    BoxProps & { smHide?: boolean; flexy?: boolean; fixed?: boolean }
  >
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

export const TDImage: React.FC<
  React.PropsWithChildren<ImageProps & { smHide?: boolean; light?: boolean }>
> = ({ smHide, light, ...props }) => {
  const [colorMode] = useColorMode();
  const dark = colorMode === "dark";
  return (
    <Image
      alignSelf="center"
      mx={2}
      display={smHide ? ["none", "none", "block"] : "block"}
      sx={{ flexShrink: 0, filter: dark || light ? "invert(100)" : "none" }}
      alt=""
      {...props}
    />
  );
};

export const TDIcon: React.FC<
  React.PropsWithChildren<BoxProps & { smHide?: boolean }>
> = ({ smHide, children, ...props }) => (
  <Box
    mx={2}
    display={smHide ? ["none", "none", "block"] : "block"}
    sx={{
      flexShrink: 0,
      flexGrow: 0,
      cursor: props.onClick ? "pointer" : "inherit",
    }}
    {...props}
  >
    <Center>{children}</Center>
  </Box>
);

export const OneRowTable: React.FC<
  React.PropsWithChildren<{ text?: string }>
> = ({ text, children }) => (
  <Table>
    <TR>
      <TD>{text ? text : children}</TD>
    </TR>
  </Table>
);
