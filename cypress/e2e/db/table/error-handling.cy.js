describe('Retrieve All Rows from the users Table with Error Handling', () => {
  it('successfully retrieves all rows from the users table', () => {
    // Step 1: Create a table with some data
    cy.task('queryDb', `
      INSERT INTO my_test_schema.users (name, email)
      VALUES ('John Doe', 'john.doe@example.com'),
             ('Jane Doe', 'jane.doe@example.com'),
             ('Bob Smith', 'bob.smith@example.com')
    `);

    // Step 2: Retrieve all rows from the table
    cy.task('queryDb', `
      SELECT * FROM my_test_schema.users
    `).then((result) => {
      expect(result.rows).to.have.lengthOf(3);
    }).catch((error) => {
      expect(error).to.be.null;
    });
  });

  it('handles error when retrieving all rows from the users table', () => {
    // Step 1: Create a table with some data
    cy.task('queryDb', `
      INSERT INTO my_test_schema.users (name, email)
      VALUES ('John Doe', 'john.doe@example.com'),
             ('Jane Doe', 'jane.doe@example.com'),
             ('Bob Smith', 'bob.smith@example.com')
    `);

    // Step 2: Retrieve all rows from the table with an error
    cy.task('queryDb', `
      SELECT * FROM non_existent_table
    `).catch((error) => {
      expect(error).to.not.be.null;
      expect(error.message).to.contain('relation "non_existent_table" does not exist');
    });
  });
});



describe('Retrieve Specific Columns from the users Table with Error Handling', () => {
  it('successfully retrieves specific columns from the users table', () => {
    // Step 1: Create a table with some data
    cy.task('queryDb', `
      INSERT INTO my_test_schema.users (name, email)
      VALUES ('John Doe', 'john.doe@example.com'),
             ('Jane Doe', 'jane.doe@example.com'),
             ('Bob Smith', 'bob.smith@example.com')
    `);

    // Step 2: Retrieve specific columns from the table
    cy.task('queryDb', `
      SELECT name, email FROM my_test_schema.users
    `).then((result) => {
      expect(result.rows).to.have.lengthOf(3);
      expect(result.rows[0]).to.contain({ name: 'John Doe', email: 'john.doe@example.com' });
    }).catch((error) => {
      expect(error).to.be.null;
    });
  });

  it('handles error when retrieving specific columns from the users table', () => {
    // Step 1: Create a table with some data
    cy.task('queryDb', `
      INSERT INTO my_test_schema.users (name, email)
      VALUES ('John Doe', 'john.doe@example.com'),
             ('Jane Doe', 'jane.doe@example.com'),
             ('Bob Smith', 'bob.smith@example.com')
    `);

    // Step 2: Retrieve specific columns from the table with an error
    cy.task('queryDb', `
      SELECT non_existent_column FROM my_test_schema.users
    `).catch((error) => {
      expect(error).to.not.be.null;
      expect(error.message).to.contain('column "non_existent_column" does not exist');
    });
  });
});



describe('Filter Data using a WHERE Clause with Error Handling', () => {
  it('successfully filters data using a WHERE clause', () => {
    // Step 1: Create a table with some data
    cy.task('queryDb', `
      INSERT INTO my_test_schema.users (name, email)
      VALUES ('John Doe', 'john.doe@example.com'),
             ('Jane Doe', 'jane.doe@example.com'),
             ('Bob Smith', 'bob.smith@example.com')
    `);

    // Step 2: Filter data using a WHERE clause
    cy.task('queryDb', `
      SELECT * FROM my_test_schema.users
      WHERE name LIKE '%Doe%'
    `).then((result) => {
      expect(result.rows).to.have.lengthOf(2);
      expect(result.rows[0]).to.contain({ name: 'John Doe', email: 'john.doe@example.com' });
      expect(result.rows[1]).to.contain({ name: 'Jane Doe', email: 'jane.doe@example.com' });
    }).catch((error) => {
      expect(error).to.be.null;
    });
  });

  it('handles error when filtering data using a WHERE clause', () => {
    // Step 1: Create a table with some data
    cy.task('queryDb', `
      INSERT INTO my_test_schema.users (name, email)
      VALUES ('John Doe', 'john.doe@example.com'),
             ('Jane Doe', 'jane.doe@example.com'),
             ('Bob Smith', 'bob.smith@example.com')
    `);

    // Step 2: Filter data using a WHERE clause with an error
    cy.task('queryDb', `
      SELECT * FROM my_test_schema.users
      WHERE non_existent_column = 'John Doe'
    `).catch((error) => {
      expect(error).to.not.be.null;
      expect(error.message).to.contain('column "non_existent_column" does not exist');
    });
  });
});