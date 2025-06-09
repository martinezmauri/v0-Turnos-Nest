import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
    const { address, businessHours, userId, categoryId, ...rest } =
      createBusinessDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('El usuario no fue encontrado.');
    }
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException('La categoria no fue encontrada.');
    }

    const business = await this.businessRepository.create({
      ...rest,
      address, // Esto con cascade:true en la entidad permite la creacion del address
      businessHours,
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
