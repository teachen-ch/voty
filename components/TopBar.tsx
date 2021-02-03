import { Flex, Image, Text, Box } from "rebass";
import { A } from "components/Breadcrumb";
import IconRegister from "../public/images/icon_register.svg";
import IconLogin from "../public/images/icon_login.svg";
import IconLogout from "../public/images/icon_logout.svg";
import IconAccount from "../public/images/icon_account.svg";
import IconHome from "../public/images/icon_home.svg";
import IconClasses from "../public/images/icon_classes.svg";
import IconImpressum from "../public/images/icon_impressum.svg";
import IconNewsletter from "../public/images/icon_newsletter.svg";
import IconDown from "../public/images/icon_down.svg";
import IconUp from "../public/images/icon_up.svg";
import IconCross from "../public/images/icon_cross.svg";
import IconBurger from "../public/images/icon_burger.svg";
import { useUser, SessionUser } from "state/user";
import { useState, useEffect } from "react";
import { Role } from "graphql/types";
import { useColorMode } from "theme-ui";

export const TopBar: React.FC<{ home?: boolean }> = ({ home }) => {
  const user = useUser();
  const [loaded, setLoaded] = useState(false);
  const [colorMode, setColorMode] = useColorMode();
  const light = colorMode === "light";
  const [darkMode, setDarkMode] = useState<string | null>("");
  const burgerColor = home ? "white" : "#fff";
  const votyLogo = `/images/voty_logo_${home && light ? "black" : "white"}.svg`;

  useEffect(() => {
    if (document?.location.hash === "#darkmode") {
      setDarkMode("true");
      if (typeof localStorage !== "undefined")
        localStorage.setItem("darkmode", "true");
    } else if (typeof localStorage !== "undefined") {
      setDarkMode(localStorage.getItem("darkmode"));
    }
  }),
    [];

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
      bg={home ? "transparent" : "topbarColor"}
      height="70px"
      width="100%"
      justifyContent="center"
      color={home && light ? "white" : "#fff"}
      fontSize={3}
      px={[3, 3, 5, 0]}
      sx={{ position: ["absolute", "absolute"], top: 0, zIndex: 10 }}
    >
      {darkMode && (
        <Image
          mx={"auto"}
          ml={[20, 20, 0]}
          mt={24}
          src={`/images/icon_${home && light ? "light" : "dark"}mode.svg`}
          sx={{
            position: "absolute",
            cursor: "pointer",
            flexGrow: 0,
            opacity: 0.07,
            flexShrink: 0,
            transition: "0.4s ease-out",
            ":hover": {
              transform: "rotate(+180deg)",
              opacity: 1,
            },
          }}
          onClick={() => setColorMode(light ? "dark" : "light")}
        />
      )}
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        maxWidth="1160px"
        pt="8px"
        flex={1}
      >
        <A href="/">
          <Image
            src={votyLogo}
            alt="voty.ch Logo"
            width="103px"
            height="40px"
            mt="10px"
          />
        </A>
        <Box pt="10px" sx={{ display: ["none", "none", "block", "block"] }}>
          {loaded && (user ? <Account user={user} /> : <RegisterLogin />)}
        </Box>
        <Box pt="10px" sx={{ display: ["block", "block", "none", "none"] }}>
          <MobileBurger user={user} color={burgerColor} />
        </Box>
      </Flex>
    </Flex>
  );
};

const RegisterLogin: React.FC = () => {
  return (
    <Flex alignItems="center">
      <A href="/user/signup">
        <Flex alignItems="center">
          <IconRegister />
          <Text ml={3} mr={4}>
            Klasse anmelden
          </Text>
        </Flex>
      </A>
      <A href="/user/login">
        <Flex alignItems="center">
          <IconLogin />
          <Text ml={3}>Login</Text>
        </Flex>
      </A>
    </Flex>
  );
};

const Account: React.FC<{ user: SessionUser }> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const homeLink = `/${user?.role.toLowerCase()}`;
  const homeText =
    user?.role === Role.Admin
      ? "Admin"
      : `Meine Klasse${user?.role === Role.Teacher ? "n" : ""}`;
  return (
    <Flex>
      <A href={homeLink}>
        <Flex alignItems="center" flexDirection="row" justifyContent="flex-end">
          <IconClasses style={{ marginRight: 8 }} />
          {homeText}
        </Flex>
      </A>
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
              <IconUp src="/images/icon_up.svg" alt="Schliessen" />
            ) : (
              <IconDown alt="Öffnen" />
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
      <Box color="topbarColor">
        <svg width="207px" height="15px" viewBox="-136 0 207 15" version="1.1">
          <path
            d="M2.95999555,15 L23.9609454,1.71229409 C25.7556788,0.648405241 27.974226,0.593219151 29.8196352,1.5665599 L53.9750193,14.3070506 C54.8378628,14.7621479 55.7986582,15 56.7741645,15 L93,15 L-114,15 L-0.0995490542,15 C0.977073975,15 2.03386354,14.7103124 2.95999555,14.1613164 Z"
            fill="currentColor"
          ></path>
        </svg>
      </Box>
      <Box
        bg="topbarColor"
        m={0}
        width="207px"
        p={3}
        sx={{ borderRadius: "card" }}
      >
        <Text lineHeight="35px">
          <A href="/user/profile">Profil bearbeiten</A>
          <br />
          <A href="/user/logout">Abmelden</A>
        </Text>
      </Box>
    </Box>
  );
};

const MobileBurger: React.FC<{ user: SessionUser; color: string }> = ({
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
      <A onClick={() => setOpen(!open)} color={color}>
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
                  <IconCross alt="schliessen" />
                </Box>
              </A>
            </Text>
            <Text pl={4} lineHeight="55px" fontWeight="semi">
              <A href="/">
                <IconHome style={burgerIcon} />
                Startseite
              </A>
              <hr />
              {!user ? (
                <nav>
                  <A href="/user/signup">
                    <IconRegister style={burgerIcon} />
                    Klasse anmelden
                  </A>
                  <br />
                  <A href="/user/login">
                    <IconLogin style={burgerIcon} />
                    Login
                  </A>
                  <br />
                </nav>
              ) : (
                <nav>
                  <A href="/user/login">
                    <IconClasses style={burgerIcon} />
                    {isTeacher ? "Meine Klassen" : "Meine Klasse"}
                  </A>
                  <br />
                  <A href="/user/profile">
                    <IconAccount style={burgerIcon} />
                    Mein Profil
                  </A>
                  <br />
                  <A href="/user/logout">
                    <IconLogout style={burgerIcon} />
                    Abmelden
                  </A>
                  <br />
                </nav>
              )}
              <hr />
              <A href="/newsletter">
                <IconNewsletter style={burgerIcon} />
                Newsletter
              </A>
              <br />
              <A href="/impressum">
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
