import { Module } from '@nestjs/common';
import { PatientController } from 'src/patient/patient.controller';
import { PrismaService } from 'src/infra/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PatientService } from './patient.service';
import { PatientRepository } from './patient.repository';

@Module({
  imports: [ConfigModule],
  controllers: [PatientController],
  providers: [
    PatientService,
    PrismaService,
    {
      provide: PatientRepository,
      useClass: PatientRepository,
    },
  ],
})
export class PatientModule {}
