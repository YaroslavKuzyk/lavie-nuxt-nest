import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTypeToUser1748280478572 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users ADD COLUMN type VARCHAR(255) NOT NULL DEFAULT 'user';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users DROP COLUMN type;
    `);
  }
}
