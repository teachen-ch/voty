import { Flex, Box, Text, Link as A } from "rebass";
import { Container } from "./Page";
import { useUser } from "state/user";
import Link from "next/link";

export const Footer: React.FC = () => (
  <Container as="footer" pt={6} pb={3} fontSize={"0.8em"}>
    <Text width={["100%", "100%", 400]} mx="auto">
      voty ist ein{" "}
      <A
        href="https://github.com/teachen-ch/voty"
        target="_blank"
        color="black"
        rel="noreferrer"
        sx={{ textDecoration: "underline" }}
      >
        Open-Source
      </A>{" "}
      Projekt des Vereins{" "}
      <A
        href="https://teachen.ch/verein-teachen"
        color="black"
        sx={{ textDecoration: "underline" }}
      >
        «Teachen!»
      </A>{" "}
      mit tatkräftiger Unterstützung des{" "}
      {/*<Link
          href="https://prototypefund.opendata.ch"
          target="_blank"
          color="black"
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
        <nav>
          <AnAbmelden />
          &nbsp;&nbsp;| &nbsp;
          <Link href="/impressum">
            <A color="black">Impressum</A>
          </Link>
          &nbsp;&nbsp;| &nbsp;
          <Link href="/datenschutz">
            <A color="black">Datenschutz</A>
          </Link>
          &nbsp;&nbsp;| &nbsp;
          <Link href="/kontakt">
            <A color="black">Kontakt</A>
          </Link>
          &nbsp;&nbsp;| &nbsp;
          <A
            href="https://twitter.com/voty_ch"
            target="_blank"
            color="black"
            rel="noreferrer"
          >
            Twitter
          </A>
          &nbsp;&nbsp;| &nbsp;
          <A
            href="https://github.com/teachen-ch/voty"
            target="_blank"
            color="black"
            rel="noreferrer"
          >
            GitHub
          </A>
        </nav>
      </Box>
    </Flex>
  </Container>
);

const AnAbmelden: React.FC = () => {
  const user = useUser();
  if (user) {
    return (
      <Link href="/user/logout">
        <A color="black">Abmelden</A>
      </Link>
    );
  } else
    return (
      <Link href="/user/login">
        <A color="black">Anmelden</A>
      </Link>
    );
};
