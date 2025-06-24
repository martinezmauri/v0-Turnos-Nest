import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BusinessHour } from 'src/business-hours/entities/business-hour.entity';
import { Business } from './entities/business.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBusinessDto } from './dto/create-business.dto';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { SearchBusinessDto } from './dto/search-business.dto';

@Injectable()
export class BusinessRepository {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Business[]> {
    return await this.businessRepository.find({
      relations: [
        'services',
        'employees',
        'address',
        'category',
        'businessHours',
      ],
    });
  }

  async findOne(id: string): Promise<Business> {
    const business = await this.businessRepository.findOne({
      where: { id },
      relations: [
        'services',
        'employees',
        'employees.services',
        'employees.employeeHours',
        'address',
        'category',
        'businessHours',
      ],
    });
    if (!business) {
      throw new NotFoundException(`No existe un negocio con el id ${id}}`);
    }
    return business;
  }

  async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
    const { address, businessHours, userId, categoryId, ...rest } =
      createBusinessDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('El usuario no fue encontrado.');
    }

    const existingBusiness = await this.businessRepository.findOne({
      where: { user: { id: userId } },
    });

    if (existingBusiness) {
      throw new BadRequestException(
        'El usuario ya tiene un negocio registrado.',
      );
    }
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException('La categoria no fue encontrada.');
    }

    // Normaliza las propiedades vacías de businessHours
    const normalizedBusinessHours: DeepPartial<BusinessHour>[] = (
      businessHours || []
    ).map((bh) => ({
      ...bh,
      opening_evening_time:
        bh.opening_evening_time === '' ? undefined : bh.opening_evening_time,
      closing_evening_time:
        bh.closing_evening_time === '' ? undefined : bh.closing_evening_time,
    }));

    const business = await this.businessRepository.create({
      ...rest,
      address, // Esto con cascade:true en la entidad permite la creacion del address
      businessHours: normalizedBusinessHours,
      user: { id: userId },
      category: { id: categoryId },
    });

    return await this.businessRepository.save(business);
  }

  async search(filters: SearchBusinessDto): Promise<Business[]> {
    const { name, category, city } = filters;

    const query = this.businessRepository
      .createQueryBuilder('business')
      .leftJoinAndSelect('business.category', 'category')
      .leftJoinAndSelect('business.address', 'address');

    if (name) {
      query.andWhere('LOWER(business.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }

    query.andWhere('LOWER(category.name) = LOWER(:category)', {
      category: category.toLowerCase(),
    });

    query.andWhere('LOWER(address.city) = LOWER(:city)', {
      city: city.toLowerCase(),
    });

    return await query.getMany();
  }
}
