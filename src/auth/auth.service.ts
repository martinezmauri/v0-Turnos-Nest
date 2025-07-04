import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Rol } from 'src/users/enum/Rol.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { generateAvatarUrl } from 'src/utils/generate-avatar';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUser: LoginUserDto): Promise<{ id: string; token: string }> {
    const { email, password } = loginUser;

    const userFound = await this.userRepository.findOneByEmail(email);
    if (!userFound) {
      throw new BadRequestException('Usuario y/o contraseña incorrecta.');
    }

    const result = await bcrypt.compare(password, userFound.password);

    if (!result) {
      throw new BadRequestException('Usuario y/o contraseña incorrecta.');
    }

    const token = this.generateToken(userFound);
    return {
      id: userFound.id,
      token,
    };
  }

  async register(createUser: CreateUserDto) {
    const foundUser = await this.userRepository.findOneByEmail(
      createUser.email,
    );

    if (foundUser) {
      throw new BadRequestException(
        'Ya existe una cuenta registrada con su email.',
      );
    }

    const foundPhone = await this.userRepository.findOneByPhone(
      createUser.phone,
    );
    if (foundPhone) {
      throw new BadRequestException(
        'Ya existe una cuenta registrada con ese número de teléfono.',
      );
    }

    if (createUser.password !== createUser.confirmPassword) {
      throw new BadRequestException('Las contraseñas deben coincidir.');
    }

    const passwordHashed = await bcrypt.hash(createUser.password, 10);
    if (!passwordHashed) throw new BadRequestException('Error interno.');

    const avatarUrl = generateAvatarUrl(createUser.name);

    const userCreated = await this.userRepository.createUser({
      ...createUser,
      password: passwordHashed,
      avatar_url: avatarUrl,
    });

    const token = this.generateToken(userCreated);

    return {
      id: userCreated.id,
      token,
    };
  }

  generateToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      rol: user.role,
      avatar_url: user.avatar_url,
      businessId: user.business?.id ?? null,
    };

    return this.jwtService.sign(payload);
  }
}
