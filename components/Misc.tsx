import { Text, Flex, Image, BoxProps } from "rebass";
import React from "react";
import { TextProps } from "theme-ui";
import { isFunction } from "lodash";

export const CircleBullet: React.FC<
  TextProps & {
    value: string | number;
    bg?: string;
    color?: string;
  }
> = ({ value, bg = "#fff", color = "gray", ...props }) => (
  // @ts-ignore
  <Text
    fontWeight="bold"
    fontSize={2}
    display="inline-block"
    sx={{
      borderRadius: 25,
      cursor: props.onClick ? "pointer" : "inherit",
      flexShrink: 0,
    }}
    bg={bg}
    color={color}
    mr={2}
    p={1}
    width="35px"
    height="35px"
    textAlign="center"
    {...props}
  >
    {value}
  </Text>
);

export const Pill: React.FC<
  BoxProps & {
    deleteLink?: boolean | (() => void);
  }
> = ({
  deleteLink,
  bg = "primary",
  color = "#fff",
  children,
  onClick,
  ...props
}) => (
  <Flex
    bg={bg}
    color={color}
    alignItems="center"
    px="12px"
    py="4px"
    mr={2}
    my={1}
    fontSize={1}
    sx={{ borderRadius: 20, cursor: onClick ? "pointer" : "inherit" }}
    onClick={onClick}
    {...props}
  >
    <Text>{children}</Text>
    {deleteLink && isFunction(deleteLink) && (
      <Image src="/images/icon_x.svg" ml={1} onClick={deleteLink} />
    )}
  </Flex>
);
