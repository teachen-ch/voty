import { Flex, Text, Box } from "components/ui";
import { A } from "components/Breadcrumb";
import Image from "next/image";
import IconRegister from "../public/images/icon_register_b.svg";
import IconLogin from "../public/images/icon_login_b.svg";
import IconAccount from "../public/images/icon_account_b.svg";
import IconClasses from "../public/images/icon_classes_b.svg";
import IconDown from "../public/images/icon_down.svg";
import IconUp from "../public/images/icon_up.svg";
import { SessionUser } from "state/user";
import { useState } from "react";
import { Role } from "graphql/types";

export const NavDesktop: React.FC<
  React.PropsWithChildren<{ user: SessionUser; loaded: boolean }>
> = ({ user, loaded }) => {
  if (loaded) return user ? <Account user={user} /> : <RegisterLogin />;
  else return null;
};

const RegisterLogin: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Flex className="items-center gap-8">
      <A href="/user/signup">
        <Flex className="items-center gap-2">
          <Image src={IconRegister} alt="" />
          <Text as="span">Klasse anmelden</Text>
        </Flex>
      </A>
      <A href="/user/login">
        <Flex className="items-center gap-2">
          <Image src={IconLogin} alt="" />
          <Text as="span">Login</Text>
        </Flex>
      </A>
    </Flex>
  );
};

const Account: React.FC<React.PropsWithChildren<{ user: SessionUser }>> = ({
  user,
}) => {
  const [open, setOpen] = useState(false);
  const homeLink = `/${user?.role.toLowerCase()}`;
  let homeText = "";
  switch (user?.role) {
    case Role.Admin:
      homeText = "Admin";
      break;
    case Role.Teacher:
      homeText = "Meine Klassen";
      break;
    case Role.Student:
      if (user?.team) homeText = "Meine Klasse";
      break;
  }
  return (
    <Flex>
      {homeText && (
        <A href={homeLink}>
          <Flex className="items-center flex-row justify-end">
            <Box className="inline-block mr-2">
              <Image src={IconClasses} alt="" />
            </Box>
            {homeText}
          </Flex>
        </A>
      )}
      <Flex className="flex-col w-66">
        <A onClick={() => setOpen(!open)}>
          <Flex className="items-center flex-row justify-end">
            <Image src={IconAccount} alt="" />
            <Text className="mx-2">Mein Konto</Text>
            {open ? (
              <Image src={IconUp} alt="Schliessen" />
            ) : (
              <Image src={IconDown} alt="Öffnen" />
            )}
          </Flex>
        </A>
        {open && <AccountMenu />}
      </Flex>
    </Flex>
  );
};

const AccountMenu: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Box className="w-[207px] mt-[22px] ml-[85px] leading-4">
      <Box className="text-[#505050]">
        <svg width={207} height={15} viewBox="-136 0 207 15" version="1.1">
          <path
            d="M2.95999555,15 L23.9609454,1.71229409 C25.7556788,0.648405241 27.974226,0.593219151 29.8196352,1.5665599 L53.9750193,14.3070506 C54.8378628,14.7621479 55.7986582,15 56.7741645,15 L93,15 L-114,15 L-0.0995490542,15 C0.977073975,15 2.03386354,14.7103124 2.95999555,14.1613164 Z"
            fill="currentColor"
          ></path>
        </svg>
      </Box>
      <Box className="bg-[#505050] text-white m-0 w-[207px] p-4 rounded-card">
        <Text className="leading-[35px]">
          <A href="/user/profile">Profil bearbeiten</A>
          <br />
          <A href="/user/logout">Abmelden</A>
        </Text>
      </Box>
    </Box>
  );
};
