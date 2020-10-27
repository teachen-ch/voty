import { useSetAccessToken, useSetUser } from "../../state/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, ButtonProps } from "rebass";
import { useApolloClient } from "@apollo/client";

export default function LogoutPage(): null {
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const router = useRouter();

  useEffect(() => {
    setAccessToken("");
    setUser(undefined);
    void router.push("/");
  }, []);

  return null;
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
    void client.clearStore();
    if (onSuccess) {
      onSuccess();
    } else {
      void router.push("/");
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
