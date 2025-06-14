import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';
import { DaysOfWeek } from '../enum/DaysOfWeek.enum';

const TIME_REGEX = /^([0-1]\d|2[0-3]):([0-5]\d)$/; // HH:mm formato 24h
export class CreateBusinessHourDto {
  @IsEnum(DaysOfWeek)
  @IsNotEmpty()
  day_of_week: DaysOfWeek;

  @IsString()
  @Matches(TIME_REGEX, {
    message: 'opening_morning_time debe tener formato HH:mm',
  })
  @IsNotEmpty()
  opening_morning_time: string;

  @IsString()
  @Matches(TIME_REGEX, {
    message: 'closing_morning_time debe tener formato HH:mm',
  })
  @IsNotEmpty()
  closing_morning_time: string;

  @ValidateIf((o) => o.opening_evening_time !== '')
  @IsString()
  @Matches(TIME_REGEX, {
    message: 'opening_evening_time debe tener formato HH:mm',
  })
  @IsOptional()
  opening_evening_time?: string;

  @ValidateIf((o) => o.closing_evening_time !== '')
  @IsString()
  @Matches(TIME_REGEX, {
    message: 'closing_evening_time debe tener formato HH:mm',
  })
  @IsOptional()
  closing_evening_time?: string;
}
