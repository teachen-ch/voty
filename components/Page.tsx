import { Flex, Box, Heading, Text, Link as A } from "rebass";
import Head from "next/head";
import { useUser } from "state/user";
import { LoginForm } from "pages/user/login";
import { ReactNode, useState } from "react";
import CheckLogin from "./CheckLogin";
import Link from "next/link";
import { FlexProps } from "rebass";
import { Role } from "graphql/types";
import { Footer } from "components/Footer";
import { TopBar } from "./TopBar";
import IconClose from "../public/images/icon_close.svg";

export const Page: React.FC<{
  children?: React.ReactNode;
  heading?: string;
  bgImage?: string;
}> = ({ heading, bgImage, children }) => {
  return (
    <AppPage heading={heading} bgImage={bgImage} light>
      {children}
    </AppPage>
  );
};

export const AppPage: React.FC<{
  bgImage?: string;
  heading?: string;
  light?: boolean;
  onClose?: () => void;
}> = (props) => (
  <>
    <TopBar showLogo />
    <Container
      bgImage={props.bgImage}
      pt="145px"
      light={props.light}
      color="white"
    >
      <Head>
        <title>voty.ch – {props.heading}</title>
      </Head>
      <Box
        as="main"
        bg="silver"
        px="40px"
        py="25px"
        sx={{ minWidth: "min(100%, 800px)", borderRadius: 5 }}
        maxWidth="800px"
      >
        <Heading
          mt={0}
          as="h1"
          fontSize={[4, 5, "50px"]}
          fontWeight="normal"
          sx={{ borderBottom: "2px solid white" }}
        >
          <Flex justifyContent="space-between">
            {props.heading}
            {props.onClose && (
              <A
                onClick={props.onClose}
                sx={{ position: "relative", right: 0 }}
              >
                <IconClose />
              </A>
            )}
          </Flex>
        </Heading>
        {props.children}
      </Box>
      <Footer color={props.light ? "black" : "white"} />
    </Container>
  </>
);

export const LoggedInPage: React.FC<{
  role?: Role;
  children?: ReactNode;
  heading?: string;
  bgImage?: string;
}> = ({ role, children, heading, bgImage }) => {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const allowed = role
    ? user?.role === role || user?.role === Role.Admin
    : true;

  if (user && allowed) {
    return <AppPage heading={heading}>{children}</AppPage>;
  } else {
    return (
      <AppPage heading={heading} bgImage={bgImage}>
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
      </AppPage>
    );
  }
};

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

export const Container: React.FC<
  FlexProps & { bgImage?: string; light?: boolean }
> = (props) => {
  const darken = props.light
    ? ""
    : "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), ";
  const bgImage = props.bgImage || "voty_bg_1.svg";
  return (
    <Flex
      mt={70}
      px={[3, 3, 3, 4]}
      justifyContent="center"
      sx={{
        backgroundImage: `${darken}url('/images/${bgImage}')`,
        backgroundAttachment: "fixed",
        backgroundPositionY: 44,
      }}
      {...props}
    >
      <Flex
        alignItems="center"
        flexDirection="column"
        flex={1}
        maxWidth={["100%", "100%", "100%", "1160px"]}
      >
        {props.children}
      </Flex>
    </Flex>
  );
};

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
