import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientSchemaClass } from '../entities/patient.schema';
import { PatientRepository } from '../../patient.repository';
import { Patient } from '../../../../domain/patient';
import { PatientMapper } from '../mappers/patient.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { UserMapper } from '../../../../../users/infrastructure/persistence/document/mappers/user.mapper';

@Injectable()
export class PatientDocumentRepository implements PatientRepository {
  constructor(
    @InjectModel(PatientSchemaClass.name)
    private readonly patientModel: Model<PatientSchemaClass>,
  ) {}

  async create(data: Patient): Promise<Patient> {
    const persistenceModel = PatientMapper.toPersistence(data);
    const createdAt = new Date();
    persistenceModel.createdAt = createdAt;
    const createdEntity = new this.patientModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return PatientMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
    search,
  }: {
    paginationOptions: IPaginationOptions;
    search?: string;
  }): Promise<Patient[]> {
    const matchStage: any = {};
    if (search) {
      matchStage.$or = [
        { 'userInfo.firstName': { $regex: search, $options: 'i' } },
        { 'userInfo.lastName': { $regex: search, $options: 'i' } },
        { 'userInfo.email': { $regex: search, $options: 'i' } },
      ];
    }

    const pipeline = [
      {
        $lookup: {
          from: 'userschemaclasses',
          localField: 'userId',
          foreignField: '_id',
          as: 'userInfo',
          pipeline: [{ $project: { firstName: 1, lastName: 1, email: 1 } }],
        },
      },
      { $unwind: { path: '$userInfo', preserveNullAndEmptyArrays: true } },
      { $match: matchStage },
      { $skip: (paginationOptions.page - 1) * paginationOptions.limit },
      { $limit: paginationOptions.limit },
    ];

    const entityObjects = await this.patientModel.aggregate(pipeline);

    return entityObjects.map((entityObject) => {
      const patient = PatientMapper.toDomain(entityObject);
      patient.userInfo = entityObject.userInfo
        ? UserMapper.toDomain(entityObject.userInfo)
        : null;
      return patient;
    });
  }

  async findById(id: Patient['id']): Promise<NullableType<Patient>> {
    const entityObject = await this.patientModel.findById(id);
    return entityObject ? PatientMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Patient['id'][]): Promise<Patient[]> {
    const entityObjects = await this.patientModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      PatientMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Patient['id'],
    payload: Partial<Patient>,
  ): Promise<NullableType<Patient>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.patientModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.patientModel.findOneAndUpdate(
      filter,
      PatientMapper.toPersistence({
        ...PatientMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? PatientMapper.toDomain(entityObject) : null;
  }

  async remove(id: Patient['id']): Promise<void> {
    await this.patientModel.deleteOne({ _id: id });
  }
}
