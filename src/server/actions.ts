"use server";
import { db } from "./db";

import { teams } from "./db/schema";
import { and, eq, sql, asc, desc } from "drizzle-orm";

export default async function updateDomain(name: string, domain: string) {
  await db
    .update(teams)
    .set({
      domain: domain,
    })
    .where(eq(teams.name, name));
}
