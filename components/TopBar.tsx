import { Flex, Image, Box } from "components/ui";
import { A } from "components/Breadcrumb";
import { useUser } from "state/user";
import { useState, useEffect, useRef } from "react";
import { useColorMode } from "components/ui";
import { NavMobile } from "./NavMobile";
import { NavDesktop } from "./NavDesktop";
import { useTheme } from "util/hooks";

export const TopBar: React.FC<React.PropsWithChildren<{ home?: boolean }>> = ({ home }) => {
  const user = useUser();
  const [loaded, setLoaded] = useState(false);
  const [colorMode, setColorMode] = useColorMode();
  const light = colorMode === "light";
  const [darkMode, setDarkMode] = useState<string | null>("");
  const burgerColor = home ? "white" : "#fff";
  const aula = useTheme("aula");
  let logo = `/images/voty_logo_${home && light ? "black" : "white"}.svg`;
  if (aula) logo = "/images/logo_aula.png";

  useEffect(() => {
    if (document?.location.hash === "#darkmode") {
      setDarkMode("true");
      if (typeof localStorage !== "undefined")
        localStorage.setItem("darkmode", "true");
    } else if (typeof localStorage !== "undefined") {
      setDarkMode(localStorage.getItem("darkmode"));
    }
  }, []);

  let cancel = useRef<number>();

  useEffect(() => {
    if (user === undefined) {
      cancel.current = window.setTimeout(() => setLoaded(true), 500);
    } else {
      setLoaded(true);
    }
    return () => window.clearTimeout(cancel.current);
  }, [user]);

  return (
    <Flex
      className={`h-[70px] w-full justify-center text-lg px-4 sm:px-16 md:px-0 absolute top-0 z-10 ${home ? "bg-transparent" : "bg-[#505050]"} ${home && light ? "text-black" : "text-white"}`}
    >
      {darkMode && (
        <Image
          src={`/images/icon_${home && light ? "light" : "dark"}mode.svg`}
          className="absolute cursor-pointer opacity-[0.07] transition-all duration-300 hover:rotate-180 hover:opacity-100 ml-5 sm:ml-0 mt-6"
          onClick={() => setColorMode(light ? "dark" : "light")}
          alt={light ? "Darkmode" : "Lightmode"}
        />
      )}
      <Flex
        className="items-start justify-between max-w-[1160px] pt-2 flex-1"
      >
        <A href={aula ? "/aula" : "/"}>
          <Image
            src={logo}
            alt=""
            width={aula ? 50 : 103}
            height={aula ? 50 : 40}
            className="mt-[10px] transition-all duration-300 hover:scale-105"
          />
        </A>
        <Box className="pt-[10px] hidden sm:block">
          <NavDesktop user={user} loaded={loaded} />
        </Box>
        <Box className="pt-[10px] block sm:hidden">
          <NavMobile user={user} color={burgerColor} />
        </Box>
      </Flex>
    </Flex>
  );
};
