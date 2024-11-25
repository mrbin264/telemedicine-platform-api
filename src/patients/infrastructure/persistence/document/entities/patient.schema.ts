import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type PatientSchemaDocument = HydratedDocument<PatientSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class PatientSchemaClass extends EntityDocumentHelper {
  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  userId: Types.ObjectId;

  @Prop({
    type: Number,
  })
  age: number;

  @Prop({
    type: String,
    enum: ['Male', 'Female'],
  })
  gender: string;

  @Prop({
    type: {
      street: String,
      secondStreet: String,
      city: String,
      postalCode: String,
    },
  })
  address: {
    street: string;
    secondStreet: string;
    city: string;
    postalCode: string;
  };

  @Prop({
    type: {
      name: String,
      phone: String,
      relationship: String,
    },
  })
  contactEmergency: {
    name: string;
    phone: string;
    relationship: string;
  };

  @Prop({
    type: Types.ObjectId,
  })
  primaryDoctorId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
  })
  previousDoctorId: Types.ObjectId;

  @Prop({
    type: [String],
  })
  medicalConditions: string[];

  @Prop({
    type: [String],
  })
  medicationsAllergies: string[];

  @Prop({
    type: [
      {
        name: String,
        dosage: String,
        frequency: String,
        startDate: String,
        endDate: String,
      },
    ],
  })
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate: string;
  }[];

  @Prop({
    type: [String],
  })
  allergies: string[];

  @Prop({
    type: {
      preferredLanguage: String,
      preferredContactMethod: {
        type: String,
        enum: ['email', 'sms', 'phone'],
      },
      notificationSettings: {
        reminders: Boolean,
        testResults: Boolean,
        promotions: Boolean,
      },
    },
  })
  preferences: {
    preferredLanguage: string;
    preferredContactMethod: string;
    notificationSettings: {
      reminders: boolean;
      testResults: boolean;
      promotions: boolean;
    };
  };

  @Prop({
    type: Boolean,
  })
  insurance: boolean;

  @Prop({
    type: [String],
  })
  insuranceDocument: string[];

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const PatientSchema = SchemaFactory.createForClass(PatientSchemaClass);
