import { CreateConsultationDto } from '../dto/consultation.create.dto';
import { ListConsultationDto } from '../dto/consultation.list.dto';
import { UpdateConsultationDto } from '../dto/consultation.update.dto';

/**
 * Abstract class representing a Consultation repository.
 */
export abstract class AbstractConsultationRepository {
  /**
   * Maps the Prisma Consultation entity to a ListConsultationDto.
   *
   * @param {any} prismaConsultation - The Consultation object returned from Prisma.
   * @returns {ListConsultationDto} The mapped DTO.
   */
  abstract mapPrismaConsultationToDto(
    prismaConsultation: any,
  ): ListConsultationDto;

  /**
   * Create a new Consultation.
   *
   * @param {CreateConsultationDto} createDto - The data to create the Consultation.
   * @returns {Promise<ListConsultationDto>} A promise that resolves to the created Consultation.
   */
  abstract create(
    createDto: CreateConsultationDto,
  ): Promise<ListConsultationDto>;

  /**
   * Update an existing Consultation.
   *
   * @param {number} id - The ID of the Consultation to update.
   * @param {UpdateConsultationDto} updateDto - The data to update the Consultation.
   * @returns {Promise<ListConsultationDto>} A promise that resolves to the updated Consultation.
   */
  abstract update(
    id: number,
    updateDto: UpdateConsultationDto,
  ): Promise<ListConsultationDto>;

  /**
   * Get a Consultation by its ID.
   *
   * @param {number} id - The ID of the Consultation to retrieve.
   * @returns {Promise<ListConsultationDto>} A promise that resolves to the retrieved Consultation.
   */
  abstract getById(id: number): Promise<ListConsultationDto>;

  /**
   * Get a Consultation by its date and hour.
   *
   * @param {string} date - The date of the Consultation to retrieve.
   * @param {string} hour - The hour of the Consultation to retrieve.
   * @returns {Promise<ListConsultationDto>} A promise that resolves to the retrieved Consultation.
   */
  abstract getByDate(
    date: string,
    hour: string,
  ): Promise<ListConsultationDto[]>;

  /**
   * Get all Consultations.
   *
   * @returns {Promise<ListConsultationDto[]>} A promise that resolves to an array of all Consultations.
   */
  abstract getAll(): Promise<ListConsultationDto[]>;

  /**
   * Delete a Consultation.
   *
   * @param {number} id - The ID of the Consultation to delete.
   * @returns {Promise<void>} A promise that resolves when the Consultation is deleted.
   */
  abstract delete(id: number): Promise<void>;
}
