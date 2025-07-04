import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RolEmployee } from '../enum/RolEmployee.enum';
import { CreateEmployeeHourDto } from 'src/employee-hours/dto/create-employee-hour.dto';
import { Type } from 'class-transformer';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(RolEmployee)
  role?: RolEmployee;

  @IsOptional()
  @IsString()
  profile_picture?: string;

  @IsOptional()
  servicesIds?: number[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateEmployeeHourDto)
  employeeHours?: CreateEmployeeHourDto[];
}
