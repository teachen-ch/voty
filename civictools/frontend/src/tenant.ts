import votyLogo from "./assets/voty_logo.svg";
import prepodavameLogo from "./assets/prepodavame_logo.svg";
import grajdanskoLogo from "./assets/grajdansko_logo.png";

export interface Tenant {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  logo?: string;
}

const TENANTS: Tenant[] = [
  {
    id: "prepodavame",
    name: "Преподаваме",
    primary: "#053264",
    secondary: "#fafadc",
    logo: prepodavameLogo,
  },
  {
    id: "grajdansko",
    name: "Гражданско",
    primary: "#D93250",
    secondary: "#384CBB",
    logo: grajdanskoLogo,
  },
  {
    id: "voty",
    name: "voty",
    primary: "#386BB5",
    secondary: "#8BB9C0",
    logo: votyLogo,
  },
];

const DEFAULT_TENANT = TENANTS[TENANTS.length - 1];

function detectTenant(): Tenant {
  const host = window.location.hostname;
  return TENANTS.find((t) => host.includes(t.id)) ?? DEFAULT_TENANT;
}

export const tenant = detectTenant();

export function applyTheme(t: Tenant = tenant): void {
  const root = document.documentElement.style;
  root.setProperty("--primary", t.primary);
  root.setProperty("--secondary", t.secondary);
}
