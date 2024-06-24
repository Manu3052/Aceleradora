import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationController } from './consultation.controller';
import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/consultation.create.dto';
import { UpdateConsultationDto } from './dto/consultation.update.dto';
import { ListConsultationDto } from './dto/consultation.list.dto';

describe('ConsultationController', () => {
  let controller: ConsultationController;
  let consultationService: ConsultationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultationController],
      providers: [
        {
          provide: ConsultationService,
          useValue: {
            create: jest.fn(),
            getAll: jest.fn(),
            getByDate: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ConsultationController>(ConsultationController);
    consultationService = module.get<ConsultationService>(ConsultationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new consultation', async () => {
      const createDto = new CreateConsultationDto(
        '2024-06-25',
        '09:00',
        1,
        'Cardiology',
      );
      const createdConsultation = new ListConsultationDto(
        1,
        '2024-06-25',
        '09:00',
        1,
        'Cardiology',
      );

      jest
        .spyOn(consultationService, 'create')
        .mockResolvedValue(createdConsultation);

      const result = await controller.create(createDto);
      expect(result).toEqual(createdConsultation);
    });
  });

  describe('findOne', () => {
    it('should return a consultation by ID', async () => {
      const id = 1;
      const consultation = new ListConsultationDto(
        1,
        '2024-06-25',
        '09:00',
        1,
        'Cardiology',
      );

      jest
        .spyOn(consultationService, 'getById')
        .mockResolvedValue(consultation);

      const result = await controller.findOne(id);
      expect(result).toEqual(consultation);
    });
  });

  describe('update', () => {
    it('should update an existing consultation', async () => {
      const id = 1;
      const updateDto: UpdateConsultationDto = {
        date: '2024-06-26',
        hour: '10:00',
        patientId: 1,
        specialty: 'Dermatology',
      };
      const updatedConsultation = new ListConsultationDto(
        1,
        '2024-06-26',
        '10:00',
        1,
        'Dermatology',
      );

      jest
        .spyOn(consultationService, 'update')
        .mockResolvedValue(updatedConsultation);

      const result = await controller.update(id, updateDto);
      expect(result).toEqual(updatedConsultation);
    });
  });

  describe('remove', () => {
    it('should delete a consultation by ID', async () => {
      const id = 1;

      jest.spyOn(consultationService, 'delete').mockResolvedValue(undefined);

      await controller.remove(id);
      expect(consultationService.delete).toHaveBeenCalledWith(id);
    });
  });
});
