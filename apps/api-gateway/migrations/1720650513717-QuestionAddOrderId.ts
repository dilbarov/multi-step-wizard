import { MigrationInterface, QueryRunner } from "typeorm";

export class QuestionAddOrderId1720650513717 implements MigrationInterface {
    name = 'QuestionAddOrderId1720650513717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" ADD "orderId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "orderId"`);
    }

}
