import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { Business } from 'src/business/entities/business.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const { businessId, ...rest } = createServiceDto;

    const business = await this.businessRepository.findOne({
      where: { id: businessId },
    });
    if (!business) {
      throw new NotFoundException('Negocio no encontrado');
    }

    const service = await this.serviceRepository.create({ ...rest, business });

    return await this.serviceRepository.save(service);
  }

  async findByBusinessId(businessId: string): Promise<Service[]> {
    return await this.serviceRepository.find({
      where: { business: { id: businessId } },
      relations: ['employees'],
    });
  }

  async findByUserId(userId: string): Promise<Service[]> {
    return await this.serviceRepository.find({
      where: { business: { user: { id: userId } } },
    });
  }

  async findOne(id: string) {
    const service = await this.serviceRepository.findOneBy({ id });

    if (!service) {
      throw new NotFoundException(`Servicio con id ${id} no existe.`);
    }

    return service;
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const service = await this.serviceRepository.findOne({ where: { id } });

    if (!service) {
      throw new NotFoundException('Servicio no encontrado.');
    }

    Object.assign(service, updateServiceDto);

    return await this.serviceRepository.save(service);
  }

  async delete(id: string): Promise<string> {
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: ['employees'],
    });

    if (!service) {
      throw new NotFoundException('Servicio no encontrado.');
    }

    service.employees = [];
    await this.serviceRepository.save(service);

    await this.serviceRepository.delete(id);

    return `Servicio de id ${id} eliminado.`;
  }
}
