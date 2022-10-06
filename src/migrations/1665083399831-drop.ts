import { MigrationInterface, QueryRunner } from 'typeorm';

export class drop1665083399831 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`DROP TABLE "user"`);
    // await queryRunner.query(`DROP TABLE "report"`);
    await queryRunner.dropTable('user');
    await queryRunner.dropTable('report');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
