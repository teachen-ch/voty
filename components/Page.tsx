import { Flex, Box, Heading, Text, Link as A, HeadingProps } from "rebass";
import Head from "next/head";
import { useUser } from "state/user";
import { LoginForm } from "pages/user/login";
import React, { ReactNode } from "react";
import CheckLogin from "./CheckLogin";
import { FlexProps, Image as RImage } from "rebass";
import { Role } from "graphql/types";
import { Footer } from "components/Footer";
import { TopBar } from "./TopBar";
import IconClose from "../public/images/icon_close.svg";
import { Spinner } from "theme-ui";
import { Info } from "./Info";
import { useTr } from "util/translate";
import Image from "next/legacy/image";

export const Page: React.FC<React.PropsWithChildren<{
  children?: React.ReactNode;
  heading?: string;
  bgImages?: string[];
}>> = ({ heading, bgImages, children }) => {
  return (
    <AppPage heading={heading} bgImages={bgImages}>
      {children}
    </AppPage>
  );
};

export const AppPage: React.FC<React.PropsWithChildren<{
  image?: string;
  bgImages?: string[];
  heading?: string;
  onClose?: () => void;
}>> = (props) => {
  const bgImages = props.bgImages || [];
  return (
    <>
      <Background bgImages={bgImages} />
      <TopBar home />
      <Container pt={props.image ? 130 : [0, 0, 50]} color="white">
        <Head>
          <title>{`voty.ch - ${props.heading}`}</title>
        </Head>
        <Box
          as="main"
          px={[3, 3, 4]}
          py="25px"
          sx={{
            borderRadius: [0, 0, 5],
            backgroundColor: "panelColor",
            position: "relative",
          }}
          minWidth="min(100%, 800px)"
          width="100%"
          maxWidth="800px"
          minHeight="450px"
        >
          {props.image && <RImage src={props.image} width="100%" mt={-150} />}
          {props.heading && (
            <H1
              mt={0}
              mb={3}
              fontSize={[5, 5, "34px", "50px"]}
              fontWeight="black"
              sx={{ textDecoration: "underline" }}
            >
              <Flex justifyContent="space-between">
                {props.heading}
                {props.onClose && (
                  <A
                    onClick={props.onClose}
                    sx={{
                      position: "relative",
                      right: 0,
                      display: ["none", "none", "block"],
                    }}
                  >
                    <Box
                      color="white"
                      sx={{
                        opacity: 0.2,
                        transition: "0.4s ease-out",
                        ":hover": { opacity: 1.0, transform: "rotate(-90deg)" },
                      }}
                    >
                      <Image
                        src={IconClose}
                        alt="schliessen"
                        width="40"
                        height="40"
                      />
                    </Box>
                  </A>
                )}
              </Flex>
            </H1>
          )}
          {props.children}
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export const LoggedInPage: React.FC<React.PropsWithChildren<{
  role?: Role;
  children?: ReactNode;
  heading?: string;
  image?: string;
  bgImages?: string[];
}>> = ({ role, children, heading, bgImages, image }) => {
  const user = useUser();
  const allowed = role
    ? user?.role === role || user?.role === Role.Admin
    : true;

  if (user && allowed) {
    return (
      <AppPage heading={heading} image={image}>
        {children}
      </AppPage>
    );
  } else {
    return (
      <AppPage heading={heading} bgImages={bgImages} image={image}>
        <CheckLogin>
          <Text my={4}>
            Diese Seite benötigt eine Anmeldung
            {role && ` als ${getRoleName(role)}`}.
          </Text>
          <LoginForm />
        </CheckLogin>
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

export const Container: React.FC<React.PropsWithChildren<FlexProps>> = (props) => {
  return (
    <>
      <Flex mt={70} px={[0, 0, 3, 4]} justifyContent="center" {...props}>
        <Flex
          alignItems="center"
          flexDirection="column"
          flex={1}
          maxWidth={["100%", "100%", "100%", "1160px"]}
        >
          {props.children}
        </Flex>
      </Flex>
    </>
  );
};

export const Loading: React.FC<React.PropsWithChildren<unknown>> = () => (
  <Spinner color="white" size={20} mr={3} />
);

export const Err: React.FC<React.PropsWithChildren<{ msg?: string }>> = ({ msg, children }) => {
  const tr = useTr();
  return msg || children ? (
    <Info type="important">
      {msg && tr(msg)}
      {children}
    </Info>
  ) : null;
};

export const ErrorPage: React.FC<React.PropsWithChildren<unknown>> = (props) => (
  <Page heading="Fehler">
    <Heading as="h2">Oh je, es ist ein Fehler aufgetreten</Heading>
    <Text>{props.children}</Text>
  </Page>
);

export const LoadingPage: React.FC<React.PropsWithChildren<unknown>> = (props) => (
  <Page heading="Seite wird geladen...">
    <Text>{props.children}</Text>
  </Page>
);

export const Background: React.FC<React.PropsWithChildren<{ bgImages: string[]; start?: boolean }>> = (
  props
) => {
  // const gradient = "linear-gradient(180deg, rgb(2,11,20) 0%, rgb(31,47,65))";
  // `url("/images/${img}"), ${gradient}`);
  const bgImagesUrl = props.bgImages.map((img) => `url("/images/${img}")`);
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
        backgroundImage: bgImagesUrl,
        backgroundAttachment: "absolute",
        backgroundPositionY: 0,
        backgroundSize: "100%",
        backgroundPositionX: "center",
        backgroundColor: "bgcolor",
      }}
    />
  );
};

export const H1: React.FC<React.PropsWithChildren<HeadingProps>> = (props) => (
  <Heading
    as="h1"
    fontWeight="black"
    fontSize={[4, 4, 5, 6]}
    color="blue2"
    mt={6}
    mb={0}
    {...props}
  >
    {props.children}
  </Heading>
);

export const H2: React.FC<React.PropsWithChildren<HeadingProps>> = (props) => (
  <Heading as="h2" variant="panelheading" {...props}>
    {props.children}
  </Heading>
);

export const H3: React.FC<React.PropsWithChildren<HeadingProps>> = (props) => (
  <Heading
    as="h3"
    fontSize={[3, 3, 3]}
    variant="panelheading"
    sx={{ borderBottom: "none" }}
    {...props}
  >
    {props.children}
  </Heading>
);

export const H4: React.FC<React.PropsWithChildren<HeadingProps>> = (props) => (
  <Heading
    as="h4"
    fontSize={[3, 3, 3]}
    variant="panelheading"
    sx={{ borderBottom: "none" }}
    {...props}
  >
    {props.children}
  </Heading>
);

export const ShowFor: React.FC<React.PropsWithChildren<{ role: Role | string }>> = ({
  role,
  children,
}) => {
  const user = useUser();
  if (user?.role == role || user?.role == Role.Admin) {
    return <>{children}</>;
  } else {
    return null;
  }
};
