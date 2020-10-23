import { Flex, Box, Text, Link as A } from "rebass";
import Link from "next/link";

export const Footer: React.FC<{ color: string }> = ({ color }) => (
  <Flex
    as="footer"
    pt={6}
    pb={3}
    textAlign="center"
    flexDirection="column"
    fontSize={1}
  >
    <Text width={["100%", "100%", 400]} mx="auto" color={color}>
      voty.ch ist ein{" "}
      <A
        href="https://github.com/teachen-ch/voty"
        target="_blank"
        rel="noreferrer"
        sx={{ textDecoration: "underline" }}
      >
        Open-Source
      </A>{" "}
      Projekt des Vereins{" "}
      <A
        href="https://teachen.ch/verein-teachen"
        sx={{ textDecoration: "underline" }}
      >
        «Teachen!»
      </A>{" "}
      mit tatkräftiger Unterstützung des{" "}
      {/*<Link
          href="https://prototypefund.opendata.ch"
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "underline" }}
        >PrototypeFund</Link>*/}
      PrototypeFund
    </Text>
    <Flex justifyContent="center" flexDirection="column">
      <Box mt={3} mx="auto">
        {/*<Link href="https://prototypefund.opendata.ch" target="_blank"></Link>*/}
        <img
          src="/images/pf_logo.png"
          alt="Prototypefund Logo"
          style={{ width: "40px" }}
        />
        <hr />
        <Box as="nav" color={color}>
          <Link href="/impressum">
            <A px={[1, 1, 2, 2]}>Impressum</A>
          </Link>
          |
          <Link href="/datenschutz">
            <A px={[1, 1, 2, 2]}>Datenschutz</A>
          </Link>
          |
          <Link href="/kontakt">
            <A px={[1, 1, 2, 2]}>Kontakt</A>
          </Link>
          |
          <A
            px={[1, 1, 2, 2]}
            href="https://twitter.com/voty_ch"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </A>
          |
          <A
            px={[1, 1, 2, 2]}
            href="https://github.com/teachen-ch/voty"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </A>
        </Box>
      </Box>
    </Flex>
  </Flex>
);

/*
const AnAbmelden: React.FC = () => {
  const user = useUser();
  if (user) {
    return (
      <Link href="/user/logout">
        <A px={[1, 1, 2, 2]}>Abmelden</A>
      </Link>
    );
  } else
    return (
      <Link href="/user/login">
        <A px={[1, 1, 2, 2]}>Anmelden</A>
      </Link>
    );
};
*/
