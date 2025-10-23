import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { Task } from './Task.model';
import { TaskCreationDto, TaskStatus } from './dto/TaskCreation.dto';
import { TasksFilterDto, TaskUpdateDto } from './dto/index.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  createTask(taskDto: TaskCreationDto): Task {
    const task: Task = {
      ...taskDto,
      id: crypto.randomUUID(),
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(taskUpdate: TaskUpdateDto): Task | undefined {
    if (taskUpdate == undefined || taskUpdate?.id === undefined) {
      return undefined;
    }
    const task = this.tasks.find((t) => t.id === taskUpdate.id);
    if (task) {
      task.status =
        taskUpdate.status !== undefined && taskUpdate.status !== null
          ? this.validateTaskStatus(taskUpdate.status)
          : task.status;
      task.title =
        taskUpdate.title !== undefined && taskUpdate.title !== null
          ? taskUpdate.title
          : task.title;
      task.description =
        taskUpdate.description !== undefined && taskUpdate.description !== null
          ? taskUpdate.description
          : task.description;
      Object.assign(task, taskUpdate);
    }
    return task;
  }

  deleteTask(taskId: string): boolean {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
    return this.tasks.find((t) => t.id === taskId) === undefined;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks(filterDto: TasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      const validStatus = this.validateTaskStatus(status);
      tasks = tasks.filter((task) => task.status === validStatus);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) ||
          (task.description && task.description.includes(search)),
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  getAllTaskStatus(): string[] {
    return Object.values(TaskStatus);
  }

  private validateTaskStatus(status: string): TaskStatus {
    if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
      throw new Error(`Invalid task status: ${status}`);
    }
    return status as TaskStatus;
  }
}
