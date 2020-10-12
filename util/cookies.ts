import { serialize, CookieSerializeOptions } from "cookie";
import { NextApiResponse, NextApiRequest } from "next";

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
  const value = str.startsWith("j:")
    ? (JSON.parse(str.substring(2)) as Record<string, any>)
    : str;
  return value;
}
