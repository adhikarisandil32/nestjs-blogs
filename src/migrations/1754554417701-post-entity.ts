import { MigrationInterface, QueryRunner } from "typeorm";

export class PostEntity1754554417701 implements MigrationInterface {
    name = 'PostEntity1754554417701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "description" character varying NOT NULL, "author_user_id" integer, "author_admin_id" integer, CONSTRAINT "CHK_26f7f32ef9e469dd1cc07d5a6a" CHECK (author_user_id is not null or author_admin_id is not null), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts_contributors" ("post_id" integer NOT NULL, "contributor_id" integer NOT NULL, CONSTRAINT "PK_0a3bb232905231a26bcff868e51" PRIMARY KEY ("post_id", "contributor_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_177df5f80eece8c86abb68efbf" ON "posts_contributors" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_13b9e81b94286fa5dbf9a89bab" ON "posts_contributors" ("contributor_id") `);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_4dd10e577978ddef3ba582f68ad" FOREIGN KEY ("author_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_f384bfa75cbc4798d0644ba8937" FOREIGN KEY ("author_admin_id") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_contributors" ADD CONSTRAINT "FK_177df5f80eece8c86abb68efbf5" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_contributors" ADD CONSTRAINT "FK_13b9e81b94286fa5dbf9a89bab7" FOREIGN KEY ("contributor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_contributors" DROP CONSTRAINT "FK_13b9e81b94286fa5dbf9a89bab7"`);
        await queryRunner.query(`ALTER TABLE "posts_contributors" DROP CONSTRAINT "FK_177df5f80eece8c86abb68efbf5"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_f384bfa75cbc4798d0644ba8937"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_4dd10e577978ddef3ba582f68ad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13b9e81b94286fa5dbf9a89bab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_177df5f80eece8c86abb68efbf"`);
        await queryRunner.query(`DROP TABLE "posts_contributors"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
