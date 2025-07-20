import { UserRole } from 'src/constants/user-roles.constant';
import { Roles } from 'src/modules/roles/entities/role.entity';
import { QueryRunner } from 'typeorm';
import { MyLogger } from 'src/common-modules/logger.service';
import { faker } from '@faker-js/faker';
import { Users } from 'src/modules/users/entities/user.entity';
import { Admins } from 'src/modules/admins/entities/admin.entity';

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

  const existingRoles = await queryRunner.manager.find(Roles);
  if (!existingRoles || (existingRoles && existingRoles.length <= 0)) {
    throw new Error('roles not available. seed roles first');
  }

  const userRole = existingRoles.find(
    (existingRole) => existingRole.role === UserRole.USER,
  );

  loggerService.log('seeding users', UserSeedingContext);

  for (let i = 1; i <= 20; i++) {
    const user = queryRunner.manager.create(Users, {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: 'Test@123',
      role: userRole,
    });
    await queryRunner.manager.save(user);
    // using save is important because user entity uses @BeforeInsert decorator which will only act when save used
    console.log(`User ${i} inserted`);
  }

  loggerService.log('users seed complete', UserSeedingContext);

  return;
}

/****************
 * Admin Seeder *
 ****************/

export async function seedAdmin(
  queryRunner: QueryRunner,
  loggerService: MyLogger,
) {
  const AdminSeedingContext = 'seed-admin';

  const existingAdmins = await queryRunner.manager.find(Admins);

  const myAdminUser = existingAdmins.find(
    (existingAdmin) =>
      existingAdmin.email.toLowerCase() === 'admin@gmail.com' &&
      existingAdmin.role.role === UserRole.ADMIN,
  );

  if (myAdminUser) {
    loggerService.log('admin seed succcess', AdminSeedingContext);
    return;
  }

  const existingRoles = await queryRunner.manager.find(Roles);
  if (!existingRoles || (existingRoles && existingRoles.length <= 0)) {
    throw new Error('roles not available. seed roles first');
  }

  const adminRole = existingRoles.find(
    (existingRole) => existingRole.role === UserRole.ADMIN,
  );

  const admin = queryRunner.manager.create(Admins, {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: 'Test@123',
    role: adminRole,
  });
  await queryRunner.manager.save(admin);
  loggerService.log('admin seed succcess', AdminSeedingContext);
  return;
}
