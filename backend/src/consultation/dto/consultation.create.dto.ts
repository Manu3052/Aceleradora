import { IsNotEmpty } from 'class-validator';
import { ValidationMessageEnum } from '../enums/validation.message';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for creating a consultation.
 */
export class CreateConsultationDto {
  /**
   * The date of the consultation.
   */
  @IsNotEmpty({
    message: ValidationMessageEnum.EMPTY_INPUT,
  })
  @ApiProperty()
  private _date: string;

  /**
   * The hour of the consultation.
   */
  @IsNotEmpty({
    message: ValidationMessageEnum.EMPTY_INPUT,
  })
  @ApiProperty()
  private _hour: string;

  /**
   * The ID of the patient.
   */
  @IsNotEmpty({
    message: ValidationMessageEnum.EMPTY_INPUT,
  })
  @ApiProperty()
  private _patientId: number;

  /**
   * The specialty for the consultation.
   */
  @IsNotEmpty({
    message: ValidationMessageEnum.EMPTY_INPUT,
  })
  @ApiProperty()
  private _specialty: string;

  /**
   * Constructs an instance of CreateConsultationDto.
   *
   * @param {string} date - The date of the consultation.
   * @param {string} hour - The hour of the consultation.
   * @param {number} patientId - The ID of the patient.
   * @param {string} specialty - The specialty of the consultation.
   */
  constructor(
    date: string,
    hour: string,
    patientId: number,
    specialty: string,
  ) {
    this._date = date;
    this._hour = hour;
    this._patientId = patientId;
    this._specialty = specialty;
  }

  /**
   * Gets the date of the consultation.
   *
   * @returns {string} - The date of the consultation.
   */
  public get date(): string {
    return this._date;
  }

  /**
   * Sets the date of the consultation.
   *
   * @param {string} date - The date of the consultation.
   */
  public set date(date: string) {
    this._date = date;
  }

  /**
   * Gets the hour of the consultation.
   *
   * @returns {string} - The hour of the consultation.
   */
  public get hour(): string {
    return this._hour;
  }

  /**
   * Sets the hour of the consultation.
   *
   * @param {string} hour - The hour of the consultation.
   */
  public set hour(hour: string) {
    this._hour = hour;
  }

  /**
   * Gets the ID of the patient.
   *
   * @returns {number} - The ID of the patient.
   */
  public get patientId(): number {
    return this._patientId;
  }

  /**
   * Sets the ID of the patient.
   *
   * @param {number} patientId - The ID of the patient.
   */
  public set patientId(patientId: number) {
    this._patientId = patientId;
  }

  /**
   * Gets the specialty of the consultation.
   *
   * @returns {string} - The specialty of the consultation.
   */
  public get specialty(): string {
    return this._specialty;
  }

  /**
   * Sets the specialty of the consultation.
   *
   * @param {string} specialty - The specialty of the consultation.
   */
  public set specialty(specialty: string) {
    this._specialty = specialty;
  }
}
