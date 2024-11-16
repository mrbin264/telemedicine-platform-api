import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema, PatientSchemaClass } from './entities/patient.schema';
import { PatientRepository } from '../patient.repository';
import { PatientDocumentRepository } from './repositories/patient.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PatientSchemaClass.name, schema: PatientSchema },
    ]),
  ],
  providers: [
    {
      provide: PatientRepository,
      useClass: PatientDocumentRepository,
    },
  ],
  exports: [PatientRepository],
})
export class DocumentPatientPersistenceModule {}
