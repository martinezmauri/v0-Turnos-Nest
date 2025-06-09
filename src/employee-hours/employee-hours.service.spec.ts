import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeHoursService } from './employee-hours.service';

describe('EmployeeHoursService', () => {
  let service: EmployeeHoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeHoursService],
    }).compile();

    service = module.get<EmployeeHoursService>(EmployeeHoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
