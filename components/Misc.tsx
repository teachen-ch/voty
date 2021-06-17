import { Text, Flex, BoxProps, Box, TextProps } from "rebass";
import React from "react";
import { isFunction } from "lodash";
import Image from "next/image";
import IconX from "../public/images/icon_x.svg";

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
      <Box display="inline-block" ml={2} mb={-2} color="#fff">
        <Image src={IconX} onClick={deleteLink} className="pointer white" />
      </Box>
    )}
  </Flex>
);
