import { useRouter } from "next/router";
import NextLink from "next/link";
import { useApolloClient, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import { Text, Button, Heading } from "components/ui";
import { AppPage, Loading } from "components/Page";
import { useQueryParam } from "util/hooks";
import { useSetAccessToken, useSetUser } from "../../state/user";
import { useCheckVerificationMutation } from "graphql/types";
import { useTr } from "util/translate";

export const CHECK_VERIFICATION = gql`
  mutation checkVerification($token: String!) {
    checkVerification(token: $token) {
      token
    }
  }
`;

export default function VerifyPage(): React.ReactElement {
  const token = useQueryParam("t");
  const purpose = useQueryParam("p");
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const [error, setError] = useState("");
  const router = useRouter();
  const tr = useTr();
  const client = useApolloClient();
  const redirect = useQueryParam("redirect");
  const [doVerification] = useCheckVerificationMutation({
    onCompleted: (data) => {
      if (data.checkVerification && data.checkVerification.token) {
        setAccessToken(data.checkVerification.token);
        void router.push(
          `/user/verified?p=${purpose}${
            redirect ? `&redirect=${redirect}` : ""
          }`
        );
      }
    },
    onError(error) {
      setError("Error.InvalidVerificationLink");
      console.error(error.message);
    },
  });

  useEffect(() => {
    if (token) {
      void client.clearStore();
      setAccessToken("");
      setUser(undefined);
      void doVerification({ variables: { token } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token || !purpose) {
    return (
      <AppPage heading={tr("Verification.Title")}>
        <Loading />
      </AppPage>
    );
  }
  if (error) {
    return (
      <AppPage
        heading={tr("Verification.Title")}
        onClose={() => void router.push("/")}
      >
        <Heading as="h2">{tr("Misc.ErrorTitle")}</Heading>
        <Text className="mb-8">{error}</Text>
        <NextLink
          href="/user/login"
          className="inline-flex items-center justify-center cursor-pointer font-semibold rounded-card min-h-[40px] leading-none font-body text-base bg-primary text-white px-4"
        >
          {tr("Misc.Back")}
        </NextLink>
      </AppPage>
    );
  }

  return (
    <AppPage
      heading={tr("Verification.Title")}
      onClose={() => void router.push("/")}
    >
      <Loading />
      {tr("Verification.Check")}
    </AppPage>
  );
}
