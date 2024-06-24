import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for updating a patient.
 */
export class UpdatePatientDto {
  // Private properties representing the patient attributes
  @ApiProperty()
  private _id: number;
  @ApiProperty()
  private _name: string;
  @ApiProperty()
  private _telephone: string;

  /**
   * Constructs an instance of UpdatePatientDto.
   *
   * @param {number} id - The document identifier for the patient.
   * @param {string} telephone - The telephone number of the patient.
   * @param {string} name - The name of the patient.
   */
  constructor(id: number, telephone: string, name: string) {
    this._id = id;
    this._telephone = telephone;
    this._name = name;
  }

  /**
   * Gets the document identifier for the patient.
   *
   * @returns {number} - The document identifier.
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Sets the document identifier for the patient.
   *
   * @param {number} id - The document identifier.
   */
  public set id(id: number) {
    this._id = id;
  }

  /**
   * Gets the telephone number of the patient.
   *
   * @returns {string} - The telephone number.
   */
  public get telephone(): string {
    return this._telephone;
  }

  /**
   * Sets the telephone number of the patient.
   *
   * @param {string} telephone - The telephone number.
   */
  public set telephone(telephone: string) {
    this._telephone = telephone;
  }

  /**
   * Gets the name of the patient.
   *
   * @returns {string} - The name of the patient.
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Sets the name of the patient.
   *
   * @param {string} name - The name of the patient.
   */
  public set name(name: string) {
    this._name = name;
  }
}
