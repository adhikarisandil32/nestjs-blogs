import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTriggerOnTodos1771413248057 implements MigrationInterface {
  name = 'AddTriggerOnTodos1771413248057';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "description_tsv" tsvector`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todos" DROP COLUMN "description_tsv"`,
    );
  }
}
