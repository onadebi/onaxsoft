import { TaskStatus } from "src/task/dto/TaskCreation.dto";
import { SQL, sql } from "drizzle-orm";

export class AppHelpers {
  public static validateTaskStatus(status: string): TaskStatus {
    const statusState = status.toUpperCase();
    if (!Object.values(TaskStatus).includes(statusState as TaskStatus)) {
      throw new Error(`Invalid task status: ${status}`);
    }
    return statusState as TaskStatus;
  }

  public static safeSQL = (expression?: SQL | null): SQL => expression ?? sql``;
}
