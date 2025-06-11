import { Rol } from 'src/users/enum/Rol.enum';

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  role: Rol;
}
