import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidationMessageEnum } from './enums/validation.message';
import { PatientRepository } from './patient.repository';
import { CreatePatientDto } from './dto/patient.create.dto';
import { ListPatientDto } from './dto/patient.list.dto';
import { UpdatePatientDto } from './dto/patient.update.dto';
import { AbstractPatientService } from './interfaces/patient.service.abstract';

@Injectable()
export class PatientService implements AbstractPatientService {
  constructor(private patientRepository: PatientRepository) {}

  /**
   * Converts the given ID to a number.
   *
   * @param {number} id - The ID to be converted.
   * @returns {number} The converted ID as a number.
   */
  formatId(id: number): number {
    const format = Number(id);
    return format;
  }

  /**
   * Creates a new patient in the repository.
   *
   * @param {CreatePatientDto} createPatientDto - The data of the patient to be created.
   * @returns {Promise<ListPatientDto>} A promise that resolves to the created patient data.
   * @throws {BadRequestException} If a patient with the same telephone number already exists.
   */
  async create(createPatientDto: CreatePatientDto): Promise<ListPatientDto> {
    const existingPatient = await this.patientRepository.getByTelephone(
      createPatientDto.telephone,
    );
    if (existingPatient !== null) {
      throw new BadRequestException(
        ValidationMessageEnum.ALREADY_EXISTS_TELEPHONE,
      );
    }

    const patientCreated =
      await this.patientRepository.create(createPatientDto);
    return patientCreated;
  }

  /**
   * Retrieves all patients from the repository.
   *
   * @returns {Promise<ListPatientDto[]>} A promise that resolves to a list of patients.
   * @throws {BadRequestException} If no patients are found.
   */
  async getAll(): Promise<ListPatientDto[]> {
    const patients = await this.patientRepository.getAll();
    if (patients.length === 0) {
      throw new BadRequestException(ValidationMessageEnum.NOT_FOUND);
    }
    return patients;
  }

  /**
   * Retrieves a patient by their ID from the repository.
   *
   * @param {number} id - The ID of the patient to retrieve.
   * @returns {Promise<ListPatientDto>} A promise that resolves to the patient data.
   * @throws {BadRequestException} If the patient with the specified ID is not found.
   */
  async getById(id: number): Promise<ListPatientDto> {
    const idPatient = this.formatId(id);
    const patient = await this.patientRepository.getById(idPatient);
    if (!patient) {
      throw new BadRequestException(ValidationMessageEnum.NOT_FOUND_PATIENT);
    }
    return patient;
  }

  /**
   * Updates the details of an existing patient in the repository.
   *
   * @param {number} id - The ID of the patient to update.
   * @param {UpdatePatientDto} updatePatientDto - The new details of the patient.
   * @returns {Promise<ListPatientDto>} A promise that resolves to the updated patient data.
   */
  async update(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<ListPatientDto> {
    const idPatient = this.formatId(id);
    const patientUpdated = await this.patientRepository.update(
      idPatient,
      updatePatientDto,
    );
    return patientUpdated;
  }

  /**
   * Deletes a patient by their ID from the repository.
   *
   * @param {number} id - The ID of the patient to delete.
   * @returns {Promise<void>} A promise that resolves when the patient is deleted.
   * @throws {BadRequestException} If the patient with the specified ID is not found.
   */
  async delete(id: number): Promise<void> {
    const idPatient = this.formatId(id);
    const patient = await this.patientRepository.getById(idPatient);
    if (!patient) {
      throw new BadRequestException(ValidationMessageEnum.NOT_FOUND_PATIENT);
    }
    await this.patientRepository.delete(idPatient);
  }
}
