import { ApiProperty, PartialType } from '@nestjs/swagger';
import { TaskCreationDto, TaskStatus } from './TaskCreation.dto';

// Create a partial base DTO class using NestJS PartialType
const PartialTaskCreationDto = PartialType(TaskCreationDto);

// Extend the partial version instead of the original
export class TaskUpdateDto extends PartialTaskCreationDto {
  @ApiProperty({
    description: 'The unique identifier of the task',
    example: '123e4567-e89b-12d3-a456-426614174000',
    writeOnly: true,
    required: false,
    deprecated: true,
  })
  id: string;

  @ApiProperty({
    description: 'The current status of the task',
    enum: TaskStatus,
    example: TaskStatus.OPEN,
  })
  status: TaskStatus;

  // title is now optional
  // You don't need to redeclare it unless you want to customize the swagger documentation
  @ApiProperty({
    description: 'The updated title of the task (optional)',
    required: false,
    example: 'Complete project documentation',
  })
  title?: string;
}
