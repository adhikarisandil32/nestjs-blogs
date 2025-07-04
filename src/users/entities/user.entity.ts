import { DBBaseEntity } from 'src/common-modules/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Users extends DBBaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;
}
