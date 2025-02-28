describe('Retrieve All Rows from the users Table', () => {
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
    });
  });
});


describe('Retrieve Specific Columns from the users Table', () => {
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
    });
  });
});


describe('Filter Data using a WHERE Clause', () => {
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
    });
  });
});

describe('Sort Data using an ORDER BY Clause', () => {
  it('successfully sorts data using an ORDER BY clause', () => {
    // Step 1: Create a table with some data
    cy.task('queryDb', `
      INSERT INTO my_test_schema.users (name, email)
      VALUES ('John Doe', 'john.doe@example.com'),
             ('Jane Doe', 'jane.doe@example.com'),
             ('Bob Smith', 'bob.smith@example.com')
    `);

    // Step 2: Sort data using an ORDER BY clause
    cy.task('queryDb', `
      SELECT * FROM my_test_schema.users
      ORDER BY name ASC
    `).then((result) => {
      expect(result.rows).to.have.lengthOf(3);
      expect(result.rows[0]).to.contain({ name: 'Bob Smith', email: 'bob.smith@example.com' });
      expect(result.rows[1]).to.contain({ name: 'Jane Doe', email: 'jane.doe@example.com' });
      expect(result.rows[2]).to.contain({ name: 'John Doe', email: 'john.doe@example.com' });
    });
  });
});