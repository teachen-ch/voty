import { Flex, Text, Link as A, Box } from "rebass";
import Link from "next/link";
import Logo from "../public/images/voty_logo.svg";
import IconRegister from "../public/images/icon_register.svg";
import IconLogin from "../public/images/icon_login.svg";
import IconAccount from "../public/images/icon_account.svg";
import IconUp from "../public/images/icon_up.svg";
import IconDown from "../public/images/icon_down.svg";
import { useUser } from "state/user";
import { useState } from "react";

export const TopBar: React.FC<{ showLogo?: boolean }> = (props) => {
  const user = useUser();
  return (
    <Flex
      bg="#505050"
      height="70px"
      width="100%"
      justifyContent="center"
      color="white"
      fontSize={3}
      sx={{ position: "fixed", top: 0 }}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        maxWidth="1160px"
        flex={1}
      >
        <div>
          {props.showLogo && (
            <Link href="/">
              <A>
                <Logo
                  alt="voty"
                  width="103px"
                  style={{ filter: "brightness(100)", marginTop: 10 }}
                />
              </A>
            </Link>
          )}
        </div>
        {user ? <Account /> : <RegisterLogin />}
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

const Account: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <A onClick={() => setOpen(!open)}>
        <Flex alignItems="center" flexDirection="row">
          <IconAccount />
          <Text mx={3}>Mein Konto</Text>
          {open ? <IconUp /> : <IconDown />}
          {open && <AccountMenu />}
        </Flex>
      </A>
    </>
  );
};

const AccountMenu: React.FC = () => {
  return (
    <Box sx={{ position: "absolute", marginTop: 110, marginLeft: "40px" }}>
      <svg width="207px" height="123px" viewBox="0 0 207 123" version="1.1">
        <title>Rectangle</title>
        <g
          id="Symbols"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="Group-3">
            <path
              d="M6,15.5821083 L113.845972,15.5821083 C114.956927,15.5821083 116.046068,15.2736635 116.992052,14.691138 L137.879389,1.82896487 C139.715599,0.69824895 142.017358,0.639872606 143.908523,1.67605626 L167.941764,14.8440466 C168.825551,15.32828 169.817068,15.5821083 170.824819,15.5821083 L201,15.5821083 C204.313708,15.5821083 207,18.2683998 207,21.5821083 L207,117 C207,120.313708 204.313708,123 201,123 L6,123 C2.6862915,123 -4.82366169e-16,120.313708 0,117 L0,21.5821083 C1.06576994e-15,18.2683998 2.6862915,15.5821083 6,15.5821083 Z"
              id="Rectangle"
              fill="#4F4F4F"
            ></path>
            <text
              id="Profil-bearbeiten-Ab"
              fontSize="22"
              fontWeight="normal"
              fill="#FFFFFF"
            >
              <Link href="/user/profile">
                <tspan x="19" y="58">
                  Profil bearbeiten
                </tspan>
              </Link>
              <Link href="/user/logout">
                <tspan x="19" y="98">
                  Abmelden
                </tspan>
              </Link>
            </text>
          </g>
        </g>
      </svg>
    </Box>
  );
};
