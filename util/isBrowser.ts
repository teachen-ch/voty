export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function isProd(): boolean {
  return process.env.NEXT_PUBLIC_ENV === "production";
}

export function isDev(): boolean {
  return process.env.NEXT_PUBLIC_ENV !== "production";
}

export function isLocal(): boolean {
  return process.env.NEXT_PUBLIC_ENV === "local";
}
