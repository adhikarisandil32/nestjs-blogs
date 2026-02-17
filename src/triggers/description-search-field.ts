import { QueryRunner } from 'typeorm';

export const addDescriptionSearchField = async (queryRunner: QueryRunner) => {
  await queryRunner.query(`
    CREATE OR REPLACE FUNCTION add_description_tsv()
    RETURNS TRIGGER AS $$
    
  `);
};
