import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Service } from 'src/service/entities/service.entity';
import { EmployeeHour } from 'src/employee-hours/entities/employee-hour.entity';
import { EmployeeRepository } from './employee.repository';
import { ServiceModule } from 'src/service/service.module';
import { Business } from 'src/business/entities/business.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Service, EmployeeHour, Business]),
    ServiceModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
  exports: [EmployeeService],
})
export class EmployeeModule {}
