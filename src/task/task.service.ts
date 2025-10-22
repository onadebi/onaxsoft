import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { Task } from './Task.model';
import { TaskCreationDto, TaskStatus } from './dto/TaskCreation.dto';

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

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }
}
