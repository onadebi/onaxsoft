import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './Task.model';
import { TaskCreationDto } from './dto/TaskCreation.dto';
import { TaskUpdateDto } from './dto/TaskUpdate.dto';

@ApiTags('Tasks')
@Controller('api/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of all tasks',
    type: [Task],
  })
  getTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('/status-types')
  @ApiOperation({ summary: 'Get all tasks status' })
  @ApiResponse({
    status: 200,
    description: 'List of all task status options',
    type: [String],
  })
  getTaskStatus(): string[] {
    return this.taskService.getAllTaskStatus();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'The task with the specified ID',
    type: Task,
  })
  getTaskById(@Param('id') id: string): Task | undefined {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 200,
    description: 'Task created successfully',
    type: Task,
  })
  @ApiResponse({ status: 501, description: 'Task creation failed' })
  @ApiBody({
    type: TaskCreationDto,
    description: 'Task object that needs to be created',
  })
  createTask(@Body() createTaskDto: TaskCreationDto): Task {
    const newTask = this.taskService.createTask(createTaskDto);
    return newTask;
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Update Task',
    type: Task,
  })
  @ApiResponse({ status: 501, description: 'Task creation failed' })
  @ApiBody({
    type: TaskUpdateDto,
    description: 'Task object that needs to be updated',
  })
  updateTask(@Body() updateTaskDto: TaskUpdateDto): Task | undefined {
    const newTask = this.taskService.updateTask(updateTaskDto);
    return newTask;
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Task deletion',
    type: Boolean,
  })
  @ApiResponse({ status: 501, description: 'True | False' })
  deleteTask(@Param('id') id: string): boolean {
    return this.taskService.deleteTask(id);
  }
}
