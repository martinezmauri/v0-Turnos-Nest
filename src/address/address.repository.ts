import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const { street, street_number, city, province, country } = createAddressDto;

    /* validamos que no exista otro negocion con la misma direccion. */
    const existingAddress = await this.addressRepository.findOne({
      where: { street, street_number, city, province, country },
    });

    if (existingAddress) {
      throw new ConflictException(
        'Ya existe un negocio en la direccion indicada.',
      );
    }
    const address = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(address);
  }

  async findAll() {
    return await this.addressRepository.find();
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.addressRepository.findOneBy({ id });
    if (!address) {
      throw new NotFoundException(`Address con id ${id} no fue encontrado`);
    }
    return address;
  }

  async update(
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.addressRepository.findOneBy({ id });
    if (!address) {
      throw new NotFoundException(
        'No puedes actualizar una direccion inexistente.',
      );
    }

    await this.addressRepository.update(id, updateAddressDto);
    return this.findOne(id);
  }
}
