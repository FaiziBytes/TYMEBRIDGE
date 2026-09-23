import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { appConfig } from "../config/app.config";

const adapter = new PrismaPg({
  connectionString: appConfig.databaseUrl,
  max: appConfig.db.poolMax,
  idleTimeoutMillis: appConfig.db.idleTimeoutMs,
  connectionTimeoutMillis: appConfig.db.connectionTimeoutMs,
  statement_timeout: appConfig.db.statementTimeoutMs,
  idle_in_transaction_session_timeout: appConfig.db.statementTimeoutMs,
});
const prisma = new PrismaClient({ adapter });

export type Db = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

export { prisma };
