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

export const A: React.FC<LinkProps> = (props) => {
  const variant = props.variant || "underline";
  if (props.href) {
    return (
      <Link href={props.href}>
        <RebassLink variant={variant} {...props}>
          {props.children}
        </RebassLink>
      </Link>
    );
  } else {
    return (
      <RebassLink onClick={props.onClick} variant={variant} {...props}>
        {props.children}
      </RebassLink>
    );
  }
};

export const Here: React.FC = ({ children }) => (
  <strong style={{ color: "white" }}>{children}</strong>
);
