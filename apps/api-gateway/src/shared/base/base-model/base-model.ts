import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class BaseModel {
  @ApiProperty({
    description: 'uniq resource id',
    example: 'bd572f20-4013-48f7-bb7d-2c50c5ddc973',
  })
  @IsUUID()
  @IsNotEmpty()
  public id: string;
}
