describe('Modify Table by Adding a New Column', () => {
  it('successfully adds a new column to an existing table', () => {
    // Step 1: Create a table
    cy.sql(`CREATE TABLE modify_table (
      id INT,
      name VARCHAR(255)
    )`);

    // Step 2: Add a new column to the table
    cy.sql(`ALTER TABLE modify_table ADD COLUMN email VARCHAR(255)`);

    // Step 3: Verify the new column was added successfully
    cy.sql(`DESCRIBE modify_table`)
      .should('contain', 'email');
  });
});


describe('Modify Table by Renaming an Existing Column', () => {
  it('successfully renames an existing column in a table', () => {
    // Step 1: Create a table
    cy.sql(`CREATE TABLE modify_table (
      id INT,
      old_name VARCHAR(255)
    )`);

    // Step 2: Rename an existing column in the table
    cy.sql(`ALTER TABLE modify_table RENAME COLUMN old_name TO new_name`);

    // Step 3: Verify the column was renamed successfully
    cy.sql(`DESCRIBE modify_table`)
      .should('contain', 'new_name')
      .should('not.contain', 'old_name');
  });
});

