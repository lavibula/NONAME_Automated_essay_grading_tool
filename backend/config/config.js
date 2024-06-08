module.exports = {
    port: process.env.PORT || 3000,
    database: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '140103d',
      database: process.env.DB_NAME || 'gradingDB',
    },
    secret: 'hihi',  
    expiresIn: '1h' 
  };