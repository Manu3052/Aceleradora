import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { PatientRepository } from './patient.repository';
import { CreatePatientDto } from './dto/patient.create.dto';
import { UpdatePatientDto } from './dto/patient.update.dto';
import { ListPatientDto } from './dto/patient.list.dto';
import { BadRequestException } from '@nestjs/common';
import { ValidationMessageEnum } from './enums/validation.message';

describe('PatientService', () => {
  let service: PatientService;
  let repository: PatientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: PatientRepository,
          useValue: {
            getByTelephone: jest.fn(),
            create: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    repository = module.get<PatientRepository>(PatientRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new patient', async () => {
      const createPatientDto: CreatePatientDto = new CreatePatientDto(
        '123456789',
        'John Doe',
      );
      const result: ListPatientDto = new ListPatientDto(
        1,
        '123456789',
        'John Doe',
      );

      jest.spyOn(repository, 'getByTelephone').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockResolvedValue(result);

      expect(await service.create(createPatientDto)).toBe(result);
    });

    it('should throw an exception if the telephone already exists', async () => {
      const createPatientDto: CreatePatientDto = new CreatePatientDto(
        '123456789',
        'John Doe',
      );
      const existingPatient = new ListPatientDto(1, '123456789', 'John Doe');

      jest
        .spyOn(repository, 'getByTelephone')
        .mockResolvedValue(existingPatient);

      await expect(service.create(createPatientDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.create(createPatientDto)).rejects.toThrowError(
        ValidationMessageEnum.ALREADY_EXISTS_TELEPHONE,
      );
    });
  });

  describe('getAll', () => {
    it('should return an array of patients', async () => {
      const result: ListPatientDto[] = [
        new ListPatientDto(1, '123456789', 'John Doe'),
      ];

      jest.spyOn(repository, 'getAll').mockResolvedValue(result);

      expect(await service.getAll()).toBe(result);
    });

    it('should throw an exception if no patients are found', async () => {
      jest.spyOn(repository, 'getAll').mockResolvedValue([]);

      await expect(service.getAll()).rejects.toThrow(BadRequestException);
      await expect(service.getAll()).rejects.toThrowError(
        ValidationMessageEnum.NOT_FOUND,
      );
    });
  });

  describe('getById', () => {
    it('should return a single patient', async () => {
      const result: ListPatientDto = new ListPatientDto(
        1,
        '123456789',
        'John Doe',
      );

      jest.spyOn(repository, 'getById').mockResolvedValue(result);

      expect(await service.getById(1)).toBe(result);
    });

    it('should throw an exception if the patient is not found', async () => {
      jest.spyOn(repository, 'getById').mockResolvedValue(null);

      await expect(service.getById(1)).rejects.toThrow(BadRequestException);
      await expect(service.getById(1)).rejects.toThrowError(
        ValidationMessageEnum.NOT_FOUND,
      );
    });
  });

  describe('update', () => {
    it('should update a patient', async () => {
      const updatePatientDto: UpdatePatientDto = new UpdatePatientDto(
        1,
        '987654321',
        'Jane Doe',
      );
      const result: ListPatientDto = new ListPatientDto(
        1,
        '987654321',
        'Jane Doe',
      );

      jest.spyOn(repository, 'update').mockResolvedValue(result);

      expect(await service.update(1, updatePatientDto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should remove a patient', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue();

      expect(await service.delete(1)).toBeUndefined();
    });
  });
});
