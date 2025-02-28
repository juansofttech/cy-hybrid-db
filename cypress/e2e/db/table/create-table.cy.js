describe('Create Table with Valid Columns', () => {
  it.only('creates a table with valid columns', () => {
    // Create the database
    cy.task('queryDb', `CREATE DATABASE mycydatabase`)
      .then(() => {
        // Grant the CREATE privilege on the mycydatabase database to the adm user
        return cy.task('queryDb', `GRANT CREATE ON DATABASE mycydatabase TO adm`);
      })
      .then(() => {
        // Create a new schema for the test and grant privileges on that schema
        return cy.task('queryDb', `CREATE SCHEMA my_test_schema`);
      })
      .then(() => {
        return cy.task('queryDb', `GRANT CREATE ON SCHEMA my_test_schema TO adm`);
      })
      .then(() => {
        // Update the CREATE TABLE command to use the new schema
        return cy.task('queryDb', `
          CREATE TABLE my_test_schema.users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            email VARCHAR(100) UNIQUE
          )
        `);
      })
      .then((result) => {
        expect(result.command).to.eq('CREATE TABLE');
        // Update the SELECT commands to use the new schema
        return cy.task('queryDb', `
          SELECT * FROM information_schema.tables 
          WHERE table_name = 'users' AND table_schema = 'my_test_schema'
        `);
      })
      .then((result) => {
        expect(result.rows).to.have.lengthOf(1);
        return cy.task('queryDb', `
          SELECT * FROM information_schema.columns 
          WHERE table_name = 'users' AND table_schema = 'my_test_schema'
        `);
      })
      .then((result) => {
        const columns = result.rows;
        expect(columns[0]).to.contain('id SERIAL PRIMARY KEY');
        expect(columns[1]).to.contain('name VARCHAR(50)');
        expect(columns[2]).to.contain('email VARCHAR(100) UNIQUE');
      });
  });
});


describe('Create Table with Different Data Types', () => {
  it('successfully creates a table with different data types', () => {
    // Step 1: Send a CREATE TABLE query with different data types
    cy.sql(`CREATE TABLE different_data_types_table (
      id INT,
      name VARCHAR(255),
      age SMALLINT,
      birth_date DATE,
      salary DECIMAL(10, 2),
      is_admin BOOLEAN
    )`);

    // Step 2: Verify the table creation is successful
    cy.sql(`SHOW TABLES LIKE 'different_data_types_table'`)
      .should('contain', 'different_data_types_table');
  });
});


describe('Create Table with Constraints', () => {
  it('successfully creates a table with constraints', () => {
    // Step 1: Send a CREATE TABLE query with constraints
    cy.sql(`CREATE TABLE constraints_table (
      id INT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      age SMALLINT CHECK (age > 18),
      birth_date DATE DEFAULT '2000-01-01',
      salary DECIMAL(10, 2) UNIQUE
    )`);

    // Step 2: Verify the table creation is successful
    cy.sql(`SHOW TABLES LIKE 'constraints_table'`)
      .should('contain', 'constraints_table');
  });
});


describe('Create Table with Indexes', () => {
  it('successfully creates a table with indexes', () => {
    // Step 1: Send a CREATE TABLE query with indexes
    cy.sql(`CREATE TABLE indexes_table (
      id INT,
      name VARCHAR(255),
      age SMALLINT,
      birth_date DATE,
      salary DECIMAL(10, 2),
      INDEX idx_name (name),
      INDEX idx_age (age),
      UNIQUE INDEX idx_salary (salary)
    )`);

    // Step 2: Verify the table creation is successful
    cy.sql(`SHOW TABLES LIKE 'indexes_table'`)
      .should('contain', 'indexes_table');

    // Step 3: Verify the indexes creation is successful
    cy.sql(`SHOW INDEXES FROM indexes_table`)
      .should('contain', 'idx_name')
      .should('contain', 'idx_age')
      .should('contain', 'idx_salary');
  });
});



