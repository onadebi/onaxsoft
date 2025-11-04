import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './TaskCreation.dto';
import { Pagination } from 'src/common/Pagination.dto';

export class TasksFilterDto extends Pagination {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
