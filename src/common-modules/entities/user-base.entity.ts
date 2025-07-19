import { DBBaseEntity } from 'src/common-modules/entities/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class UsersBaseEntity extends DBBaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  // @ManyToOne(() => Roles, (role) => role.id, { nullable: false })
  // @JoinColumn({ name: 'role_id' })
  // role: Roles;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
