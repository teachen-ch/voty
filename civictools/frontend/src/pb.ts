import PocketBase from "pocketbase";

export const pb = new PocketBase(
  import.meta.env.VITE_PB_URL || window.location.origin
);

pb.beforeSend = (url, options) => {
  const token = studentSessionToken();
  if (token) {
    options.headers = { ...options.headers, "X-Session-Token": token };
  }
  return { url, options };
};

function studentSessionToken(): string | undefined {
  try {
    const raw = localStorage.getItem("civictools_student");
    const token = raw ? JSON.parse(raw)?.sessionToken : undefined;
    return typeof token === "string" && token ? token : undefined;
  } catch {
    return undefined;
  }
}

export type { RecordModel } from "pocketbase";
