import imaps from "imap-simple";
import { find } from "lodash";

const config = {
  imap: {
    user: String(process.env.IMAP_USER),
    password: String(process.env.IMAP_PASSWORD),
    host: String(process.env.IMAP_SERVER),
    port: 993,
    tls: true,
    authTimeout: 3000,
  },
};

export type Message = {
  header: Record<string, string | string[]>;
  body: string;
};

export async function fetchMails({
  from,
  since,
}: {
  from?: string;
  since: number;
}): Promise<Message[]> {
  const connection = await imaps.connect(config);
  await connection.openBox("INBOX");
  const searchCriteria = from
    ? [
        ["SINCE", Date.now() - 1000 * since],
        ["FROM", from],
      ]
    : [["SINCE", Date.now() - 1000 * since]];
  const fetchOptions = {
    bodies: ["HEADER", "TEXT"],
  };
  const messages = await connection.search(searchCriteria, fetchOptions);
  const parsed = messages.map((item) => {
    const headerAll = find(item.parts, { which: "HEADER" });
    const textAll = find(item.parts, { which: "TEXT" });
    const header = headerAll?.body as Record<string, string | string[]>;
    const body = String(textAll?.body);
    // const html = Buffer.from(all.body, "base64").toString("ascii");
    return { header, body };
  });
  return parsed;
}
