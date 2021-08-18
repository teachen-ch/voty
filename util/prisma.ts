import { PrismaClient } from "@prisma/client";

let prismaSingleton: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismaSingleton = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prismaSingleton = global.prisma as PrismaClient;
}

export default prismaSingleton;
