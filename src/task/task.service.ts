import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  private tasks: string[] = [];

  createTask(task: string) {
    this.tasks.push(task);
  }

  deleteTask(task: string) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }

  getTasks(): string[] {
    return this.tasks;
  }
}
