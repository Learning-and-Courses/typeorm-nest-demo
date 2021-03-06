import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1637995462142 implements MigrationInterface {
    name = 'UserMigration1637995462142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "somethingNEW" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "somethingNEW") SELECT "id", "name", "something" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "something" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "something") SELECT "id", "name", "somethingNEW" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
