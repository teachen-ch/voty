import PocketBase, {
  type RecordModel,
  type RecordSubscription,
} from "pocketbase";

export const pb = new PocketBase(
  import.meta.env.VITE_PB_URL || window.location.origin
);

export function roomHeaders(roomId: string): Record<string, string> {
  return { "X-Room-Id": roomId };
}

const roomPath = /^\/(?:room|s|join)\/([^/?#]+)/;

pb.beforeSend = (url, options) => {
  const token = studentSessionToken();
  if (token) {
    options.headers = { "X-Session-Token": token, ...options.headers };
  }
  const roomId = roomPath.exec(window.location.pathname)?.[1];
  if (roomId) {
    options.headers = { ...roomHeaders(roomId), ...options.headers };
  }
  return { url, options };
};

export function subscribeRoom(
  collection: string,
  roomId: string,
  callback: (e: RecordSubscription<RecordModel>) => void
) {
  return pb
    .collection(collection)
    .subscribe("*", callback, { headers: roomHeaders(roomId) });
}

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
