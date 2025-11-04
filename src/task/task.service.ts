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

  async createTask(taskDto: TaskCreationDto): Promise<GenResponse<Task>> {
    const task = await this.taskRepository.createTask(taskDto);
    return task;
  }

  updateTask(taskUpdate: TaskUpdateDto): Promise<GenResponse<Task>> {
    return this.taskRepository.updateTask(taskUpdate);
  }

  deleteTask(taskId: string): Promise<GenResponse<boolean>> {
    return this.taskRepository.deleteTask(taskId);
  }

  async getAllTasks(paging?: TasksFilterDto): Promise<GenResponse<Task[]>> {
    return await this.taskRepository.getAllTasks(paging);
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
