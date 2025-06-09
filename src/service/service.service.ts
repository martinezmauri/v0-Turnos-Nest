import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceRepository } from './service.repository';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    return await this.serviceRepository.create(createServiceDto);
  }

  async findByBusinessId(businessId: string): Promise<Service[]> {
    return await this.serviceRepository.findByBusinessId(businessId);
  }

  async findOne(id: string): Promise<Service> {
    return await this.serviceRepository.findOne(id);
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return await this.serviceRepository.update(id, updateServiceDto);
  }

  async remove(id: string): Promise<string> {
    return await this.serviceRepository.delete(id);
  }
}
