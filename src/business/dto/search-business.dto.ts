import { IsOptional, IsString } from 'class-validator';

export class SearchBusinessDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  category: string;

  @IsString()
  city: string;
}
