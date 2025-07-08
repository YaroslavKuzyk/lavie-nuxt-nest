import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductTable1751928006322 implements MigrationInterface {
  name = 'AddProductTable1751928006322';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product_attribute\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`discount\` int NULL, \`description\` varchar(255) NOT NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_attribute_colors_colors\` (\`productAttributeId\` int NOT NULL, \`colorsId\` int NOT NULL, INDEX \`IDX_5423e6fe72017344c45198d028\` (\`productAttributeId\`), INDEX \`IDX_5a68cf6fd2ad32ee8385243ee2\` (\`colorsId\`), PRIMARY KEY (\`productAttributeId\`, \`colorsId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_attribute_sizes_sizes\` (\`productAttributeId\` int NOT NULL, \`sizesId\` int NOT NULL, INDEX \`IDX_f835e129d56062c89d07b2c26a\` (\`productAttributeId\`), INDEX \`IDX_fa6745a651e6da16affbd84eb0\` (\`sizesId\`), PRIMARY KEY (\`productAttributeId\`, \`sizesId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_attribute\` ADD CONSTRAINT \`FK_c0d597555330c0a972122bf4673\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_attribute_colors_colors\` ADD CONSTRAINT \`FK_5423e6fe72017344c45198d028b\` FOREIGN KEY (\`productAttributeId\`) REFERENCES \`product_attribute\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_attribute_colors_colors\` ADD CONSTRAINT \`FK_5a68cf6fd2ad32ee8385243ee21\` FOREIGN KEY (\`colorsId\`) REFERENCES \`colors\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_attribute_sizes_sizes\` ADD CONSTRAINT \`FK_f835e129d56062c89d07b2c26a5\` FOREIGN KEY (\`productAttributeId\`) REFERENCES \`product_attribute\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_attribute_sizes_sizes\` ADD CONSTRAINT \`FK_fa6745a651e6da16affbd84eb05\` FOREIGN KEY (\`sizesId\`) REFERENCES \`sizes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_attribute_sizes_sizes\` DROP FOREIGN KEY \`FK_fa6745a651e6da16affbd84eb05\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_attribute_sizes_sizes\` DROP FOREIGN KEY \`FK_f835e129d56062c89d07b2c26a5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_attribute_colors_colors\` DROP FOREIGN KEY \`FK_5a68cf6fd2ad32ee8385243ee21\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_attribute_colors_colors\` DROP FOREIGN KEY \`FK_5423e6fe72017344c45198d028b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_attribute\` DROP FOREIGN KEY \`FK_c0d597555330c0a972122bf4673\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fa6745a651e6da16affbd84eb0\` ON \`product_attribute_sizes_sizes\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f835e129d56062c89d07b2c26a\` ON \`product_attribute_sizes_sizes\``,
    );
    await queryRunner.query(`DROP TABLE \`product_attribute_sizes_sizes\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_5a68cf6fd2ad32ee8385243ee2\` ON \`product_attribute_colors_colors\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5423e6fe72017344c45198d028\` ON \`product_attribute_colors_colors\``,
    );
    await queryRunner.query(`DROP TABLE \`product_attribute_colors_colors\``);
    await queryRunner.query(`DROP TABLE \`product\``);
    await queryRunner.query(`DROP TABLE \`product_attribute\``);
  }
}
