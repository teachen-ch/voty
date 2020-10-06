import { Flex, Button } from "rebass";
import { useRouter } from "next/router";

type NavigationProps = { admin?: boolean };

export const Navigation: React.FC<NavigationProps> = ({ children }) => {
  return (
    <Flex flexDirection="row" flexWrap="wrap" m={-1}>
      {children}
    </Flex>
  );
};

export type RouteProps = {
  href: string;
  as?: string;
  label: string;
  disabled?: boolean;
};

export const Route: React.FC<RouteProps> = (props) => {
  const router = useRouter();
  const as = props.as || props.href;
  let variant = props.disabled ? "muted" : "secondary";

  const path = router.pathname;
  if (path === props.href) variant = "primary";

  function onClick() {
    if (!props.disabled && path != props.href) router.push(props.href, as);
  }

  return (
    <Button
      m={1}
      variant={variant}
      onClick={onClick}
      minWidth="24%"
      fontSize={[1, 1, 2]}
    >
      {props.label}
    </Button>
  );
};
