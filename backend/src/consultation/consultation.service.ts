import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidationMessageEnum } from './enums/validation.message';
import { ConsultationRepository } from './consultation.repository';
import { CreateConsultationDto } from './dto/consultation.create.dto';
import { ListConsultationDto } from './dto/consultation.list.dto';
import { UpdateConsultationDto } from './dto/consultation.update.dto';
import { AbstractConsultationService } from './interfaces/consultation.service.abstract';

@Injectable()
export class ConsultationService implements AbstractConsultationService {
  constructor(private consultationRepository: ConsultationRepository) {}

  /**
   * Creates a new consultation.
   *
   * @param {CreateConsultationDto} createConsultationDto - Data Transfer Object containing the details of the consultation to be created.
   * @returns {Promise<ListConsultationDto>} A promise that resolves to the created consultation.
   * @throws {BadRequestException} Throws an exception if the telephone number already exists.
   */
  async create(
    createConsultationDto: CreateConsultationDto,
  ): Promise<ListConsultationDto> {
    if (
      !createConsultationDto.date ||
      !createConsultationDto.hour ||
      !createConsultationDto.specialty ||
      !createConsultationDto.patientId
    ) {
      throw new BadRequestException(ValidationMessageEnum.EMPTY_INPUT);
    }
    const existingConsultation = await this.consultationRepository.getByDate(
      createConsultationDto.date,
      createConsultationDto.hour,
    );
    if (existingConsultation != null) {
      throw new BadRequestException(ValidationMessageEnum.ALREADY_CHOSEN_DATA);
    }

    const consultationCreated = await this.consultationRepository.create(
      createConsultationDto,
    );
    return consultationCreated;
  }

  /**
   * Retrieves all consultations.
   *
   * @returns {Promise<ListConsultationDto[]>} A promise that resolves to a list of consultations.
   * @throws {BadRequestException} Throws an exception if no consultations are found.
   */
  async getAll(): Promise<ListConsultationDto[]> {
    const consultations = await this.consultationRepository.getAll();
    if (consultations.length === 0) {
      throw new BadRequestException(ValidationMessageEnum.NOT_FOUND);
    }
    return consultations;
  }
  async getByDate(date: string): Promise<ListConsultationDto[]> {
    const hour = '';
    const consultations = await this.consultationRepository.getByDate(
      date,
      hour,
    );
    if (!consultations) {
      throw new BadRequestException(ValidationMessageEnum.NOT_FOUND);
    }
    return consultations;
  }

  /**
   * Retrieves a consultation by ID.
   *
   * @param {number} id - The ID of the consultation to retrieve.
   * @returns {Promise<ListConsultationDto>} A promise that resolves to the consultation with the given ID.
   * @throws {BadRequestException} Throws an exception if the consultation is not found.
   */
  async getById(id: number): Promise<ListConsultationDto> {
    const consultation = await this.consultationRepository.getById(id);
    if (!consultation) {
      throw new BadRequestException(ValidationMessageEnum.NOT_FOUND);
    }
    return consultation;
  }

  /**
   * Updates an existing consultation.
   *
   * @param {number} id - The ID of the consultation to update.
   * @param {UpdateConsultationDto} updateConsultationDto - Data Transfer Object containing the updated details of the consultation.
   * @returns {Promise<ListConsultationDto>} A promise that resolves to the updated consultation.
   */
  async update(
    id: number,
    updateConsultationDto: UpdateConsultationDto,
  ): Promise<ListConsultationDto> {
    const consultationUpdated = await this.consultationRepository.update(
      id,
      updateConsultationDto,
    );
    return consultationUpdated;
  }

  /**
   * Deletes a consultation by ID.
   *
   * @param {number} id - The ID of the consultation to delete.
   * @returns {Promise<void>} A promise that resolves when the consultation is deleted.
   */
  async delete(id: number): Promise<void> {
    await this.consultationRepository.delete(id);
  }
}
