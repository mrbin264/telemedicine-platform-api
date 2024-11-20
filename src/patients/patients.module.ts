import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { DocumentPatientPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentPatientPersistenceModule,
    UsersModule,
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService, DocumentPatientPersistenceModule],
})
export class PatientsModule {}
