import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { TaskStatus } from "../dto/TaskCreation.dto";
import { index } from "drizzle-orm/pg-core";

//Convert the TaskStatus enum object into an array of its string values.
const statusValues = Object.values(TaskStatus) as [string, ...string[]];
export const taskStatusEnum = pgEnum("task_status", statusValues);

export const TaskEntity = pgTable(
  "tasks",
  {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 1000 }),
    status: varchar({ length: 20 }).notNull().default(TaskStatus.OPEN),
  },
  (table) => [index("idx_task_title").on(table.title)],
);
