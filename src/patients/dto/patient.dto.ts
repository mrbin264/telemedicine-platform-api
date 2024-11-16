import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Address } from '../domain/address';
import { EmergencyContact } from '../domain/emergency-contact';
import { Medication } from '../domain/medication';
import { Preferences } from '../domain/preferences';

export class PatientDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @IsNotEmpty()
  updatedAt: Date;

  @ApiProperty({
    type: String,
    example: '23144512',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    type: Number,
    example: 25,
  })
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    type: String,
    example: 'Male',
    enum: ['Male', 'Female'],
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    type: Address,
  })
  @IsNotEmpty()
  address: Address;

  @ApiProperty({
    type: EmergencyContact,
  })
  @IsNotEmpty()
  contactEmergency: EmergencyContact;

  @ApiProperty({
    type: String,
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  primaryDoctorId: string;

  @ApiProperty({
    type: String,
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsNotEmpty()
  previousDoctorId: string;

  @ApiProperty({
    type: [String],
    example: ['Diabetes', 'Hypertension'],
  })
  @IsNotEmpty()
  medicalConditions: string[];

  @ApiProperty({
    type: [String],
    example: ['Penicillin', 'Sulfa'],
  })
  @IsNotEmpty()
  medicationsAllergies: string[];

  @ApiProperty({
    type: [Medication],
  })
  @IsNotEmpty()
  medications: Medication[];

  @ApiProperty({
    type: [String],
  })
  @IsNotEmpty()
  allergies: string[];

  @ApiProperty({
    type: Preferences,
  })
  @IsNotEmpty()
  preferences: Preferences;

  @ApiProperty({
    type: Boolean,
  })
  @IsNotEmpty()
  insurance: boolean;

  @ApiProperty({
    type: [String],
  })
  @IsNotEmpty()
  insuranceDocument: string[];
}
