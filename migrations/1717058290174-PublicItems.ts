import { MigrationInterface, QueryRunner } from 'typeorm';

export class PublicItems1717058290154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO level (name) VALUES ('11'), ('12')`);
    //** */
    await queryRunner.query(
      `INSERT INTO classroom (name, levelid) VALUES
            ('A', (SELECT id FROM level WHERE name = '11')),
            ('B', (SELECT id FROM level WHERE name = '11')),
            ('A', (SELECT id FROM level WHERE name = '12')),
            ('B', (SELECT id FROM level WHERE name = '12'))`,
    );
    await queryRunner.query(
      `INSERT INTO teacher (name) VALUES
            ('Teacher 1'), ('Teacher 2'), ('Teacher 3'), ('Teacher 4')`,
    );

    await queryRunner.query(
      `INSERT INTO subject (
        name,
        hoursperweek
      ) VALUES
            ('Türk Dili ve Edebiyatı', 5),
            ('Din Kültürü ve Ahlak Bilgisi', 2),
            ('Tarih', 2),
            ('Coğrafya', 2),
            ('Matematik', 6),
            ('Fizik', 2),
            ('Kimya', 2),
            ('Biyoloji', 2),
            ('Felsefe', 2),
            ('İngilizce', 4),
            ('Beden Eğitimi', 2),
            ('Rehberlik ve Yönlendirme', 1),
            ('Seçmeli Dersler (Almanca)', 2),
            ('Seçmeli Dersler (Psikoloji)', 2),
            ('Seçmeli Dersler (Bilgi ve İletişim Teknolojileri)', 2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM subject`);
    await queryRunner.query(`DELETE FROM teacher`);
    await queryRunner.query(`DELETE FROM classroom`);
    await queryRunner.query(`DELETE FROM level`);
  }
}
