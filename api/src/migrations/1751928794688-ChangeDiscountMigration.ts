import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDiscountMigration1751928794688
  implements MigrationInterface
{
  name = 'ChangeDiscountMigration1751928794688';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`discount\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`discount\` decimal(10,2) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`discount\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`discount\` int NULL`,
    );
  }
}
