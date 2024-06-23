import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from 'src/patient/patient.controller';
import { PatientRepository } from './patient.repository';
import { PrismaService } from 'src/infra/prisma.service';

@Module({
  providers: [PatientService, PatientRepository, PrismaService],
  controllers: [PatientController],
})
export class PatientModule {}