import { Patient } from '../../../../domain/patient';
import { PatientSchemaClass } from '../entities/patient.schema';
import { Types } from 'mongoose';

export class PatientMapper {
  public static toDomain(raw: PatientSchemaClass): Patient {
    const domainEntity = new Patient();
    domainEntity.id = raw._id.toString();

    domainEntity.userId = raw.userId.toString();
    domainEntity.age = raw.age;
    domainEntity.gender = raw.gender;
    domainEntity.address = {
      street: raw.address?.street,
      secondStreet: raw.address?.secondStreet,
      city: raw.address?.city,
      postalCode: raw.address?.postalCode,
    };
    domainEntity.contactEmergency = {
      name: raw.contactEmergency?.name,
      phone: raw.contactEmergency?.phone,
      relationship: raw.contactEmergency?.relationship,
    };
    domainEntity.primaryDoctorId = raw.primaryDoctorId
      ? raw.primaryDoctorId.toString()
      : '';
    domainEntity.previousDoctorId = raw.previousDoctorId
      ? raw.previousDoctorId.toString()
      : '';
    domainEntity.medicalConditions = raw.medicalConditions;
    domainEntity.medicationsAllergies = raw.medicationsAllergies;
    domainEntity.medications = raw.medications.map((medication) => ({
      name: medication?.name,
      dosage: medication?.dosage,
      frequency: medication?.frequency,
      startDate: medication?.startDate,
      endDate: medication?.endDate,
    }));
    domainEntity.allergies = raw.allergies;
    domainEntity.preferences = {
      preferredLanguage: raw.preferences?.preferredLanguage,
      preferredContactMethod: raw.preferences?.preferredContactMethod,
      notificationSettings: {
        reminders: raw.preferences?.notificationSettings?.reminders,
        testResults: raw.preferences?.notificationSettings?.testResults,
        promotions: raw.preferences?.notificationSettings?.promotions,
      },
    };
    domainEntity.insurance = raw.insurance;
    domainEntity.insuranceDocument = raw.insuranceDocument;

    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Patient): PatientSchemaClass {
    const persistenceSchema = new PatientSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }

    persistenceSchema.userId = new Types.ObjectId(domainEntity.userId);
    persistenceSchema.age = domainEntity.age;
    persistenceSchema.gender = domainEntity.gender;
    persistenceSchema.address = {
      street: domainEntity.address?.street,
      secondStreet: domainEntity.address?.secondStreet,
      city: domainEntity.address?.city,
      postalCode: domainEntity.address?.postalCode,
    };
    persistenceSchema.contactEmergency = {
      name: domainEntity.contactEmergency?.name,
      phone: domainEntity.contactEmergency?.phone,
      relationship: domainEntity.contactEmergency?.relationship,
    };
    persistenceSchema.primaryDoctorId = domainEntity.primaryDoctorId
      ? new Types.ObjectId(domainEntity.primaryDoctorId)
      : persistenceSchema.primaryDoctorId;
    persistenceSchema.previousDoctorId = domainEntity.previousDoctorId
      ? new Types.ObjectId(domainEntity.previousDoctorId)
      : persistenceSchema.previousDoctorId;
    persistenceSchema.medicalConditions = domainEntity.medicalConditions;
    persistenceSchema.medicationsAllergies = domainEntity.medicationsAllergies;
    persistenceSchema.medications =
      domainEntity.medications?.map((medication) => ({
        name: medication?.name,
        dosage: medication?.dosage,
        frequency: medication?.frequency,
        startDate: medication?.startDate,
        endDate: medication?.endDate,
      })) ?? [];
    persistenceSchema.allergies = domainEntity.allergies;
    persistenceSchema.preferences = {
      preferredLanguage: domainEntity.preferences?.preferredLanguage,
      preferredContactMethod: domainEntity.preferences?.preferredContactMethod,
      notificationSettings: {
        reminders: domainEntity.preferences?.notificationSettings?.reminders,
        testResults:
          domainEntity.preferences?.notificationSettings?.testResults,
        promotions: domainEntity.preferences?.notificationSettings?.promotions,
      },
    };
    persistenceSchema.insurance = domainEntity.insurance;
    persistenceSchema.insuranceDocument = domainEntity.insuranceDocument;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
