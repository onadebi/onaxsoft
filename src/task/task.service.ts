import { Injectable } from '@nestjs/common';
import { Task } from './Task.model';
import { TaskCreationDto, TaskStatus } from './dto/TaskCreation.dto';
import { TasksFilterDto, TaskUpdateDto } from './dto/index.dto';
import { AppHelpers } from 'src/common/apphelpers';
import { TaskRepository } from './repository/TaskRepository';
import GenResponse from 'src/common/GenResponse';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  private tasks: Task[] = [];

  async createTask(taskDto: TaskCreationDto): Promise<GenResponse<Task>> {
    const task = await this.taskRepository.createTask(taskDto);
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
          ? AppHelpers.validateTaskStatus(taskUpdate.status)
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

  async getAllTasks(): Promise<GenResponse<Task[]>> {
    return await this.taskRepository.getAllTasks();
  }

  async getFilteredTasks(
    filterDto: TasksFilterDto,
  ): Promise<GenResponse<Task[]>> {
    const { status, search } = filterDto;
    const tasks = await this.getAllTasks();

    if (status && tasks.isSuccess && tasks.data) {
      const validStatus = AppHelpers.validateTaskStatus(status);
      tasks.data = tasks.data.filter((task) => task.status === validStatus);
    }

    if (search) {
      tasks.data = tasks.data?.filter(
        (task) =>
          task.title.includes(search) ||
          (task.description && task.description.includes(search)),
      );
    }
    return tasks;
  }

  async getTaskById(id: string): Promise<GenResponse<Task>> {
    return await this.taskRepository.findTaskById(id);
  }

  getAllTaskStatus(): string[] {
    return Object.values(TaskStatus);
  }
}
