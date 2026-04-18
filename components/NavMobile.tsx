import { useState } from "react";
import { Box, Flex } from "components/ui";
import { SessionUser } from "state/user";
import { A } from "./Breadcrumb";
import Image from "next/image";
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

export const NavMobile: React.FC<
  React.PropsWithChildren<{ user: SessionUser; color: string }>
> = ({ user, color }) => {
  const [open, setOpen] = useState(false);
  const isTeacher = user?.role === Role.Teacher;
  return (
    <Flex className="text-white pt-1">
      <A onClick={() => setOpen(!open)} color={color}>
        <Image src={IconBurger} alt="Menu" width={33} height={27} />
      </A>
      {open && (
        <>
          <Box
            className="fixed top-0 left-0 w-[20%] h-full bg-[rgba(0,0,0,0.6)]"
            onClick={() => setOpen(false)}
          />
          <Box className="fixed top-0 right-0 w-[80%] h-full text-lg overflow-scroll z-[99] bg-primary">
            <Box className="text-right">
              <A onClick={() => setOpen(false)}>
                <Box className="w-[30px] h-[30px] pt-[18px] pr-[18px]">
                  <Image src={IconCross} alt="schliessen" />
                </Box>
              </A>
            </Box>
            <Box className="pl-8 leading-[55px] font-semibold">
              <A href="/">
                <MIcon src={IconHome} />
                Startseite
              </A>
              <hr />
              {!user ? (
                <nav>
                  <A href="/user/signup">
                    <MIcon src={IconRegister} />
                    Klasse anmelden
                  </A>
                  <br />
                  <A href="/user/login">
                    <MIcon src={IconLogin} />
                    Login
                  </A>
                  <br />
                </nav>
              ) : (
                <nav>
                  <A href="/user/login">
                    <MIcon src={IconClasses} />
                    {isTeacher ? "Meine Klassen" : "Meine Klasse"}
                  </A>
                  <br />
                  <A href="/user/profile">
                    <MIcon src={IconAccount} />
                    Mein Profil
                  </A>
                  <br />
                  <A href="/user/logout">
                    <MIcon src={IconLogout} />
                    Abmelden
                  </A>
                  <br />
                </nav>
              )}
              <hr />
              <A href="/faq">
                <MIcon src={IconFaq} />
                Häufige Fragen
              </A>
              <br />
              <A href="/team-voty">
                <MIcon src={IconTeam} />
                Team
              </A>
              <hr />
              <A href="/newsletter">
                <MIcon src={IconNewsletter} />
                Newsletter
              </A>
              <br />
              <A href="/impressum">
                <MIcon src={IconImpressum} />
                Impressum
              </A>
            </Box>
          </Box>
        </>
      )}
    </Flex>
  );
};

const MIcon: React.FC<React.PropsWithChildren<{ src: string }>> = ({ src }) => (
  <Box className="mr-4 inline-block align-sub">
    <Image src={src} alt="" />
  </Box>
);
