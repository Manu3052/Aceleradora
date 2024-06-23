import { Injectable } from '@nestjs/common';
import { AbstractPatientRepository } from './interfaces/patient.repository.abstract';
import { CreatePatientDto } from './dto/patient.create.dto';
import { ListPatientDto } from './dto/patient.list.dto';
import { UpdatePatientDto } from './dto/patient.update.dto';
import { PrismaService } from '../infra/prisma.service';

@Injectable()
export class PatientRepository implements AbstractPatientRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new patient in the database.
   *
   * @param {CreatePatientDto} createDto - The DTO containing data to create a new patient.
   * @returns {Promise<ListPatientDto | null>} A promise that resolves to the created patient DTO.
   */
  async create(createDto: CreatePatientDto): Promise<ListPatientDto | null> {
    const patient = await this.prisma.patients.create({
      data: {
        name: createDto.name,
        telephone: createDto.telephone,
      },
    });
    return this.mapPrismaPatientToDto(patient);
  }

  /**
   * Retrieves a patient by telephone.
   *
   * @param {string} telephone - The telephone of the patient.
   * @returns {Promise<ListPatientDto | null>} A promise that resolves to the patient DTO or null if not found.
   */
  async getByTelephone(telephone: string): Promise<ListPatientDto | null> {
    const patient = await this.prisma.patients.findFirst({
      where: {
        telephone: telephone,
      },
    });
    return this.mapPrismaPatientToDto(patient);
  }

  /**
   * Retrieves a patient by ID.
   *
   * @param {number} id - The ID of the patient.
   * @returns {Promise<ListPatientDto | null>} A promise that resolves to the patient DTO or null if not found.
   */
  async getById(id: number): Promise<ListPatientDto | null> {
    const patient = await this.prisma.patients.findFirst({
      where: {
        id: id,
      },
    });
    return this.mapPrismaPatientToDto(patient);
  }

  /**
   * Retrieves all patients from the database.
   *
   * @returns {Promise<ListPatientDto[]>} A promise that resolves to a list of patient DTOs.
   */
  async getAll(): Promise<ListPatientDto[]> {
    const patients = await this.prisma.patients.findMany();
    return patients.map((patient) => this.mapPrismaPatientToDto(patient));
  }

  /**
   * Updates an existing patient.
   *
   * @param {number} id - The ID of the patient to update.
   * @param {UpdatePatientDto} updateDto - The DTO containing updated data.
   * @returns {Promise<ListPatientDto | null>} A promise that resolves to the updated patient DTO or null if not found.
   */
  async update(
    id: number,
    updateDto: UpdatePatientDto,
  ): Promise<ListPatientDto | null> {
    const updatedPatient = await this.prisma.patients.update({
      where: {
        id: id,
      },
      data: {
        name: updateDto.name,
        telephone: updateDto.telephone,
      },
    });
    return this.mapPrismaPatientToDto(updatedPatient);
  }

  /**
   * Deletes a patient by ID.
   *
   * @param {number} idPatient - The ID of the patient to delete.
   * @returns {Promise<void>} A promise that resolves when the patient is deleted.
   */
  async delete(idPatient: number): Promise<void> {
    await this.prisma.patients.delete({
      where: {
        id: idPatient,
      },
    });
  }

  /**
   * Maps the Prisma patient entity to a ListPatientDto.
   *
   * @param {any} prismaPatient - The patient object returned from Prisma.
   * @returns {ListPatientDto | null} The mapped DTO or null if input is null.
   */
  mapPrismaPatientToDto(prismaPatient: any): ListPatientDto | null {
    if (!prismaPatient) {
      return null;
    }
    return new ListPatientDto(
      prismaPatient.id,
      prismaPatient.telephone,
      prismaPatient.name,
    );
  }
}
