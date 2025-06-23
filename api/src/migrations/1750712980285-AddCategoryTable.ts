import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategoryTable1750712980285 implements MigrationInterface {
  name = 'AddCategoryTable1750712980285';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`pictureId\` int NOT NULL, \`isActive\` tinyint NOT NULL, \`createdAt\` varchar(255) NOT NULL, \`updatedAt\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_835cae036b167267a72b3c51215\` FOREIGN KEY (\`pictureId\`) REFERENCES \`files\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_835cae036b167267a72b3c51215\``,
    );
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}
