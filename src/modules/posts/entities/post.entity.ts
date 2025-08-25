import { DBBaseEntity } from 'src/common-modules/entities/base.entity';
import { CommonUser } from 'src/modules/common-users/entities/common-user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Posts extends DBBaseEntity {
  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'content', nullable: false })
  content: string;

  @ManyToOne(() => CommonUser, (commonUser) => commonUser.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'author_id' })
  author: CommonUser;

  @ManyToMany(() => CommonUser, (commonUser) => commonUser.id)
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
  contributors: CommonUser[];
}
