import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Roles } from 'src/modules/roles/entities/role.entity';
import { UsersBaseEntity } from 'src/common-modules/entities/user-base.entity';

@Entity()
export class Users extends UsersBaseEntity {
  @ManyToOne(() => Roles, (role) => role.id, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Roles;
}
