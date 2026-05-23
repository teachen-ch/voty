import PocketBase from "pocketbase";

export const pb = new PocketBase(
  import.meta.env.VITE_PB_URL || window.location.origin
);

export type { RecordModel } from "pocketbase";
