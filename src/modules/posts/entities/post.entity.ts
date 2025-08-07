import { DBBaseEntity } from 'src/common-modules/entities/base.entity';
import { Admins } from 'src/modules/admins/entities/admin.entity';
import { Roles } from 'src/modules/roles/entities/role.entity';
import { Users } from 'src/modules/users/entities/user.entity';
import {
  Check,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
@Check(`author_user_id is not null or author_admin_id is not null`)
export class Posts extends DBBaseEntity {
  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'content', nullable: false })
  content: string;

  // see polymorphic relationship for relating to multiple entities

  @ManyToOne(() => Users, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'author_user_id' })
  author_user: Users;

  @ManyToOne(() => Roles, (role) => role.id, { nullable: false })
  @JoinColumn({ name: 'author_role_id' })
  author_role: Roles;

  @ManyToMany(() => Users, (user) => user.id)
  @JoinTable({
    name: 'posts_contributors',
    joinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'contributor_id',
      referencedColumnName: 'id',
    },
  })
  contributors: Users[];
}
