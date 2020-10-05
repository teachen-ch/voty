import { useSetAccessToken, useSetUser } from "../../state/user";
import { useRouter } from "next/router";
import { useEffect, ReactElement } from "react";
import { Page } from "../../components/Page";
import { Button, ButtonProps } from "rebass";
import { useApolloClient } from "@apollo/client";

export default function LogoutPage(): ReactElement {
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const router = useRouter();

  useEffect(() => {
    setAccessToken("");
    setUser(undefined);
    router.push("/");
  }, []);

  return <Page heading="Abmelden"></Page>;
}

type LogoutButtonProps = ButtonProps & {
  onSuccess?: () => void;
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  onSuccess,
  ...props
}) => {
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const router = useRouter();
  const client = useApolloClient();

  function onLogout() {
    // clear apollo client local  cache
    client.clearStore();
    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/");
    }
    // otherwise we get flickering / page redrawing...
    setTimeout(() => {
      setAccessToken("");
      setUser(undefined);
    }, 50);
  }
  return (
    <Button onClick={() => onLogout()} {...props}>
      Abmelden
    </Button>
  );
};
