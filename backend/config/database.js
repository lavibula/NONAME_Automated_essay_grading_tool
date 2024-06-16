const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config.database);

module.exports = {
  query: (query, values) => {
    return new Promise((resolve, reject) => {
      pool.query(query, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
};