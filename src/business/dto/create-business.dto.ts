import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { CreateBusinessHourDto } from 'src/business-hours/dto/create-business-hour.dto';

export class CreateBusinessDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  categoryId: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmpty()
  address: CreateAddressDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBusinessHourDto)
  @IsNotEmpty()
  businessHours: CreateBusinessHourDto[];
}
