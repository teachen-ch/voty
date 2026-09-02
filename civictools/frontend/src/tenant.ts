import votyLogo from "./assets/voty_logo.svg";
import prepodavameLogo from "./assets/prepodavame_logo.png";
import grajdanskoLogo from "./assets/grajdansko_logo.png";

export interface Tenant {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  locale: "en" | "bg";
  logo?: string;
}

const TENANTS: Tenant[] = [
  {
    id: "prepodavame",
    name: "Преподаваме",
    primary: "#053264",
    secondary: "#fafadc",
    locale: "bg",
    logo: prepodavameLogo,
  },
  {
    id: "grajdansko",
    name: "Гражданско",
    primary: "#D93250",
    secondary: "#384CBB",
    locale: "bg",
    logo: grajdanskoLogo,
  },
  {
    id: "voty",
    name: "voty",
    primary: "#386BB5",
    secondary: "#8BB9C0",
    locale: "en",
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
