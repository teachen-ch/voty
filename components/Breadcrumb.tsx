import { Box, LinkProps, Link as RebassLink } from "rebass";
import Link from "next/link";

export const Breadcrumb: React.FC = ({ children }) => (
  <Box mt={4} mb={3} fontSize={2}>
    {children}
  </Box>
);

type AProps = LinkProps & {
  as?: string;
};

export const A: React.FC<AProps> = (props) => {
  const variant = props.variant || "underline";
  if (props.href) {
    return (
      <Link href={props.href} as={props.as}>
        <RebassLink variant={props.variant}>{props.children}</RebassLink>
      </Link>
    );
  } else {
    return (
      <RebassLink onClick={props.onClick} variant={props.variant}>
        {props.children}
      </RebassLink>
    );
  }
};
