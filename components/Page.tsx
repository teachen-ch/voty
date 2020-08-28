import { Flex, Box, Heading, Text } from "rebass";

export function Page({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      maxWidth={["100%", "100%", "1000px", "1200px"]}
      mx="auto"
      px={[3, 3, 4]}
      flexDirection="column"
      justifyContent="center"
    >
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
        {children}
      </Box>
    </Flex>
  );
}

export const PageHeading = ({ children }: { children: React.ReactNode }) => (
  <Heading
    as="h1"
    fontSize={[4, 5, 6, 6]}
    textAlign="center"
    mt={40}
    sx={{ borderBottom: "1px solid #979797" }}
    pb={1}
  >
    {children}
  </Heading>
);

export const Container = (props) => (
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

export const ErrorPage = (props) => (
  <Page>
    <PageHeading>Fehler</PageHeading>
    <Heading as="h2">Oh je, es ist ein Fehler aufgetreten</Heading>
    <Text>{props.children}</Text>
  </Page>
);
