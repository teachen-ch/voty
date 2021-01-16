import { PrismaClient } from "@prisma/client";
import yaml from "js-yaml";
import fs from "fs";

const prisma = new PrismaClient();

export async function loadFixture(
  fixtureFile: string,
  logger?: (msg: string) => void
): Promise<void> {
  logger && logger(`📦 Loading data from ${fixtureFile}`);
  const data = parseYAML(fixtureFile);
  if (typeof data !== "object") {
    throw new Error("malformed YAML");
  }
  if (typeof data === "undefined") {
    throw new Error(`Could not parse YAML file ${fixtureFile}`);
  }
  if (typeof data !== "object") {
    throw new Error(
      "Please specify YAML file as an object, e.g. no '- xyz' on top-level."
    );
  }
  if (Object.prototype.hasOwnProperty.call(data, "delete")) {
    // @ts-ignore
    await deleteObjects(data.delete, logger);
    // @ts-ignore
    delete data.delete;
  }
  await createObjects(data, logger);
  logger && logger("");
}

function parseYAML(filename: string) {
  const contents = fs.readFileSync(filename, "utf8");
  const data = yaml.safeLoad(contents);
  return data;
}

async function deleteObjects(list: string[], logger?: (msg: string) => void) {
  logger && logger("💥 Let's first wipe out existing objects:");
  for (let i = 0; i < list.length; ++i) {
    const type = list[i];
    // @ts-ignore  what's the type for generic PrismaDelegates?
    // eslint-disable-next-line
    const obj: any = prisma[type];
    if (!obj) {
      throw new Error(`Type «${type}» does not exist in your prisma schema.`);
    }
    // eslint-disable-next-line
    const result = await obj.deleteMany();
    logger && logger(`  ... deleted ${result.count} objects of type «${type}»`);
  }
}

async function createObjects(data: any, logger?: (msg: string) => void) {
  logger && logger("🐣 Let's create new objects:");
  for (const type in data) {
    // @ts-ignore  what's the type for generic PrismaDelegates?
    // eslint-disable-next-line
    const obj: any = prisma[type];
    if (!obj)
      throw new Error(`Type «${type}» does not exist in your prisma schema.`);
    // eslint-disable-next-line
    const list = data[type];

    let count = 0;
    for (const i in list) {
      // eslint-disable-next-line
      const spec = list[i]; // eslint-disable-next-line
      const result = await obj.create({ data: spec });
      if (result) count++;
    }
    logger &&
      logger(
        `  ... created ${count} objects of type «${type}» in db and uncounted linked types`
      );
  }
}
