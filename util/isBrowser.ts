export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function isProd(): boolean {
  if (process.env.NEXT_PUBLIC_ENV)
    return process.env.NEXT_PUBLIC_ENV === "production";
  return getHost() === "voty.ch";
}

export function isDev(): boolean {
  return !isProd();
}

export function isLocal(): boolean {
  if (process.env.NEXT_PUBLIC_ENV)
    return process.env.NEXT_PUBLIC_ENV === "local";
  return getHost().startsWith("localhost");
}

export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window?.innerWidth < 600;
}

export function isDesktop(): boolean {
  return !isMobile();
}

export function getHost(): string {
  return typeof document !== "undefined" ? document.location.host : "";
}
