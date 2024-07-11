import { MigrationInterface, QueryRunner } from "typeorm";

export class QuestionnaireInit1720574958311 implements MigrationInterface {
    name = 'QuestionnaireInit1720574958311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "questionnaires" ("id" uuid NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_a01d7cdea895ed9796b29233610" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" uuid NOT NULL, "stepId" integer NOT NULL, "text" character varying NOT NULL, "type" character varying NOT NULL, "options" jsonb NOT NULL DEFAULT '[]', "deleted" boolean NOT NULL DEFAULT false, "questionnaireId" uuid, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_a25e444b4f0c7e666a72b702880" FOREIGN KEY ("questionnaireId") REFERENCES "questionnaires"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_a25e444b4f0c7e666a72b702880"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "questionnaires"`);
    }

}
