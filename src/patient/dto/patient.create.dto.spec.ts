import { validate } from 'class-validator';
import { CreatePatientDto } from './patient.create.dto';
import { ValidationMessageEnum } from '../enums/validation.message';

/**
 * Unit tests for CreatePatientDto class.
 */
describe('CreatePatientDto', () => {
  /**
   * Test the constructor and the getter methods.
   */
  it('should create an instance with the correct attributes', () => {
    const dto = new CreatePatientDto('123456789', 'John Doe');

    expect(dto.telephone).toBe('123456789');
    expect(dto.name).toBe('John Doe');
  });

  /**
   * Test the validation for empty telephone.
   */
  it('should validate that telephone is not empty', async () => {
    const dto = new CreatePatientDto('', 'John Doe');
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isNotEmpty).toBe(
      ValidationMessageEnum.EMPTY_INPUT,
    );
  });

  /**
   * Test the validation for empty name.
   */
  it('should validate that name is not empty', async () => {
    const dto = new CreatePatientDto('123456789', '');
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isNotEmpty).toBe(
      ValidationMessageEnum.EMPTY_INPUT,
    );
  });

  /**
   * Test the setter and getter methods for the 'telephone' property.
   */
  it('should set and get the telephone correctly', () => {
    const dto = new CreatePatientDto('123456789', 'John Doe');
    dto.telephone = '987654321';

    expect(dto.telephone).toBe('987654321');
  });

  /**
   * Test the setter and getter methods for the 'name' property.
   */
  it('should set and get the name correctly', () => {
    const dto = new CreatePatientDto('123456789', 'John Doe');
    dto.name = 'Jane Doe';

    expect(dto.name).toBe('Jane Doe');
  });
});
