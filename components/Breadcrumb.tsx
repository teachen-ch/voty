import { Box, LinkProps, Link as RebassLink } from "rebass";
import Link from "next/link";
import { Fragment } from "react";

export const Breadcrumb = ({
  children,
}: {
  children: React.ReactElement[];
}): React.ReactElement => (
  <Box
    mt={[-12, -12, -16]}
    mb={3}
    fontSize={[1, 1, 2]}
    sx={{ textAlign: "left" }}
    color="#1C88FF"
  >
    {children.map((child, i) => (
      <Fragment key={i}>
        {i > 0 ? " / " : ""}
        <Box mr={1} sx={{ display: "inline-block" }}>
          {child}
        </Box>
      </Fragment>
    ))}
  </Box>
);

type AProps = Omit<LinkProps, "as"> & {
  as?: string;
  fontWeight?: string;
};

export const A: React.FC<AProps> = (props) => {
  const variant = props.variant || "underline";
  if (props.href) {
    return (
      <Link
        href={props.href}
        as={props.as}
        sx={{ fontWeight: props.fontWeight }}
      >
        <RebassLink variant={variant} fontSize={props.fontSize}>
          {props.children}
        </RebassLink>
      </Link>
    );
  } else {
    return (
      <RebassLink
        onClick={props.onClick}
        variant={variant}
        fontSize={props.fontSize}
        sx={{ fontWeight: props.fontWeight }}
      >
        {props.children}
      </RebassLink>
    );
  }
};

export const Here: React.FC<AProps> = ({ children }) => (
  <strong style={{ color: "white" }}>{children}</strong>
);
