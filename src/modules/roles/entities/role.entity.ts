import { IsEnum, IsNotEmpty } from 'class-validator';
import { DBBaseEntity } from 'src/common-modules/database/base.entity';
import { UserRole } from 'src/constants/user-roles.constant';
import { Entity } from 'typeorm';

@Entity()
export class Role extends DBBaseEntity {
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
