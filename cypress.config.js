const { defineConfig } = require('cypress');
const { Pool } = require('pg');



function getEnv() {
  return {
    db: {
      host: '127.0.0.1',
      user: 'adm',
      password: 'admin',
      database: 'my-cy-database',
    },
  };
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        queryDb: query => {
          return queryTestDb(query, getEnv());
        },
      });
    },
  },
});

function queryTestDb(query, env) {
  const pool = new Pool({
    host: env.db.host,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
  });

  return pool.query(query)
    .then((results) => {
      pool.end();
      return results.rows;
    })
    .catch((error) => {
      pool.end();
      throw error;
    });
}

async function testConnection() {
  try {
    const query = 'SELECT 1';
    const results = await queryTestDb(query, getEnv());
    console.log('Connected to PostgreSQL database successfully!');
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
  }
}

testConnection();