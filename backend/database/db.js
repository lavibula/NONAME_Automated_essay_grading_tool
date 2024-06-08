const { Pool } = require('pg');
const config = require('../config/config');

const pool = new Pool(config.database);

module.exports = {
  connect: () => {
    pool.query('SELECT NOW()', (err, result) => {
      if (err) {
        console.error('Error connecting to database:', err);
      } else {
        console.log('Database connected successfully:', result.rows[0].now);
      }
    });
  },
  query: (query, values) => {
    return new Promise((resolve, reject) => {
      pool.query(query, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
};