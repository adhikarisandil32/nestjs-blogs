import { UserRole } from 'src/constants/user-roles.constant';
import { Roles } from 'src/modules/roles/entities/role.entity';
import { QueryRunner } from 'typeorm';

export async function seedUserRoles(queryRunner: QueryRunner) {
  console.log('seeding roles');
  const existingRoles = await queryRunner.manager.find(Roles);

  const seedingRequiredForRoles: UserRole[] = Object.values(UserRole).filter(
    (roleNameFromApp) => {
      return !existingRoles.find(
        (roleNameFromDB) => roleNameFromDB.role !== roleNameFromApp,
      );
    },
  );

  if (seedingRequiredForRoles.length <= 0) {
    console.log('roles not defined or defined roles already exists');
    return;
  }

  // console.log(
  //   seedingRequiredForRoles.map((role) => ({
  //     role,
  //   })),
  // );

  const seedReadyRoles = queryRunner.manager.create(
    Roles,
    seedingRequiredForRoles.map((role) => ({
      role,
    })),
  );

  await queryRunner.manager.save(seedReadyRoles);

  console.log('seeding roles complete');
  return;
}
