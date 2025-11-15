import { Injectable } from "@nestjs/common";
import { Task } from "./Task.model";
import { TaskCreationDto, TaskStatus } from "./dto/TaskCreation.dto";
import { TasksFilterDto, TaskUpdateDto } from "./dto/index.dto";
import { TaskRepository } from "./repository/TaskRepository";
import GenResponse from "src/common/GenResponse";

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
    return await this.taskRepository.getAllTasksWithFilter(paging);
  }

  async getTaskById(id: string): Promise<GenResponse<Task>> {
    return await this.taskRepository.findTaskById(id);
  }

  getAllTaskStatus(): string[] {
    return Object.values(TaskStatus);
  }
}
