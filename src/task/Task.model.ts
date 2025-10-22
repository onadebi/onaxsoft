import { ApiProperty } from '@nestjs/swagger';
import { TaskCreationDto, TaskStatus } from './dto/TaskCreation.dto';

export class Task extends TaskCreationDto {
  @ApiProperty({
    description: 'The unique identifier of the task',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The current status of the task',
    enum: TaskStatus,
    example: TaskStatus.OPEN,
  })
  status: TaskStatus;
}
