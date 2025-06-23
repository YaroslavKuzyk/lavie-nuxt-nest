import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFileTable1750367075175 implements MigrationInterface {
  name = 'AddFileTable1750367075175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`files\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`userId\` int NOT NULL, \`createdAt\` varchar(255) NOT NULL, \`updatedAt\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_332d10755187ac3c580e21fbc0\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`files\` ADD CONSTRAINT \`FK_7e7425b17f9e707331e9a6c7335\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_7e7425b17f9e707331e9a6c7335\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_332d10755187ac3c580e21fbc0\` ON \`files\``,
    );
    await queryRunner.query(`DROP TABLE \`files\``);
  }
}
