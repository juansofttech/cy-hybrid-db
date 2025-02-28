describe('Insert Data into Users Table', () => {
    it('inserts data into the users table', () => {
      // Create a loop to insert multiple users
      for (let i = 0; i < 10; i++) {
        // Generate fake data using Faker
        const name = faker.name.findName();
        const email = faker.internet.email();
  
        // Insert the data into the users table
        cy.task('queryDb', `
          INSERT INTO my_test_schema.users (name, email)
          VALUES ('${name}', '${email}')
        `).then((result) => {
          expect(result.command).to.eq('INSERT');
        });
      }
  
      // Verify that the data was inserted successfully
      cy.task('queryDb', `
        SELECT * FROM my_test_schema.users
      `).then((result) => {
        expect(result.rows).to.have.lengthOf(10);
      });
    });
  });


  describe('Insert Users with Unique Emails', () => {
    it('inserts users with unique emails', () => {
      const emails = [];
  
      for (let i = 0; i < 10; i++) {
        const name = faker.name.findName();
        let email;
  
        do {
          email = faker.internet.email();
        } while (emails.includes(email));
  
        emails.push(email);
  
        cy.task('queryDb', `
          INSERT INTO my_test_schema.users (name, email)
          VALUES ('${name}', '${email}')
        `).then((result) => {
          expect(result.command).to.eq('INSERT');
        });
      }
  
      cy.task('queryDb', `
        SELECT email FROM my_test_schema.users
      `).then((result) => {
        expect(result.rows).to.have.lengthOf(10);
        expect(new Set(result.rows.map((row) => row.email))).to.have.lengthOf(10);
      });
    });
  });


  describe('Insert Users with Specific Names', () => {
    it('inserts users with specific names', () => {
      const names = ['John Doe', 'Jane Doe', 'Alice Smith', 'Bob Johnson', 'Eve Brown'];
  
      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const email = faker.internet.email();
  
        cy.task('queryDb', `
          INSERT INTO my_test_schema.users (name, email)
          VALUES ('${name}', '${email}')
        `).then((result) => {
          expect(result.command).to.eq('INSERT');
        });
      }
  
      cy.task('queryDb', `
        SELECT name FROM my_test_schema.users
      `).then((result) => {
        expect(result.rows).to.have.lengthOf(names.length);
        expect(result.rows.map((row) => row.name)).to.include.members(names);
      });
    });
  });

  describe('Insert Users with Random Data', () => {
    it('inserts users with random data', () => {
      for (let i = 0; i < 10; i++) {
        const name = faker.name.findName();
        const email = faker.internet.email();
        const phoneNumber = faker.phone.phoneNumber();
        const address = faker.address.streetAddress();
  
        cy.task('queryDb', `
          INSERT INTO my_test_schema.users (name, email, phone_number, address)
          VALUES ('${name}', '${email}', '${phoneNumber}', '${address}')
        `).then((result) => {
          expect(result.command).to.eq('INSERT');
        });
      }
  
      cy.task('queryDb', `
        SELECT * FROM my_test_schema.users
      `).then((result) => {
        expect(result.rows).to.have.lengthOf(10);
      });
    });
  });