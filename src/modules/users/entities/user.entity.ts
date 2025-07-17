import { DBBaseEntity } from 'src/common-modules/database/base.entity';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Roles } from 'src/modules/roles/entities/role.entity';

@Entity()
export class Users extends DBBaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => Roles, (role) => role.id, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Roles;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
