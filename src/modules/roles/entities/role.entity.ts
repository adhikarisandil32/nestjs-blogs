import { IsEnum, IsNotEmpty } from 'class-validator';
import { DBBaseEntity } from 'src/common-modules/entities/base.entity';
import { UserRole } from 'src/constants/user-roles.constant';
import { Column, Entity } from 'typeorm';

@Entity()
export class Roles extends DBBaseEntity {
  @IsNotEmpty()
  @IsEnum(UserRole)
  @Column({ nullable: false })
  role: UserRole;
}
