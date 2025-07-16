import { DBBaseEntity } from 'src/common-modules/database/base.entity';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserRole } from 'src/constants/user-roles.constant';
import { Role } from 'src/modules/roles/entities/role.entity';

@Entity()
export class Users extends DBBaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => Role, (role) => role.id, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: UserRole;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
