import { Flex, Text, Box } from "rebass";
import { A } from "components/Breadcrumb";
import IconRegister from "../public/images/icon_register.svg";
import IconLogin from "../public/images/icon_login.svg";
import IconAccount from "../public/images/icon_account.svg";
import IconClasses from "../public/images/icon_classes.svg";
import IconDown from "../public/images/icon_down.svg";
import IconUp from "../public/images/icon_up.svg";
import { SessionUser } from "state/user";
import { useState } from "react";
import { Role } from "graphql/types";

export const NavDesktop: React.FC<{ user: SessionUser; loaded: boolean }> = ({
  user,
  loaded,
}) => {
  if (loaded) return user ? <Account user={user} /> : <RegisterLogin />;
  else return null;
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
      <A href={homeLink} variant="link">
        <Flex alignItems="center" flexDirection="row" justifyContent="flex-end">
          <IconClasses style={{ marginRight: 8 }} />
          {homeText}
        </Flex>
      </A>
      <Flex flexDirection="column" width="262px">
        <A onClick={() => setOpen(!open)} variant="link">
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
        color="#fff"
        m={0}
        width="207px"
        p={3}
        sx={{ borderRadius: "card" }}
      >
        <Text lineHeight="35px">
          <A href="/user/profile" variant="link">
            Profil bearbeiten
          </A>
          <br />
          <A href="/user/logout" variant="link">
            Abmelden
          </A>
        </Text>
      </Box>
    </Box>
  );
};