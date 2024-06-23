import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/patient.create.dto';
import { UpdatePatientDto } from './dto/patient.update.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  /**
   * Creates a new patient.
   *
   * @param {CreatePatientDto} createPatientDto - The data to create a new patient.
   * @returns {Promise<ListPatientDto>} The created patient.
   */
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  /**
   * Retrieves all patients.
   *
   * @returns {Promise<ListPatientDto[]>} A list of all patients.
   */
  @Get()
  findAll() {
    return this.patientService.getAll();
  }

  /**
   * Retrieves a patient by ID.
   *
   * @param {number} id - The ID of the patient to retrieve.
   * @returns {Promise<ListPatientDto>} The patient with the given ID.
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.patientService.getById(id);
  }

  /**
   * Updates an existing patient.
   *
   * @param {number} id - The ID of the patient to update.
   * @param {UpdatePatientDto} updatePatientDto - The data to update the patient.
   * @returns {Promise<ListPatientDto>} The updated patient.
   */
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  /**
   * Deletes a patient by ID.
   *
   * @param {number} id - The ID of the patient to delete.
   * @returns {Promise<void>} A promise that resolves when the patient is deleted.
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.patientService.delete(id);
  }
}
