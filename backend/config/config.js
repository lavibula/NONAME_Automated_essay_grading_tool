module.exports = {
    port: process.env.PORT || 3002,
    database: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'tuandat12',
      database: process.env.DB_NAME || 'grade_scoredb',
    },
    secret: 'hihi',
    expiresIn: '1h',
  };