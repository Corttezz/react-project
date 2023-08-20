const sql = require('mssql');

const config = {
  user: 'danielcortez',
  password: 'nega12345*',
  server: 'dbserver-inteligym.database.windows.net',
  database: 'DataBase-Inteligym',
  options: {
    encrypt: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
  sql, poolPromise
};


  