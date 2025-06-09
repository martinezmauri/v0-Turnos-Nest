import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { BusinessRepository } from './business.repository';
import { Business } from './entities/business.entity';
import { SearchBusinessDto } from './dto/search-business.dto';

@Injectable()
export class BusinessService {
  constructor(private readonly businessRepository: BusinessRepository) {}

  async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
    return await this.businessRepository.create(createBusinessDto);
  }

  async search(filters: SearchBusinessDto): Promise<Business[]> {
    return this.businessRepository.search(filters);
  }
}
