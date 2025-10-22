import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './Task.model';
import { TaskCreationDto } from './dto/TaskCreation.dto';

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
}
