import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../infra/prisma.service';
import { PatientRepository } from './patient.repository';
import { CreatePatientDto } from './dto/patient.create.dto';
import { UpdatePatientDto } from './dto/patient.update.dto';
import { ListPatientDto } from './dto/patient.list.dto';

describe('PatientRepository', () => {
  let repository: PatientRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientRepository,
        {
          provide: PrismaService,
          useValue: {
            patients: {
              create: jest.fn(),
              findFirst: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PatientRepository>(PatientRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new patient', async () => {
      const createPatientDto: CreatePatientDto = new CreatePatientDto(
        '123456789',
        'John Doe',
      );
      const patient = { id: 1, telephone: '123456789', name: 'John Doe' };
      const result: ListPatientDto = new ListPatientDto(
        1,
        '123456789',
        'John Doe',
      );

      jest.spyOn(prismaService.patients, 'create').mockResolvedValue(patient);

      expect(await repository.create(createPatientDto)).toEqual(result);
    });
  });

  describe('getByTelephone', () => {
    it('should return a patient by telephone', async () => {
      const patient = { id: 1, telephone: '123456789', name: 'John Doe' };
      const result: ListPatientDto = new ListPatientDto(
        1,
        '123456789',
        'John Doe',
      );

      jest
        .spyOn(prismaService.patients, 'findFirst')
        .mockResolvedValue(patient);

      expect(await repository.getByTelephone('123456789')).toEqual(result);
    });

    it('should return null if no patient is found', async () => {
      jest.spyOn(prismaService.patients, 'findFirst').mockResolvedValue(null);

      expect(await repository.getByTelephone('123456789')).toBeNull();
    });
  });

  describe('getById', () => {
    it('should return a patient by ID', async () => {
      const patient = { id: 1, telephone: '123456789', name: 'John Doe' };
      const result: ListPatientDto = new ListPatientDto(
        1,
        '123456789',
        'John Doe',
      );

      jest
        .spyOn(prismaService.patients, 'findFirst')
        .mockResolvedValue(patient);

      expect(await repository.getById(1)).toEqual(result);
    });

    it('should return null if no patient is found', async () => {
      jest.spyOn(prismaService.patients, 'findFirst').mockResolvedValue(null);

      expect(await repository.getById(1)).toBeNull();
    });
  });

  describe('getAll', () => {
    it('should return an array of patients', async () => {
      const patients = [
        { id: 1, telephone: '123456789', name: 'John Doe' },
        { id: 2, telephone: '987654321', name: 'Jane Doe' },
      ];
      const result: ListPatientDto[] = [
        new ListPatientDto(1, '123456789', 'John Doe'),
        new ListPatientDto(2, '987654321', 'Jane Doe'),
      ];

      jest
        .spyOn(prismaService.patients, 'findMany')
        .mockResolvedValue(patients);

      expect(await repository.getAll()).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update a patient', async () => {
      const updatePatientDto: UpdatePatientDto = new UpdatePatientDto(
        1,
        '987654321',
        'Jane Doe',
      );
      const patient = { id: 1, telephone: '987654321', name: 'Jane Doe' };
      const result: ListPatientDto = new ListPatientDto(
        1,
        '987654321',
        'Jane Doe',
      );

      jest.spyOn(prismaService.patients, 'update').mockResolvedValue(patient);

      expect(await repository.update(1, updatePatientDto)).toEqual(result);
    });
  });

  describe('delete', () => {
    it('should delete a patient', async () => {
      jest.spyOn(prismaService.patients, 'delete').mockResolvedValue(undefined);

      expect(await repository.delete(1)).toBeUndefined();
    });
  });
});
