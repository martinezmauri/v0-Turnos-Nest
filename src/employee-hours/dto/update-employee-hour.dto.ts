import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeHourDto } from './create-employee-hour.dto';

export class UpdateEmployeeHourDto extends PartialType(CreateEmployeeHourDto) {}
