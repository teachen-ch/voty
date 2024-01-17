import { Flex, Box, LinkProps } from "rebass";
import { H3 } from "components/Page";
import { A } from "./Breadcrumb";

export const Footer: React.FC = () => {
  return (
    <Box>
      <Box
        as="footer"
        px={3}
        mt={300}
        width="calc(100vw)"
        fontSize={1}
        sx={{
          position: "absolute",
          left: 0,
          borderTop: "2px solid",
          borderColor: "primary",
          background: "linear-gradient(#fff, #E6E7E9)",
        }}
      >
        <Flex
          maxWidth="800px"
          mx="auto"
          justifyContent="space-between"
          flexWrap="wrap"
          flexDirection={["column", "column", "row", "row"]}
        >
          <Box>
            <H3 mb={3} as="h2">
              Unterstützung
            </H3>
            <img
              src="/images/pf_logo.png"
              alt="Prototypefund Logo"
              width={34}
              height={42}
            />
            <br />
            <br />
            <img
              src="/images/logo_mercator.png"
              alt="Prototypefund Logo"
              width={100}
              height={52}
            />
            <br />
            <br />
            <img
              src="/images/logo_bpb.png"
              alt="Bundeszentrale für politische Bildung"
              width={100}
              height={42}
            />
            <br />
            <br />
          </Box>
          <NavBox>
            <H3 as="h2">Informationen</H3>
            <FLink href="/projekt">Infos zum Projekt</FLink>
            <FLink href="/faq">Häufige Fragen (FAQ)</FLink>
            <FLink href="/newsletter">Anmeldung Newsletter</FLink>
          </NavBox>
          <NavBox>
            <H3 as="h2">Anmeldung</H3>
            <FLink href="/sus">Als Schüler*in registrieren</FLink>
            <FLink href="/user/signup">Neue Schulklasse anmelden</FLink>
            <FLink href="/lernen">Online-Lehrmittel</FLink>
            <FLink href="/abstimmen">Klassenabstimmung</FLink>
          </NavBox>

          <NavBox>
            <H3 as="h2">Allgemein</H3>
            <FLink href="/kontakt">Kontakt</FLink>
            <FLink href="/datenschutz">Datenschutz</FLink>
            <FLink
              href="https://twitter.com/voty_ch"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </FLink>
            <FLink
              href="https://github.com/teachen-ch/voty"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </FLink>
          </NavBox>
        </Flex>
      </Box>
    </Box>
  );
};

const FLink: React.FC<LinkProps> = (props) => (
  <A display="block" variant="footerLink" {...props}>
    {props.children}
  </A>
);

const NavBox: React.FC = (props) => (
  <Box
    as="nav"
    //sx={{ borderLeft: ["", "", "1px solid lightgray"] }}
    //pl={3}
    pb={4}
  >
    {props.children}
  </Box>
);
