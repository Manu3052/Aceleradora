/**
 * Data Transfer Object (DTO) for updating a consultation.
 */
export class UpdateConsultationDto {
  // Private properties representing the consultation attributes
  private _id: number;
  private _name: string;
  private _telephone: string;

  /**
   * Constructs an instance of UpdateConsultationDto.
   *
   * @param {number} id - The document identifier for the consultation.
   * @param {string} telephone - The telephone number of the consultation.
   * @param {string} name - The name of the consultation.
   */
  constructor(id: number, telephone: string, name: string) {
    this._id = id;
    this._telephone = telephone;
    this._name = name;
  }

  /**
   * Gets the document identifier for the consultation.
   *
   * @returns {number} - The document identifier.
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Sets the document identifier for the consultation.
   *
   * @param {number} id - The document identifier.
   */
  public set id(id: number) {
    this._id = id;
  }

  /**
   * Gets the telephone number of the consultation.
   *
   * @returns {string} - The telephone number.
   */
  public get telephone(): string {
    return this._telephone;
  }

  /**
   * Sets the telephone number of the consultation.
   *
   * @param {string} telephone - The telephone number.
   */
  public set telephone(telephone: string) {
    this._telephone = telephone;
  }

  /**
   * Gets the name of the consultation.
   *
   * @returns {string} - The name of the consultation.
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Sets the name of the consultation.
   *
   * @param {string} name - The name of the consultation.
   */
  public set name(name: string) {
    this._name = name;
  }
}
