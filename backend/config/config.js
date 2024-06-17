module.exports = {
    port: process.env.PORT || 3000,
    database: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'long12321',
      database: process.env.DB_NAME || 'grade_scoredb',
    },
    secret: 'hihi',
    expiresIn: '1h',
  };