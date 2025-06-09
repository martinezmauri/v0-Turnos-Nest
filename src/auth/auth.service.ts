import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Rol } from 'src/users/enum/Rol.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUser: LoginUserDto): Promise<{ user: User; token: string }> {
    const { email, password } = loginUser;

    const userFound = await this.userRepository.findOneByEmail(email);
    if (!userFound) {
      throw new BadRequestException('Usuario y/o contraseña incorrecta.');
    }

    const result = await bcrypt.compare(password, userFound.password);

    if (!result) {
      throw new BadRequestException('Usuario y/o contraseña incorrecta.');
    }

    const rol: Rol = userFound.role;
    const user = {
      id: userFound.id,
      email: userFound.email,
      rol: rol,
    };
    const token = this.jwtService.sign(user);
    return {
      user: userFound,
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

    if (createUser.password !== createUser.confirmPassword) {
      throw new BadRequestException('Las contraseñas deben coincidir.');
    }
    const passwordHashed = await bcrypt.hash(createUser.password, 10);

    if (!passwordHashed) throw new BadRequestException('Error interno.');

    const userCreated = await this.userRepository.createUser({
      ...createUser,
      password: passwordHashed,
    });

    return plainToInstance(User, userCreated);
  }
}
