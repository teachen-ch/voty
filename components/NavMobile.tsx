import { useState } from "react";
import { Box, Flex, Text } from "rebass";
import { SessionUser } from "state/user";
import { A } from "./Breadcrumb";
import Image from "next/legacy/image";
import IconLogout from "../public/images/icon_logout.svg";
import IconHome from "../public/images/icon_home.svg";
import IconImpressum from "../public/images/icon_impressum.svg";
import IconNewsletter from "../public/images/icon_newsletter.svg";
import IconCross from "../public/images/icon_cross.svg";
import IconBurger from "../public/images/icon_burger.svg";
import IconRegister from "../public/images/icon_register.svg";
import IconLogin from "../public/images/icon_login.svg";
import IconAccount from "../public/images/icon_account.svg";
import IconClasses from "../public/images/icon_classes.svg";
import IconTeam from "../public/images/icon_team.svg";
import IconFaq from "../public/images/icon_faq.svg";

import { Role } from "graphql/types";

export const NavMobile: React.FC<React.PropsWithChildren<{ user: SessionUser; color: string }>> = ({
  user,
  color,
}) => {
  const [open, setOpen] = useState(false);
  const isTeacher = user?.role === Role.Teacher;
  return (
    <Flex color="#fff" pt={1}>
      <A onClick={() => setOpen(!open)} color={color} variant="link">
        <Image src={IconBurger} alt="Menu" width="33" height="27" />
      </A>
      {open && (
        <>
          <Box
            bg="rgba(0,0,0,0.6)"
            width="20%"
            height="100%"
            onClick={() => setOpen(false)}
            sx={{ position: "fixed", top: 0, left: 0 }}
          ></Box>
          <Box
            bg="primary"
            width="80%"
            height="100%"
            fontSize={[3, 4]}
            sx={{
              position: "fixed",
              top: 0,
              right: 0,
              zIndex: 99,
              overflow: "scroll",
            }}
          >
            <Text textAlign="right">
              <A onClick={() => setOpen(false)} variant="link">
                <Box width="30" height="30" pt="18px" pr="18px">
                  <Image src={IconCross} alt="schliessen" />
                </Box>
              </A>
            </Text>
            <Text pl={4} lineHeight="55px" fontWeight="semi">
              <A href="/" variant="link">
                <MIcon src={IconHome} />
                Startseite
              </A>
              <hr />
              {!user ? (
                <nav>
                  <A href="/user/signup" variant="link">
                    <MIcon src={IconRegister} />
                    Klasse anmelden
                  </A>
                  <br />
                  <A href="/user/login" variant="link">
                    <MIcon src={IconLogin} />
                    Login
                  </A>
                  <br />
                </nav>
              ) : (
                <nav>
                  <A href="/user/login" variant="link">
                    <MIcon src={IconClasses} />
                    {isTeacher ? "Meine Klassen" : "Meine Klasse"}
                  </A>
                  <br />
                  <A href="/user/profile" variant="link">
                    <MIcon src={IconAccount} />
                    Mein Profil
                  </A>
                  <br />
                  <A href="/user/logout" variant="link">
                    <MIcon src={IconLogout} />
                    Abmelden
                  </A>
                  <br />
                </nav>
              )}
              <hr />
              <A href="/faq" variant="link">
                <MIcon src={IconFaq} />
                Häufige Fragen
              </A>
              <br />
              <A href="/team-voty" variant="link">
                <MIcon src={IconTeam} />
                Team
              </A>
              <hr />
              <A href="/newsletter" variant="link">
                <MIcon src={IconNewsletter} />
                Newsletter
              </A>
              <br />
              <A href="/impressum" variant="link">
                <MIcon src={IconImpressum} />
                Impressum
              </A>
            </Text>
          </Box>
        </>
      )}
    </Flex>
  );
};

const MIcon: React.FC<React.PropsWithChildren<{ src: string }>> = ({ src }) => (
  <Box mr={3} display="inline-block" verticalAlign="sub">
    <Image src={src} alt="" />
  </Box>
);
