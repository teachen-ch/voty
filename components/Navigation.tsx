import { Flex, Button } from "components/ui";
import { useRouter } from "next/router";

type NavigationProps = { admin?: boolean };

export const Navigation: React.FC<React.PropsWithChildren<NavigationProps>> = ({
  children,
}) => {
  return <Flex className="flex-row flex-wrap -m-1">{children}</Flex>;
};

export type RouteProps = {
  href: string;
  as?: string;
  label: string;
  disabled?: boolean;
};

export const Route: React.FC<React.PropsWithChildren<RouteProps>> = (props) => {
  const router = useRouter();
  const as = props.as || props.href;
  const path = router.pathname;
  const isActive = path === props.href;
  const isDisabled = props.disabled;

  function onClick() {
    if (!props.disabled && path != props.href) {
      void router.push(props.href, as);
    }
  }

  return (
    <Button
      className={`m-1 min-w-[24%] text-sm sm:text-base ${
        isActive ? "bg-danger" : isDisabled ? "bg-white text-gray-600" : ""
      }`}
      variant={isDisabled ? "muted" : "primary"}
      onClick={onClick}
    >
      {props.label}
    </Button>
  );
};
