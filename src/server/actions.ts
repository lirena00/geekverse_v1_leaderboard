"use server";
import { db } from "./db";

import { teams } from "./db/schema";
import { and, eq, sql, asc, desc } from "drizzle-orm";

export async function updateDomain(name: string, domain: string) {
  await db
    .update(teams)
    .set({
      domain: domain,
    })
    .where(eq(teams.name, name));
}

export async function updatePoints(
  name: string,
  pointType: string,
  points: number,
  comments: string,
) {
  await db
    .update(teams)
    .set({
      [pointType]: points,
      comments: sql`${teams.comments} || ' ' || ${pointType} ||  ': '  || ${comments}`,
    })
    .where(eq(teams.name, name));
}
