import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/consultation.create.dto';
import { UpdateConsultationDto } from './dto/consultation.update.dto';

@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  /**
   * Creates a new consultation.
   *
   * @param {CreateConsultationDto} createConsultationDto - The data to create a new consultation.
   * @returns {Promise<ListConsultationDto>} The created consultation.
   */
  @Post()
  create(@Body() createConsultationDto: CreateConsultationDto) {
    return this.consultationService.create(createConsultationDto);
  }

  /**
   * Retrieves all consultations.
   *
   * @returns {Promise<ListConsultationDto[]>} A list of all consultations.
   */
  @Get()
  findAll() {
    return this.consultationService.getAll();
  }

  /**
   * Retrieves consultations by date.
   *
   * @param {string} date - The date of the consultations to retrieve.
   * @returns {Promise<ListConsultationDto[]>} A list of consultations on the specified date.
   */
  @Get(':date')
  findByDate(@Param('date') date: string) {
    return this.consultationService.getByDate(date);
  }

  /**
   * Retrieves a consultation by ID.
   *
   * @param {number} id - The ID of the consultation to retrieve.
   * @returns {Promise<ListConsultationDto>} The consultation with the given ID.
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.consultationService.getById(id);
  }

  /**
   * Updates an existing consultation.
   *
   * @param {number} id - The ID of the consultation to update.
   * @param {UpdateConsultationDto} updateConsultationDto - The data to update the consultation.
   * @returns {Promise<ListConsultationDto>} The updated consultation.
   */
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ) {
    return this.consultationService.update(id, updateConsultationDto);
  }

  /**
   * Deletes a consultation by ID.
   *
   * @param {number} id - The ID of the consultation to delete.
   * @returns {Promise<void>} A promise that resolves when the consultation is deleted.
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.consultationService.delete(id);
  }
}
