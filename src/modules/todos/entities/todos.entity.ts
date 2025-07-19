import { DBBaseEntity } from 'src/common-modules/entities/base.entity';
import { Users } from 'src/modules/users/entities/user.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Todos extends DBBaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ name: 'is_completed', default: false, nullable: false })
  isCompleted: boolean;

  @ManyToOne(() => Users, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
