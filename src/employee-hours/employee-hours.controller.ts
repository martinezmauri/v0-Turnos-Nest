import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeHoursService } from './employee-hours.service';
import { CreateEmployeeHourDto } from './dto/create-employee-hour.dto';
import { UpdateEmployeeHourDto } from './dto/update-employee-hour.dto';

@Controller('employee-hours')
export class EmployeeHoursController {
  constructor(private readonly employeeHoursService: EmployeeHoursService) {}
}
