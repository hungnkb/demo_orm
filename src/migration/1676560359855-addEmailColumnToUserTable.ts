import { MigrationInterface, QueryRunner } from "typeorm"

export class addEmailColumnToUserTable1676560359855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `alter table \`user\` add \`email\` varchar(255) not null`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `alter table \`user\` drop column \`email\``
        );
    }

}
