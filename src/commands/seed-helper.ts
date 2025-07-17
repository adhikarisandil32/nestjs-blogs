import { UserRole } from 'src/constants/user-roles.constant';
import { Roles } from 'src/modules/roles/entities/role.entity';
import { QueryRunner } from 'typeorm';
import { MyLogger } from 'src/common-modules/logger.service';
import { faker } from '@faker-js/faker';
import { Users } from 'src/modules/users/entities/user.entity';

/****************
 * Roles Seeder *
 ****************/
export async function seedUserRoles(
  queryRunner: QueryRunner,
  loggerService: MyLogger,
) {
  const RoleSeedingContext = 'roles-seed';

  loggerService.log('seeding roles', RoleSeedingContext);

  const existingRoles = await queryRunner.manager.find(Roles);

  const seedingRequiredForRoles: UserRole[] = Object.values(UserRole).filter(
    (roleNameFromApp) => {
      return !existingRoles.find(
        (roleNameFromDB) => roleNameFromDB.role !== roleNameFromApp,
      );
    },
  );

  if (seedingRequiredForRoles.length <= 0) {
    loggerService.log(
      'defined roles already seeded or roles not defined',
      RoleSeedingContext,
    );
    return;
  }

  const seedReadyRoles = queryRunner.manager.create(
    Roles,
    seedingRequiredForRoles.map((role) => ({
      role,
    })),
  );

  await queryRunner.manager.save(seedReadyRoles);

  loggerService.log('seeding roles complete', RoleSeedingContext);

  return;
}

/****************
 * Users Seeder *
 ****************/
export async function seedUsers(
  queryRunner: QueryRunner,
  loggerService: MyLogger,
) {
  const UserSeedingContext = 'users-seed';

  loggerService.log('seeding users', UserSeedingContext);

  const existingRoles = await queryRunner.manager.find(Roles);
  if (!existingRoles) {
    throw new Error('');
  }
  const userRoleId = existingRoles.find(
    (existingRole) => existingRole.role === UserRole.USER,
  ).id;

  // why can't it be role field be passed id when it can be done in todo seed for user

  // for (let i = 1; i <= 16; i++) {
  //   const user = queryRunner.manager.create(Users, {
  //     name: faker.person.fullName(),
  //     email: faker.internet.email().toLowerCase(),
  //     password: 'Test@123',
  //     role: userRoleId,
  //   });
  //   await queryRunner.manager.save(user);
  //   // using save is important because user entity uses @BeforeInsert decorator which will only act when save used
  //   console.log(`User ${i} inserted`);
  // }

  loggerService.log('users seed complete', UserSeedingContext);

  return;
}
