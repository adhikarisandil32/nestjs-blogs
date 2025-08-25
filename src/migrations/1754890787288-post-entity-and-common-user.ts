import { MigrationInterface, QueryRunner } from "typeorm";

export class PostEntityAndCommonUser1754890787288 implements MigrationInterface {
    name = 'PostEntityAndCommonUser1754890787288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "common_users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "UQ_177077b628f1559bf7f353e7fe5" UNIQUE ("email"), CONSTRAINT "PK_c8b5d0b4515c71bbf1630cfd8e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "content" character varying NOT NULL, "author_id" integer NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts_contributors" ("post_id" integer NOT NULL, "contributor_id" integer NOT NULL, CONSTRAINT "PK_0a3bb232905231a26bcff868e51" PRIMARY KEY ("post_id", "contributor_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_177df5f80eece8c86abb68efbf" ON "posts_contributors" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_13b9e81b94286fa5dbf9a89bab" ON "posts_contributors" ("contributor_id") `);
        await queryRunner.query(`ALTER TABLE "common_users" ADD CONSTRAINT "FK_0ea6b061df0328cbbf349f2fa5f" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_312c63be865c81b922e39c2475e" FOREIGN KEY ("author_id") REFERENCES "common_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_contributors" ADD CONSTRAINT "FK_177df5f80eece8c86abb68efbf5" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_contributors" ADD CONSTRAINT "FK_13b9e81b94286fa5dbf9a89bab7" FOREIGN KEY ("contributor_id") REFERENCES "common_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_contributors" DROP CONSTRAINT "FK_13b9e81b94286fa5dbf9a89bab7"`);
        await queryRunner.query(`ALTER TABLE "posts_contributors" DROP CONSTRAINT "FK_177df5f80eece8c86abb68efbf5"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_312c63be865c81b922e39c2475e"`);
        await queryRunner.query(`ALTER TABLE "common_users" DROP CONSTRAINT "FK_0ea6b061df0328cbbf349f2fa5f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13b9e81b94286fa5dbf9a89bab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_177df5f80eece8c86abb68efbf"`);
        await queryRunner.query(`DROP TABLE "posts_contributors"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "common_users"`);
    }

}
