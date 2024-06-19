import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { PatientModule } from './patient/patient.module';
import { ConsultationModule } from './consultation/consultation.module';

@Module({
  imports: [AuthModule, PatientModule, ConsultationModule],
  controllers: [AppController, AuthController, PatientController],
  providers: [AppService, PatientService],
})
export class AppModule {}
