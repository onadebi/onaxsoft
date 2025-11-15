import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Task } from "./Task.model";
import {
  TasksFilterDto,
  TaskUpdateDto,
  TaskCreationDto,
} from "./dto/index.dto";
import GenResponse from "src/common/GenResponse";

@ApiTags("Tasks")
@Controller("api/task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: "Get all tasks" })
  @ApiResponse({
    status: 200,
    description: "List of all tasks",
    type: Promise<GenResponse<Task[]>>,
  })
  @ApiQuery({ name: "pagesize", type: Number, required: false })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "search", type: String, required: false })
  @ApiQuery({ name: "status", type: String, required: false })
  getTasks(@Query() filterDto: TasksFilterDto): Promise<GenResponse<Task[]>> {
    return this.taskService.getAllTasks(filterDto);
  }

  @Get("/status-types")
  @ApiOperation({ summary: "Get all tasks status" })
  @ApiResponse({
    status: 200,
    description: "List of all task status options",
    type: [String],
  })
  getTaskStatus(): string[] {
    return this.taskService.getAllTaskStatus();
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get a task by ID" })
  @ApiResponse({
    status: 200 | 404,
    description: "The task with the specified ID",
    type: Promise<GenResponse<Task>>,
  })
  getTaskById(@Param("id") id: string): Promise<GenResponse<Task>> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a new task" })
  @ApiResponse({ type: GenResponse<Task> })
  @ApiResponse({ status: 501, description: "Task creation failed" })
  @ApiBody({
    type: TaskCreationDto,
    description: "Task object that needs to be created",
  })
  createTask(
    @Body() createTaskDto: TaskCreationDto,
  ): Promise<GenResponse<Task>> {
    const newTask = this.taskService.createTask(createTaskDto);
    return newTask;
  }

  @Patch("/:id/status")
  @ApiOperation({ summary: "Update a task by ID" })
  @ApiResponse({
    status: 200,
    description: "Update Task",
    type: Task,
  })
  @ApiResponse({ status: 501, description: "Task creation failed" })
  @ApiBody({
    type: TaskUpdateDto,
    description: "Task object that needs to be updated",
  })
  async updateTask(
    @Param("id") id: string,
    @Body() updateTaskDto: TaskUpdateDto,
  ): Promise<GenResponse<Task>> {
    updateTaskDto.id = id;
    const taskUpdate = await this.taskService.updateTask(updateTaskDto);
    return taskUpdate;
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Delete a task by ID" })
  @ApiResponse({
    status: 200,
    description: "Task deletion",
    type: GenResponse<boolean>,
  })
  @ApiResponse({ status: 501, description: "True | False" })
  async deleteTask(@Param("id") id: string): Promise<GenResponse<boolean>> {
    return await this.taskService.deleteTask(id);
  }
}
