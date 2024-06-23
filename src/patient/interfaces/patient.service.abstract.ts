import { CreatePatientDto } from '../dto/patient.create.dto';
import { ListPatientDto } from '../dto/patient.list.dto';
import { UpdatePatientDto } from '../dto/patient.update.dto';

/**
 * Abstract service class for managing patients.
 */
export abstract class AbstractPatientService {
  /**
   * Creates a new patient.
   * @param createDtoPatient - Data transfer object containing patient details for creation.
   */
  abstract create(createDtoPatient: CreatePatientDto);

  /**
   * Retrieves all patients.
   * @returns Promise<ListPatientDto[]> - A promise that resolves to a list of patient DTOs.
   */
  abstract getAll(): Promise<ListPatientDto[]>;

  /**
   * Retrieves a patient by ID.
   * @param id - The ID of the patient to retrieve.
   * @returns Promise<ListPatientDto> - A promise that resolves to the patient DTO.
   */
  abstract getById(id: number): Promise<ListPatientDto>;

  /**
   * Updates an existing patient.
   * @param id - The ID of the patient to update.
   * @param updatePatientDto - Data transfer object containing updated patient details.
   * @returns Promise<ListPatientDto> - A promise that resolves to the updated patient DTO.
   */
  abstract update(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<ListPatientDto>;

  /**
   * Deletes a patient by ID.
   * @param id - The ID of the patient to delete.
   * @returns Promise<void> - A promise that resolves when the deletion is complete.
   */
  abstract delete(id: number): Promise<void>;
}
