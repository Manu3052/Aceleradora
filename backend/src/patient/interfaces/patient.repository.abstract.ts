import { CreatePatientDto } from '../dto/patient.create.dto';
import { ListPatientDto } from '../dto/patient.list.dto';
import { UpdatePatientDto } from '../dto/patient.update.dto';

/**
 * Abstract class representing a Patient repository.
 */
export abstract class AbstractPatientRepository {
  /**
   * Maps the Prisma Patient entity to a ListPatientDto.
   *
   * @param {any} prismaPatient - The Patient object returned from Prisma.
   * @returns {ListPatientDto} The mapped DTO.
   */
  abstract mapPrismaPatientToDto(prismaPatient: any): ListPatientDto;

  /**
   * Create a new Patient.
   *
   * @param {CreatePatientDto} createDto - The data to create the Patient.
   * @returns {Promise<ListPatientDto>} A promise that resolves to the created Patient.
   */
  abstract create(createDto: CreatePatientDto): Promise<ListPatientDto>;

  /**
   * Update an existing Patient.
   *
   * @param {number} id - The ID of the Patient to update.
   * @param {UpdatePatientDto} updateDto - The data to update the Patient.
   * @returns {Promise<ListPatientDto>} A promise that resolves to the updated Patient.
   */
  abstract update(
    id: number,
    updateDto: UpdatePatientDto,
  ): Promise<ListPatientDto>;

  /**
   * Get a Patient by its ID.
   *
   * @param {number} id - The ID of the Patient to retrieve.
   * @returns {Promise<ListPatientDto>} A promise that resolves to the retrieved Patient.
   */
  abstract getById(id: number): Promise<ListPatientDto>;

  /**
   * Get a Patient by its telephone.
   *
   * @param {string} telephone - The telephone of the Patient to retrieve.
   * @returns {Promise<ListPatientDto>} A promise that resolves to the retrieved Patient.
   */
  abstract getByTelephone(telephone: string): Promise<ListPatientDto>;

  /**
   * Get all Patients.
   *
   * @returns {Promise<ListPatientDto[]>} A promise that resolves to an array of all Patients.
   */
  abstract getAll(): Promise<ListPatientDto[]>;

  /**
   * Delete a Patient.
   *
   * @param {number} id - The ID of the Patient to delete.
   * @returns {Promise<void>} A promise that resolves when the Patient is deleted.
   */
  abstract delete(id: number): Promise<void>;
}
