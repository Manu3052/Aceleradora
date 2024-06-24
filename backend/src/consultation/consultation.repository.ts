import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/prisma.service';
import { AbstractConsultationRepository } from './interfaces/consultation.repository.abstract';
import { CreateConsultationDto } from './dto/consultation.create.dto';
import { ListConsultationDto } from './dto/consultation.list.dto';
import { UpdateConsultationDto } from './dto/consultation.update.dto';

@Injectable()
export class ConsultationRepository implements AbstractConsultationRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new consultation in the database.
   *
   * @param {CreateConsultationDto} createDto - The DTO containing data to create a new consultation.
   * @returns {Promise<ListConsultationDto | null>} A promise that resolves to the created consultation DTO or null if creation fails.
   */
  async create(
    createDto: CreateConsultationDto,
  ): Promise<ListConsultationDto | null> {
    const consultation = await this.prisma.consultation.create({
      data: {
        patientId: createDto.patientId,
        date: createDto.date,
        hour: createDto.hour,
        specialty: createDto.specialty,
      },
    });
    return this.mapPrismaConsultationToDto(consultation);
  }

  /**
   * Retrieves consultations by date and hour.
   *
   * @param {string} date - The date of the consultation.
   * @param {string} hour - The hour of the consultation.
   * @returns {Promise<ListConsultationDto | null>} A promise that resolves to the consultation DTO or null if not found.
   */
  async getByDate(
    date: string,
    hour: string,
  ): Promise<ListConsultationDto[] | null> {
    const consultations = await this.prisma.consultation.findMany({
      where: {
        date: date,
        hour: hour,
      },
    });
    if (consultations.length === 0) {
      return null;
    }
    return consultations.map((consultation) =>
      this.mapPrismaConsultationToDto(consultation),
    );
  }

  /**
   * Retrieves a consultation by ID.
   *
   * @param {number} id - The ID of the consultation.
   * @returns {Promise<ListConsultationDto | null>} A promise that resolves to the consultation DTO or null if not found.
   */
  async getById(id: number): Promise<ListConsultationDto | null> {
    const consultation = await this.prisma.consultation.findFirst({
      where: {
        id: id,
      },
    });
    return this.mapPrismaConsultationToDto(consultation);
  }

  /**
   * Retrieves all consultations from the database.
   *
   * @returns {Promise<ListConsultationDto[]>} A promise that resolves to a list of consultation DTOs.
   */
  async getAll(): Promise<ListConsultationDto[]> {
    const consultations = await this.prisma.consultation.findMany();
    return consultations.map((consultation) =>
      this.mapPrismaConsultationToDto(consultation),
    );
  }

  /**
   * Updates an existing consultation.
   *
   * @param {number} id - The ID of the consultation to update.
   * @param {UpdateConsultationDto} updateDto - The DTO containing updated data.
   * @returns {Promise<ListConsultationDto | null>} A promise that resolves to the updated consultation DTO or null if not found.
   */
  async update(
    id: number,
    updateDto: UpdateConsultationDto,
  ): Promise<ListConsultationDto | null> {
    const updatedConsultation = await this.prisma.consultation.update({
      where: {
        id: id,
      },
      data: {
        patientId: updateDto.patientId,
        date: updateDto.date,
        hour: updateDto.hour,
        specialty: updateDto.specialty,
      },
    });
    return this.mapPrismaConsultationToDto(updatedConsultation);
  }

  /**
   * Deletes a consultation by ID.
   *
   * @param {number} idConsultation - The ID of the consultation to delete.
   * @returns {Promise<void>} A promise that resolves when the consultation is deleted.
   */
  async delete(idConsultation: number): Promise<void> {
    await this.prisma.consultation.delete({
      where: {
        id: idConsultation,
      },
    });
  }

  /**
   * Maps the Prisma consultation entity to a ListConsultationDto.
   *
   * @param {any} prismaConsultation - The consultation object returned from Prisma.
   * @returns {ListConsultationDto | null} The mapped DTO or null if input is null.
   */
  mapPrismaConsultationToDto(
    prismaConsultation: any,
  ): ListConsultationDto | null {
    if (!prismaConsultation) {
      return null;
    }
    return new ListConsultationDto(
      prismaConsultation.id,
      prismaConsultation.date,
      prismaConsultation.hour,
      prismaConsultation.patientId,
      prismaConsultation.specialty,
    );
  }
}
