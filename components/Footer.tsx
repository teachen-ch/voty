import { Flex, Box, Text, Link as A } from "rebass";
import Link from "next/link";

export const Footer: React.FC<{ color: string | string[] }> = ({ color }) => (
  <Flex
    as="footer"
    pt={[5, 5, 6]}
    pb={3}
    px={2}
    textAlign="center"
    width={["100%", "100%", 400]}
    flexDirection="column"
    fontSize={1}
  >
    <Text mx="auto" color={color}>
      voty.ch ist ein{" "}
      <A
        href="https://github.com/teachen-ch/voty"
        target="_blank"
        rel="noreferrer"
        variant="underline"
      >
        Open-Source
      </A>{" "}
      Projekt des Vereins{" "}
      <A href="https://teachen.ch/verein-teachen" variant="underline">
        «Teachen!»
      </A>{" "}
      mit tatkräftiger Unterstützung des PrototypeFund
    </Text>
    <Flex justifyContent="center" flexDirection="column">
      <Box mt={3}>
        <img
          src="/images/pf_logo.png"
          alt="Prototypefund Logo"
          width={34}
          height={42}
        />
        <hr style={{ borderColor: "inherit", borderTopWidth: "0px" }} />
        <Flex as="nav" color={color} justifyContent="space-between">
          <Link href="/impressum">
            <A>Impressum</A>
          </Link>
          {" | "}
          <Link href="/datenschutz">
            <A>Datenschutz</A>
          </Link>
          {" | "}
          <Link href="/kontakt">
            <A>Kontakt</A>
          </Link>
          {" | "}
          <A
            href="https://twitter.com/voty_ch"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </A>
          {" | "}
          <A
            href="https://github.com/teachen-ch/voty"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </A>
        </Flex>
      </Box>
    </Flex>
  </Flex>
);
