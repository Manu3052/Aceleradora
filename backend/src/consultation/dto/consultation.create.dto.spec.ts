import { Test, TestingModule } from '@nestjs/testing';
import { CreateConsultationDto } from './consultation.create.dto';
import { IsNotEmpty } from 'class-validator';
import { ValidationMessageEnum } from '../enums/validation.message';

describe('CreateConsultationDto', () => {
  let createConsultationDto: CreateConsultationDto;

  beforeEach(() => {
    createConsultationDto = new CreateConsultationDto(
      '2024-06-25',
      '09:00',
      1,
      'Cardiology',
    );
  });

  it('should be defined', () => {
    expect(createConsultationDto).toBeDefined();
  });

  it('should have a date', () => {
    const datePropertyDescriptor = Object.getOwnPropertyDescriptor(
      CreateConsultationDto.prototype,
      'date',
    );
    expect(datePropertyDescriptor).toBeDefined();
    expect(datePropertyDescriptor!.get).toBeDefined();
    expect(datePropertyDescriptor!.set).toBeDefined();
    expect(
      IsNotEmpty({ message: ValidationMessageEnum.EMPTY_INPUT })(
        createConsultationDto,
        'date',
      ),
    ).toBeUndefined();
  });

  it('should have an hour', () => {
    const hourPropertyDescriptor = Object.getOwnPropertyDescriptor(
      CreateConsultationDto.prototype,
      'hour',
    );
    expect(hourPropertyDescriptor).toBeDefined();
    expect(hourPropertyDescriptor!.get).toBeDefined();
    expect(hourPropertyDescriptor!.set).toBeDefined();
    expect(
      IsNotEmpty({ message: ValidationMessageEnum.EMPTY_INPUT })(
        createConsultationDto,
        'hour',
      ),
    ).toBeUndefined();
  });

  it('should have a patientId', () => {
    const patientIdPropertyDescriptor = Object.getOwnPropertyDescriptor(
      CreateConsultationDto.prototype,
      'patientId',
    );
    expect(patientIdPropertyDescriptor).toBeDefined();
    expect(patientIdPropertyDescriptor!.get).toBeDefined();
    expect(patientIdPropertyDescriptor!.set).toBeDefined();
    expect(
      IsNotEmpty({ message: ValidationMessageEnum.EMPTY_INPUT })(
        createConsultationDto,
        'patientId',
      ),
    ).toBeUndefined();
  });

  it('should have a specialty', () => {
    const specialtyPropertyDescriptor = Object.getOwnPropertyDescriptor(
      CreateConsultationDto.prototype,
      'specialty',
    );
    expect(specialtyPropertyDescriptor).toBeDefined();
    expect(specialtyPropertyDescriptor!.get).toBeDefined();
    expect(specialtyPropertyDescriptor!.set).toBeDefined();
    expect(
      IsNotEmpty({ message: ValidationMessageEnum.EMPTY_INPUT })(
        createConsultationDto,
        'specialty',
      ),
    ).toBeUndefined();
  });
});
