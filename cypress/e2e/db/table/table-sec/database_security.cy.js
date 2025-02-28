describe('SQL Injection Test Suite', () => {

    describe('Create Table with Malicious Input', () => {
        it('should prevent SQL injection in CREATE TABLE statement', () => {
            const maliciousInput = "'); DROP TABLE users; --";
            cy.task('queryDb', `CREATE TABLE my_test_schema.users (${maliciousInput} VARCHAR(50))`)
                .then((result) => {
                    expect(result.command).to.not.eq('DROP TABLE');
                });
        });
    });


    describe('Insert Data with Malicious Input', () => {
        it('should prevent SQL injection in INSERT INTO statement', () => {
            const maliciousInput = "'); TRUNCATE TABLE users; --";
            cy.task('queryDb', `INSERT INTO my_test_schema.users (name) VALUES (${maliciousInput})`)
                .then((result) => {
                    expect(result.command).to.not.eq('TRUNCATE TABLE');
                });
        });
    });


    describe('Select Data with Malicious Input', () => {
        it('should prevent SQL injection in SELECT statement', () => {
            const maliciousInput = " OR 1=1; --";
            cy.task('queryDb', `SELECT * FROM my_test_schema.users WHERE name = ${maliciousInput}`)
                .then((result) => {
                    expect(result.rows).to.have.lengthOf(0);
                });
        });
    });


    describe('Update Data with Malicious Input', () => {
        it('should prevent SQL injection in UPDATE statement', () => {
            const maliciousInput = "'); UPDATE users SET name = 'hacked'; --";
            cy.task('queryDb', `UPDATE my_test_schema.users SET name = ${maliciousInput} WHERE id = 1`)
                .then((result) => {
                    expect(result.command).to.not.eq('UPDATE users SET name = \'hacked\'');
                });
        });
    });


    describe('Delete Data with Malicious Input', () => {
        it('should prevent SQL injection in DELETE statement', () => {
            const maliciousInput = " OR 1=1; --";
            cy.task('queryDb', `DELETE FROM my_test_schema.users WHERE name = ${maliciousInput}`)
                .then((result) => {
                    expect(result.command).to.not.eq('DELETE FROM users');
                });
        });
    });

    describe('Drop Table with Malicious Input', () => {
        it('should prevent SQL injection in DROP TABLE statement', () => {
            const maliciousInput = "'); DROP TABLE users; --";
            cy.task('queryDb', `DROP TABLE my_test_schema.${maliciousInput}`)
                .then((result) => {
                    expect(result.command).to.not.eq('DROP TABLE users');
                });
        });
    });


    describe('Alter Table with Malicious Input', () => {
        it('should prevent SQL injection in ALTER TABLE statement', () => {
            const maliciousInput = "'); ALTER TABLE users ADD COLUMN hacked VARCHAR(50); --";
            cy.task('queryDb', `ALTER TABLE my_test_schema.users ${maliciousInput}`)
                .then((result) => {
                    expect(result.command).to.not.eq('ALTER TABLE users ADD COLUMN hacked VARCHAR(50)');
                });
        });
    });


    describe('Grant Privileges with Malicious Input', () => {
        it('should prevent SQL injection in GRANT statement', () => {
            const maliciousInput = "'); GRANT ALL PRIVILEGES ON DATABASE my_cy_database TO adm; --";
            cy.task('queryDb', `GRANT CREATE ON DATABASE my_cy_database TO ${maliciousInput}`)
                .then((result) => {
                    expect(result.command).to.not.eq('GRANT ALL PRIVILEGES ON DATABASE my_cy_database TO adm');
                });
        });
    });


    describe('Execute Stored Procedure with Malicious Input', () => {
        it('should prevent SQL injection in stored procedures', () => {
            const maliciousInput = "'); DROP PROCEDURE my_procedure; --";
            cy.task('queryDb', `CREATE OR REPLACE PROCEDURE my_procedure(${maliciousInput}) AS BEGIN END;`)
                .then((result) => {
                    expect(result.command).to.not.eq('DROP PROCEDURE my_procedure');
                });
        });
    });


    describe('Select Data with UNION Operator and Malicious Input', () => {
        it('should prevent SQL injection in UNION operator', () => {
            const maliciousInput = " UNION SELECT * FROM information_schema.tables; --";
            cy.task('queryDb', `SELECT * FROM my_test_schema.users WHERE name = 'user' ${maliciousInput}`)
                .then((result) => {
                    expect(result.rows).to.have.lengthOf(0);
                });
        });
    });

});