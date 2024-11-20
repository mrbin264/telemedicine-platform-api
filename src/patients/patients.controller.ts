import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Patient } from './domain/patient';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllPatientsDto } from './dto/find-all-patients.dto';

@ApiTags('Patients')
@ApiBearerAuth()
@Controller({
  path: 'patients',
  version: '1',
})
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Patient,
  })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: InfinityPaginationResponse(Patient),
  })
  async findAll(
    @Query() query: FindAllPatientsDto,
  ): Promise<InfinityPaginationResponseDto<Patient>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const search = query?.search ?? '';

    return infinityPagination(
      await this.patientsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        search,
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Patient,
  })
  findById(@Param('id') id: string) {
    return this.patientsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Patient,
  })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
