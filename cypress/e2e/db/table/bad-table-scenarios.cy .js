describe('Create Table with Invalid Columns', () => {
  it('fails to create a table with duplicate column names', () => {
    // Step 1: Send a CREATE TABLE query with invalid columns
    cy.sql(`CREATE TABLE invalid_table (
      id INT,
      name VARCHAR(255),
      name VARCHAR(255) // duplicate column name
    )`);

    // Step 2: Verify the table creation fails with an error
    cy.sql('CREATE TABLE invalid_table (id INT, name VARCHAR(255), name VARCHAR(255))')
      .should('fail')
      .and('contain', 'duplicate column name');
  });
});


describe('Create Table with Missing Columns', () => {
  it('fails to create a table with no primary key', () => {
    // Step 1: Send a CREATE TABLE query with missing columns (no primary key)
    cy.sql(`CREATE TABLE missing_columns_table (
      name VARCHAR(255)
    )`);

    // Step 2: Verify the table creation fails with an error
    cy.sql(`SHOW TABLES LIKE 'missing_columns_table'`)
      .should('not.contain', 'missing_columns_table');
  });
});



describe('Create Table with Duplicate Column Names', () => {
  it('fails to create a table with duplicate column names', () => {
    // Step 1: Send a CREATE TABLE query with duplicate column names
    cy.sql(`CREATE TABLE duplicate_columns_table (
      id INT,
      name VARCHAR(255),
      name VARCHAR(255) // duplicate column name
    )`);

    // Step 2: Verify the table creation fails with an error
    cy.sql(`SHOW TABLES LIKE 'duplicate_columns_table'`)
      .should('not.contain', 'duplicate_columns_table');
  });
});