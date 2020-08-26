import { Flex, Box, Heading } from "rebass";
import { callbackify } from "util";
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      maxWidth={["100%", "100%", "1000px", "1200px"]}
      mx="auto"
      px={[3, 3, 3, 4]}
      flexDirection="column"
      justifyContent="center"
    >
      <a href="/">
        <img
          src="/images/voty_logo.svg"
          alt="voty"
          className="logo-page"
          style={{ height: 45, marginTop: 20, marginLeft: 20 }}
        />
      </a>
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
    fontSize={[3, 4, 5, 6, 6]}
    textAlign="center"
    mt={40}
    sx={{ borderBottom: "1px solid #979797" }}
    pb={1}
  >
    {children}
  </Heading>
);
