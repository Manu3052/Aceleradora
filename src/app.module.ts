import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { PatientModule } from './patient/patient.module';
import { ConsultationModule } from './consultation/consultation.module';
import { ConfigModule } from '@nestjs/config';
import { ConsultationService } from './consultation/consultation.service';
import { ConsultationRepository } from './consultation/consultation.repository';
import { PatientRepository } from './patient/patient.repository';
import { ConsultationController } from './consultation/consultation.controller';
import { PrismaService } from './infra/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PatientModule,
    ConsultationModule,
  ],
  controllers: [AuthController, PatientController, ConsultationController],
  providers: [
    PrismaService,
    PatientService,
    ConsultationService,
    {
      provide: ConsultationRepository,
      useClass: ConsultationRepository,
    },
    { provide: PatientRepository, useClass: PatientRepository },
  ],
})
export class AppModule {}
