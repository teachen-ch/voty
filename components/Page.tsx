import {
  Flex,
  Box,
  Heading,
  Text,
  Link as A,
  HeadingProps,
} from "components/ui";
import { cn } from "util/cn";
import Head from "next/head";
import { useUser } from "state/user";
import { LoginForm } from "pages/user/login";
import React, { ReactNode } from "react";
import CheckLogin from "./CheckLogin";
import { Spinner } from "components/ui";
import { Role } from "graphql/types";
import { Footer } from "components/Footer";
import { TopBar } from "./TopBar";
import IconClose from "../public/images/icon_close.svg";
import { Info } from "./Info";
import { useTr } from "util/translate";
import Image from "next/image";

export const Page: React.FC<
  React.PropsWithChildren<{
    children?: React.ReactNode;
    heading?: string;
    bgImages?: string[];
  }>
> = ({ heading, bgImages, children }) => {
  return (
    <AppPage heading={heading} bgImages={bgImages}>
      {children}
    </AppPage>
  );
};

export const AppPage: React.FC<
  React.PropsWithChildren<{
    image?: string;
    bgImages?: string[];
    heading?: string;
    onClose?: () => void;
  }>
> = (props) => {
  const bgImages = props.bgImages || [];
  return (
    <>
      <Background bgImages={bgImages} />
      <TopBar home />
      <Container className={props.image ? "pt-30" : "pt-0 sm:pt-10"}>
        <Head>
          <title>{`voty.ch – ${props.heading}`}</title>
        </Head>
        <main className="px-4 sm:px-8 py-6 sm:rounded-card bg-panel relative min-w-[min(100%,800px)] w-full max-w-200 min-h-112.5">
          {props.image && (
            <img
              src={props.image}
              alt=""
              style={{ width: "100%", marginTop: "-150px" }}
            />
          )}
          {props.heading && (
            <H1 className="mt-0 mb-4 text-2xl sm:text-[34px] md:text-[50px] font-black underline">
              <Flex className="justify-between">
                {props.heading}
                {props.onClose && (
                  <A
                    onClick={props.onClose}
                    className="hidden sm:block relative right-0"
                  >
                    <Box className="text-white opacity-20 transition-[0.4s_ease-out] hover:opacity-100 hover:-rotate-90">
                      <Image
                        src={IconClose}
                        alt="schliessen"
                        width={40}
                        height={40}
                      />
                    </Box>
                  </A>
                )}
              </Flex>
            </H1>
          )}
          {props.children}
        </main>
      </Container>
      <Footer />
    </>
  );
};

export const LoggedInPage: React.FC<
  React.PropsWithChildren<{
    role?: Role;
    children?: ReactNode;
    heading?: string;
    image?: string;
    bgImages?: string[];
  }>
> = ({ role, children, heading, bgImages, image }) => {
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
          <Text className="my-8">
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

export const Container: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ className, children, ...props }) => {
  return (
    <Flex
      className={`mt-20 px-4 sm:px-4 md:px-8 justify-center ${className ?? ""}`}
      {...props}
    >
      <Flex className="items-center flex-col flex-1 max-w-full md:max-w-290">
        {children}
      </Flex>
    </Flex>
  );
};

export const Loading: React.FC<React.PropsWithChildren<unknown>> = () => (
  <Spinner color="white" size={20} className="mr-4" />
);

export const Err: React.FC<React.PropsWithChildren<{ msg?: string }>> = ({
  msg,
  children,
}) => {
  const tr = useTr();
  return msg || children ? (
    <Info type="important">
      {msg && tr(msg)}
      {children}
    </Info>
  ) : null;
};

export const ErrorPage: React.FC<React.PropsWithChildren<unknown>> = (
  props
) => (
  <Page heading="Fehler">
    <Heading as="h2">Oh je, es ist ein Fehler aufgetreten</Heading>
    <Text>{props.children}</Text>
  </Page>
);

export const LoadingPage: React.FC<React.PropsWithChildren<unknown>> = (
  props
) => (
  <Page heading="Seite wird geladen...">
    <Text>{props.children}</Text>
  </Page>
);

export const Background: React.FC<
  React.PropsWithChildren<{ bgImages: string[]; start?: boolean }>
> = (props) => {
  const bgImagesUrl = props.bgImages
    .map((img) => `url("/images/${img}")`)
    .join(", ");
  return (
    <Box
      className="fixed top-0 -z-10 w-full h-full bg-white"
      style={{
        backgroundImage: bgImagesUrl || undefined,
        backgroundAttachment: "scroll",
        backgroundPositionY: 0,
        backgroundSize: "100%",
        backgroundPositionX: "center",
      }}
    />
  );
};

export const H1: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>
> = ({ className, children, ...props }) => (
  <h1
    className={cn(
      "font-heading leading-heading font-black text-xl sm:text-2xl md:text-3xl text-blue2 mt-32 mb-0",
      className
    )}
    {...props}
  >
    {children}
  </h1>
);

export const H2: React.FC<React.PropsWithChildren<HeadingProps>> = (props) => (
  <Heading variant="panelheading" {...props}>
    {props.children}
  </Heading>
);

export const H3: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>
> = ({ className, children, ...props }) => (
  <h3
    className={cn(
      "font-heading leading-heading font-semibold text-blue2 mt-8 pb-1 mb-2 text-lg border-b-0",
      className
    )}
    {...props}
  >
    {children}
  </h3>
);

export const H4: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>
> = ({ className, children, ...props }) => (
  <h4
    className={cn(
      "font-heading leading-heading font-semibold text-blue2 mt-8 pb-1 mb-2 text-lg border-b-0",
      className
    )}
    {...props}
  >
    {children}
  </h4>
);

export const ShowFor: React.FC<
  React.PropsWithChildren<{ role: Role | string }>
> = ({ role, children }) => {
  const user = useUser();
  if (user?.role == role || user?.role == Role.Admin) {
    return <>{children}</>;
  } else {
    return null;
  }
};
