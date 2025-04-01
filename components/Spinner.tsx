import React from "react";
import { keyframes } from "@emotion/core";
import { Box } from "rebass";

const spin = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

export const Spinner: React.FC<{
  size?: number;
  strokeWidth?: number;
  color?: string;
  max?: number;
  title?: string;
  duration?: number;
  [key: string]: any;
}> = ({
  size = 32,
  strokeWidth = 4,
  max = 1,
  title = "Loading...",
  duration = 500,
  color = "currentcolor",
  ...props
}) => {
  const r = 16 - strokeWidth;
  const C = 2 * r * Math.PI;
  const offset = C - (1 / 4) * C;

  return (
    <Box
      as="svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      fill="none"
      stroke="currentcolor"
      role="img"
      {...props}
      // @ts-ignore
      __css={{
        color: color,
        overflow: "visible",
      }}
    >
      <title>{title}</title>
      <circle cx={16} cy={16} r={r} opacity={1 / 8} />
      <Box
        as="circle"
        // @ts-ignore
        cx={16}
        cy={16}
        r={r}
        strokeDasharray={C}
        strokeDashoffset={offset}
        __css={{
          transformOrigin: "42% 42%",
          animationName: spin.toString(),
          animationTimingFunction: "linear",
          animationDuration: duration + "ms",
          animationIterationCount: "infinite",
        }}
      />
    </Box>
  );
};
