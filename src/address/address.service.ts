import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './address.repository';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    return await this.addressRepository.create(createAddressDto);
  }

  async findAll(): Promise<Address[]> {
    return await this.addressRepository.findAll();
  }

  async findOne(id: string): Promise<Address> {
    return await this.addressRepository.findOne(id);
  }

  async update(
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    return await this.addressRepository.update(id, updateAddressDto);
  }
}
