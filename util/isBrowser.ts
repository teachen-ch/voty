export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function isProd(): boolean {
  return document?.location.host === "voty.ch";
}

export function isDev(): boolean {
  return document?.location.host !== "voty.ch";
}

export function isLocal(): boolean {
  return document?.location.host.startsWith("localhost");
}

export function isMobile(): boolean {
  return window?.innerWidth < 600;
}

export function isDesktop(): boolean {
  return !isMobile();
}
