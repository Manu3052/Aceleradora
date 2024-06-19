import { Injectable } from '@nestjs/common';
import { AbstractConsultationRepository } from './interfaces/consultation.repository.abstract';
import { CreateConsultationDto } from './dto/consultation.create.dto';
import { ListConsultationDto } from './dto/consultation.list.dto';
import { UpdateConsultationDto } from './dto/consultation.update.dto';
import { PrismaService } from '../infra/prisma.service';

@Injectable()
export class ConsultationRepository implements AbstractConsultationRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new consultation in the database.
   *
   * @param {CreateConsultationDto} createDto - The DTO containing data to create a new consultation.
   * @returns {Promise<ListConsultationDto | null>} A promise that resolves to the created consultation DTO.
   */
  async create(
    createDto: CreateConsultationDto,
  ): Promise<ListConsultationDto | null> {
    const consultation = await this.prisma.consultation.create({
      data: {
        name: createDto.name,
        telephone: createDto.telephone,
      },
    });
    return this.mapPrismaConsultationToDto(consultation);
  }

  /**
   * Retrieves an consultation by email.
   *
   * @param {string} email - The email of the consultation.
   * @returns {Promise<ListConsultationDto | null>} A promise that resolves to the consultation DTO or null if not found.
   */
  async getByEmail(email: string): Promise<ListConsultationDto | null> {
    const consultation = await this.prisma.consultation.findFirst({
      where: {
        email: email,
      },
    });
    return this.mapPrismaConsultationToDto(consultation);
  }

  /**
   * Retrieves an consultation by ID.
   *
   * @param {string} id - The ID of the consultation.
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
   * @param {string} id - The ID of the consultation to update.
   * @param {UpdateConsultationDto} updateDto - The DTO containing updated data.
   * @returns {Promise<ListConsultationDto | null>} A promise that resolves to the updated consultation DTO or null if not found.
   */
  async update(
    id: number,
    updateDto: UpdateConsultationDto,
  ): Promise<ListConsultationDto | null> {
    const updatedconsultation = await this.prisma.consultation.update({
      where: {
        id: id,
      },
      data: {
        name: updateDto.name,
        telephone: updateDto.telephone,
      },
    });
    return this.mapPrismaConsultationToDto(updatedconsultation);
  }

  /**
   * Deletes an consultation by ID.
   *
   * @param {string} idconsultation - The ID of the consultation to delete.
   * @returns {Promise<void>} A promise that resolves when the consultation is deleted.
   */
  async delete(idconsultation: number): Promise<void> {
    await this.prisma.consultation.delete({
      where: {
        id: idconsultation,
      },
    });
  }

  /**
   * Maps the Prisma consultation entity to a ListConsultationDto.
   *
   * @param {any} prismaconsultation - The consultation object returned from Prisma.
   * @returns {ListConsultationDto | null} The mapped DTO or null if input is null.
   */
  mapPrismaConsultationToDto(
    prismaconsultation: any,
  ): ListConsultationDto | null {
    if (!prismaconsultation) {
      return null;
    }
    return new ListConsultationDto(
      prismaconsultation.id,
      prismaconsultation.telephone,
      prismaconsultation.name,
    );
  }
}
