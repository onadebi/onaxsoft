import { TaskStatus } from 'src/task/dto/TaskCreation.dto';

export class AppHelpers {
  public static validateTaskStatus(status: string): TaskStatus {
    if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
      throw new Error(`Invalid task status: ${status}`);
    }
    return status as TaskStatus;
  }
}
