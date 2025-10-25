import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './TaskCreation.dto';

export class TasksFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
