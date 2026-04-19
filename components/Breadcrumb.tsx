import { Box, Text } from "components/ui";
import React, { Fragment } from "react";

export const Breadcrumb: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => (
  <Box className="-mt-3 xs:-mt-3 sm:-mt-4 mb-4 text-sm sm:text-base text-blue2 overflow-hidden text-ellipsis whitespace-nowrap">
    {React.Children.map(children, (child, i) => (
      <Fragment key={i}>
        {i > 0 ? " / " : ""}
        {child}
      </Fragment>
    ))}
  </Box>
);

export const Here: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => (
  <Text variant="inline" className="text-black">
    {children}
  </Text>
);
