// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
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
    name: varchar("name", { length: 256 }).notNull(), // Add notNull() for required field
    round_one: integer("round_one").default(0), // Add default value
    round_two: integer("round_two").default(0), // Add default value
    bounty: integer("bounty").default(0), // Add default value
    domain: varchar("domain", { length: 256 }).default("None"), // Add notNull() for required field
    created_at: timestamp("created_at").defaultNow(), // Add timestamp for tracking
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
