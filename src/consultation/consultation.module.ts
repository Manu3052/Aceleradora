import { Module } from '@nestjs/common';
import { ConsultationController } from './consultation.controller';
import { ConsultationService } from './consultation.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/infra/prisma.service';
import { ConsultationRepository } from './consultation.repository';

@Module({
  imports: [ConfigModule],
  controllers: [ConsultationController],
  providers: [
    ConsultationService,
    PrismaService,
    {
      provide: ConsultationRepository,
      useClass: ConsultationRepository,
    },
  ],
})
export class ConsultationModule {}
