import { Flex, Box } from "components/ui";
import { H3 } from "components/Page";
import { A } from "./Breadcrumb";

export const Footer: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <footer
      className="w-full mt-75 px-4 text-sm border-t-2 border-primary"
      style={{ background: "linear-gradient(#fff, #E6E7E9)" }}
    >
      <Flex className="max-w-200 mx-auto justify-between flex-wrap flex-col sm:flex-row">
        <Box>
          <H3 className="mb-4">Unterstützung</H3>
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
          <H3>Informationen</H3>
          <FLink href="/projekt">Infos zum Projekt</FLink>
          <FLink href="/faq">Häufige Fragen (FAQ)</FLink>
          <FLink href="/newsletter">Anmeldung Newsletter</FLink>
        </NavBox>
        <NavBox>
          <H3>Anmeldung</H3>
          <FLink href="/sus">Als Schüler*in registrieren</FLink>
          <FLink href="/user/signup">Neue Schulklasse anmelden</FLink>
          <FLink href="/lernen">Online-Lehrmittel</FLink>
          <FLink href="/abstimmen">Klassenabstimmung</FLink>
        </NavBox>

        <NavBox>
          <H3>Allgemein</H3>
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
    </footer>
  );
};

const FLink: React.FC<
  React.PropsWithChildren<
    React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string }
  >
> = (props) => (
  <A className="block footer-link" {...props}>
    {props.children}
  </A>
);

const NavBox: React.FC<React.PropsWithChildren<unknown>> = (props) => (
  <nav className="flex flex-col gap-4">{props.children}</nav>
);
