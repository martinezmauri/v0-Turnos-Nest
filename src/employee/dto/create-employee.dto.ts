import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { RolEmployee } from '../enum/RolEmployee.enum';
import { EmployeeHour } from 'src/employee-hours/entities/employee-hour.entity';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  profile_picture?: string;

  @IsEnum(RolEmployee)
  role: RolEmployee;

  @IsString()
  businessId: string;

  @IsArray()
  servicesIds: number[];

  @IsArray()
  employeeHours: Partial<EmployeeHour>[];
}
