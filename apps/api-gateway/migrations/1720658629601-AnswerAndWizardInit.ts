import { MigrationInterface, QueryRunner } from "typeorm";

export class AnswerAndWizardInit1720658629601 implements MigrationInterface {
    name = 'AnswerAndWizardInit1720658629601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "answers" ("id" uuid NOT NULL, "wizard_id" uuid NOT NULL, "question_id" uuid NOT NULL, "answer" jsonb NOT NULL, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wizards" ("id" uuid NOT NULL, "questionnaire_id" uuid NOT NULL, "completed" boolean NOT NULL, CONSTRAINT "PK_43fa31c5e4373f99c125656d863" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "wizards"`);
        await queryRunner.query(`DROP TABLE "answers"`);
    }

}
