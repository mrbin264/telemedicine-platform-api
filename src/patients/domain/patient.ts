import { ApiProperty } from '@nestjs/swagger';
import { Address } from './address';
import { EmergencyContact } from './emergency-contact';
import { Preferences } from './preferences';
import { Medication } from './medication';
import { User } from '../../users/domain/user';

export class Patient {
  @ApiProperty({
    type: String,
    example: '1234567890',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: '23144512',
  })
  userId: string;

  @ApiProperty({
    type: User,
    required: false,
  })
  userInfo?: User;

  @ApiProperty({
    type: Number,
    example: 25,
  })
  age: number;

  @ApiProperty({
    type: String,
    example: 'Male',
    enum: ['Male', 'Female'],
  })
  gender: string;

  @ApiProperty({
    type: Address,
  })
  address: Address;

  @ApiProperty({
    type: EmergencyContact,
  })
  contactEmergency: EmergencyContact;

  @ApiProperty({
    type: String,
    example: '507f1f77bcf86cd799439011',
  })
  primaryDoctorId: string;

  @ApiProperty({
    type: String,
    example: '507f1f77bcf86cd799439012',
  })
  previousDoctorId: string;

  @ApiProperty({
    type: [String],
    example: ['Diabetes', 'Hypertension'],
  })
  medicalConditions: string[];

  @ApiProperty({
    type: [String],
    example: ['Penicillin', 'Sulfa'],
  })
  medicationsAllergies: string[];

  @ApiProperty({
    type: () => [Medication],
  })
  medications: Medication[];

  @ApiProperty({
    type: [String],
  })
  allergies: string[];

  @ApiProperty({
    type: () => Preferences,
  })
  preferences: Preferences;

  @ApiProperty({
    type: Boolean,
  })
  insurance: boolean;

  @ApiProperty({
    type: [String],
  })
  insuranceDocument: string[];

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
}
