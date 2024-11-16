import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class Address {
  @Allow()
  @ApiProperty({
    type: String,
    example: '123 Nguyen Dinh Chieu',
  })
  street: string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'P2 Q3',
  })
  secondStreet: string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'Sai Gon',
  })
  city: string;

  @Allow()
  @ApiProperty({
    type: String,
    example: '70000',
  })
  postalCode: string;
}
