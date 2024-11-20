import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class EmergencyContact {
  @Allow()
  @ApiProperty({
    type: String,
    example: 'Daddy Nguyen',
  })
  name: string;

  @Allow()
  @ApiProperty({
    type: String,
    example: '0123456789',
  })
  phone: string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'Father',
  })
  relationship: string;
}
