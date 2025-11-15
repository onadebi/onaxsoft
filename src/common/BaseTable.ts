import { timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export class BaseTable {
  static CommonFields = {
    created_at: timestamp("created_at")
      .default(sql`now()`)
      .notNull(),
    updated_at: timestamp("updated_at").default(sql`null`),
  };
}
