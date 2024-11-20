import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientRepository } from './infrastructure/persistence/patient.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Patient } from './domain/patient';

@Injectable()
export class PatientsService {
  constructor(
    // Dependencies here
    private readonly patientRepository: PatientRepository,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const existingPatient = await this.patientRepository.findById(
      createPatientDto.userId,
    );
    if (existingPatient) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: 'userAlreadyExists',
        },
      });
    }
    return this.patientRepository.create(createPatientDto);
  }

  findAllWithPagination({
    paginationOptions,
    search,
  }: {
    paginationOptions: IPaginationOptions;
    search?: string;
  }) {
    return this.patientRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      search,
    });
  }

  findById(id: Patient['id']) {
    return this.patientRepository.findById(id);
  }

  findByIds(ids: Patient['id'][]) {
    return this.patientRepository.findByIds(ids);
  }

  async update(id: Patient['id'], updatePatientDto: UpdatePatientDto) {
    return this.patientRepository.update(id, updatePatientDto);
  }

  remove(id: Patient['id']) {
    return this.patientRepository.remove(id);
  }
}
