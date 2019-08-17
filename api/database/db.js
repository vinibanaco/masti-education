const mysql = require('mysql')

exports.db = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'Password@123',
  database: 'bootcamp',
  
  /**
   * O máximo de conexões simultâneas no MySQL é 151, mas o limite é
   * definido como um valor a menos para que o admin sempre possa ter
   * acesso à sua aplicação
   */
  connectionLimit: 150
})
