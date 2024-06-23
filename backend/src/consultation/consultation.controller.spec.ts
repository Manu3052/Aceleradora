import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationController } from './consultation.controller';
import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/consultation.create.dto';
import { UpdateConsultationDto } from './dto/consultation.update.dto';
import { ListConsultationDto } from './dto/consultation.list.dto';

describe('ConsultationController', () => {
  let controller: ConsultationController;
  let service: ConsultationService;

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
    service = module.get<ConsultationService>(ConsultationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new consultation', async () => {
      const createDto: CreateConsultationDto = {
        date: '2024-06-22',
        hour: '10:00',
        patientId: 1,
      };
      const listDto: ListConsultationDto = new ListConsultationDto(
        1,
        '2024-06-22',
        '10:00',
        1,
      );

      jest.spyOn(service, 'create').mockResolvedValueOnce(listDto);

      const result = await controller.create(createDto);

      expect(result).toEqual(listDto);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of consultations', async () => {
      const listDto: ListConsultationDto[] = [
        new ListConsultationDto(1, '2024-06-22', '10:00', 1),
      ];

      jest.spyOn(service, 'getAll').mockResolvedValueOnce(listDto);

      const result = await controller.findAll();

      expect(result).toEqual(listDto);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('findByDate', () => {
    it('should return a list of consultations by date', async () => {
      const listDto: ListConsultationDto[] = [
        new ListConsultationDto(1, '2024-06-22', '10:00', 1),
      ];

      jest.spyOn(service, 'getByDate').mockResolvedValueOnce(listDto);

      const result = await controller.findByDate('2024-06-22');

      expect(result).toEqual(listDto);
      expect(service.getByDate).toHaveBeenCalledWith('2024-06-22');
    });
  });

  describe('findOne', () => {
    it('should return a consultation by ID', async () => {
      const listDto = new ListConsultationDto(1, '2024-06-22', '10:00', 1);

      jest.spyOn(service, 'getById').mockResolvedValueOnce(listDto);

      const result = await controller.findOne(1);

      expect(result).toEqual(listDto);
      expect(service.getById).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a consultation', async () => {
      const updateDto: UpdateConsultationDto = {
        date: '2024-06-23',
        hour: '11:00',
        patientId: 2,
      };
      const listDto = new ListConsultationDto(1, '2024-06-23', '11:00', 2);

      jest.spyOn(service, 'update').mockResolvedValueOnce(listDto);

      const result = await controller.update(1, updateDto);

      expect(result).toEqual(listDto);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should delete a consultation', async () => {
      jest.spyOn(service, 'delete').mockResolvedValueOnce();

      await controller.remove(1);

      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
