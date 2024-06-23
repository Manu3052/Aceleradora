import { CreateConsultationDto } from '../dto/consultation.create.dto';
import { ListConsultationDto } from '../dto/consultation.list.dto';
import { UpdateConsultationDto } from '../dto/consultation.update.dto';

/**
 * Abstract service class for managing consultations.
 */
export abstract class AbstractConsultationService {
  /**
   * Creates a new consultation.
   * @param createDto - Data transfer object containing consultation details for creation.
   */
  abstract create(
    createDto: CreateConsultationDto,
  ): Promise<ListConsultationDto>;

  /**
   * Retrieves all consultations.
   * @returns Promise<ListConsultationDto[]> - A promise that resolves to a list of consultation DTOs.
   */
  abstract getAll(): Promise<ListConsultationDto[]>;

  /**
   * Retrieves a consultation by ID.
   * @param id - The ID of the consultation to retrieve.
   * @returns Promise<ListConsultationDto> - A promise that resolves to the consultation DTO.
   */
  abstract getById(id: number): Promise<ListConsultationDto>;

  /**
   * Retrieves consultations by date.
   * @param date - The date of the consultations to retrieve.
   * @returns Promise<ListConsultationDto[]> - A promise that resolves to a list of consultation DTOs.
   */
  abstract getByDate(date: string): Promise<ListConsultationDto[]>;

  /**
   * Updates an existing consultation.
   * @param id - The ID of the consultation to update.
   * @param updateDto - Data transfer object containing updated consultation details.
   * @returns Promise<ListConsultationDto> - A promise that resolves to the updated consultation DTO.
   */
  abstract update(
    id: number,
    updateDto: UpdateConsultationDto,
  ): Promise<ListConsultationDto>;

  /**
   * Deletes a consultation by ID.
   * @param id - The ID of the consultation to delete.
   * @returns Promise<void> - A promise that resolves when the deletion is complete.
   */
  abstract delete(id: number): Promise<void>;
}
