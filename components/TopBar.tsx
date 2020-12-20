import { Flex, Image, Text, Link as A, Box } from "rebass";
import Link from "next/link";
// import IconRegister from "../public/images/icon_register.svg";
import IconLogin from "../public/images/icon_login.svg";
import IconLogout from "../public/images/icon_logout.svg";
import IconAccount from "../public/images/icon_account.svg";
import IconHome from "../public/images/icon_home.svg";
import IconImpressum from "../public/images/icon_impressum.svg";
import IconNewsletter from "../public/images/icon_newsletter.svg";
import { useUser, SessionUser } from "state/user";
import { useState, useEffect } from "react";
import { Role } from "graphql/types";

export const TopBar: React.FC<{ hideLogo?: boolean }> = (props) => {
  const user = useUser();
  const [loaded, setLoaded] = useState(false);
  let cancel = 0;

  // Delay showing of the login icons until user is loaded
  useEffect(() => {
    if (user === undefined) {
      cancel = setTimeout(() => setLoaded(true), 1000);
    } else {
      setLoaded(true);
    }
    return () => clearTimeout(cancel);
  }, [user]);

  return (
    <Flex
      bg={["inherit", "inherit", "#505050"]}
      height="70px"
      width="100%"
      justifyContent="center"
      color="white"
      fontSize={3}
      px={[3, 3, 5, 0]}
      sx={{ position: ["absolute", "absolute", "fixed"], top: 0, zIndex: 10 }}
    >
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        maxWidth="1160px"
        pt="8px"
        flex={1}
      >
        <Box>
          {!props.hideLogo && (
            <Link href="/">
              <A>
                <img
                  src="/images/voty_logo.svg"
                  alt="voty"
                  width="103px"
                  style={{ filter: "brightness(100)", marginTop: 10 }}
                />
              </A>
            </Link>
          )}
        </Box>
        <Box pt="10px" sx={{ display: ["none", "none", "block", "block"] }}>
          {loaded && (user ? <Account user={user} /> : <RegisterLogin />)}
        </Box>
        <Box pt="10px" sx={{ display: ["block", "block", "none", "none"] }}>
          <MobileBurger user={user} />
        </Box>
      </Flex>
    </Flex>
  );
};

const RegisterLogin: React.FC = () => {
  return (
    <Flex alignItems="center">
      <Link href="/projekt">
        <A>
          <Flex alignItems="center">
            <Text mr={4}>Über das Projekt voty.ch</Text>
          </Flex>
        </A>
      </Link>
      <Link href="/user/login">
        <A>
          <Flex alignItems="center">
            <IconLogin />
            <Text ml={3}>Anmelden</Text>
          </Flex>
        </A>
      </Link>
    </Flex>
  );
};

const Account: React.FC<{ user: SessionUser }> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const isTeacher = user?.role === Role.Teacher;
  return (
    <Flex>
      <Link href={isTeacher ? "/teacher" : "/student/test"}>
        <A>
          <Flex
            alignItems="center"
            flexDirection="row"
            justifyContent="flex-end"
          >
            <Image alt="Liste" src={`/images/icon_classes.svg`} mr={2} />
            {isTeacher ? "Meine Klassen" : "Meine Klasse"}
          </Flex>
        </A>
      </Link>
      <Flex flexDirection="column" width="262px">
        <A onClick={() => setOpen(!open)}>
          <Flex
            alignItems="center"
            flexDirection="row"
            justifyContent="flex-end"
            mr={0}
          >
            <IconAccount />
            <Text mx={2}>Mein Konto</Text>
            {open ? (
              <Image src="/images/icon_up.svg" />
            ) : (
              <Image src="/images/icon_down.svg" />
            )}
          </Flex>
        </A>
        {open && <AccountMenu />}
      </Flex>
    </Flex>
  );
};

const AccountMenu: React.FC = () => {
  return (
    <Box width="207px" mt="22px" ml="85px" sx={{ lineHeight: "16px" }}>
      <svg width="207px" height="15px" viewBox="-136 0 207 15" version="1.1">
        <path
          d="M2.95999555,15 L23.9609454,1.71229409 C25.7556788,0.648405241 27.974226,0.593219151 29.8196352,1.5665599 L53.9750193,14.3070506 C54.8378628,14.7621479 55.7986582,15 56.7741645,15 L93,15 L-114,15 L-0.0995490542,15 C0.977073975,15 2.03386354,14.7103124 2.95999555,14.1613164 Z"
          fill="#505050"
        ></path>
      </svg>
      <Box bg="#505050" m={0} width="207px" p={3} sx={{ borderRadius: "card" }}>
        <Text lineHeight="35px">
          <Link href="/user/profile">
            <A>Profil bearbeiten</A>
          </Link>
          <br />
          <Link href="/user/logout">
            <A>Abmelden</A>
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

const MobileBurger: React.FC<{ user: SessionUser }> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const burgerIcon = {
    width: "1.2em",
    verticalAlign: "sub",
    marginRight: "17px",
  };
  const isTeacher = user?.role === Role.Teacher;
  return (
    <Flex>
      <A onClick={() => setOpen(!open)}>
        <img src="/images/voty_hamburger_red.svg" alt="Menu" />
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
            fontSize={4}
            sx={{
              position: "fixed",
              top: 0,
              right: 0,
              zIndex: 99,
            }}
          >
            <Text textAlign="right">
              <A onClick={() => setOpen(false)}>
                <Box width="30" height="30" pt="18px" pr="18px">
                  <img
                    src="/images/voty_hamburger_cross_white.svg"
                    alt="schliessen"
                  />
                </Box>
              </A>
            </Text>
            <Text pl={4} lineHeight="55px" fontWeight="semi">
              <Link href="/">
                <A>
                  <IconHome style={burgerIcon} />
                  Startseite
                </A>
              </Link>
              <hr />
              {!user ? (
                <nav>
                  <Link href="/user/login">
                    <A>
                      <IconLogin style={burgerIcon} />
                      Anmelden
                    </A>
                  </Link>
                  <br />
                  {/*
                  <Link href="/user/signup">
                    <A>
                      <IconRegister style={burgerIcon} />
                      Registrieren
                    </A>
                  </Link>
                  <br />*/}
                </nav>
              ) : (
                <nav>
                  <Link href="/user/login">
                    <A>
                      <img
                        alt="Liste"
                        src={`/images/icon_${
                          isTeacher ? "classes" : "list"
                        }.svg`}
                        style={burgerIcon}
                      />
                      {isTeacher ? "Klassen" : "Abstimmungen"}
                    </A>
                  </Link>
                  <br />
                  <Link href="/user/profile">
                    <A>
                      <IconAccount style={burgerIcon} />
                      Mein Profil
                    </A>
                  </Link>
                  <br />
                  <Link href="/user/logout">
                    <A>
                      <IconLogout style={burgerIcon} />
                      Abmelden
                    </A>
                  </Link>
                  <br />
                </nav>
              )}
              <hr />
              <Link href="/newsletter">
                <A>
                  <IconNewsletter style={burgerIcon} />
                  Newsletter
                </A>
              </Link>
              <br />
              <Link href="/impressum">
                <A>
                  <IconImpressum style={burgerIcon} />
                  Impressum
                </A>
              </Link>
            </Text>
          </Box>
        </>
      )}
    </Flex>
  );
};
