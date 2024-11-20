import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDate,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Address } from '../domain/address';
import { EmergencyContact } from '../domain/emergency-contact';
import { Preferences } from '../domain/preferences';
import { Medication } from '../domain/medication';

export class CreatePatientDto {
  @ApiProperty({
    description: 'The user ID of the doctor',
    example: '12345',
    type: String,
  })
  @IsString()
  userId: string;

  @ApiProperty({
    type: Number,
    example: 25,
  })
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty({
    type: String,
    example: 'Male',
    enum: ['Male', 'Female'],
  })
  @IsEnum(['Male', 'Female'])
  @IsOptional()
  gender: string;

  @ApiProperty({
    type: Address,
  })
  @ValidateNested()
  @Type(() => Address)
  @IsOptional()
  address: Address;

  @ApiProperty({
    type: EmergencyContact,
  })
  @ValidateNested()
  @Type(() => EmergencyContact)
  @IsOptional()
  contactEmergency: EmergencyContact;

  @ApiProperty({
    type: String,
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  primaryDoctorId: string;

  @ApiProperty({
    type: String,
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsOptional()
  previousDoctorId: string;

  @ApiProperty({
    type: [String],
    example: ['Diabetes', 'Hypertension'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  medicalConditions: string[];

  @ApiProperty({
    type: [String],
    example: ['Penicillin', 'Sulfa'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  medicationsAllergies: string[];

  @ApiProperty({
    type: [Medication],
  })
  @ValidateNested({ each: true })
  @Type(() => Medication)
  @IsOptional()
  medications: Medication[];

  @ApiProperty({
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  allergies: string[];

  @ApiProperty({
    type: Preferences,
  })
  @ValidateNested()
  @Type(() => Preferences)
  @IsOptional()
  preferences: Preferences;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  insurance: boolean;

  @ApiProperty({
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  insuranceDocument: string[];

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  updatedAt: Date;
}
