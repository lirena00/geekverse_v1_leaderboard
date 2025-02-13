// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `geekverse_v1_leaderboard_${name}`,
);

export const teams = createTable(
  "team",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    round_one: integer("round_one").default(0),
    round_two: integer("round_two").default(0),
    round_three: integer("round_three").default(0),
    bounty: integer("bounty").default(0),
    domain: varchar("domain", { length: 256 }).default("None"),
    comments: varchar("comments", { length: 256 }).default(""),
    created_at: timestamp("created_at").defaultNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
