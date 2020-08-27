import { Flex, Box, Text, Link } from "rebass";
import { Container } from "./Page";

export function Footer() {
  return (
    <Container as="footer" pt={6} pb={3} fontSize={"0.8em"}>
      <Text>
        voty ist ein Projekt des Vereins{" "}
        <Link
          href="https://teachen.ch/verein-teachen"
          color="black"
          sx={{ textDecoration: "underline" }}
        >
          «Teachen!»
        </Link>
        <br />
        mit tatkräftiger Unterstützung des
        <br />
        <Link
          href="https://prototypefund.opendata.ch"
          target="_blank"
          color="black"
          sx={{ textDecoration: "underline" }}
        >
          PrototypeFund
        </Link>
      </Text>
      <Flex justifyContent="center" flexDirection="column">
        <Box mt={3} mx="auto">
          <Link href="https://prototypefund.opendata.ch" target="_blank">
            <img
              src="/images/pf_logo.png"
              alt="Prototypefund Logo"
              style={{ width: "40px" }}
            />
          </Link>
          <hr />
          <nav>
            <Link href="/user/login" color="black">
              Anmelden
            </Link>
            &nbsp;&nbsp;| &nbsp;
            <Link href="/impressum" color="black">
              Impressum
            </Link>
            &nbsp;&nbsp;| &nbsp;
            <Link href="/datenschutz" color="black">
              Datenschutz
            </Link>
            &nbsp;&nbsp;| &nbsp;
            <Link href="/kontakt" color="black">
              Kontakt
            </Link>
          </nav>
        </Box>
      </Flex>
    </Container>
  );
}
