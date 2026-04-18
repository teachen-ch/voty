import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaSingleton: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismaSingleton = new PrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  prismaSingleton = globalThis.prisma;
}

export default prismaSingleton;
