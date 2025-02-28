describe('Drop Table', () => {
  it('successfully drops a table', () => {
    // Step 1: Create a table
    cy.task('queryDb', `
      CREATE TABLE my_test_schema.users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(100) UNIQUE
      )
    `);

    // Step 2: Drop the table
    cy.task('queryDb', `DROP TABLE my_test_schema.users`);

    // Step 3: Verify the table was dropped successfully
    cy.task('queryDb', `
      SELECT * FROM information_schema.tables 
      WHERE table_name = 'users' AND table_schema = 'my_test_schema'
    `).then((result) => {
      expect(result.rows).to.have.lengthOf(0);
    });
  });
});


describe('Drop Table If Exists', () => {
  it('successfully drops a table if it exists', () => {
    // Step 1: Create a table
    cy.task('queryDb', `
      CREATE TABLE my_test_schema.users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(100) UNIQUE
      )
    `);

    // Step 2: Drop the table if it exists
    cy.task('queryDb', `DROP TABLE IF EXISTS my_test_schema.users`);

    // Step 3: Verify the table was dropped successfully
    cy.task('queryDb', `
      SELECT * FROM information_schema.tables 
      WHERE table_name = 'users' AND table_schema = 'my_test_schema'
    `).then((result) => {
      expect(result.rows).to.have.lengthOf(0);
    });
  });
});


describe('Drop Multiple Tables', () => {
  it('successfully drops multiple tables', () => {
    // Step 1: Create multiple tables
    cy.task('queryDb', `
      CREATE TABLE my_test_schema.users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(100) UNIQUE
      )
    `);
    cy.task('queryDb', `
      CREATE TABLE my_test_schema.different_data_types_table (
        id INT,
        name VARCHAR(255),
        age SMALLINT,
        birth_date DATE,
        salary DECIMAL(10, 2),
        is_admin BOOLEAN
      )
    `);
    cy.task('queryDb', `
      CREATE TABLE my_test_schema.constraints_table (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age SMALLINT CHECK (age > 18),
        birth_date DATE DEFAULT '2000-01-01',
        salary DECIMAL(10, 2) UNIQUE
      )
    `);
    cy.task('queryDb', `
      CREATE TABLE my_test_schema.indexes_table (
        id INT,
        name VARCHAR(255),
        age SMALLINT,
        birth_date DATE,
        salary DECIMAL(10, 2),
        INDEX idx_name (name),
        INDEX idx_age (age),
        UNIQUE INDEX idx_salary (salary)
      )
    `);

    // Step 2: Drop the tables
    cy.task('queryDb', `DROP TABLE my_test_schema.users`);
    cy.task('queryDb', `DROP TABLE my_test_schema.different_data_types_table`);
    cy.task('queryDb', `DROP TABLE my_test_schema.constraints_table`);
    cy.task('queryDb', `DROP TABLE my_test_schema.indexes_table`);

    // Step 3: Verify the tables were dropped successfully
    cy.task('queryDb', `
      SELECT * FROM information_schema.tables 
      WHERE table_schema = 'my_test_schema'
    `).then((result) => {
      expect(result.rows).to.have.lengthOf(0);
    });
  });
});