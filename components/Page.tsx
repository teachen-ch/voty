import { Flex, Box, Heading, Text, Link as A } from "rebass";
import Head from "next/head";
import { useUser } from "state/user";
import { LoginForm } from "pages/user/login";
import { ReactNode, useState, ReactElement } from "react";
import CheckLogin from "./CheckLogin";
import Link from "next/link";
import { FlexProps } from "rebass";
import { Role } from "graphql/types";

export function Page({
  children,
  heading,
}: {
  children?: React.ReactNode;
  heading?: string;
}): ReactElement {
  const user = useUser();
  const startpage = `/${user?.role?.toLowerCase()}`;
  return (
    <Flex
      maxWidth={["100%", "100%", "1000px", "1200px"]}
      mx="auto"
      px={[3, 3, 4]}
      flexDirection="column"
      justifyContent="center"
    >
      <Head>
        <title>voty – {heading}</title>
      </Head>
      <Box mt={["2rem", "2rem", 32]} ml={[0, 0, 0, 20]}>
        <Link href="/">
          <img
            src="/images/voty_logo.svg"
            alt="voty"
            className="logo-page"
            height="45"
          />
        </Link>
      </Box>
      <Box
        as="main"
        mx="auto"
        sx={{ minWidth: "min(100%, 800px)" }}
        maxWidth="800px"
      >
        {user ? (
          <LoggedInHeader heading={heading} startpage={startpage} />
        ) : (
          <PageHeading>{heading}</PageHeading>
        )}
        {children}
      </Box>
    </Flex>
  );
}

type LoggedInPageProps = {
  role?: Role;
  children?: ReactNode;
  heading?: string;
};

export function LoggedInPage({
  role,
  children,
  heading,
}: LoggedInPageProps): ReactElement {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const allowed = role
    ? user?.role === role || user?.role === Role.Admin
    : true;

  if (user && allowed) {
    return <Page heading={heading}>{children}</Page>;
  } else {
    return (
      <Page heading={heading}>
        <CheckLogin setLoading={setLoading} />
        {!loading && (
          <>
            <Text>
              Diese Seite benötigt eine Anmeldung
              {role && ` als ${getRoleName(role)}`}. Bitte benutze Deine
              Schul-Email.
            </Text>
            <LoginForm />
          </>
        )}
        <Box height={500} />
      </Page>
    );
  }
}

function getRoleName(role: Role): string {
  const translations: Record<string, string> = {
    Teacher: "Lehrer*in",
    Student: "Schüler*in",
    Principal: "Schulleiter*in",
  };
  return translations[String(role)] || String(role);
}

export const LoggedInHeader: React.FC<{
  heading?: string;
  startpage: string;
}> = (props) => (
  <Flex
    mt={40}
    justifyContent="space-between"
    alignItems="flex-end"
    pb={1}
    mb={2}
    sx={{ borderBottom: "1px solid #979797" }}
  >
    <Link href={props.startpage}>
      <A color="black" py={1} sx={{ fontWeight: "bold" }}>
        Startseite
      </A>
    </Link>
    <Heading my={0} as="h1" fontSize={[4, 5, 6, 6]} textAlign="center">
      {props.heading}
    </Heading>
    <Link href="/user/logout">
      <A color="black" py={1} sx={{ fontWeight: "bold" }}>
        Abmelden
      </A>
    </Link>
  </Flex>
);

export const PageHeading: React.FC = (props) => (
  <Heading
    as="h1"
    fontSize={[4, 5, 6, 6]}
    textAlign="center"
    mt={40}
    sx={{ borderBottom: "1px solid #979797" }}
    pb={1}
  >
    {props.children}
  </Heading>
);

export const Container: React.FC<FlexProps> = (props) => (
  <Flex mx={[3, 3, 4]} justifyContent="center" {...props}>
    <Flex
      justifyItems="center"
      textAlign="center"
      flexDirection="column"
      maxWidth={["100%", "100%", "100%", "1160px"]}
    >
      {props.children}
    </Flex>
  </Flex>
);

export const ErrorPage: React.FC = (props) => (
  <Page heading="Fehler">
    <Heading as="h2">Oh je, es ist ein Fehler aufgetreten</Heading>
    <Text>{props.children}</Text>
  </Page>
);

export const LoadingPage: React.FC = (props) => (
  <Page heading="Seite wird geladen...">
    <Text>{props.children}</Text>
  </Page>
);
