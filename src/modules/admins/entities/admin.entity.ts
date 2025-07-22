import { UsersBaseEntity } from 'src/common-modules/entities/user-base.entity';
import { Roles } from 'src/modules/roles/entities/role.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Admins extends UsersBaseEntity {
  @ManyToOne(() => Roles, (role) => role.id, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Roles;
}
