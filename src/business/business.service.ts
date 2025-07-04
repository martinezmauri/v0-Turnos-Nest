import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { BusinessRepository } from './business.repository';
import { Business } from './entities/business.entity';
import { SearchBusinessDto } from './dto/search-business.dto';

@Injectable()
export class BusinessService {
  constructor(private readonly businessRepository: BusinessRepository) {}

  async findAll(): Promise<Business[]> {
    return this.businessRepository.findAll();
  }

  async findOne(id: string): Promise<Business> {
    return this.businessRepository.findOne(id);
  }

  async create(
    createBusinessDto: CreateBusinessDto,
  ): Promise<{ business: Business; token: string }> {
    return await this.businessRepository.create(createBusinessDto);
  }

  async search(filters: SearchBusinessDto): Promise<Business[]> {
    return this.businessRepository.search(filters);
  }
}
