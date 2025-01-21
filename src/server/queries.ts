import "server-only";
import { db } from "./db";

import { teams } from "./db/schema";
import { and, eq, sql, asc, desc } from "drizzle-orm";

export async function createTeams(name: string) {
  const team = await db.query.teams.findFirst({
    where: (team, { eq }) => eq(team.name, name),
  });
  if (!team) {
    await db.insert(teams).values({
      name: name,
    });
  }
}

export async function getTeamsForLb() {
  const team_data = await db
    .select({
      id: teams.id,
      rank: sql<number>`rank() over (order by (${teams.round_one} + ${teams.round_two} + ${teams.bounty}) desc)`.mapWith(
        Number,
      ),
      num: sql<number>`row_number() over()`,
      name: sql<string>`CASE 
            WHEN ${teams.bounty} > 0 
            THEN ${teams.name} || ' (+' || ${teams.bounty} || ')'
            ELSE ${teams.name}
        END`,
      domain: teams.domain,
      round_one: teams.round_one,
      round_two: teams.round_two,
      bounty: teams.bounty,
      total:
        sql<number>`(${teams.round_one} + ${teams.round_two} + ${teams.bounty})`.mapWith(
          Number,
        ),
    })
    .from(teams)
    .orderBy(
      desc(
        sql<number>`(${teams.round_one} + ${teams.round_two} + ${teams.bounty})`.mapWith(
          Number,
        ),
      ),
    );
  return team_data;
}
