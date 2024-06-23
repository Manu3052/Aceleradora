import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/patient.create.dto';
import { UpdatePatientDto } from './dto/patient.update.dto';
import { ListPatientDto } from './dto/patient.list.dto';

describe('PatientController', () => {
  let controller: PatientController;
  let service: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: {
            create: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createPatientDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of patients', async () => {
      const result: ListPatientDto[] = [
        new ListPatientDto(1, '123456789', 'John Doe'),
      ];

      jest.spyOn(service, 'getAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single patient', async () => {
      const result: ListPatientDto = new ListPatientDto(
        1,
        '123456789',
        'John Doe',
      );

      jest.spyOn(service, 'getById').mockResolvedValue(result);

      expect(await controller.findOne(1)).toBe(result);
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

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(1, updatePatientDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a patient', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue();

      expect(await controller.remove(1)).toBeUndefined();
    });
  });
});
