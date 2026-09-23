import { prisma } from "./prisma";

export const checkDbConnection = async () => {
  try {
    await prisma.$connect();
    return true;
  } catch {
    return false;
  }
};

export { prisma };
export type { Db } from "./prisma";
