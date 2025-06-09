import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DaysOfWeek } from 'src/business-hours/enum/DaysOfWeek.enum';

export class CreateEmployeeHourDto {
  @IsEnum(DaysOfWeek)
  day_of_week: DaysOfWeek;

  @IsString()
  opening_morning_time: string;

  @IsString()
  closing_morning_time: string;

  @IsOptional()
  @IsString()
  opening_evening_time?: string;

  @IsOptional()
  @IsString()
  closing_evening_time?: string;
}
