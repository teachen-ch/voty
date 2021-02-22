import { useState } from "react";
import { Box, Flex, Text } from "rebass";
import { SessionUser } from "state/user";
import { A } from "./Breadcrumb";
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

export const NavMobile: React.FC<{ user: SessionUser; color: string }> = ({
  user,
  color,
}) => {
  const [open, setOpen] = useState(false);
  const burgerIcon = {
    width: "1.2em",
    verticalAlign: "sub",
    marginRight: "17px",
  };
  const isTeacher = user?.role === Role.Teacher;
  return (
    <Flex color="#fff" pt={1}>
      <A onClick={() => setOpen(!open)} color={color} variant="link">
        <IconBurger alt="Menu" width="33" height="27" />
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
                  <IconCross alt="schliessen" />
                </Box>
              </A>
            </Text>
            <Text pl={4} lineHeight="55px" fontWeight="semi">
              <A href="/" variant="link">
                <IconHome style={burgerIcon} />
                Startseite
              </A>
              <hr />
              {!user ? (
                <nav>
                  <A href="/user/signup" variant="link">
                    <IconRegister style={burgerIcon} />
                    Klasse anmelden
                  </A>
                  <br />
                  <A href="/user/login" variant="link">
                    <IconLogin style={burgerIcon} />
                    Login
                  </A>
                  <br />
                </nav>
              ) : (
                <nav>
                  <A href="/user/login" variant="link">
                    <IconClasses style={burgerIcon} />
                    {isTeacher ? "Meine Klassen" : "Meine Klasse"}
                  </A>
                  <br />
                  <A href="/user/profile" variant="link">
                    <IconAccount style={burgerIcon} />
                    Mein Profil
                  </A>
                  <br />
                  <A href="/user/logout" variant="link">
                    <IconLogout style={burgerIcon} />
                    Abmelden
                  </A>
                  <br />
                </nav>
              )}
              <hr />
              <A href="/faq" variant="link">
                <IconFaq style={burgerIcon} />
                Häufige Fragen
              </A>
              <br />
              <A href="/team-voty" variant="link">
                <IconTeam style={burgerIcon} />
                Team
              </A>
              <hr />
              <A href="/newsletter" variant="link">
                <IconNewsletter style={burgerIcon} />
                Newsletter
              </A>
              <br />
              <A href="/impressum" variant="link">
                <IconImpressum style={burgerIcon} />
                Impressum
              </A>
            </Text>
          </Box>
        </>
      )}
    </Flex>
  );
};
