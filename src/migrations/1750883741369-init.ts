import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1750883741369 implements MigrationInterface {
    name = 'Init1750883741369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "todos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "isCompleted" boolean NOT NULL DEFAULT (0), "userId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_todos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "isCompleted" boolean NOT NULL DEFAULT (0), "userId" integer NOT NULL, CONSTRAINT "FK_4583be7753873b4ead956f040e3" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_todos"("id", "title", "description", "isCompleted", "userId") SELECT "id", "title", "description", "isCompleted", "userId" FROM "todos"`);
        await queryRunner.query(`DROP TABLE "todos"`);
        await queryRunner.query(`ALTER TABLE "temporary_todos" RENAME TO "todos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" RENAME TO "temporary_todos"`);
        await queryRunner.query(`CREATE TABLE "todos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "isCompleted" boolean NOT NULL DEFAULT (0), "userId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "todos"("id", "title", "description", "isCompleted", "userId") SELECT "id", "title", "description", "isCompleted", "userId" FROM "temporary_todos"`);
        await queryRunner.query(`DROP TABLE "temporary_todos"`);
        await queryRunner.query(`DROP TABLE "todos"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
