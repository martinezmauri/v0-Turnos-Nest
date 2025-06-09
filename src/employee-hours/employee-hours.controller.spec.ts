import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeHoursController } from './employee-hours.controller';
import { EmployeeHoursService } from './employee-hours.service';

describe('EmployeeHoursController', () => {
  let controller: EmployeeHoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeHoursController],
      providers: [EmployeeHoursService],
    }).compile();

    controller = module.get<EmployeeHoursController>(EmployeeHoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
