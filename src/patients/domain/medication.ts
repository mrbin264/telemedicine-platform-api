import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class Medication {
  @Allow()
  @ApiProperty({
    type: String,
    example: 'Ibuprofen',
  })
  name: string;

  @Allow()
  @ApiProperty({
    type: String,
    example: '200mg',
  })
  dosage: string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'Twice a day',
  })
  frequency: string;

  @Allow()
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2023-01-01T00:00:00Z',
  })
  startDate: string;

  @Allow()
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2023-01-10T00:00:00Z',
  })
  endDate: string;
}
