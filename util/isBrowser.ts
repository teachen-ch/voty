export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function isProd(): boolean {
  return (
    process.env.NEXT_PUBLIC_ENV === "production" ||
    process.env.BASE_URL === "https://voty.ch/"
  );
}

export function isDev(): boolean {
  return process.env.NEXT_PUBLIC_ENV !== "production";
}

export function isLocal(): boolean {
  return process.env.NEXT_PUBLIC_ENV === "local";
}

export function isMobile(): boolean {
  return window?.innerWidth < 600;
}

export function isDesktop(): boolean {
  return !isMobile();
}
