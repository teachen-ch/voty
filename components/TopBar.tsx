import { Flex, Image, Box } from "rebass";
import { A } from "components/Breadcrumb";
import { useUser } from "state/user";
import { useState, useEffect, useRef } from "react";
import { useColorMode } from "theme-ui";
import { NavMobile } from "./NavMobile";
import { NavDesktop } from "./NavDesktop";

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
  }, []);

  let cancel = useRef(0);

  // Delay showing of the login icons until user is loaded
  useEffect(() => {
    if (user === undefined) {
      cancel.current = setTimeout(() => setLoaded(true), 500);
    } else {
      setLoaded(true);
    }
    return () => clearTimeout(cancel.current);
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
          alt={light ? "Darkmode" : "Lightmode"}
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
            sx={{
              transition: "0.3s ",
              ":hover": {
                transform: "scale(1.05)",
                opacity: 1,
              },
            }}
          />
        </A>
        <Box pt="10px" sx={{ display: ["none", "none", "block", "block"] }}>
          <NavDesktop user={user} loaded={loaded} />
        </Box>
        <Box pt="10px" sx={{ display: ["block", "block", "none", "none"] }}>
          <NavMobile user={user} color={burgerColor} />
        </Box>
      </Flex>
    </Flex>
  );
};
