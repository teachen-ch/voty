import { Flex, Box, Heading, Text, Link as A } from "rebass";
import Head from "next/head";
import { useUser } from "state/user";
import { LoginForm } from "pages/user/login";
import { ReactNode, useState } from "react";
import CheckLogin, { Role } from "./CheckLogin";
import Link from "next/link";

export function Page({
  children,
  heading,
}: {
  children?: React.ReactNode;
  heading?: string;
}) {
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
        <title>voty – {heading}</title>
      </Head>
      <Box mt={["2rem", "2rem", 32]} ml={[0, 0, 0, 20]}>
        <a href="/">
          <img
            src="/images/voty_logo.svg"
            alt="voty"
            className="logo-page"
            height="45"
          />
        </a>
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

export function LoggedInPage({ role, children, heading }: LoggedInPageProps) {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  let allowed = role ? user?.role === role || user?.role === Role.Admin : true;

  if (user && allowed) {
    return <Page heading={heading}>{children}</Page>;
  } else {
    return (
      <Page heading={heading}>
        <CheckLogin setLoading={setLoading} />
        {!loading && (
          <>
            <Text>
              Diese Seite benötigt eine Anmeldung. Bitte benutze Deine
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

export const PageHeading: React.FC<{}> = (props) => (
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

export const Container = (props: any) => (
  <Flex mx={[3, 3, 4]} justifyContent="center" textAlign="center" {...props}>
    <Flex
      justifyItems="center"
      flexDirection="column"
      maxWidth={["100%", "100%", "100%", "1160px"]}
    >
      {props.children}
    </Flex>
  </Flex>
);

export const ErrorPage = (props: any) => (
  <Page>
    <PageHeading>Fehler</PageHeading>
    <Heading as="h2">Oh je, es ist ein Fehler aufgetreten</Heading>
    <Text>{props.children}</Text>
  </Page>
);
