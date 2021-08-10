import { serialize, parse, CookieSerializeOptions } from "cookie";
import { NextApiResponse, NextApiRequest } from "next";
import { isBrowser } from "./isBrowser";

/**
 * Set a cookie
 */
export function setCookie(
  res: NextApiResponse,
  name: string,
  value: string | Record<string, any> | undefined,
  options: CookieSerializeOptions = {}
): void {
  const stringValue =
    typeof value === "string" ? value : "j:" + JSON.stringify(value);

  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }
  if (options.path === undefined) {
    options.path = "/";
  }

  // @ts-ignore
  // @eslint-disable-next-line
  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
}

export function getCookie(
  req: NextApiRequest,
  name: string,
  init?: string | Record<string, any> | undefined
): string | Record<string, any> | undefined {
  if (!("cookies" in req)) {
    console.error("NO COOKIES SET!");
    return;
  }
  const str = req.cookies[name];
  if (str === undefined) return init;
  const value = parseObject(str);
  return value;
}

function parseObject(str: string): string | Record<string, any> {
  if (str.startsWith("j:")) {
    return JSON.parse(str.substring(2)) as Record<string, any>;
  } else {
    return str;
  }
}

export function getBrowserCookie(
  name: string
): string | Record<string, any> | undefined {
  if (!isBrowser()) return;
  const cookies = parse(document.cookie);
  if (cookies[name]) return parseObject(cookies[name]);
}

export function setBrowserCookie(
  name: string,
  value: string,
  exp?: number
): void {
  if (!isBrowser()) return;
  const expires = exp ? new Date(Date.now() + exp) : undefined;
  document.cookie = `${name}=${value}; path=/; ${
    expires ? `expires=${expires.toUTCString()}` : ""
  }`;
}
