import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiTags('Tasks')
@Controller('api/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'List of all tasks' })
  getTasks(): string[] {
    return this.taskService.getTasks();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 200, description: 'Task created successfully' })
  @ApiResponse({ status: 501, description: 'Task creation failed' })
  createTask(@Body() createTaskDto: CreateTaskDto): string {
    this.taskService.createTask(createTaskDto.task);
    return 'Task created';
  }
}
