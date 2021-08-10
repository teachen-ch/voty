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

/*
 * Next.js provides router.query, but it is not populated immediately
 * If we are sure we are on the client side, we can use this quick hack
 * to have an immediate result of a query-string variable
 */
export function getQueryParam(
  name: string,
  opts?: { sanitize?: true }
): string | undefined {
  if (!isBrowser()) return undefined;
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) == name) {
      const value = decodeURIComponent(pair[1]);
      return opts?.sanitize ? sanitizeParam(value) : value;
    }
  }
}

/**
 * This crude function will replace all characters except letters and digits
 * It's a very simplistic XSS attack prevention for &redirect=javascript:%20+etc.
 *
 * @param value a string to sanitize
 */
function sanitizeParam(value: string): string {
  return value.replace(/[^/\w\d+-_]/g, "");
}

export function ensureSameDomain(url?: string): string | undefined {
  // urls without protocol + host are ok
  if (url?.startsWith("/")) return url;
  const host = getHost();
  if (!host || !url) return undefined;
  if (url.startsWith("https://" + host + "/")) return url;
  if (url.startsWith("http://" + host + "/")) return url;
  return undefined;
}
