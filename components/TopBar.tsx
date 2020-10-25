import { Flex, Text, Link as A, Box } from "rebass";
import Link from "next/link";
import IconRegister from "../public/images/icon_register.svg";
import IconLogin from "../public/images/icon_login.svg";
import IconAccount from "../public/images/icon_account.svg";
import IconUp from "../public/images/icon_up.svg";
import IconDown from "../public/images/icon_down.svg";
import { useUser, SessionUser } from "state/user";
import { useState, useEffect } from "react";
import { Role } from "graphql/types";

export const TopBar: React.FC<{ showLogo?: boolean }> = (props) => {
  const user = useUser();
  const [loaded, setLoaded] = useState(false);

  // Delay showing of the login icons until user is loaded
  useEffect(() => {
    if (user === undefined) {
      setTimeout(() => setLoaded(true), 1000);
    } else setLoaded(true);
  }, [user]);

  return (
    <Flex
      bg="#505050"
      height="70px"
      width="100%"
      justifyContent="center"
      color="white"
      fontSize={3}
      px={[3, 3, 5, 0]}
      sx={{ position: "fixed", top: 0 }}
    >
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        maxWidth="1160px"
        pt="8px"
        flex={1}
      >
        <Box>
          {props.showLogo && (
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
      <Link href="/user/signup">
        <A>
          <Flex alignItems="center">
            <IconRegister />
            <Text ml={2} mr={4}>
              Registrieren
            </Text>
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
  return (
    <Flex flexDirection="column">
      <A onClick={() => setOpen(!open)}>
        <Flex
          alignItems="center"
          flexDirection="row"
          justifyContent="flex-end"
          mr="30px"
        >
          <IconAccount />
          <Text mx={3}>Mein Konto</Text>
          {open ? <IconUp /> : <IconDown />}
        </Flex>
      </A>
      {open && <AccountMenu user={user} />}
    </Flex>
  );
};

const AccountMenu: React.FC<{ user: SessionUser }> = ({ user }) => {
  return (
    <Box width="207px" mt="22px" ml="30px" sx={{ lineHeight: "16px" }}>
      <svg width="207px" height="15px" viewBox="-136 0 207 15" version="1.1">
        <path
          d="M2.95999555,15 L23.9609454,1.71229409 C25.7556788,0.648405241 27.974226,0.593219151 29.8196352,1.5665599 L53.9750193,14.3070506 C54.8378628,14.7621479 55.7986582,15 56.7741645,15 L93,15 L-114,15 L-0.0995490542,15 C0.977073975,15 2.03386354,14.7103124 2.95999555,14.1613164 Z"
          fill="#505050"
        ></path>
        {/*
        <path d="M116,15 L142,0 L169,15 L116,15" fill="#505050"></path>*/}
      </svg>
      <Box bg="#505050" m={0} width="207px" p={3} sx={{ borderRadius: "card" }}>
        <Text lineHeight="35px">
          <Link
            href={user?.role === Role.Teacher ? "/teacher" : "/student/test"}
          >
            <A>
              {user?.role === Role.Teacher ? "Meine Klassen" : "Abstimmungen"}
            </A>
          </Link>
          <br />
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
  return (
    <Flex>
      <A onClick={() => setOpen(!open)}>
        <img src="/images/voty_hamburger_red.svg" />
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
                  <img src="/images/voty_hamburger_cross_white.svg" />
                </Box>
              </A>
            </Text>
            <Text px={4} lineHeight="44px" fontWeight="semi">
              {!user ? (
                <nav>
                  <Link href="/user/login">
                    <A>Anmelden</A>
                  </Link>
                  <br />
                  <Link href="/user/signup">
                    <A>Registrieren</A>
                  </Link>
                  <br />
                  <br />
                </nav>
              ) : (
                <nav>
                  <Link href="/user/login">
                    <A>Startseite</A>
                  </Link>
                  <br />
                  <Link href="/user/profile">
                    <A>Profil bearbeiten</A>
                  </Link>
                  <br />
                  <Link href="/user/logout">
                    <A>Abmelden</A>
                  </Link>
                  <br />
                </nav>
              )}
            </Text>
          </Box>
        </>
      )}
    </Flex>
  );
};