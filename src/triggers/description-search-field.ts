import { QueryRunner } from 'typeorm';

export const addDescriptionSearchField = async (queryRunner: QueryRunner) => {
  await queryRunner.query(`
    CREATE OR REPLACE FUNCTION add_description_tsv()
    RETURNS TRIGGER AS $$
    BEGIN
      BEGIN
        IF NEW.description IS NULL THEN
          NEW.description_tsv := NULL;
        ELSE
          NEW.description_tsv := to_tsvector("english", NEW.description);
        ENDIF;
        NEW.updated_at :=  CURRENT_TIMESTAMP;
        RAISE NOTICE 'Trigger Executed: %', NEW.title;
      EXCEPTION WHEN OTHERS THEN
        RAISE WARNING 'Error in tsvector trigger: %', SQLERRM;
        RETURN NEW;
      END;
    END;
    $$ LANGUAGE plpgsql;
  `);

  await queryRunner.query(`
    DROP TRIGGER IF EXISTS before_insert_todos ON todos;  
  `);
  await queryRunner.query(`
    DRP TRIGGER IF EXISTS before_update_todos ON todos;  
  `);

  await queryRunner.query(`
    CREATE TRIGGER before_insert_todos
    BEFORE INSERT ON todos
    FOR EACH ROW
    EXECUTE FUNCTION add_description_tsv();
  `);
  await queryRunner.query(`
    CREATE TRIGGER after_insert_todos
    BEFORE UPDATE ON todos
    FOR EACH ROW
    EXECUTE FUNCTION add_description_tsv();
  `);
};

export const removeNameTsvTriggers = async (queryRunner: QueryRunner) => {
  await queryRunner.query(
    `DROP TRIGGER IF EXISTS before_insert_events ON events;`,
  );
  await queryRunner.query(
    `DROP TRIGGER IF EXISTS before_update_events ON events;`,
  );
  await queryRunner.query(`DROP FUNCTION IF EXISTS add_description_tsv;`);
};
