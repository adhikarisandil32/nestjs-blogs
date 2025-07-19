import { UsersBaseEntity } from 'src/common-modules/entities/user-base.entity';
import { Roles } from 'src/modules/roles/entities/role.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Admins extends UsersBaseEntity {
  @ManyToOne(() => Roles, (role) => role.id, { nullable: false })
  role: Roles;
}
