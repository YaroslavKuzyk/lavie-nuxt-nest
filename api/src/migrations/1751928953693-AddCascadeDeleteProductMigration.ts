import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadeDeleteProductMigration1751928953693
  implements MigrationInterface
{
  name = 'AddCascadeDeleteProductMigration1751928953693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_attribute\` DROP FOREIGN KEY \`FK_c0d597555330c0a972122bf4673\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_attribute\` ADD CONSTRAINT \`FK_c0d597555330c0a972122bf4673\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_attribute\` DROP FOREIGN KEY \`FK_c0d597555330c0a972122bf4673\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_attribute\` ADD CONSTRAINT \`FK_c0d597555330c0a972122bf4673\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
