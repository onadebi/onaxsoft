import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The task to be created',
    example: 'Buy groceries',
  })
  task: string;
}
