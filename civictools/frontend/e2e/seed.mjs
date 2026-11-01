import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import PocketBase from "pocketbase";
import {
  superuserEmail,
  superuserPassword,
  teacherEmail,
  teacherPassword,
} from "./credentials.mjs";

export async function seedE2E(baseURL = "http://127.0.0.1:8000") {
  const pb = new PocketBase(baseURL);
  await pb
    .collection("_superusers")
    .authWithPassword(superuserEmail, superuserPassword);

  const data = {
    email: teacherEmail,
    password: teacherPassword,
    passwordConfirm: teacherPassword,
    name: "E2E Teacher",
    verified: true,
  };

  try {
    const existing = await pb
      .collection("users")
      .getFirstListItem(`email = "${teacherEmail}"`);
    await pb.collection("users").update(existing.id, data);
    console.info(`Updated E2E teacher ${teacherEmail}`);
  } catch (error) {
    if (error?.status !== 404) throw error;
    await pb.collection("users").create(data);
    console.info(`Created E2E teacher ${teacherEmail}`);
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  seedE2E(process.env.E2E_PB_URL || process.env.PLAYWRIGHT_BASE_URL).catch(
    (error) => {
      console.error("Failed to seed the CivicTools E2E teacher:", error);
      process.exitCode = 1;
    }
  );
}
