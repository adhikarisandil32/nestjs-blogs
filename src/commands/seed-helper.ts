import { UserRole } from 'src/constants/user-roles.constant';
import { Role } from 'src/modules/roles/entities/role.entity';
import { QueryRunner } from 'typeorm';

export async function seedUserRoles(queryRunner: QueryRunner) {
  const existingRoles = await queryRunner.manager.find(Role);

  const seedingRequiredForRoles = Object.values(UserRole).filter(
    (roleNameFromApp) => {
      return existingRoles.find(
        (roleNameFromDB) => roleNameFromDB.role !== roleNameFromApp,
      );
    },
  );

  console.log(seedingRequiredForRoles);

  // queryRunner.manager.create(Role, {
  //   role: UserRole.ADMIN,
  // });
}
