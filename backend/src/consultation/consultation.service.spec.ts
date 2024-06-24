import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationService } from './consultation.service';
import { ConsultationRepository } from './consultation.repository';
import { CreateConsultationDto } from './dto/consultation.create.dto';
import { ListConsultationDto } from './dto/consultation.list.dto';
import { UpdateConsultationDto } from './dto/consultation.update.dto';
import { BadRequestException } from '@nestjs/common';
import { ValidationMessageEnum } from './enums/validation.message';

describe('ConsultationService', () => {
  let service: ConsultationService;
  let repository: ConsultationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsultationService,
        {
          provide: ConsultationRepository,
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

    service = module.get<ConsultationService>(ConsultationService);
    repository = module.get<ConsultationRepository>(ConsultationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new consultation', async () => {
      const createDto = new CreateConsultationDto('2024-06-22', '10:00', 1);
      const listDto: ListConsultationDto = new ListConsultationDto(
        1,
        '2024-06-22',
        '10:00',
        1,
      );

      jest.spyOn(repository, 'getByDate').mockResolvedValueOnce(null);
      jest.spyOn(repository, 'create').mockResolvedValueOnce(listDto);

      const result = await service.create(createDto);

      expect(result).toEqual(listDto);
      expect(repository.getByDate).toHaveBeenCalledWith(
        createDto.date,
        createDto.hour,
      );
      expect(repository.create).toHaveBeenCalledWith(createDto);
    });

  });

  describe('getAll', () => {
    it('should return an array of consultations', async () => {
      const listDto: ListConsultationDto[] = [
        new ListConsultationDto(1, '2024-06-22', '10:00', 1),
      ];

      jest.spyOn(repository, 'getAll').mockResolvedValueOnce(listDto);

      const result = await service.getAll();

      expect(result).toEqual(listDto);
      expect(repository.getAll).toHaveBeenCalled();
    });

    it('should throw BadRequestException if no consultations are found', async () => {
      jest.spyOn(repository, 'getAll').mockResolvedValueOnce([]);

      await expect(service.getAll()).rejects.toThrow(
        new BadRequestException(ValidationMessageEnum.NOT_FOUND),
      );
    });
  });

  describe('getByDate', () => {
    it('should return a consultation by date', async () => {
      const listDto: ListConsultationDto[] = [
        new ListConsultationDto(1, '2024-06-22', '10:00', 1),
      ];

      jest.spyOn(repository, 'getByDate').mockResolvedValueOnce(listDto);

      const result = await service.getByDate('2024-06-22');

      expect(result).toEqual(listDto);
      expect(repository.getByDate).toHaveBeenCalledWith('2024-06-22', '');
    });

    it('should throw BadRequestException if no consultations are found', async () => {
      jest.spyOn(repository, 'getByDate').mockResolvedValueOnce(null);

      await expect(service.getByDate('2024-06-22')).rejects.toThrow(
        new BadRequestException(ValidationMessageEnum.NOT_FOUND),
      );
    });
  });

  describe('getById', () => {
    it('should return a consultation by ID', async () => {
      const listDto = new ListConsultationDto(1, '2024-06-22', '10:00', 1);

      jest.spyOn(repository, 'getById').mockResolvedValueOnce(listDto);

      const result = await service.getById(1);

      expect(result).toEqual(listDto);
      expect(repository.getById).toHaveBeenCalledWith(1);
    });

    it('should throw BadRequestException if the consultation is not found', async () => {
      jest.spyOn(repository, 'getById').mockResolvedValueOnce(null);

      await expect(service.getById(1)).rejects.toThrow(
        new BadRequestException(ValidationMessageEnum.NOT_FOUND),
      );
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

      jest.spyOn(repository, 'update').mockResolvedValueOnce(listDto);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(listDto);
      expect(repository.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('delete', () => {
    it('should delete a consultation', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValueOnce();

      await service.delete(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
