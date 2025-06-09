import { Module } from '@nestjs/common';
import { EmployeeHoursService } from './employee-hours.service';
import { EmployeeHoursController } from './employee-hours.controller';

@Module({
  controllers: [EmployeeHoursController],
  providers: [EmployeeHoursService],
})
export class EmployeeHoursModule {}
