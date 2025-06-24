import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword,
    );
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no fue encontrado.`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['business'],
    });
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneByEmail(user.email);

    if (existingUser) {
      throw new BadRequestException(
        'Ya existe una cuenta registrada con este email.',
      );
    }

    const newUser = await this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }
}
