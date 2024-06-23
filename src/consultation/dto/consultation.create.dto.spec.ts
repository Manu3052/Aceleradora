import { CreateConsultationDto } from './consultation.create.dto';

describe('CreateConsultationDto', () => {
  it('should create an instance of CreateConsultationDto with the correct properties', () => {
    const date = '2024-06-22';
    const hour = '14:00';
    const patientId = 1;

    const dto = new CreateConsultationDto(date, hour, patientId);

    expect(dto.date).toBe(date);
    expect(dto.hour).toBe(hour);
    expect(dto.patientId).toBe(patientId);
  });

  it('should set and get the date correctly', () => {
    const dto = new CreateConsultationDto('2024-06-22', '14:00', 1);
    const newDate = '2024-06-23';

    dto.date = newDate;

    expect(dto.date).toBe(newDate);
  });

  it('should set and get the hour correctly', () => {
    const dto = new CreateConsultationDto('2024-06-22', '14:00', 1);
    const newHour = '15:00';

    dto.hour = newHour;

    expect(dto.hour).toBe(newHour);
  });

  it('should set and get the patientId correctly', () => {
    const dto = new CreateConsultationDto('2024-06-22', '14:00', 1);
    const newPatientId = 2;

    dto.patientId = newPatientId;

    expect(dto.patientId).toBe(newPatientId);
  });
});
