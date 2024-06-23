import { IsNotEmpty } from 'class-validator';
import { ValidationMessageEnum } from '../enums/validation.message';
/**
 * Data Transfer Object (DTO) for creating a patient.
 */
export class CreatePatientDto {
  // Private properties representing the patient attributes
  @IsNotEmpty({
    message: ValidationMessageEnum.EMPTY_INPUT,
  })
  private _name: string;
  @IsNotEmpty({
    message: ValidationMessageEnum.EMPTY_INPUT,
  })
  private _telephone: string;

  /**
   * Constructs an instance of CreatePatientDto.
   *
   * @param {string} telephone - The telephone number of the patient.
   * @param {string} name - The name of the patient.
   */
  constructor(telephone: string, name: string) {
    this._telephone = telephone;
    this._name = name;
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
