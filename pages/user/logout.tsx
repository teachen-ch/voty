import { useSetAccessToken, useSetUser } from "../../state/user";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Button } from "components/ui";
import type { ButtonProps } from "components/ui";
import { useApolloClient } from "@apollo/client";
import { AppPage } from "components/Page";
import { getQueryParam, ensureSameDomain } from "util/isBrowser";

export default function LogoutPage(): React.ReactElement {
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const router = useRouter();
  const didLogout = useRef(false);

  useEffect(() => {
    if (didLogout.current) return;
    didLogout.current = true;
    const redirect = ensureSameDomain(
      getQueryParam("redirect", { sanitize: true })
    );
    setAccessToken("");
    setUser(undefined);
    void router.replace(redirect || "/");
  }, [setAccessToken, setUser, router]);

  return <AppPage heading="" />;
}

type LogoutButtonProps = ButtonProps & {
  onSuccess?: () => void;
};

export const LogoutButton: React.FC<React.PropsWithChildren<LogoutButtonProps>> = ({
  onSuccess,
  ...props
}) => {
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const router = useRouter();
  const client = useApolloClient();

  function onLogout() {
    void client.clearStore();
    if (onSuccess) {
      onSuccess();
    } else {
      void router.push("/");
    }
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
