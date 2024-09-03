import { MigrationInterface, QueryRunner } from "typeorm";

export class G1725144894317 implements MigrationInterface {
    name = 'G1725144894317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', \`createdAt\` datetime NULL, \`updatedAt\` timestamp NULL, \`cartId\` int NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`REL_342497b574edb2309ec8c6b62a\` (\`cartId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shippingPlace\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`postalCode\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`orderAt\` datetime NOT NULL, \`status\` enum ('pending', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending', \`shippedAt\` datetime NULL, \`deliveredAt\` datetime NULL, \`createdAt\` datetime NULL, \`updatedAt\` datetime NULL, \`userId\` int NULL, \`shippingPlaceId\` int NULL, \`cartId\` int NULL, UNIQUE INDEX \`REL_02edcc68c418c8284f20d7812e\` (\`shippingPlaceId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cart\` (\`id\` int NOT NULL AUTO_INCREMENT, \`totalPrice\` decimal(10,2) NOT NULL DEFAULT '0.00', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cartItem\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`price\` decimal(10,2) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`cartId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orderItems\` (\`id\` int NOT NULL AUTO_INCREMENT, \`product_quntity\` int NOT NULL, \`product_price\` decimal(10,2) NOT NULL DEFAULT '0.00', \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`stock\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NULL, \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_342497b574edb2309ec8c6b62aa\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_02edcc68c418c8284f20d7812eb\` FOREIGN KEY (\`shippingPlaceId\`) REFERENCES \`shippingPlace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_fe3963d525b2ee03ba471953a7c\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cartItem\` ADD CONSTRAINT \`FK_758a7aa44831ea2e513bb435acd\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cartItem\` ADD CONSTRAINT \`FK_970aa2911d6d32f287df098efef\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orderItems\` ADD CONSTRAINT \`FK_51d8fc35a95624166faeca65e86\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orderItems\` DROP FOREIGN KEY \`FK_51d8fc35a95624166faeca65e86\``);
        await queryRunner.query(`ALTER TABLE \`cartItem\` DROP FOREIGN KEY \`FK_970aa2911d6d32f287df098efef\``);
        await queryRunner.query(`ALTER TABLE \`cartItem\` DROP FOREIGN KEY \`FK_758a7aa44831ea2e513bb435acd\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_fe3963d525b2ee03ba471953a7c\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_02edcc68c418c8284f20d7812eb\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_342497b574edb2309ec8c6b62aa\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`orderItems\``);
        await queryRunner.query(`DROP TABLE \`cartItem\``);
        await queryRunner.query(`DROP TABLE \`cart\``);
        await queryRunner.query(`DROP INDEX \`REL_02edcc68c418c8284f20d7812e\` ON \`order\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`shippingPlace\``);
        await queryRunner.query(`DROP INDEX \`REL_342497b574edb2309ec8c6b62a\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
