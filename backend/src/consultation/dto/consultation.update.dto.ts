import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for updating a consultation.
 */
export class UpdateConsultationDto {
  // Private properties representing the consultation attributes

  /**
   * The date of the consultation.
   */
  @ApiProperty({
    description: 'The date of the consultation',
    example: '2023-06-23',
  })
  private _date?: string;

  /**
   * The hour of the consultation.
   */
  @ApiProperty({
    description: 'The hour of the consultation',
    example: '14:00',
  })
  private _hour?: string;

  /**
   * The ID of the patient.
   */
  @ApiProperty({
    description: 'The ID of the patient',
    example: 123,
  })
  private _patientId?: number;

  /**
   * The specialty of the consultation.
   */
  @ApiProperty({
    description: 'The specialty of the consultation',
    example: 'Cardiology',
  })
  private _specialty?: string;

  /**
   * Constructs an instance of UpdateConsultationDto.
   *
   * @param {string} date - The date of the consultation.
   * @param {string} hour - The hour of the consultation.
   * @param {number} patientId - The ID of the patient.
   * @param {string} specialty - The specialty of the consultation.
   */
  constructor(
    date?: string,
    hour?: string,
    patientId?: number,
    specialty?: string,
  ) {
    this._date = date;
    this._hour = hour;
    this._patientId = patientId;
    this._specialty = specialty;
  }

  /**
   * Gets the date of the consultation.
   *
   * @returns {string | undefined} - The date of the consultation.
   */
  public get date(): string | undefined {
    return this._date;
  }

  /**
   * Sets the date of the consultation.
   *
   * @param {string} date - The date of the consultation.
   */
  public set date(date: string | undefined) {
    this._date = date;
  }

  /**
   * Gets the hour of the consultation.
   *
   * @returns {string | undefined} - The hour of the consultation.
   */
  public get hour(): string | undefined {
    return this._hour;
  }

  /**
   * Sets the hour of the consultation.
   *
   * @param {string} hour - The hour of the consultation.
   */
  public set hour(hour: string | undefined) {
    this._hour = hour;
  }

  /**
   * Gets the ID of the patient.
   *
   * @returns {number | undefined} - The ID of the patient.
   */
  public get patientId(): number | undefined {
    return this._patientId;
  }

  /**
   * Sets the ID of the patient.
   *
   * @param {number} patientId - The ID of the patient.
   */
  public set patientId(patientId: number | undefined) {
    this._patientId = patientId;
  }

  /**
   * Gets the specialty of the consultation.
   *
   * @returns {string | undefined} - The specialty of the consultation.
   */
  public get specialty(): string | undefined {
    return this._specialty;
  }

  /**
   * Sets the specialty of the consultation.
   *
   * @param {string} specialty - The specialty of the consultation.
   */
  public set specialty(specialty: string | undefined) {
    this._specialty = specialty;
  }
}
