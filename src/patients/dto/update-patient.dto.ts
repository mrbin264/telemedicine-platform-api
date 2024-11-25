// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatePatientDto } from './create-patient.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
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

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @ApiPropertyOptional({
    description: 'The user ID of the patient',
    example: '12345',
    type: String,
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({
    type: Number,
    example: 25,
  })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiPropertyOptional({
    type: String,
    example: 'Male',
    enum: ['Male', 'Female'],
  })
  @IsOptional()
  @IsEnum(['Male', 'Female'])
  gender?: string;

  @ApiPropertyOptional({
    type: Address,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
  address?: Address;

  @ApiPropertyOptional({
    type: EmergencyContact,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => EmergencyContact)
  contactEmergency?: EmergencyContact;

  @ApiPropertyOptional({
    type: String,
    example: '507f1f77bcf86cd799439011',
  })
  @IsOptional()
  @IsString()
  primaryDoctorId?: string;

  @ApiPropertyOptional({
    type: String,
    example: '507f1f77bcf86cd799439012',
  })
  @IsOptional()
  @IsString()
  previousDoctorId?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['Diabetes', 'Hypertension'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  medicalConditions?: string[];

  @ApiPropertyOptional({
    type: [String],
    example: ['Penicillin', 'Sulfa'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  medicationsAllergies?: string[];

  @ApiPropertyOptional({
    type: [Medication],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Medication)
  medications?: Medication[];

  @ApiPropertyOptional({
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allergies?: string[];

  @ApiPropertyOptional({
    type: Preferences,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Preferences)
  preferences?: Preferences;

  @ApiPropertyOptional({
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  insurance?: boolean;

  @ApiPropertyOptional({
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  insuranceDocument?: string[];

  @ApiPropertyOptional({
    type: 'string',
    format: 'date-time',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}
