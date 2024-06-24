import { ApiProperty } from "@nestjs/swagger";

/**
 * Data Transfer Object (DTO) for listing consultations.
 */
export class ListConsultationDto {
  // Private properties representing the consultation attributes

  /**
   * The ID of the consultation.
   */
  @ApiProperty()
  private _id: number;

  /**
   * The date of the consultation.
   */
  @ApiProperty()
  private _date: string;

  /**
   * The hour of the consultation.
   */
  @ApiProperty()
  private _hour: string;

  /**
   * The ID of the patient.
   */
  @ApiProperty()
  private _patientId: number;

  /**
   * Constructs an instance of ListConsultationDto.
   *
   * @param {number} id - The ID of the consultation.
   * @param {string} date - The date of the consultation.
   * @param {string} hour - The hour of the consultation.
   * @param {number} patientId - The ID of the patient.
   */
  constructor(id: number, date: string, hour: string, patientId: number) {
    this._id = id;
    this._date = date;
    this._hour = hour;
    this._patientId = patientId;
  }

  /**
   * Gets the ID of the consultation.
   *
   * @returns {number} - The ID of the consultation.
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Sets the ID of the consultation.
   *
   * @param {number} id - The ID of the consultation.
   */
  public set id(id: number) {
    this._id = id;
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
}
